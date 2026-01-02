#!/bin/bash
# Clean restart script for LUXBIN app

echo "🔄 Restarting LUXBIN App with Graphics..."
echo ""

# Kill any running processes
echo "🛑 Stopping any running servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Clear cache
echo "🧹 Clearing Next.js cache..."
cd ~/Desktop/luxbin_chain/luxbin-app
rm -rf .next

# Verify components exist
echo "✅ Checking components..."
if [ -f "components/FloatingChatWidget.tsx" ]; then
    echo "   ✓ FloatingChatWidget.tsx found"
else
    echo "   ✗ FloatingChatWidget.tsx MISSING!"
fi

if [ -f "components/ChatbotAvatar.tsx" ]; then
    echo "   ✓ ChatbotAvatar.tsx found"
else
    echo "   ✗ ChatbotAvatar.tsx MISSING!"
fi

if [ -f "public/chatbot-avatar.mp4" ]; then
    echo "   ✓ chatbot-avatar.mp4 found"
else
    echo "   ✗ chatbot-avatar.mp4 MISSING!"
fi

echo ""
echo "🚀 Starting development server..."
echo "   Open: http://localhost:3000"
echo "   Look for pulsing chat button in bottom-right!"
echo ""

# Start server
npm run dev
