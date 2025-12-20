#!/usr/bin/env python3
"""
LUXBIN COPILOT - AI Coding Expert
Your personal coding assistant powered by Claude + GPT-4

Helps with:
- Writing code
- Debugging
- Code review
- Smart contracts
- Architecture decisions
- And more!

Author: Nichole Christie
License: MIT
"""

import anthropic
import openai
import asyncio
import os
import json
from pathlib import Path
from typing import Dict, List, Optional
import subprocess


class LuxbinCopilot:
    """AI-powered coding copilot for LUXBIN development"""

    def __init__(self):
        # Load API keys from environment
        from config import ANTHROPIC_API_KEY, OPENAI_API_KEY, check_api_keys

        if not check_api_keys():
            raise ValueError("API keys not configured. See .env.example")

        self.claude = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        openai.api_key = OPENAI_API_KEY

        # Project paths
        self.project_root = Path("/Users/nicholechristie/luxbin-chain")
        self.python_dir = self.project_root / "python-implementation"
        self.contracts_dir = self.project_root / "contracts"

        # Conversation history
        self.conversation = []

        print("╔════════════════════════════════════════════════════════════╗")
        print("║                                                            ║")
        print("║  💻 LUXBIN COPILOT - AI Coding Expert 💻                  ║")
        print("║                                                            ║")
        print("║  Your personal coding assistant for:                      ║")
        print("║  • Python development                                     ║")
        print("║  • Solidity smart contracts                               ║")
        print("║  • Code review & debugging                                ║")
        print("║  • Architecture & design                                  ║")
        print("║  • LUXBIN project expertise                               ║")
        print("║                                                            ║")
        print("╚════════════════════════════════════════════════════════════╝\n")

        print(f"📂 Project root: {self.project_root}")
        print(f"🐍 Python dir: {self.python_dir}")
        print(f"📜 Contracts dir: {self.contracts_dir}\n")

    async def chat(self, message: str, use_gpt: bool = False) -> str:
        """Chat with the copilot

        Args:
            message: User's message
            use_gpt: Use GPT-4 instead of Claude

        Returns:
            AI response
        """
        # Add message to history
        self.conversation.append({
            "role": "user",
            "content": message
        })

        # System prompt for coding
        system_prompt = """You are LUXBIN Copilot, an expert AI coding assistant.

You specialize in:
- Python (async, web3, blockchain)
- Solidity (smart contracts, security)
- Blockchain development
- System architecture
- Code review and debugging
- The LUXBIN immune system project

You provide:
- Clear, working code examples
- Security-focused solutions
- Best practices
- Detailed explanations
- Multiple approaches when relevant

Be concise but thorough. Give actual code, not just descriptions."""

        try:
            if use_gpt:
                response = await asyncio.to_thread(
                    openai.chat.completions.create,
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        *self.conversation
                    ],
                    max_tokens=4096
                )
                reply = response.choices[0].message.content
            else:
                # Use Claude (better for coding)
                response = await asyncio.to_thread(
                    self.claude.messages.create,
                    model="claude-sonnet-4-5-20250929",
                    max_tokens=4096,
                    system=system_prompt,
                    messages=self.conversation
                )
                reply = response.content[0].text

            # Add to history
            self.conversation.append({
                "role": "assistant",
                "content": reply
            })

            return reply

        except Exception as e:
            return f"Error: {e}"

    async def read_file(self, filepath: str) -> str:
        """Read a file from the project"""
        try:
            full_path = self.project_root / filepath
            if not full_path.exists():
                return f"File not found: {filepath}"

            with open(full_path, 'r') as f:
                content = f.read()

            return content
        except Exception as e:
            return f"Error reading file: {e}"

    async def write_file(self, filepath: str, content: str) -> str:
        """Write content to a file"""
        try:
            full_path = self.project_root / filepath
            full_path.parent.mkdir(parents=True, exist_ok=True)

            with open(full_path, 'w') as f:
                f.write(content)

            return f"✅ Written to {filepath}"
        except Exception as e:
            return f"Error writing file: {e}"

    async def list_files(self, directory: str = "") -> List[str]:
        """List files in a directory"""
        try:
            target_dir = self.project_root / directory if directory else self.project_root
            files = []

            for item in target_dir.iterdir():
                if item.is_file():
                    files.append(str(item.relative_to(self.project_root)))
                elif item.is_dir() and not item.name.startswith('.'):
                    files.append(f"{item.relative_to(self.project_root)}/")

            return sorted(files)
        except Exception as e:
            return [f"Error: {e}"]

    async def review_code(self, filepath: str) -> str:
        """Get AI code review of a file"""
        content = await self.read_file(filepath)

        if "Error" in content or "not found" in content:
            return content

        prompt = f"""Review this code from {filepath}:

```
{content}
```

Provide:
1. Overall quality rating (1-10)
2. Security issues (if any)
3. Performance improvements
4. Best practice violations
5. Suggestions for improvement

Be specific and actionable."""

        return await self.chat(prompt)

    async def explain_code(self, filepath: str) -> str:
        """Get detailed explanation of code"""
        content = await self.read_file(filepath)

        if "Error" in content or "not found" in content:
            return content

        prompt = f"""Explain this code in detail:

File: {filepath}

```
{content}
```

Explain:
- What it does
- How it works
- Key concepts
- Dependencies
- How it fits in the LUXBIN project"""

        return await self.chat(prompt)

    async def debug_help(self, error_message: str, filepath: str = None) -> str:
        """Get help debugging an error"""
        context = ""
        if filepath:
            content = await self.read_file(filepath)
            context = f"\n\nCode from {filepath}:\n```\n{content}\n```"

        prompt = f"""Help me debug this error:

Error: {error_message}{context}

Provide:
1. What's causing the error
2. How to fix it
3. Code example of the fix
4. How to prevent it in future"""

        return await self.chat(prompt)

    async def write_code(self, description: str, language: str = "python") -> str:
        """Generate code based on description"""
        prompt = f"""Write {language} code for:

{description}

Requirements:
- Working, production-ready code
- Proper error handling
- Comments for complex parts
- Follows LUXBIN project style
- Security best practices

Provide complete, runnable code."""

        return await self.chat(prompt)

    async def improve_code(self, code: str) -> str:
        """Get suggestions to improve code"""
        prompt = f"""Improve this code:

```
{code}
```

Provide:
1. Refactored version
2. What was improved
3. Why it's better
4. Performance impact"""

        return await self.chat(prompt)

    async def interactive_mode(self):
        """Interactive copilot mode"""

        print("💻 LUXBIN Copilot - Interactive Mode\n")
        print("Commands:")
        print("  • Chat naturally for coding help")
        print("  • 'read <file>' - Read a file")
        print("  • 'write <file>' - Write a file (will prompt for content)")
        print("  • 'review <file>' - Get code review")
        print("  • 'explain <file>' - Explain code")
        print("  • 'debug <error>' - Help with debugging")
        print("  • 'write code <description>' - Generate code")
        print("  • 'improve <code>' - Improve code snippet")
        print("  • 'list [dir]' - List files")
        print("  • 'clear' - Clear conversation history")
        print("  • 'exit' - Quit")
        print()

        while True:
            try:
                user_input = input("You: ").strip()

                if not user_input:
                    continue

                if user_input.lower() == 'exit':
                    print("\n👋 LUXBIN Copilot signing off. Happy coding!")
                    break

                elif user_input.lower() == 'clear':
                    self.conversation = []
                    print("✅ Conversation history cleared\n")

                elif user_input.lower().startswith('read '):
                    filepath = user_input[5:].strip()
                    content = await self.read_file(filepath)
                    print(f"\n📄 {filepath}:\n")
                    print(content[:500] + "..." if len(content) > 500 else content)
                    print()

                elif user_input.lower().startswith('write '):
                    filepath = user_input[6:].strip()
                    print(f"\nEnter content for {filepath} (Ctrl+D when done):")
                    lines = []
                    try:
                        while True:
                            line = input()
                            lines.append(line)
                    except EOFError:
                        pass
                    content = '\n'.join(lines)
                    result = await self.write_file(filepath, content)
                    print(f"\n{result}\n")

                elif user_input.lower().startswith('review '):
                    filepath = user_input[7:].strip()
                    print(f"\n🔍 Reviewing {filepath}...\n")
                    review = await self.review_code(filepath)
                    print(f"Copilot:\n{review}\n")

                elif user_input.lower().startswith('explain '):
                    filepath = user_input[8:].strip()
                    print(f"\n📚 Explaining {filepath}...\n")
                    explanation = await self.explain_code(filepath)
                    print(f"Copilot:\n{explanation}\n")

                elif user_input.lower().startswith('debug '):
                    error = user_input[6:].strip()
                    print(f"\n🐛 Debugging...\n")
                    help_text = await self.debug_help(error)
                    print(f"Copilot:\n{help_text}\n")

                elif user_input.lower().startswith('write code '):
                    description = user_input[11:].strip()
                    print(f"\n✍️  Writing code...\n")
                    code = await self.write_code(description)
                    print(f"Copilot:\n{code}\n")

                elif user_input.lower().startswith('improve '):
                    code_snippet = user_input[8:].strip()
                    print(f"\n⚡ Improving code...\n")
                    improvements = await self.improve_code(code_snippet)
                    print(f"Copilot:\n{improvements}\n")

                elif user_input.lower().startswith('list'):
                    parts = user_input.split(maxsplit=1)
                    directory = parts[1] if len(parts) > 1 else ""
                    files = await self.list_files(directory)
                    print(f"\n📁 Files in {directory or 'project root'}:")
                    for f in files[:30]:  # Limit to 30
                        print(f"   {f}")
                    if len(files) > 30:
                        print(f"   ... and {len(files) - 30} more")
                    print()

                else:
                    # General coding question
                    print(f"\n💻 Copilot:\n")
                    response = await self.chat(user_input)
                    print(response)
                    print()

            except KeyboardInterrupt:
                print("\n\n👋 Interrupted. Goodbye!")
                break
            except Exception as e:
                print(f"\n❌ Error: {e}\n")


async def main():
    """Main entry point"""

    copilot = LuxbinCopilot()

    print("Welcome to LUXBIN Copilot!\n")
    print("I can help you with:")
    print("  • Writing Python and Solidity code")
    print("  • Debugging issues")
    print("  • Reviewing your code")
    print("  • Explaining complex code")
    print("  • Architecture decisions")
    print("  • LUXBIN project development")
    print()

    # Quick examples
    print("Quick examples:")
    print("  'How do I deploy a smart contract?'")
    print("  'review python-implementation/organism_builder.py'")
    print("  'write code Create a function to validate Ethereum addresses'")
    print("  'debug NameError: name config_env is not defined'")
    print()

    await copilot.interactive_mode()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n👋 LUXBIN Copilot signing off!")
