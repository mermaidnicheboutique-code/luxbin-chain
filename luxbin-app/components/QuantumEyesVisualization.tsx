"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

interface PhotonicVision {
  txHash: string;
  leftEye: number[];
  rightEye: number[];
  color: number;
  quantumState: string;
  decodedMessage: string;
  timestamp: number;
}

export function QuantumEyesVisualization() {
  const { isConnected } = useAccount();
  const [txHash, setTxHash] = useState("");
  const [decoding, setDecoding] = useState(false);
  const [decodedData, setDecodedData] = useState<PhotonicVision | null>(null);

  const colorNames = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];
  const colorClasses = [
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
    "text-blue-400",
    "text-indigo-400",
    "text-violet-400"
  ];

  const handleDecode = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!txHash) {
      alert("Please enter a transaction hash");
      return;
    }

    setDecoding(true);
    setDecodedData(null);

    try {
      // TODO: Replace with actual substrate extrinsic call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated photonic vision data
      setDecodedData({
        txHash,
        leftEye: [3, 3, 2, 2, 1, 0, 0], // 7 color spectrum
        rightEye: [0, 1, 0, 1, 1, 0, 1], // Quantum state bits
        color: 3, // Green = safe
        quantumState: "|ψ⟩ = α|0⟩ + β|1⟩",
        decodedMessage: "Safe transaction - No malicious patterns detected",
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Decoding error:", error);
      alert("Decoding failed");
    } finally {
      setDecoding(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">👁️ Quantum Eyes Visualization</h2>
      <p className="text-gray-400 mb-8">
        Decode transactions using photonic encoding and quantum state representation
      </p>

      {/* Interactive Transaction Decoder */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">🔬 Decode Transaction</h3>
        <p className="text-gray-400 mb-6">
          Enter a transaction hash to see its photonic representation and quantum state encoding
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="0x... transaction hash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
          />
          <button
            onClick={handleDecode}
            disabled={decoding || !txHash || !isConnected}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
          >
            {decoding ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Decoding...
              </span>
            ) : !isConnected ? (
              "Connect Wallet"
            ) : (
              "👁️ Decode"
            )}
          </button>
        </div>

        {decodedData && (
          <div className="p-6 bg-black/30 rounded-xl border border-white/10">
            <div className="text-green-300 font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Photonic Decoding Complete!
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400 mb-1">Photonic Color</div>
                <div className={`text-2xl font-bold ${colorClasses[decodedData.color]}`}>
                  {colorNames[decodedData.color]}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400 mb-1">Quantum State</div>
                <div className="text-lg font-mono text-cyan-300">
                  {decodedData.quantumState}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-2">Decoded Message</div>
              <div className="text-white">{decodedData.decodedMessage}</div>
            </div>
          </div>
        )}
      </div>

      {/* Binocular Vision Display */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Left Eye - Light Language (7 Colors) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">👁️ Left Eye - Light Language</h3>
          <p className="text-gray-400 text-sm mb-6">
            7-color spectrum encoding (Rainbow chakra system)
          </p>

          <div className="space-y-3">
            {colorNames.map((color, i) => {
              const intensity = decodedData ? decodedData.leftEye[i] || 0 : 0;
              return (
                <div key={color}>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${colorClasses[i]}`}>{color}</span>
                    <span className="text-xs text-gray-500">Intensity: {intensity}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === 0 ? 'bg-red-500' :
                        i === 1 ? 'bg-orange-500' :
                        i === 2 ? 'bg-yellow-500' :
                        i === 3 ? 'bg-green-500' :
                        i === 4 ? 'bg-blue-500' :
                        i === 5 ? 'bg-indigo-500' :
                        'bg-violet-500'
                      }`}
                      style={{ width: `${(intensity / 4) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="text-xs text-gray-400 mb-2">Photonic Signature</div>
            <div className="font-mono text-xs text-purple-300 break-all">
              {decodedData ? decodedData.leftEye.join('') : '0000000'}
            </div>
          </div>
        </div>

        {/* Right Eye - Quantum States */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">👁️ Right Eye - Quantum States</h3>
          <p className="text-gray-400 text-sm mb-6">
            Binary quantum state representation
          </p>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {(decodedData?.rightEye || [0, 0, 0, 0, 0, 0, 0]).map((bit, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center font-bold text-2xl transition-all duration-500 ${
                  bit === 1
                    ? 'bg-cyan-500/30 border-2 border-cyan-500 text-cyan-300'
                    : 'bg-gray-700/30 border-2 border-gray-600 text-gray-500'
                }`}
              >
                {bit}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Superposition State</div>
              <div className="font-mono text-sm text-cyan-300">
                |ψ⟩ = {decodedData ? 'α|' + decodedData.rightEye.join('') + '⟩' : 'α|0000000⟩'}
              </div>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Entanglement Pattern</div>
              <div className="font-mono text-sm text-purple-300">
                {decodedData ?
                  decodedData.rightEye.map((b, i) => i % 2 === 0 ? `(${b},${decodedData.rightEye[i+1] || 0})` : '').filter(Boolean).join(' ⊗ ')
                  : '(0,0) ⊗ (0,0) ⊗ (0,0)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4">How Quantum Eyes Work</h3>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="text-indigo-300 font-semibold">1. Photonic Encoding:</span> Transaction data is encoded into 7 photon polarizations (rainbow spectrum)
          </p>
          <p>
            <span className="text-indigo-300 font-semibold">2. Quantum State Mapping:</span> Binary representation creates superposition states for pattern detection
          </p>
          <p>
            <span className="text-indigo-300 font-semibold">3. Binocular Vision:</span> Left eye sees color patterns, right eye sees quantum entanglement
          </p>
          <p>
            <span className="text-indigo-300 font-semibold">4. Pattern Recognition:</span> AI correlates photonic signatures with known threat patterns
          </p>
        </div>
      </div>
    </div>
  );
}
