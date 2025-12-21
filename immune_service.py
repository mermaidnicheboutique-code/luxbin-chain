#!/usr/bin/env python3
"""Immune System service: HTTP API wrapper + persistence for `luxbin_immune_system.py`.

Endpoints:
 - POST /transaction  : JSON transaction -> runs pipeline and returns result
 - GET  /stats        : basic counters
 - GET  /memory       : list stored memory signatures

This is a minimal, pragmatic service to make the simulation usable as a small piece
of software. Persistence is SQLite via `aiosqlite`.
"""
import asyncio
import json
import os
from typing import Optional

import aiosqlite
from aiohttp import web

from luxbin_immune_system import LuxbinImmuneSystem, ThreatData

DB_PATH = os.environ.get("LUXBIN_IMMUNE_DB", "immune.db")


async def init_db(db_path: str):
    db = await aiosqlite.connect(db_path)
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS threats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tx_hash TEXT,
            timestamp REAL,
            threat_score REAL,
            features TEXT
        )
        """
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tx_hash TEXT,
            timestamp REAL,
            response_json TEXT
        )
        """
    )
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            signature TEXT UNIQUE,
            first_seen REAL,
            last_seen REAL,
            occurrence_count INTEGER,
            data TEXT
        )
        """
    )
    await db.commit()
    return db


async def save_threat(db: aiosqlite.Connection, threat: ThreatData):
    await db.execute(
        "INSERT INTO threats (tx_hash, timestamp, threat_score, features) VALUES (?, ?, ?, ?)",
        (threat.transaction_hash, threat.timestamp, threat.threat_score, json.dumps(threat.features)),
    )
    await db.commit()


async def save_response(db: aiosqlite.Connection, tx_hash: str, response: dict):
    await db.execute(
        "INSERT INTO responses (tx_hash, timestamp, response_json) VALUES (?, ?, ?)",
        (tx_hash, asyncio.get_event_loop().time(), json.dumps(response)),
    )
    await db.commit()


async def list_memories(db: aiosqlite.Connection):
    cur = await db.execute("SELECT signature, first_seen, last_seen, occurrence_count, data FROM memories ORDER BY last_seen DESC LIMIT 100")
    rows = await cur.fetchall()
    out = []
    for r in rows:
        out.append({
            'signature': r[0],
            'first_seen': r[1],
            'last_seen': r[2],
            'occurrence_count': r[3],
            'data': json.loads(r[4]) if r[4] else None,
        })
    return out


async def save_memory(db: aiosqlite.Connection, signature: str, memory: dict):
    # Upsert memory by signature
    data_json = json.dumps(memory)
    cur = await db.execute("SELECT id FROM memories WHERE signature = ?", (signature,))
    row = await cur.fetchone()
    if row:
        # Selective update: only update if last_seen increased or occurrence_count increased
        cur2 = await db.execute("SELECT last_seen, occurrence_count, data FROM memories WHERE signature = ?", (signature,))
        existing = await cur2.fetchone()
        try:
            existing_data = json.loads(existing[2]) if existing and existing[2] else {}
        except Exception:
            existing_data = {}

        need_update = False
        if existing:
            existing_last = existing[0] or 0
            existing_count = existing[1] or 0
            new_last = memory.get('last_seen', existing_last)
            new_count = memory.get('occurrence_count', existing_count)
            if new_last > existing_last or new_count > existing_count:
                need_update = True
        else:
            need_update = True

        if need_update:
            await db.execute(
                "UPDATE memories SET last_seen = ?, occurrence_count = ?, data = ? WHERE signature = ?",
                (memory.get('last_seen', None), memory.get('occurrence_count', 1), data_json, signature),
            )
    else:
        await db.execute(
            "INSERT INTO memories (signature, first_seen, last_seen, occurrence_count, data) VALUES (?, ?, ?, ?, ?)",
            (signature, memory.get('first_seen', None), memory.get('last_seen', None), memory.get('occurrence_count', 1), data_json),
        )
    await db.commit()


def _scale_encode_temporal_lock(puzzle: dict) -> bytes:
    """SCALE-style encoding for TemporalLock: reveal_time(u64 LE) + hash_chain_depth(u32 LE) + initial_hash(32 bytes).

    This is a pragmatic encoder matching Substrate's little-endian primitive encoding for fixed-size types.
    """
    import struct

    reveal_time = int(puzzle.get('reveal_time', 0))
    depth = int(puzzle.get('hash_chain_depth', 0))
    initial_hash_hex = puzzle.get('initial_hash', '')
    # normalize hex
    if initial_hash_hex.startswith('0x'):
        initial_hash_hex = initial_hash_hex[2:]
    initial_hash = bytes.fromhex(initial_hash_hex.ljust(64, '0'))[:32]

    b = struct.pack('<Q', reveal_time) + struct.pack('<I', depth) + initial_hash
    return b


async def create_app():
    app = web.Application()
    app['db'] = await init_db(DB_PATH)
    app['immune'] = LuxbinImmuneSystem(num_detectors=20, num_memory=3, num_regulatory=2)


    async def handle_transaction(request):
        data = await request.json()
        tx = data

        immune: LuxbinImmuneSystem = request.app['immune']
        db: aiosqlite.Connection = request.app['db']

        # Run the monitor pipeline in background thread pool to avoid blocking aiohttp
        result = await immune.monitor_transaction(tx)

        # If a threat was detected, persist threat and response
        if immune.threat_log:
            last_threat: ThreatData = immune.threat_log[-1]
            await save_threat(db, last_threat)

        if result:
            await save_response(db, tx.get('hash', 'unknown'), result)

        # Persist learned memories from memory cells (upsert by signature)
        try:
            for memory_cell in immune.memory_cells:
                for signature, memory in memory_cell.memory_storage.items():
                    await save_memory(db, signature, memory)
        except Exception:
            # Don't fail the request because of DB persistence errors for memories
            pass

        return web.json_response({'result': result})


    async def handle_stats(request):
        immune: LuxbinImmuneSystem = request.app['immune']
        return web.json_response({
            'detectors': len(immune.detector_cells),
            'memory_cells': len(immune.memory_cells),
            'regulatory_cells': len(immune.regulatory_cells),
            'threats_logged': len(immune.threat_log),
            'responses_executed': len(immune.response_log),
        })


    async def handle_memories(request):
        db: aiosqlite.Connection = request.app['db']
        mems = await list_memories(db)
        return web.json_response({'memories': mems})


    app.router.add_post('/transaction', handle_transaction)
    app.router.add_get('/stats', handle_stats)
    app.router.add_get('/memory', handle_memories)

    async def handle_encode_temporal_lock(request):
        """POST /encode_temporal_lock
        body: { "temporal_lock": { "reveal_time": <int>, "hash_chain_depth": <int>, "initial_hash": "hex" } }
        Returns: { "scale_hex": "0x...", "scale_b64": "..." }
        """
        try:
            data = await request.json()
            puzzle = data.get('temporal_lock') or data
        except Exception:
            return web.json_response({'error': 'invalid json'}, status=400)

        try:
            encoded = _scale_encode_temporal_lock(puzzle)
        except Exception as e:
            return web.json_response({'error': 'encode_failed', 'detail': str(e)}, status=500)

        import base64

        return web.json_response({
            'scale_hex': '0x' + encoded.hex(),
            'scale_b64': base64.b64encode(encoded).decode(),
        })

    app.router.add_post('/encode_temporal_lock', handle_encode_temporal_lock)

    async def handle_root(request):
        return web.json_response({
            'service': 'luxbin-immune',
            'version': '0.1',
            'endpoints': ['/transaction (POST)', '/stats (GET)', '/memory (GET)', '/encode_temporal_lock (POST)']
        })

    app.router.add_get('/', handle_root)

    return app


def main():
    app = asyncio.run(create_app())
    web.run_app(app, host='0.0.0.0', port=8080)


if __name__ == '__main__':
    main()
