/**
 * Simple Coinbase Paymaster Demo
 * Shows how to use your integration
 */

import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const PAYMASTER_URL = process.env.COINBASE_PAYMASTER_URL;

console.log('🚀 Luxbin + Coinbase Developer Platform Demo\n');

async function demo() {
    // Initialize provider
    const provider = new ethers.JsonRpcProvider(PAYMASTER_URL);

    console.log('📊 Base Network Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Get network info
    const network = await provider.getNetwork();
    console.log('Network:', network.name);
    console.log('Chain ID:', network.chainId.toString());

    // Get current block
    const blockNumber = await provider.getBlockNumber();
    console.log('Current Block:', blockNumber.toLocaleString());

    // Get gas price
    const feeData = await provider.getFeeData();
    console.log('Gas Price:', ethers.formatUnits(feeData.gasPrice || 0n, 'gwei'), 'gwei');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Coinbase Paymaster is READY!\n');
    console.log('You can now:');
    console.log('  • Send gasless transactions');
    console.log('  • Create smart wallets');
    console.log('  • Batch multiple operations');
    console.log('  • Trade on Base network\n');
    console.log('📝 Next steps:');
    console.log('  1. Open coinbase_base_paymaster_integration.html in browser');
    console.log('  2. Connect your MetaMask wallet');
    console.log('  3. Send a test gasless transaction\n');
    console.log('📚 Documentation: COINBASE_PAYMASTER_GUIDE.md');
    console.log('🏃 Quick Start: QUICK_START_COINBASE.md\n');
    console.log('🌐 Your App: https://luxbin-app.vercel.app');
    console.log('💻 GitHub: https://github.com/mermaidnicheboutique-code/luxbin-chain\n');
}

demo().catch(console.error);
