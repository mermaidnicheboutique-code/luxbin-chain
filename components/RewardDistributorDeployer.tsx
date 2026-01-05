"use client";

import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { encodeDeployData, parseEther } from 'viem';

// This is a simplified version - you'll need to compile the full contract
const REWARD_DISTRIBUTOR_BYTECODE = '0x608060405234801561000f575f5ffd5b50604051610db1380380610db183398101604081905261002e91610051565b5f80546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556002556100a7565b5f5f60408385031215610072575f5ffd5b82516001600160a01b0381168114610088575f5ffd5b6020939093015192949293505050565b610cfd806100b55f395ff3fe608060405234801561000f575f5ffd5b50600436106101a8575f3560e01c80638da5cb5b116100f7578063c415b95c11610095578063ef09414511610064578063ef094145146103a2578063f2fde38b146103b5578063f44637ba146103c8578063fb1ac0f4146103db575f5ffd5b8063c415b95c14610350578063d49e77cd14610363578063e7a324dc14610376578063e96baed214610389575f5ffd5b8063a69df4b5116100d1578063a69df4b514610303578063b86f20091461030b578063c0e6a22214610314578063c31c9c0714610327575f5ffd5b80638da5cb5b146102ca5780639d8cef9e146102ed578063a457c2d714610300575f5ffd5b80633ccfd60b1161016457806354fd4d501161013e57806354fd4d50146102775780636c9e4c4e1461028f57806370a08231146102a25780637ecebe00146102ca575f5ffd5b80633ccfd60b1461023c57806340c10f191461024457806349df728c14610264575f5ffd5b8063036d0e8314610124578063095ea7b31461016757806318160ddd1461018a57806323b872dd1461019c578063313ce567146101af57806339509351146101c9575f5ffd5b5f5ffd5b6101546101323660046108eb565b6001600160a01b03165f9081526005602052604090205460ff1690565b6040519015158152602001604051809103f35b6101546101753660046108eb565b61050f565b6002545b604051908152602001604051809103f35b6101546101aa3660046108eb565b610572565b60405160128152602001604051809103f35b6101546101d73660046108eb565b6105e0565b6101546101ea366004610913565b61063e565b61018e6101fd366004610913565b610687565b61018e610210366004610913565b6106d6565b61018e61022336600461092f565b6107f5565b61018e610231366004610913565b610848565b610154610893565b610247610904565b610154610252366004610913565b61091c565b610154610972366004610913565b610a27565b6040805180820190915260018152603160f81b602082015261018e565b61018e61029d366004610913565b610a6e565b61018e6102b0366004610913565b6001600160a01b03165f9081526003602052604090205490565b61018e6102d8366004610913565b610a83565b61018e610301366004610951565b610ace565b6101546103103660046108eb565b610b13565b61018e60065481565b61018e610322366004610913565b610b58565b5f5461033a906001600160a01b031681565b6040516001600160a01b039091168152602001604051809103f35b600154610339906001600160a01b031681565b61018e610371366004610913565b610b63565b61018e610384366004610913565b610b6e565b61018e610397366004610913565b610b79565b61018e6103b0366004610913565b610bce565b6101546103c3366004610913565b610bd9565b61018e6103d6366004610913565b610c24565b6103ee6103e9366004610913565b610c4f565b604080519687526020870195909552938501929092521515606084015260808301526001600160a01b031660a082015260c001604051809103f35b5f33610522818585610d17565b5060019392505050565b5f33610539858285610d6b565b610544858585610ddc565b9150' as `0x${string}`;

const NICHE_TOKEN_ADDRESS = '0xe1Ba7479eD38bF73B9c8c543959c78cA6EDC97fe';

export function RewardDistributorDeployer() {
  const { address, isConnected } = useAccount();
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

  const [maxRewards, setMaxRewards] = useState('');
  const [deployedAddress, setDeployedAddress] = useState('');

  const handleDeploy = async () => {
    if (!maxRewards) {
      alert('Please enter max rewards amount');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Calculate 70% of 21 million if user wants default
      const maxRewardsInWei = parseEther(maxRewards);

      // Constructor args: (address _nicheToken, uint256 _maxRewardsToDistribute)
      const args = [NICHE_TOKEN_ADDRESS, maxRewardsInWei];

      // This is a simplified bytecode - the full contract needs to be compiled
      alert('To deploy the Reward Distributor, you need to:\n\n' +
            '1. Compile the DeploymentRewardDistributor.sol contract\n' +
            '2. Get the bytecode from the compilation\n' +
            '3. Use that bytecode here\n\n' +
            'For now, please deploy it manually using Remix or Hardhat with:\n' +
            `- Niche Token Address: ${NICHE_TOKEN_ADDRESS}\n` +
            `- Max Rewards: ${maxRewards} NICHE`);

      // Uncomment when you have the full compiled bytecode:
      // const deployData = encodeDeployData({
      //   abi: REWARD_DISTRIBUTOR_ABI,
      //   bytecode: REWARD_DISTRIBUTOR_BYTECODE,
      //   args: args,
      // });

      // sendTransaction({
      //   to: null,
      //   data: deployData,
      //   chainId: base.id,
      // });

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
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
        💎 Deploy Reward Distributor
      </h2>

      <div className="space-y-6">
        {!isConnected ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200">
              💡 Connect your wallet to deploy the reward distributor
            </p>
          </div>
        ) : (
          <>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                <strong>📝 Configuration:</strong>
                <br />
                • Niche Token: <span className="font-mono text-xs">{NICHE_TOKEN_ADDRESS}</span>
                <br />
                • Network: Base
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Max Rewards to Distribute (70% of supply recommended)
              </label>
              <input
                type="number"
                value={maxRewards}
                onChange={(e) => setMaxRewards(e.target.value)}
                placeholder="14700000 (70% of 21M)"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Recommended: 14,700,000 NICHE (70% of 21 million total supply)
              </p>
            </div>

            {hash && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-xs text-blue-200">
                  ⏳ Transaction: {hash.substring(0, 10)}...{hash.substring(hash.length - 8)}
                </p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={isPending || isConfirming || !maxRewards}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
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
                '🚀 View Deployment Instructions'
              )}
            </button>

            {deployedAddress && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200 font-semibold mb-2">
                  ✅ Reward Distributor Deployed!
                </p>
                <p className="text-xs text-gray-400 break-all mb-2">
                  Contract: {deployedAddress}
                </p>
                <p className="text-xs text-yellow-200 bg-yellow-500/10 border border-yellow-500/30 rounded p-2 mt-2">
                  ⚠️ Important: Update REWARD_DISTRIBUTOR_ADDRESS in NicheRewardsDashboard.tsx with this address
                </p>
                <a
                  href={`https://basescan.org/address/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm underline block mt-2"
                >
                  View on BaseScan →
                </a>
              </div>
            )}

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-sm text-purple-200">
                <strong>💡 Manual Deployment Steps:</strong>
                <br />
                <br />
                1. Go to Remix IDE: <a href="https://remix.ethereum.org" target="_blank" rel="noopener noreferrer" className="underline">remix.ethereum.org</a>
                <br />
                2. Copy <code className="bg-white/10 px-1 rounded">DeploymentRewardDistributor.sol</code> from contracts folder
                <br />
                3. Compile the contract
                <br />
                4. Deploy with:
                <br />
                   • Token Address: <code className="bg-white/10 px-1 rounded text-xs">{NICHE_TOKEN_ADDRESS}</code>
                <br />
                   • Max Rewards: <code className="bg-white/10 px-1 rounded">{maxRewards || '14700000'} * 10^18</code>
                <br />
                <br />
                5. Copy deployed address and update <code className="bg-white/10 px-1 rounded">NicheRewardsDashboard.tsx</code>
                <br />
                6. Transfer NICHE tokens to the deployed contract
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-sm text-orange-200">
                <strong>⚠️ After Deployment:</strong>
                <br />
                • Transfer {maxRewards || '14,700,000'} NICHE to the reward contract
                <br />
                • Users can then claim airdrops and earn rewards for deployments!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
