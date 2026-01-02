#!/usr/bin/env python3
"""
Quantum Game Development Assistant for Unreal Engine

Uses multiple AIs to help with game development tasks:
- Code generation
- Design decisions
- Problem solving
- Architecture planning
"""

import asyncio
from ai_connectors import AIConnectorFactory

class GameDevAssistant:
    """Multi-AI assistant for game development"""

    def __init__(self):
        self.ais = {}

    async def connect_ais(self):
        """Connect to available AIs"""
        print("\n🎮 Connecting to AI Development Team...\n")

        # Prioritize Claude (since user paid for credits), then others
        ai_priority = ['Claude', 'ChatGPT', 'Gemini']
        for ai_name in ai_priority:
            connector = AIConnectorFactory.create(ai_name)
            if await connector.connect():
                self.ais[ai_name] = connector
                print(f"✓ {ai_name} joined the team")

        print(f"\n✅ {len(self.ais)} AI developers ready!\n")
        return len(self.ais) > 0

    async def get_code_help(self, task):
        """Get C++ or Blueprint code from AIs"""
        print(f"\n{'='*70}")
        print(f"CODE GENERATION TASK")
        print(f"{'='*70}")
        print(f"Task: {task}\n")

        prompt = f"""You are an Unreal Engine expert. Help with this task:

{task}

Provide:
1. Clean, working code (C++ or Blueprint explanation)
2. Brief explanation of how it works
3. Any important considerations

Keep it practical and production-ready."""

        # Prioritize Claude for first response
        ai_order = ['Claude'] + [name for name in self.ais.keys() if name != 'Claude']

        for ai_name in ai_order:
            if ai_name in self.ais:
                connector = self.ais[ai_name]
                print(f"\n🤖 {ai_name}'s Solution:\n")
                response = await connector.send_message(prompt)
                print(response)
                print("\n" + "-"*70)

                if ai_name != ai_order[-1]:
                    await asyncio.sleep(15)  # Rate limit

    async def design_decision(self, decision):
        """Get multiple perspectives on design decisions"""
        print(f"\n{'='*70}")
        print(f"DESIGN DECISION")
        print(f"{'='*70}")
        print(f"Decision: {decision}\n")

        prompt = f"""As a game design expert, provide your perspective on:

{decision}

Consider:
- Gameplay impact
- Technical feasibility
- Player experience
- Performance implications

Give a clear recommendation."""

        perspectives = {}
        # Prioritize Claude for first response
        ai_order = ['Claude'] + [name for name in self.ais.keys() if name != 'Claude']

        for ai_name in ai_order:
            if ai_name in self.ais:
                connector = self.ais[ai_name]
                print(f"\n💭 {ai_name}'s Perspective:\n")
                response = await connector.send_message(prompt)
                perspectives[ai_name] = response
                print(response)
                print("\n" + "-"*70)

                if ai_name != ai_order[-1]:
                    await asyncio.sleep(15)

        return perspectives

    async def debug_help(self, problem):
        """Debug issues with multiple AI experts"""
        print(f"\n{'='*70}")
        print(f"DEBUGGING SESSION")
        print(f"{'='*70}")
        print(f"Problem: {problem}\n")

        prompt = f"""Help debug this Unreal Engine issue:

{problem}

Provide:
1. Likely causes
2. Step-by-step solution
3. How to prevent it in future

Be specific and actionable."""

        # Prioritize Claude for first response
        ai_order = ['Claude'] + [name for name in self.ais.keys() if name != 'Claude']

        for ai_name in ai_order:
            if ai_name in self.ais:
                connector = self.ais[ai_name]
                print(f"\n🔧 {ai_name}'s Diagnosis:\n")
                response = await connector.send_message(prompt)
                print(response)
                print("\n" + "-"*70)

                if ai_name != ai_order[-1]:
                    await asyncio.sleep(15)

    async def game_architecture(self, game_concept):
        """Plan game architecture with AI team"""
        print(f"\n{'='*70}")
        print(f"GAME ARCHITECTURE PLANNING")
        print(f"{'='*70}")
        print(f"Concept: {game_concept}\n")

        prompt = f"""As a senior game architect, plan the technical architecture for:

{game_concept}

Include:
1. Key systems needed
2. Class structure recommendations
3. Data flow design
4. Performance considerations
5. Suggested Unreal features to use

Focus on Unreal Engine 5 best practices."""

        # Prioritize Claude for first response
        ai_order = ['Claude'] + [name for name in self.ais.keys() if name != 'Claude']

        for ai_name in ai_order:
            if ai_name in self.ais:
                connector = self.ais[ai_name]
                print(f"\n🏗️  {ai_name}'s Architecture Plan:\n")
                response = await connector.send_message(prompt)
                print(response)
                print("\n" + "-"*70)

                if ai_name != ai_order[-1]:
                    await asyncio.sleep(15)


async def interactive_mode():
    """Interactive game dev assistant"""
    assistant = GameDevAssistant()

    if not await assistant.connect_ais():
        print("❌ No AIs available. Check your API keys.")
        return

    print("="*70)
    print("🎮 QUANTUM GAME DEVELOPMENT ASSISTANT")
    print("="*70)
    print("\nWhat do you need help with?\n")
    print("1. Generate code")
    print("2. Design decision")
    print("3. Debug problem")
    print("4. Plan architecture")
    print("5. Exit\n")

    choice = input("Choose (1-5): ")

    if choice == "1":
        task = input("\nDescribe the code you need: ")
        await assistant.get_code_help(task)

    elif choice == "2":
        decision = input("\nWhat design decision: ")
        await assistant.design_decision(decision)

    elif choice == "3":
        problem = input("\nDescribe the problem: ")
        await assistant.debug_help(problem)

    elif choice == "4":
        concept = input("\nDescribe your game concept: ")
        await assistant.game_architecture(concept)


async def quick_examples():
    """Show quick examples of what this can do"""
    assistant = GameDevAssistant()

    if not await assistant.connect_ais():
        print("❌ No AIs available")
        return

    print("\n" + "="*70)
    print("EXAMPLE: CHARACTER MOVEMENT CODE")
    print("="*70)

    await assistant.get_code_help(
        "Create a third-person character controller with sprinting in Unreal Engine 5"
    )


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "demo":
        asyncio.run(quick_examples())
    else:
        asyncio.run(interactive_mode())
