#!/bin/bash
# Launch the Quantum Game Dev AI GUI App

cd "$(dirname "$0")"

# Try system Python first (has tkinter), fall back to venv
if python3 -c "import tkinter; print('tkinter available')" 2>/dev/null; then
    echo "🎮 Starting Quantum Game Dev AI (System Python)..."
    PYTHON_CMD="python3"
else
    echo "🎮 Starting Quantum Game Dev AI (Venv Python)..."
    source venv/bin/activate
    PYTHON_CMD="python3"
fi

echo "🤖 AI systems initializing..."
echo ""

$PYTHON_CMD app_gui.py