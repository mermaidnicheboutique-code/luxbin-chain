# Web3Auth Configuration for Niche Network

## Block Explorer Setup

I've created a custom block explorer at `/explorer` in your Next.js app.

### Deployment Instructions

#### Option 1: Deploy to Vercel (Recommended)

1. **Deploy your luxbin-chain app to Vercel:**
   ```bash
   cd ~/luxbin-chain
   vercel --prod
   ```

2. **Your explorer will be available at:**
   ```
   https://your-app.vercel.app/explorer
   ```

3. **Add to Web3Auth Dashboard:**
   - Block Explorer URL: `https://your-app.vercel.app/explorer`

#### Option 2: Use Temporary Public URL (for testing)

If you want to test without deploying:

```bash
# Install ngrok
brew install ngrok

# Start your Next.js app
cd ~/luxbin-chain
npm run dev

# In another terminal, expose port 3000
ngrok http 3000

# Use the ngrok URL in Web3Auth
# Example: https://abc123.ngrok.io/explorer
```

---

## Web3Auth Chain Network Configuration

Go to your Web3Auth Dashboard:
https://dashboard.web3auth.io/organization/NicheAI/projects/BMaurjDP5MB6_7k7Cg9O8a7OpuAYfPov7EKZ1HEXwFIkLZXgsmrnpDMnZLk5Fk0MTjzyERvyTmB6egpSyPv_qhU/chain-networks

### Chain Details to Add:

**Chain ID:** `901`
**Display Name:** `Niche Network`
**Network Name:** `Niche Network Local` or `Niche Network`
**Chain Type:** `EVM`
**RPC URL:**
- Local: `http://localhost:8545`
- Public (if using ngrok): `https://your-ngrok-url.ngrok.io` (proxy to localhost:8545)
- Alchemy: `https://rollup-1205614529692808.sepolia.rpc.alchemy.com/v1/QkbxA19sbRy_p7KVSpML-`

**Block Explorer URL:**
- Once deployed: `https://your-app.vercel.app/explorer`
- Or with ngrok: `https://your-ngrok-url.ngrok.io/explorer`

**Native Currency:**
- Symbol: `ETH`
- Name: `Ether`
- Decimals: `18`

**Testnet:** `true` (check this box)

---

## Explorer Features

Your custom explorer supports:

✅ `/explorer` - Main page with latest blocks
✅ `/explorer/block/{number}` - Block details
✅ `/explorer/tx/{hash}` - Transaction details
✅ `/explorer/address/{address}` - Address balance

Standard block explorer URL patterns that Web3Auth expects!

---

## Quick Deploy Commands

```bash
# 1. Make sure your local chain is running
op-up

# 2. Test the explorer locally
cd ~/luxbin-chain
npm run dev
# Visit http://localhost:3000/explorer

# 3. Deploy to Vercel
vercel --prod

# 4. Copy the production URL and add to Web3Auth
```

---

## For Chain B (Alchemy Rollup)

If you want to add the Alchemy chain to Web3Auth:

**Chain ID:** `1205614529692808`
**RPC URL:** `https://rollup-1205614529692808.sepolia.rpc.alchemy.com/v1/QkbxA19sbRy_p7KVSpML-`
**Block Explorer:** Same explorer URL (it will work for both chains)
**Testnet:** `true`

---

## Environment Variables

Make sure to set in Vercel:

```env
NEXT_PUBLIC_NICHE_RPC=http://localhost:8545
```

Or for production Alchemy chain:
```env
NEXT_PUBLIC_NICHE_RPC=https://rollup-1205614529692808.sepolia.rpc.alchemy.com/v1/QkbxA19sbRy_p7KVSpML-
```

---

## Testing the Explorer

1. Visit `/explorer` - should show recent blocks
2. Click on a block - should show block details
3. Search for an address - should show balance
4. All standard explorer functionality working!

This explorer will work with Web3Auth's requirements for custom chain networks. 🚀
