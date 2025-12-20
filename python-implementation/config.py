#!/usr/bin/env python3
"""
LUXBIN Configuration - API Keys and Settings
Loads from environment variables for security
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root
project_root = Path(__file__).parent.parent
env_path = project_root / '.env'

if env_path.exists():
    load_dotenv(env_path)

# API Keys - Load from environment
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY', '')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
GROK_API_KEY = os.getenv('GROK_API_KEY', '')

# Blockchain RPCs
OP_SEPOLIA_RPC = os.getenv('OP_SEPOLIA_RPC', 'https://sepolia.optimism.io')
BASE_SEPOLIA_RPC = os.getenv('BASE_SEPOLIA_RPC', 'https://sepolia.base.org')

# Wallet
DEPLOYER_PRIVATE_KEY = os.getenv('DEPLOYER_PRIVATE_KEY', '')

# Validate critical keys
def check_api_keys():
    """Check if API keys are configured"""
    missing = []

    if not ANTHROPIC_API_KEY:
        missing.append('ANTHROPIC_API_KEY')
    if not OPENAI_API_KEY:
        missing.append('OPENAI_API_KEY')

    if missing:
        print("⚠️  Missing API keys in .env file:")
        for key in missing:
            print(f"   - {key}")
        print("\nCopy .env.example to .env and add your keys!")
        return False

    return True
