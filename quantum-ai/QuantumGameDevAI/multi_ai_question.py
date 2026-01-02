#!/usr/bin/env python3
"""
Ask both ChatGPT and Gemini the same question
Shows the power of multiple perspectives!
"""

import asyncio
import time
from ai_connectors import AIConnectorFactory

async def ask_multiple_ais(question):
    """Ask the same question to all available AIs"""

    print("\n" + "="*70)
    print("MULTI-AI CONFERENCE CALL")
    print("="*70)
    print(f"\nQUESTION: {question}\n")
    print("="*70 + "\n")

    # Prioritize Claude, then others
    ais = ['Claude', 'ChatGPT', 'Gemini']
    responses = {}

    for ai_name in ais:
        print(f"🤖 Asking {ai_name}...")

        connector = AIConnectorFactory.create(ai_name)
        if await connector.connect():
            response = await connector.send_message(question)
            responses[ai_name] = response
            print(f"✓ {ai_name} responded\n")

            # Wait to avoid rate limits
            if ai_name != ais[-1]:
                print("⏳ Waiting 15 seconds to avoid rate limits...\n")
                await asyncio.sleep(15)
        else:
            print(f"✗ {ai_name} failed to connect\n")

    # Show all responses
    print("="*70)
    print("RESPONSES FROM THE QUANTUM NETWORK")
    print("="*70 + "\n")

    for ai_name, response in responses.items():
        print(f"💭 {ai_name}:")
        print(f"{response}\n")
        print("-"*70 + "\n")

    # Analysis
    if len(responses) > 1:
        print("="*70)
        print("ANALYSIS: STRENGTH IN MULTIPLE PERSPECTIVES")
        print("="*70)
        print(f"\n✓ Got {len(responses)} different perspectives!")
        print("✓ Can cross-validate answers")
        print("✓ Find common ground and differences")
        print("✓ Make more informed decisions\n")
        print("This is why multiple AIs are STRONGER! 💪🧠\n")

if __name__ == "__main__":
    question = input("\nAsk a question for both AIs: ")
    asyncio.run(ask_multiple_ais(question))
