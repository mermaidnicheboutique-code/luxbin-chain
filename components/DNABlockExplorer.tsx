"use client";

import { useState, useEffect, useRef } from 'react';
import { usePublicClient } from 'wagmi';
import { base } from 'wagmi/chains';

interface Block {
  number: bigint;
  hash: string;
  timestamp: bigint;
  transactions: string[];
  miner: string;
  gasUsed: bigint;
  baseFeePerGas?: bigint;
}

interface DNANode {
  id: string;
  type: 'block' | 'contract' | 'transaction';
  color: string;
  data: any;
  position: number;
}

// Luxbin Light Language Color Codes
const LIGHT_LANGUAGE = {
  BLOCK_CREATION: '#00ff88', // Green - Life/Growth
  CONTRACT_DEPLOY: '#ff00ff', // Magenta - Creation/Intelligence
  TRANSACTION: '#00d4ff', // Cyan - Flow/Movement
  ENERGY_HIGH: '#ffd700', // Gold - High energy/value
  ENERGY_MEDIUM: '#ff6b35', // Orange - Medium energy
  ENERGY_LOW: '#9b59b6', // Purple - Low energy
  SYSTEM: '#ffffff', // White - System/Pure
  ERROR: '#ff0055', // Red - Alert/Error
};

export function DNABlockExplorer() {
  const publicClient = usePublicClient({ chainId: base.id });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [dnaNodes, setDnaNodes] = useState<DNANode[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Fetch latest blocks
  useEffect(() => {
    if (!publicClient || !isMonitoring) return;

    const fetchBlocks = async () => {
      try {
        const latestBlockNumber = await publicClient.getBlockNumber();
        const blockPromises = [];

        // Fetch last 20 blocks
        for (let i = 0; i < 20; i++) {
          const blockNum = latestBlockNumber - BigInt(i);
          if (blockNum > 0) {
            blockPromises.push(
              publicClient.getBlock({ blockNumber: blockNum, includeTransactions: false })
            );
          }
        }

        const fetchedBlocks = await Promise.all(blockPromises);
        setBlocks(fetchedBlocks as Block[]);

        // Convert blocks to DNA nodes
        const nodes: DNANode[] = [];
        fetchedBlocks.forEach((block, index) => {
          if (!block) return;

          // Block creation node
          nodes.push({
            id: `block-${block.number}`,
            type: 'block',
            color: LIGHT_LANGUAGE.BLOCK_CREATION,
            data: block,
            position: index,
          });

          // Check for contract deployments
          if (block.transactions && block.transactions.length > 0) {
            const hasContracts = block.transactions.length > 5; // Heuristic
            if (hasContracts) {
              nodes.push({
                id: `contract-${block.number}`,
                type: 'contract',
                color: LIGHT_LANGUAGE.CONTRACT_DEPLOY,
                data: { block: block.number, count: block.transactions.length },
                position: index + 0.5,
              });
            }
          }

          // Energy level based on gas used
          const gasUsedBigInt = BigInt(block.gasUsed || 0);
          const energyColor = gasUsedBigInt > BigInt(10000000)
            ? LIGHT_LANGUAGE.ENERGY_HIGH
            : gasUsedBigInt > BigInt(1000000)
            ? LIGHT_LANGUAGE.ENERGY_MEDIUM
            : LIGHT_LANGUAGE.ENERGY_LOW;

          nodes.push({
            id: `energy-${block.number}`,
            type: 'transaction',
            color: energyColor,
            data: { gasUsed: block.gasUsed },
            position: index + 0.25,
          });
        });

        setDnaNodes(nodes);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };

    fetchBlocks();
    const interval = setInterval(fetchBlocks, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [publicClient, isMonitoring]);

  // DNA Helix Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 4;
      const amplitude = 80;
      const frequency = 0.02;
      const spacing = 30;

      // Draw DNA double helix
      dnaNodes.forEach((node, index) => {
        const y = index * spacing + (time * 2) % (height / 2);

        if (y > height / 2) return;

        // Left strand
        const x1 = centerX + Math.sin(y * frequency + time * 0.05) * amplitude;
        // Right strand
        const x2 = centerX - Math.sin(y * frequency + time * 0.05) * amplitude;

        // Draw connecting line (base pair)
        ctx.beginPath();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Draw nodes
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 1;
        ctx.arc(x1, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(x2, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect for contracts
        if (node.type === 'contract') {
          ctx.beginPath();
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 0.3;
          ctx.arc(x1, y, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.arc(x2, y, 12, 0, Math.PI * 2);
          ctx.fill();
        }
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
  }, [dnaNodes]);

  return (
    <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🧬 Luxbin DNA Block Explorer
          </h2>
          <p className="text-gray-400 mt-2">
            Real-time visualization of blockchain life
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
          {isMonitoring ? '● LIVE' : '○ PAUSED'}
        </button>
      </div>

      {/* DNA Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DNA Canvas */}
        <div className="bg-black border border-white/10 rounded-xl p-4 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-[600px]"
            style={{ imageRendering: 'crisp-edges' }}
          />
          <div className="absolute top-6 left-6 text-sm text-gray-400">
            <div className="bg-black/50 backdrop-blur px-3 py-2 rounded-lg">
              Genetic Code: {dnaNodes.length} sequences
            </div>
          </div>
        </div>

        {/* Block Data Feed */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {blocks.map((block) => (
            <div
              key={block.number.toString()}
              className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-bold">
                    Block #{block.number.toString()}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(Number(block.timestamp) * 1000).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Transactions:</span>
                  <span className="text-cyan-400 ml-2 font-mono">
                    {block.transactions?.length || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Gas Used:</span>
                  <span className="text-purple-400 ml-2 font-mono">
                    {(Number(block.gasUsed) / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>

              <div className="mt-2 text-xs">
                <span className="text-gray-500">Hash:</span>
                <span className="text-gray-400 ml-2 font-mono break-all">
                  {block.hash.substring(0, 20)}...{block.hash.substring(block.hash.length - 10)}
                </span>
              </div>

              {block.transactions && block.transactions.length > 5 && (
                <div className="mt-2 bg-magenta-500/10 border border-magenta-500/30 rounded px-2 py-1 text-xs">
                  <span className="text-magenta-400 font-bold">
                    ⚡ High Activity - Potential Contract Deployments
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Light Language Legend */}
      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-400 mb-3">🌈 Luxbin Light Language</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.BLOCK_CREATION }} />
            <span className="text-gray-400">Block Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.CONTRACT_DEPLOY }} />
            <span className="text-gray-400">Contract Deploy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.ENERGY_HIGH }} />
            <span className="text-gray-400">High Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.ENERGY_MEDIUM }} />
            <span className="text-gray-400">Medium Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.ENERGY_LOW }} />
            <span className="text-gray-400">Low Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.TRANSACTION }} />
            <span className="text-gray-400">Transaction Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.SYSTEM }} />
            <span className="text-gray-400">System Pure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: LIGHT_LANGUAGE.ERROR }} />
            <span className="text-gray-400">Alert/Error</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-400">
            {blocks.length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Blocks Monitored</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-cyan-400">
            {blocks.reduce((sum, b) => sum + (b.transactions?.length || 0), 0)}
          </div>
          <div className="text-xs text-gray-400 mt-1">Total Transactions</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-400">
            {dnaNodes.filter(n => n.type === 'contract').length}
          </div>
          <div className="text-xs text-gray-400 mt-1">Contract Deployments</div>
        </div>
      </div>
    </div>
  );
}
