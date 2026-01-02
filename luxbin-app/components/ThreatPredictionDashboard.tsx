"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export function ThreatPredictionDashboard() {
  const { address, isConnected } = useAccount();
  const [txData, setTxData] = useState({
    from: "",
    to: "",
    value: "",
    gasPrice: "",
    gasLimit: "",
    blockNumber: "",
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      // TODO: Replace with actual substrate extrinsic call
      // For now, simulate the analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated result
      setResult({
        threatProbability: Math.floor(Math.random() * 100),
        crossChainRisk: Math.floor(Math.random() * 100),
        quantumAdvantage: Math.floor(Math.random() * 10) + 1,
        predictedAttacks: ["MEV Sandwich", "Front Running"],
      });
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getThreatColor = (probability: number) => {
    if (probability < 30) return "text-green-300 bg-green-500/20 border-green-500/30";
    if (probability < 60) return "text-yellow-300 bg-yellow-500/20 border-yellow-500/30";
    if (probability < 80) return "text-orange-300 bg-orange-500/20 border-orange-500/30";
    return "text-red-300 bg-red-500/20 border-red-500/30";
  };

  const getThreatLabel = (probability: number) => {
    if (probability < 30) return "LOW";
    if (probability < 60) return "MEDIUM";
    if (probability < 80) return "HIGH";
    return "CRITICAL";
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">🔮 Quantum Threat Analysis</h2>
      <p className="text-gray-400 mb-8">
        Submit any transaction for quantum-enhanced threat analysis using Grover's algorithm
      </p>

      {/* Interactive Analysis Request */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">🧪 Analyze Custom Transaction</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">From Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={txData.from}
              onChange={(e) => setTxData({ ...txData, from: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">To Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={txData.to}
              onChange={(e) => setTxData({ ...txData, to: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Value (Wei)</label>
            <input
              type="text"
              placeholder="1000000000000000000"
              value={txData.value}
              onChange={(e) => setTxData({ ...txData, value: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Gas Price (Gwei)</label>
            <input
              type="text"
              placeholder="20"
              value={txData.gasPrice}
              onChange={(e) => setTxData({ ...txData, gasPrice: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Gas Limit</label>
            <input
              type="text"
              placeholder="21000"
              value={txData.gasLimit}
              onChange={(e) => setTxData({ ...txData, gasLimit: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Block Number</label>
            <input
              type="text"
              placeholder="12345678"
              value={txData.blockNumber}
              onChange={(e) => setTxData({ ...txData, blockNumber: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={analyzing || !isConnected}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Running Quantum Analysis...
            </span>
          ) : !isConnected ? (
            "Connect Wallet to Analyze"
          ) : (
            "⚡ Run Quantum Analysis"
          )}
        </button>

        {result && (
          <div className="mt-6 p-6 bg-black/30 rounded-xl border border-white/10">
            <div className="text-green-300 font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Analysis Complete!
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className={`rounded-lg p-4 border ${getThreatColor(result.threatProbability)}`}>
                <div className="text-sm text-gray-400 mb-1">Threat Level</div>
                <div className="text-3xl font-bold mb-1">
                  {getThreatLabel(result.threatProbability)}
                </div>
                <div className="text-lg">{result.threatProbability}% probability</div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Cross-Chain Risk</div>
                <div className="text-3xl font-bold text-purple-300 mb-1">
                  {result.crossChainRisk}%
                </div>
                <div className="text-sm text-gray-500">Multi-chain correlation</div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Quantum Advantage</div>
                <div className="text-3xl font-bold text-cyan-300 mb-1">
                  {result.quantumAdvantage}x
                </div>
                <div className="text-sm text-gray-500">Speed vs classical</div>
              </div>
            </div>

            {result.predictedAttacks.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">Predicted Attack Types:</div>
                <div className="flex flex-wrap gap-2">
                  {result.predictedAttacks.map((attack: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                      {attack}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4">How Quantum Threat Analysis Works</h3>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="text-purple-300 font-semibold">1. Quantum Encoding:</span> Transaction data is encoded into 8 qubits (256 possible states)
          </p>
          <p>
            <span className="text-purple-300 font-semibold">2. Grover's Algorithm:</span> Quantum search finds threat patterns with O(√N) speedup
          </p>
          <p>
            <span className="text-purple-300 font-semibold">3. Amplitude Amplification:</span> Threat-like states are amplified for detection
          </p>
          <p>
            <span className="text-purple-300 font-semibold">4. Cross-Chain Analysis:</span> Correlates risks across Base, Ethereum, Arbitrum, Polygon
          </p>
        </div>
      </div>
    </div>
  );
}
