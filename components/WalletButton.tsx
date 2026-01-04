"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showOptions, setShowOptions] = useState(false);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-blue-300 font-mono bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/30">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-4 py-2 rounded-lg bg-[#2979FF] text-white hover:bg-[#1E5FD9] transition-all font-medium shadow-lg hover:shadow-blue-500/50"
      >
        Connect Wallet
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl border border-blue-500/50 overflow-hidden shadow-xl z-50">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => {
                connect({ connector });
                setShowOptions(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-blue-500/20 transition-colors flex items-center gap-3 border-b border-white/5 last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold">
                {connector.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{connector.name}</div>
                <div className="text-xs text-gray-400">
                  {connector.id === 'coinbaseWalletSDK' && 'Smart Wallet'}
                  {connector.id === 'injected' && 'MetaMask & Others'}
                  {connector.id === 'walletConnect' && 'Scan QR Code'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
