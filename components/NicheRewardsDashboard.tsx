"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { formatEther } from 'viem';

// Deployed contract addresses
const NICHE_TOKEN_ADDRESS = '0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe'; // Your deployed Niche token
const REWARD_DISTRIBUTOR_ADDRESS = '0x...'; // TODO: Deploy RewardDistributor and update this

const REWARD_DISTRIBUTOR_ABI = [
  {
    inputs: [],
    name: "claimAirdrop",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "canClaimAirdrop",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserInfo",
    outputs: [
      { name: "deploymentCount", type: "uint256" },
      { name: "totalRewards", type: "uint256" },
      { name: "hasClaimedAirdrop", type: "bool" },
      { name: "isValidatorStatus", type: "bool" },
      { name: "validatorRewardTotal", type: "uint256" },
      { name: "nextDeploymentReward", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getStats",
    outputs: [
      { name: "_rewardsDistributed", type: "uint256" },
      { name: "_maxRewards", type: "uint256" },
      { name: "_remainingRewards", type: "uint256" },
      { name: "_percentDistributed", type: "uint256" },
      { name: "_totalAirdropsClaimed", type: "uint256" },
      { name: "_totalValidatorRewards", type: "uint256" },
      { name: "_contractBalance", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "AIRDROP_AMOUNT",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

const NICHE_TOKEN_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

export function NicheRewardsDashboard() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [showClaimed, setShowClaimed] = useState(false);

  // Read user's NICHE balance
  const { data: nicheBalance } = useReadContract({
    address: NICHE_TOKEN_ADDRESS as `0x${string}`,
    abi: NICHE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  // Read user info
  const { data: userInfo, refetch: refetchUserInfo } = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  // Read global stats
  const { data: globalStats, refetch: refetchStats } = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: 'getStats',
  });

  // Read airdrop amount
  const { data: airdropAmount } = useReadContract({
    address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
    abi: REWARD_DISTRIBUTOR_ABI,
    functionName: 'AIRDROP_AMOUNT',
  });

  // Refetch on success
  useEffect(() => {
    if (isSuccess) {
      setShowClaimed(true);
      refetchUserInfo();
      refetchStats();
      setTimeout(() => setShowClaimed(false), 5000);
    }
  }, [isSuccess, refetchUserInfo, refetchStats]);

  const handleClaimAirdrop = () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    writeContract({
      address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
      abi: REWARD_DISTRIBUTOR_ABI,
      functionName: 'claimAirdrop',
      chainId: base.id,
    });
  };

  const deploymentCount = userInfo ? Number(userInfo[0]) : 0;
  const totalRewards = userInfo ? userInfo[1] : BigInt(0);
  const hasClaimedAirdrop = userInfo ? userInfo[2] : false;
  const isValidator = userInfo ? userInfo[3] : false;
  const validatorRewardTotal = userInfo ? userInfo[4] : BigInt(0);
  const nextDeploymentReward = userInfo ? userInfo[5] : BigInt(0);

  const rewardsDistributed = globalStats ? globalStats[0] : BigInt(0);
  const maxRewards = globalStats ? globalStats[1] : BigInt(0);
  const remainingRewards = globalStats ? globalStats[2] : BigInt(0);
  const percentDistributed = globalStats ? Number(globalStats[3]) : 0;
  const totalAirdropsClaimed = globalStats ? Number(globalStats[4]) : 0;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-4xl">💎</div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            NICHE Rewards Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Earn NICHE tokens for deploying contracts, claiming airdrops & validating
          </p>
        </div>
      </div>

      {!isConnected ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🔗</div>
          <p className="text-yellow-200 font-semibold">
            Connect your wallet to view rewards and claim airdrop
          </p>
        </div>
      ) : (
        <>
          {/* Your Balance */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-400 mb-1">Your NICHE Balance</div>
                <div className="text-4xl font-bold text-yellow-400">
                  {nicheBalance ? Number(formatEther(nicheBalance)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'}
                </div>
                <div className="text-xs text-gray-500 mt-1">NICHE</div>
              </div>
              <div className="text-6xl">💰</div>
            </div>
          </div>

          {/* Airdrop Claim */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">🎁 Free Airdrop</h3>
                <p className="text-gray-400 text-sm">
                  Claim {airdropAmount ? formatEther(airdropAmount) : '1000'} NICHE tokens for free!
                </p>
              </div>
            </div>

            {hasClaimedAirdrop ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-semibold">✅ Airdrop Claimed!</p>
                <p className="text-xs text-gray-400 mt-1">
                  You've already claimed your airdrop
                </p>
              </div>
            ) : (
              <button
                onClick={handleClaimAirdrop}
                disabled={isPending || isConfirming}
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Confirm in wallet...
                  </>
                ) : isConfirming ? (
                  <>
                    <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Claiming...
                  </>
                ) : (
                  '🎁 Claim Free Airdrop'
                )}
              </button>
            )}

            {showClaimed && (
              <div className="mt-4 bg-green-500/20 border border-green-500/50 rounded-lg p-4 animate-pulse">
                <p className="text-green-300 font-bold text-center">
                  🎉 Airdrop Claimed Successfully! Check your balance above.
                </p>
              </div>
            )}
          </div>

          {/* Your Rewards Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-cyan-400">{deploymentCount}</div>
              <div className="text-xs text-gray-400 mt-1">Contracts Deployed</div>
              <div className="text-xs text-gray-500 mt-2">
                Next reward: +{Number(formatEther(nextDeploymentReward)).toFixed(0)} NICHE
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-yellow-400">
                {Number(formatEther(totalRewards)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-gray-400 mt-1">Total Deployment Rewards</div>
            </div>

            {isValidator && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-purple-400">
                  {Number(formatEther(validatorRewardTotal)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-gray-400 mt-1">Validator Rewards</div>
                <div className="text-xs text-green-400 mt-2">✓ Active Validator</div>
              </div>
            )}
          </div>

          {/* How to Earn */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">💡 How to Earn NICHE</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎁</div>
                <div>
                  <div className="font-semibold text-pink-400">Free Airdrop</div>
                  <div className="text-sm text-gray-400">Claim 1,000 NICHE tokens once (above)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚀</div>
                <div>
                  <div className="font-semibold text-cyan-400">Deploy Contracts</div>
                  <div className="text-sm text-gray-400">
                    Earn 500 NICHE base + 50 NICHE bonus per previous deployment<br />
                    <span className="text-xs text-gray-500">(Max 5,000 NICHE per deployment)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <div className="font-semibold text-purple-400">Become a Validator</div>
                  <div className="text-sm text-gray-400">Earn rewards for validating transactions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Stats */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">🌍 Global Reward Pool</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Rewards Distributed</span>
                  <span className="text-white font-bold">{percentDistributed}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${Math.min(percentDistributed, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">
                    {Number(formatEther(rewardsDistributed)).toLocaleString(undefined, { maximumFractionDigits: 0 })} distributed
                  </span>
                  <span className="text-gray-500">
                    {Number(formatEther(maxRewards)).toLocaleString(undefined, { maximumFractionDigits: 0 })} total
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Remaining Rewards</div>
                  <div className="text-lg font-bold text-green-400">
                    {Number(formatEther(remainingRewards)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Airdrops Claimed</div>
                  <div className="text-lg font-bold text-pink-400">
                    {totalAirdropsClaimed.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
