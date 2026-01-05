"use client";

import { useState, useEffect, useRef } from 'react';
import { usePublicClient } from 'wagmi';
import { base } from 'wagmi/chains';
import { formatEther } from 'viem';

interface LightParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  type: string;
}

interface LightEvent {
  type: 'TRANSFER' | 'CONTRACT_DEPLOY' | 'SWAP' | 'MINT' | 'BURN' | 'BRIDGE';
  color: string;
  intensity: number;
  value: bigint;
  from: string;
  to: string;
  timestamp: number;
  hash: string;
}

// LUXBIN LIGHT LANGUAGE - Each action = unique light pattern
const LIGHT_LANGUAGE = {
  // Transaction Types
  TRANSFER: {
    color: '#00d4ff',      // Cyan rivers
    pattern: 'flow',
    particles: 20,
    trail: true,
    glow: 0.6
  },
  CONTRACT_DEPLOY: {
    color: '#ff00ff',      // Magenta explosions
    pattern: 'burst',
    particles: 50,
    trail: false,
    glow: 1.0
  },
  SWAP: {
    color: '#00ff88',      // Green spirals
    pattern: 'spiral',
    particles: 30,
    trail: true,
    glow: 0.8
  },
  MINT: {
    color: '#ffd700',      // Gold creation
    pattern: 'birth',
    particles: 40,
    trail: true,
    glow: 0.9
  },
  BURN: {
    color: '#ff4444',      // Red destruction
    pattern: 'collapse',
    particles: 35,
    trail: false,
    glow: 0.7
  },
  BRIDGE: {
    color: '#9d00ff',      // Purple portals
    pattern: 'portal',
    particles: 45,
    trail: true,
    glow: 1.0
  },

  // Value Intensity (size/brightness based on ETH value)
  MICRO: { multiplier: 0.5, alpha: 0.3 },    // < 0.01 ETH
  SMALL: { multiplier: 1.0, alpha: 0.6 },    // 0.01-0.1 ETH
  MEDIUM: { multiplier: 1.5, alpha: 0.8 },   // 0.1-1 ETH
  LARGE: { multiplier: 2.0, alpha: 0.9 },    // 1-10 ETH
  WHALE: { multiplier: 3.0, alpha: 1.0 },    // > 10 ETH
};

export function LightshowDNAExplorer() {
  const publicClient = usePublicClient({ chainId: base.id });
  const [blocks, setBlocks] = useState<any[]>([]);
  const [lightEvents, setLightEvents] = useState<LightEvent[]>([]);
  const [particles, setParticles] = useState<LightParticle[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Fetch REAL blockchain data
  useEffect(() => {
    if (!publicClient || !isMonitoring) return;

    const fetchRealBlocks = async () => {
      try {
        const latestBlockNumber = await publicClient.getBlockNumber();
        const blockPromises = [];

        // Fetch last 10 blocks with full transaction data
        for (let i = 0; i < 10; i++) {
          const blockNum = latestBlockNumber - BigInt(i);
          if (blockNum > 0) {
            blockPromises.push(
              publicClient.getBlock({
                blockNumber: blockNum,
                includeTransactions: true
              })
            );
          }
        }

        const fetchedBlocks = await Promise.all(blockPromises);
        setBlocks(fetchedBlocks);

        // Convert transactions to light events
        const events: LightEvent[] = [];

        for (const block of fetchedBlocks) {
          if (!block.transactions) continue;

          for (const tx of block.transactions.slice(0, 5)) {
            if (typeof tx === 'string') continue;

            // Determine transaction type from data
            let type: LightEvent['type'] = 'TRANSFER';

            if (tx.to === null) {
              type = 'CONTRACT_DEPLOY';
            } else if (tx.input && tx.input.length > 10) {
              // Check function signatures
              const sig = tx.input.slice(0, 10);
              if (sig === '0xa9059cbb' || sig === '0x23b872dd') {
                type = 'TRANSFER';
              } else if (sig === '0x40c10f19') {
                type = 'MINT';
              } else if (sig === '0x42966c68') {
                type = 'BURN';
              } else if (sig.startsWith('0x38ed1739') || sig.startsWith('0x7ff36ab5')) {
                type = 'SWAP';
              }
            }

            const lightConfig = LIGHT_LANGUAGE[type];

            events.push({
              type,
              color: lightConfig.color,
              intensity: lightConfig.glow,
              value: tx.value || BigInt(0),
              from: tx.from,
              to: tx.to || '0x0000000000000000000000000000000000000000',
              timestamp: Number(block.timestamp),
              hash: tx.hash
            });
          }
        }

        setLightEvents(events);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };

    fetchRealBlocks();
    const interval = setInterval(fetchRealBlocks, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [publicClient, isMonitoring]);

  // Generate particles from light events
  useEffect(() => {
    if (lightEvents.length === 0) return;

    const newParticles: LightParticle[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return;

    lightEvents.forEach((event, eventIndex) => {
      const config = LIGHT_LANGUAGE[event.type];
      const valueInEth = Number(formatEther(event.value));

      // Determine intensity multiplier based on value
      let intensityConfig = LIGHT_LANGUAGE.MICRO;
      if (valueInEth > 10) intensityConfig = LIGHT_LANGUAGE.WHALE;
      else if (valueInEth > 1) intensityConfig = LIGHT_LANGUAGE.LARGE;
      else if (valueInEth > 0.1) intensityConfig = LIGHT_LANGUAGE.MEDIUM;
      else if (valueInEth > 0.01) intensityConfig = LIGHT_LANGUAGE.SMALL;

      // Generate particles based on pattern
      const centerX = canvas.width / 4;
      const centerY = canvas.height / 4 + (eventIndex * 50);
      const numParticles = config.particles * intensityConfig.multiplier;

      for (let i = 0; i < numParticles; i++) {
        let particle: LightParticle;

        switch (config.pattern) {
          case 'burst': // Explosion for contract deploys
            const angle = (Math.PI * 2 * i) / numParticles;
            const speed = 3 + Math.random() * 5;
            particle = {
              x: centerX,
              y: centerY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: config.color,
              size: 3 * intensityConfig.multiplier,
              life: 1.0,
              maxLife: 60,
              type: event.type
            };
            break;

          case 'flow': // River for transfers
            particle = {
              x: centerX - 100 + Math.random() * 20,
              y: centerY + Math.random() * 10,
              vx: 4 + Math.random() * 2,
              vy: (Math.random() - 0.5) * 0.5,
              color: config.color,
              size: 2 * intensityConfig.multiplier,
              life: 1.0,
              maxLife: 80,
              type: event.type
            };
            break;

          case 'spiral': // Spiral for swaps
            const spiralAngle = (Math.PI * 2 * i) / numParticles + Date.now() / 500;
            const spiralRadius = 50 + (i / numParticles) * 100;
            particle = {
              x: centerX + Math.cos(spiralAngle) * spiralRadius,
              y: centerY + Math.sin(spiralAngle) * spiralRadius,
              vx: Math.cos(spiralAngle + Math.PI / 2) * 2,
              vy: Math.sin(spiralAngle + Math.PI / 2) * 2,
              color: config.color,
              size: 2.5 * intensityConfig.multiplier,
              life: 1.0,
              maxLife: 70,
              type: event.type
            };
            break;

          case 'birth': // Expanding ring for mints
            const birthAngle = (Math.PI * 2 * i) / numParticles;
            particle = {
              x: centerX,
              y: centerY,
              vx: Math.cos(birthAngle) * 2,
              vy: Math.sin(birthAngle) * 2,
              color: config.color,
              size: 4 * intensityConfig.multiplier,
              life: 1.0,
              maxLife: 90,
              type: event.type
            };
            break;

          case 'collapse': // Imploding for burns
            const collapseAngle = (Math.PI * 2 * i) / numParticles;
            const collapseRadius = 150;
            particle = {
              x: centerX + Math.cos(collapseAngle) * collapseRadius,
              y: centerY + Math.sin(collapseAngle) * collapseRadius,
              vx: -Math.cos(collapseAngle) * 3,
              vy: -Math.sin(collapseAngle) * 3,
              color: config.color,
              size: 3 * intensityConfig.multiplier,
              life: 1.0,
              maxLife: 50,
              type: event.type
            };
            break;

          case 'portal': // Swirling portal for bridges
            const portalAngle = (Math.PI * 2 * i) / numParticles;
            const portalRadius = 80;
            particle = {
              x: centerX + Math.cos(portalAngle) * portalRadius,
              y: centerY + Math.sin(portalAngle) * portalRadius,
              vx: -Math.sin(portalAngle) * 4,
              vy: Math.cos(portalAngle) * 4,
              color: config.color,
              size: 3.5 * intensityConfig.multiplier,
              life: 1.0,
              maxLife: 100,
              type: event.type
            };
            break;

          default:
            particle = {
              x: centerX,
              y: centerY,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              color: config.color,
              size: 2,
              life: 1.0,
              maxLife: 60,
              type: event.type
            };
        }

        newParticles.push(particle);
      }
    });

    setParticles(prev => [...prev, ...newParticles].slice(-2000)); // Keep last 2000 particles
  }, [lightEvents]);

  // Animate lightshow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      setParticles(prev => {
        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1 / p.maxLife,
            vy: p.vy + 0.05 // Slight gravity
          }))
          .filter(p => p.life > 0 && p.x > -50 && p.x < width / 2 + 50 && p.y > -50 && p.y < height / 2 + 50);

        // Draw each particle
        updated.forEach(p => {
          const alpha = p.life;

          // Glow effect
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gradient.addColorStop(0, p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(0.5, p.color + Math.floor(alpha * 128).toString(16).padStart(2, '0'));
          gradient.addColorStop(1, p.color + '00');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Core particle
          ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Full Screen Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
      />

      {/* UI Overlay */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-6xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                LUXBIN LIGHTSHOW
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Real-time blockchain translated into light language
            </p>
            <div className="flex gap-4 mt-3">
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                ● LIVE on Base
              </div>
              <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-400 text-sm">
                {particles.length} active particles
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              isMonitoring
                ? 'bg-green-500/30 border-2 border-green-500 text-green-400 shadow-lg shadow-green-500/50'
                : 'bg-gray-500/30 border-2 border-gray-500 text-gray-400'
            }`}
          >
            {isMonitoring ? '⚡ MONITORING' : '○ PAUSED'}
          </button>
        </div>

        {/* Light Language Legend */}
        <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">🌈 Light Language Decoder</h3>
          <div className="space-y-3">
            {Object.entries(LIGHT_LANGUAGE).filter(([key]) =>
              ['TRANSFER', 'CONTRACT_DEPLOY', 'SWAP', 'MINT', 'BURN', 'BRIDGE'].includes(key)
            ).map(([type, config]: [string, any]) => (
              <div key={type} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full shadow-lg"
                  style={{
                    backgroundColor: config.color,
                    boxShadow: `0 0 20px ${config.color}`
                  }}
                />
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: config.color }}>
                    {type.replace('_', ' ')}
                  </div>
                  <div className="text-xs text-gray-500">
                    Pattern: {config.pattern} • {config.particles} particles
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Event Feed */}
        <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm max-h-[600px] overflow-y-auto">
          <h3 className="text-xl font-bold text-white mb-4">⚡ Live Transactions</h3>
          <div className="space-y-2">
            {lightEvents.slice(-10).reverse().map((event, i) => (
              <div
                key={event.hash}
                className="bg-white/5 border rounded-lg p-3 hover:bg-white/10 transition-all animate-fade-in"
                style={{
                  borderColor: event.color + '50',
                  boxShadow: `0 0 10px ${event.color}30`
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: event.color + '30',
                      color: event.color
                    }}
                  >
                    {event.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(event.timestamp * 1000).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {event.hash.substring(0, 10)}...{event.hash.substring(event.hash.length - 8)}
                </div>
                {event.value > 0 && (
                  <div className="text-xs font-bold mt-1" style={{ color: event.color }}>
                    {Number(formatEther(event.value)).toFixed(4)} ETH
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
