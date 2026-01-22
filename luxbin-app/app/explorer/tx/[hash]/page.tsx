"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Transaction {
  hash: string;
  blockNumber: string;
  blockHash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  input: string;
  nonce: string;
}

export default function TransactionDetailPage() {
  const params = useParams();
  const txHash = params.hash as string;
  const [tx, setTx] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransaction();
  }, [txHash]);

  async function fetchTransaction() {
    try {
      const response = await fetch(`/api/explorer/tx/${txHash}`);
      const data = await response.json();
      if (data.transaction) {
        setTx(data.transaction);
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white flex items-center justify-center">
        <div className="text-xl">Loading transaction...</div>
      </div>
    );
  }

  if (!tx) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Transaction not found</div>
      </div>
    );
  }

  const valueInEth = (parseInt(tx.value, 16) / 1e18).toFixed(18);
  const gasPriceInGwei = (parseInt(tx.gasPrice, 16) / 1e9).toFixed(9);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/explorer" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          ← Back to Explorer
        </Link>

        <h1 className="text-4xl font-bold mb-8">Transaction Details</h1>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <DetailRow label="Transaction Hash" value={tx.hash} mono />
            <DetailRow
              label="Block"
              value={
                <Link
                  href={`/explorer/block/${parseInt(tx.blockNumber, 16)}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  #{parseInt(tx.blockNumber, 16)}
                </Link>
              }
            />
            <DetailRow label="Block Hash" value={tx.blockHash} mono />
            <DetailRow
              label="From"
              value={
                <Link
                  href={`/explorer/address/${tx.from}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {tx.from}
                </Link>
              }
              mono
            />
            <DetailRow
              label="To"
              value={
                tx.to ? (
                  <Link
                    href={`/explorer/address/${tx.to}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {tx.to}
                  </Link>
                ) : (
                  <span className="text-gray-400">Contract Creation</span>
                )
              }
              mono
            />
            <DetailRow label="Value" value={`${valueInEth} ETH`} />
            <DetailRow label="Gas Limit" value={parseInt(tx.gas, 16).toLocaleString()} />
            <DetailRow label="Gas Price" value={`${gasPriceInGwei} Gwei`} />
            <DetailRow label="Nonce" value={parseInt(tx.nonce, 16).toString()} />
            {tx.input && tx.input !== "0x" && (
              <DetailRow label="Input Data" value={tx.input} mono />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: any; mono?: boolean }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start py-3 border-b border-white/10 last:border-0">
      <div className="text-gray-400 font-semibold md:w-1/4 mb-1 md:mb-0">{label}</div>
      <div className={`text-white break-all ${mono ? "font-mono text-sm" : ""}`}>{value}</div>
    </div>
  );
}
