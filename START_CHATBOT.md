# 🚀 Start Your LUXBIN Emotional AI Chatbot

## ✨ What You Just Built

Your chatbot now has:

✅ **Animated Video Avatar** - Changes emotions based on conversation
✅ **Emotional Intelligence** - Understands and responds to your feelings
✅ **Photonic Encoding** - Visualizes code as light language
✅ **Persistent Memory** - Remembers you across sessions
✅ **Function Calling** - Executes blockchain operations
✅ **Multi-Model AI** - Routes to Claude, GPT, or Gemini

## 🎬 Quick Start (2 Steps)

### Step 1: Start the AI Backend (Terminal 1)

```bash
cd ~/Desktop/luxbin_chain/autonomous-ai
./start_chatbot_server.sh
```

**Expected output:**
```
🤖 Starting LUXBIN Emotional AI Chatbot Server...
✓ Chatbot initialized successfully
🌐 Server available at: http://localhost:5000
Features enabled:
  • Emotional understanding 🧠
  • Photonic encoding ⚡
  • Persistent memory 💾
  • Function calling 🛠️
```

### Step 2: Start the Web App (Terminal 2)

```bash
cd ~/Desktop/luxbin_chain/luxbin-app
npm run dev
```

**Open:** http://localhost:3000

## 💬 Try It Out!

Click the chat button (💬) in the bottom right and try:

### Test Emotional Responses:
- **"This is amazing!"** → Avatar turns pink, excited emotion 🤩
- **"Thanks for your help!"** → Avatar turns green, happy emotion 😊
- **"How does this work?"** → Avatar turns yellow, thinking emotion 🤔
- **"This isn't working"** → Avatar turns red, concerned emotion 😟

### Test Photonic Encoding:
- **"Encode this: function hello() { return 42; }"** → See light language visualization ⚡
- **"Show me photonic encoding"** → Learn about the technology

### Test Blockchain Features:
- **"Check my balance"** → Multi-chain wallet lookup
- **"How do I buy LUX tokens?"** → Step-by-step guide
- **"Analyze transaction 0x..."** → Security analysis

## 🎨 Avatar Features

Your avatar:

1. **Changes Color Based on Emotion:**
   - 💖 Pink glow = Excited
   - 💚 Green glow = Happy/Positive
   - 💛 Yellow glow = Confused/Thinking
   - ❤️ Red glow = Concerned
   - 💜 Purple glow = Neutral/Ready
   - 💙 Blue glow = Analyzing

2. **Pulses When Thinking:**
   - Scales up 10% when AI is processing
   - Shows animated dots
   - Displays photonic particles

3. **Uses Your Video Assets:**
   - bg-video-1.mp4 → Neutral/Thinking
   - bg-video-2.mp4 → Confused
   - bg-video-3.mp4 → Frustrated
   - bg-video-4.mp4 → Positive
   - bg-video-5.mp4 → Excited

## 📊 Monitor Performance

Check if everything is working:

```bash
# Health check
curl http://localhost:5000/health

# Get stats
curl http://localhost:5000/api/stats

# Test encoding
curl -X POST http://localhost:5000/api/photonic/encode \
  -H "Content-Type: application/json" \
  -d '{"code": "hello world", "language": "javascript"}'
```

## 🔧 Optional: Add AI API Keys

For enhanced responses, add API keys:

```bash
# Create .env file
cd ~/Desktop/luxbin_chain/autonomous-ai
nano .env
```

Add:
```bash
OPENAI_API_KEY=sk-...        # For GPT-4 (optional)
ANTHROPIC_API_KEY=sk-ant-... # For Claude (optional)
GOOGLE_API_KEY=...           # For Gemini (optional)
```

**Note:** Chatbot works WITHOUT API keys using built-in intelligence!

## 🐛 Troubleshooting

### Backend Not Starting?

```bash
# Install dependencies manually
cd ~/Desktop/luxbin_chain/autonomous-ai
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors openai anthropic chromadb pillow matplotlib
```

### Avatar Not Showing?

Check videos exist:
```bash
ls ~/Desktop/luxbin_chain/luxbin-app/public/bg-video-*.mp4
```

Should see 5 video files. If missing, the avatar will show a colored circle instead.

### Port Already in Use?

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
echo "PORT=5001" >> ~/Desktop/luxbin_chain/autonomous-ai/.env
```

## 📚 Learn More

- **Full Guide:** `Desktop/luxbin_chain/CHATBOT_INTEGRATION_GUIDE.md`
- **Architecture:** See the guide for detailed diagrams
- **API Docs:** http://localhost:3000/api-docs (when running)

## 🎉 What's Next?

Your chatbot can now:
1. ✅ Understand emotions (excited, happy, confused, etc.)
2. ✅ Show animated video avatar that reacts
3. ✅ Encode code into photonic light language
4. ✅ Remember conversations across sessions
5. ✅ Execute blockchain operations
6. ✅ Generate images, videos, game code
7. ✅ Search your codebase with RAG

**Try asking it to help you with your LUXBIN project!**

---

Created by Nichole Christie • LUXBIN Protocol • 2024
