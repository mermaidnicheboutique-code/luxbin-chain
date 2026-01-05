#!/bin/bash

echo "🚀 Deploying LuxbinUSDCStaking_LowMin to Sepolia Testnet"
echo "======================================================"

# Check if PRIVATE_KEY is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY environment variable not set"
    echo "Please set your private key (without 0x prefix):"
    echo "export PRIVATE_KEY=your_private_key_here"
    exit 1
fi

# Sepolia USDC contract address
USDC_ADDRESS="0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

# Your wallet address as oracle (change if you have a different oracle)
ORACLE_ADDRESS="0xB8BAeb03b7a57c091Ff9Dd456FC54DCDD5432Ad1"

echo "Using USDC Address: $USDC_ADDRESS"
echo "Using Oracle Address: $ORACLE_ADDRESS"
echo ""

# Deploy using Foundry (trying alternative RPC)
forge create \
    --broadcast \
    --rpc-url https://ethereum-sepolia.publicnode.com \
    --private-key $PRIVATE_KEY \
    LUXBIN_Project/luxbin-chain/contracts/LuxbinUSDCStaking_LowMin.sol:LuxbinUSDCStaking_LowMin \
    --constructor-args $USDC_ADDRESS $ORACLE_ADDRESS

echo ""
echo "✅ Deployment complete! Save the contract address above."