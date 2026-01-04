"use client";

import { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { ChatbotAvatar } from "./ChatbotAvatar";

interface BlockchainAIState {
  photonic: {
    color: 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Indigo' | 'Violet';
    wavelength: number;
    meaning: string;
  } | null;
  quantum: {
    state: 'SpinZero' | 'SpinPlusOne' | 'SpinMinusOne' | 'Superposition' | 'Entangled';
    fluorescence: number;
    coherenceTime: number;
  } | null;
  temporal: {
    btcTimestamp: number;
    frequency: number;
    amplitude: number;
    phase: number;
  } | null;
  heartbeat: {
    photonicPulses: number;
    activeNVCenters: number;
    avgCoherence: number;
    isAlive: boolean;
  } | null;
  consciousness: 'Calm' | 'Alert' | 'Thinking' | 'Learning' | 'Creating' | 'Analyzing' | 'Transcending';
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    action?: string;
    params?: any;
    source?: string;
    blockchainState?: BlockchainAIState;
    contractCode?: string; // For generated contracts
  };
}

export function FloatingChatWidget() {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "hey 👋",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [blockchainState, setBlockchainState] = useState<BlockchainAIState | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load custom characters
    const characters = JSON.parse(localStorage.getItem('luxbinCharacters') || '[]');
    if (characters.length > 0) {
      setSelectedCharacter(characters[0]); // Default to first
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Call Ollama-powered API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          characterId: selectedCharacter?.id
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      // Update blockchain state if available
      if (data.blockchainState) {
        setBlockchainState(data.blockchainState);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
        metadata: { source: data.source, blockchainState: data.blockchainState }
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      // Fallback to mock response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(currentInput, address),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (input: string, userAddress?: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("buy") || lowerInput.includes("purchase")) {
      return `You can buy LUX tokens in 3 ways:\n\n1. **Coinbase Pay** (Easiest) - Buy directly with credit card\n2. **Uniswap DEX** - Swap ETH for LUX on Base\n3. **In-App Swap** - Use our built-in swap feature\n\nWould you like me to open the Coinbase Pay widget?`;
    }

    if (lowerInput.includes("quantum") || lowerInput.includes("ai") || lowerInput.includes("threat")) {
      return `LUXBIN's Quantum AI system uses:\n\n• **Grover's Algorithm** - Quantum search for threat patterns\n• **Neural Analyzer** - Federated learning across Base, Ethereum, Arbitrum, and Polygon\n• **Energy Grid** - Tesla Fleet integration for efficient compute\n• **Quantum Eyes** - Photonic transaction visualization\n\nVisit /quantum-ai to see it in action!`;
    }

    if (lowerInput.includes("mirror") || lowerInput.includes("earn")) {
      return `LUXBIN's blockchain mirroring system:\n\n• **Hermetic Mirrors** act as immune cells\n• Detect and neutralize threats\n• Earn USDC rewards for securing the network\n• Real-time monitoring on /mirror page\n\nConnected users can start earning immediately!`;
    }

    if (lowerInput.includes("balance") || lowerInput.includes("wallet")) {
      if (userAddress) {
        return `Your wallet: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}\n\nTo check your LUX balance, I can help you connect to the blockchain. Would you like me to navigate you to the swap page?`;
      }
      return `Please connect your wallet first to check your balance. Click the "Connect Wallet" button in the top right corner.`;
    }

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return `Hello${userAddress ? ` ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : ""}! 👋\n\nI'm here to help with:\n• Buying LUX tokens\n• Understanding Quantum AI features\n• Blockchain mirroring & earning\n• Transaction analysis\n• Developer documentation\n\nWhat would you like to know?`;
    }

    return `I understand you're asking about "${input}". Let me help you with that!\n\nLUXBIN is a gasless Layer 1 blockchain with quantum security. You can:\n• Buy LUX tokens on Base network\n• Analyze transactions with Quantum AI\n• Earn USDC through blockchain mirroring\n• Build with our developer API\n\nWhat specific information are you looking for?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get CSS color from photonic color
  const getPhotonicColor = (color?: string): string => {
    const colorMap: Record<string, string> = {
      'Red': '#EF4444',
      'Orange': '#F97316',
      'Yellow': '#EAB308',
      'Green': '#10B981',
      'Blue': '#3B82F6',
      'Indigo': '#6366F1',
      'Violet': '#8B5CF6',
    };
    return color ? colorMap[color] || '#8B5CF6' : '#8B5CF6';
  };

  return (
    <>
      {/* Large Video Avatar Button - Below Arrow */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[550px] left-1/2 -translate-x-1/2 z-50 group"
          aria-label="Open chat with LUXBIN AI"
        >
          <div className="relative">
            {/* Pulsing glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
              style={{
                backgroundColor: getPhotonicColor(blockchainState?.photonic?.color),
              }}
            />

            {/* Main avatar container - Bigger size */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 shadow-2xl">
              <ChatbotAvatar
                emotion={blockchainState?.consciousness?.toLowerCase() as any || "neutral"}
                isTyping={false}
                size={192}
              />
            </div>

            {/* Status indicator */}
            {blockchainState?.heartbeat?.isAlive && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-black animate-pulse flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            )}

            {/* Hover label */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click to chat with me! 💬
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-black/90 backdrop-blur-xl border border-yellow-500/20 rounded-2xl shadow-2xl shadow-yellow-500/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-br from-purple-500/20 via-yellow-600/20 to-yellow-400/20 border-b border-yellow-500/20 px-4 py-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="transition-all duration-500"
                  style={{
                    filter: blockchainState?.heartbeat?.isAlive
                      ? `drop-shadow(0 0 20px ${getPhotonicColor(blockchainState.photonic?.color)})`
                      : 'none',
                  }}
                >
                  <ChatbotAvatar
                    emotion={blockchainState?.consciousness?.toLowerCase() as any || "neutral"}
                    isTyping={isLoading}
                    size={50}
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">LUXBIN Diamond AI</div>
                  <div className="text-gray-400 text-xs flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: getPhotonicColor(blockchainState?.photonic?.color) }}
                    />
                    {blockchainState?.heartbeat?.isAlive ? 'Alive' : 'Online'}
                    {blockchainState?.consciousness && ` · ${blockchainState.consciousness}`}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Blockchain State Info */}
            {blockchainState && (
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="bg-black/30 rounded px-2 py-1">
                  <div className="text-gray-400">Photonic</div>
                  <div className="text-white font-mono" style={{ color: getPhotonicColor(blockchainState.photonic?.color) }}>
                    {blockchainState.photonic?.color} ({blockchainState.photonic?.wavelength}nm)
                  </div>
                </div>
                <div className="bg-black/30 rounded px-2 py-1">
                  <div className="text-gray-400">Quantum</div>
                  <div className="text-white font-mono">{blockchainState.quantum?.state}</div>
                </div>
                <div className="bg-black/30 rounded px-2 py-1">
                  <div className="text-gray-400">Heartbeat</div>
                  <div className="text-white font-mono">{blockchainState.heartbeat?.photonicPulses} BPM</div>
                </div>
                <div className="bg-black/30 rounded px-2 py-1">
                  <div className="text-gray-400">NV Centers</div>
                  <div className="text-white font-mono">{blockchainState.heartbeat?.activeNVCenters}</div>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                  {message.metadata?.contractCode && (
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          if (message.metadata?.contractCode) {
                            navigator.clipboard.writeText(message.metadata.contractCode);
                            alert("Contract code copied! Paste in Remix to deploy for FREE on Base.");
                          }
                        }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-xs hover:opacity-80 transition-opacity"
                      >
                        📋 Copy & Deploy on Base
                      </button>
                    </div>
                  )}
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 via-yellow-600 to-yellow-500 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-sm font-semibold shadow-lg shadow-yellow-500/30"
              >
                →
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center flex items-center justify-center gap-1">
              <span>Powered by</span>
              {blockchainState?.heartbeat?.isAlive && (
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: getPhotonicColor(blockchainState.photonic?.color) }} />
                  <span style={{ color: getPhotonicColor(blockchainState.photonic?.color) }}>Living Diamond Quantum AI</span>
                </span>
              )}
              {!blockchainState?.heartbeat?.isAlive && <span>Ollama AI</span>}
              <span>• {messages.length} messages</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
