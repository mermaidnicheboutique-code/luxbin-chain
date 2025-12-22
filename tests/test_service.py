import os
import sys
import pathlib
import asyncio
import json
import pytest
import pytest_asyncio
from aiohttp import web
from aiohttp import ClientSession
from aiohttp.test_utils import TestClient, TestServer, unused_port

# Ensure test DB is isolated
os.environ['LUXBIN_IMMUNE_DB'] = 'test_immune.db'

# Make repository root importable so pytest can import top-level modules
repo_root = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(repo_root))

from luxbin_immune_system import ThreatData
from immune_service import create_app


@pytest_asyncio.fixture
async def client():
    app = await create_app()
    server = TestServer(app)
    await server.start_server()
    client = TestClient(server)
    await client.start_server()
    yield client
    await client.close()
    await server.close()


@pytest.mark.asyncio
async def test_stats_and_transaction(tmp_path, client):
    client: TestClient = client

    # Replace immune.monitor_transaction with deterministic stub
    immune = client.server.app['immune']

    async def fake_monitor(tx):
        # append a deterministic threat
        td = ThreatData(transaction_hash=tx.get('hash', 'h'), timestamp=12345.0, threat_score=0.9, features=tx.get('features', {}), is_threat=True)
        immune.threat_log.append(td)
        # also store a memory in the memory cell to test persistence
        mem = {'signature': 'sig1', 'first_seen': 12345.0, 'last_seen': 12345.0, 'occurrence_count': 1, 'effectiveness_history': [0.8], 'features': tx.get('features', {})}
        # create entry in first memory cell
        immune.memory_cells[0].memory_storage['sig1'] = mem
        return {'action': 'FLAG', 'target': tx.get('hash', 'unknown')}

    immune.monitor_transaction = fake_monitor

    # call /stats
    r = await client.get('/stats')
    assert r.status == 200
    stats = await r.json()
    assert 'detectors' in stats

    # post a transaction
    tx = {'hash': '0xdeadbeef', 'from': '0x1', 'features': {'gas_price_deviation': 10}}
    r = await client.post('/transaction', json=tx)
    assert r.status == 200
    body = await r.json()
    assert body['result']['action'] == 'FLAG'

    # check memories endpoint
    r = await client.get('/memory')
    assert r.status == 200
    mems = await r.json()
    assert isinstance(mems.get('memories'), list)

    # cleanup test DB
    db_path = os.environ.get('LUXBIN_IMMUNE_DB', 'test_immune.db')
    try:
        os.remove(db_path)
    except Exception:
        pass


@pytest.mark.asyncio
async def test_encode_temporal_lock(client):
    client: TestClient = client

    payload = {
        'temporal_lock': {
            'reveal_time': 1670000000,
            'hash_chain_depth': 1000,
            'initial_hash': '0x' + 'ab' * 32
        }
    }

    r = await client.post('/encode_temporal_lock', json=payload)
    assert r.status == 200
    body = await r.json()
    assert body.get('scale_hex', '').startswith('0x')
    assert 'scale_b64' in body
