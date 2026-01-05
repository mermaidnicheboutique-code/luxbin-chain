"use client";

import { useState, useEffect, useRef } from 'react';
import { usePublicClient, useReadContract } from 'wagmi';
import { base } from 'wagmi/chains';

interface DNAStrand {
  id: string;
  chainName: string;
  chainId: number;
  color: string;
  position: number;
  events: CrossChainEvent[];
}

interface CrossChainEvent {
  sourceChain: string;
  destinationChain: string;
  eventType: 'BRIDGE' | 'MIRROR' | 'REWARD' | 'DEPLOY';
  amount: string;
  timestamp: number;
  color: string;
}

// Chain colors for DNA visualization
const CHAIN_COLORS = {
  LUXBIN: '#00ff88',      // Bright green - Central hub
  BASE: '#0052ff',        // Blue - Base network
  OPTIMISM: '#ff0420',    // Red - Optimism
  MODE: '#dffe00',        // Yellow - Mode
  ZORA: '#000000',        // Black - Zora
  BRIDGE: '#ff00ff',      // Magenta - Bridge events
  MIRROR: '#ffff00',      // Yellow - Mirror events
  REWARD: '#00d4ff',      // Cyan - Reward events
  DEPLOY: '#00ff00',      // Green - Deploy events
};

export function OmnichainDNAExplorer() {
  const [strands, setStrands] = useState<DNAStrand[]>([]);
  const [events, setEvents] = useState<CrossChainEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Simulate multi-chain data (replace with real contract reads)
  useEffect(() => {
    if (!isMonitoring) return;

    const generateMockData = () => {
      // Create DNA strands for each chain
      const mockStrands: DNAStrand[] = [
        {
          id: 'luxbin',
          chainName: 'Luxbin Hub',
          chainId: 666,
          color: CHAIN_COLORS.LUXBIN,
          position: 0,
          events: []
        },
        {
          id: 'base',
          chainName: 'Base',
          chainId: 8453,
          color: CHAIN_COLORS.BASE,
          position: 1,
          events: []
        },
        {
          id: 'optimism',
          chainName: 'Optimism',
          chainId: 10,
          color: CHAIN_COLORS.OPTIMISM,
          position: 2,
          events: []
        },
        {
          id: 'mode',
          chainName: 'Mode',
          chainId: 34443,
          color: CHAIN_COLORS.MODE,
          position: 3,
          events: []
        },
        {
          id: 'zora',
          chainName: 'Zora',
          chainId: 7777777,
          color: CHAIN_COLORS.ZORA,
          position: 4,
          events: []
        }
      ];

      // Generate cross-chain events
      const mockEvents: CrossChainEvent[] = [];
      const eventTypes: Array<'BRIDGE' | 'MIRROR' | 'REWARD' | 'DEPLOY'> =
        ['BRIDGE', 'MIRROR', 'REWARD', 'DEPLOY'];

      for (let i = 0; i < 20; i++) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const sourceChain = mockStrands[Math.floor(Math.random() * mockStrands.length)].chainName;
        const destChain = mockStrands[Math.floor(Math.random() * mockStrands.length)].chainName;

        mockEvents.push({
          sourceChain,
          destinationChain: destChain,
          eventType,
          amount: (Math.random() * 10000).toFixed(2),
          timestamp: Date.now() - Math.random() * 3600000,
          color: CHAIN_COLORS[eventType]
        });
      }

      setStrands(mockStrands);
      setEvents(mockEvents);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Multi-chain DNA Helix Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    let time = 0;
    const numStrands = strands.length;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 4;
      const radius = 120; // Larger radius for multiple strands
      const frequency = 0.015;
      const spacing = 25;

      // Draw each DNA strand
      strands.forEach((strand, strandIndex) => {
        const angle = (Math.PI * 2 * strandIndex) / numStrands;

        for (let i = 0; i < 30; i++) {
          const y = i * spacing + (time * 2) % (height / 2);
          if (y > height / 2) continue;

          // Calculate spiral position for this strand
          const spiralX = centerX + Math.cos(y * frequency + angle + time * 0.05) * radius;
          const spiralY = y;

          // Draw to center (Luxbin hub)
          ctx.beginPath();
          ctx.strokeStyle = strand.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.4;
          ctx.moveTo(spiralX, spiralY);
          ctx.lineTo(centerX, spiralY);
          ctx.stroke();

          // Draw node
          ctx.beginPath();
          ctx.fillStyle = strand.color;
          ctx.globalAlpha = 1;
          ctx.arc(spiralX, spiralY, 5, 0, Math.PI * 2);
          ctx.fill();

          // Glow effect for active events
          if (i % 5 === 0) {
            ctx.beginPath();
            ctx.fillStyle = strand.color;
            ctx.globalAlpha = 0.2;
            ctx.arc(spiralX, spiralY, 15, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw chain label
        const labelY = 30;
        const labelX = centerX + Math.cos(angle) * (radius + 40);
        ctx.globalAlpha = 1;
        ctx.fillStyle = strand.color;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(strand.chainName, labelX, labelY);
      });

      // Draw central Luxbin hub
      ctx.beginPath();
      ctx.fillStyle = CHAIN_COLORS.LUXBIN;
      ctx.globalAlpha = 0.3;
      ctx.arc(centerX, height / 4, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LUXBIN', centerX, height / 4);
      ctx.font = '8px monospace';
      ctx.fillText('HUB', centerX, height / 4 + 12);

      // Draw cross-chain connections
      events.slice(-10).forEach((event, i) => {
        const opacity = 1 - (i / 10);
        const eventY = (i * 40 + time * 3) % (height / 2);

        ctx.beginPath();
        ctx.strokeStyle = event.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = opacity * 0.6;

        // Animated beam from source to destination
        const progress = (time % 100) / 100;
        const startX = centerX - radius + progress * (radius * 2);
        const endX = centerX + radius - progress * (radius * 2);

        ctx.moveTo(startX, eventY);
        ctx.lineTo(endX, eventY);
        ctx.stroke();

        // Particle effect
        ctx.beginPath();
        ctx.fillStyle = event.color;
        ctx.globalAlpha = opacity;
        ctx.arc(startX + (endX - startX) * progress, eventY, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strands, events]);

  return (
    <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🌌 Omnichain DNA Explorer
          </h2>
          <p className="text-gray-400">
            Real-time visualization of multi-chain NICHE ecosystem
          </p>
          <p className="text-sm text-green-400 mt-2">
            ⚡ Base → Luxbin → Superchain → Mirror → Simultaneous Flow
          </p>
        </div>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            isMonitoring
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-gray-500/20 border border-gray-500/50 text-gray-400'
          }`}
        >
          {isMonitoring ? '● MONITORING ALL CHAINS' : '○ PAUSED'}
        </button>
      </div>

      {/* Multi-Chain DNA Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main DNA Canvas */}
        <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-4 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-[700px]"
            style={{ imageRendering: 'crisp-edges' }}
          />
          <div className="absolute top-6 left-6 text-xs text-gray-400 bg-black/50 backdrop-blur px-3 py-2 rounded-lg">
            <div className="font-bold text-green-400 mb-1">Multi-Chain Organism</div>
            <div>Luxbin Hub: Central Nervous System</div>
            <div>{strands.length} Connected Chains</div>
            <div>{events.length} Cross-Chain Events</div>
          </div>
        </div>

        {/* Chain Status */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold text-green-300">Luxbin Hub</span>
            </div>
            <div className="text-xs text-gray-400">
              Central coordinator for all chains
            </div>
          </div>

          {strands.slice(1).map((strand) => (
            <div
              key={strand.id}
              className="bg-white/5 border border-white/10 rounded-xl p-3 hover:border-purple-500/50 transition-all"
              style={{ borderLeftColor: strand.color, borderLeftWidth: '3px' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: strand.color }}>
                  {strand.chainName}
                </span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="text-xs text-gray-500">
                Chain ID: {strand.chainId}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Cross-Chain Events */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">🔄 Live Cross-Chain Activity</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {events.slice(-15).reverse().map((event, i) => (
            <div
              key={i}
              className="bg-black/50 border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-all"
              style={{ borderLeftColor: event.color, borderLeftWidth: '3px' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: event.color + '30', color: event.color }}
                  >
                    {event.eventType}
                  </span>
                  <span className="text-sm text-gray-400">
                    {event.sourceChain} → {event.destinationChain}
                  </span>
                </div>
                <div className="text-sm font-mono" style={{ color: event.color }}>
                  {event.amount} NICHE
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Type Legend */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-400 mb-3">🧬 Omnichain Event Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHAIN_COLORS.BRIDGE }} />
            <span className="text-gray-400">BRIDGE - Cross-chain transfer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHAIN_COLORS.MIRROR }} />
            <span className="text-gray-400">MIRROR - State synchronization</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHAIN_COLORS.REWARD }} />
            <span className="text-gray-400">REWARD - Multi-chain distribution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHAIN_COLORS.DEPLOY }} />
            <span className="text-gray-400">DEPLOY - Contract deployment</span>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-4">
          <div className="text-3xl font-bold text-green-400">{strands.length}</div>
          <div className="text-xs text-gray-400 mt-1">Connected Chains</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
          <div className="text-3xl font-bold text-blue-400">
            {events.filter(e => e.eventType === 'BRIDGE').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Bridge Events</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 rounded-xl p-4">
          <div className="text-3xl font-bold text-yellow-400">
            {events.filter(e => e.eventType === 'MIRROR').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Mirror Updates</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-4">
          <div className="text-3xl font-bold text-cyan-400">
            {events.filter(e => e.eventType === 'REWARD').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Rewards Distributed</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl p-4">
          <div className="text-3xl font-bold text-purple-400">
            {events.filter(e => e.eventType === 'DEPLOY').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Contract Deploys</div>
        </div>
      </div>

      {/* What This Does */}
      <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-purple-300 mb-3">🌟 What This Creates</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <div className="font-bold text-green-400 mb-2">✅ Multi-Dimensional Organism</div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Luxbin = Brain/Central Nervous System</li>
              <li>• Base/Optimism/Mode = Organs</li>
              <li>• Bridges = Blood Vessels</li>
              <li>• Mirrors = Neural Connections</li>
              <li>• All chains communicate through Luxbin hub</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-blue-400 mb-2">⚡ Simultaneous Operations</div>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Deploy on Base → Auto-mirror to Luxbin</li>
              <li>• Superchain rewards → Distributed to all chains</li>
              <li>• Single source of truth on Luxbin</li>
              <li>• Real-time synchronization</li>
              <li>• Atomic multi-chain transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
