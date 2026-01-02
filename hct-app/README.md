# LUXBIN HCT Dashboard

Real-time web dashboard for monitoring Harmonic Convergence Theory (HCT) metrics.

## What is HCT?

HCT (Harmonic Convergence Theory) is a systems-level harmonization metric that measures distributed system health across 5 dimensions:

```
HCT = (αB · βH · γG · δR · εE)^(1/5)
```

- **B (Biology)**: System health & adaptability
- **H (History)**: Memory & precedent
- **G (Geology)**: Infrastructure substrate
- **R (Religion)**: Ethics, norms, & constraints
- **E (Electromagnetism)**: Energy, time, & signal

## Quick Start

### 1. Install Dependencies
```bash
cd /Users/nicholechristie/luxbin-chain/hct-app
pip3 install -r requirements.txt
```

### 2. Start the App
```bash
python3 app.py
```

### 3. Open Browser
Navigate to: **http://localhost:5000**

## Features

- **Real-Time HCT Monitoring**: Live HCT score updates every 10 seconds
- **Component Breakdown**: View all 5 component scores (B, H, G, R, E)
- **Historical Chart**: Track HCT trends over time
- **Operational Modifiers**: See consensus weight, staking multipliers, immune response
- **Coefficient Tuning**: Adjust governance weights (α, β, γ, δ, ε) via UI
- **System Mode**: Displays NORMAL/DEGRADED/CRITICAL/EMERGENCY status

## API Endpoints

### GET /api/hct/current
Get current HCT score
```json
{
  "success": true,
  "hct": 0.8234,
  "mode": "normal",
  "components": {
    "B": 0.85,
    "H": 0.91,
    "G": 0.67,
    "R": 0.96,
    "E": 0.82
  }
}
```

### GET /api/hct/history
Get HCT history (last 50 computations)

### GET /api/hct/report
Get complete health report

### GET/POST /api/coefficients
Get or update governance coefficients

### GET /api/operational
Get operational modifiers (consensus, staking, immune response)

## Directory Structure

```
hct-app/
├── app.py                 # Flask web server
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── api/                   # HCT core implementation
│   ├── hct_core.py
│   ├── hct_metrics_collector.py
│   └── hct_integration.py
├── frontend/              # Web UI
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── style.css
│       └── app.js
├── config/                # Configuration
│   └── nodes.json
├── data/                  # Data storage
└── docs/                  # Documentation
```

## Configuration

### Node Registry
Edit `config/nodes.json` to add your network nodes:
```json
[
  {
    "node_id": "node-1",
    "country": "US",
    "hardware": "Linux",
    "dependencies": ["python", "cirq"],
    "datacenter": "AWS"
  }
]
```

### Coefficients
Default: α = β = γ = δ = ε = 1.0

Adjust via UI or API to prioritize specific components.

## Integration with LUXBIN

The dashboard integrates with:
- **Live Mirror** (`../luxbin_mirror/`) - Reads blockchain data
- **Immune System** - Monitors spawned cells
- **Node Registry** - Tracks infrastructure

Make sure the live mirror is running:
```bash
cd ..
./START_LIVE_MIRROR.sh
```

## Troubleshooting

**"No HCT data available"**
- Start the live blockchain mirror first
- Check that `luxbin_mirror/` directory exists

**"Port 5000 already in use"**
- Change port in `app.py`: `app.run(port=5001)`

**"Import errors"**
- Install dependencies: `pip3 install -r requirements.txt`

## Development

### Run in debug mode
```bash
python3 app.py
# Flask runs in debug mode by default
```

### Add new metrics
1. Edit `api/hct_metrics_collector.py`
2. Add new measurement function
3. Update `collect_all()` method

### Customize UI
- Edit `frontend/templates/index.html` for structure
- Edit `frontend/static/style.css` for styling
- Edit `frontend/static/app.js` for behavior

## Production Deployment

### Using Docker (future)
```bash
docker build -t luxbin-hct .
docker run -p 5000:5000 luxbin-hct
```

### Using Gunicorn
```bash
pip3 install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## License

Part of LUXBIN blockchain project
