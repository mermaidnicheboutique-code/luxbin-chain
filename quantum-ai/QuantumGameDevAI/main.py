#!/usr/bin/env python3
"""
Quantum Game Dev AI - Main Application

A unified CLI interface for all AI-assisted game development tools.

Usage:
    python main.py                    # Interactive mode
    python main.py automation         # Launch game automation
    python main.py assistant          # Launch game dev assistant
    python main.py multi-ai           # Launch multi-AI question tool
    python main.py api-settings       # Configure API keys
    python main.py docs               # View documentation
"""

import asyncio
import os
import sys
from ai_connectors import AIConnectorFactory

def print_header():
    print("\n" + "="*70)
    print("🎮 QUANTUM GAME DEV AI - MAIN APPLICATION")
    print("="*70)
    print("\nChoose a tool to get started:\n")

def print_menu():
    print("1. 🎯 Game Automation Tool")
    print("   - Generate code variations")
    print("   - Create test cases")
    print("   - Generate game content")
    print("   - Auto-document code")
    print("   - Batch create systems")
    print("   - Optimize performance")
    print()

    print("2. 🎮 Game Dev Assistant")
    print("   - Generate code for features")
    print("   - Get design advice")
    print("   - Debug problems")
    print("   - Plan architecture")
    print()

    print("3. 🧠 Multi-AI Question Tool")
    print("   - Ask questions to multiple AIs")
    print("   - Compare perspectives")
    print("   - Get consensus answers")
    print()

    print("4. ⚙️  API Settings")
    print("   - Configure API keys")
    print("   - Test connections")
    print()

    print("5. 📚 Documentation")
    print("   - View help and guides")
    print()

    print("0. Exit")
    print()

def handle_api_settings():
    print("\n🔑 API KEY CONFIGURATION")
    print("-" * 40)

    # Get current keys
    openai_key = os.getenv('OPENAI_API_KEY', '')
    google_key = os.getenv('GOOGLE_API_KEY', '')
    anthropic_key = os.getenv('ANTHROPIC_API_KEY', '')

    print(f"Current OpenAI Key: {'✅ Set' if openai_key else '❌ Not set'}")
    print(f"Current Google Key: {'✅ Set' if google_key else '❌ Not set'}")
    print(f"Current Anthropic Key: {'✅ Set' if anthropic_key else '❌ Not set'}")
    print()

    print("API Key Setup Instructions:")
    print("1. OpenAI (ChatGPT): https://platform.openai.com/api-keys")
    print("2. Google AI (Gemini): https://makersuite.google.com/app/apikey")
    print("3. Anthropic (Claude): https://console.anthropic.com/")
    print()

    # Check for command line args for setting keys
    if len(sys.argv) >= 3:
        key_type = sys.argv[2].lower()
        if len(sys.argv) >= 4:
            key_value = sys.argv[3]
            if key_type == "openai":
                os.environ['OPENAI_API_KEY'] = key_value
                print("✅ OpenAI key set")
            elif key_type == "google":
                os.environ['GOOGLE_API_KEY'] = key_value
                print("✅ Google key set")
            elif key_type == "anthropic":
                os.environ['ANTHROPIC_API_KEY'] = key_value
                print("✅ Anthropic key set")
            else:
                print("❌ Invalid key type. Use: openai, google, or anthropic")
        else:
            print("❌ Missing key value. Usage: python main.py api-settings <type> <key>")
    else:
        print("💡 To set a key: python main.py api-settings <openai|google|anthropic> <key>")
        print("💡 Tip: Add these to ~/.zshrc for persistence:")
        print("   export OPENAI_API_KEY='your-key'")
        print("   export GOOGLE_API_KEY='your-key'")
        print("   export ANTHROPIC_API_KEY='your-key'")

    # Test connections
    print("\n🧪 Testing API connections...")
    test_connections()

def test_connections():
    async def test_ai(ai_name):
        try:
            connector = AIConnectorFactory.create(ai_name)
            if await connector.connect():
                print(f"✅ {ai_name} connected successfully")
                return True
            else:
                print(f"❌ {ai_name} failed to connect")
                return False
        except Exception as e:
            print(f"❌ {ai_name} error: {e}")
            return False

    async def run_tests():
        ais_to_test = ['ChatGPT', 'Gemini', 'Claude']
        results = []

        for ai in ais_to_test:
            success = await test_ai(ai)
            results.append(success)
            if ai != ais_to_test[-1]:
                await asyncio.sleep(2)  # Rate limit

        connected_count = sum(results)
        print(f"\n📊 Connection Summary: {connected_count}/{len(ais_to_test)} AIs connected")

        if connected_count == 0:
            print("❌ No AIs available. Please check your API keys.")
        elif connected_count < len(ais_to_test):
            print("⚠️  Some AIs failed to connect. Check API keys or network.")

    asyncio.run(run_tests())

def show_documentation():
    print("\n📚 DOCUMENTATION")
    print("-" * 20)

    print("Available documentation files:")
    print("• START_HERE.md - Quick start guide")
    print("• README.md - Complete system documentation")
    print("• HOW_TO_MAKE_IT_REAL.md - API setup guide")
    print("• REAL_AI_INTEGRATION.md - Integration details")
    print()

    # Check for command line args
    if len(sys.argv) >= 3:
        choice = sys.argv[2].lower()
    else:
        print("Usage: python main.py docs <file>")
        print("Files: start_here, readme, howto, integration")
        print("Example: python main.py docs readme")
        return

    if choice in ['start_here', 'readme', 'howto', 'integration']:
        files = {
            'start_here': 'START_HERE.md',
            'readme': 'README.md',
            'howto': 'HOW_TO_MAKE_IT_REAL.md',
            'integration': 'REAL_AI_INTEGRATION.md'
        }

        filename = files[choice]
        if os.path.exists(filename):
            print(f"\nOpening {filename}...")
            print("-" * 50)
            with open(filename, 'r') as f:
                content = f.read()
                print(content[:2000] + "..." if len(content) > 2000 else content)
            print("-" * 50)
        else:
            print(f"❌ File {filename} not found")
    else:
        print("❌ Invalid file. Use: start_here, readme, howto, or integration")

def run_game_automation():
    print("\n🚀 Running Game Automation Demo...")
    try:
        from game_automation import demo_automation
        asyncio.run(demo_automation())
    except Exception as e:
        print(f"❌ Error running automation demo: {e}")

def run_game_dev_assistant():
    print("\n🎮 Running Game Dev Assistant Demo...")
    try:
        from game_dev_assistant import quick_examples
        asyncio.run(quick_examples())
    except Exception as e:
        print(f"❌ Error running assistant demo: {e}")

def run_multi_ai_question():
    print("\n🧠 Running Multi-AI Question Demo...")
    try:
        from multi_ai_question import ask_multiple_ais
        # Use a demo question
        asyncio.run(ask_multiple_ais("What are the best practices for implementing save/load systems in Unreal Engine 5?"))
    except Exception as e:
        print(f"❌ Error running multi-AI demo: {e}")

def main():
    # Debug: print environment variables
    print("DEBUG - Environment variables:")
    print(f"ANTHROPIC_API_KEY: {os.getenv('ANTHROPIC_API_KEY', 'NOT SET')[:20]}...")
    print(f"OPENAI_API_KEY: {os.getenv('OPENAI_API_KEY', 'NOT SET')[:20]}...")
    print(f"GOOGLE_API_KEY: {os.getenv('GOOGLE_API_KEY', 'NOT SET')[:20]}...")
    print()

    if len(sys.argv) < 2:
        print_header()
        print_menu()
        print("Usage: python main.py <command>")
        print("Commands: automation, assistant, multi-ai, api-settings, docs")
        print("\nExample: python main.py automation")
        return

    command = sys.argv[1].lower()

    if command == "automation":
        run_game_automation()
    elif command == "assistant":
        run_game_dev_assistant()
    elif command == "multi-ai":
        run_multi_ai_question()
    elif command == "api-settings":
        handle_api_settings()
    elif command == "docs":
        show_documentation()
    else:
        print("❌ Invalid command. Available commands:")
        print("  automation   - Game Automation Tool")
        print("  assistant    - Game Dev Assistant")
        print("  multi-ai     - Multi-AI Question Tool")
        print("  api-settings - API Key Configuration")
        print("  docs         - Documentation Viewer")

if __name__ == "__main__":
    main()