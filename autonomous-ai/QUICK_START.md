# ⚡ Quick Start - Smart Chatbot in 3 Minutes

Make your chatbot as smart as ChatGPT in 3 easy steps!

## Step 1: Get a FREE API Key (2 minutes)

### Option A: Google Gemini (100% FREE!) ⭐ Recommended

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Get API Key" → "Create API key"
3. Copy your key

### Option B: Claude ($5 free credits)

1. Go to: https://console.anthropic.com/
2. Sign up → Get $5 free credits
3. Create API key → Copy it

## Step 2: Add Your Key (30 seconds)

```bash
cd ~/Desktop/luxbin_chain/autonomous-ai

# Create .env file with your key
echo 'GOOGLE_API_KEY=your-key-here' > .env

# OR if using Claude:
# echo 'ANTHROPIC_API_KEY=sk-ant-your-key-here' > .env

# OR if using ChatGPT:
# echo 'OPENAI_API_KEY=sk-your-key-here' > .env
```

## Step 3: Start Chatbot (30 seconds)

### Terminal 1 - Backend:
```bash
cd ~/Desktop/luxbin_chain/autonomous-ai

# Install dependencies (first time only)
pip3 install flask flask-cors openai anthropic python-dotenv pillow matplotlib numpy

# Start server
python3 chatbot_api_server.py
```

### Terminal 2 - Frontend:
```bash
cd ~/Desktop/luxbin_chain/luxbin-app
npm run dev
```

### Open: http://localhost:3000

## ✅ Test It!

Click the chat button and ask:

**General Knowledge:**
- "Explain quantum physics simply"
- "Write me a poem about the ocean"
- "What's the meaning of life?"

**Programming:**
- "Help me debug this Python code"
- "Explain async/await in JavaScript"
- "How do I optimize this SQL query?"

**Creative:**
- "Write a short story about a robot"
- "Give me 10 startup ideas"
- "Help me brainstorm marketing slogans"

**Blockchain (still works!):**
- "How do I buy LUX tokens?"
- "Explain proof of stake"
- "Check my wallet balance"

## 🎉 You're Done!

Your chatbot is now:
- ✅ As smart as ChatGPT
- ✅ Has emotional understanding
- ✅ Shows animated avatar
- ✅ Can discuss ANY topic
- ✅ Remembers conversations

**No API key? No problem!**
The chatbot still works with built-in intelligence, just not as powerful for general topics.

---

## 💡 Tips

**Too slow?** Use Gemini (faster than ChatGPT)

**Want best quality?** Use Claude (more intelligent)

**On a budget?** Use Gemini (completely free!)

**Pro mode?** Add ALL three keys - chatbot picks the best one automatically!

---

## 🐛 Troubleshooting

### "Module not found" error?
```bash
pip3 install flask flask-cors openai anthropic python-dotenv
```

### Port already in use?
```bash
lsof -ti:5000 | xargs kill -9
```

### Backend won't start?
```bash
cd ~/Desktop/luxbin_chain/autonomous-ai
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors openai anthropic python-dotenv
python3 chatbot_api_server.py
```

---

**Full Guide:** See `GET_API_KEYS.md` for detailed instructions

**Created by Nichole Christie** • LUXBIN Protocol • 2024
