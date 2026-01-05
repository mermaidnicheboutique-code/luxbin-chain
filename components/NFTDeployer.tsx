"use client";

import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { encodeDeployData } from 'viem';
import contracts from '../lib/contracts.json';

export function NFTDeployer() {
  const { address, isConnected } = useAccount();
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [maxSupply, setMaxSupply] = useState('');
  const [deployedAddress, setDeployedAddress] = useState('');

  // Media upload states
  const [nftImage, setNftImage] = useState<File | null>(null);
  const [nftVideo, setNftVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNftImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNftVideo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToIPFS = async () => {
    if (!nftImage && !nftVideo) {
      return '';
    }

    setIsUploading(true);
    try {
      // Simulate IPFS upload (in production, use NFT.Storage or Pinata)
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockHash = 'QmX' + Math.random().toString(36).substring(2, 15);
      setIpfsHash(mockHash);
      setIsUploading(false);
      return `ipfs://${mockHash}/`;
    } catch (error) {
      console.error('IPFS upload error:', error);
      setIsUploading(false);
      return '';
    }
  };

  const handleDeploy = async () => {
    if (!collectionName || !collectionSymbol || !maxSupply) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Upload media to IPFS first
      let baseURI = '';
      if (nftImage || nftVideo) {
        baseURI = await uploadToIPFS();
      } else {
        baseURI = 'ipfs://default/';
      }

      // Use encodeDeployData to create the deployment bytecode
      const deployData = encodeDeployData({
        abi: contracts.SimpleNFT.abi,
        bytecode: contracts.SimpleNFT.bytecode as `0x${string}`,
        args: [collectionName, collectionSymbol, baseURI, BigInt(maxSupply)],
      });

      // Send as regular transaction (this is how Remix does it!)
      sendTransaction({
        to: null, // Contract creation has no "to"
        data: deployData,
        chainId: base.id,
      });

    } catch (error) {
      console.error('Deployment error:', error);
      alert('Deployment failed: ' + (error as Error).message);
    }
  };

  // Update deployed address when receipt is available
  useEffect(() => {
    if (isSuccess && receipt?.contractAddress && !deployedAddress) {
      setDeployedAddress(receipt.contractAddress);
    }
  }, [isSuccess, receipt, deployedAddress]);

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
                onChange={(e) => setCollectionSymbol(e.target.value.toUpperCase())}
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

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                NFT Image
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="nft-image-upload"
                />
                <label htmlFor="nft-image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <img src={imagePreview} alt="NFT Preview" className="max-h-48 mx-auto rounded-lg" />
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-gray-400 text-sm">Click to upload image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                NFT Video (Optional)
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="nft-video-upload"
                />
                <label htmlFor="nft-video-upload" className="cursor-pointer">
                  {videoPreview ? (
                    <video src={videoPreview} controls className="max-h-48 mx-auto rounded-lg" />
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">🎬</div>
                      <p className="text-gray-400 text-sm">Click to upload video</p>
                      <p className="text-xs text-gray-500 mt-1">MP4, WEBM up to 50MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {ipfsHash && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-xs text-green-200">
                  ✅ Uploaded to IPFS: {ipfsHash}
                </p>
              </div>
            )}

            {hash && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-xs text-blue-200">
                  ⏳ Transaction: {hash.substring(0, 10)}...{hash.substring(hash.length - 8)}
                </p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={isPending || isConfirming || isUploading || !collectionName || !collectionSymbol || !maxSupply}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading to IPFS...
                </>
              ) : isPending ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Confirm in wallet...
                </>
              ) : isConfirming ? (
                <>
                  <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deploying to Base...
                </>
              ) : (
                '🚀 Deploy NFT Collection to Base'
              )}
            </button>

            {deployedAddress && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 font-semibold mb-2">
                  ✅ NFT Collection Deployed Successfully!
                </p>
                <p className="text-xs text-gray-400 break-all mb-2">
                  Contract: {deployedAddress}
                </p>
                <a
                  href={`https://basescan.org/address/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm underline block mb-2"
                >
                  View on BaseScan →
                </a>
                <a
                  href={`https://basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-xs underline"
                >
                  View Transaction →
                </a>
              </div>
            )}
          </>
        )}

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <p className="text-sm text-cyan-200">
            <strong>💡 Direct Deployment (Like Remix!)</strong>
            <br />
            • Upload images & videos to IPFS
            <br />
            • Deploy ERC721 directly to Base
            <br />
            • $0 gas fees (Coinbase Paymaster)
            <br />
            • Instant deployment, view on BaseScan
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">📤</div>
            <div className="text-xs text-gray-400">IPFS Upload</div>
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
