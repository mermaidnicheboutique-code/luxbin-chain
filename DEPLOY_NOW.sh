#!/bin/bash

# 🚀 Luxbin App - Deploy to Vercel with Coinbase Integration
# This script will deploy your app with $1,250 in Coinbase developer credits

echo "🚀 Deploying Luxbin App with Coinbase Developer Platform Integration"
echo "=================================================================="
echo ""

# Navigate to app directory
cd "$(dirname "$0")"

echo "📦 Current directory: $(pwd)"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Initializing now..."
    git init
    git remote add origin https://github.com/mermaidnicheboutique-code/luxbin-chain.git
fi

echo "✅ Step 1: Adding changes to git..."
git add .

echo ""
echo "✅ Step 2: Committing changes..."
git commit -m "✨ Add Coinbase Developer Platform integration

- Configure Coinbase Paymaster for gasless transactions ($1,250 credits)
- Add CDP SDK integration
- Update wagmi config with Paymaster RPC endpoint
- Add real-time Paymaster status widget
- Enable Base network with sponsored gas fees
- Create deployment documentation"

echo ""
echo "✅ Step 3: Pushing to GitHub..."
git push origin main

echo ""
echo "=================================================================="
echo "✅ Code pushed to GitHub!"
echo ""
echo "📝 NEXT STEPS:"
echo ""
echo "1. Go to Vercel: https://vercel.com/mermaidnicheboutique-code/luxbin-app"
echo "2. Vercel will auto-deploy (or click 'Redeploy')"
echo ""
echo "3. Add these environment variables in Vercel settings:"
echo "   https://vercel.com/mermaidnicheboutique-code/luxbin-app/settings/environment-variables"
echo ""
echo "   NEXT_PUBLIC_COINBASE_API_KEY_ID="
echo "   organizations/81979796-90c8-42d7-a88b-200131d4ca1d/apiKeys/66f39b5d-df7b-4bca-8abd-7e3f9723e947"
echo ""
echo "   NEXT_PUBLIC_COINBASE_PAYMASTER_URL="
echo "   https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM"
echo ""
echo "   COINBASE_API_SECRET="
echo "   [Your private key from .env.local]"
echo ""
echo "4. After adding env vars, click 'Redeploy' in Vercel"
echo ""
echo "5. Visit: https://luxbin-app.vercel.app"
echo "   Look for Paymaster status (bottom right) showing '🟢 Active'"
echo ""
echo "=================================================================="
echo "💰 Developer Credits: $1,250"
echo "🌐 Network: Base Mainnet"
echo "✨ Feature: Gasless Transactions"
echo "=================================================================="
echo ""
echo "📚 Documentation:"
echo "   - VERCEL_DEPLOYMENT_GUIDE.md"
echo "   - COINBASE_INTEGRATION_SUMMARY.md"
echo ""
echo "🎉 Ready to deploy!"
