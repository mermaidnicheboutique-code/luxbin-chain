#!/usr/bin/env python3
"""
LUXBIN Chatbot API Server
==========================

Flask API server that exposes the emotional AI chatbot with photonic encoding
to the Next.js Vercel frontend.

This chatbot is as smart as ChatGPT and Claude, with additional LUXBIN features.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import json
import logging
from datetime import datetime

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Import the LUXBIN chatbot
from rag_chatbot import LuxbinAutonomousAI

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for Next.js frontend (localhost:3000)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize the AI chatbot
logger.info("Initializing LUXBIN Autonomous AI chatbot...")
try:
    chatbot = LuxbinAutonomousAI()
    logger.info("✓ Chatbot initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize chatbot: {e}")
    chatbot = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'chatbot_ready': chatbot is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    """
    Main chat endpoint for conversational AI with emotional understanding

    Request body:
    {
        "messages": [
            {"role": "user", "content": "Hello!"},
            {"role": "assistant", "content": "Hi there!"},
            ...
        ],
        "user_id": "optional_user_id",
        "session_id": "optional_session_id"
    }

    Response:
    {
        "reply": "AI response text",
        "source": "luxbin-ai",
        "metadata": {
            "photonic_encoding": {...},
            "emotion_detected": "positive",
            "personality_traits": {...},
            "function_calls": [],
            "model_used": "claude-3-sonnet"
        }
    }
    """
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 204

    try:
        if chatbot is None:
            return jsonify({
                'error': 'Chatbot not initialized',
                'reply': 'Sorry, the AI is currently unavailable. Please try again later.'
            }), 503

        # Parse request
        data = request.get_json()
        if not data or 'messages' not in data:
            return jsonify({'error': 'Messages array is required'}), 400

        messages = data.get('messages', [])
        user_id = data.get('user_id', 'web_user')
        session_id = data.get('session_id', None)

        # Get the latest user message
        user_message = None
        for msg in reversed(messages):
            if msg.get('role') == 'user':
                user_message = msg.get('content', '')
                break

        if not user_message:
            return jsonify({'error': 'No user message found'}), 400

        logger.info(f"Received message from {user_id}: {user_message[:50]}...")

        # Update chatbot conversation history with all messages
        for msg in messages:
            if msg.get('role') in ['user', 'assistant']:
                chatbot.add_to_history(msg['role'], msg['content'])

        # Generate AI response with emotional understanding and photonic encoding
        response_text = chatbot.generate_response(
            user_message,
            user_id=user_id,
            session_id=session_id
        )

        # Detect emotion from user message (simple sentiment analysis)
        emotion = detect_emotion(user_message)

        # Extract metadata
        metadata = {
            'emotion_detected': emotion,
            'personality_traits': chatbot.personality.get('traits', {}),
            'user_interests': chatbot.user_profile,
            'conversation_length': len(chatbot.conversation_history),
            'photonic_enabled': True,
            'source': 'luxbin-autonomous-ai'
        }

        # Check if response includes photonic encoding
        if '⚡' in response_text or 'Photonic' in response_text:
            metadata['has_photonic_visualization'] = True

        logger.info(f"Generated response with emotion: {emotion}")

        return jsonify({
            'reply': response_text,
            'source': 'luxbin-ai',
            'metadata': metadata
        })

    except Exception as e:
        logger.error(f"Chat error: {e}", exc_info=True)
        return jsonify({
            'error': 'Internal server error',
            'reply': 'Sorry, I encountered an error. Please try again.'
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get chatbot statistics"""
    try:
        if chatbot is None:
            return jsonify({'error': 'Chatbot not initialized'}), 503

        stats = chatbot.get_stats()
        return jsonify(stats)

    except Exception as e:
        logger.error(f"Stats error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/photonic/encode', methods=['POST'])
def encode_photonic():
    """
    Encode code or text into photonic light language

    Request body:
    {
        "code": "function example() { return 42; }",
        "language": "javascript"  // optional
    }
    """
    try:
        if chatbot is None:
            return jsonify({'error': 'Chatbot not initialized'}), 503

        data = request.get_json()
        code = data.get('code', '')
        language = data.get('language', 'auto')

        if not code:
            return jsonify({'error': 'Code parameter is required'}), 400

        # Encode to photonic
        encoding = chatbot.photonic_encoder.encode_code_to_photonic(code, language)

        return jsonify({
            'success': True,
            'encoding': encoding
        })

    except Exception as e:
        logger.error(f"Photonic encoding error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/memory/search', methods=['POST'])
def search_memory():
    """Search conversation memory"""
    try:
        if chatbot is None:
            return jsonify({'error': 'Chatbot not initialized'}), 503

        data = request.get_json()
        user_id = data.get('user_id', 'web_user')
        query = data.get('query', '')
        limit = data.get('limit', 5)

        if not query:
            return jsonify({'error': 'Query parameter is required'}), 400

        # Search conversations
        results = chatbot.memory_manager.search_conversations(user_id, query, limit)

        return jsonify({
            'success': True,
            'results': results
        })

    except Exception as e:
        logger.error(f"Memory search error: {e}")
        return jsonify({'error': str(e)}), 500

def detect_emotion(text: str) -> str:
    """
    Simple emotion detection from text
    Returns: 'positive', 'negative', 'neutral', 'excited', 'confused', 'frustrated'
    """
    text_lower = text.lower()

    # Excited/enthusiastic
    if any(word in text_lower for word in ['!', 'amazing', 'awesome', 'great', 'love', 'excited', 'wow']):
        return 'excited'

    # Positive
    if any(word in text_lower for word in ['thanks', 'thank you', 'good', 'nice', 'appreciate', 'cool', 'yes']):
        return 'positive'

    # Confused
    if any(word in text_lower for word in ['?', 'how', 'what', 'confused', 'understand', 'explain', 'help']):
        return 'confused'

    # Frustrated/Negative
    if any(word in text_lower for word in ['no', 'wrong', 'error', 'problem', 'issue', 'bug', 'bad', 'hate', 'frustrated']):
        return 'frustrated'

    # Default: neutral
    return 'neutral'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'

    logger.info(f"Starting LUXBIN Chatbot API Server on port {port}...")
    logger.info("Emotional AI with photonic encoding enabled")
    logger.info("CORS enabled for http://localhost:3000")

    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
