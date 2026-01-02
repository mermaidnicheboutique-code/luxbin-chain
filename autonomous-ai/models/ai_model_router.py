#!/usr/bin/env python3
"""
LUXBIN AI Model Router - Intelligent External AI Integration
Routes tasks to the best AI model based on expertise and cost-efficiency
"""

import os
import sys
import time
import json
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import openai
import anthropic
from pathlib import Path

logger = logging.getLogger(__name__)

class AIModelRouter:
    """Intelligent router for external AI model integration"""

    def __init__(self):
        self.models = {}
        self.usage_stats = {}
        self.cost_tracking = {}
        self.model_expertise = self._load_model_expertise()

        # Initialize available models
        self._init_models()

    def _load_model_expertise(self) -> Dict[str, Dict[str, Any]]:
        """Load expertise mapping for different AI models"""
        return {
            'claude-3-opus': {
                'strengths': ['quantum_physics', 'mathematics', 'complex_reasoning', 'security_analysis', 'research'],
                'cost_per_token': 0.000015,
                'max_tokens': 200000,
                'best_for': ['quantum_cryptography', 'security_audits', 'complex_analysis'],
                'personality': 'analytical'
            },
            'claude-3-sonnet': {
                'strengths': ['coding', 'quantum_computing', 'technical_writing', 'problem_solving'],
                'cost_per_token': 0.000003,
                'max_tokens': 200000,
                'best_for': ['code_generation', 'quantum_algorithms', 'technical_explanation'],
                'personality': 'technical'
            },
            'gpt-4-turbo': {
                'strengths': ['general_intelligence', 'creativity', 'conversation', 'code_generation', 'analysis'],
                'cost_per_token': 0.00001,
                'max_tokens': 128000,
                'best_for': ['general_assistance', 'creative_solutions', 'code_review'],
                'personality': 'versatile'
            },
            'gpt-4': {
                'strengths': ['deep_analysis', 'mathematical_reasoning', 'comprehensive_responses'],
                'cost_per_token': 0.00003,
                'max_tokens': 8192,
                'best_for': ['complex_analysis', 'mathematical_problems', 'detailed_explanations'],
                'personality': 'thorough'
            },
            'luxbin-local': {
                'strengths': ['luxbin_specific', 'codebase_knowledge', 'local_context'],
                'cost_per_token': 0.0,  # Free
                'max_tokens': float('inf'),
                'best_for': ['luxbin_questions', 'code_references', 'local_knowledge'],
                'personality': 'specialized'
            }
        }

    def _init_models(self):
        """Initialize available AI model clients"""
        # Claude models
        if os.getenv('ANTHROPIC_API_KEY'):
            try:
                self.models['claude-3-opus'] = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
                self.models['claude-3-sonnet'] = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
                logger.info("Claude models initialized")
            except Exception as e:
                logger.warning(f"Failed to initialize Claude: {e}")

        # OpenAI models
        if os.getenv('OPENAI_API_KEY'):
            try:
                openai.api_key = os.getenv('OPENAI_API_KEY')
                self.models['gpt-4'] = openai
                self.models['gpt-4-turbo'] = openai
                logger.info("OpenAI models initialized")
            except Exception as e:
                logger.warning(f"Failed to initialize OpenAI: {e}")

        # Luxbin local (our RAG system)
        self.models['luxbin-local'] = 'local_rag_system'

        logger.info(f"Initialized {len(self.models)} AI models")

    def route_task(self, task_description: str, context: Dict[str, Any] = None) -> str:
        """
        Route a task to the most appropriate AI model

        Args:
            task_description: Description of the task
            context: Additional context about the task

        Returns:
            Best model name for the task
        """
        if context is None:
            context = {}

        # Analyze task requirements
        task_analysis = self._analyze_task(task_description, context)

        # Score each available model
        model_scores = {}
        for model_name in self.models.keys():
            if model_name in self.model_expertise:
                score = self._score_model_for_task(model_name, task_analysis)
                model_scores[model_name] = score

        # Select best model
        if model_scores:
            best_model = max(model_scores.items(), key=lambda x: x[1])
            logger.info(f"Routed task '{task_description[:50]}...' to {best_model[0]} (score: {best_model[1]:.2f})")
            return best_model[0]

        # Fallback to local if no models available
        return 'luxbin-local'

    def _analyze_task(self, task: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze task requirements"""
        analysis = {
            'domain': 'general',
            'complexity': 'medium',
            'requires_creativity': False,
            'requires_precision': False,
            'time_sensitive': False,
            'cost_sensitive': context.get('cost_sensitive', False),
            'keywords': []
        }

        task_lower = task.lower()

        # Domain detection
        if any(word in task_lower for word in ['quantum', 'cryptography', 'security', 'encryption']):
            analysis['domain'] = 'quantum_crypto'
        elif any(word in task_lower for word in ['code', 'function', 'class', 'algorithm', 'programming']):
            analysis['domain'] = 'coding'
        elif any(word in task_lower for word in ['analyze', 'review', 'audit', 'security']):
            analysis['domain'] = 'analysis'
        elif any(word in task_lower for word in ['explain', 'describe', 'what is', 'how does']):
            analysis['domain'] = 'explanation'

        # Complexity assessment
        if len(task.split()) > 50 or any(word in task_lower for word in ['complex', 'advanced', 'sophisticated']):
            analysis['complexity'] = 'high'
        elif len(task.split()) < 10:
            analysis['complexity'] = 'low'

        # Special requirements
        analysis['requires_creativity'] = any(word in task_lower for word in ['create', 'design', 'innovative', 'creative'])
        analysis['requires_precision'] = any(word in task_lower for word in ['precise', 'accurate', 'exact', 'calculate'])
        analysis['time_sensitive'] = any(word in task_lower for word in ['urgent', 'quickly', 'fast', 'immediate'])

        # Extract keywords
        analysis['keywords'] = [word for word in task_lower.split() if len(word) > 3][:5]

        return analysis

    def _score_model_for_task(self, model_name: str, task_analysis: Dict[str, Any]) -> float:
        """Score how well a model fits a task"""
        expertise = self.model_expertise.get(model_name, {})
        base_score = 50  # Starting score

        # Domain expertise bonus
        if task_analysis['domain'] in expertise.get('best_for', []):
            base_score += 30

        # Strength matching
        task_keywords = task_analysis['keywords']
        model_strengths = expertise.get('strengths', [])
        keyword_matches = sum(1 for keyword in task_keywords if any(strength in keyword or keyword in strength for strength in model_strengths))
        base_score += keyword_matches * 10

        # Complexity adjustment
        if task_analysis['complexity'] == 'high' and expertise.get('max_tokens', 0) > 100000:
            base_score += 20
        elif task_analysis['complexity'] == 'low' and model_name == 'luxbin-local':
            base_score += 10

        # Cost consideration
        if task_analysis.get('cost_sensitive', False):
            cost_penalty = expertise.get('cost_per_token', 0) * 10000  # Penalize expensive models
            base_score -= min(cost_penalty, 20)

        # Availability bonus
        if model_name in self.models:
            base_score += 10

        return max(0, min(100, base_score))

    def execute_task(self, model_name: str, messages: List[Dict[str, str]], **kwargs) -> Dict[str, Any]:
        """
        Execute a task using the specified model

        Args:
            model_name: Name of the AI model to use
            messages: Chat messages for the task
            **kwargs: Additional parameters

        Returns:
            Response from the AI model
        """
        start_time = time.time()

        try:
            if model_name.startswith('claude'):
                response = self._call_claude(model_name, messages, **kwargs)
            elif model_name.startswith('gpt'):
                response = self._call_openai(model_name, messages, **kwargs)
            elif model_name == 'luxbin-local':
                response = self._call_luxbin_local(messages, **kwargs)
            else:
                response = {'error': f'Unknown model: {model_name}'}

            # Track usage
            execution_time = time.time() - start_time
            self._track_usage(model_name, execution_time, response)

            response.update({
                'model_used': model_name,
                'execution_time': execution_time,
                'timestamp': datetime.now().isoformat()
            })

            return response

        except Exception as e:
            logger.error(f"Task execution failed on {model_name}: {e}")
            return {
                'error': str(e),
                'model_used': model_name,
                'execution_time': time.time() - start_time,
                'fallback_suggestion': 'Try using luxbin-local or another available model'
            }

    def _call_claude(self, model_name: str, messages: List[Dict[str, str]], **kwargs) -> Dict[str, Any]:
        """Call Claude API"""
        client = self.models.get(model_name)
        if not client:
            return {'error': f'Claude client not available for {model_name}'}

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

        # Determine model name
        if model_name == 'claude-3-opus':
            model = "claude-3-opus-20240229"
        elif model_name == 'claude-3-sonnet':
            model = "claude-3-sonnet-20240229"
        else:
            model = "claude-3-sonnet-20240229"

        response = client.messages.create(
            model=model,
            max_tokens=kwargs.get('max_tokens', 2000),
            system=system_message.strip(),
            messages=claude_messages
        )

        return {
            'content': response.content[0].text,
            'usage': {
                'input_tokens': response.usage.input_tokens,
                'output_tokens': response.usage.output_tokens
            }
        }

    def _call_openai(self, model_name: str, messages: List[Dict[str, str]], **kwargs) -> Dict[str, Any]:
        """Call OpenAI API"""
        client = self.models.get(model_name)
        if not client:
            return {'error': f'OpenAI client not available for {model_name}'}

        # Determine model name
        if model_name == 'gpt-4':
            model = "gpt-4"
        elif model_name == 'gpt-4-turbo':
            model = "gpt-4-turbo-preview"
        else:
            model = "gpt-4"

        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=kwargs.get('max_tokens', 2000),
            temperature=kwargs.get('temperature', 0.7)
        )

        return {
            'content': response.choices[0].message.content,
            'usage': {
                'prompt_tokens': response.usage.prompt_tokens,
                'completion_tokens': response.usage.completion_tokens,
                'total_tokens': response.usage.total_tokens
            }
        }

    def _call_luxbin_local(self, messages: List[Dict[str, str]], **kwargs) -> Dict[str, Any]:
        """Use local LUXBIN RAG system"""
        # This would integrate with our existing RAG system
        # For now, return a placeholder
        last_user_message = ""
        for msg in reversed(messages):
            if msg['role'] == 'user':
                last_user_message = msg['content']
                break

        return {
            'content': f"Local LUXBIN knowledge base response for: {last_user_message[:100]}...",
            'usage': {'local_tokens': len(last_user_message.split())}
        }

    def _track_usage(self, model_name: str, execution_time: float, response: Dict[str, Any]):
        """Track model usage for analytics and cost optimization"""
        if model_name not in self.usage_stats:
            self.usage_stats[model_name] = {
                'total_calls': 0,
                'total_time': 0,
                'total_tokens': 0,
                'total_cost': 0,
                'errors': 0
            }

        stats = self.usage_stats[model_name]
        stats['total_calls'] += 1
        stats['total_time'] += execution_time

        # Track tokens and cost if available
        if 'usage' in response:
            usage = response['usage']
            if 'total_tokens' in usage:
                stats['total_tokens'] += usage['total_tokens']

            # Calculate cost
            expertise = self.model_expertise.get(model_name, {})
            cost_per_token = expertise.get('cost_per_token', 0)
            if 'total_tokens' in usage:
                stats['total_cost'] += usage['total_tokens'] * cost_per_token

        if 'error' in response:
            stats['errors'] += 1

    def get_usage_stats(self) -> Dict[str, Any]:
        """Get usage statistics for all models"""
        return {
            'model_stats': self.usage_stats,
            'total_cost': sum(stats.get('total_cost', 0) for stats in self.usage_stats.values()),
            'total_calls': sum(stats.get('total_calls', 0) for stats in self.usage_stats.values()),
            'most_used_model': max(self.usage_stats.items(), key=lambda x: x[1]['total_calls'])[0] if self.usage_stats else None
        }

    def optimize_routing(self) -> Dict[str, Any]:
        """Optimize routing based on usage patterns and performance"""
        optimizations = {}

        # Find most cost-effective models for common tasks
        if self.usage_stats:
            # Identify expensive models with low value
            expensive_models = [
                model for model, stats in self.usage_stats.items()
                if stats.get('total_cost', 0) > 1.0 and stats.get('total_calls', 0) < 10
            ]

            if expensive_models:
                optimizations['cost_reduction'] = f"Consider reducing usage of expensive models: {expensive_models}"

            # Identify high-error models
            error_prone = [
                model for model, stats in self.usage_stats.items()
                if stats.get('errors', 0) / max(stats.get('total_calls', 1), 1) > 0.2
            ]

            if error_prone:
                optimizations['reliability'] = f"Consider alternatives for error-prone models: {error_prone}"

        return optimizations

    def get_available_models(self) -> List[str]:
        """Get list of currently available models"""
        return list(self.models.keys())

    def get_model_info(self, model_name: str) -> Dict[str, Any]:
        """Get detailed information about a specific model"""
        if model_name not in self.model_expertise:
            return {'error': f'Model {model_name} not found'}

        info = self.model_expertise[model_name].copy()
        info['available'] = model_name in self.models
        info['usage_stats'] = self.usage_stats.get(model_name, {})

        return info


# Convenience functions
def route_to_best_model(task: str, context: Dict[str, Any] = None) -> str:
    """Route task to best available model"""
    router = AIModelRouter()
    return router.route_task(task, context)

def execute_with_best_model(task: str, messages: List[Dict[str, str]]) -> Dict[str, Any]:
    """Execute task with automatically selected best model"""
    router = AIModelRouter()
    model_name = router.route_task(task)
    return router.execute_task(model_name, messages)

def get_router_stats() -> Dict[str, Any]:
    """Get routing system statistics"""
    router = AIModelRouter()
    return router.get_usage_stats()


if __name__ == "__main__":
    # Test the router
    router = AIModelRouter()

    print("LUXBIN AI Model Router Initialized")
    print(f"Available models: {router.get_available_models()}")

    # Test routing
    test_tasks = [
        "Explain quantum cryptography",
        "Write a smart contract function",
        "Analyze this transaction hash",
        "What is the meaning of life?"
    ]

    for task in test_tasks:
        model = router.route_task(task)
        print(f"Task: '{task}' -> Model: {model}")

    # Show stats
    stats = router.get_usage_stats()
    print(f"\nTotal API calls: {stats['total_calls']}")
    print(f"Total cost: ${stats['total_cost']:.4f}")