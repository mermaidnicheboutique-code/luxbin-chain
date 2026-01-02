#!/bin/bash

echo "🚀 LUXBIN Swap Contract Deployment"
echo "=================================="
echo ""
echo "This will deploy LuxbinEthSwap to Base Mainnet"
echo "Network: Base"
echo "LUXBIN Token: 0x66b4627B4Dd73228D24f24E844B6094091875169"
echo ""

# Check if private key is provided
if [ -z "$PRIVATE_KEY" ]; then
    echo "⚠️  PRIVATE_KEY environment variable not set"
    echo ""
    echo "Please run:"
    echo "  export PRIVATE_KEY=your_private_key_here"
    echo "  ./deploy_swap.sh"
    echo ""
    echo "Or deploy manually with:"
    echo "  forge script script/DeploySwap.s.sol:DeploySwap --rpc-url https://mainnet.base.org --broadcast --verify"
    exit 1
fi

echo "📝 Deploying contract..."
forge script script/DeploySwap.s.sol:DeploySwap \
    --rpc-url https://mainnet.base.org \
    --broadcast \
    --verify \
    -vvvv

echo ""
echo "✅ Deployment complete!"
echo "Don't forget to:"
echo "  1. Copy the deployed contract address"
echo "  2. Update it in luxbin-app/components/LuxbinSwap.tsx"
echo "  3. Fund the contract with LUXBIN tokens"
