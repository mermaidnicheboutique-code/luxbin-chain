"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";

interface BlockActivity {
  blockNumber: number;
  timestamp: string;
  threatLevel: number;
  cellsSpawned: number;
  earnings: number;
}

export default function MirrorPage() {
  const [isActive, setIsActive] = useState(true);
  const [currentBlock, setCurrentBlock] = useState(145853035);
  const [totalEarnings, setTotalEarnings] = useState(50.80);
  const [blocksProcessed, setBlocksProcessed] = useState(8878);
  const [recentActivity, setRecentActivity] = useState<BlockActivity[]>([
    {
      blockNumber: 145853035,
      timestamp: new Date().toISOString(),
      threatLevel: 30,
      cellsSpawned: 2,
      earnings: 50.80
    }
  ]);

  // Simulate live mirroring
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentBlock(prev => prev + 1);
      setBlocksProcessed(prev => prev + 1);

      // Random threat detection
      const threatLevel = Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0;
      const cellsSpawned = threatLevel > 20 ? Math.floor(Math.random() * 5) + 1 : 0;

      // Calculate earnings
      const blockReward = 0.10;
      const threatReward = threatLevel > 0 ? (threatLevel / 100) * 100 : 0;
      const cellReward = cellsSpawned * (Math.floor(Math.random() * 16) + 5);
      const totalBlockEarnings = blockReward + threatReward + cellReward;

      setTotalEarnings(prev => prev + totalBlockEarnings);

      setRecentActivity(prev => [{
        blockNumber: currentBlock + 1,
        timestamp: new Date().toISOString(),
        threatLevel,
        cellsSpawned,
        earnings: totalBlockEarnings
      }, ...prev.slice(0, 9)]);
    }, 6000); // Every 6 seconds (Optimism block time)

    return () => clearInterval(interval);
  }, [isActive, currentBlock]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getThreatColor = (level: number) => {
    if (level === 0) return "text-green-300";
    if (level < 30) return "text-yellow-300";
    if (level < 70) return "text-orange-300";
    return "text-red-300";
  };

  const getThreatLabel = (level: number) => {
    if (level === 0) return "SAFE";
    if (level < 30) return "LOW";
    if (level < 70) return "MEDIUM";
    return "HIGH";
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
              Live Blockchain Mirror
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Hermetic mirroring with immune system integration
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-lg font-semibold">
                {isActive ? 'Mirror Active' : 'Mirror Inactive'}
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Total Earnings */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Total Earnings</div>
                <div className="text-3xl font-bold text-green-300">
                  ${totalEarnings.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">USDC</div>
              </div>

              {/* Current Block */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Current Block</div>
                <div className="text-3xl font-bold text-purple-300">
                  #{currentBlock.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Optimism</div>
              </div>

              {/* Blocks Processed */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Blocks Processed</div>
                <div className="text-3xl font-bold text-blue-300">
                  {blocksProcessed.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Total</div>
              </div>

              {/* Mirror Status */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-gray-400 mb-2">Mirror Mode</div>
                <div className="text-2xl font-bold text-purple-300 mb-1">
                  Continuous
                </div>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                      : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                  }`}
                >
                  {isActive ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Earning Rates */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">💰 Earning Rates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="text-xl font-bold mb-2">Block Mirroring</h3>
                <p className="text-3xl font-bold text-green-300 mb-2">$0.10</p>
                <p className="text-sm text-gray-400">Per block mirrored</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-2">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Threat Detection</h3>
                <p className="text-3xl font-bold text-orange-300 mb-2">$1-$100</p>
                <p className="text-sm text-gray-400">Based on threat level</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-2xl mb-2">🧬</div>
                <h3 className="text-xl font-bold mb-2">Immune Cells</h3>
                <p className="text-3xl font-bold text-purple-300 mb-2">$5-$20</p>
                <p className="text-sm text-gray-400">Per cell spawned</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">📊 Recent Activity</h2>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Block</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Threat</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Cells</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-mono text-purple-300">
                          #{activity.blockNumber.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {formatTime(activity.timestamp)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${getThreatColor(activity.threatLevel)}`}>
                            {getThreatLabel(activity.threatLevel)} ({activity.threatLevel})
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {activity.cellsSpawned > 0 ? (
                            <span className="text-purple-300 font-semibold">
                              {activity.cellsSpawned} cells
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-green-300">
                          ${activity.earnings.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🔮 How Mirror Works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Hermetic Mirroring</h3>
                <p className="text-gray-300 mb-4">
                  LUXBIN mirrors blockchain data using the 7 Hermetic Principles:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• <strong>Mentalism:</strong> All data is mental projection</li>
                  <li>• <strong>Correspondence:</strong> As above, so below</li>
                  <li>• <strong>Vibration:</strong> Everything vibrates at frequency</li>
                  <li>• <strong>Polarity:</strong> Opposites are identical in nature</li>
                  <li>• <strong>Rhythm:</strong> Everything flows in patterns</li>
                  <li>• <strong>Cause & Effect:</strong> Every action has reaction</li>
                  <li>• <strong>Gender:</strong> Masculine & feminine in all things</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Immune System</h3>
                <p className="text-gray-300 mb-4">
                  Biological immune cells protect the mirrored blockchain:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• <strong>DETECTOR:</strong> Identifies threats and anomalies</li>
                  <li>• <strong>KILLER:</strong> Eliminates malicious transactions</li>
                  <li>• <strong>MEMORY:</strong> Remembers past attack patterns</li>
                  <li>• <strong>HELPER:</strong> Coordinates immune response</li>
                  <li>• <strong>SUPPRESSOR:</strong> Prevents false positives</li>
                </ul>
                <p className="text-gray-400 text-sm mt-4">
                  Each cell type earns USDC rewards when spawned to protect the chain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Own Mirror</h2>
              <p className="text-xl text-gray-300 mb-8">
                Run a LUXBIN mirror node and earn USDC for securing the blockchain
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/developers" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  📖 Developer Guide
                </Link>
                <a
                  href="https://github.com/mermaidnicheboutique-code/luxbin-chain"
                  target="_blank"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all"
                >
                  🚀 Clone Repository
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
