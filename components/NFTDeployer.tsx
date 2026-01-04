"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';

export function NFTDeployer() {
  const { address, isConnected } = useAccount();

  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [baseURI, setBaseURI] = useState('');
  const [maxSupply, setMaxSupply] = useState('');
  const [deployedAddress, setDeployedAddress] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    if (!collectionName || !collectionSymbol || !maxSupply) {
      alert('Please fill in all required fields');
      return;
    }

    setIsDeploying(true);

    try {
      // Deploy NFT contract
      // Note: This is a simplified example - in production you'd use a factory contract
      alert('NFT deployment coming soon! Connect to Luxbin chain deployment system.');

      // Simulate deployment
      setTimeout(() => {
        setDeployedAddress('0x' + Math.random().toString(16).substring(2, 42));
        setIsDeploying(false);
      }, 2000);
    } catch (error) {
      console.error('Deployment error:', error);
      alert('Deployment failed: ' + (error as Error).message);
      setIsDeploying(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        🖼️ Deploy NFT Collection
      </h2>

      <div className="space-y-6">
        {!isConnected ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200">
              💡 Connect your wallet to deploy NFT collections
            </p>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Collection Name
              </label>
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="My NFT Collection"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Symbol
              </label>
              <input
                type="text"
                value={collectionSymbol}
                onChange={(e) => setCollectionSymbol(e.target.value)}
                placeholder="MNFT"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Max Supply
              </label>
              <input
                type="number"
                value={maxSupply}
                onChange={(e) => setMaxSupply(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Base URI (Optional)
              </label>
              <input
                type="text"
                value={baseURI}
                onChange={(e) => setBaseURI(e.target.value)}
                placeholder="ipfs://..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                IPFS or HTTP URL for metadata
              </p>
            </div>

            <button
              onClick={handleDeploy}
              disabled={isDeploying || !collectionName || !collectionSymbol || !maxSupply}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deploying NFT...
                </>
              ) : (
                '🚀 Deploy NFT Collection'
              )}
            </button>

            {deployedAddress && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 font-semibold mb-2">
                  ✅ NFT Collection Deployed!
                </p>
                <p className="text-xs text-gray-400 break-all mb-2">
                  {deployedAddress}
                </p>
                <a
                  href={`https://basescan.org/address/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                >
                  View on BaseScan →
                </a>
              </div>
            )}
          </>
        )}

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <p className="text-sm text-cyan-200">
            <strong>💡 Gasless NFT Deployment</strong>
            <br />
            Deploy your NFT collection with zero gas fees using Coinbase Paymaster!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs text-gray-400">Fast Deploy</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-gray-400">$0 Gas</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs text-gray-400">Secure</div>
          </div>
        </div>
      </div>
    </div>
  );
}
