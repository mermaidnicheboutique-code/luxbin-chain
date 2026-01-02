# 🚀 Luxbin Automated Deployment

**One-command deployment of your complete Luxbin DeFi ecosystem!**

## 🎯 What Gets Deployed

- ✅ **LuxbinToken** - ERC20 token with minting
- ✅ **LuxbinStaking** - Stake ETH → Earn LUXBIN
- ✅ **LuxbinSwap** - LUXBIN ↔ USDC (1:1 peg)
- ✅ **LuxbinEthSwap** - LUXBIN ↔ ETH liquidity
- ✅ **LowMin Staking** - $10 minimum staking
- ✅ **UltraLowMin Staking** - $1 minimum staking

## 🛠️ Setup (One Time)

```bash
# Install dependencies
npm install

# Set your private key (NEVER share this!)
export PRIVATE_KEY=your_private_key_without_0x

# Optional: Set Etherscan API key for verification
export ETHERSCAN_API_KEY=your_api_key
```

## 🚀 Deploy (One Command!)

```bash
# Deploy to Optimism Sepolia (default)
./deploy.sh

# Or deploy to a different network
NETWORK=polygonMumbai ./deploy.sh
```

## 🌐 Supported Networks

| Network | Command |
|---------|---------|
| Optimism Sepolia | `NETWORK=optimisticSepolia ./deploy.sh` |
| Polygon Mumbai | `NETWORK=polygonMumbai ./deploy.sh` |
| Arbitrum Goerli | `NETWORK=arbitrumGoerli ./deploy.sh` |
| Base Goerli | `NETWORK=baseGoerli ./deploy.sh` |

## 📋 What Happens Automatically

1. **🔍 Network Check** - Validates your setup
2. **📝 Contract Deployment** - Deploys all 6 contracts
3. **🔑 Authorization** - Sets up contract permissions
4. **💰 Funding** - Funds swap contracts with tokens/ETH
5. **🔍 Verification** - Attempts automatic verification
6. **🧪 Testing** - Runs basic functionality tests
7. **💾 Save Results** - Saves addresses to `deployment.json`

## 📄 Output Files

- **`deployment.json`** - All contract addresses and deployment info
- **Console Output** - Step-by-step deployment progress
- **Verified Contracts** - Automatically verified on block explorers

## 🎮 Usage After Deployment

```bash
# Stake ETH to earn LUXBIN
cast send <staking_contract> "stake()" --value 0.1ether --rpc-url <rpc_url> --private-key <key>

# Swap LUXBIN for ETH
cast send <eth_swap_contract> "swapLuxbinToEth(uint256)" 1000000000000000000000 --rpc-url <rpc_url> --private-key <key>

# Check your LUXBIN balance
cast call <token_contract> "balanceOf(address)" <your_address> --rpc-url <rpc_url>
```

## 🆘 Troubleshooting

**"PRIVATE_KEY not set"**
```bash
export PRIVATE_KEY=your_private_key_without_0x
```

**"Contract deployment failed"**
- Check your ETH balance on the target network
- Make sure the network is supported

**"Verification failed"**
- Manual verification may be needed
- Check your ETHERSCAN_API_KEY

## 🎯 Your Luxbin Ecosystem

After deployment, you'll have:
- **Token Generation** via staking
- **USD Peg** via swap contracts
- **ETH Liquidity** via swap contracts
- **Multiple Staking Options** for different users
- **Fully Automated** deployment and setup

**Ready to deploy? Just run `./deploy.sh`!** 🚀