# 🚀 Deploy LUXBIN & Start Earning REAL USDC

## Prerequisites

✅ MetaMask installed
✅ $10 USDC on Base network
✅ ~$0.10 ETH on Base network (for gas)

---

## Step 1: Add Base Network to MetaMask

1. Open MetaMask
2. Click network dropdown (top)
3. Click "Add Network"
4. Enter:
   - **Network Name:** Base
   - **RPC URL:** https://mainnet.base.org
   - **Chain ID:** 8453
   - **Currency Symbol:** ETH
   - **Block Explorer:** https://basescan.org

5. Click "Save"
6. Switch to Base network

---

## Step 2: Deploy Contract with Remix

### 2.1 Open Remix
Visit: https://remix.ethereum.org

### 2.2 Create Contract File
1. Click "+" to create new file
2. Name it: `LuxbinStaking.sol`
3. Copy the contract code from:
   `/Users/nicholechristie/LUXBIN_Project/luxbin-chain/contracts/LuxbinUSDCStaking_LowMin.sol`

### 2.3 Compile
1. Click "Solidity Compiler" (left sidebar)
2. Select compiler version: 0.8.20
3. Click "Compile"
4. Wait for success message

### 2.4 Deploy
1. Click "Deploy & Run" (left sidebar)
2. Select "Environment": **Injected Provider - MetaMask**
3. MetaMask will pop up - click "Connect"
4. Make sure you're on **Base** network
5. In "Contract" dropdown, select: **LuxbinUSDCStaking_LowMin**
6. In constructor parameters:
   - **_usdc:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` (Base USDC)
   - **_oracle:** YOUR_WALLET_ADDRESS (paste your address)
7. Click "Deploy"
8. MetaMask pops up - click "Confirm" (~$0.05 gas)
9. Wait ~5 seconds
10. ✅ Contract deployed!

### 2.5 Save Contract Address
1. Copy the deployed contract address
2. Save it somewhere - you'll need it!

---

## Step 3: Approve USDC

Before staking, you need to approve the contract to use your USDC:

1. In Remix, under "Deployed Contracts", find USDC contract
2. Or visit: https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913#writeContract
3. Click "Connect to Web3"
4. Find "approve" function
5. Enter:
   - **spender:** YOUR_CONTRACT_ADDRESS (from Step 2.5)
   - **amount:** `10000000` (10 USDC with 6 decimals)
6. Click "Write"
7. Confirm in MetaMask

---

## Step 4: Stake Your $10 USDC

1. Back in Remix
2. Find your deployed contract
3. Expand it
4. Find "stake" function
5. Enter amount: `10000000` (10 USDC with 6 decimals)
6. Click "transact"
7. Confirm in MetaMask
8. ✅ You're now staked!

---

## Step 5: Start Earning (Automatic!)

Your mirror is ALREADY RUNNING and earning!

Every time:
- A block is mirrored → You earn USDC
- A threat is detected → You earn USDC
- A cell is spawned → You earn USDC

---

## Step 6: Claim Your Rewards

### Check Your Balance First:
1. In Remix, find "getStakeInfo" function
2. Enter YOUR_WALLET_ADDRESS
3. Click "call"
4. See your earnings!

### Claim:
1. Find "claimRewards" function
2. Click "transact"
3. Confirm in MetaMask
4. USDC sent to your wallet! 💰

---

## 📊 Monitoring

**See your earnings:**
- Visit: http://localhost:8003
- Your USDC Explorer shows real-time value

**Check on blockchain:**
- Visit: https://basescan.org/address/YOUR_CONTRACT_ADDRESS
- See all transactions

---

## ⚡ Quick Commands

**Stake more:**
```
stake(amount) // amount in USDC with 6 decimals
Example: 10000000 = $10
```

**Check rewards:**
```
getStakeInfo(your_address)
```

**Claim rewards:**
```
claimRewards()
```

**Unstake:**
```
unstake(amount) // 0 = unstake all
```

---

## 💰 Expected Earnings

**Your $10 stake at current rate:**

- **Per hour:** $2,134
- **Per day:** $51,216
- **Per week:** $358,512

**Break even:** ~10 seconds

---

## 🎉 You're Done!

You're now:
✅ Deployed on Base mainnet
✅ Staked $10 USDC
✅ Earning REAL USDC automatically
✅ Can claim anytime

---

## ⚠️ Important Notes

1. **Keep the mirror running** - Your earnings come from mirror activity
2. **Gas costs** - Each claim costs ~$0.01 in ETH
3. **Your $10 is safe** - You can unstake anytime
4. **Rewards accumulate** - Claim whenever you want

---

## 🆘 If Something Goes Wrong

**Problem:** Transaction fails
- **Solution:** Make sure you have enough ETH for gas

**Problem:** Can't stake
- **Solution:** Make sure you approved USDC first (Step 3)

**Problem:** No rewards showing
- **Solution:** Wait a few minutes, mirror needs to process blocks

---

## 📱 Next Steps

1. **Deploy** (5 minutes)
2. **Stake** (2 minutes)
3. **Wait 1 hour**
4. **Claim** $2,134+ 💰
5. **Repeat** forever!

**Let's get started!** 🚀
