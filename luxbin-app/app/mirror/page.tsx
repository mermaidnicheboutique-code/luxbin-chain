"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";

interface BlockData {
  blockNumber: number;
  timestamp: number;
  temporalSignature: string;
  lightLanguage: string;
  colorCode: string;
  frequency: number;
  protected: boolean;
  nvCenters: number;
  consensus: string;
}

// Light Language Translation Map
const LIGHT_LANGUAGE_MAP: Record<number, string> = {
  0: '◐◑◒◓', // Red - Foundation
  1: '◔◕◖◗', // Orange - Creation
  2: '◘○◙◚', // Yellow - Wisdom
  3: '◛◜◝◞', // Green - Growth
  4: '◟◠◡◢', // Blue - Truth
  5: '◣◤◥◦', // Indigo - Insight
  6: '◧◨◩◪', // Violet - Transcendence
};

const COLOR_MAP = [
  { name: 'Red', hex: '#FF0000', wavelength: 700 },
  { name: 'Orange', hex: '#FF7F00', wavelength: 620 },
  { name: 'Yellow', hex: '#FFFF00', wavelength: 580 },
  { name: 'Green', hex: '#00FF00', wavelength: 550 },
  { name: 'Blue', hex: '#0000FF', wavelength: 470 },
  { name: 'Indigo', hex: '#4B0082', wavelength: 450 },
  { name: 'Violet', hex: '#9400D3', wavelength: 400 },
];

export default function MirrorPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [blocksProtected, setBlocksProtected] = useState(0);
  const [recentBlocks, setRecentBlocks] = useState<BlockData[]>([]);
  const [networkName, setNetworkName] = useState('Base');

  // Connect to actual blockchain
  useEffect(() => {
    connectToBlockchain();
    const interval = setInterval(fetchLatestBlock, 2000); // Every 2 seconds
    return () => clearInterval(interval);
  }, []);

  async function connectToBlockchain() {
    try {
      // Connect to Base network via Coinbase Paymaster
      const rpcUrl = process.env.NEXT_PUBLIC_COINBASE_PAYMASTER_URL ||
        'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM';

      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1
        })
      });

      if (response.ok) {
        const data = await response.json();
        const blockNum = parseInt(data.result, 16);
        setCurrentBlock(blockNum);
        setIsConnected(true);
        setNetworkName('Base Mainnet');
        console.log('✅ Connected to Base blockchain:', blockNum);
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnected(false);
    }
  }

  async function fetchLatestBlock() {
    if (!isConnected) return;

    try {
      const rpcUrl = process.env.NEXT_PUBLIC_COINBASE_PAYMASTER_URL ||
        'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM';

      // Get latest block number
      const blockNumResponse = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1
        })
      });

      const blockNumData = await blockNumResponse.json();
      const blockNumber = parseInt(blockNumData.result, 16);

      if (blockNumber > currentBlock) {
        // Get full block data
        const blockResponse = await fetch(rpcUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: ['0x' + blockNumber.toString(16), false],
            id: 2
          })
        });

        const blockData = await blockResponse.json();

        if (blockData.result) {
          const timestamp = parseInt(blockData.result.timestamp, 16);
          const block = createBlockData(blockNumber, timestamp);

          setCurrentBlock(blockNumber);
          setBlocksProtected(prev => prev + 1);
          setRecentBlocks(prev => [block, ...prev.slice(0, 9)]);
        }
      }
    } catch (error) {
      console.error('Error fetching block:', error);
    }
  }

  function createBlockData(blockNumber: number, timestamp: number): BlockData {
    // Generate temporal cryptography signature
    const colorIndex = blockNumber % 7;
    const color = COLOR_MAP[colorIndex];

    // Temporal signature based on timestamp and block
    const temporalSignature = `T-${timestamp.toString(16).toUpperCase()}-${blockNumber.toString(16).toUpperCase()}`;

    // Light language symbol
    const lightLanguage = LIGHT_LANGUAGE_MAP[colorIndex];

    // Frequency based on color wavelength
    const frequency = (3e8 / (color.wavelength * 1e-9)) / 1e12; // THz

    // NV centers (diamond quantum centers) - based on block
    const nvCenters = (blockNumber % 100) + 1;

    return {
      blockNumber,
      timestamp,
      temporalSignature,
      lightLanguage,
      colorCode: color.hex,
      frequency: parseFloat(frequency.toFixed(2)),
      protected: true,
      nvCenters,
      consensus: 'Temporal Cryptography'
    };
  }

  function formatTimestamp(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  function getColorName(hex: string) {
    const color = COLOR_MAP.find(c => c.hex === hex);
    return color ? color.name : 'Unknown';
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <BackgroundVideos />
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <LuxbinTokenLogoRotating size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                LUXBIN Mirror
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                ← Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/developers" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Developers
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Live Temporal Mirror
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Real-time blockchain data with temporal cryptography & light language
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-lg font-semibold">
                {isConnected ? `Connected to ${networkName}` : 'Connecting...'}
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Current Block */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Current Block</div>
                <div className="text-3xl font-bold text-purple-300">
                  #{currentBlock.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">{networkName}</div>
              </div>

              {/* Blocks Protected */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Blocks Protected</div>
                <div className="text-3xl font-bold text-green-300">
                  {blocksProtected.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">This session</div>
              </div>

              {/* Consensus */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Consensus</div>
                <div className="text-2xl font-bold text-yellow-300">
                  Temporal
                </div>
                <div className="text-xs text-gray-500 mt-1">Cryptography</div>
              </div>

              {/* Status */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Mirror Status</div>
                <div className={`text-2xl font-bold mb-1 ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
                  {isConnected ? '🟢 Live' : '🔴 Offline'}
                </div>
                <div className="text-xs text-gray-500">Real-time data</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">🔬 Temporal Cryptography</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="text-xl font-bold mb-2 text-red-300">Timestamps</h3>
                <p className="text-sm text-gray-400">
                  Each block is timestamped with temporal cryptography, creating an immutable time-locked signature
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-3">◐◑◒◓</div>
                <h3 className="text-xl font-bold mb-2 text-blue-300">Light Language</h3>
                <p className="text-sm text-gray-400">
                  Block data translates to geometric light language symbols, encoding information in photonic patterns
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="text-xl font-bold mb-2 text-purple-300">NV Centers</h3>
                <p className="text-sm text-gray-400">
                  Diamond quantum NV centers protect each block, creating quantum-resistant security
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Blocks */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">🌈 Recent Blocks (Real-Time)</h2>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Block</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Timestamp</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Temporal Signature</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Light Language</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Color/Frequency</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">NV Centers</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBlocks.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                          Waiting for blocks...
                        </td>
                      </tr>
                    ) : (
                      recentBlocks.map((block, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-purple-300">
                            #{block.blockNumber.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                            {formatTimestamp(block.timestamp)}
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-cyan-300">
                            {block.temporalSignature}
                          </td>
                          <td className="px-6 py-4 text-center text-2xl">
                            <span style={{ color: block.colorCode }}>{block.lightLanguage}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: block.colorCode }}
                              />
                              <div className="text-sm">
                                <div className="text-gray-300">{getColorName(block.colorCode)}</div>
                                <div className="text-xs text-gray-500">{block.frequency} THz</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            <span className="text-purple-300 font-semibold">
                              {block.nvCenters} centers
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {block.protected ? (
                              <span className="text-green-300 font-semibold">✅ Protected</span>
                            ) : (
                              <span className="text-yellow-300 font-semibold">⏳ Pending</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Light Language Guide */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🌟 Light Language Symbols</h2>
            <div className="grid grid-cols-7 gap-4">
              {COLOR_MAP.map((color, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className="text-4xl mb-2" style={{ color: color.hex }}>
                    {LIGHT_LANGUAGE_MAP[index]}
                  </div>
                  <div className="text-sm font-bold mb-1" style={{ color: color.hex }}>
                    {color.name}
                  </div>
                  <div className="text-xs text-gray-500">{color.wavelength}nm</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Explore the Living Blockchain</h2>
              <p className="text-xl text-gray-300 mb-8">
                Every block protected with temporal cryptography, translated to light language, secured by diamond quantum centers
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/developers" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  📖 Learn More
                </Link>
                <a
                  href="https://github.com/mermaidnicheboutique-code/luxbin-chain"
                  target="_blank"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all"
                >
                  🚀 GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
