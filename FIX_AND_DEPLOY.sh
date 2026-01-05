#!/bin/bash

echo "🔧 Fixing Paymaster Widget Visibility..."
echo ""

cd "$(dirname "$0")"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the luxbin-app directory"
    exit 1
fi

echo "✅ Step 1: Adding fixed widget to git..."
git add components/CoinbasePaymasterStatus.tsx

echo ""
echo "✅ Step 2: Committing changes..."
git commit -m "🔧 Fix Paymaster widget - now always visible

- Remove wallet connection requirement
- Widget now shows even when wallet not connected
- Increased z-index to ensure visibility
- Shows $1,250 credits and gasless transaction status"

echo ""
echo "✅ Step 3: Pushing to GitHub..."
git push origin main

echo ""
echo "=================================================================="
echo "✅ Changes pushed to GitHub!"
echo ""
echo "🚀 Vercel will auto-deploy in ~2-3 minutes"
echo ""
echo "📍 What Changed:"
echo "   - Widget now ALWAYS visible (bottom right corner)"
echo "   - Shows even before connecting wallet"
echo "   - Displays your $1,250 Coinbase credits"
echo "   - Green 🟢 indicator when Paymaster is active"
echo ""
echo "🔍 After deployment, visit:"
echo "   https://luxbin-app.vercel.app"
echo ""
echo "👀 Look for the purple widget in the bottom right corner!"
echo "   It should show:"
echo "   - Coinbase Paymaster"
echo "   - Status: 🟢 Active"
echo "   - Credits: $1,250"
echo "   - Gas Fees: ✨ FREE"
echo ""
echo "=================================================================="
echo ""
echo "⏳ Wait 2-3 minutes for Vercel to deploy, then refresh the page!"
echo ""
