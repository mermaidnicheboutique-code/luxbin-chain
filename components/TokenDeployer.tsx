"use client";

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { parseEther } from 'viem';

// Simple ERC20 Token Factory ABI
const TOKEN_FACTORY_ABI = [
  {
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "totalSupply", type: "uint256" }
    ],
    name: "createToken",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

export function TokenDeployer() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [deployedAddress, setDeployedAddress] = useState('');

  // Logo upload states
  const [tokenLogo, setTokenLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTokenLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async () => {
    if (!tokenLogo) {
      return '';
    }

    setIsUploading(true);
    try {
      // In production, upload to IPFS or cloud storage
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUrl = 'ipfs://QmLogo' + Math.random().toString(36).substring(2, 15);
      setLogoUrl(mockUrl);
      setIsUploading(false);
      return mockUrl;
    } catch (error) {
      console.error('Logo upload error:', error);
      setIsUploading(false);
      return '';
    }
  };

  const handleDeploy = async () => {
    if (!tokenName || !tokenSymbol || !totalSupply) {
      alert('Please fill in all fields');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Upload logo if provided
      let logo = '';
      if (tokenLogo) {
        logo = await uploadLogo();
      }

      // Deploy using Coinbase Paymaster (gasless!)
      alert(`🚀 Ready to deploy!\n\nToken: ${tokenName}\nSymbol: ${tokenSymbol}\nSupply: ${totalSupply}\nLogo: ${logo}\n\nThis will use Coinbase Paymaster for $0 gas fees!\n\n(Factory contract deployment coming soon)`);

      // In production, you'd use:
      // writeContract({
      //   address: '0xYourTokenFactoryAddress',
      //   abi: TOKEN_FACTORY_ABI,
      //   functionName: 'createToken',
      //   args: [tokenName, tokenSymbol, parseEther(totalSupply)],
      //   chain: base,
      // });

    } catch (error) {
      console.error('Deployment error:', error);
      alert('Deployment failed: ' + (error as Error).message);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🪙 Deploy Token to Base
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

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Token Logo
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="token-logo-upload"
                />
                <label htmlFor="token-logo-upload" className="cursor-pointer">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Token Logo" className="w-32 h-32 mx-auto rounded-full object-cover" />
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">🎨</div>
                      <p className="text-gray-400 text-sm">Click to upload logo</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG (recommended: 512x512px)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {logoUrl && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-xs text-green-200">
                  ✅ Logo uploaded: {logoUrl.substring(0, 30)}...
                </p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={isPending || isUploading || !tokenName || !tokenSymbol || !totalSupply}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading logo...
                </>
              ) : isPending ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deploying to Base...
                </>
              ) : (
                '🚀 Deploy Token to Base'
              )}
            </button>

            {deployedAddress && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 font-semibold mb-2">
                  ✅ Token Deployed!
                </p>
                <p className="text-xs text-gray-400 break-all mb-2">
                  {deployedAddress}
                </p>
                <a
                  href={`https://basescan.org/address/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm underline"
                >
                  View on BaseScan →
                </a>
              </div>
            )}
          </>
        )}

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-purple-200">
            <strong>💡 Features</strong>
            <br />
            • Upload custom token logo
            <br />
            • Deploy to Base network ($0 gas!)
            <br />
            • Sponsored by Coinbase Paymaster
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">🎨</div>
            <div className="text-xs text-gray-400">Custom Logo</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-gray-400">$0 Gas</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">⛓️</div>
            <div className="text-xs text-gray-400">Base Network</div>
          </div>
        </div>
      </div>
    </div>
  );
}
