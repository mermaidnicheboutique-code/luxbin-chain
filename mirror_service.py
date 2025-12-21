#!/usr/bin/env python3
"""Mirror external blockchains into Luxbin encoding and persist merkle roots.

Currently implemented:
 - Bitcoin (via JSON-RPC) — polls latest block and stores a compact payload + merkle root
 - Ethereum placeholder (requires WEB3_URL env and `web3` installed)

Endpoints:
 - GET /mirrors                : list mirrored entries
 - POST /mirror/bitcoin/fetch  : trigger a one-off fetch of latest Bitcoin block
 - POST /mirror/ethereum/fetch : placeholder for Ethereum (requires node URL)
 - GET  /mirror/:id/temporal   : returns SCALE-encoded temporal_lock for mirror entry

Config via env:
 - BITCOIN_RPC_URL (e.g. http://user:pass@127.0.0.1:8332)
 - WEB3_URL (for Ethereum)
 - LUXBIN_IMMUNE_DB (path to DB, defaults to immune.db)
"""
import os
import json
import hashlib
import time
import requests
import aiosqlite
import asyncio
from aiohttp import web
from typing import Dict, Any

from immune_service import init_db, _scale_encode_temporal_lock, DB_PATH

DB_ENV = os.environ.get('LUXBIN_IMMUNE_DB', DB_PATH)
BITCOIN_RPC_URL = os.environ.get('BITCOIN_RPC_URL')
WEB3_URL = os.environ.get('WEB3_URL')
MOCK_BITCOIN = os.environ.get('MOCK_BITCOIN', '0').lower() in ('1', 'true', 'yes')


async def init_mirror_db(db_path: str):
    db = await aiosqlite.connect(db_path)
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS mirrors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chain TEXT,
            block_number INTEGER,
            block_hash TEXT,
            merkle_root TEXT,
            timestamp REAL,
            payload TEXT
        )
        """
    )
    await db.commit()
    return db


def _compact_block_payload_bitcoin(block: Dict[str, Any]) -> bytes:
    """Create a compact, deterministic payload for a Bitcoin block.

    We'll include block hash, height, time, and sorted tx hashes.
    """
    height = block.get('height')
    bhash = block.get('hash')
    btime = block.get('time')
    tx = block.get('tx', [])
    # sort tx hashes for deterministic payload
    tx_sorted = sorted(tx)
    payload = {
        'chain': 'bitcoin',
        'height': height,
        'hash': bhash,
        'time': btime,
        'tx_count': len(tx_sorted),
        'tx': tx_sorted,
    }
    return json.dumps(payload, separators=(',', ':'), sort_keys=True).encode()


def _sha256d(data: bytes) -> str:
    return hashlib.sha256(hashlib.sha256(data).digest()).hexdigest()


async def fetch_bitcoin_block_once(rpc_url: str) -> Dict[str, Any]:
    # If mock mode enabled, return a deterministic fake block for testing
    if MOCK_BITCOIN:
        now = int(time.time())
        # create fake tx hashes
        tx_hashes = [hashlib.sha256(f"tx-{now}-{i}".encode()).hexdigest() for i in range(1, 6)]
        fake_block = {
            'height': now % 1000000,
            'hash': hashlib.sha256(f"block-{now}".encode()).hexdigest(),
            'time': now,
            'tx': tx_hashes,
        }
        return fake_block

    if not rpc_url:
        raise RuntimeError('BITCOIN_RPC_URL not set')

    # get best block hash
    headers = {'Content-Type': 'application/json'}
    payload = {"jsonrpc": "1.0", "id": "luxbin", "method": "getbestblockhash", "params": []}
    r = requests.post(rpc_url, headers=headers, data=json.dumps(payload))
    r.raise_for_status()
    best_hash = r.json()['result']

    payload = {"jsonrpc": "1.0", "id": "luxbin", "method": "getblock", "params": [best_hash, 2]}
    r = requests.post(rpc_url, headers=headers, data=json.dumps(payload))
    r.raise_for_status()
    block = r.json()['result']

    return block


async def store_mirror_entry(db: aiosqlite.Connection, chain: str, block_number: int, block_hash: str, merkle_root: str, payload: dict):
    await db.execute(
        "INSERT INTO mirrors (chain, block_number, block_hash, merkle_root, timestamp, payload) VALUES (?, ?, ?, ?, ?, ?)",
        (chain, block_number, block_hash, merkle_root, time.time(), json.dumps(payload)),
    )
    await db.commit()


async def create_app():
    app = web.Application()
    app['db'] = await init_mirror_db(DB_ENV)

    async def list_mirrors(request):
        db: aiosqlite.Connection = request.app['db']
        cur = await db.execute("SELECT id, chain, block_number, block_hash, merkle_root, timestamp FROM mirrors ORDER BY id DESC LIMIT 100")
        rows = await cur.fetchall()
        out = []
        for r in rows:
            out.append({'id': r[0], 'chain': r[1], 'block_number': r[2], 'block_hash': r[3], 'merkle_root': r[4], 'timestamp': r[5]})
        return web.json_response({'mirrors': out})

    async def trigger_bitcoin_fetch(request):
        try:
            block = await fetch_bitcoin_block_once(BITCOIN_RPC_URL)
        except Exception as e:
            return web.json_response({'error': str(e)}, status=500)

        payload_bytes = _compact_block_payload_bitcoin(block)
        merkle_root = _sha256d(payload_bytes)
        db: aiosqlite.Connection = request.app['db']
        await store_mirror_entry(db, 'bitcoin', block.get('height'), block.get('hash'), merkle_root, json.loads(payload_bytes.decode()))
        return web.json_response({'status': 'ok', 'merkle_root': merkle_root})

    async def trigger_ethereum_fetch(request):
        if not WEB3_URL:
            return web.json_response({'error': 'WEB3_URL not configured'}, status=400)
        # Placeholder: fetch latest block via web3 and mirror similarly
        try:
            from web3 import Web3
            w3 = Web3(Web3.HTTPProvider(WEB3_URL))
            latest = w3.eth.get_block('latest', full_transactions=False)
            payload = {
                'chain': 'ethereum',
                'number': latest.number,
                'hash': latest.hash.hex(),
                'timestamp': latest.timestamp,
                'tx_count': len(latest.transactions),
            }
            payload_bytes = json.dumps(payload, separators=(',', ':'), sort_keys=True).encode()
            merkle_root = _sha256d(payload_bytes)
            db: aiosqlite.Connection = request.app['db']
            await store_mirror_entry(db, 'ethereum', latest.number, latest.hash.hex(), merkle_root, payload)
            return web.json_response({'status': 'ok', 'merkle_root': merkle_root})
        except Exception as e:
            return web.json_response({'error': str(e)}, status=500)

    async def mirror_temporal_lock(request):
        mid = int(request.match_info['id'])
        db: aiosqlite.Connection = request.app['db']
        cur = await db.execute("SELECT id, chain, block_number, block_hash, merkle_root, timestamp, payload FROM mirrors WHERE id = ?", (mid,))
        row = await cur.fetchone()
        if not row:
            return web.json_response({'error': 'not found'}, status=404)
        # Create temporal lock puzzle: reveal_time = timestamp + 300, hash_chain_depth=1000, initial_hash = merkle_root
        reveal_time = int(row[5]) + 300
        puzzle = {
            'reveal_time': reveal_time,
            'hash_chain_depth': 1000,
            'initial_hash': row[4]
        }
        encoded = _scale_encode_temporal_lock(puzzle)
        import base64
        return web.json_response({'scale_hex': '0x' + encoded.hex(), 'scale_b64': base64.b64encode(encoded).decode(), 'puzzle': puzzle})

    app.router.add_get('/mirrors', list_mirrors)
    app.router.add_post('/mirror/bitcoin/fetch', trigger_bitcoin_fetch)
    app.router.add_post('/mirror/ethereum/fetch', trigger_ethereum_fetch)
    app.router.add_get('/mirror/{id}/temporal', mirror_temporal_lock)

    async def handle_root(request):
        return web.json_response({
            'service': 'luxbin-mirror',
            'version': '0.1',
            'endpoints': ['/mirrors (GET)', '/mirror/bitcoin/fetch (POST)', '/mirror/ethereum/fetch (POST)', '/mirror/{id}/temporal (GET)'],
            'mock_bitcoin': bool(MOCK_BITCOIN),
        })

    app.router.add_get('/', handle_root)

    return app


def main():
    import logging
    logging.basicConfig(level=logging.INFO)
    try:
        app = asyncio.run(create_app())
        logging.info('Starting mirror_service on http://0.0.0.0:8090')
        web.run_app(app, host='0.0.0.0', port=8090)
    except Exception as e:
        # Write traceback to log file for debugging when started in background
        import traceback
        tb = traceback.format_exc()
        with open('mirror_service.log', 'a') as f:
            f.write('\n' + time.strftime('%Y-%m-%d %H:%M:%S') + '\n')
            f.write(tb)
        print('mirror_service failed to start, see mirror_service.log for details')
        raise


if __name__ == '__main__':
    main()
