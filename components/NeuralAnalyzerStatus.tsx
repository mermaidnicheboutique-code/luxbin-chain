"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export function NeuralAnalyzerStatus() {
  const { isConnected } = useAccount();
  const [thresholds, setThresholds] = useState({
    low: 30,
    medium: 60,
    high: 80,
  });

  const [enabledChains, setEnabledChains] = useState({
    base: true,
    ethereum: true,
    arbitrum: true,
    polygon: true,
  });

  const [saving, setSaving] = useState(false);

  // Simulated chain data
  const chainData = {
    base: { accuracy: 66, detected: 1234, loss: 0.182 },
    ethereum: { accuracy: 71, detected: 2341, loss: 0.154 },
    arbitrum: { accuracy: 64, detected: 876, loss: 0.196 },
    polygon: { accuracy: 67, detected: 1543, loss: 0.174 },
  };

  const handleSaveConfig = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    setSaving(true);
    try {
      // TODO: Replace with actual substrate extrinsic call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">🧠 Neural Analyzer Configuration</h2>
      <p className="text-gray-400 mb-8">
        Configure federated learning parameters across Base, Ethereum, Arbitrum, and Polygon
      </p>

      {/* Chain Neurons Status */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(chainData).map(([chain, data]) => (
          <div
            key={chain}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold capitalize">{chain}</h3>
              <div className={`w-3 h-3 rounded-full ${enabledChains[chain as keyof typeof enabledChains] ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`} />
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Accuracy</div>
                <div className="text-2xl font-bold text-green-300">{data.accuracy}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Threats Detected</div>
                <div className="text-lg font-semibold text-purple-300">{data.detected.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Training Loss</div>
                <div className="text-sm font-mono text-cyan-300">{data.loss.toFixed(3)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Configuration */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-6">⚙️ Configure Neural Parameters</h3>

        <div className="space-y-6 mb-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Low Threat Threshold</label>
              <span className="text-white font-semibold">{thresholds.low}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={thresholds.low}
              onChange={(e) => setThresholds({ ...thresholds, low: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Medium Threat Threshold</label>
              <span className="text-white font-semibold">{thresholds.medium}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={thresholds.medium}
              onChange={(e) => setThresholds({ ...thresholds, medium: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">High Threat Threshold</label>
              <span className="text-white font-semibold">{thresholds.high}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={thresholds.high}
              onChange={(e) => setThresholds({ ...thresholds, high: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="text-sm text-gray-400 mb-3 block">Enabled Chains for Federated Learning</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(enabledChains).map(([chain, enabled]) => (
              <label
                key={chain}
                className="flex items-center gap-3 p-4 bg-black/20 rounded-lg cursor-pointer hover:bg-black/30 transition-colors border border-white/10"
              >
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabledChains({ ...enabledChains, [chain]: e.target.checked })}
                  className="w-5 h-5 rounded accent-blue-500"
                />
                <div className="flex-1">
                  <div className="capitalize text-white font-semibold">{chain}</div>
                  <div className="text-xs text-gray-400">
                    {chainData[chain as keyof typeof chainData].accuracy}% accuracy
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveConfig}
          disabled={saving || !isConnected}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving Configuration...
            </span>
          ) : !isConnected ? (
            "Connect Wallet to Save"
          ) : (
            "💾 Save Configuration"
          )}
        </button>
      </div>

      {/* Federated Learning Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4">Federated Learning Architecture</h3>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="text-blue-300 font-semibold">Each Chain = Neuron:</span> Base, Ethereum, Arbitrum, and Polygon act as specialized neurons
          </p>
          <p>
            <span className="text-blue-300 font-semibold">Privacy-Preserving:</span> Training happens locally on each chain, only model updates are shared
          </p>
          <p>
            <span className="text-blue-300 font-semibold">PyTorch Neural Network:</span> 20-dimension input → 64 → 32 → 1 (threat probability)
          </p>
          <p>
            <span className="text-blue-300 font-semibold">Cross-Chain Correlation:</span> Detects coordinated attacks across multiple networks
          </p>
        </div>
      </div>
    </div>
  );
}
