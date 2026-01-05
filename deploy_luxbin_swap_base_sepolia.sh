#!/bin/bash

echo "🚀 Deploying LuxbinSwap to Base Sepolia Testnet"
echo "================================================"

# Check if PRIVATE_KEY is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY environment variable not set"
    echo "Please set your private key (without 0x prefix):"
    echo "export PRIVATE_KEY=your_private_key_here"
    exit 1
fi

# Configuration
LUX_TOKEN_ADDRESS="0x66b4627B4Dd73228D24f24E844B6094091875169"  # Update this with your deployed LUX token address
INITIAL_RATE="1000"  # 1 ETH = 1000 LUX tokens

# Initial owner address (your wallet address)
INITIAL_OWNER="$(cast wallet address $PRIVATE_KEY)"

echo "Configuration:"
echo "  LUX Token Address: $LUX_TOKEN_ADDRESS"
echo "  Initial Rate: $INITIAL_RATE LUX per ETH"
echo "  Owner Address: $INITIAL_OWNER"
echo ""

# Deploy using Foundry
echo "Deploying LuxbinSwap contract..."
forge create \
    --broadcast \
    --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY \
    contracts/LuxbinSwap.sol:LuxbinSwap \
    --constructor-args $LUX_TOKEN_ADDRESS $INITIAL_RATE $INITIAL_OWNER

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Save the swap contract address above"
echo "2. Mint some LUX tokens to your wallet (if needed)"
echo "3. Transfer LUX tokens to the swap contract"
echo "4. Update your frontend with the swap contract address"
echo ""
echo "💡 Test the swap:"
echo "   cast send --rpc-url https://sepolia.base.org --private-key \$PRIVATE_KEY \$SWAP_ADDRESS --value 0.01ether"
echo ""
echo "🔗 Base Sepolia Explorer: https://sepolia.basescan.org/"