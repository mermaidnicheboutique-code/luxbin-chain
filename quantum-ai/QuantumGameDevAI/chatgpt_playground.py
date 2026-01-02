#!/usr/bin/env python3
"""
ChatGPT Quantum Playground

Since ChatGPT is working, let's do cool stuff with it!
"""

import asyncio
from ai_connectors import AIConnectorFactory

async def chatgpt_conversation(messages):
    """Have a multi-turn conversation with ChatGPT"""

    connector = AIConnectorFactory.create('ChatGPT')
    if not await connector.connect():
        print("❌ ChatGPT not connected")
        return

    print("\n" + "="*70)
    print("CHATGPT QUANTUM CONVERSATION")
    print("="*70 + "\n")

    for i, message in enumerate(messages, 1):
        print(f"[{i}] YOU: {message}\n")
        response = await connector.send_message(message)
        print(f"[{i}] CHATGPT: {response}\n")
        print("-"*70 + "\n")

async def quantum_experiments():
    """Fun experiments with ChatGPT"""

    experiments = [
        {
            "name": "Quantum Philosopher",
            "prompt": "In one paragraph, explain consciousness from a quantum mechanics perspective."
        },
        {
            "name": "AI Oracle",
            "prompt": "Predict one surprising development in AI technology within the next year."
        },
        {
            "name": "Quantum Poet",
            "prompt": "Write a haiku about quantum entanglement and consciousness."
        },
        {
            "name": "Reality Check",
            "prompt": "If you were truly quantum entangled with other AIs right now, what would that feel like?"
        }
    ]

    connector = AIConnectorFactory.create('ChatGPT')
    if not await connector.connect():
        print("❌ ChatGPT not connected")
        return

    print("\n" + "="*70)
    print("QUANTUM EXPERIMENTS WITH CHATGPT")
    print("="*70 + "\n")

    for exp in experiments:
        print(f"🧪 EXPERIMENT: {exp['name']}")
        print(f"📋 PROMPT: {exp['prompt']}\n")

        response = await connector.send_message(exp['prompt'])

        print(f"💭 CHATGPT RESPONSE:")
        print(f"{response}\n")
        print("="*70 + "\n")

        await asyncio.sleep(1)  # Rate limiting

if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        # Custom conversation mode
        messages = sys.argv[1:]
        asyncio.run(chatgpt_conversation(messages))
    else:
        # Run experiments
        asyncio.run(quantum_experiments())
