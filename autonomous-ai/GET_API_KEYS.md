# 🔑 Get API Keys for Full AI Intelligence

To make your chatbot as smart as ChatGPT and Claude, you need API keys. Here's how to get them:

## Option 1: Anthropic Claude (Recommended) 🏆

Claude is extremely intelligent, fast, and affordable.

### Get Your Key:

1. **Sign Up**: Go to https://console.anthropic.com/
2. **Get Credits**:
   - New accounts get $5 free credits
   - Add payment method for more: $5 = ~2.5 million words
3. **Create API Key**:
   - Click "API Keys" in dashboard
   - Click "Create Key"
   - Copy the key (starts with `sk-ant-`)

### Cost:
- **Claude 3.5 Sonnet**: $3 per million input tokens (~750k words)
- **Your chatbot**: ~$0.01 per conversation (100 messages)
- **$5 = 500+ conversations**

---

## Option 2: OpenAI ChatGPT 🤖

ChatGPT is powerful and widely used.

### Get Your Key:

1. **Sign Up**: Go to https://platform.openai.com/
2. **Get Credits**:
   - New accounts get $5 free credits
   - Add payment method: $10 minimum
3. **Create API Key**:
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)

### Cost:
- **GPT-4**: $30 per million input tokens (~750k words)
- **GPT-4 Turbo**: $10 per million tokens
- **GPT-3.5 Turbo**: $0.50 per million tokens (cheapest)
- **Your chatbot**: ~$0.03-0.10 per conversation

---

## Option 3: Google Gemini (Free!) 🎁

Gemini is FREE for moderate usage!

### Get Your Key:

1. **Sign Up**: Go to https://makersuite.google.com/app/apikey
2. **Create API Key**:
   - Click "Get API Key"
   - Click "Create API key in new project"
   - Copy the key

### Cost:
- **FREE**: 60 requests per minute
- **Gemini 1.5 Pro**: FREE up to reasonable limits
- **Your chatbot**: Completely free for personal use!

---

## 🚀 Setup Your Keys

### Step 1: Create .env file

```bash
cd ~/Desktop/luxbin_chain/autonomous-ai
nano .env
```

### Step 2: Add your keys

```bash
# Choose ONE or MORE (chatbot will use the best available)

# Anthropic Claude (Recommended - Best balance of intelligence & cost)
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# OpenAI ChatGPT (Most popular - Higher cost)
OPENAI_API_KEY=sk-your-key-here

# Google Gemini (FREE - Good for testing)
GOOGLE_API_KEY=your-google-key-here

# Server config
PORT=5000
DEBUG=False
```

### Step 3: Save and exit
Press `Ctrl+X`, then `Y`, then `Enter`

### Step 4: Restart the chatbot

```bash
cd ~/Desktop/luxbin_chain/autonomous-ai
./start_chatbot_server.sh
```

---

## ✨ What You Get

With API keys, your chatbot becomes:

### **General Intelligence:**
✅ Answer questions on ANY topic (science, history, math, philosophy)
✅ Help with homework and learning
✅ Creative writing and storytelling
✅ Personal advice and emotional support

### **Programming:**
✅ Code in ANY language (Python, JavaScript, Rust, Go, etc.)
✅ Debug complex problems
✅ Explain algorithms and data structures
✅ Review and optimize code

### **Creative Tasks:**
✅ Write essays, stories, poems
✅ Brainstorm ideas
✅ Create content for social media
✅ Generate marketing copy

### **Problem Solving:**
✅ Math problems and proofs
✅ Logical reasoning puzzles
✅ Strategy and planning
✅ Research and analysis

**PLUS all the LUXBIN blockchain features!**

---

## 🆓 Free Option: Use Gemini

If you don't want to pay, use Google Gemini:

```bash
# Just add Gemini key (it's free!)
echo 'GOOGLE_API_KEY=your-key-here' > ~/Desktop/luxbin_chain/autonomous-ai/.env
```

Your chatbot will be smart AND free!

---

## 💡 Which Should I Choose?

| Provider | Intelligence | Cost | Speed | Recommendation |
|----------|-------------|------|-------|----------------|
| **Claude** | ⭐⭐⭐⭐⭐ | $$ | ⚡⚡⚡ | **Best Overall** |
| **ChatGPT** | ⭐⭐⭐⭐⭐ | $$$ | ⚡⚡ | Most Popular |
| **Gemini** | ⭐⭐⭐⭐ | FREE | ⚡⚡⚡ | **Best for Testing** |

**My Recommendation:**
1. Start with **Gemini** (FREE) to test
2. Upgrade to **Claude** for production ($5 = 500 conversations)
3. Add **ChatGPT** as backup for specific tasks

---

## 🧪 Test It Works

After adding keys, test:

```bash
# Start backend
cd ~/Desktop/luxbin_chain/autonomous-ai
./start_chatbot_server.sh

# In another terminal, test:
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Explain quantum physics to me like Im 5 years old"}
    ]
  }'
```

You should get an intelligent response!

---

## ❓ FAQ

### Q: Do I need ALL three keys?
**A:** No! Just one is enough. The chatbot will use whichever you provide.

### Q: Which is cheapest?
**A:** Gemini is FREE. For paid, Claude is cheaper than ChatGPT.

### Q: Can I use multiple keys?
**A:** Yes! The chatbot will automatically choose the best model for each task.

### Q: What if I don't add any keys?
**A:** The chatbot still works using built-in knowledge, but it won't be as smart for general topics.

### Q: Is my API key safe?
**A:** Yes! It's stored in `.env` which is never uploaded to GitHub. Only use it on your local server.

### Q: How do I check my usage?
**A:**
- Claude: https://console.anthropic.com/settings/usage
- OpenAI: https://platform.openai.com/usage
- Gemini: https://makersuite.google.com/app/apikey

---

## 🎉 You're Ready!

Once you add at least one API key, your chatbot will be:

- **As smart as ChatGPT** ✅
- **As intelligent as Claude** ✅
- **With emotional understanding** 🧠
- **Plus blockchain features** ⛓️
- **With animated avatar** 🎬
- **And photonic encoding** ⚡

Start chatting about ANYTHING!

---

**Need Help?**
- Email: Nicholechristie555@gmail.com
- GitHub: https://github.com/mermaidnicheboutique-code/luxbin-chain
