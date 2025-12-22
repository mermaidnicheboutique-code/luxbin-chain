# Immune Service

This document explains how to run the LUXBIN immune system as a service (local / Docker).

Requirements
------------
- Python 3.11+
- Install dependencies:

```bash
pip install -r requirements.txt
```

Run locally
-----------

```bash
python3 immune_service.py
# Service listens on http://0.0.0.0:8080
```

Run in Docker
-------------

```bash
docker build -t luxbin-immune .
docker run -p 8080:8080 luxbin-immune
```

API
---
- POST `/transaction` — JSON transaction object
- GET  `/stats` — counts
- GET  `/memory` — persisted memories

Notes
-----
- The service persists threats, responses, and learned memories into `immune.db` (or path set via `LUXBIN_IMMUNE_DB`).
- This is a pragmatic bridge from simulation -> small service. For on-chain anchoring, see `docs/temporal_onchain.md` and the draft pallet in `substrate/frame/temporal_onchain/`.
