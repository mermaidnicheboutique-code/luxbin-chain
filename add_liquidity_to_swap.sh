#!/bin/bash

echo "💰 Adding LUX Tokens to Swap Contract"
echo "===================================="

# Check if PRIVATE_KEY is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY environment variable not set"
    exit 1
fi

# Configuration - Update these addresses
LUX_TOKEN_ADDRESS="0x66b4627B4Dd73228D24f24E844B6094091875169"  # Your LUX token contract
SWAP_CONTRACT_ADDRESS="0x0000000000000000000000000000000000000000"  # Update with deployed swap contract
AMOUNT_TO_ADD="1000000000000000000000000"  # 1,000,000 LUX tokens (with 18 decimals)

if [ "$SWAP_CONTRACT_ADDRESS" = "0x0000000000000000000000000000000000000000" ]; then
    echo "❌ Error: Please update SWAP_CONTRACT_ADDRESS with your deployed swap contract address"
    exit 1
fi

echo "Configuration:"
echo "  LUX Token: $LUX_TOKEN_ADDRESS"
echo "  Swap Contract: $SWAP_CONTRACT_ADDRESS"
echo "  Amount to Add: $(echo "scale=2; $AMOUNT_TO_ADD / 1000000000000000000" | bc) LUX"
echo ""

# First, check current LUX balance
echo "Checking current LUX balance..."
BALANCE=$(cast call --rpc-url https://sepolia.base.org $LUX_TOKEN_ADDRESS "balanceOf(address)" $(cast wallet address $PRIVATE_KEY))
echo "Current LUX Balance: $(echo "scale=2; $BALANCE / 1000000000000000000" | bc) LUX"
echo ""

# Mint tokens if needed (uncomment if you have minting permissions)
echo "💡 If you need to mint LUX tokens first, run:"
echo "   cast send --rpc-url https://sepolia.base.org --private-key \$PRIVATE_KEY $LUX_TOKEN_ADDRESS \"mint(address,uint256)\" $(cast wallet address $PRIVATE_KEY) $AMOUNT_TO_ADD"
echo ""

# Approve the swap contract to spend LUX tokens
echo "Approving swap contract to spend LUX tokens..."
cast send --rpc-url https://sepolia.base.org --private-key $PRIVATE_KEY \
    $LUX_TOKEN_ADDRESS \
    "approve(address,uint256)" \
    $SWAP_CONTRACT_ADDRESS \
    $AMOUNT_TO_ADD

echo ""

# Transfer LUX tokens to the swap contract
echo "Transferring LUX tokens to swap contract..."
cast send --rpc-url https://sepolia.base.org --private-key $PRIVATE_KEY \
    $LUX_TOKEN_ADDRESS \
    "transfer(address,uint256)" \
    $SWAP_CONTRACT_ADDRESS \
    $AMOUNT_TO_ADD

echo ""
echo "✅ Liquidity added successfully!"
echo ""

# Verify the transfer
echo "Verifying swap contract balance..."
SWAP_BALANCE=$(cast call --rpc-url https://sepolia.base.org $LUX_TOKEN_ADDRESS "balanceOf(address)" $SWAP_CONTRACT_ADDRESS)
echo "Swap Contract LUX Balance: $(echo "scale=2; $SWAP_BALANCE / 1000000000000000000" | bc) LUX"
echo ""

echo "🎉 Ready for users to buy LUX with ETH!"
echo "   Rate: 1 ETH = 1000 LUX"