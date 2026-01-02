#!/usr/bin/env python3
"""
Quantum Game Dev AI - Web App

A web-based interface for AI-assisted game development.
"""

from flask import Flask, render_template_string, request, jsonify, Response
import asyncio
import threading
import os
import json
from datetime import datetime

# Import our modules
from ai_connectors import AIConnectorFactory
from game_automation import GameAutomation
from game_dev_assistant import GameDevAssistant

app = Flask(__name__)

# Global variables for AI systems
automation = None
assistant = None

# HTML template
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎮 Quantum Game Dev AI</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.8;
            font-size: 1.2em;
        }
        .content {
            padding: 30px;
        }
        .button-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 20px;
            border-radius: 15px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        .button:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }
        .button:active {
            transform: translateY(-2px);
        }
        .output {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 20px;
            min-height: 400px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
            overflow-y: auto;
            margin-top: 20px;
        }
        .status {
            text-align: center;
            padding: 10px;
            background: #e8f5e8;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #c3e6c3;
        }
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .api-status {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin: 20px 0;
        }
        .api-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #dee2e6;
        }
        .api-item.connected {
            background: #d4edda;
            border-color: #c3e6cb;
        }
        .api-item.disconnected {
            background: #f8d7da;
            border-color: #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 Quantum Game Dev AI</h1>
            <p>AI-Powered Game Development Assistant</p>
        </div>

        <div class="content">
            <div class="api-status">
                <div class="api-item {{ 'connected' if claude_status else 'disconnected' }}">
                    🤖 Claude: {{ '✅ Connected' if claude_status else '❌ Disconnected' }}
                </div>
                <div class="api-item {{ 'connected' if chatgpt_status else 'disconnected' }}">
                    💬 ChatGPT: {{ '✅ Connected' if chatgpt_status else '❌ Disconnected' }}
                </div>
                <div class="api-item {{ 'connected' if gemini_status else 'disconnected' }}">
                    🧠 Gemini: {{ '✅ Connected' if gemini_status else '❌ Disconnected' }}
                </div>
            </div>

            <div class="button-grid">
                <button class="button" onclick="runAutomation()">
                    🎯 Game Automation<br>
                    <small>Generate code & content variations</small>
                </button>
                <button class="button" onclick="runAssistant()">
                    🎮 Game Dev Assistant<br>
                    <small>Get coding help & design advice</small>
                </button>
                <button class="button" onclick="runMultiAI()">
                    🧠 Multi-AI Questions<br>
                    <small>Ask all AIs the same question</small>
                </button>
                <button class="button" onclick="testConnections()">
                    ⚙️ Test Connections<br>
                    <small>Verify API connections</small>
                </button>
                <button class="button" onclick="showDocs()">
                    📚 Documentation<br>
                    <small>View help & guides</small>
                </button>
            </div>

            <div id="status" class="status" style="display: none;">
                <span class="loading"></span> Processing...
            </div>

            <div class="output" id="output">
🎮 Welcome to Quantum Game Dev AI!

Click any button above to get started with AI-powered game development assistance.

Your API keys are pre-configured for:
- 🤖 Claude (Anthropic) - Primary AI with your paid credits
- 💬 ChatGPT (OpenAI) - Secondary AI
- 🧠 Gemini (Google) - Additional AI perspectives

Try clicking "🎯 Game Automation" to generate weapon variations and game content!
            </div>
        </div>
    </div>

    <script>
        async function makeRequest(endpoint, data = {}) {
            const statusDiv = document.getElementById('status');
            const outputDiv = document.getElementById('output');

            statusDiv.style.display = 'block';

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    outputDiv.textContent = result.output;
                } else {
                    outputDiv.textContent = '❌ Error: ' + result.error;
                }
            } catch (error) {
                outputDiv.textContent = '❌ Network Error: ' + error.message;
            }

            statusDiv.style.display = 'none';
        }

        function runAutomation() {
            makeRequest('/api/automation');
        }

        function runAssistant() {
            makeRequest('/api/assistant');
        }

        function runMultiAI() {
            makeRequest('/api/multi-ai');
        }

        function testConnections() {
            makeRequest('/api/test-connections');
        }

        function showDocs() {
            const docs = `📚 QUANTUM GAME DEV AI - DOCUMENTATION

🎯 GAME AUTOMATION TOOL
- Generate code variations (weapons, enemies, items)
- Create game content (quests, dialogue, descriptions)
- Auto-generate test cases
- Create documentation

🎮 GAME DEV ASSISTANT
- Generate Unreal Engine C++/Blueprint code
- Provide design decision perspectives
- Debug problems with multiple AI experts
- Plan game architecture

🧠 MULTI-AI QUESTIONS
- Ask same question to Claude + ChatGPT + Gemini
- Compare different approaches
- Get consensus on decisions

⚙️ API SETTINGS
- Configure Anthropic, OpenAI, and Google API keys
- Test connections to all AI services

🚀 QUICK START:
1. Click "🎯 Game Automation" to generate content
2. Click "🎮 Game Dev Assistant" for code help
3. Click "🧠 Multi-AI Questions" for expert opinions
4. Click "⚙️ Test Connections" to verify setup

💡 TIPS:
- Claude (Anthropic) is prioritized for your paid credits
- All generated code is ready to copy into Unreal Engine
- Use automation for repetitive game development tasks

🎮 HAPPY GAME DEVELOPING!`;

            document.getElementById('output').textContent = docs;
        }
    </script>
</body>
</html>
"""

def setup_api_keys():
    """Set up API keys from environment variables"""
    global automation, assistant
    from dotenv import load_dotenv
    load_dotenv()
    # Keys should be set in .env file or environment variables
    required_keys = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'GOOGLE_API_KEY']
    for key in required_keys:
        if not os.getenv(key):
            raise ValueError(f"{key} not set. Please add it to a .env file or set as environment variable.")

    # Initialize AI systems
    automation = GameAutomation()
    assistant = GameDevAssistant()

def check_api_status():
    """Check which APIs are connected"""
    status = {'claude': False, 'chatgpt': False, 'gemini': False}

    async def check_connections():
        ais_to_check = [
            ('Claude', 'claude'),
            ('ChatGPT', 'chatgpt'),
            ('Gemini', 'gemini')
        ]

        for ai_name, status_key in ais_to_check:
            try:
                connector = AIConnectorFactory.create(ai_name)
                if await connector.connect():
                    status[status_key] = True
            except:
                pass

    # Run in event loop
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(check_connections())
    loop.close()

    return status

@app.route('/')
def index():
    api_status = check_api_status()
    return render_template_string(HTML_TEMPLATE,
                                claude_status=api_status['claude'],
                                chatgpt_status=api_status['chatgpt'],
                                gemini_status=api_status['gemini'])

@app.route('/api/automation', methods=['POST'])
def api_automation():
    def generate():
        yield f"data: {json.dumps({'message': '🚀 Starting Game Automation...', 'progress': 10})}\n\n"

        async def run_automation():
            try:
                yield f"data: {json.dumps({'message': '🤖 Initializing AI systems...', 'progress': 20})}\n\n"
                await automation.connect_ais()

                yield f"data: {json.dumps({'message': '✅ AI systems ready!', 'progress': 30})}\n\n"

                yield f"data: {json.dumps({'message': '📌 Generating weapon variations...', 'progress': 50})}\n\n"
                await automation.generate_similar_code(
                    """class Sword:
    damage = 25
    attack_speed = 1.5
    range = 2.0
    weapon_type = "melee"
    special_ability = "Slash\"""",
                    ["Axe", "Dagger", "Hammer"]
                )

                yield f"data: {json.dumps({'message': '📌 Generating game content...', 'progress': 80})}\n\n"
                await automation.generate_game_content(
                    "fantasy weapons",
                    3,
                    "medieval dark fantasy"
                )

                yield f"data: {json.dumps({'message': '🎉 Automation complete!', 'progress': 100})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e), 'progress': 100})}\n\n"

        # Run async function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(run_automation())
        loop.close()

    return Response(generate(), mimetype='text/event-stream')

@app.route('/api/assistant', methods=['POST'])
def api_assistant():
    def generate():
        yield f"data: {json.dumps({'message': '🎮 Starting Game Dev Assistant...', 'progress': 10})}\n\n"

        async def run_assistant():
            try:
                yield f"data: {json.dumps({'message': '🤖 Initializing AI development team...', 'progress': 20})}\n\n"
                await assistant.connect_ais()

                yield f"data: {json.dumps({'message': '✅ AI team assembled!', 'progress': 40})}\n\n"

                yield f"data: {json.dumps({'message': '💻 Generating character controller code...', 'progress': 60})}\n\n"
                await assistant.get_code_help(
                    "Create a third-person character controller with sprinting in Unreal Engine 5"
                )

                yield f"data: {json.dumps({'message': '🎉 Assistant complete!', 'progress': 100})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e), 'progress': 100})}\n\n"

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(run_assistant())
        loop.close()

    return Response(generate(), mimetype='text/event-stream')

@app.route('/api/multi-ai', methods=['POST'])
def api_multi_ai():
    def generate():
        yield f"data: {json.dumps({'message': '🧠 Starting Multi-AI Conference...', 'progress': 10})}\n\n"

        async def run_multi_ai():
            try:
                from multi_ai_question import ask_multiple_ais
                yield f"data: {json.dumps({'message': '🤖 Asking all AIs the same question...', 'progress': 50})}\n\n"
                await ask_multiple_ais(
                    "What are the best practices for implementing save/load systems in Unreal Engine 5?"
                )
                yield f"data: {json.dumps({'message': '🎉 Multi-AI session complete!', 'progress': 100})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e), 'progress': 100})}\n\n"

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(run_multi_ai())
        loop.close()

    return Response(generate(), mimetype='text/event-stream')

@app.route('/api/test-connections', methods=['POST'])
def api_test_connections():
    def generate():
        yield f"data: {json.dumps({'message': '🧪 Testing API connections...', 'progress': 20})}\n\n"

        api_status = check_api_status()

        claude_status = "✅ Connected" if api_status["claude"] else "❌ Failed"
        yield f"data: {json.dumps({'message': f'🤖 Claude: {claude_status}', 'progress': 40})}\n\n"
        chatgpt_status = "✅ Connected" if api_status["chatgpt"] else "❌ Failed"
        yield f"data: {json.dumps({'message': f'💬 ChatGPT: {chatgpt_status}', 'progress': 60})}\n\n"

        gemini_status = "✅ Connected" if api_status["gemini"] else "❌ Failed"
        yield f"data: {json.dumps({'message': f'🧠 Gemini: {gemini_status}', 'progress': 80})}\n\n"

        connected_count = sum(api_status.values())
        yield f"data: {json.dumps({'message': f'📊 Summary: {connected_count}/3 AIs connected', 'progress': 100})}\n\n"

    return Response(generate(), mimetype='text/event-stream')

def run_app():
    """Run the Flask app"""
    setup_api_keys()
    print("🎮 Starting Quantum Game Dev AI Web App...")
    print("🌐 Open your browser to: http://localhost:5000")
    print("🤖 AI systems initializing...")
    app.run(debug=False, host='0.0.0.0', port=5000)

if __name__ == '__main__':
    run_app()