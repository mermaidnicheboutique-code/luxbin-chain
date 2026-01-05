#!/bin/bash

echo "🚀 Deploying LuxbinUSDCStaking_LowMin to Base Network"
echo "==================================================="

# Check if PRIVATE_KEY is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY environment variable not set"
    echo "Please set your private key (without 0x prefix):"
    echo "export PRIVATE_KEY=your_private_key_here"
    exit 1
fi

# Base network USDC contract address (mainnet)
# For testnet (Base Sepolia), use: 0x036CbD53842c5426634e7929541eC231BcE35231
USDC_ADDRESS="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

# Your wallet address as oracle
ORACLE_ADDRESS="0xB8BAeb03b7a57c091Ff9Dd456FC54DCDD5432Ad1"

echo "Using USDC Address: $USDC_ADDRESS"
echo "Using Oracle Address: $ORACLE_ADDRESS"
echo ""

# Deploy using Foundry
forge create \
    --broadcast \
    --rpc-url https://mainnet.base.org \
    --private-key $PRIVATE_KEY \
    LUXBIN_Project/luxbin-chain/contracts/LuxbinUSDCStaking_LowMin.sol:LuxbinUSDCStaking_LowMin \
    --constructor-args $USDC_ADDRESS $ORACLE_ADDRESS

echo ""
echo "✅ Deployment complete! Save the contract address above."