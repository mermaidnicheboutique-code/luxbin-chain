# 🏭 Deploy Factory Contracts to Base Network

This guide shows you how to deploy the Token and NFT factory contracts to Base network using your Coinbase Paymaster credits for **$0 gas fees**.

## 📋 Prerequisites

- ✅ Coinbase Developer Platform account
- ✅ $1,250 in Coinbase credits (already configured!)
- ✅ Wallet connected to Base network
- ✅ Foundry or Hardhat installed

## 🪙 Step 1: Create Token Factory Contract

Create `contracts/TokenFactory.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address creator
    ) ERC20(name, symbol) Ownable(creator) {
        _mint(creator, totalSupply);
    }
}

contract TokenFactory {
    event TokenCreated(address indexed tokenAddress, address indexed creator, string name, string symbol);

    address[] public deployedTokens;
    mapping(address => address[]) public userTokens;

    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) public returns (address) {
        SimpleToken newToken = new SimpleToken(name, symbol, totalSupply, msg.sender);
        address tokenAddress = address(newToken);

        deployedTokens.push(tokenAddress);
        userTokens[msg.sender].push(tokenAddress);

        emit TokenCreated(tokenAddress, msg.sender, name, symbol);
        return tokenAddress;
    }

    function getUserTokens(address user) public view returns (address[] memory) {
        return userTokens[user];
    }

    function getDeployedTokensCount() public view returns (uint256) {
        return deployedTokens.length;
    }
}
```

## 🖼️ Step 2: Create NFT Factory Contract

Create `contracts/NFTFactory.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public maxSupply;
    string private _baseTokenURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        uint256 _maxSupply,
        address creator
    ) ERC721(name, symbol) Ownable(creator) {
        _baseTokenURI = baseURI;
        maxSupply = _maxSupply;
    }

    function mint(address to) public onlyOwner returns (uint256) {
        require(_tokenIdCounter < maxSupply, "Max supply reached");
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}

contract NFTFactory {
    event NFTCollectionCreated(
        address indexed collectionAddress,
        address indexed creator,
        string name,
        string symbol
    );

    address[] public deployedCollections;
    mapping(address => address[]) public userCollections;

    function createNFTCollection(
        string memory name,
        string memory symbol,
        string memory baseURI,
        uint256 maxSupply
    ) public returns (address) {
        SimpleNFT newCollection = new SimpleNFT(
            name,
            symbol,
            baseURI,
            maxSupply,
            msg.sender
        );
        address collectionAddress = address(newCollection);

        deployedCollections.push(collectionAddress);
        userCollections[msg.sender].push(collectionAddress);

        emit NFTCollectionCreated(collectionAddress, msg.sender, name, symbol);
        return collectionAddress;
    }

    function getUserCollections(address user) public view returns (address[] memory) {
        return userCollections[user];
    }

    function getDeployedCollectionsCount() public view returns (uint256) {
        return deployedCollections.length;
    }
}
```

## 🚀 Step 3: Deploy Factories to Base (Using Coinbase Paymaster)

### Option A: Using Foundry

1. Install dependencies:
```bash
forge install OpenZeppelin/openzeppelin-contracts
```

2. Create deployment script `script/DeployFactories.s.sol`:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/TokenFactory.sol";
import "../contracts/NFTFactory.sol";

contract DeployFactories is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy Token Factory
        TokenFactory tokenFactory = new TokenFactory();
        console.log("TokenFactory deployed to:", address(tokenFactory));

        // Deploy NFT Factory
        NFTFactory nftFactory = new NFTFactory();
        console.log("NFTFactory deployed to:", address(nftFactory));

        vm.stopBroadcast();
    }
}
```

3. Deploy to Base using Coinbase Paymaster RPC:
```bash
forge script script/DeployFactories.s.sol:DeployFactories \
  --rpc-url https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM \
  --broadcast \
  --verify
```

### Option B: Using Hardhat

1. Install dependencies:
```bash
npm install @openzeppelin/contracts
```

2. Create deployment script `scripts/deploy-factories.js`:
```javascript
const hre = require("hardhat");

async function main() {
  // Deploy Token Factory
  const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();
  await tokenFactory.waitForDeployment();
  console.log("TokenFactory deployed to:", await tokenFactory.getAddress());

  // Deploy NFT Factory
  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy();
  await nftFactory.waitForDeployment();
  console.log("NFTFactory deployed to:", await nftFactory.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

3. Configure Hardhat for Base with Paymaster (`hardhat.config.js`):
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8453
    }
  }
};
```

4. Deploy:
```bash
npx hardhat run scripts/deploy-factories.js --network base
```

## 📝 Step 4: Update Your App with Factory Addresses

After deployment, update the deployer components with the actual factory addresses:

### Update `components/TokenDeployer.tsx`:
```typescript
// Replace this line:
// const FACTORY_ADDRESS = '0xYourTokenFactoryAddress';

// With your deployed address:
const FACTORY_ADDRESS = '0x...'; // Your TokenFactory address from Step 3
```

### Update `components/NFTDeployer.tsx`:
```typescript
// Replace this line:
// const FACTORY_ADDRESS = '0xYourFactoryAddress';

// With your deployed address:
const FACTORY_ADDRESS = '0x...'; // Your NFTFactory address from Step 3
```

### Uncomment the deployment code:

In both deployers, uncomment the `writeContract` calls:

```typescript
// Change from:
// writeContract({
//   address: '0xYourFactoryAddress',
//   ...
// });

// To:
writeContract({
  address: FACTORY_ADDRESS,
  abi: TOKEN_FACTORY_ABI, // or NFT_FACTORY_ABI
  functionName: 'createToken', // or 'createNFTCollection'
  args: [...],
  chain: base,
});
```

## ✅ Step 5: Test Deployment

1. Visit your app: https://luxbin-app.vercel.app
2. Connect your wallet
3. Go to Deploy section
4. Upload a logo/image
5. Fill in token/NFT details
6. Click Deploy
7. Watch the magic happen - **$0 gas fees!** 🎉

## 💡 Production Enhancements

### Add IPFS Upload (NFT.Storage)

1. Get API key from https://nft.storage
2. Add to `.env.local`:
```env
NEXT_PUBLIC_NFT_STORAGE_KEY=your_api_key_here
```

3. Update `uploadToIPFS` function:
```typescript
const uploadToIPFS = async () => {
  const formData = new FormData();
  formData.append('file', nftImage);

  const response = await fetch('https://api.nft.storage/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_KEY}`
    },
    body: formData
  });

  const data = await response.json();
  return data.value.cid; // IPFS CID
};
```

## 🎯 Benefits of This Setup

✅ **$0 Gas Fees** - All deployments sponsored by Coinbase Paymaster
✅ **Base Network** - Fast, cheap L2 with Coinbase backing
✅ **IPFS Storage** - Decentralized media hosting
✅ **Factory Pattern** - Efficient, reusable contract deployment
✅ **User Ownership** - Creators own their tokens/NFTs
✅ **Track All Deployments** - Factory keeps record of all created contracts

## 🔗 Resources

- [Base Network Docs](https://docs.base.org)
- [Coinbase Paymaster Docs](https://docs.cdp.coinbase.com/paymaster/docs/welcome)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [NFT.Storage](https://nft.storage/docs)

---

**Your Coinbase Credits:** $1,250
**Average Token Deploy Cost:** ~$0.50 (but you pay $0!)
**Average NFT Deploy Cost:** ~$1.50 (but you pay $0!)
**Estimated Deployments:** 1,000+ contracts for free! 🚀
