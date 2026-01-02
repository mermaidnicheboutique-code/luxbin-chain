#!/bin/bash
# Simple installation script for LUXBIN Chatbot

echo "🤖 Installing LUXBIN Chatbot Dependencies..."
echo ""

# Install minimal required packages
echo "📦 Installing core packages..."
pip3 install flask flask-cors python-dotenv requests

echo "🤖 Installing AI APIs..."
pip3 install openai anthropic google-generativeai

echo "🎨 Installing image processing..."
pip3 install Pillow matplotlib numpy seaborn

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Get a FREE API key from: https://makersuite.google.com/app/apikey"
echo "2. Create .env file: echo 'GOOGLE_API_KEY=your-key' > .env"
echo "3. Start server: python3 chatbot_api_server.py"
echo ""
