"use client";

import { useState } from 'react';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export function TokenDeployer() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [deployedAddress, setDeployedAddress] = useState('');

  // ERC20 Token Bytecode (simple implementation)
  const ERC20_ABI = [
    {
      inputs: [
        { name: "_name", type: "string" },
        { name: "_symbol", type: "string" },
        { name: "_totalSupply", type: "uint256" }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ];

  const handleDeploy = async () => {
    if (!tokenName || !tokenSymbol || !totalSupply) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Deploy token contract
      // Note: This is a simplified example - in production you'd use a factory contract
      alert('Token deployment coming soon! Connect to Luxbin chain deployment system.');
    } catch (error) {
      console.error('Deployment error:', error);
      alert('Deployment failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🪙 Deploy Token to Luxbin Chain
      </h2>

      <div className="space-y-6">
        {!isConnected ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200">
              💡 Connect your wallet to deploy tokens
            </p>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Token Name
              </label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="My Token"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                placeholder="MTK"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Total Supply
              </label>
              <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                placeholder="1000000"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleDeploy}
              disabled={isPending || !tokenName || !tokenSymbol || !totalSupply}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deploying...
                </>
              ) : (
                '🚀 Deploy Token'
              )}
            </button>

            {deployedAddress && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 font-semibold mb-2">
                  ✅ Token Deployed!
                </p>
                <p className="text-xs text-gray-400 break-all">
                  {deployedAddress}
                </p>
              </div>
            )}
          </>
        )}

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-purple-200">
            <strong>💡 Gasless Deployment</strong>
            <br />
            Token deployment sponsored by your Coinbase credits - users pay $0 gas!
          </p>
        </div>
      </div>
    </div>
  );
}
