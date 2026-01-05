"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export function EnergyGridOptimization() {
  const { isConnected } = useAccount();
  const [txCount, setTxCount] = useState("100");
  const [urgency, setUrgency] = useState<"low" | "normal" | "high">("normal");
  const [optimizing, setOptimizing] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  // Simulated Tesla Fleet data
  const fleetData = {
    capacity: 5000,
    available: 3200,
    gridDemand: 45,
    electricityPrice: 0.15,
    arbitrageProfit: 1250,
    carbonOffset: 3400,
  };

  const handleOptimize = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    setOptimizing(true);
    setRecommendation(null);

    try {
      // TODO: Replace with actual substrate extrinsic call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated recommendation
      setRecommendation({
        chargeFromGrid: urgency === "low",
        dischargeToGrid: urgency !== "low" && fleetData.gridDemand < 50,
        powerComputeKw: 100,
        batteryPowerKw: urgency === "low" ? 50 : 150,
        gridPowerKw: urgency === "low" ? 50 : -50,
        reasoning: urgency === "low"
          ? "Grid demand is low, charge batteries and defer compute to low-cost hours"
          : "Grid demand moderate, discharge batteries for arbitrage profit while processing compute load",
      });
    } catch (error) {
      console.error("Optimization error:", error);
      alert("Optimization failed");
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">⚡ Energy Grid Optimization</h2>
      <p className="text-gray-400 mb-8">
        Tesla Fleet integration for intelligent compute load scheduling based on grid demand
      </p>

      {/* Tesla Fleet Status */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Fleet Capacity</h3>
          <div className="text-4xl font-bold text-green-300 mb-2">
            {fleetData.capacity.toLocaleString()} kWh
          </div>
          <div className="text-sm text-gray-400">
            {fleetData.available.toLocaleString()} kWh available
          </div>
          <div className="mt-3 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${(fleetData.available / fleetData.capacity) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Grid Demand</h3>
          <div className="text-4xl font-bold text-yellow-300 mb-2">
            {fleetData.gridDemand}%
          </div>
          <div className="text-sm text-gray-400">
            ${fleetData.electricityPrice.toFixed(2)}/kWh
          </div>
          <div className="mt-3 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${fleetData.gridDemand}%` }}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Arbitrage Profit</h3>
          <div className="text-4xl font-bold text-purple-300 mb-2">
            ${fleetData.arbitrageProfit.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            {fleetData.carbonOffset.toLocaleString()} kg CO₂ offset
          </div>
        </div>
      </div>

      {/* Interactive Optimization Request */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4">🎯 Request Compute Optimization</h3>
        <p className="text-gray-400 mb-6">
          Get personalized recommendations for optimal compute timing based on grid demand and urgency
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Pending Transactions</label>
            <input
              type="number"
              value={txCount}
              onChange={(e) => setTxCount(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
              placeholder="100"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Urgency Level</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as any)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="low">Low (Wait for cheap energy)</option>
              <option value="normal">Normal (Balance speed & cost)</option>
              <option value="high">High (Process immediately)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleOptimize}
          disabled={optimizing || !isConnected}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {optimizing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Optimizing Energy Usage...
            </span>
          ) : !isConnected ? (
            "Connect Wallet to Optimize"
          ) : (
            "🔋 Optimize Energy Usage"
          )}
        </button>

        {recommendation && (
          <div className="mt-6 p-6 bg-black/30 rounded-xl border border-white/10">
            <div className="text-green-300 font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Optimization Recommendation
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400 mb-1">Battery Action</div>
                <div className="text-xl font-bold">
                  {recommendation.chargeFromGrid ? (
                    <span className="text-blue-300">⬇️ Charge from Grid</span>
                  ) : recommendation.dischargeToGrid ? (
                    <span className="text-green-300">⬆️ Discharge to Grid</span>
                  ) : (
                    <span className="text-yellow-300">⏸️ Hold Current Level</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-sm text-gray-400 mb-1">Compute Power</div>
                <div className="text-xl font-bold text-purple-300">
                  {recommendation.powerComputeKw} kW
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
              <div className="text-sm text-gray-400 mb-2">Strategy Reasoning</div>
              <div className="text-gray-200">{recommendation.reasoning}</div>
            </div>
          </div>
        )}
      </div>

      {/* Energy Efficiency Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4">Energy Optimization Strategy</h3>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="text-green-300 font-semibold">Tesla Fleet Management:</span> 5 MWh total capacity, 92% round-trip efficiency
          </p>
          <p>
            <span className="text-green-300 font-semibold">Energy Arbitrage:</span> Buy power at $0.06-0.12/kWh, sell at $0.22-0.30/kWh
          </p>
          <p>
            <span className="text-green-300 font-semibold">Grid Demand Prediction:</span> 24-hour forecast with hourly electricity pricing
          </p>
          <p>
            <span className="text-green-300 font-semibold">85% Efficiency:</span> 0.00015 kWh per transaction (vs 0.001 kWh traditional)
          </p>
        </div>
      </div>
    </div>
  );
}
