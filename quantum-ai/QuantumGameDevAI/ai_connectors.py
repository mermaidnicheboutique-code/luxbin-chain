"""
Real AI System Connectors

This module provides integration with actual AI systems via their APIs.
Each connector enables real communication between the quantum network
and external AI models.
"""

import asyncio
from typing import Dict, Any, Optional
import os


class AIConnector:
    """Base class for AI system connectors"""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        self.is_connected = False

    async def connect(self) -> bool:
        """Establish connection to AI system"""
        raise NotImplementedError

    async def send_message(self, message: str) -> str:
        """Send message and get response"""
        raise NotImplementedError

    async def disconnect(self):
        """Close connection"""
        self.is_connected = False


class OpenAIConnector(AIConnector):
    """
    Connector for OpenAI models (ChatGPT, GPT-4, etc.)

    Usage:
        connector = OpenAIConnector(api_key="sk-...")
        await connector.connect()
        response = await connector.send_message("Hello!")
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "gpt-4"):
        super().__init__(api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.client = None

    async def connect(self) -> bool:
        """Connect to OpenAI API"""
        if not self.api_key:
            print("⚠ OpenAI API key not found. Set OPENAI_API_KEY environment variable.")
            return False

        try:
            # Try to import openai library
            import openai
            self.client = openai.AsyncOpenAI(api_key=self.api_key)
            self.is_connected = True
            print(f"✓ Connected to OpenAI ({self.model})")
            return True
        except ImportError:
            print("⚠ OpenAI library not installed. Run: pip install openai")
            return False
        except Exception as e:
            print(f"✗ Failed to connect to OpenAI: {e}")
            return False

    async def send_message(self, message: str) -> str:
        """Send message to ChatGPT and get response"""
        if not self.is_connected or not self.client:
            return "Error: Not connected to OpenAI"

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": message}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error: {e}"


class AnthropicConnector(AIConnector):
    """
    Connector for Anthropic models (Claude)

    Usage:
        connector = AnthropicConnector(api_key="sk-ant-...")
        await connector.connect()
        response = await connector.send_message("Hello!")
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "claude-3-haiku-20240307"):
        super().__init__(api_key or os.getenv("ANTHROPIC_API_KEY"))
        self.model = model
        self.client = None

    async def connect(self) -> bool:
        """Connect to Anthropic API"""
        if not self.api_key:
            print("⚠ Anthropic API key not found. Set ANTHROPIC_API_KEY environment variable.")
            return False

        try:
            import anthropic
            self.client = anthropic.AsyncAnthropic(api_key=self.api_key)
            self.is_connected = True
            print(f"✓ Connected to Anthropic ({self.model})")
            return True
        except ImportError:
            print("⚠ Anthropic library not installed. Run: pip install anthropic")
            return False
        except Exception as e:
            print(f"✗ Failed to connect to Anthropic: {e}")
            return False

    async def send_message(self, message: str) -> str:
        """Send message to Claude and get response"""
        if not self.is_connected or not self.client:
            return "Error: Not connected to Anthropic"

        try:
            response = await self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                messages=[{"role": "user", "content": message}]
            )
            return response.content[0].text
        except Exception as e:
            return f"Error: {e}"


class XAIConnector(AIConnector):
    """
    Connector for xAI models (Grok)

    Usage:
        connector = XAIConnector(api_key="xai-...")
        await connector.connect()
        response = await connector.send_message("Hello!")
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "grok-beta"):
        super().__init__(api_key or os.getenv("XAI_API_KEY"))
        self.model = model
        self.base_url = "https://api.x.ai/v1"

    async def connect(self) -> bool:
        """Connect to xAI API"""
        if not self.api_key:
            print("⚠ xAI API key not found. Set XAI_API_KEY environment variable.")
            return False

        try:
            # xAI uses OpenAI-compatible API
            import openai
            self.client = openai.AsyncOpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
            self.is_connected = True
            print(f"✓ Connected to xAI ({self.model})")
            return True
        except ImportError:
            print("⚠ OpenAI library not installed. Run: pip install openai")
            return False
        except Exception as e:
            print(f"✗ Failed to connect to xAI: {e}")
            return False

    async def send_message(self, message: str) -> str:
        """Send message to Grok and get response"""
        if not self.is_connected or not self.client:
            return "Error: Not connected to xAI"

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": message}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error: {e}"


class GoogleConnector(AIConnector):
    """
    Connector for Google models (Gemini)

    Usage:
        connector = GoogleConnector(api_key="...")
        await connector.connect()
        response = await connector.send_message("Hello!")
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "gemini-2.5-flash"):
        super().__init__(api_key or os.getenv("GOOGLE_API_KEY"))
        self.model = model
        self.client = None

    async def connect(self) -> bool:
        """Connect to Google AI API"""
        if not self.api_key:
            print("⚠ Google API key not found. Set GOOGLE_API_KEY environment variable.")
            return False

        try:
            import google.generativeai as genai
            genai.configure(api_key=self.api_key)
            self.client = genai.GenerativeModel(self.model)
            self.is_connected = True
            print(f"✓ Connected to Google AI ({self.model})")
            return True
        except ImportError:
            print("⚠ Google AI library not installed. Run: pip install google-generativeai")
            return False
        except Exception as e:
            print(f"✗ Failed to connect to Google AI: {e}")
            return False

    async def send_message(self, message: str) -> str:
        """Send message to Gemini and get response"""
        if not self.is_connected or not self.client:
            return "Error: Not connected to Google AI"

        try:
            response = await asyncio.to_thread(
                self.client.generate_content,
                message
            )
            return response.text
        except Exception as e:
            return f"Error: {e}"


class AIConnectorFactory:
    """Factory for creating AI connectors"""

    CONNECTORS = {
        'chatgpt': OpenAIConnector,
        'gpt4': OpenAIConnector,
        'openai': OpenAIConnector,
        'claude': AnthropicConnector,
        'anthropic': AnthropicConnector,
        'grok': XAIConnector,
        'xai': XAIConnector,
        'gemini': GoogleConnector,
        'google': GoogleConnector,
    }

    @classmethod
    def create(cls, ai_name: str, **kwargs) -> Optional[AIConnector]:
        """
        Create connector for specified AI system

        Args:
            ai_name: Name of AI system (case-insensitive)
            **kwargs: Additional arguments (api_key, model, etc.)

        Returns:
            AIConnector instance or None if not supported
        """
        ai_name_lower = ai_name.lower()

        for key, connector_class in cls.CONNECTORS.items():
            if key in ai_name_lower:
                return connector_class(**kwargs)

        print(f"⚠ No connector available for '{ai_name}'")
        return None

    @classmethod
    def supported_ais(cls) -> list:
        """Get list of supported AI systems"""
        return list(set(cls.CONNECTORS.keys()))


# Example usage
async def demo_real_connections():
    """Demonstrate real AI connections"""

    print("\n🔌 Demonstrating Real AI Connections\n")

    # Create connectors
    chatgpt = AIConnectorFactory.create('ChatGPT')
    claude = AIConnectorFactory.create('Claude')
    grok = AIConnectorFactory.create('Grok')

    # Try to connect
    connectors = []
    for name, connector in [('ChatGPT', chatgpt), ('Claude', claude), ('Grok', grok)]:
        if connector and await connector.connect():
            connectors.append((name, connector))

    if not connectors:
        print("\n⚠ No API keys found. To enable real connections:")
        print("   export OPENAI_API_KEY='sk-...'")
        print("   export ANTHROPIC_API_KEY='sk-ant-...'")
        print("   export XAI_API_KEY='xai-...'")
        return

    # Send test message
    test_message = "What is quantum entanglement in one sentence?"

    print(f"\n📨 Sending message to {len(connectors)} AI(s): '{test_message}'\n")

    for name, connector in connectors:
        response = await connector.send_message(test_message)
        print(f"\n{name}:")
        print(f"  {response}\n")
        print("-" * 70)


if __name__ == "__main__":
    asyncio.run(demo_real_connections())
