"use client";

import { useState } from 'react';
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { parseEther, formatEther } from 'viem';

const NICHE_TOKEN_ADDRESS = '0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe';
// You'll deploy a simple swap contract or use your own address to manually distribute
const SWAP_RECEIVER_ADDRESS = '0x...'; // Your address to receive ETH and send NICHE

export function ETHtoNICHESwap() {
  const { address, isConnected } = useAccount();
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [ethAmount, setEthAmount] = useState('');
  const [nicheAmount, setNicheAmount] = useState('0');

  const EXCHANGE_RATE = 10000; // 1 ETH = 10,000 NICHE (adjust as needed)

  // Get user's ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
    chainId: base.id,
  });

  const handleETHChange = (value: string) => {
    setEthAmount(value);
    if (value && !isNaN(Number(value))) {
      const niche = Number(value) * EXCHANGE_RATE;
      setNicheAmount(niche.toLocaleString());
    } else {
      setNicheAmount('0');
    }
  };

  const handleSwap = async () => {
    if (!ethAmount || Number(ethAmount) <= 0) {
      alert('Please enter an ETH amount');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    try {
      // For now, send ETH to your address
      // You'll manually send NICHE back to the user
      // Later, deploy a proper swap contract

      sendTransaction({
        to: address, // Sending to yourself for manual distribution
        value: parseEther(ethAmount),
        chainId: base.id,
      });

    } catch (error) {
      console.error('Swap error:', error);
      alert('Swap failed: ' + (error as Error).message);
    }
  };

  const handleBridge = () => {
    // Instructions for bridging from Sepolia to Base
    window.open('https://bridge.base.org/', '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-4xl">🔄</div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ETH → NICHE Swap
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Convert your test ETH to NICHE tokens
          </p>
        </div>
      </div>

      {!isConnected ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🔗</div>
          <p className="text-yellow-200 font-semibold">
            Connect your wallet to swap ETH for NICHE
          </p>
        </div>
      ) : (
        <>
          {/* Bridge Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-blue-300 mb-2">🌉 Step 1: Bridge to Base</h3>
            <p className="text-sm text-gray-400 mb-3">
              First, bridge your ETH from Sepolia testnet to Base network
            </p>
            <button
              onClick={handleBridge}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm hover:bg-blue-500 transition-colors"
            >
              Open Base Bridge →
            </button>
          </div>

          {/* Balance Display */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-400">Your Balance (Base)</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {ethBalance ? Number(formatEther(ethBalance.value)).toFixed(4) : '0.0000'} ETH
                </div>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          {/* Swap Interface */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="block text-xs text-gray-400 mb-2">You Send</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.001"
                  value={ethAmount}
                  onChange={(e) => handleETHChange(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-2xl font-bold text-white outline-none"
                />
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <span className="text-xl">Ξ</span>
                  <span className="font-bold">ETH</span>
                </div>
              </div>
              {ethBalance && (
                <button
                  onClick={() => handleETHChange(formatEther(ethBalance.value))}
                  className="text-xs text-purple-400 hover:text-purple-300 mt-2"
                >
                  Max: {Number(formatEther(ethBalance.value)).toFixed(4)} ETH
                </button>
              )}
            </div>

            <div className="flex justify-center">
              <div className="text-2xl">⬇️</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-4">
              <label className="block text-xs text-gray-400 mb-2">You Receive (Estimated)</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  {nicheAmount}
                </div>
                <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-lg">
                  <span className="text-xl">💎</span>
                  <span className="font-bold text-purple-300">NICHE</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Rate: 1 ETH = {EXCHANGE_RATE.toLocaleString()} NICHE
              </p>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={isPending || isConfirming || !ethAmount || Number(ethAmount) <= 0}
            className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Confirm in wallet...
              </>
            ) : isConfirming ? (
              <>
                <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing swap...
              </>
            ) : (
              '🔄 Swap ETH for NICHE'
            )}
          </button>

          {isSuccess && (
            <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-300 font-semibold mb-2">
                ✅ Swap Initiated!
              </p>
              <p className="text-xs text-gray-400">
                Your NICHE tokens will be sent manually. Please wait for confirmation.
              </p>
              {hash && (
                <a
                  href={`https://basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-xs underline block mt-2"
                >
                  View Transaction →
                </a>
              )}
            </div>
          )}

          {/* Manual Distribution Info */}
          <div className="mt-6 bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h3 className="font-bold text-orange-300 mb-2">📝 Manual Distribution Process</h3>
            <ol className="text-sm text-gray-400 space-y-2">
              <li>1. Bridge ETH from Sepolia to Base using the bridge above</li>
              <li>2. Enter amount of ETH to swap for NICHE</li>
              <li>3. Click "Swap ETH for NICHE" (sends ETH to you)</li>
              <li>4. Manually send NICHE tokens back to the user's address</li>
              <li>5. User can then use NICHE for rewards!</li>
            </ol>
          </div>

          {/* Automated Swap Contract Info */}
          <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h3 className="font-bold text-purple-300 mb-2">⚡ Future: Automated Swap Contract</h3>
            <p className="text-sm text-gray-400">
              Deploy a swap contract that automatically exchanges ETH for NICHE at a fixed rate.
              This would enable instant, trustless swaps without manual intervention.
            </p>
          </div>

          {/* Distribution Address */}
          <div className="mt-4 bg-gray-500/10 border border-gray-500/30 rounded-lg p-3">
            <p className="text-xs text-gray-400">
              <strong>NICHE Token:</strong>
              <br />
              <code className="text-purple-300 text-xs break-all">{NICHE_TOKEN_ADDRESS}</code>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
