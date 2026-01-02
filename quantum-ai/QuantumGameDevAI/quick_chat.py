#!/usr/bin/env python3
"""Quick chat between multiple real AIs"""

import asyncio
import os
from ai_connectors import AIConnectorFactory

async def multi_ai_chat(question):
    """Have all connected AIs discuss a question"""

    print(f"\n{'='*70}")
    print(f"QUESTION: {question}")
    print('='*70 + "\n")

    # Try to connect to all AIs
    ai_names = ['ChatGPT', 'Claude', 'Gemini', 'Grok']
    responses = {}

    for ai_name in ai_names:
        connector = AIConnectorFactory.create(ai_name)
        if connector and await connector.connect():
            print(f"🤖 {ai_name} is thinking...")
            response = await connector.send_message(question)
            responses[ai_name] = response
            print(f"✓ {ai_name} responded\n")

    # Show all responses
    print('='*70)
    print('RESPONSES')
    print('='*70 + "\n")

    for ai_name, response in responses.items():
        print(f"💭 {ai_name}:")
        print(f"{response}\n")
        print('-'*70 + "\n")

    print(f"✨ {len(responses)} AIs participated in the conversation!\n")

if __name__ == "__main__":
    question = input("\nAsk a question for the AI network: ")
    asyncio.run(multi_ai_chat(question))
