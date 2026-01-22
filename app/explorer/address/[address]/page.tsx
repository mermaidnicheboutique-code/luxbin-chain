"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AddressDetailPage() {
  const params = useParams();
  const address = params.address as string;
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddress();
  }, [address]);

  async function fetchAddress() {
    try {
      const response = await fetch(`/api/explorer/address/${address}`);
      const data = await response.json();
      if (data.balance) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    } finally {
      setLoading(false);
    }
  }

  const balanceInEth = balance ? (parseInt(balance, 16) / 1e18).toFixed(18) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/explorer" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          ← Back to Explorer
        </Link>

        <h1 className="text-4xl font-bold mb-8">Address Details</h1>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="space-y-4">
              <DetailRow label="Address" value={address} mono />
              <DetailRow label="Balance" value={`${balanceInEth} ETH`} />
            </div>
          )}
        </div>
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
