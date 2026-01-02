#!/usr/bin/env python3
"""
LUXBIN Autonomous AI Chatbot with RAG Integration
Combines quantum AI capabilities with real-time codebase search
"""

import os
import sys
from pathlib import Path
from typing import Dict, Any, List
import json
from datetime import datetime
import openai
import anthropic
from rag_search import LuxbinRAGSearch, explain_luxbin_feature
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LuxbinAutonomousAI:
    def __init__(self, chroma_path: str = "./luxbin_chroma_db"):
        self.rag_search = LuxbinRAGSearch(chroma_path)
        self.conversation_history = []
        self.max_history = 20

        # Initialize AI clients (use environment variables)
        self.openai_client = None
        self.anthropic_client = None

        if os.getenv('OPENAI_API_KEY'):
            openai.api_key = os.getenv('OPENAI_API_KEY')
            self.openai_client = openai

        if os.getenv('ANTHROPIC_API_KEY'):
            from anthropic import Anthropic
            self.anthropic_client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

    def add_to_history(self, role: str, content: str):
        """Add message to conversation history"""
        self.conversation_history.append({
            'role': role,
            'content': content,
            'timestamp': datetime.now().isoformat()
        })

        # Keep only recent messages
        if len(self.conversation_history) > self.max_history:
            self.conversation_history = self.conversation_history[-self.max_history:]

    def search_codebase(self, query: str, n_results: int = 3) -> str:
        """Search the LUXBIN codebase and format results"""
        results = self.rag_search.search_codebase(query, n_results)

        if not results['search_success']:
            return f"❌ Codebase search failed: {results.get('error', 'Unknown error')}"

        if not results['results']:
            return f"🔍 No relevant code found for '{query}' in the LUXBIN codebase."

        formatted = f"🔍 Searched {results['unique_files']} files for '{query}':\n\n"

        for result in results['results']:
            formatted += f"**{result['file_path']}** ({result['language']})\n"
            formatted += ".2%"

            # Truncate content if too long
            content = result['content']
            if len(content) > 300:
                content = content[:300] + "..."
            formatted += f"```\n{content}\n```\n\n"

        return formatted

    def explain_feature(self, feature: str) -> str:
        """Explain how a LUXBIN feature works"""
        return explain_luxbin_feature(feature)

    def analyze_query(self, user_query: str) -> Dict[str, Any]:
        """
        Analyze user query to determine what actions to take
        Returns dict with analysis and action recommendations
        """
        analysis = {
            'needs_code_search': False,
            'needs_feature_explanation': False,
            'needs_blockchain_action': False,
            'search_queries': [],
            'feature_to_explain': None,
            'blockchain_action': None,
            'confidence': 0.0
        }

        query_lower = user_query.lower()

        # Check if query mentions specific LUXBIN features
        luxbin_features = [
            'quantum cryptography', 'temporal keys', 'ai compute',
            'substrate', 'polkadot', 'ethereum bridge', 'snowbridge',
            'blockchain', 'smart contract', 'consensus', 'governance'
        ]

        for feature in luxbin_features:
            if feature in query_lower:
                analysis['needs_feature_explanation'] = True
                analysis['feature_to_explain'] = feature
                analysis['confidence'] = 0.8
                break

        # Check if query asks about implementation or code
        code_keywords = ['how does', 'implementation', 'code', 'function', 'algorithm', 'work']
        if any(keyword in query_lower for keyword in code_keywords):
            analysis['needs_code_search'] = True
            analysis['search_queries'].append(user_query)
            analysis['confidence'] = max(analysis['confidence'], 0.7)

        # Check if query mentions actions
        action_keywords = ['analyze', 'check', 'deploy', 'bridge', 'transfer', 'balance']
        if any(keyword in query_lower for keyword in action_keywords):
            analysis['needs_blockchain_action'] = True
            analysis['confidence'] = max(analysis['confidence'], 0.6)

        return analysis

    def generate_response(self, user_query: str) -> str:
        """Generate AI response with RAG augmentation"""
        # Add user query to history
        self.add_to_history('user', user_query)

        # Analyze the query
        analysis = self.analyze_query(user_query)

        # Gather context from codebase
        context_parts = []

        # Add codebase search results if needed
        if analysis['needs_code_search']:
            for query in analysis['search_queries']:
                search_results = self.search_codebase(query)
                context_parts.append(search_results)

        # Add feature explanation if needed
        if analysis['needs_feature_explanation']:
            feature_explanation = self.explain_feature(analysis['feature_to_explain'])
            context_parts.append(feature_explanation)

        # Combine context
        context = "\n\n".join(context_parts) if context_parts else ""

        # Prepare messages for AI
        system_prompt = """You are LUXBIN's autonomous AI assistant. You have access to the complete LUXBIN codebase through semantic search.

Key capabilities:
- Explain LUXBIN features using real code from the repository
- Help with blockchain operations and smart contracts
- Provide technical guidance on quantum cryptography and temporal keys
- Assist with development and deployment

When responding:
- Always reference actual code when explaining features
- Show "🔍 Searched X files" when using codebase search
- Be helpful, technical, and focused on LUXBIN's unique value proposition
- If you don't know something, search the codebase first

LUXBIN's core innovations:
- Temporal cryptography with time-based key derivation
- Quantum-resistant blockchain consensus
- AI compute marketplace on Substrate
- Cross-chain interoperability with Ethereum"""

        messages = [
            {"role": "system", "content": system_prompt}
        ]

        # Add conversation history
        for msg in self.conversation_history[-10:]:  # Last 10 messages
            messages.append({
                "role": msg['role'],
                "content": msg['content']
            })

        # Add current context
        if context:
            messages.append({
                "role": "system",
                "content": f"Relevant codebase information:\n{context}"
            })

        # Generate response using available AI
        response = ""
        try:
            if self.anthropic_client:
                # Use Claude for more nuanced responses
                response = self._generate_claude_response(messages)
            elif self.openai_client:
                # Fallback to GPT
                response = self._generate_openai_response(messages)
            else:
                response = self._generate_fallback_response(user_query, context)

        except Exception as e:
            logger.error(f"AI generation failed: {e}")
            response = self._generate_fallback_response(user_query, context)

        # Add response to history
        self.add_to_history('assistant', response)

        return response

    def _generate_claude_response(self, messages) -> str:
        """Generate response using Claude"""
        # Convert messages to Claude format
        claude_messages = []
        system_message = ""

        for msg in messages:
            if msg['role'] == 'system':
                system_message += msg['content'] + "\n\n"
            else:
                claude_messages.append({
                    "role": msg['role'],
                    "content": msg['content']
                })

        response = self.anthropic_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=2000,
            system=system_message.strip(),
            messages=claude_messages
        )

        return response.content[0].text

    def _generate_openai_response(self, messages) -> str:
        """Generate response using OpenAI"""
        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=2000,
            temperature=0.7
        )

        return response.choices[0].message.content

    def _generate_fallback_response(self, query: str, context: str) -> str:
        """Generate basic response without external AI"""
        response = f"I understand you're asking about: {query}\n\n"

        if context:
            response += f"Based on the LUXBIN codebase:\n\n{context}\n\n"
        else:
            response += "I don't have specific information about that in my current knowledge base.\n\n"

        response += "To get more detailed information, please ensure OPENAI_API_KEY or ANTHROPIC_API_KEY environment variables are set."

        return response

    def get_stats(self) -> Dict[str, Any]:
        """Get AI system statistics"""
        return {
            'conversation_length': len(self.conversation_history),
            'rag_stats': self.rag_search.get_database_stats(),
            'ai_clients': {
                'openai': self.openai_client is not None,
                'anthropic': self.anthropic_client is not None
            }
        }


def main():
    """Interactive chatbot interface"""
    ai = LuxbinAutonomousAI()

    print("🤖 LUXBIN Autonomous AI Assistant")
    print("Type 'quit' to exit, 'stats' for system info")
    print("=" * 50)

    while True:
        try:
            user_input = input("\nYou: ").strip()

            if user_input.lower() in ['quit', 'exit', 'q']:
                print("Goodbye! 👋")
                break

            if user_input.lower() == 'stats':
                stats = ai.get_stats()
                print(f"📊 System Stats:")
                print(f"  Conversations: {stats['conversation_length']}")
                print(f"  Indexed chunks: {stats['rag_stats']['total_chunks_indexed']}")
                print(f"  AI clients: OpenAI={stats['ai_clients']['openai']}, Anthropic={stats['ai_clients']['anthropic']}")
                continue

            if not user_input:
                continue

            response = ai.generate_response(user_input)
            print(f"\n🤖 LUXBIN AI: {response}")

        except KeyboardInterrupt:
            print("\nGoodbye! 👋")
            break
        except Exception as e:
            print(f"Error: {e}")
            continue


if __name__ == "__main__":
    main()