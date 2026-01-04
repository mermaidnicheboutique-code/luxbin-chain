const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Read contracts
const tokenSource = fs.readFileSync(path.join(__dirname, '../contracts/SimpleToken.sol'), 'utf8');
const nftSource = fs.readFileSync(path.join(__dirname, '../contracts/SimpleNFT.sol'), 'utf8');

// Compile input
const input = {
  language: 'Solidity',
  sources: {
    'SimpleToken.sol': { content: tokenSource },
    'SimpleNFT.sol': { content: nftSource }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode']
      }
    },
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

console.log('Compiling contracts...');
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach(error => {
    console.error(error.formattedMessage);
  });
}

// Extract bytecode and ABI
const tokenContract = output.contracts['SimpleToken.sol']['SimpleToken'];
const nftContract = output.contracts['SimpleNFT.sol']['SimpleNFT'];

console.log('\n=== SimpleToken ===');
console.log('Bytecode:', '0x' + tokenContract.evm.bytecode.object);
console.log('\nABI:', JSON.stringify(tokenContract.abi, null, 2));

console.log('\n=== SimpleNFT ===');
console.log('Bytecode:', '0x' + nftContract.evm.bytecode.object);
console.log('\nABI:', JSON.stringify(nftContract.abi, null, 2));

// Save to file
fs.writeFileSync(
  path.join(__dirname, '../lib/contracts.json'),
  JSON.stringify({
    SimpleToken: {
      bytecode: '0x' + tokenContract.evm.bytecode.object,
      abi: tokenContract.abi
    },
    SimpleNFT: {
      bytecode: '0x' + nftContract.evm.bytecode.object,
      abi: nftContract.abi
    }
  }, null, 2)
);

console.log('\n✅ Compiled contracts saved to lib/contracts.json');
