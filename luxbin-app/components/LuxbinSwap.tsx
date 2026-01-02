"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther } from "viem";
import { LuxbinTokenLogo } from "./AnimatedTokenLogo";

// Contract addresses (update these after deployment)
const LUXBIN_TOKEN = "0x66b4627B4Dd73228D24f24E844B6094091875169";
const SWAP_CONTRACT = "0x0000000000000000000000000000000000000000"; // TODO: Deploy and update

const SWAP_ABI = [
  {
    inputs: [],
    name: "swapEthToLuxbin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "ethAmount", type: "uint256" }],
    name: "previewEthToLuxbin",
    outputs: [{ name: "luxbinAmount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      { name: "luxbinBalance", type: "uint256" },
      { name: "ethBalance", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ethToLuxbinRate",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function LuxbinSwap() {
  const { address, isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState("");
  const [luxbinAmount, setLuxbinAmount] = useState("0");
  const [isCalculating, setIsCalculating] = useState(false);

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  // Get exchange rate
  const { data: rate } = useReadContract({
    address: SWAP_CONTRACT as `0x${string}`,
    abi: SWAP_ABI,
    functionName: "ethToLuxbinRate",
  });

  // Get reserves
  const { data: reserves } = useReadContract({
    address: SWAP_CONTRACT as `0x${string}`,
    abi: SWAP_ABI,
    functionName: "getReserves",
  });

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Calculate LUXBIN amount when ETH amount changes
  useEffect(() => {
    if (!ethAmount || !rate) {
      setLuxbinAmount("0");
      return;
    }

    try {
      const eth = parseEther(ethAmount);
      const luxbin = (eth * rate) / parseEther("1");
      setLuxbinAmount(formatEther(luxbin));
    } catch {
      setLuxbinAmount("0");
    }
  }, [ethAmount, rate]);

  const handleSwap = async () => {
    if (!ethAmount || !isConnected) return;

    try {
      writeContract({
        address: SWAP_CONTRACT as `0x${string}`,
        abi: SWAP_ABI,
        functionName: "swapEthToLuxbin",
        value: parseEther(ethAmount),
      });
    } catch (err) {
      console.error("Swap error:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setEthAmount("");
      setLuxbinAmount("0");
    }
  }, [isSuccess]);

  if (!isConnected) {
    return (
      <div className="text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <p className="text-gray-400 mb-4">Connect your wallet to swap ETH for LUXBIN</p>
        <p className="text-sm text-gray-500">Click "Connect Wallet" in the top right corner</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Swap ETH → LUXBIN</h3>

        {/* Exchange Rate */}
        {rate && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Exchange Rate</p>
            <p className="text-lg font-bold text-purple-300">
              1 ETH = {formatEther(rate)} LUX
            </p>
          </div>
        )}

        {/* Reserves */}
        {reserves && (
          <div className="mb-6 p-4 bg-white/5 rounded-xl">
            <p className="text-sm text-gray-400 mb-2">Available Liquidity</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">
                {Number(formatEther(reserves[0])).toLocaleString()} LUX
              </span>
              <span className="text-gray-300">
                {Number(formatEther(reserves[1])).toFixed(4)} ETH
              </span>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block">You Pay</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
            <input
              type="number"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-white text-2xl outline-none"
              step="0.001"
            />
            <div className="flex items-center gap-2">
              {/* ETH logo - using a simple gradient circle */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
              <span className="text-gray-300 font-semibold">ETH</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-center my-4">
          <div className="text-3xl text-purple-400">↓</div>
        </div>

        {/* Output */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-2 block">You Receive</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
            <div className="flex-1 text-white text-2xl">
              {Number(luxbinAmount).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2">
              {/* Animated LUXBIN token logo using background video */}
              <LuxbinTokenLogo size={32} animated={true} videoIndex={2} />
              <span className="text-purple-300 font-semibold">LUX</span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!ethAmount || isPending || isConfirming}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Confirming..." : isConfirming ? "Swapping..." : "Swap Now"}
        </button>

        {/* Status Messages */}
        {isSuccess && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
            <p className="text-green-300 text-sm text-center">
              ✅ Swap successful! LUXBIN is in your wallet
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
            <p className="text-red-300 text-sm text-center">
              ❌ {error.message}
            </p>
          </div>
        )}

        {/* Transaction Hash */}
        {hash && (
          <div className="mt-4 p-3 bg-white/5 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Transaction</p>
            <a
              href={`https://basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 text-sm font-mono break-all"
            >
              {hash.slice(0, 10)}...{hash.slice(-8)}
            </a>
          </div>
        )}
      </div>

      {/* Quick amounts */}
      <div className="flex gap-2 mt-4 justify-center">
        {["0.01", "0.05", "0.1", "0.5"].map((amount) => (
          <button
            key={amount}
            onClick={() => setEthAmount(amount)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm transition-colors"
          >
            {amount} ETH
          </button>
        ))}
      </div>
    </div>
  );
}
