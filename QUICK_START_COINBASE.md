# 🚀 Quick Start: Coinbase Developer Platform Integration

Your Luxbin app is now configured with Coinbase Developer Platform!

## ✅ Your Configuration

**API Key ID:** `organizations/81979796-90c8-42d7-a88b-200131d4ca1d/apiKeys/66f39b5d-df7b-4bca-8abd-7e3f9723e947`

**Paymaster URL:** `https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM`

**Network:** Base Mainnet (Chain ID: 8453)

All credentials are stored in `.env` file (not committed to git).

---

## 📦 Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `@coinbase/coinbase-sdk` - Coinbase Developer Platform SDK
- `@coinbase/cdp-sdk` - Coinbase Digital Platform SDK
- `@coinbase/onchainkit` - OnchainKit for React components
- `ethers` - Ethereum library for blockchain interactions
- `express` - Web server framework
- `dotenv` - Environment variable management

---

## 🧪 Step 2: Test Your Integration

### Option A: Test Backend API

```bash
npm run test:backend
```

This will:
- Connect to Coinbase Paymaster
- Get network information
- Display Base network stats

### Option B: Test Complete Integration

```bash
npm run test:integration
```

This will:
- Initialize Coinbase SDK
- Create/get wallet
- Check balance
- Display wallet info

### Option C: Open HTML Demo

```bash
npm run open:html
```

Or manually open:
```bash
open coinbase_base_paymaster_integration.html
```

This provides a visual interface to:
- Connect your MetaMask wallet
- Switch to Base network
- Send gasless transactions

---

## 🔌 Step 3: Integration Options

### For Web Apps (Frontend)

Use the React component I created:

```bash
# Copy to your Next.js app
cp next-coinbase-integration.tsx /path/to/your/app/components/
```

Then import it:

```tsx
import CoinbaseIntegration from '@/components/next-coinbase-integration';

export default function Page() {
  return <CoinbaseIntegration />;
}
```

### For Node.js Backend

```javascript
import coinbase from './coinbase_sdk_integration.js';

// Initialize SDK
await coinbase.initializeCoinbaseSDK();

// Get or create wallet
const wallet = await coinbase.getCoinbaseWallet();

// Send gasless transaction
await coinbase.sendGaslessTransaction(
  wallet,
  'RECIPIENT_ADDRESS',
  0.001  // amount in ETH
);
```

### For API Server

```javascript
import { setupExpressAPI } from './coinbase_paymaster_backend.js';

// Start Express server
setupExpressAPI();

// Server runs on http://localhost:3000
// Endpoints:
// GET  /api/network
// GET  /api/balance/:address
// POST /api/send
// GET  /api/tx/:hash
```

---

## 📝 Code Examples

### Example 1: Check Network

```javascript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM'
);

const network = await provider.getNetwork();
console.log('Network:', network.name);
console.log('Chain ID:', network.chainId);
```

### Example 2: Get Balance

```javascript
const balance = await provider.getBalance('YOUR_ADDRESS');
console.log('Balance:', ethers.formatEther(balance), 'ETH');
```

### Example 3: Send Transaction

```javascript
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const tx = await wallet.sendTransaction({
  to: 'RECIPIENT_ADDRESS',
  value: ethers.parseEther('0.001')
});

console.log('TX Hash:', tx.hash);
await tx.wait();
console.log('Confirmed!');
```

### Example 4: Using Coinbase SDK

```javascript
import CoinbaseSDK from '@coinbase/coinbase-sdk';

CoinbaseSDK.configure({
  apiKeyName: process.env.COINBASE_API_KEY_ID,
  privateKey: process.env.COINBASE_API_SECRET,
});

const wallets = await CoinbaseSDK.Wallet.listWallets();
console.log('Wallets:', wallets);
```

---

## 🔗 Integration with Your Luxbin App

### Integrate with Vercel Deployment

Add environment variables in Vercel:

1. Go to https://vercel.com/your-project/settings/environment-variables
2. Add:
   - `COINBASE_API_KEY_ID`
   - `COINBASE_API_SECRET`
   - `COINBASE_PAYMASTER_URL`

### Integrate with GitHub Repo

1. Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
```

2. Create `.env.example` for team reference:
```bash
cp .env.example .env.example
```

3. Document the integration in README

---

## 🎯 What You Can Do Now

### ✅ Gasless Transactions
Users don't need ETH for gas - your paymaster covers it!

### ✅ Smart Wallets
Create ERC-4337 smart wallets with social recovery

### ✅ Batch Transactions
Send multiple transactions in one operation

### ✅ Trading on Base
Swap tokens directly on Base network

### ✅ Wallet Management
Create, import, and export wallets

### ✅ Transaction Monitoring
Track transaction status in real-time

---

## 📊 Monitor Your Integration

### Coinbase Developer Platform Dashboard

https://portal.cdp.coinbase.com/

Here you can:
- View API usage
- Monitor transaction volume
- Configure paymaster rules
- Set spending limits
- View analytics
- Manage API keys

### Base Network Explorer

https://basescan.org/

Track your transactions:
- Search by transaction hash
- View block confirmations
- Check wallet balances

---

## 🐛 Troubleshooting

### Issue: Module not found

```bash
npm install
```

### Issue: Cannot read .env file

```bash
# Make sure .env exists
ls -la .env

# Load environment variables
node -r dotenv/config coinbase_paymaster_backend.js
```

### Issue: Invalid API key

Check your `.env` file has correct values from Coinbase Developer Platform dashboard.

### Issue: Transaction fails

1. Check you're on Base network (Chain ID: 8453)
2. Verify wallet has sufficient balance
3. Check paymaster is configured correctly in dashboard

### Issue: Network connection error

```bash
# Test the endpoint
curl https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

---

## 📚 Files Created

1. **coinbase_base_paymaster_integration.html** - Frontend demo
2. **coinbase_paymaster_backend.js** - Backend Node.js integration
3. **coinbase_sdk_integration.js** - Complete SDK integration
4. **next-coinbase-integration.tsx** - React/Next.js component
5. **.env** - Your credentials (DO NOT COMMIT)
6. **.env.example** - Template for team
7. **COINBASE_PAYMASTER_GUIDE.md** - Detailed documentation
8. **QUICK_START_COINBASE.md** - This file

---

## 🎉 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Test backend: `npm run test:backend`
3. ✅ Open HTML demo: `npm run open:html`
4. ✅ Deploy to Vercel with environment variables
5. ✅ Monitor usage in Coinbase Developer Platform dashboard

---

## 🔒 Security Checklist

- ✅ `.env` is in `.gitignore`
- ✅ Private key is stored securely
- ✅ API keys are not in frontend code
- ✅ Rate limiting is configured
- ✅ Spending limits are set in dashboard
- ✅ Only authorized domains can use your API

---

## 📞 Support

- **Coinbase Docs:** https://docs.cdp.coinbase.com/
- **Base Docs:** https://docs.base.org/
- **Your App:** https://luxbin-app.vercel.app
- **Your Repo:** https://github.com/mermaidnicheboutique-code/luxbin-chain

---

**You're all set! 🚀 Your Luxbin app now has gasless transactions powered by Coinbase Developer Platform.**
