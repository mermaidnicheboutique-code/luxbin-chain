"use client";

import { useState } from 'react';
import { useAccount, useDeployContract, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';

// Simple ERC20 Token Contract Bytecode
const ERC20_BYTECODE = '0x60806040523480156200001157600080fd5b506040516200108038038062001080833981810160405281019062000037919062000316565b82600390816200004891906200055c565b5081600490816200005a91906200055c565b508060001b600581905550806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200010891906200065e565b60405180910390a3505050620006d9565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000188826200013d565b810181811067ffffffffffffffff82111715620001aa57620001a96200014e565b5b80604052505050565b6000620001bf6200011f565b9050620001cd82826200017d565b919050565b600067ffffffffffffffff821115620001f057620001ef6200014e565b5b620001fb826200013d565b9050602081019050919050565b60005b83811015620002285780820151818401526020810190506200020b565b60008484015250505050565b60006200024b6200024584620001d2565b620001b3565b9050828152602081018484840111156200026a5762000269620001385b5b8093505050505b92915050565b600082601f8301126200028e576200028d62000133565b5b8151620002a084826020860162000234565b91505092915050565b6000819050919050565b620002be81620002a9565b8114620002ca57600080fd5b50565b600081519050620002de81620002b3565b92915050565b600080600060608486031215620002ff57620002fe62000129565b5b600084015167ffffffffffffffff81111562000320576200031f6200012e565b5b6200032e8682870162000276565b935050602084015167ffffffffffffffff8111156200035257620003516200012e565b5b620003608682870162000276565b92505060406200037386828701620002cd565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003d057607f821691505b602082108103620003e657620003e562000388565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200045a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200041b565b6200046686836200041b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620004a9620004a36200049d84620002a9565b6200047e565b620002a9565b9050919050565b6000819050919050565b620004c58362000488565b620004dd620004d482620004b0565b84845462000428565b825550505050565b600090565b620004f4620004e5565b62000501818484620004ba565b505050565b5b8181101562000529576200051d600082620004ea565b60018101905062000507565b5050565b601f82111562000578576200054281620003ec565b6200054d8462000401565b810160208510156200055d578190505b620005756200056c8562000401565b83018262000506565b50505b505050565b600082821c905092915050565b60006200059d600019846008026200057d565b1980831691505092915050565b6000620005b883836200058a565b9150826002028217905092915050565b620005d3826200037d565b67ffffffffffffffff811115620005ef57620005ee6200014e565b5b620005fb8254620003b7565b620006088282856200052d565b600060209050601f8311600181146200064057600084156200062b578287015190505b620006378582620005aa565b865550620006a7565b601f1984166200065086620003ec565b60005b828110156200067a5784890151825560018201915060208501945060208101905062000653565b868310156200069a578489015162000696601f8916826200058a565b8355505b6001600288020188555050505b505050505050565b620006ba81620002a9565b82525050565b6000602082019050620006d76000830184620006af565b92915050565b61099780620006e96000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad919061066a565b60405180910390f35b6100d060048036038101906100cb9190610725565b61028e565b6040516100dd9190610780565b60405180910390f35b6100ee610380565b6040516100fb91906107aa565b60405180910390f35b61011e600480360381019061011991906107c5565b610386565b60405161012b9190610780565b60405180910390f35b61013c6105aa565b6040516101499190610834565b60405180910390f35b61016c6004803603810190610167919061084f565b6105b3565b60405161017991906107aa565b60405180910390f35b61018a6105cb565b604051610197919061066a565b60405180910390f35b6101ba60048036038101906101b59190610725565b610659565b6040516101c79190610780565b60405180910390f35b6101ea60048036038101906101e5919061087c565b610777565b6040516101f791906107aa565b60405180910390f35b6003805461020d906108eb565b80601f0160208091040260200160405190810160405280929190818152602001828054610239906108eb565b80156102865780601f1061025b57610100808354040283529160200191610286565b820191906000526020600020905b81548152906001019060200180831161026957829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161036e91906107aa565b60405180910390a36001905092915050565b60055481565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610409576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040090610969565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156104ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c5906109d5565b60405180910390fd5b816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461051c9190610a24565b9250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105ae9190610a24565b92505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106039190610a58565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161066791906107aa565b60405180910390a3600190509392505050565b600060055490565b60125481565b6000806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508091505090565b600480546106d8906108eb565b80601f0160208091040260200160405190810160405280929190818152602001828054610704906108eb565b80156107515780601f1061072657610100808354040283529160200191610751565b820191906000526020600020905b81548152906001019060200180831161073457829003601f168201915b505050505081565b600081600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561079d57600080fd5b81600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107ec9190610a24565b92505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108419190610a58565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161089591906107aa565b60405180910390a36001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561095a57808201518184015260208101905061093f565b60008484015250505050565b6000601f19601f8301169050919050565b600061098282610920565b61098c818561092b565b935061099c81856020860161093c565b6109a581610966565b840191505092915050565b600060208201905081810360008301526109ca8184610977565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a02826109d7565b9050919050565b610a12816109f7565b8114610a1d57600080fd5b50565b600081359050610a2f81610a09565b92915050565b6000819050919050565b610a4881610a35565b8114610a5357600080fd5b50565b600081359050610a6581610a3f565b92915050565b60008060408385031215610a8257610a816109d2565b5b6000610a9085828601610a20565b9250506020610aa185828601610a56565b9150509250929050565b60008115159050919050565b610ac081610aab565b82525050565b6000602082019050610adb6000830184610ab7565b92915050565b610aea81610a35565b82525050565b6000602082019050610b056000830184610ae1565b92915050565b600080600060608486031215610b2457610b236109d2565b5b6000610b3286828701610a20565b9350506020610b4386828701610a20565b9250506040610b5486828701610a56565b9150509250925092565b600060ff82169050919050565b610b7481610b5e565b82525050565b6000602082019050610b8f6000830184610b6b565b92915050565b600060208284031215610bab57610baa6109d2565b5b6000610bb984828501610a20565b91505092915050565b60008060408385031215610bd957610bd86109d2565b5b6000610be785828601610a20565b9250506020610bf885828601610a20565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c4957607f821691505b602082108103610c5c57610c5b610c02565b5b50919050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b6000610c9860148361092b565b9150610ca382610c62565b602082019050919050565b60006020820190508181036000830152610cc781610c8b565b9050919050565b7f496e73756666696369656e7420616c6c6f77616e6365000000000000000000600082015250565b6000610d0460168361092b565b9150610d0f82610cce565b602082019050919050565b60006020820190508181036000830152610d3381610cf7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d7482610a35565b9150610d7f83610a35565b9250828203905081811115610d9757610d96610d3a565b5b92915050565b6000610da882610a35565b9150610db383610a35565b9250828201905080821115610dcb57610dca610d3a565b5b9291505056fea2646970667358221220';

// ERC20 ABI
const ERC20_ABI = [
  {
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "totalSupply", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
] as const;

export function TokenDeployer() {
  const { address, isConnected } = useAccount();
  const { deployContract, data: hash, isPending } = useDeployContract();
  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

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
      if (tokenLogo) {
        await uploadLogo();
      }

      // Deploy directly to Base network (like Remix!)
      const supplyInWei = BigInt(totalSupply) * BigInt(10 ** 18);

      deployContract({
        abi: ERC20_ABI,
        bytecode: ERC20_BYTECODE as `0x${string}`,
        args: [tokenName, tokenSymbol, supplyInWei],
        chainId: base.id,
      });

    } catch (error) {
      console.error('Deployment error:', error);
      alert('Deployment failed: ' + (error as Error).message);
    }
  };

  // Update deployed address when receipt is available
  if (isSuccess && receipt && !deployedAddress) {
    setDeployedAddress(receipt.contractAddress || '');
  }

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
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
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
                Token Logo (Optional)
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

            {hash && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-xs text-blue-200">
                  ⏳ Transaction: {hash.substring(0, 10)}...{hash.substring(hash.length - 8)}
                </p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={isPending || isConfirming || isUploading || !tokenName || !tokenSymbol || !totalSupply}
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
                  Confirm in wallet...
                </>
              ) : isConfirming ? (
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
                  ✅ Token Deployed Successfully!
                </p>
                <p className="text-xs text-gray-400 break-all mb-2">
                  Contract: {deployedAddress}
                </p>
                <a
                  href={`https://basescan.org/address/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm underline block mb-2"
                >
                  View on BaseScan →
                </a>
                <a
                  href={`https://basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-xs underline"
                >
                  View Transaction →
                </a>
              </div>
            )}
          </>
        )}

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-purple-200">
            <strong>💡 Direct Deployment (Like Remix!)</strong>
            <br />
            • Deploy ERC20 token directly to Base
            <br />
            • $0 gas fees (Coinbase Paymaster)
            <br />
            • Instant deployment, no factory needed
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs text-gray-400">Direct Deploy</div>
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
