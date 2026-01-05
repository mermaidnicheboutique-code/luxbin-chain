"use client";

import { useState } from "react";
import Link from "next/link";
import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";
import { ThreatPredictionDashboard } from "@/components/ThreatPredictionDashboard";
import { NeuralAnalyzerStatus } from "@/components/NeuralAnalyzerStatus";
import { EnergyGridOptimization } from "@/components/EnergyGridOptimization";
import { QuantumEyesVisualization } from "@/components/QuantumEyesVisualization";

export default function QuantumAIPage() {
  const [activeTab, setActiveTab] = useState("threat");

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
                LUXBIN Quantum AI
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

        {/* Hero */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Interactive Quantum AI
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Analyze threats, configure neural networks, optimize energy, and decode transactions with quantum computing
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-lg font-semibold">Quantum AI Active</span>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              {[
                { id: "threat", name: "🔮 Threat Analysis", color: "from-purple-500 to-pink-500" },
                { id: "neural", name: "🧠 Neural Config", color: "from-blue-500 to-cyan-500" },
                { id: "energy", name: "⚡ Energy Grid", color: "from-green-500 to-emerald-500" },
                { id: "eyes", name: "👁️ Quantum Eyes", color: "from-indigo-500 to-purple-500" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white scale-105`
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Components */}
        <section className="px-6 py-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {activeTab === "threat" && <ThreatPredictionDashboard />}
            {activeTab === "neural" && <NeuralAnalyzerStatus />}
            {activeTab === "energy" && <EnergyGridOptimization />}
            {activeTab === "eyes" && <QuantumEyesVisualization />}
          </div>
        </section>
      </div>
    </div>
  );
}
