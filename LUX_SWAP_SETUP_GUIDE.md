# 🚀 LUX Token Swap Setup Guide - Buy LUX with Testnet ETH

## 🎯 Goal: Enable users to buy LUX tokens using testnet ETH on Base Sepolia

---

## 📋 Prerequisites

1. **Foundry** installed (`forge`, `cast`)
2. **Private key** with Base Sepolia ETH for deployment
3. **LUX token deployed** on Base Sepolia (address: `0x66b4627B4Dd73228D24f24E844B6094091875169`)

---

## 🚀 Step-by-Step Setup

### Step 1: Deploy LUX Token (if not already deployed)

```bash
# Set your private key
export PRIVATE_KEY=your_private_key_without_0x

# Deploy LUX token to Base Sepolia
./deploy_luxbin_token_base_sepolia.sh
```

**Save the deployed token address!**

---

### Step 2: Deploy Swap Contract

```bash
# Update the token address in deploy_luxbin_swap_base_sepolia.sh
# Line 18: LUX_TOKEN_ADDRESS="0xYOUR_DEPLOYED_LUX_TOKEN_ADDRESS"

# Deploy the swap contract
./deploy_luxbin_swap_base_sepolia.sh
```

**Save the deployed swap contract address!**

---

### Step 3: Mint LUX Tokens (if needed)

```bash
# Mint 1,000,000 LUX tokens to your wallet
cast send --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY \
    0xYOUR_LUX_TOKEN_ADDRESS \
    "mint(address,uint256)" \
    $(cast wallet address $PRIVATE_KEY) \
    1000000000000000000000000
```

---

### Step 4: Add Liquidity to Swap Contract

```bash
# Update the addresses in add_liquidity_to_swap.sh
# LUX_TOKEN_ADDRESS="0xYOUR_LUX_TOKEN_ADDRESS"
# SWAP_CONTRACT_ADDRESS="0xYOUR_SWAP_CONTRACT_ADDRESS"

# Add LUX tokens to the swap contract
./add_liquidity_to_swap.sh
```

---

### Step 5: Update Frontend

Update `components/LuxbinSwap.tsx`:

```typescript
const SWAP_CONTRACT = "0xYOUR_DEPLOYED_SWAP_CONTRACT_ADDRESS";
```

---

### Step 6: Deploy to Vercel

```bash
# Commit and push your changes
git add .
git commit -m "✨ Add LUX token swap functionality"
git push origin main

# Deploy on Vercel (auto-deploys on push)
```

---

## 🧪 Testing the Swap

### Manual Test with Cast

```bash
# Buy LUX tokens by sending 0.01 ETH to the swap contract
cast send --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY \
    --value 0.01ether \
    0xYOUR_SWAP_CONTRACT_ADDRESS
```

### Frontend Test

1. Open your app on Base Sepolia testnet
2. Connect wallet with testnet ETH
3. Go to the swap section
4. Enter ETH amount (e.g., 0.01)
5. Click "Swap" - should receive ~10 LUX tokens
6. **Gas fee should be $0** (sponsored by Coinbase credits!)

---

## 🔧 Contract Details

### Swap Contract Features

- **Fixed Rate**: 1 ETH = 1000 LUX (adjustable by owner)
- **Gasless**: Uses Coinbase Paymaster for sponsored transactions
- **Secure**: ReentrancyGuard protection
- **Owner Controls**: Can update rate, withdraw funds

### Key Functions

- `buyTokens()` - Send ETH to receive LUX tokens
- `getLuxAmount(uint256 ethAmount)` - Preview LUX amount for ETH
- `setRate(uint256 newRate)` - Update exchange rate (owner only)
- `withdrawTokens(uint256 amount)` - Withdraw LUX tokens (owner only)

---

## 🎨 Frontend Integration

The `LuxbinSwap` component automatically:

- Calculates LUX amount based on ETH input
- Shows available liquidity
- Displays current exchange rate
- Handles gasless transactions via Coinbase Paymaster

---

## 📊 Exchange Rate

**Current Rate**: 1 ETH = 1000 LUX

To change the rate:
```bash
cast send --rpc-url https://sepolia.base.org \
    --private-key $PRIVATE_KEY \
    0xYOUR_SWAP_CONTRACT_ADDRESS \
    "setRate(uint256)" \
    NEW_RATE
```

---

## 🔗 Useful Links

- **Base Sepolia Explorer**: https://sepolia.basescan.org/
- **Coinbase Developer Portal**: https://portal.cdp.coinbase.com/
- **Base Sepolia Faucet**: Get testnet ETH

---

## ✅ Success Checklist

- [ ] LUX token deployed on Base Sepolia
- [ ] Swap contract deployed
- [ ] Liquidity added to swap contract
- [ ] Frontend updated with contract address
- [ ] App deployed to Vercel
- [ ] Test transaction successful
- [ ] Gas fee shows as $0 (sponsored)

---

## 🎉 You're Done!

Users can now buy LUX tokens with testnet ETH, and all transactions are gasless thanks to your Coinbase Developer credits! 🚀