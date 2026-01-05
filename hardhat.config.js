require("@nomicfoundation/hardhat-ethers");
require("@account-abstraction/sdk");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "base-sepolia": {
      url: "https://sepolia.base.org",
      chainId: 84532,
    },
    "base-mainnet": {
      url: "https://mainnet.base.org",
      chainId: 8453,
    },
  },
  // For ERC-4337 deployments
  accountAbstraction: {
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // Base Sepolia EntryPoint
    bundlerUrl: "https://api.pimlico.io/v1/base-sepolia/rpc?apikey=YOUR_PIMLICO_API_KEY",
    paymasterUrl: "https://api.pimlico.io/v2/base-sepolia/rpc?apikey=YOUR_PIMLICO_API_KEY",
  },
};