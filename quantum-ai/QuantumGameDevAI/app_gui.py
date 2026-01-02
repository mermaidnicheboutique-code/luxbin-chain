#!/usr/bin/env python3
"""
Quantum Game Dev AI - GUI Application

A graphical interface for AI-assisted game development.
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import asyncio
import threading
import os
import sys

# Import our modules
from ai_connectors import AIConnectorFactory
from game_automation import GameAutomation
from game_dev_assistant import GameDevAssistant

class QuantumGameDevApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🎮 Quantum Game Dev AI")
        self.root.geometry("900x700")
        self.root.configure(bg='#2b2b2b')

        # Set up API keys
        self.setup_api_keys()

        # Create GUI
        self.create_gui()

        # Initialize AI systems
        self.automation = GameAutomation()
        self.assistant = GameDevAssistant()

    def setup_api_keys(self):
        """Set up API keys from environment variables"""
        from dotenv import load_dotenv
        load_dotenv()
        # Keys should be set in .env file or environment variables
        required_keys = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'GOOGLE_API_KEY']
        for key in required_keys:
            if not os.getenv(key):
                raise ValueError(f"{key} not set. Please add it to a .env file or set as environment variable.")

    def create_gui(self):
        """Create the graphical user interface"""
        # Title
        title_label = tk.Label(self.root, text="🎮 Quantum Game Dev AI",
                             font=("Arial", 20, "bold"), bg='#2b2b2b', fg='white')
        title_label.pack(pady=10)

        # Subtitle
        subtitle_label = tk.Label(self.root, text="AI-Powered Game Development Assistant",
                                font=("Arial", 12), bg='#2b2b2b', fg='#cccccc')
        subtitle_label.pack(pady=5)

        # Main frame
        main_frame = tk.Frame(self.root, bg='#2b2b2b')
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)

        # Button frame
        button_frame = tk.Frame(main_frame, bg='#2b2b2b')
        button_frame.pack(fill=tk.X, pady=10)

        # Buttons
        buttons = [
            ("🎯 Game Automation", self.run_automation),
            ("🎮 Game Dev Assistant", self.run_assistant),
            ("🧠 Multi-AI Questions", self.run_multi_ai),
            ("⚙️ API Settings", self.show_api_settings),
            ("📚 Documentation", self.show_docs)
        ]

        for i, (text, command) in enumerate(buttons):
            btn = tk.Button(button_frame, text=text, command=command,
                          font=("Arial", 11, "bold"), bg='#4a4a4a', fg='white',
                          activebackground='#666666', activeforeground='white',
                          relief=tk.RAISED, bd=3, padx=20, pady=10)
            btn.grid(row=0, column=i, padx=5, pady=5, sticky='ew')

            # Bind hover effects
            btn.bind("<Enter>", lambda e, b=btn: b.configure(bg='#666666'))
            btn.bind("<Leave>", lambda e, b=btn: b.configure(bg='#4a4a4a'))

        # Make buttons expand equally
        for i in range(len(buttons)):
            button_frame.grid_columnconfigure(i, weight=1)

        # Output frame
        output_frame = tk.LabelFrame(main_frame, text="Output", bg='#2b2b2b', fg='white',
                                   font=("Arial", 12, "bold"))
        output_frame.pack(fill=tk.BOTH, expand=True, pady=10)

        # Output text area
        self.output_text = scrolledtext.ScrolledText(output_frame, wrap=tk.WORD,
                                                   bg='#1e1e1e', fg='white',
                                                   font=("Consolas", 10))
        self.output_text.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        # Status bar
        self.status_label = tk.Label(self.root, text="Ready", bg='#2b2b2b', fg='#cccccc',
                                   font=("Arial", 9))
        self.status_label.pack(fill=tk.X, side=tk.BOTTOM, padx=10, pady=5)

    def update_status(self, message):
        """Update status bar"""
        self.status_label.config(text=message)
        self.root.update()

    def clear_output(self):
        """Clear output text"""
        self.output_text.delete(1.0, tk.END)

    def append_output(self, text):
        """Append text to output"""
        self.output_text.insert(tk.END, text + "\n")
        self.output_text.see(tk.END)
        self.root.update()

    def run_in_thread(self, func):
        """Run function in separate thread to avoid blocking GUI"""
        def wrapper():
            try:
                result = asyncio.run(func())
                return result
            except Exception as e:
                self.append_output(f"❌ Error: {e}")
                return None

        thread = threading.Thread(target=wrapper)
        thread.daemon = True
        thread.start()

    def run_automation(self):
        """Run game automation demo"""
        self.clear_output()
        self.update_status("Running Game Automation...")
        self.append_output("🚀 Starting Game Automation Demo...\n")

        async def automation_demo():
            self.append_output("🤖 Initializing AI systems...")
            await self.automation.connect_ais()
            self.append_output("✅ AI systems ready!\n")

            self.append_output("📌 Example 1: Generating weapon variations")
            await self.automation.generate_similar_code(
                """class Sword:
    damage = 25
    attack_speed = 1.5
    range = 2.0
    weapon_type = "melee"
    special_ability = "Slash\"""",
                ["Axe", "Dagger", "Hammer"]
            )

            self.append_output("\n📌 Example 2: Generating game content")
            await self.automation.generate_game_content(
                "fantasy weapons",
                3,
                "medieval dark fantasy"
            )

            self.update_status("Game Automation Complete!")

        self.run_in_thread(automation_demo)

    def run_assistant(self):
        """Run game dev assistant demo"""
        self.clear_output()
        self.update_status("Running Game Dev Assistant...")
        self.append_output("🎮 Starting Game Dev Assistant Demo...\n")

        async def assistant_demo():
            self.append_output("🤖 Initializing AI development team...")
            await self.assistant.connect_ais()
            self.append_output("✅ AI team assembled!\n")

            self.append_output("💻 Generating character controller code...")
            await self.assistant.get_code_help(
                "Create a third-person character controller with sprinting in Unreal Engine 5"
            )

            self.update_status("Game Dev Assistant Complete!")

        self.run_in_thread(assistant_demo)

    def run_multi_ai(self):
        """Run multi-AI question demo"""
        self.clear_output()
        self.update_status("Running Multi-AI Questions...")
        self.append_output("🧠 Starting Multi-AI Conference...\n")

        async def multi_ai_demo():
            # Import here to avoid circular imports
            from multi_ai_question import ask_multiple_ais

            await ask_multiple_ais(
                "What are the best practices for implementing save/load systems in Unreal Engine 5?"
            )

            self.update_status("Multi-AI Questions Complete!")

        self.run_in_thread(multi_ai_demo)

    def show_api_settings(self):
        """Show API settings window"""
        settings_window = tk.Toplevel(self.root)
        settings_window.title("API Settings")
        settings_window.geometry("500x400")
        settings_window.configure(bg='#2b2b2b')

        # Title
        title_label = tk.Label(settings_window, text="🔑 API Key Configuration",
                             font=("Arial", 16, "bold"), bg='#2b2b2b', fg='white')
        title_label.pack(pady=10)

        # API key entries
        api_frame = tk.Frame(settings_window, bg='#2b2b2b')
        api_frame.pack(fill=tk.X, padx=20)

        apis = [
            ("Anthropic (Claude)", "ANTHROPIC_API_KEY"),
            ("OpenAI (ChatGPT)", "OPENAI_API_KEY"),
            ("Google (Gemini)", "GOOGLE_API_KEY")
        ]

        self.api_entries = {}
        for name, env_var in apis:
            frame = tk.Frame(api_frame, bg='#2b2b2b')
            frame.pack(fill=tk.X, pady=5)

            label = tk.Label(frame, text=f"{name}:", bg='#2b2b2b', fg='white',
                           font=("Arial", 10, "bold"), width=15, anchor='w')
            label.pack(side=tk.LEFT)

            entry = tk.Entry(frame, bg='#1e1e1e', fg='white', insertbackground='white',
                           font=("Arial", 10), show="*")
            entry.insert(0, os.getenv(env_var, ""))
            entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(10, 0))
            self.api_entries[env_var] = entry

        # Buttons
        button_frame = tk.Frame(settings_window, bg='#2b2b2b')
        button_frame.pack(fill=tk.X, padx=20, pady=20)

        save_btn = tk.Button(button_frame, text="💾 Save Keys",
                           command=lambda: self.save_api_keys(settings_window),
                           bg='#4a4a4a', fg='white', font=("Arial", 11, "bold"))
        save_btn.pack(side=tk.LEFT, padx=5)

        test_btn = tk.Button(button_frame, text="🧪 Test Connections",
                           command=self.test_api_connections,
                           bg='#4a4a4a', fg='white', font=("Arial", 11, "bold"))
        test_btn.pack(side=tk.LEFT, padx=5)

        close_btn = tk.Button(button_frame, text="❌ Close",
                            command=settings_window.destroy,
                            bg='#4a4a4a', fg='white', font=("Arial", 11, "bold"))
        close_btn.pack(side=tk.RIGHT, padx=5)

    def save_api_keys(self, window):
        """Save API keys to environment"""
        for env_var, entry in self.api_entries.items():
            key_value = entry.get().strip()
            if key_value:
                os.environ[env_var] = key_value

        messagebox.showinfo("Success", "API keys saved! Please restart the app for changes to take effect.")
        window.destroy()

    def test_api_connections(self):
        """Test API connections"""
        self.clear_output()
        self.update_status("Testing API connections...")

        async def test_connections():
            self.append_output("🧪 Testing API connections...\n")

            # Test each AI
            test_results = {}
            ais_to_test = ['Claude', 'ChatGPT', 'Gemini']

            for ai_name in ais_to_test:
                try:
                    connector = AIConnectorFactory.create(ai_name)
                    if await connector.connect():
                        test_results[ai_name] = True
                        self.append_output(f"✅ {ai_name} connected successfully")
                    else:
                        test_results[ai_name] = False
                        self.append_output(f"❌ {ai_name} failed to connect")
                except Exception as e:
                    test_results[ai_name] = False
                    self.append_output(f"❌ {ai_name} error: {e}")

            connected_count = sum(test_results.values())
            self.append_output(f"\n📊 Summary: {connected_count}/{len(ais_to_test)} AIs connected")

            if connected_count == len(ais_to_test):
                self.append_output("🎉 All AI systems operational!")
            elif connected_count > 0:
                self.append_output("⚠️ Some AIs connected, others failed")
            else:
                self.append_output("❌ No AI connections successful")

            self.update_status("API Testing Complete!")

        self.run_in_thread(test_connections)

    def show_docs(self):
        """Show documentation"""
        self.clear_output()
        self.update_status("Loading documentation...")

        docs_text = """
📚 QUANTUM GAME DEV AI - DOCUMENTATION

🎯 GAME AUTOMATION TOOL
- Generate code variations (weapons, enemies, items)
- Create game content (quests, dialogue, descriptions)
- Auto-generate test cases
- Create documentation
- Batch create game systems

🎮 GAME DEV ASSISTANT
- Generate Unreal Engine C++/Blueprint code
- Provide design decision perspectives
- Debug problems with multiple AI experts
- Plan game architecture

🧠 MULTI-AI QUESTIONS
- Ask same question to Claude + ChatGPT + Gemini
- Compare different approaches
- Get consensus on decisions
- Multiple expert perspectives

⚙️ API SETTINGS
- Configure Anthropic, OpenAI, and Google API keys
- Test connections to all AI services
- Save keys for future sessions

🚀 QUICK START:
1. Click "API Settings" to configure your keys
2. Click "🧪 Test Connections" to verify setup
3. Try "🎯 Game Automation" to generate content
4. Use "🎮 Game Dev Assistant" for code help
5. Ask "🧠 Multi-AI Questions" for expert opinions

💡 TIPS:
- Claude (Anthropic) is prioritized for your paid credits
- All generated code is ready to copy into Unreal Engine
- Use automation for repetitive game development tasks
- Multi-AI questions give you balanced perspectives

🎮 HAPPY GAME DEVELOPING!
        """

        self.append_output(docs_text)
        self.update_status("Documentation loaded!")

def main():
    root = tk.Tk()
    app = QuantumGameDevApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()