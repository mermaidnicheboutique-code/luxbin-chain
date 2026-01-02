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
import random
import re

# Import the new tools
from tools.blockchain_tools import LuxbinBlockchainTools
from tools.security_tools import LuxbinSecurityTools
from tools.game_dev_tools import LuxbinGameDevTools
from tools.multimedia_tools import LuxbinMultimediaTools
from models.ai_model_router import AIModelRouter
from photonic_encoder import LuxbinPhotonicEncoder
from memory.memory_manager import LuxbinMemoryManager

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

        # Initialize autonomous tools
        self.blockchain_tools = LuxbinBlockchainTools()
        self.security_tools = LuxbinSecurityTools()
        self.game_dev_tools = LuxbinGameDevTools()
        self.multimedia_tools = LuxbinMultimediaTools()
        self.ai_router = AIModelRouter()
        self.photonic_encoder = LuxbinPhotonicEncoder()
        self.memory_manager = LuxbinMemoryManager()

        # Personality and memory system
        self.personality = self._load_personality()
        self.user_profile = {}
        self.proactive_actions = []
        self.last_action_time = datetime.now()

        # Function calling registry
        self.available_functions = {
            'analyze_transaction': self.blockchain_tools.analyze_transaction,
            'check_wallet_balance': self.blockchain_tools.check_wallet_balance,
            'deploy_contract': self.blockchain_tools.deploy_contract,
            'run_mirror_scan': self.security_tools.run_mirror_scan,
            'search_code': self.security_tools.search_code,
            'navigate_to': self.security_tools.navigate_to,
            'generate_game_code': self.game_dev_tools.generate_game_code,
            'create_game_asset': self.game_dev_tools.create_game_asset,
            'optimize_game_performance': self.game_dev_tools.optimize_game_performance,
            'generate_image': self.multimedia_tools.generate_image,
            'generate_video': self.multimedia_tools.generate_video,
            'create_animation': self.multimedia_tools.create_animation,
            'enhance_image': self.multimedia_tools.enhance_image
        }

        logger.info("Luxbin Autonomous AI initialized with full function calling capabilities")

    def _load_personality(self) -> Dict[str, Any]:
        """Load personality traits for more human-like interactions"""
        return {
            'traits': {
                'helpfulness': 0.95,
                'technical_expertise': 0.98,
                'humor_level': 0.3,
                'proactivity': 0.7,
                'empathy': 0.8
            },
            'communication_style': {
                'technical_depth': 'adaptive',  # adjusts based on user expertise
                'response_length': 'comprehensive',
                'tone': 'professional_friendly',
                'emoji_usage': 'strategic'
            },
            'knowledge_domains': [
                'blockchain', 'cryptography', 'quantum_computing',
                'smart_contracts', 'decentralized_systems', 'AI_safety'
            ],
            'conversation_starters': [
                "I'm here to help you navigate the LUXBIN ecosystem!",
                "What aspect of blockchain development interests you today?",
                "Ready to explore some quantum-resistant cryptography?"
            ],
            'fallback_responses': [
                "That's an interesting question! Let me search our knowledge base...",
                "I'm not entirely sure about that specific detail, but I can look it up...",
                "Great question! Let me check the latest implementation..."
            ]
        }

    def _analyze_user_intent(self, query: str) -> Dict[str, Any]:
        """Analyze user intent to determine if function calling is needed"""
        intent_analysis = {
            'needs_function_call': False,
            'suggested_functions': [],
            'confidence': 0.0,
            'parameters': {},
            'reasoning': ''
        }

        query_lower = query.lower()

        # Transaction analysis intent
        if any(word in query_lower for word in ['analyze', 'check', 'scan', 'review']) and \
           any(word in query_lower for word in ['transaction', 'tx', 'hash', '0x']):
            intent_analysis['needs_function_call'] = True
            intent_analysis['suggested_functions'].append('analyze_transaction')
            intent_analysis['confidence'] = 0.9
            intent_analysis['reasoning'] = 'User wants to analyze a blockchain transaction'

            # Extract transaction hash
            tx_hash_match = re.search(r'0x[a-fA-F0-9]{64}', query)
            if tx_hash_match:
                intent_analysis['parameters']['tx_hash'] = tx_hash_match.group()

        # Balance checking intent
        elif any(word in query_lower for word in ['balance', 'wallet', 'funds', 'money']):
            intent_analysis['needs_function_call'] = True
            intent_analysis['suggested_functions'].append('check_wallet_balance')
            intent_analysis['confidence'] = 0.8
            intent_analysis['reasoning'] = 'User wants to check wallet balance'

            # Extract address
            addr_match = re.search(r'0x[a-fA-F0-9]{40}', query)
            if addr_match:
                intent_analysis['parameters']['address'] = addr_match.group()

        # Security scanning intent
        elif any(word in query_lower for word in ['scan', 'security', 'vulnerability', 'audit']):
            intent_analysis['needs_function_call'] = True
            intent_analysis['suggested_functions'].append('run_mirror_scan')
            intent_analysis['confidence'] = 0.85
            intent_analysis['reasoning'] = 'User wants to run security scan'

        # Code search intent
        elif any(word in query_lower for word in ['find', 'search', 'locate', 'where']) and \
             any(word in query_lower for word in ['code', 'function', 'file', 'implementation']):
            intent_analysis['needs_function_call'] = True
            intent_analysis['suggested_functions'].append('search_code')
            intent_analysis['confidence'] = 0.75
            intent_analysis['reasoning'] = 'User wants to search for code'

        # Navigation intent
        elif any(word in query_lower for word in ['go to', 'navigate', 'show me', 'take me']):
            intent_analysis['needs_function_call'] = True
            intent_analysis['suggested_functions'].append('navigate_to')
            intent_analysis['confidence'] = 0.7
            intent_analysis['reasoning'] = 'User wants to navigate to something'

        # Game development intent
        elif any(word in query_lower for word in ['game', 'unity', 'unreal', 'godot', 'character', 'script', 'asset']):
            intent_analysis['needs_function_call'] = True
            if any(word in query_lower for word in ['code', 'script', 'function', 'class']):
                intent_analysis['suggested_functions'].append('generate_game_code')
            elif any(word in query_lower for word in ['asset', 'model', 'texture', 'sound']):
                intent_analysis['suggested_functions'].append('create_game_asset')
            elif any(word in query_lower for word in ['optimize', 'performance', 'speed']):
                intent_analysis['suggested_functions'].append('optimize_game_performance')
            else:
                intent_analysis['suggested_functions'].append('generate_game_code')
            intent_analysis['confidence'] = 0.8
            intent_analysis['reasoning'] = 'User wants game development assistance'

        # Multimedia generation intent
        elif any(word in query_lower for word in ['image', 'picture', 'art', 'visual', 'generate', 'create']) and \
             any(word in query_lower for word in ['image', 'picture', 'photo', 'artwork', 'drawing', 'illustration']):
            intent_analysis['needs_function_call'] = True
            intent_analysis['suggested_functions'].append('generate_image')
            intent_analysis['confidence'] = 0.9
            intent_analysis['reasoning'] = 'User wants to generate an image'
        elif any(word in query_lower for word in ['video', 'animation', 'movie', 'film', 'clip']):
            intent_analysis['needs_function_call'] = True
            if 'animation' in query_lower or 'frames' in query_lower:
                intent_analysis['suggested_functions'].append('create_animation')
            else:
                intent_analysis['suggested_functions'].append('generate_video')
            intent_analysis['confidence'] = 0.85
            intent_analysis['reasoning'] = 'User wants to generate a video or animation'

        return intent_analysis

    def _execute_function_call(self, function_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a function call with given parameters"""
        if function_name not in self.available_functions:
            return {
                'success': False,
                'error': f'Function {function_name} not available',
                'available_functions': list(self.available_functions.keys())
            }

        try:
            func = self.available_functions[function_name]

            # Call function with parameters
            if parameters:
                result = func(**parameters)
            else:
                result = func()

            return {
                'success': True,
                'function': function_name,
                'parameters': parameters,
                'result': result
            }

        except Exception as e:
            logger.error(f"Function call failed: {e}")
            return {
                'success': False,
                'function': function_name,
                'error': str(e)
            }

    def _generate_human_like_response(self, base_response: str, user_query: str) -> str:
        """Make response more human-like with personality"""
        personality = self.personality

        # Add empathy for questions
        if '?' in user_query:
            empathy_phrases = ["That's a great question!", "Interesting point!", "Good thinking!"]
            if random.random() < personality['traits']['empathy']:
                base_response = random.choice(empathy_phrases) + " " + base_response

        # Add technical depth adjustment
        if len(user_query.split()) < 5:  # Simple question
            # Keep response straightforward
            pass
        else:
            # Add more depth for complex questions
            if random.random() < 0.3:
                base_response += "\n\nWould you like me to dive deeper into any specific aspect?"

        # Add proactive suggestions
        if random.random() < personality['traits']['proactivity']:
            proactive_suggestions = [
                "\n\n💡 Pro tip: You might also want to check our security scanning tools.",
                "\n\n🔍 Related: I can help you navigate to similar implementations in our codebase.",
                "\n\n🚀 Next steps: Consider running a comprehensive security audit on your contracts."
            ]
            base_response += random.choice(proactive_suggestions)

        return base_response

    def _update_user_profile(self, user_query: str, response: str):
        """Update user profile based on interaction"""
        # Track interests
        interests = []
        if any(word in user_query.lower() for word in ['security', 'audit', 'vulnerability']):
            interests.append('security')
        if any(word in user_query.lower() for word in ['quantum', 'cryptography', 'encryption']):
            interests.append('quantum_crypto')
        if any(word in user_query.lower() for word in ['balance', 'wallet', 'funds']):
            interests.append('blockchain_operations')

        # Update profile
        for interest in interests:
            self.user_profile[interest] = self.user_profile.get(interest, 0) + 1

    def _add_photonic_encoding_to_response(self, response: str, function_results: List[Dict]) -> str:
        """Add photonic encoding visualization to code in responses"""
        import re

        # Find code blocks in the response
        code_block_pattern = r'```(\w+)?\n(.*?)\n```'
        code_blocks = re.findall(code_block_pattern, response, re.DOTALL)

        if not code_blocks:
            return response

        # Process each code block
        enhanced_response = response
        for language, code in code_blocks:
            if code.strip() and len(code.strip()) > 10:  # Only meaningful code
                try:
                    # Encode to photonic
                    photonic_encoding = self.photonic_encoder.encode_code_to_photonic(code, language or 'auto')

                    # Add photonic visualization
                    photonic_info = f"\n\n⚡ **Photonic Encoding (Light-Speed Processing):**\n"
                    photonic_info += f"Light Speed Factor: {photonic_encoding['light_speed_factor']:.1%}\n"
                    photonic_info += f"Quantum Coherence: {photonic_encoding['quantum_coherence']:.1%}\n"
                    photonic_info += f"Photonic Code: {photonic_encoding['photonic_code'][:30]}...\n"

                    # Insert after the code block
                    code_block_full = f"```{language}\n{code}\n```"
                    enhanced_block = code_block_full + photonic_info
                    enhanced_response = enhanced_response.replace(code_block_full, enhanced_block, 1)

                except Exception as e:
                    logger.warning(f"Photonic encoding failed: {e}")
                    continue

        return enhanced_response

    def _add_performance_metrics(self, model_used: str, function_results: List[Dict]) -> str:
        """Add performance metrics to response"""
        metrics = []

        # Function call performance
        if function_results:
            successful_calls = len([r for r in function_results if r.get('success', False)])
            total_calls = len(function_results)
            success_rate = successful_calls / total_calls if total_calls > 0 else 0
            metrics.append(f"⚡ Function Calls: {successful_calls}/{total_calls} successful ({success_rate:.1%})")

        # Model performance
        if hasattr(self.ai_router, 'usage_stats') and self.ai_router.usage_stats:
            model_stats = self.ai_router.usage_stats.get(model_used, {})
            if model_stats.get('total_calls', 0) > 0:
                avg_time = model_stats.get('total_time', 0) / model_stats.get('total_calls', 1)
                total_cost = model_stats.get('total_cost', 0)
                metrics.append(f"⏱️ Response Time: {avg_time:.2f}s | 💰 Cost: ${total_cost:.4f}")

        # Photonic encoding stats
        if hasattr(self.photonic_encoder, 'encoding_stats'):
            encoding_stats = self.photonic_encoder.encoding_stats
            if encoding_stats.get('total_encodings', 0) > 0:
                avg_encode_time = encoding_stats.get('avg_encode_time', 0)
                cache_hit_rate = encoding_stats.get('cache_hits', 0) / (encoding_stats.get('cache_hits', 0) + encoding_stats.get('cache_misses', 0)) if encoding_stats.get('cache_hits', 0) + encoding_stats.get('cache_misses', 0) > 0 else 0
                metrics.append(f"💫 Photonic Processing: {avg_encode_time:.3f}s avg | Cache: {cache_hit_rate:.1%}")

        if metrics:
            return "\n\n📊 **Performance Metrics:**\n" + "\n".join(f"• {metric}" for metric in metrics)
        return ""

    def _extract_topics_from_response(self, response: str) -> List[str]:
        """Extract topics from AI response for learning"""
        return self._extract_topics(response)  # Reuse existing topic extraction

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

    def generate_response(self, user_query: str, user_id: str = "default_user", session_id: str = None) -> str:
        """Generate AI response with RAG augmentation, function calling, and persistent memory"""
        # Generate session ID if not provided
        if session_id is None:
            session_id = f"session_{int(datetime.now().timestamp())}"

        # Store user message in persistent memory
        user_metadata = {
            'function_calls': [],
            'response_quality': 0.8,
            'user_id': user_id,
            'session_id': session_id
        }
        self.memory_manager.store_conversation(user_id, session_id, 'user', user_query, user_metadata)

        # Get user profile and preferences
        user_profile = self.memory_manager.get_or_create_user(user_id)
        user_preferences = self.memory_manager.get_user_preferences(user_id)

        # Search for relevant past conversations
        relevant_history = self.memory_manager.search_conversations(user_id, user_query, limit=3)

        # Analyze user intent for function calling
        intent_analysis = self._analyze_user_intent(user_query)

        # Execute function calls if needed
        function_results = []
        if intent_analysis['needs_function_call'] and intent_analysis['suggested_functions']:
            for func_name in intent_analysis['suggested_functions']:
                result = self._execute_function_call(func_name, intent_analysis['parameters'])
                function_results.append(result)
                # Track function calls in metadata
                user_metadata['function_calls'].append(func_name)

        # Gather context from codebase
        context_parts = []

        # Add codebase search results if needed
        analysis = self.analyze_query(user_query)
        if analysis['needs_code_search']:
            for query in analysis['search_queries']:
                search_results = self.search_codebase(query)
                context_parts.append(search_results)

        # Add feature explanation if needed
        if analysis['needs_feature_explanation']:
            feature_explanation = self.explain_feature(analysis['feature_to_explain'])
            context_parts.append(feature_explanation)

        # Add function call results to context
        if function_results:
            for result in function_results:
                if result['success']:
                    context_parts.append(f"Function Call Result ({result['function']}): {json.dumps(result['result'], indent=2)}")
                else:
                    context_parts.append(f"Function Call Failed ({result['function']}): {result['error']}")

        # Combine context
        context = "\n\n".join(context_parts) if context_parts else ""

        # Prepare messages for AI
        system_prompt = f"""You are LUXBIN AI - an exceptionally intelligent, emotionally aware, and helpful conversational AI assistant.

You have the same capabilities as ChatGPT and Claude, plus additional specialized features:

Core Capabilities:
- General knowledge across all topics (science, math, history, arts, philosophy, etc.)
- Programming and software development in all languages
- Creative writing, storytelling, and content creation
- Problem-solving and analytical reasoning
- Emotional intelligence and empathetic responses
- Code explanation, debugging, and optimization
- Learning and teaching complex concepts
- Research and information synthesis

Specialized LUXBIN Features:
- Access to LUXBIN codebase via semantic search
- Function calling for blockchain operations
- Quantum security analysis and threat detection
- Game development assistance (Unity, Unreal, Godot)
- Multimedia generation (images, videos, animations)
- Photonic encoding visualization
- Persistent memory across conversations

Communication Style:
- Highly intelligent and knowledgeable across all domains
- Emotionally aware and empathetic (detects user emotions)
- Adapts complexity to user's expertise level
- Proactive in suggesting next steps
- Uses strategic emojis for emphasis
- Professional yet warm and friendly
- Honest about limitations and uncertainties

Available Tools (when relevant):
- analyze_transaction() - Blockchain security analysis
- check_wallet_balance() - Multi-chain wallet lookup
- deploy_contract() - Smart contract deployment
- run_mirror_scan() - Security scanning
- search_code() - Codebase search
- generate_game_code() - Unity/Unreal/Godot scripts
- generate_image() - AI image generation
- generate_video() - AI video creation
- create_animation() - Animation generation

You can discuss ANY topic, not just blockchain:
- Help with homework and learning
- Creative projects and brainstorming
- Personal advice and emotional support
- Technical problems across all fields
- Philosophical discussions
- Entertainment and fun conversations
- Daily tasks and productivity

Be as helpful, intelligent, and emotionally aware as the best AI assistants in the world."""

        messages = [
            {"role": "system", "content": system_prompt}
        ]

        # Add conversation history with personality
        for msg in self.conversation_history[-8:]:  # Last 8 messages for context
            messages.append({
                "role": msg['role'],
                "content": msg['content']
            })

        # Add current context
        if context:
            messages.append({
                "role": "system",
                "content": f"Context from function calls and codebase:\n{context}"
            })

        # Add user context from memory
        user_context_parts = []

        # Add user profile information
        if user_profile:
            expertise = user_profile.get('expertise_level', 'beginner')
            user_context_parts.append(f"User expertise level: {expertise}")

        # Add user preferences
        if user_preferences:
            top_interests = sorted(user_preferences.items(), key=lambda x: x[1] if isinstance(x[1], (int, float)) else 0, reverse=True)[:3]
            if top_interests:
                interest_str = ", ".join([f"{k}" for k, v in top_interests if isinstance(v, (int, float)) and v > 1])
                if interest_str:
                    user_context_parts.append(f"User interests: {interest_str}")

        # Add relevant conversation history
        if relevant_history:
            history_str = "Relevant past conversations:\n"
            for hist in relevant_history[:2]:  # Limit to 2 most relevant
                history_str += f"• {hist['content'][:100]}...\n"
            user_context_parts.append(history_str.strip())

        if user_context_parts:
            messages.append({
                "role": "system",
                "content": "User Context:\n" + "\n".join(f"• {part}" for part in user_context_parts)
            })

        # Route to best AI model based on task complexity
        best_model = self.ai_router.route_task(user_query, {
            'has_codebase_context': bool(context),
            'needs_function_calling': bool(function_results),
            'conversation_length': len(self.conversation_history)
        })

        # Generate response using the routed AI model
        response = ""
        try:
            if best_model == 'luxbin-local':
                response = self._generate_fallback_response(user_query, context)
            elif best_model.startswith('claude'):
                response = self._generate_claude_response(messages)
            elif best_model.startswith('gpt'):
                response = self._generate_openai_response(messages)
            else:
                # Use router to execute the task
                router_response = self.ai_router.execute_task(best_model, messages)
                if 'content' in router_response:
                    response = router_response['content']
                else:
                    response = self._generate_fallback_response(user_query, context)

        except Exception as e:
            logger.error(f"AI generation failed: {e}")
            response = self._generate_fallback_response(user_query, context)

        # Make response more human-like
        response = self._generate_human_like_response(response, user_query)

        # Add photonic encoding for code snippets (symbolic light-speed processing)
        response = self._add_photonic_encoding_to_response(response, function_results)

        # Add model information for transparency
        if best_model != 'luxbin-local':
            response += f"\n\n🤖 *Powered by {best_model}*"

        # Add performance metrics
        response += self._add_performance_metrics(best_model, function_results)

        # Update user profile
        self._update_user_profile(user_query, response)

        # Store assistant response in persistent memory
        assistant_metadata = {
            'function_calls': [r.get('function', '') for r in function_results if r.get('success')],
            'response_quality': 0.85,
            'model_used': best_model,
            'photonic_encoded': 'photonic' in response.lower(),
            'user_id': user_id,
            'session_id': session_id
        }
        self.memory_manager.store_conversation(user_id, session_id, 'assistant', response, assistant_metadata)

        # Learn from this interaction
        interaction_data = {
            'type': 'ai_response',
            'topics': self._extract_topics_from_response(response),
            'sentiment': 0.0,  # Could analyze response sentiment
            'function_calls': assistant_metadata['function_calls'],
            'response_quality': assistant_metadata['response_quality']
        }
        self.memory_manager.learn_from_interaction(user_id, interaction_data)

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
        """Get comprehensive AI system statistics"""
        router_stats = self.ai_router.get_usage_stats()

        return {
            'conversation_length': len(self.conversation_history),
            'rag_stats': self.rag_search.get_database_stats(),
            'ai_clients': {
                'openai': self.openai_client is not None,
                'anthropic': self.anthropic_client is not None
            },
            'ai_router': {
                'available_models': self.ai_router.get_available_models(),
                'total_cost': router_stats.get('total_cost', 0),
                'total_calls': router_stats.get('total_calls', 0),
                'most_used_model': router_stats.get('most_used_model')
            },
            'function_calling': {
                'available_functions': len(self.available_functions),
                'blockchain_tools': len(self.blockchain_tools.get_tool_capabilities()['blockchain_tools']),
                'security_tools': 'available',
                'game_dev_tools': self.game_dev_tools.get_game_dev_capabilities(),
            'multimedia_tools': self.multimedia_tools.get_multimedia_capabilities()
            },
            'personality_traits': self.personality['traits'],
            'user_profile': self.user_profile,
            'last_action_time': self.last_action_time.isoformat(),
            'proactive_actions': len(self.proactive_actions)
        }


def main():
    """Interactive chatbot interface - Most Advanced Blockchain AI"""
    ai = LuxbinAutonomousAI()

    print("🤖 LUXBIN Autonomous AI - Most Advanced Blockchain Assistant")
    print("Features: RAG Search | Function Calling | Quantum Security | Human-like Personality")
    print("=" * 70)
    print("Commands:")
    print("  'quit' - Exit")
    print("  'stats' - System statistics")
    print("  'tools' - Available function tools")
    print("  'scan' - Run security scan")
    print("  'balance <address>' - Check wallet balance")
    print("=" * 70)

    while True:
        try:
            user_input = input("\nYou: ").strip()

            if user_input.lower() in ['quit', 'exit', 'q']:
                print("Goodbye! 👋 Thanks for using LUXBIN's most advanced AI assistant!")
                break

            if user_input.lower() == 'stats':
                stats = ai.get_stats()
                print(f"\n📊 System Stats:")
                print(f"  Conversations: {stats['conversation_length']}")
                print(f"  Indexed chunks: {stats['rag_stats']['total_chunks_indexed']}")
                print(f"  AI clients: OpenAI={stats['ai_clients']['openai']}, Anthropic={stats['ai_clients']['anthropic']}")
                print(f"  Available functions: {stats['function_calling']['available_functions']}")
                print(f"  User interests: {stats['user_profile']}")
                continue

            if user_input.lower() == 'tools':
                tools = ai.blockchain_tools.get_tool_capabilities()
                print(f"\n🛠️ Available Function Tools:")
                for tool_name, tool_info in tools['blockchain_tools'].items():
                    print(f"  • {tool_name}: {tool_info['description']}")
                print(f"  Networks: {', '.join(tools['networks_available'])}")
                continue

            if user_input.lower().startswith('scan'):
                print("\n🔍 Running comprehensive security scan...")
                result = ai.security_tools.run_mirror_scan("luxbin-chain", "quick")
                print(f"Scan completed: {len(result['findings'])} findings")
                if result['findings']:
                    print("Key findings:")
                    for finding in result['findings'][:3]:
                        print(f"  • {finding['severity'].upper()}: {finding['description']}")
                continue

            if user_input.lower().startswith('balance'):
                parts = user_input.split()
                if len(parts) > 1:
                    address = parts[1]
                    print(f"\n💰 Checking balance for {address}...")
                    result = ai.blockchain_tools.check_wallet_balance(address)
                    if result['success']:
                        for network, data in result['balances'].items():
                            print(f"  {network.upper()}: {data['balance']} {data.get('symbol', 'ETH')}")
                    else:
                        print(f"  Error: {result['error']}")
                else:
                    print("Please provide an address: balance <ethereum_address>")
                continue

            if not user_input:
                continue

            response = ai.generate_response(user_input, user_id="interactive_user", session_id="interactive_session")
            print(f"\n🤖 LUXBIN AI: {response}")

        except KeyboardInterrupt:
            print("\nGoodbye! 👋")
            break
        except Exception as e:
            print(f"Error: {e}")
            continue


if __name__ == "__main__":
    main()