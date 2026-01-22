"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Block {
  number: string;
  hash: string;
  parentHash: string;
  timestamp: string;
  transactions: string[];
  miner: string;
  gasUsed: string;
  gasLimit: string;
  difficulty: string;
  nonce: string;
}

export default function BlockDetailPage() {
  const params = useParams();
  const blockNumber = params.number as string;
  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlock();
  }, [blockNumber]);

  async function fetchBlock() {
    try {
      const response = await fetch(`/api/explorer/block/${blockNumber}`);
      const data = await response.json();
      if (data.block) {
        setBlock(data.block);
      }
    } catch (error) {
      console.error("Error fetching block:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white flex items-center justify-center">
        <div className="text-xl">Loading block...</div>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Block not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/explorer" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          ← Back to Explorer
        </Link>

        <h1 className="text-4xl font-bold mb-8">Block #{parseInt(block.number, 16)}</h1>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <DetailRow label="Block Height" value={parseInt(block.number, 16).toString()} />
            <DetailRow label="Block Hash" value={block.hash} mono />
            <DetailRow label="Parent Hash" value={block.parentHash} mono />
            <DetailRow
              label="Timestamp"
              value={new Date(parseInt(block.timestamp, 16) * 1000).toLocaleString()}
            />
            <DetailRow label="Transactions" value={block.transactions.length.toString()} />
            <DetailRow label="Miner" value={block.miner} mono />
            <DetailRow label="Gas Used" value={parseInt(block.gasUsed, 16).toLocaleString()} />
            <DetailRow label="Gas Limit" value={parseInt(block.gasLimit, 16).toLocaleString()} />
          </div>
        </div>

        {block.transactions.length > 0 && (
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Transactions</h2>
            <div className="space-y-2">
              {block.transactions.map((txHash: string, index: number) => (
                <Link
                  key={index}
                  href={`/explorer/tx/${txHash}`}
                  className="block bg-black/60 hover:bg-black/80 border border-white/10 rounded-lg p-4 transition-all font-mono text-sm"
                >
                  {txHash}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center py-3 border-b border-white/10 last:border-0">
      <div className="text-gray-400 font-semibold md:w-1/4 mb-1 md:mb-0">{label}</div>
      <div className={`text-white break-all ${mono ? "font-mono text-sm" : ""}`}>{value}</div>
    </div>
  );
}
