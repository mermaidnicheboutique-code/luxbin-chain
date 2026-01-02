#!/bin/bash
# Launch the Quantum Game Dev AI Web App

cd "$(dirname "$0")"
source venv/bin/activate

echo "🎮 Starting Quantum Game Dev AI Web App..."
echo "🤖 AI systems initializing..."
echo ""
echo "🌐 Once started, open your browser to: http://localhost:5000"
echo "📱 You can also access from other devices on your network"
echo ""

python3 web_app.py