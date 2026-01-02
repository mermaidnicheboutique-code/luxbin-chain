#!/bin/bash
# Setup Claude (Anthropic) API Key

echo "🔑 Claude API Key Setup"
echo "======================="
echo ""
echo "Since you paid for Claude credits, you need to:"
echo "1. Go to https://console.anthropic.com/"
echo "2. Sign in to your account"
echo "3. Go to API Keys section"
echo "4. Create a new API key"
echo "5. Copy the key (it starts with 'sk-ant-...')"
echo ""
read -p "Enter your Claude API key: " CLAUDE_KEY
echo ""

if [ -n "$CLAUDE_KEY" ]; then
    echo "Setting ANTHROPIC_API_KEY..."
    export ANTHROPIC_API_KEY="$CLAUDE_KEY"
    echo "✅ Claude API key set!"

    # Test the connection
    echo ""
    echo "🧪 Testing Claude connection..."
    cd "$(dirname "$0")"
    source venv/bin/activate
    python -c "
import asyncio
from ai_connectors import AIConnectorFactory

async def test_claude():
    connector = AIConnectorFactory.create('Claude')
    if await connector.connect():
        print('✅ Claude connected successfully!')
        response = await connector.send_message('Hello! Can you confirm you are Claude from Anthropic?')
        print('🤖 Claude response:', response[:200] + '...' if len(response) > 200 else response)
    else:
        print('❌ Failed to connect to Claude')

asyncio.run(test_claude())
"

    echo ""
    echo "💡 To make this permanent, add this line to your ~/.zshrc:"
    echo "   export ANTHROPIC_API_KEY='$CLAUDE_KEY'"

else
    echo "❌ No API key entered"
fi