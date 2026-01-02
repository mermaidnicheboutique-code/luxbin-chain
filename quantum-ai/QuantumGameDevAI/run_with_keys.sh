#!/bin/bash
# Run with API keys set

cd /Users/nicholechristie/Desktop/QuantumGameDevAI
source venv/bin/activate

# Check for required API keys
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "ANTHROPIC_API_KEY not set. Please export it or add to .env file."
    exit 1
fi
if [ -z "$OPENAI_API_KEY" ]; then
    echo "OPENAI_API_KEY not set. Please export it or add to .env file."
    exit 1
fi
if [ -z "$GOOGLE_API_KEY" ]; then
    echo "GOOGLE_API_KEY not set. Please export it or add to .env file."
    exit 1
fi

python3 main.py "$@"