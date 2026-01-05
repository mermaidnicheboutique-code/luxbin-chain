# 🌈 Deploy NICHE as SuperchainERC20 - Cross-Chain Token Guide

Deploy NICHE token across the entire Superchain ecosystem (Base, Optimism, Mode, Zora, etc.) with automatic cross-chain transfers!

## 🎯 What You're Building

A **SuperchainERC20** version of NICHE that:
- ✅ Works on **ALL Superchain networks** (Base, OP Mainnet, Mode, Zora, Fraxtal, etc.)
- ✅ **Automatic cross-chain transfers** - mint on one chain, use on another
- ✅ **Same address everywhere** - deployed deterministically with Create2
- ✅ **Compatible with your reward system** - earn on Base, spend on Optimism
- ✅ **Maintains total supply** - burns on source chain, mints on destination

---

## 📋 Prerequisites

You need:
- ✅ 0.7 test ETH on Sepolia (you have this!)
- ✅ Foundry installed
- ✅ Node.js and pnpm
- ✅ Your Coinbase Smart Wallet

---

## 🚀 Quick Start (15 minutes)

### Step 1: Clone the SuperchainERC20 Starter Kit

```bash
# Clone the official OP Stack starter kit
git clone https://github.com/ethereum-optimism/superchainerc20-starter.git
cd superchainerc20-starter

# Install dependencies
pnpm install

# Initialize environment
pnpm init:env
```

### Step 2: Configure Your Token

Edit `deploy-config.toml`:

```toml
[deploy-config]
# Unique salt for deterministic deployment
salt = "niche_luxbin_v1"

# Deploy on Base Sepolia and OP Sepolia first (testnets)
chains = ["base_sepolia", "op_sepolia"]

[token]
# Your wallet address (will be the owner)
owner_address = "YOUR_WALLET_ADDRESS"

# Token details
name = "Niche Superchain Token"
symbol = "NICHE"
decimals = 18
```

### Step 3: Update RPC Endpoints

```bash
# Auto-fetch RPC URLs for all Superchain networks
pnpm contracts:update:rpcs
```

This updates `foundry.toml` with:
- Base Sepolia RPC
- OP Sepolia RPC
- All other Superchain network RPCs

### Step 4: Replace Token Contract

Copy your SuperchainERC20 contract:

```bash
# Copy from your luxbin-app
cp ../luxbin-app/contracts/NicheSuperchainERC20.sol contracts/src/L2NativeSuperchainERC20.sol
```

### Step 5: Deploy to Testnets

```bash
# Deploy NICHE to Base Sepolia and OP Sepolia
pnpm contracts:deploy:token
```

This will:
- Deploy to both chains at the **SAME address** (using Create2)
- Print deployment addresses
- Save deployment info

**Example output:**
```
✅ Deployed to Base Sepolia: 0x1234...5678
✅ Deployed to OP Sepolia:   0x1234...5678  (same address!)
```

### Step 6: Test Cross-Chain Transfer

```bash
# Start local development environment
pnpm dev

# Open http://localhost:5173
# Mint tokens on Base Sepolia
# Transfer to OP Sepolia
# Watch them appear!
```

---

## 🎨 Mainnet Deployment

Once tested, deploy to production:

### Update `deploy-config.toml` for Mainnet

```toml
[deploy-config]
salt = "niche_luxbin_mainnet_v1"

# Deploy to ALL Superchain mainnets
chains = [
  "base",          # Base Mainnet
  "op",            # Optimism Mainnet
  "mode",          # Mode Network
  "zora",          # Zora Network
  "fraxtal",       # Fraxtal
  "cyber",         # Cyber Network
  "orderly",       # Orderly Network
  "worldchain"     # World Chain
]

[token]
owner_address = "YOUR_MAINNET_WALLET"
name = "Niche Superchain Token"
symbol = "NICHE"
decimals = 18
```

### Deploy to Production

```bash
# Make sure you have ETH on ALL chains for deployment
# Deploy across entire Superchain
pnpm contracts:deploy:token --network mainnet
```

**Cost Estimate:**
- ~$5-10 per chain for deployment
- Need ETH on each chain
- Total for 8 chains: ~$40-80

---

## 🔧 Integrate with Reward System

### Update RewardDistributor to Use SuperchainERC20

The RewardDistributor needs to mint NICHE tokens. Update it to call the `mintReward` function:

```solidity
// In DeploymentRewardDistributor.sol
function rewardDeployment(address deployer) external returns (uint256) {
    // Calculate reward...

    // Instead of transferring, MINT new tokens
    INicheSuperchain(nicheToken).mintReward(deployer, reward);

    return reward;
}
```

### Deploy on Each Chain

You'll need a RewardDistributor on **each chain** where you want to offer rewards:

```bash
# Deploy RewardDistributor on Base
forge create DeploymentRewardDistributor \
  --rpc-url base \
  --constructor-args <NICHE_ADDRESS> <MAX_REWARDS>

# Deploy RewardDistributor on Optimism
forge create DeploymentRewardDistributor \
  --rpc-url optimism \
  --constructor-args <NICHE_ADDRESS> <MAX_REWARDS>
```

---

## 🌟 How Cross-Chain Transfers Work

### User Flow:
1. **User deploys contract on Base** → Earns 500 NICHE on Base
2. **User wants to use NICHE on Optimism**
3. **User calls `sendERC20` on Base:**
   ```solidity
   L2ToL2CrossDomainMessenger.sendERC20(
     nicheToken,
     optimismChainId,
     recipientAddress,
     amount
   )
   ```
4. **Automatic cross-chain transfer:**
   - Burns NICHE on Base
   - Mints NICHE on Optimism
   - Total supply remains constant
5. **User receives NICHE on Optimism** in ~2 minutes

### Frontend Integration:

```typescript
// Add to your NicheRewardsDashboard component
import { useCrossChainTransfer } from '@/hooks/useSuperchain';

function TransferToOptimism() {
  const { transfer, isLoading } = useCrossChainTransfer();

  const handleTransfer = async () => {
    await transfer({
      token: NICHE_TOKEN_ADDRESS,
      destinationChain: 'optimism',
      amount: parseEther('1000'), // 1000 NICHE
      recipient: address
    });
  };

  return (
    <button onClick={handleTransfer}>
      Transfer NICHE to Optimism →
    </button>
  );
}
```

---

## 📊 Multi-Chain Reward Strategy

### Reward Distribution Per Chain:

| Chain | Reward Pool | Use Case |
|-------|------------|----------|
| **Base** | 5M NICHE | Primary - Contract deployments |
| **Optimism** | 3M NICHE | DeFi integrations |
| **Mode** | 2M NICHE | NFT deployments |
| **Zora** | 2M NICHE | Creator rewards |
| **Others** | 2.7M NICHE | Future expansion |
| **Team** | 6.3M NICHE | Operations (30%) |

**Total: 21M NICHE across all chains**

### Deployment Rewards By Chain:

```solidity
// Base: Full rewards
Base deployment = 500 NICHE base + bonus

// Optimism: Higher gas, higher reward
Optimism deployment = 750 NICHE base + bonus

// Mode: NFT-focused
Mode NFT deployment = 1000 NICHE
Mode Token deployment = 500 NICHE

// Auto-adjust based on chain
```

---

## 🎯 Benefits of SuperchainERC20

### For Users:
✅ Earn NICHE on any Superchain network
✅ Use NICHE on any Superchain network
✅ No manual bridging needed
✅ Fast cross-chain transfers (~2 min)
✅ Low fees on all chains

### For You:
✅ One token standard, works everywhere
✅ Expand to new chains easily
✅ Interoperable reward system
✅ Future-proof for new Superchain networks
✅ Leverages OP Stack interoperability

---

## 🔗 Resources

### Official Docs:
- [SuperchainERC20 Standard](https://specs.optimism.io/interop/token-bridging.html)
- [Starter Kit](https://github.com/ethereum-optimism/superchainerc20-starter)
- [Interop Explainer](https://docs.optimism.io/stack/interop/explainer)

### Testing:
- [Supersim](https://github.com/ethereum-optimism/supersim) - Local multi-chain environment
- [Test on Sepolia](https://docs.optimism.io/builders/app-developers/tutorials/cross-chain-nft)

### Deployment:
- [Superchain Registry](https://github.com/ethereum-optimism/superchain-registry)
- [Chain IDs](https://chainlist.org/?search=optimism)

---

## 🆘 Troubleshooting

### "Create2 addresses don't match"
- Ensure bytecode is EXACTLY the same on all chains
- Use same compiler version
- Use same optimization settings
- Same salt value

### "Cross-chain transfer failed"
- Check interop is enabled on both chains
- Verify token deployed at same address
- Ensure sufficient balance to burn

### "Mint exceeds max supply"
- Total supply is tracked GLOBALLY across all chains
- Each chain maintains its own balance
- Sum of all chains cannot exceed 21M

---

## 🎉 Next Steps

After deploying SuperchainERC20 NICHE:

1. **Update frontend** to show multi-chain balances
2. **Add chain selector** for rewards dashboard
3. **Enable cross-chain transfers** in UI
4. **Deploy reward distributors** on each chain
5. **Test end-to-end** flow on testnets
6. **Launch on mainnets** when ready

---

## 💡 Pro Tips

1. **Start with 2-3 chains** - Base, Optimism, Mode
2. **Test thoroughly** on Sepolia networks first
3. **Keep some supply** unallocated for future chains
4. **Monitor cross-chain activity** with block explorers
5. **Use same salt** across all deployments

---

**Ready to make NICHE truly interoperable?** Start with Step 1! 🚀

Your token will work seamlessly across the entire Superchain ecosystem.
