"use client";

import { useState } from "react";
import Link from "next/link";
import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";

export default function SmartWalletDemo() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userOps, setUserOps] = useState<any[]>([]);
  const [nonce, setNonce] = useState(0);

  const connectWallet = async () => {
    // In a real implementation, this would connect to Coinbase Smart Wallet
    // For demo purposes, we'll simulate the connection
    const mockAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setWalletAddress(mockAddress);
    setIsConnected(true);
  };

  const submitUserOperation = async () => {
    const newOp = {
      id: Date.now(),
      sender: walletAddress,
      nonce: nonce,
      callData: "0x...",
      status: "pending",
      gasUsed: 0
    };
    setUserOps([newOp, ...userOps]);
    setNonce(nonce + 1);

    // Simulate execution
    setTimeout(() => {
      setUserOps(prev => prev.map(op =>
        op.id === newOp.id ? { ...op, status: "executed", gasUsed: 21000 } : op
      ));
    }, 2000);
  };

  const executeBatchOps = async () => {
    const batchOps = [
      { id: Date.now(), type: "Transfer", amount: "0.1 LUX" },
      { id: Date.now() + 1, type: "Approve", contract: "0x123..." },
      { id: Date.now() + 2, type: "Swap", tokens: "LUX → USDC" }
    ];

    const newOp = {
      id: Date.now(),
      sender: walletAddress,
      nonce: nonce,
      callData: "Batch: " + batchOps.length + " operations",
      status: "pending",
      gasUsed: 0,
      isBatch: true,
      batchOps
    };

    setUserOps([newOp, ...userOps]);
    setNonce(nonce + 1);

    setTimeout(() => {
      setUserOps(prev => prev.map(op =>
        op.id === newOp.id ? { ...op, status: "executed", gasUsed: 63000 } : op
      ));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <BackgroundVideos />
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              {/* Animated rotating logo */}
              <LuxbinTokenLogoRotating size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                LUXBIN
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                ← Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/mirror" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Mirror
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-300 text-sm">
                🎯 ERC-4337 Account Abstraction
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Coinbase Smart Wallet Demo
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of blockchain wallets with ERC-4337 account abstraction on LUXBIN
            </p>
          </div>
        </section>

        {/* Demo Section */}
        <section className="relative px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Connection Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">1. Connect Your Smart Wallet</h2>

              {!isConnected ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-6">👛</div>
                  <button
                    onClick={connectWallet}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    Connect Coinbase Smart Wallet
                  </button>
                  <p className="text-sm text-gray-400 mt-4">
                    This demo simulates Coinbase Smart Wallet integration
                  </p>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
                      <p className="text-lg font-mono text-green-300">{walletAddress}</p>
                    </div>
                    <div className="text-green-400 text-3xl">✓</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-1">Balance</p>
                      <p className="text-xl font-bold">100.00 LUX</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-1">Nonce</p>
                      <p className="text-xl font-bold">{nonce}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-1">Gas Deposited</p>
                      <p className="text-xl font-bold text-cyan-300">5.0 LUX</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isConnected && (
              <>
                {/* Actions Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
                  <h2 className="text-3xl font-bold mb-6">2. Execute Operations</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Single Operation */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                      <div className="text-3xl mb-3">📤</div>
                      <h3 className="text-xl font-bold mb-2">Submit User Operation</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Execute a single gasless transaction through the EntryPoint contract
                      </p>
                      <button
                        onClick={submitUserOperation}
                        className="w-full py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-all"
                      >
                        Submit Operation
                      </button>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <span className="text-green-400">✓</span>
                        <span>$0 Gas Fees (Already Free!)</span>
                      </div>
                    </div>

                    {/* Batch Operations */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
                      <div className="text-3xl mb-3">📦</div>
                      <h3 className="text-xl font-bold mb-2">Batch Operations</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Execute multiple operations in a single transaction bundle
                      </p>
                      <button
                        onClick={executeBatchOps}
                        className="w-full py-3 bg-cyan-600 rounded-lg font-bold hover:bg-cyan-700 transition-all"
                      >
                        Execute Batch
                      </button>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <span className="text-cyan-400">⚡</span>
                        <span>3x faster than sequential txns</span>
                      </div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-2xl mb-2">🔐</div>
                      <h4 className="font-bold mb-1">Social Recovery</h4>
                      <p className="text-xs text-gray-400">Recover access via trusted guardians</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-2xl mb-2">🔑</div>
                      <h4 className="font-bold mb-1">Session Keys</h4>
                      <p className="text-xs text-gray-400">Delegate permissions temporarily</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-2xl mb-2">⏱️</div>
                      <h4 className="font-bold mb-1">Time Locks</h4>
                      <p className="text-xs text-gray-400">Schedule future transactions</p>
                    </div>
                  </div>
                </div>

                {/* Operations History */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold mb-6">3. Operation History</h2>

                  {userOps.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <div className="text-5xl mb-4">📋</div>
                      <p>No operations yet. Submit your first user operation above!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userOps.map((op) => (
                        <div
                          key={op.id}
                          className={`border rounded-xl p-4 ${
                            op.status === "executed"
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-yellow-500/10 border-yellow-500/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`text-2xl ${op.isBatch ? '📦' : '📤'}`}>
                                {op.isBatch ? '📦' : '📤'}
                              </div>
                              <div>
                                <p className="font-bold">{op.isBatch ? 'Batch Operation' : 'User Operation'}</p>
                                <p className="text-xs text-gray-400">Nonce: {op.nonce}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  op.status === "executed"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-yellow-500/20 text-yellow-300"
                                }`}
                              >
                                {op.status === "executed" ? "✓ Executed" : "⏳ Pending"}
                              </span>
                            </div>
                          </div>

                          <div className="bg-black/30 rounded-lg p-3 mb-3">
                            <p className="text-xs text-gray-400 mb-1">Call Data:</p>
                            <p className="text-sm font-mono">{op.callData}</p>
                          </div>

                          {op.isBatch && op.batchOps && (
                            <div className="border-t border-white/10 pt-3 mt-3">
                              <p className="text-xs text-gray-400 mb-2">Batch Operations:</p>
                              <div className="space-y-2">
                                {op.batchOps.map((batchOp: any) => (
                                  <div key={batchOp.id} className="bg-white/5 rounded p-2 text-sm">
                                    <span className="font-bold">{batchOp.type}</span>
                                    {batchOp.amount && <span className="text-gray-400"> - {batchOp.amount}</span>}
                                    {batchOp.contract && <span className="text-gray-400"> - {batchOp.contract}</span>}
                                    {batchOp.tokens && <span className="text-gray-400"> - {batchOp.tokens}</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {op.status === "executed" && (
                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                              <span>Gas Used: {op.gasUsed.toLocaleString()}</span>
                              <span>•</span>
                              <span className="text-green-400">Cost: $0.00 (Free!)</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Technical Details */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 mt-8">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-cyan-300">1. User Operation</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Instead of EOA transactions, smart wallets use "UserOperations" that contain:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Sender address (smart wallet)</li>
                    <li>• Nonce & signature</li>
                    <li>• Call data to execute</li>
                    <li>• Gas limits & fees</li>
                    <li>• Optional paymaster data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">2. EntryPoint Contract</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    The EntryPoint (0x5FF137D4b0F...) processes user operations:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Validates signatures</li>
                    <li>• Executes call data</li>
                    <li>• Handles paymasters</li>
                    <li>• Manages gas accounting</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-green-300">3. Bundlers</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Off-chain actors that bundle operations and submit to chain:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Collect user operations</li>
                    <li>• Simulate execution</li>
                    <li>• Bundle multiple ops</li>
                    <li>• Submit to EntryPoint</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-pink-300">4. LUXBIN Integration</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Native Substrate pallet for ERC-4337:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• pallet_erc4337</li>
                    <li>• UserOperation storage</li>
                    <li>• Nonce management</li>
                    <li>• Gas deposit tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link
                href="/developers"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Build on LUXBIN →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
