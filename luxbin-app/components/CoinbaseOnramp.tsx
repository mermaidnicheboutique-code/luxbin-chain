"use client";



export function CoinbaseOnramp() {
  const handleBuyClick = () => {
    // Coinbase Onramp widget URL with LUXBIN token address on Base network
    const onrampUrl = `https://pay.coinbase.com/buy/select-asset?appId=luxbin-app&addresses={"0x66b4627B4Dd73228D24f24E844B6094091875169":["base"]}&assets=["USDC","ETH"]&defaultNetwork=base`;

    window.open(onrampUrl, '_blank', 'width=500,height=700');
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-4">💳 Buy with Coinbase</h3>
      <p className="text-gray-300 mb-6">
        Purchase LUXBIN tokens directly with credit card, debit card, or bank transfer through Coinbase
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
          <span className="text-gray-300">Instant Delivery</span>
        </div>
      </div>

      <button
        onClick={handleBuyClick}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
      >
        Buy LUXBIN with Coinbase
      </button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Secure checkout powered by Coinbase Pay
      </p>
    </div>
  );
}
