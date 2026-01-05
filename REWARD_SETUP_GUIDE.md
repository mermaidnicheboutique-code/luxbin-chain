# 🎁 NICHE Rewards System - Complete Setup Guide

You have **0.7 test ETH on Sepolia** - Perfect! Let's get your reward system running.

## 📋 Overview

You're setting up a system where:
- Users earn NICHE tokens for deploying contracts
- Anyone can claim a free 1,000 NICHE airdrop
- Validators earn rewards for network participation
- 70% of NICHE supply (14.7M tokens) goes to rewards

---

## 🚀 Step-by-Step Setup (10 minutes)

### Step 1: Bridge ETH to Base Network ⛓️

**Current Status:** ✅ You have 0.7 ETH on Sepolia

**Action:**
1. Visit: https://bridge.base.org/
2. Connect your Coinbase Smart Wallet
3. Select: Sepolia → Base Sepolia
4. Bridge amount: **0.5 ETH** (keep 0.2 for future use)
5. Wait ~5 minutes for bridge confirmation

**Why:** The reward system runs on Base network where your NICHE token is deployed

---

### Step 2: Deploy Reward Distributor Contract 📝

**Prerequisites:** ✅ ETH bridged to Base

**Action:**
1. Go to: https://remix.ethereum.org
2. Create new file: `DeploymentRewardDistributor.sol`
3. Copy contract from: `luxbin-app/contracts/DeploymentRewardDistributor.sol`
4. Compile with Solidity 0.8.20+
5. Deploy with these constructor parameters:
   ```
   _nicheToken: 0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe
   _maxRewardsToDistribute: 14700000000000000000000000
   ```
   (That's 14.7 million NICHE in wei)

6. **Save the deployed contract address!** You'll need it in Step 4.

**Why:** This contract manages all reward distributions

---

### Step 3: Fund the Reward Contract 💰

**Prerequisites:** ✅ Reward Distributor deployed

**You need:** 14.7M NICHE tokens to fund rewards

**Option A: If you have NICHE tokens**
1. Go to BaseScan: https://basescan.org/address/0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe
2. Connect wallet
3. Transfer 14,700,000 NICHE to your RewardDistributor contract address

**Option B: If you need NICHE tokens**
Since you deployed the NICHE token, you should have the initial supply in your wallet.
- Check your balance on BaseScan
- If you're the deployer, you have all 21M NICHE
- Transfer 14.7M to the RewardDistributor

**Option C: Mint more (if token allows)**
- If your NICHE token has a mint function, mint 14.7M to the RewardDistributor

---

### Step 4: Update Frontend with Contract Address 🔧

**Prerequisites:** ✅ Reward Distributor deployed and funded

**Action:**
1. Open: `luxbin-app/components/NicheRewardsDashboard.tsx`
2. Find line 10:
   ```typescript
   const REWARD_DISTRIBUTOR_ADDRESS = '0x...';
   ```
3. Replace with your deployed RewardDistributor address
4. Save and commit:
   ```bash
   cd luxbin-app
   git add components/NicheRewardsDashboard.tsx
   git commit -m "✅ Add RewardDistributor address"
   git push origin main
   ```

**Vercel will auto-deploy in ~2 minutes**

---

### Step 5: Integrate Rewards with Deployers 🎯

**Make users earn NICHE when they deploy contracts!**

**Action:**
Update `TokenDeployer.tsx` and `NFTDeployer.tsx` to call the reward contract after successful deployments.

Add this function to both deployers:

```typescript
const rewardDeployment = async (deployerAddress: string) => {
  try {
    const { writeContract } = useWriteContract();

    await writeContract({
      address: 'YOUR_REWARD_DISTRIBUTOR_ADDRESS' as `0x${string}`,
      abi: [{
        inputs: [{ name: "deployer", type: "address" }],
        name: "rewardDeployment",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function"
      }],
      functionName: 'rewardDeployment',
      args: [deployerAddress],
    });
  } catch (error) {
    console.error('Reward error:', error);
  }
};
```

Call `rewardDeployment(address)` after successful deployment.

---

### Step 6: Test Everything! 🧪

**Test Airdrop:**
1. Visit: https://your-app.vercel.app/rewards
2. Connect wallet
3. Click "Claim Free Airdrop"
4. Receive 1,000 NICHE!

**Test Deployment Reward:**
1. Go to Token Deployer
2. Deploy a test token
3. Check rewards dashboard
4. You should see +500 NICHE (first deployment reward)

**Test DNA Explorer:**
1. Visit: /dna-explorer
2. Watch real-time Base blockchain activity
3. See your deployments in the DNA helix!

---

## 🎉 You're Done!

Your reward system is now live! Users can:

✅ Claim 1,000 NICHE airdrop (once per wallet)
✅ Earn 500-5,000 NICHE per contract deployment
✅ View beautiful DNA block explorer
✅ Track all rewards in dashboard

---

## 📊 Quick Reference

### Deployed Contracts
- **NICHE Token:** `0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe`
- **Reward Distributor:** `[Deploy in Step 2]`

### Reward Amounts
- Airdrop: 1,000 NICHE
- Base deployment: 500 NICHE
- Bonus per previous deploy: +50 NICHE
- Max per deployment: 5,000 NICHE

### Total Reward Pool
- 70% of 21M = **14.7 million NICHE**
- Distributes until exhausted
- Track progress at /rewards

---

## 🆘 Troubleshooting

**"Insufficient rewards remaining"**
- Check RewardDistributor has enough NICHE tokens
- Verify you transferred 14.7M NICHE to it

**"Already claimed airdrop"**
- Each address can only claim once
- Use different wallet to test again

**Deployments not rewarding**
- Ensure Step 5 integration is complete
- Check RewardDistributor address is correct
- Verify contract has NICHE token balance

**Bridge taking too long**
- Sepolia→Base usually takes 5-10 minutes
- Check bridge status at bridge.base.org

---

## 💡 Tips

1. **Save some ETH** - Keep 0.2 ETH on Sepolia for future testing
2. **Monitor rewards** - Use /rewards dashboard to track distribution
3. **DNA Explorer** - Show users the visual blockchain at /dna-explorer
4. **Marketing** - "Deploy contracts, earn NICHE!" is a great hook

---

## 🔗 Useful Links

- Base Bridge: https://bridge.base.org/
- BaseScan (check balances): https://basescan.org/
- Remix IDE (deploy contracts): https://remix.ethereum.org/
- Your NICHE token: https://basescan.org/address/0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe

---

**Ready to start? Begin with Step 1!** 🚀
