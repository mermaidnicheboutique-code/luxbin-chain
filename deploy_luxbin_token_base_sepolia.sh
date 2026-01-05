#!/bin/bash

echo "🚀 Deploying LuxbinToken to Base Sepolia Testnet"
echo "================================================"

# Check if PRIVATE_KEY is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY environment variable not set"
    echo "Please set your private key (without 0x prefix):"
    echo "export PRIVATE_KEY=your_private_key_here"
    exit 1
fi

# Initial owner address (your wallet address)
INITIAL_OWNER="$(cast wallet address $PRIVATE_KEY)"

echo "Initial Owner Address: $INITIAL_OWNER"
echo ""

# Deploy using Foundry
forge create \
    --broadcast \
    --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY \
    LuxbinToken.sol:LuxbinToken \
    --constructor-args $INITIAL_OWNER

echo ""
echo "✅ Deployment complete! Save the contract address above."