"use client";

import { useAccount } from 'wagmi';
import { useState } from 'react';

export function CoinbaseOnramp() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyClick = () => {
    setIsLoading(true);

    // Use connected wallet address or default
    const destinationAddress = address || "0x66b4627B4Dd73228D24f24E844B6094091875169";

    // Coinbase Onramp URL (updated for 2024)
    const params = new URLSearchParams({
      appId: '695963dcc63ad876c9081f62', // Your Base app ID from metadata
      addresses: JSON.stringify({ [destinationAddress]: ['base'] }),
      assets: JSON.stringify(['ETH', 'USDC']),
      defaultNetwork: 'base',
      defaultExperience: 'buy',
    });

    const onrampUrl = `https://pay.coinbase.com/buy/select-asset?${params.toString()}`;

    // Open in popup window
    const popup = window.open(
      onrampUrl,
      'Coinbase Onramp',
      'width=460,height=730,scrollbars=yes'
    );

    // Reset loading state when popup closes
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-4">💳 Buy with Coinbase</h3>
      <p className="text-gray-300 mb-6">
        Purchase crypto directly with credit card, debit card, or bank transfer through Coinbase
      </p>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-400">✓</span>
          <span className="text-gray-300">Credit/Debit Card</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-400">✓</span>
          <span className="text-gray-300">Bank Transfer (ACH)</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-400">✓</span>
          <span className="text-gray-300">Apple Pay & Google Pay</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-400">✓</span>
          <span className="text-gray-300">Instant Delivery to Base</span>
        </div>
      </div>

      {!isConnected && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-yellow-200">
            💡 Connect your wallet first for direct deposit to your address
          </p>
        </div>
      )}

      {isConnected && address && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-green-200">
            ✅ Funds will be sent to: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
      )}

      <button
        onClick={handleBuyClick}
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Opening Coinbase...
          </>
        ) : (
          <>
            💳 Buy ETH/USDC with Coinbase
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Secure checkout powered by Coinbase Pay • Arrives on Base network
      </p>
    </div>
  );
}
