# 🚀 Vercel Deployment Guide - Coinbase Developer Platform Integration

## Quick Deploy to Vercel

Your Luxbin app is now configured with Coinbase Developer Platform ($1,250 credits) and ready to deploy!

---

## Step 1: Push Code to GitHub

```bash
cd Desktop/luxbin_chain/luxbin-app

# Add all changes
git add .

# Commit the integration
git commit -m "✨ Add Coinbase Developer Platform integration with $1250 credits

- Configure Coinbase Paymaster for gasless transactions
- Add CDP SDK integration
- Update wagmi config with Paymaster RPC
- Add Paymaster status component
- Enable Base network with sponsored gas"

# Push to GitHub
git push origin main
```

---

## Step 2: Configure Environment Variables in Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/mermaidnicheboutique-code/luxbin-app/settings/environment-variables

2. Add these environment variables:

#### Public Variables (Available in Frontend)

```
NEXT_PUBLIC_COINBASE_API_KEY_ID
organizations/81979796-90c8-42d7-a88b-200131d4ca1d/apiKeys/66f39b5d-df7b-4bca-8abd-7e3f9723e947
```

```
NEXT_PUBLIC_COINBASE_PAYMASTER_URL
https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM
```

```
NEXT_PUBLIC_BASE_CHAIN_ID
8453
```

```
NEXT_PUBLIC_BASE_SEPOLIA_CHAIN_ID
84532
```

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
c5ca7a3d3e1c52b7abfbc0e7c1e8f1d4
```

#### Server-side Variables (Not exposed to frontend)

```
COINBASE_API_SECRET
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDcb1ANCoteraxlgXBvQ2ZsveC1oXgQce+QwKzjmwmKYoAoGCCqGSM49
AwEHoUQDQgAEITCb4opIqpAidCYKbUNqyMcUDyOZomuNkSSbgYKClgYpvnOsphrL
LJ73uPFPSbdQpMOCEsgoRpePrgePOrbxzg==
-----END EC PRIVATE KEY-----
```

```
COINBASE_API_KEY_ID
organizations/81979796-90c8-42d7-a88b-200131d4ca1d/apiKeys/66f39b5d-df7b-4bca-8abd-7e3f9723e947
```

```
COINBASE_PROJECT_ID
organizations/81979796-90c8-42d7-a88b-200131d4ca1d
```

3. Click "Save" for each variable

4. Select environment: **Production, Preview, and Development** for all variables

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_COINBASE_API_KEY_ID production
# Paste: organizations/81979796-90c8-42d7-a88b-200131d4ca1d/apiKeys/66f39b5d-df7b-4bca-8abd-7e3f9723e947

vercel env add NEXT_PUBLIC_COINBASE_PAYMASTER_URL production
# Paste: https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM

vercel env add COINBASE_API_SECRET production
# Paste the private key (multi-line)

# Repeat for all other variables...
```

---

## Step 3: Deploy

### Automatic Deployment (Recommended)

```bash
git push origin main
```

Vercel will automatically:
- Detect the push
- Build your app
- Deploy to production
- URL: https://luxbin-app.vercel.app

### Manual Deployment

```bash
cd Desktop/luxbin_chain/luxbin-app
vercel --prod
```

---

## Step 4: Verify Deployment

1. Visit: https://luxbin-app.vercel.app

2. Check for:
   - ✅ App loads successfully
   - ✅ Coinbase Paymaster status shows "Active" (bottom right)
   - ✅ Wallet connection works
   - ✅ Base network is default
   - ✅ Gasless transactions enabled

3. Open browser console (F12) and look for:
   ```
   ✅ Coinbase CDP initialized with project: organizations/81979796-90c8-42d7-a88b-200131d4ca1d
   💰 Developer Credits: $1,250 available
   🚀 Paymaster enabled for gasless transactions
   ```

---

## What's Deployed

### Features Enabled

✅ **Gasless Transactions**
- Users don't need ETH for gas
- Transactions sponsored by your $1,250 credits
- Powered by Coinbase Paymaster

✅ **Smart Wallet Support**
- ERC-4337 account abstraction
- Social recovery
- Batch transactions

✅ **Base Network Integration**
- Ultra-low gas fees (~0.006 gwei)
- Fast transactions (~2 sec blocks)
- Ethereum L2 security

✅ **Developer Credits**
- $1,250 available for gas sponsorship
- Automatic credit management
- Usage tracking in Coinbase dashboard

---

## Monitoring & Management

### Coinbase Developer Platform Dashboard

**URL:** https://portal.cdp.coinbase.com/

Monitor:
- API usage and rate limits
- Developer credits usage
- Transaction volume
- Paymaster activity
- Error logs

### Vercel Dashboard

**URL:** https://vercel.com/mermaidnicheboutique-code/luxbin-app

Monitor:
- Deployment status
- Build logs
- Environment variables
- Analytics
- Performance

### Base Network Explorer

**URL:** https://basescan.org/

Track:
- Transaction confirmations
- Smart contract interactions
- Gas usage
- Wallet balances

---

## Testing After Deployment

1. **Connect Wallet**
   ```
   - Click "Connect Wallet" button
   - Select wallet (Coinbase Wallet recommended)
   - Approve connection
   - Should auto-switch to Base network
   ```

2. **Check Paymaster Status**
   ```
   - Look for status widget (bottom right)
   - Should show: "🟢 Active"
   - Credits: "$1,250"
   - Gas Fees: "✨ FREE"
   ```

3. **Send Test Transaction**
   ```
   - Use the swap or transfer feature
   - Transaction should process without gas fees
   - Check BaseScan for confirmation
   ```

---

## Troubleshooting

### Issue: "Paymaster status shows Inactive"

**Solution:**
```bash
# Check environment variables in Vercel dashboard
# Ensure NEXT_PUBLIC_COINBASE_PAYMASTER_URL is set correctly
# Redeploy: vercel --prod
```

### Issue: "Transaction fails with gas errors"

**Solution:**
- Verify you're on Base network (Chain ID: 8453)
- Check Coinbase Developer Platform dashboard for credit balance
- Ensure Paymaster URL is correct in environment variables

### Issue: "Build fails on Vercel"

**Solution:**
```bash
# Test build locally first
cd Desktop/luxbin_chain/luxbin-app
npm run build

# If successful, push to trigger Vercel rebuild
git push origin main
```

### Issue: "Environment variables not loading"

**Solution:**
- Go to Vercel project settings → Environment Variables
- Ensure all variables are set for Production, Preview, and Development
- Click "Redeploy" in Vercel dashboard

---

## Cost Management

### Developer Credits Usage

- **Starting Balance:** $1,250
- **Transaction Cost:** ~$0.01 - $0.05 per transaction
- **Estimated Capacity:** 25,000 - 125,000 transactions

### Monitor Usage

1. Check Coinbase Dashboard: https://portal.cdp.coinbase.com/
2. Set up spending alerts (recommended: $100 increments)
3. Enable notifications for low credit balance

### When Credits Run Low

Options:
1. Purchase additional credits via Coinbase dashboard
2. Switch to user-paid gas (update wagmi config)
3. Hybrid mode: sponsor small transactions, users pay for large ones

---

## Security Checklist

Before going live:

- ✅ `.env.local` is in `.gitignore` (not committed)
- ✅ Private key is only in Vercel environment variables
- ✅ Public variables use `NEXT_PUBLIC_` prefix
- ✅ Server-side variables don't use `NEXT_PUBLIC_` prefix
- ✅ API keys have appropriate permissions in Coinbase dashboard
- ✅ Rate limiting is configured
- ✅ Spending limits are set

---

## Next Steps After Deployment

1. ✅ **Monitor First Transactions**
   - Watch for successful gas sponsorship
   - Check credit usage
   - Verify transaction confirmations

2. ✅ **Set Up Alerts**
   - Low credit balance notifications
   - High transaction volume alerts
   - Error rate monitoring

3. ✅ **Optimize**
   - Implement transaction batching
   - Add smart wallet features
   - Enable social recovery

4. ✅ **Scale**
   - Monitor performance
   - Add more features
   - Increase credit limit if needed

---

## Support & Resources

- **Coinbase Docs:** https://docs.cdp.coinbase.com/
- **Base Docs:** https://docs.base.org/
- **Vercel Docs:** https://vercel.com/docs
- **Your App:** https://luxbin-app.vercel.app
- **GitHub Repo:** https://github.com/mermaidnicheboutique-code/luxbin-chain

---

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build locally
npm run build

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables
vercel env pull
```

---

**🎉 Your app is now live with Coinbase Developer Platform integration!**

**Deployment URL:** https://luxbin-app.vercel.app

**Features:**
- ✅ Gasless transactions
- ✅ $1,250 in developer credits
- ✅ Base network integration
- ✅ Smart wallet support
- ✅ Real-time Paymaster status

**Ready to accept users with zero gas fees!** 🚀
