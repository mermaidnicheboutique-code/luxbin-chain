#!/bin/bash
# Run the Quantum Game Dev AI Main Application

cd "$(dirname "$0")"
source venv/bin/activate

# Set API keys from command line if provided
if [ "$1" = "--anthropic" ] && [ -n "$2" ]; then
    export ANTHROPIC_API_KEY="$2"
    shift 2
fi

if [ "$1" = "--openai" ] && [ -n "$2" ]; then
    export OPENAI_API_KEY="$2"
    shift 2
fi

if [ "$1" = "--google" ] && [ -n "$2" ]; then
    export GOOGLE_API_KEY="$2"
    shift 2
fi

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

if [ $# -eq 0 ]; then
    python main.py
else
    python main.py "$@"
fi