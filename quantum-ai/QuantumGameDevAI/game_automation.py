#!/usr/bin/env python3
"""
Game Development Automation System

Uses multiple AIs to automate repetitive game development tasks:
- Generate boilerplate code
- Create similar systems
- Generate test cases
- Create documentation
- Generate content (dialogue, items, etc.)
"""

import asyncio
from ai_connectors import AIConnectorFactory
import os

class GameAutomation:
    """Automates repetitive game development tasks"""

    def __init__(self):
        self.ais = {}

    async def connect_ais(self):
        """Connect to AI team"""
        print("\n🤖 Initializing Automation System...\n")
        # Prioritize Claude (since user paid for credits), then others
        ai_priority = ['Claude', 'ChatGPT', 'Gemini']
        for ai_name in ai_priority:
            connector = AIConnectorFactory.create(ai_name)
            if await connector.connect():
                self.ais[ai_name] = connector
                print(f"✅ {ai_name} ready for automation!")
        return len(self.ais) > 0

    async def generate_similar_code(self, example_code, variations):
        """
        Generate multiple similar systems from one example.

        Example: You have a "Sword" weapon, generate "Axe", "Bow", "Staff"
        """
        print(f"\n{'='*70}")
        print("AUTOMATED CODE GENERATION")
        print(f"{'='*70}\n")

        prompt = f"""Given this example code:

{example_code}

Generate {len(variations)} similar variations for: {', '.join(variations)}

For each variation:
1. Keep the same structure
2. Adjust names and values appropriately
3. Include any unique properties

Format each as a complete, ready-to-use class/blueprint."""

        results = {}

        # Prioritize Claude (since user paid for credits), then ChatGPT, then others
        priority_order = ['Claude', 'ChatGPT', 'Gemini']
        ai_name = None
        for preferred_ai in priority_order:
            if preferred_ai in self.ais:
                ai_name = preferred_ai
                break
        if not ai_name:  # fallback to first available
            ai_name = list(self.ais.keys())[0]
        connector = self.ais[ai_name]

        print(f"🤖 {ai_name} generating {len(variations)} variations...\n")
        response = await connector.send_message(prompt)

        print(response)
        print("\n" + "="*70 + "\n")

        return response

    async def generate_test_cases(self, system_description):
        """
        Automatically generate test cases for a system.
        """
        print(f"\n{'='*70}")
        print("AUTOMATED TEST GENERATION")
        print(f"{'='*70}\n")

        prompt = f"""Generate comprehensive test cases for this game system:

{system_description}

Include:
1. Unit tests (individual functions)
2. Integration tests (system interactions)
3. Edge cases
4. Performance tests
5. Multiplayer tests (if applicable)

Provide test descriptions and expected results."""

        # Prioritize Claude (since user paid for credits), then ChatGPT, then others
        priority_order = ['Claude', 'ChatGPT', 'Gemini']
        ai_name = None
        for preferred_ai in priority_order:
            if preferred_ai in self.ais:
                ai_name = preferred_ai
                break
        if not ai_name:  # fallback to first available
            ai_name = list(self.ais.keys())[0]
        connector = self.ais[ai_name]

        print(f"🧪 {ai_name} generating test suite...\n")
        response = await connector.send_message(prompt)

        print(response)
        print("\n" + "="*70 + "\n")

        return response

    async def generate_game_content(self, content_type, count, theme):
        """
        Generate game content (items, quests, dialogue, etc.)

        Examples:
        - 50 weapon names and descriptions
        - 20 quest descriptions
        - NPC dialogue trees
        """
        print(f"\n{'='*70}")
        print("AUTOMATED CONTENT GENERATION")
        print(f"{'='*70}\n")

        prompt = f"""Generate {count} {content_type} for a game with theme: {theme}

For each item provide:
1. Name
2. Description (2-3 sentences)
3. Key properties/stats
4. Rarity/tier if applicable

Format as a structured list, ready to import into a game database."""

        # Prioritize Claude (since user paid for credits), then ChatGPT, then others
        priority_order = ['Claude', 'ChatGPT', 'Gemini']
        ai_name = None
        for preferred_ai in priority_order:
            if preferred_ai in self.ais:
                ai_name = preferred_ai
                break
        if not ai_name:  # fallback to first available
            ai_name = list(self.ais.keys())[0]
        connector = self.ais[ai_name]

        print(f"📝 {ai_name} generating {count} {content_type}...\n")
        response = await connector.send_message(prompt)

        print(response)
        print("\n" + "="*70 + "\n")

        return response

    async def generate_documentation(self, code):
        """
        Automatically generate documentation for code.
        """
        print(f"\n{'='*70}")
        print("AUTOMATED DOCUMENTATION")
        print(f"{'='*70}\n")

        prompt = f"""Generate comprehensive documentation for this code:

{code}

Include:
1. Overview/purpose
2. How to use it
3. Parameter descriptions
4. Return values
5. Usage examples
6. Common pitfalls

Use markdown format."""

        # Prioritize Claude (since user paid for credits), then ChatGPT, then others
        priority_order = ['Claude', 'ChatGPT', 'Gemini']
        ai_name = None
        for preferred_ai in priority_order:
            if preferred_ai in self.ais:
                ai_name = preferred_ai
                break
        if not ai_name:  # fallback to first available
            ai_name = list(self.ais.keys())[0]
        connector = self.ais[ai_name]

        print(f"📚 {ai_name} generating documentation...\n")
        response = await connector.send_message(prompt)

        print(response)
        print("\n" + "="*70 + "\n")

        return response

    async def batch_create_systems(self, system_list):
        """
        Create multiple similar systems at once.

        Example: Create 10 different enemy AI behaviors
        """
        print(f"\n{'='*70}")
        print(f"BATCH SYSTEM CREATION: {len(system_list)} systems")
        print(f"{'='*70}\n")

        prompt = f"""Create {len(system_list)} game systems for Unreal Engine:

Systems needed:
{chr(10).join(f'{i+1}. {system}' for i, system in enumerate(system_list))}

For each system provide:
1. Core functionality code
2. Key variables/properties
3. Usage notes

Keep each system concise but complete."""

        # Prioritize Claude (since user paid for credits), then ChatGPT, then others
        priority_order = ['Claude', 'ChatGPT', 'Gemini']
        ai_name = None
        for preferred_ai in priority_order:
            if preferred_ai in self.ais:
                ai_name = preferred_ai
                break
        if not ai_name:  # fallback to first available
            ai_name = list(self.ais.keys())[0]
        connector = self.ais[ai_name]

        print(f"⚙️  {ai_name} creating {len(system_list)} systems...\n")
        response = await connector.send_message(prompt)

        print(response)
        print("\n" + "="*70 + "\n")

        return response

    async def optimize_code(self, code):
        """
        Automatically optimize code for performance.
        """
        print(f"\n{'='*70}")
        print("AUTOMATED CODE OPTIMIZATION")
        print(f"{'='*70}\n")

        prompt = f"""Optimize this Unreal Engine code for better performance:

{code}

Provide:
1. Optimized version
2. What was changed and why
3. Performance impact explanation
4. Any trade-offs

Focus on Unreal Engine best practices."""

        # Prioritize Claude (since user paid for credits), then ChatGPT, then others
        priority_order = ['Claude', 'ChatGPT', 'Gemini']
        ai_name = None
        for preferred_ai in priority_order:
            if preferred_ai in self.ais:
                ai_name = preferred_ai
                break
        if not ai_name:  # fallback to first available
            ai_name = list(self.ais.keys())[0]
        connector = self.ais[ai_name]

        print(f"⚡ {ai_name} optimizing code...\n")
        response = await connector.send_message(prompt)

        print(response)
        print("\n" + "="*70 + "\n")

        return response


async def demo_automation():
    """Demonstrate automation capabilities"""

    automation = GameAutomation()

    if not await automation.connect_ais():
        print("❌ No AIs available")
        return

    print("\n" + "="*70)
    print("🎮 GAME DEVELOPMENT AUTOMATION DEMO")
    print("="*70)

    # Example 1: Generate similar weapon classes
    print("\n📌 EXAMPLE 1: Auto-generate weapon variations\n")

    example_weapon = """
class Sword:
    damage = 25
    attack_speed = 1.5
    range = 2.0
    weapon_type = "melee"
    special_ability = "Slash"
"""

    await automation.generate_similar_code(
        example_weapon,
        ["Axe", "Dagger", "Hammer"]
    )

    await asyncio.sleep(20)  # Rate limiting

    # Example 2: Generate game content
    print("\n📌 EXAMPLE 2: Auto-generate game items\n")

    await automation.generate_game_content(
        content_type="fantasy weapons",
        count=5,
        theme="medieval dark fantasy"
    )


async def interactive_automation():
    """Interactive automation menu"""

    automation = GameAutomation()

    if not await automation.connect_ais():
        print("❌ No AIs available")
        return

    print("\n" + "="*70)
    print("🤖 GAME AUTOMATION SYSTEM")
    print("="*70)
    print("\nWhat do you want to automate?\n")
    print("1. Generate similar code (e.g., multiple weapons)")
    print("2. Generate test cases")
    print("3. Generate game content (items, quests, etc.)")
    print("4. Generate documentation")
    print("5. Batch create systems")
    print("6. Optimize code")
    print("7. Run demo")
    print("8. Exit\n")

    choice = input("Choose (1-8): ")

    if choice == "1":
        example = input("\nPaste example code: ")
        variations = input("What variations? (comma separated): ").split(",")
        await automation.generate_similar_code(example, [v.strip() for v in variations])

    elif choice == "2":
        description = input("\nDescribe the system to test: ")
        await automation.generate_test_cases(description)

    elif choice == "3":
        content_type = input("\nContent type (e.g., 'weapons', 'quests'): ")
        count = int(input("How many: "))
        theme = input("Game theme: ")
        await automation.generate_game_content(content_type, count, theme)

    elif choice == "4":
        code = input("\nPaste code to document: ")
        await automation.generate_documentation(code)

    elif choice == "5":
        systems = input("\nList systems (comma separated): ").split(",")
        await automation.batch_create_systems([s.strip() for s in systems])

    elif choice == "6":
        code = input("\nPaste code to optimize: ")
        await automation.optimize_code(code)

    elif choice == "7":
        await demo_automation()


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "demo":
        asyncio.run(demo_automation())
    else:
        asyncio.run(interactive_automation())
