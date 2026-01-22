"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RPC_URL = process.env.NEXT_PUBLIC_NICHE_RPC || "http://localhost:8545";
const CHAIN_ID = 901;

interface Block {
  number: string;
  hash: string;
  timestamp: string;
  transactions: string[];
  miner: string;
  gasUsed: string;
}

export default function ExplorerPage() {
  const searchParams = useSearchParams();
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchLatestBlocks() {
    try {
      const response = await fetch("/api/explorer/blocks");
      const data = await response.json();
      if (data.blocks) {
        setLatestBlocks(data.blocks);
      }
    } catch (error) {
      console.error("Error fetching blocks:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.startsWith("0x") && searchQuery.length === 66) {
      window.location.href = `/explorer/tx/${searchQuery}`;
    } else if (searchQuery.startsWith("0x") && searchQuery.length === 42) {
      window.location.href = `/explorer/address/${searchQuery}`;
    } else if (!isNaN(Number(searchQuery))) {
      window.location.href = `/explorer/block/${searchQuery}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white">
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/10 via-[#764ba2]/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Niche Network Explorer
          </h1>
          <p className="text-xl text-gray-300">Chain ID: {CHAIN_ID}</p>
        </header>

        {/* Search Bar */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Address / Tx Hash / Block Number"
              className="flex-1 bg-black/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Latest Blocks */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Latest Blocks</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading blocks...</div>
          ) : latestBlocks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No blocks yet</div>
          ) : (
            <div className="space-y-4">
              {latestBlocks.map((block) => (
                <Link
                  key={block.hash}
                  href={`/explorer/block/${parseInt(block.number, 16)}`}
                  className="block bg-black/60 hover:bg-black/80 border border-white/10 rounded-lg p-4 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-blue-400 font-bold text-lg">
                          Block #{parseInt(block.number, 16)}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Date(parseInt(block.timestamp, 16) * 1000).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 font-mono mb-1">
                        Hash: {block.hash.slice(0, 16)}...{block.hash.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {block.transactions.length} transaction{block.transactions.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Gas Used</div>
                      <div className="text-white font-mono">{parseInt(block.gasUsed, 16).toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Network Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-gray-400 mb-2">Chain ID</div>
            <div className="text-2xl font-bold text-purple-400">{CHAIN_ID}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-gray-400 mb-2">Network</div>
            <div className="text-2xl font-bold text-blue-400">Niche Network</div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-gray-400 mb-2">Latest Block</div>
            <div className="text-2xl font-bold text-green-400">
              {latestBlocks.length > 0 ? `#${parseInt(latestBlocks[0].number, 16)}` : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
