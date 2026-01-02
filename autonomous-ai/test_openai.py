#!/usr/bin/env python3
"""Quick test to verify OpenAI API key works"""

import os
from dotenv import load_dotenv
load_dotenv()

try:
    from openai import OpenAI
    
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    print("🧪 Testing OpenAI API connection...")
    print("")
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Say 'Hello from LUXBIN!' in exactly 5 words"}
        ],
        max_tokens=20
    )
    
    print("✅ SUCCESS! OpenAI is connected!")
    print(f"📝 Response: {response.choices[0].message.content}")
    print("")
    print("Your chatbot is now powered by ChatGPT! 🚀")
    
except ImportError:
    print("❌ OpenAI package not installed")
    print("   Run: pip3 install openai")
except Exception as e:
    print(f"❌ Error: {e}")
    print("")
    print("Check your API key at: https://platform.openai.com/api-keys")
