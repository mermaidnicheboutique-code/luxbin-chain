#!/bin/bash
# LUXBIN Chatbot API Server Startup Script

echo "🤖 Starting LUXBIN Emotional AI Chatbot Server..."
echo "=================================================="

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating template..."
    cat > .env << EOF
# LUXBIN Chatbot Configuration
# Copy this file and add your API keys

# OpenAI API Key (optional - for GPT models)
OPENAI_API_KEY=your_openai_key_here

# Anthropic API Key (optional - for Claude models)
ANTHROPIC_API_KEY=your_anthropic_key_here

# Google API Key (optional - for Gemini models)
GOOGLE_API_KEY=your_google_key_here

# Server Configuration
PORT=5000
DEBUG=False
EOF
    echo "📝 Please edit .env file and add your API keys"
fi

# Set environment variables
export FLASK_APP=chatbot_api_server.py
export FLASK_ENV=development

# Start the server
echo ""
echo "✅ Starting LUXBIN Chatbot API Server..."
echo "🌐 Server will be available at: http://localhost:5000"
echo "📊 Health check: http://localhost:5000/health"
echo ""
echo "Features enabled:"
echo "  • Emotional understanding 🧠"
echo "  • Photonic encoding ⚡"
echo "  • Persistent memory 💾"
echo "  • Function calling 🛠️"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 chatbot_api_server.py
