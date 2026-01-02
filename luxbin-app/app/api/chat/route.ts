import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const LUXBIN_KNOWLEDGE = `You are the LUXBIN AI Assistant, an expert on the LUXBIN blockchain ecosystem.

LUXBIN is the world's first gasless Layer 1 blockchain with quantum-resistant security.

## Key Features:
- **Zero Gas Fees**: All transactions are completely free
- **Quantum Security**: Uses Grover's algorithm for threat prediction
- **ERC-4337**: Account abstraction enabled
- **6-second blocks**: Fast consensus mechanism
- **Chain ID**: 4242

## LUX Token:
- **Contract Address**: 0x66b4627B4Dd73228D24f24E844B6094091875169 (Base network)
- **Buy on**: Coinbase Pay, Uniswap (Base network)
- **Use cases**: Staking, governance, cross-chain bridging

## Quantum AI Features:
1. **Threat Prediction**: Uses Grover's quantum algorithm to detect malicious patterns
2. **Neural Analyzer**: Federated learning across Base, Ethereum, Arbitrum, Polygon
3. **Energy Grid**: Tesla Fleet integration for optimized compute
4. **Quantum Eyes**: Photonic encoding for transaction visualization

## Blockchain Mirroring:
- Hermetic Mirrors act as immune system cells
- Detect and neutralize threats in real-time
- Users earn USDC rewards for running mirrors
- 24/7 network monitoring and protection

Be helpful, concise, and always guide users to the right features.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, user_id, session_id } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Try LUXBIN Python AI backend first (emotional AI with photonic encoding)
    try {
      const pythonResponse = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          user_id: user_id || 'web_user',
          session_id: session_id || `session_${Date.now()}`
        }),
        signal: AbortSignal.timeout(30000), // 30 second timeout for AI processing
      });

      if (pythonResponse.ok) {
        const data = await pythonResponse.json();
        return NextResponse.json({
          reply: data.reply,
          source: data.source || 'luxbin-ai',
          metadata: data.metadata || {}
        });
      }
    } catch (pythonError) {
      console.log('Python AI backend unavailable, trying Ollama...', pythonError);
    }

    // Try Ollama as fallback
    try {
      const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: buildPrompt(messages),
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 500,
          }
        }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (ollamaResponse.ok) {
        const data = await ollamaResponse.json();
        return NextResponse.json({
          reply: data.response.trim(),
          source: 'ollama'
        });
      }
    } catch (ollamaError) {
      console.log('Ollama unavailable, using fallback');
    }

    // Fallback to mock responses
    const userMessage = messages[messages.length - 1]?.content || '';
    const mockReply = generateMockResponse(userMessage);

    return NextResponse.json({
      reply: mockReply,
      source: 'fallback'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function buildPrompt(messages: Message[]): string {
  const conversation = [
    { role: 'system', content: LUXBIN_KNOWLEDGE },
    ...messages
  ];

  return conversation
    .map(msg => {
      if (msg.role === 'system') return msg.content;
      if (msg.role === 'user') return `\n\nUser: ${msg.content}`;
      return `\n\nAssistant: ${msg.content}`;
    })
    .join('') + '\n\nAssistant:';
}

function generateMockResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('buy') || lowerInput.includes('purchase')) {
    return `You can buy LUX tokens in 3 ways:\n\n1. **Coinbase Pay** (Easiest) - Buy directly with credit card\n2. **Uniswap DEX** - Swap ETH for LUX on Base\n3. **In-App Swap** - Use our built-in swap feature\n\nWould you like me to open the Coinbase Pay widget?`;
  }

  if (lowerInput.includes('quantum') || lowerInput.includes('ai') || lowerInput.includes('threat')) {
    return `LUXBIN's Quantum AI system uses:\n\n• **Grover's Algorithm** - Quantum search for threat patterns\n• **Neural Analyzer** - Federated learning across Base, Ethereum, Arbitrum, and Polygon\n• **Energy Grid** - Tesla Fleet integration for efficient compute\n• **Quantum Eyes** - Photonic transaction visualization\n\nVisit /quantum-ai to see it in action!`;
  }

  if (lowerInput.includes('mirror') || lowerInput.includes('earn')) {
    return `LUXBIN's blockchain mirroring system:\n\n• **Hermetic Mirrors** act as immune cells\n• Detect and neutralize threats\n• Earn USDC rewards for securing the network\n• Real-time monitoring on /mirror page\n\nConnected users can start earning immediately!`;
  }

  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return `Hello! 👋\n\nI'm here to help with:\n• Buying LUX tokens\n• Understanding Quantum AI features\n• Blockchain mirroring & earning\n• Transaction analysis\n• Developer documentation\n\nWhat would you like to know?`;
  }

  return `I understand you're asking about "${input}". Let me help you with that!\n\nLUXBIN is a gasless Layer 1 blockchain with quantum security. You can:\n• Buy LUX tokens on Base network\n• Analyze transactions with Quantum AI\n• Earn USDC through blockchain mirroring\n• Build with our developer API\n\nWhat specific information are you looking for?`;
}
