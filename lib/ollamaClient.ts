/**
 * LUXBIN Ollama Client
 * Connects to local Ollama instance for AI chat using LUXBIN knowledge
 */

interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class OllamaClient {
  private baseUrl: string;
  private model: string;
  private systemPrompt: string;

  constructor(model: string = 'llama3.2') {
    this.baseUrl = 'http://localhost:11434';
    this.model = model;
    this.systemPrompt = this.buildLuxbinKnowledge();
  }

  private buildLuxbinKnowledge(): string {
    return `You are the LUXBIN AI Assistant, an expert on the LUXBIN blockchain ecosystem.

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

## Developer Features:
- Full Ethereum compatibility (EVM)
- Substrate framework
- Web3 wallet integration (MetaMask, Coinbase, WalletConnect)
- Comprehensive API documentation

## How to Get Started:
1. Connect your wallet (Coinbase Smart Wallet recommended)
2. Buy LUX tokens on Base network
3. Start using gasless transactions
4. Explore Quantum AI features

Be helpful, concise, and always guide users to the right features. When users ask how to do something, provide clear step-by-step instructions.`;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      // Build conversation context with system prompt
      const conversation = [
        { role: 'system', content: this.systemPrompt },
        ...messages
      ];

      // Format for Ollama API
      const prompt = conversation
        .map(msg => {
          if (msg.role === 'system') return msg.content;
          if (msg.role === 'user') return `User: ${msg.content}`;
          return `Assistant: ${msg.content}`;
        })
        .join('\n\n');

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt + '\n\nAssistant:',
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 500,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data: OllamaResponse = await response.json();
      return data.response.trim();

    } catch (error) {
      console.error('Ollama chat error:', error);
      // Fallback to mock response if Ollama is unavailable
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  private getMockResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('buy') || lowerInput.includes('purchase')) {
      return `You can buy LUX tokens in 3 ways:\n\n1. **Coinbase Pay** (Easiest) - Buy directly with credit card\n2. **Uniswap DEX** - Swap ETH for LUX on Base network\n3. **In-App Swap** - Use our built-in swap feature\n\nThe LUX token address on Base is: 0x66b4627B4Dd73228D24f24E844B6094091875169`;
    }

    if (lowerInput.includes('quantum') || lowerInput.includes('ai')) {
      return `LUXBIN's Quantum AI uses:\n\n• **Grover's Algorithm** - Quantum search for threat patterns\n• **Neural Analyzer** - Federated learning across multiple chains\n• **Energy Grid** - Tesla Fleet integration\n• **Quantum Eyes** - Photonic transaction visualization\n\nVisit /quantum-ai to see it in action!`;
    }

    if (lowerInput.includes('mirror') || lowerInput.includes('earn')) {
      return `LUXBIN's mirroring system:\n\n• Hermetic Mirrors detect threats\n• Earn USDC rewards for network security\n• Real-time monitoring on /mirror page\n\nConnect your wallet to start earning!`;
    }

    return `I'm here to help with LUXBIN! I can assist with:\n\n• Buying LUX tokens\n• Quantum AI features\n• Blockchain mirroring & rewards\n• Developer documentation\n\nWhat would you like to know?`;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
