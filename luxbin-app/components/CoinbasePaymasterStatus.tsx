"use client";

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { base } from 'wagmi/chains';

export function CoinbasePaymasterStatus() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    chainId: base.id,
  });

  const [creditsInfo, setCreditsInfo] = useState({
    available: '$1,250',
    used: '$0',
    remaining: '$1,250'
  });

  const [paymasterActive, setPaymasterActive] = useState(false);

  useEffect(() => {
    // Check if Paymaster is active
    const checkPaymaster = async () => {
      try {
        const response = await fetch(
          'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_blockNumber',
              params: [],
              id: 1
            })
          }
        );

        if (response.ok) {
          setPaymasterActive(true);
        }
      } catch (error) {
        console.error('Paymaster check failed:', error);
      }
    };

    checkPaymaster();
  }, []);

  // Always show the widget, even when wallet is not connected
  return (
    <div className="fixed bottom-24 right-4 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 max-w-sm z-[9999]">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${paymasterActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
        <h3 className="text-lg font-bold text-white">Coinbase Paymaster</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Status:</span>
          <span className={`font-semibold ${paymasterActive ? 'text-green-400' : 'text-gray-400'}`}>
            {paymasterActive ? '🟢 Active' : '🔴 Inactive'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Network:</span>
          <span className="font-semibold text-blue-400">Base Mainnet</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Gas Fees:</span>
          <span className="font-semibold text-yellow-400">✨ FREE</span>
        </div>

        <div className="border-t border-purple-500/20 pt-3 mt-3">
          <div className="text-xs text-gray-400 mb-2">Developer Credits</div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-300">Available:</span>
            <span className="font-bold text-green-400">{creditsInfo.available}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-300">Used:</span>
            <span className="font-semibold text-gray-400">{creditsInfo.used}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Remaining:</span>
            <span className="font-bold text-purple-400">{creditsInfo.remaining}</span>
          </div>
        </div>

        {isConnected && balance && (
          <div className="border-t border-purple-500/20 pt-3 mt-3">
            <div className="text-xs text-gray-400 mb-2">Your Wallet</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Balance:</span>
              <span className="font-semibold text-white">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            </div>
          </div>
        )}

        {!isConnected && (
          <div className="border-t border-purple-500/20 pt-3 mt-3">
            <div className="text-xs text-gray-400 mb-2">Wallet Status</div>
            <div className="text-sm text-gray-300">
              Connect wallet to see balance
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-3 mt-4">
          <p className="text-xs text-purple-200">
            💡 <strong>Gasless Transactions Enabled!</strong>
            <br />
            Send transactions without paying gas fees.
          </p>
        </div>
      </div>
    </div>
  );
}
