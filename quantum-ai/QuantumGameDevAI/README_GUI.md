# 🎮 Quantum Game Dev AI - GUI App

## 🚀 Launch the GUI Application

### Option 1: Clickable macOS App
1. Double-click `QuantumGameDevAI.app` in your Desktop folder
2. The app will open with a modern graphical interface
3. All your API keys are pre-configured

**Note:** The app icon is a placeholder. For a custom icon, run `./create_icon.sh` after installing ImageMagick (`brew install imagemagick`).

### Option 2: Command Line Launch
```bash
cd /Users/nicholechristie/Desktop/QuantumGameDevAI
./launch_gui.sh
```

## 🎯 How to Use the GUI App

### Main Interface
- **Title Bar**: Shows "🎮 Quantum Game Dev AI"
- **Button Row**: 5 main functions you can click
- **Output Window**: Shows AI responses and generated content
- **Status Bar**: Shows current operation status

### Button Functions

#### 🎯 Game Automation
**What it does:**
- Generates code variations (weapons, enemies, items)
- Creates game content (quests, dialogue, descriptions)
- Auto-generates test cases
- Creates documentation

**How to use:**
1. Click "🎯 Game Automation"
2. Watch the output window for AI-generated content
3. Copy the generated code into your Unreal Engine project

**Example Output:**
```
class Axe:
    damage = 35
    attack_speed = 1.2
    range = 2.5
    weapon_type = "melee"
    special_ability = "Cleave"
```

#### 🎮 Game Dev Assistant
**What it does:**
- Generates Unreal Engine C++/Blueprint code
- Provides design decision perspectives
- Debugs problems with multiple AI experts
- Plans game architecture

**How to use:**
1. Click "🎮 Game Dev Assistant"
2. Wait for AI to generate code examples
3. Copy the C++ code into your UE5 project

**Example Output:**
```cpp
class AThirdPersonController : public ACharacter {
    void StartSprinting() { MaxWalkSpeed = SprintSpeed; }
    // Full implementation...
}
```

#### 🧠 Multi-AI Questions
**What it does:**
- Asks the same question to Claude + ChatGPT + Gemini
- Compares different AI approaches
- Gets consensus on decisions
- Provides multiple expert perspectives

**How to use:**
1. Click "🧠 Multi-AI Questions"
2. See responses from all 3 AIs
3. Make informed decisions based on multiple viewpoints

**Example Output:**
```
🤖 Claude: Use SaveGame objects with UPROPERTY(SaveGame)
🤖 ChatGPT: Implement custom JSON save system
🤖 Gemini: Use UE5's built-in SaveGame framework
```

#### ⚙️ API Settings
**What it does:**
- Configure Anthropic, OpenAI, and Google API keys
- Test connections to all AI services
- Update keys if needed

**How to use:**
1. Click "⚙️ API Settings"
2. View current API key status
3. Click "🧪 Test Connections" to verify setup
4. Click "💾 Save Keys" if you update them

#### 📚 Documentation
**What it does:**
- Shows complete app documentation
- Lists all features and capabilities
- Provides usage tips and examples

## 🎨 GUI Features

### Modern Dark Theme
- Dark background (#2b2b2b) for comfortable use
- White text on dark backgrounds
- Syntax-highlighted code display
- Hover effects on buttons

### Real-time Feedback
- Status bar shows current operation
- Output window updates in real-time
- Progress indicators for AI operations
- Error messages for troubleshooting

### Threaded Operations
- GUI never freezes during AI operations
- Background processing for smooth experience
- Cancel-able operations

## 💡 Pro Tips

1. **Claude First**: Your paid credits prioritize Claude for best results
2. **Copy Code**: All generated code is ready to paste into Unreal Engine
3. **Multi-Perspective**: Use multi-AI questions for important decisions
4. **Automation**: Use for repetitive tasks like creating 50 weapons
5. **API Testing**: Always test connections before heavy usage

## 🛠️ Troubleshooting

### App Won't Start
- Make sure `venv` folder exists and is activated
- Check that all dependencies are installed
- Verify API keys are set in the environment

### AI Not Responding
- Click "⚙️ API Settings" → "🧪 Test Connections"
- Check your internet connection
- Verify API keys are valid and have credits

### GUI Issues
- Close and restart the app
- Check that tkinter is installed (`pip install tk`)
- Try the command line version if GUI fails

## 🎮 Ready to Game Dev!

Your **Quantum Game Dev AI GUI App** is now ready! Click the buttons to generate code, get design help, and accelerate your Unreal Engine development with AI assistance.

**Happy Game Developing!** 🚀🎮✨