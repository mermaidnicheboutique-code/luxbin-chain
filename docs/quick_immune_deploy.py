#!/usr/bin/env python3
"""
Quick Immune System Deployment
Deploy immune NFTs and smart contracts to existing LUXBIN on OP Sepolia

Author: Nichole Christie
"""

from web3 import Web3
from eth_account import Account
import json
import os

# OP Sepolia Configuration
OP_SEPOLIA = {
    'rpc': 'https://sepolia.optimism.io',
    'chain_id': 11155420,
    'explorer': 'https://sepolia-optimism.etherscan.io',
    'name': 'OP Sepolia'
}

def main():
    print("╔════════════════════════════════════════════════════════════╗")
    print("║   LUXBIN IMMUNE SYSTEM - Quick Deploy to OP Sepolia       ║")
    print("║   Adding immune cells to your existing LUXBIN chain       ║")
    print("╚════════════════════════════════════════════════════════════╝")

    # Connect to OP Sepolia
    print(f"\n🌐 Connecting to {OP_SEPOLIA['name']}...")
    w3 = Web3(Web3.HTTPProvider(OP_SEPOLIA['rpc']))

    if not w3.is_connected():
        print("❌ Failed to connect to OP Sepolia")
        print("   Check your internet connection")
        return

    print(f"✅ Connected to {OP_SEPOLIA['name']}")
    print(f"   Chain ID: {OP_SEPOLIA['chain_id']}")

    # Get or create deployment account
    private_key = os.getenv('DEPLOYER_PRIVATE_KEY')

    if not private_key:
        print("\n⚠️  No DEPLOYER_PRIVATE_KEY found in environment")
        print("   Creating new deployment account...")
        account = Account.create()
        print(f"\n🔑 NEW DEPLOYMENT ACCOUNT CREATED:")
        print(f"   Address: {account.address}")
        print(f"   Private Key: {account.key.hex()}")
        print(f"\n💡 To use this account:")
        print(f"   export DEPLOYER_PRIVATE_KEY='{account.key.hex()}'")
        print(f"\n💰 Fund this address with OP Sepolia ETH:")
        print(f"   Faucet: https://www.alchemy.com/faucets/optimism-sepolia")
        print(f"   Send to: {account.address}")
        return

    # Load account
    account = Account.from_key(private_key)
    print(f"\n👤 Using account: {account.address}")

    # Check balance
    balance = w3.eth.get_balance(account.address)
    balance_eth = w3.from_wei(balance, 'ether')

    print(f"💰 Balance: {balance_eth:.6f} ETH")

    if balance_eth < 0.01:
        print(f"\n⚠️  Low balance! You need OP Sepolia ETH for gas.")
        print(f"   Get free testnet ETH from:")
        print(f"   https://www.alchemy.com/faucets/optimism-sepolia")
        print(f"\n   Send to: {account.address}")
        return

    print(f"✅ Sufficient balance for deployment!")

    # Deployment plan
    print(f"\n📋 DEPLOYMENT PLAN:")
    print(f"   1. Deploy ImmuneCell NFT Contract (ERC-721)")
    print(f"   2. Deploy LuxbinToken Contract (ERC-20)")
    print(f"   3. Deploy ImmuneStaking Contract")
    print(f"   4. Deploy GaslessForwarder Contract")
    print(f"   5. Initialize and connect all contracts")
    print(f"   6. Mint initial immune cell NFTs")
    print(f"   7. Activate autonomous system")

    print(f"\n💡 NEXT STEPS:")
    print(f"   1. Compile Solidity contracts:")
    print(f"      cd /Users/nicholechristie/luxbin-chain")
    print(f"      npm install @openzeppelin/contracts")
    print(f"      npx hardhat compile")
    print(f"")
    print(f"   2. Or use Remix IDE (easier):")
    print(f"      - Visit https://remix.ethereum.org")
    print(f"      - Upload contracts from /Users/nicholechristie/luxbin-chain/contracts/")
    print(f"      - Compile each contract")
    print(f"      - Deploy to OP Sepolia using MetaMask")
    print(f"      - Copy deployed addresses")

    # Create deployment configuration
    config = {
        'network': 'op-sepolia',
        'deployer': account.address,
        'luxbin_address': 'YOUR_EXISTING_LUXBIN_CONTRACT_ADDRESS',  # User needs to fill this
        'contracts_to_deploy': [
            'ImmuneCell.sol',
            'LuxbinToken.sol',
            'ImmuneStaking.sol',
            'GaslessForwarder.sol'
        ],
        'initial_nfts': {
            'DETECTOR': 1000,
            'DEFENDER': 500,
            'MEMORY': 100,
            'REGULATORY': 50
        }
    }

    # Save configuration
    with open('immune_deployment_config.json', 'w') as f:
        json.dump(config, f, indent=2)

    print(f"\n📝 Configuration saved to: immune_deployment_config.json")
    print(f"\n🎯 What happens next:")
    print(f"   - Deploy contracts (via Remix or Hardhat)")
    print(f"   - Contracts will be on OP Sepolia (FREE GAS!)")
    print(f"   - NFTs will be mintable by anyone")
    print(f"   - System will be autonomous")
    print(f"   - No ongoing costs!")

    print(f"\n{'='*60}")
    print(f"Ready to deploy! Use Remix IDE or continue with Hardhat.")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
