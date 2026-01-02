"use client";

import { WalletButton } from "@/components/WalletButton";
import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinSwap } from "@/components/LuxbinSwap";
import { CoinbaseOnramp } from "@/components/CoinbaseOnramp";
import { LuxbinTokenLogoRotating, LuxbinTokenLogo } from "@/components/AnimatedTokenLogo";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <BackgroundVideos />
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" style={{ zIndex: 1 }} />
      <FloatingParticles />

      <div className="relative" style={{ zIndex: 10 }}>
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Animated rotating logo using background videos */}
              <LuxbinTokenLogoRotating size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                LUXBIN
              </span>
            </div>
            <nav className="hidden md:flex gap-6">
              {[
                { name: "About", href: "/about" },
                { name: "Quantum AI", href: "/quantum-ai" },
                { name: "Research", href: "/research" },
                { name: "Technical", href: "/technical" },
                { name: "Chain Info", href: "#chain" },
                { name: "Buy", href: "#buy" },
                { name: "Mirror", href: "/mirror" },
                { name: "Developers", href: "/developers" },
                { name: "API", href: "/api-docs" }
              ].map((link) => (
                link.href.startsWith('/') ? (
                  <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </a>
                )
              ))}
            </nav>
            <WalletButton />
          </div>
        </header>

        <section className="relative px-6 pt-20 pb-32">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight animate-glow">
              LUXBIN
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
              The World's First Gasless L1 Blockchain
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Zero Fees • Infinite Scalability • Quantum-Resistant Security
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
                🟢 Live Mainnet
              </span>
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 text-sm">
                💰 $0 Gas Fees
              </span>
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 text-sm">
                ⚡ 6s Block Time
              </span>
              <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-300 text-sm">
                🎯 ERC-4337 Enabled
              </span>
            </div>
          </div>
        </section>

        {/* Chain Information */}
        <section id="chain" className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">LUXBIN Chain Details</h2>
              <p className="text-gray-400 text-lg">Your own Layer 1 blockchain network</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">🔗 Network Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain Name:</span>
                    <span className="text-white font-mono">LUXBIN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-white font-mono">4242</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RPC Endpoint:</span>
                    <span className="text-purple-300 font-mono">ws://localhost:9944</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">HTTP RPC:</span>
                    <span className="text-purple-300 font-mono">http://localhost:9944</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Block Time:</span>
                    <span className="text-white">6 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Consensus:</span>
                    <span className="text-white">Aura + GRANDPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Fees:</span>
                    <span className="text-green-300 font-bold">$0 (FREE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Abstraction:</span>
                    <span className="text-cyan-300 font-bold">ERC-4337 ✓</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">🎯 Quick Links</h3>
                <div className="space-y-3">
                  <a href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>🔍 Polkadot.js Explorer</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </a>
                  <Link href="/developers" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>👨‍💻 Developer Portal</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </Link>
                  <Link href="/api-docs" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>📚 API Documentation</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </Link>
                  <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span>📦 GitHub Repository</span>
                      <span className="text-xs text-gray-400">→</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Coinbase Smart Wallet Showcase */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold">Coinbase Smart Wallet Ready</h3>
                  <p className="text-sm text-cyan-300">First Substrate chain with native ERC-4337 support</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                  <div className="text-2xl mb-2">🔐</div>
                  <h4 className="font-bold text-cyan-300 mb-1">Social Recovery</h4>
                  <p className="text-xs text-gray-300">Recover access using trusted contacts</p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="text-2xl mb-2">💸</div>
                  <h4 className="font-bold text-blue-300 mb-1">Gasless Txns</h4>
                  <p className="text-xs text-gray-300">Already $0 fees + paymaster support</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <div className="text-2xl mb-2">📦</div>
                  <h4 className="font-bold text-purple-300 mb-1">Batch Ops</h4>
                  <p className="text-xs text-gray-300">Execute multiple actions at once</p>
                </div>
                <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-xl">
                  <div className="text-2xl mb-2">🌉</div>
                  <h4 className="font-bold text-pink-300 mb-1">Cross-Chain</h4>
                  <p className="text-xs text-gray-300">Transfer between chains seamlessly</p>
                </div>
              </div>
            </div>

            {/* Connection Instructions */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🔌 Connect Your Wallet</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-cyan-300">🎯 Coinbase Smart Wallet (Recommended)</h4>
                  <p className="text-sm text-gray-300 mb-2">ERC-4337 smart wallet with advanced features:</p>
                  <code className="text-xs bg-black/50 p-2 rounded block">
                    Chain ID: 4242<br/>
                    RPC: http://localhost:9944<br/>
                    EntryPoint: 0x5FF137D4b0F...
                  </code>
                  <Link href="/smart-wallet-demo" className="text-xs text-cyan-400 hover:text-cyan-300 block mt-2">
                    View Demo →
                  </Link>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">MetaMask (for LUX tokens)</h4>
                  <p className="text-sm text-gray-300 mb-2">Add Base network to view your LUX tokens:</p>
                  <code className="text-xs bg-black/50 p-2 rounded block">
                    Network: Base<br/>
                    RPC: https://mainnet.base.org<br/>
                    Chain ID: 8453
                  </code>
                  <p className="text-xs text-gray-400 mt-2">LUX tokens are wrapped on Base L2</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">Polkadot.js (for LUXBIN chain)</h4>
                  <p className="text-sm text-gray-300 mb-2">Connect to native LUXBIN blockchain:</p>
                  <code className="text-xs bg-black/50 p-2 rounded block">
                    RPC: ws://localhost:9944<br/>
                    Chain: LUXBIN
                  </code>
                  <a href="https://polkadot.js.org/extension/" target="_blank" className="text-xs text-purple-400 hover:text-purple-300 block mt-2">
                    Download Extension →
                  </a>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-purple-300">WalletConnect</h4>
                  <p className="text-sm text-gray-300 mb-2">Scan QR code with mobile wallet</p>
                  <p className="text-xs text-gray-400">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section id="buy" className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Get LUXBIN Tokens</h2>
              <p className="text-gray-400 text-lg">Multiple ways to acquire LUX tokens</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Coinbase Buy */}
              <CoinbaseOnramp />

              {/* Uniswap Swap */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">💱 Swap on Uniswap</h3>
                <p className="text-gray-300 mb-6">Trade ETH for LUXBIN on Base L2 via decentralized exchange</p>
                <a
                  href="https://app.uniswap.org/#/swap?outputCurrency=0x66b4627B4Dd73228D24f24E844B6094091875169&chain=base"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-4"
                >
                  <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-6 hover:bg-pink-500/20 transition-all">
                    <div className="text-4xl mb-3">🦄</div>
                    <h4 className="font-bold mb-2">Uniswap V3</h4>
                    <p className="text-sm text-gray-300">Best rates, deep liquidity</p>
                  </div>
                </a>
                <p className="text-xs text-gray-400 text-center">Non-custodial DEX trading</p>
              </div>

              {/* Direct Swap Component */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">⚡ Quick Swap</h3>
                <p className="text-gray-300 mb-4">Swap directly on our platform</p>
                <LuxbinSwap />
              </div>
            </div>

            {/* Earn LUXBIN */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">🏗️ Earn LUXBIN Tokens</h3>
              <p className="text-gray-300 mb-6 text-center">Build, validate, or contribute to earn LUX rewards</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <h4 className="font-bold text-green-300 mb-2">🎁 Developer Rewards</h4>
                  <p className="text-sm text-gray-300">Earn LUX tokens by contributing to the ecosystem</p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <h4 className="font-bold text-blue-300 mb-2">🏃 Validator Program</h4>
                  <p className="text-sm text-gray-300">Run a validator node and earn block rewards</p>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <h4 className="font-bold text-purple-300 mb-2">🪂 Airdrops</h4>
                  <p className="text-sm text-gray-300">Early adopters and developers receive token airdrops</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why LUXBIN?</h2>
              <p className="text-gray-400 text-lg">Revolutionary blockchain technology</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "💸", title: "Zero Gas Fees", description: "Deploy unlimited smart contracts without paying a single cent in transaction fees. LUXBIN is completely gasless." },
                { icon: "⚡", title: "Lightning Fast", description: "6-second block finality with Aura + GRANDPA consensus. Fast enough for real-time applications." },
                { icon: "🎯", title: "Coinbase Smart Wallet", description: "First Substrate chain with ERC-4337 account abstraction. Native support for Coinbase Smart Wallets with social recovery, batch ops, and gasless transactions." },
                { icon: "🔐", title: "Quantum Resistant", description: "Built with quantum cryptography and advanced security patterns to resist future quantum computing attacks." },
                { icon: "🌐", title: "Full Substrate SDK", description: "Build with Rust using the complete Polkadot SDK. Compatible with the entire Substrate ecosystem." },
                { icon: "🔗", title: "Interoperable", description: "Bridge to Ethereum, Base, and other chains. Wrapped LUX tokens available on Base network." },
                { icon: "🛡️", title: "Immune System", description: "Biological-inspired security framework with autonomous threat detection and response mechanisms." },
                { icon: "📦", title: "ERC-4337 Ready", description: "Full account abstraction support with EntryPoint contracts, bundlers, and paymasters for advanced smart wallet capabilities." }
              ].map((feature) => (
                <div key={feature.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer CTA */}
        <section className="relative px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Start Building Today</h2>
              <p className="text-xl text-gray-300 mb-8">
                Deploy your first smart contract in minutes. Zero setup, zero fees, infinite possibilities.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/developers" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  📖 View Documentation
                </Link>
                <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all">
                  🚀 Clone on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative px-6 py-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">Network</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#chain" className="hover:text-white">Chain Info</a></li>
                  <li><a href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944" target="_blank" className="hover:text-white">Explorer</a></li>
                  <li><a href="#" className="hover:text-white">Network Status</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Developers</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/developers" className="hover:text-white">Documentation</Link></li>
                  <li><Link href="/api-docs" className="hover:text-white">API Reference</Link></li>
                  <li><a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="hover:text-white">GitHub</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">Telegram</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Whitepaper</a></li>
                  <li><a href="#" className="hover:text-white">Brand Kit</a></li>
                  <li><a href="#" className="hover:text-white">Media Kit</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/10">
              <p className="mb-2">
                LUXBIN - The World's First Gasless Layer 1 Blockchain
              </p>
              <p className="text-xs">
                Created by Nichole Christie • © 2024 LUXBIN Protocol • Open Source
              </p>
              <p className="text-xs mt-2">
                Contact: <a href="mailto:Nicholechristie555@gmail.com" className="text-purple-400 hover:text-purple-300">Nicholechristie555@gmail.com</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{id: number; size: number; left: string; top: string; delay: number; duration: number}>>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 20,
        duration: Math.random() * 10 + 15
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-md animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
}
