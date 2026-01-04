#!/bin/bash
echo "🔍 Checking LUXBIN App Components..."
echo ""

echo "1. FloatingChatWidget.tsx:"
if [ -f "components/FloatingChatWidget.tsx" ]; then
    echo "   ✅ EXISTS"
    grep -q "FloatingChatWidget" "components/FloatingChatWidget.tsx" && echo "   ✅ Has export" || echo "   ❌ Missing export"
else
    echo "   ❌ MISSING"
fi

echo ""
echo "2. ChatbotAvatar.tsx:"
if [ -f "components/ChatbotAvatar.tsx" ]; then
    echo "   ✅ EXISTS"
else
    echo "   ❌ MISSING"
fi

echo ""
echo "3. Video file:"
if [ -f "public/chatbot-avatar.mp4" ]; then
    echo "   ✅ EXISTS ($(ls -lh public/chatbot-avatar.mp4 | awk '{print $5}'))"
else
    echo "   ❌ MISSING"
fi

echo ""
echo "4. page.tsx imports FloatingChatWidget:"
if grep -q "FloatingChatWidget" "app/page.tsx"; then
    echo "   ✅ IMPORTED"
else
    echo "   ❌ NOT IMPORTED - This is the problem!"
fi

echo ""
echo "5. page.tsx renders FloatingChatWidget:"
if grep -q "<FloatingChatWidget" "app/page.tsx"; then
    echo "   ✅ RENDERED"
else
    echo "   ❌ NOT RENDERED - This is the problem!"
fi

echo ""
echo "🧪 Try building locally:"
echo "   npm run build"
