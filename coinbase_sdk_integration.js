/**
 * Complete Coinbase SDK + Paymaster Integration
 * For Luxbin App
 */

import CoinbaseSDK from '@coinbase/coinbase-sdk';
import { ethers } from 'ethers';

// Configuration
const COINBASE_PAYMASTER_URL = 'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM';
const BASE_CHAIN_ID = 8453;

/**
 * Initialize Coinbase SDK
 */
export async function initializeCoinbaseSDK() {
    try {
        // Configure Coinbase SDK with your API keys
        CoinbaseSDK.configure({
            apiKeyName: process.env.COINBASE_API_KEY_ID,
            privateKey: process.env.COINBASE_API_SECRET,
        });

        console.log('✅ Coinbase SDK initialized successfully');
        return CoinbaseSDK;
    } catch (error) {
        console.error('❌ Failed to initialize Coinbase SDK:', error);
        throw error;
    }
}

/**
 * Initialize Paymaster Provider
 */
export function initializePaymaster() {
    const provider = new ethers.JsonRpcProvider(COINBASE_PAYMASTER_URL);
    console.log('✅ Paymaster provider initialized');
    return provider;
}

/**
 * Create or Get Coinbase Wallet
 */
export async function getCoinbaseWallet() {
    try {
        // List existing wallets
        const wallets = await CoinbaseSDK.Wallet.listWallets();

        if (wallets.length > 0) {
            console.log('Found existing wallet:', wallets[0].getId());
            return wallets[0];
        }

        // Create new wallet if none exists
        console.log('Creating new wallet...');
        const wallet = await CoinbaseSDK.Wallet.create();
        console.log('✅ New wallet created:', wallet.getId());

        return wallet;
    } catch (error) {
        console.error('❌ Error managing Coinbase wallet:', error);
        throw error;
    }
}

/**
 * Get Wallet Address on Base Network
 */
export async function getBaseAddress(wallet) {
    try {
        // Get the default address for Base network
        const address = await wallet.getDefaultAddress();
        console.log('Base address:', address.getId());
        return address;
    } catch (error) {
        console.error('❌ Error getting Base address:', error);
        throw error;
    }
}

/**
 * Send Gasless Transaction using Paymaster
 */
export async function sendGaslessTransaction(wallet, toAddress, amountInEth) {
    try {
        console.log('Preparing gasless transaction...');

        // Create transfer using Coinbase SDK
        const transfer = await wallet.createTransfer({
            amount: amountInEth,
            assetId: 'eth',
            destination: toAddress,
            gasless: true, // Enable gasless mode
        });

        console.log('Transaction created:', transfer.getTransactionHash());

        // Wait for confirmation
        await transfer.wait();

        console.log('✅ Transaction confirmed!');
        console.log('View on BaseScan:', `https://basescan.org/tx/${transfer.getTransactionHash()}`);

        return transfer;
    } catch (error) {
        console.error('❌ Transaction failed:', error);
        throw error;
    }
}

/**
 * Send Transaction with Custom Paymaster
 */
export async function sendWithPaymaster(privateKey, toAddress, amountInEth) {
    try {
        const provider = initializePaymaster();
        const wallet = new ethers.Wallet(privateKey, provider);

        console.log('Sending from:', wallet.address);

        const tx = await wallet.sendTransaction({
            to: toAddress,
            value: ethers.parseEther(amountInEth.toString()),
        });

        console.log('Transaction hash:', tx.hash);

        const receipt = await tx.wait();
        console.log('✅ Confirmed in block:', receipt.blockNumber);

        return receipt;
    } catch (error) {
        console.error('❌ Transaction failed:', error);
        throw error;
    }
}

/**
 * Get Wallet Balance
 */
export async function getWalletBalance(wallet) {
    try {
        const balances = await wallet.listBalances();

        console.log('Wallet balances:');
        balances.forEach(balance => {
            console.log(`${balance.getAssetId()}: ${balance.getAmount()}`);
        });

        return balances;
    } catch (error) {
        console.error('❌ Error fetching balance:', error);
        throw error;
    }
}

/**
 * Trade on Base Network
 */
export async function tradeOnBase(wallet, fromAsset, toAsset, amount) {
    try {
        console.log(`Trading ${amount} ${fromAsset} for ${toAsset}...`);

        const trade = await wallet.createTrade({
            amount: amount,
            fromAssetId: fromAsset,
            toAssetId: toAsset,
        });

        await trade.wait();

        console.log('✅ Trade completed!');
        console.log('Transaction:', trade.getTransaction().getTransactionHash());

        return trade;
    } catch (error) {
        console.error('❌ Trade failed:', error);
        throw error;
    }
}

/**
 * Stake Assets (if supported)
 */
export async function stakeAssets(wallet, assetId, amount) {
    try {
        console.log(`Staking ${amount} ${assetId}...`);

        const stake = await wallet.createStake({
            amount: amount,
            assetId: assetId,
        });

        await stake.wait();

        console.log('✅ Staking successful!');
        return stake;
    } catch (error) {
        console.error('❌ Staking failed:', error);
        throw error;
    }
}

/**
 * Smart Wallet Integration (ERC-4337)
 */
export async function createSmartWallet() {
    try {
        console.log('Creating smart wallet with gasless capabilities...');

        // Create smart wallet
        const smartWallet = await CoinbaseSDK.Wallet.create({
            type: 'smart_wallet', // Enable smart wallet features
        });

        console.log('✅ Smart wallet created:', smartWallet.getId());

        // Smart wallets support:
        // - Gasless transactions
        // - Social recovery
        // - Batch transactions
        // - Programmable permissions

        return smartWallet;
    } catch (error) {
        console.error('❌ Smart wallet creation failed:', error);
        throw error;
    }
}

/**
 * Batch Multiple Transactions
 */
export async function batchTransactions(wallet, transactions) {
    try {
        console.log(`Batching ${transactions.length} transactions...`);

        // Execute all transactions in parallel
        const promises = transactions.map(tx =>
            wallet.createTransfer({
                amount: tx.amount,
                assetId: tx.assetId || 'eth',
                destination: tx.to,
                gasless: true,
            })
        );

        const results = await Promise.all(promises);

        console.log('✅ All transactions sent!');
        results.forEach((result, index) => {
            console.log(`TX ${index + 1}:`, result.getTransactionHash());
        });

        return results;
    } catch (error) {
        console.error('❌ Batch transaction failed:', error);
        throw error;
    }
}

/**
 * Monitor Wallet Activity
 */
export async function monitorWallet(wallet) {
    try {
        console.log('Monitoring wallet activity...');

        // Get transaction history
        const transactions = await wallet.listTransfers();

        console.log(`Found ${transactions.length} transactions:`);
        transactions.forEach(tx => {
            console.log({
                hash: tx.getTransactionHash(),
                status: tx.getStatus(),
                amount: tx.getAmount(),
                asset: tx.getAssetId(),
            });
        });

        return transactions;
    } catch (error) {
        console.error('❌ Error monitoring wallet:', error);
        throw error;
    }
}

/**
 * Export Wallet (for backup)
 */
export async function exportWallet(wallet) {
    try {
        console.log('Exporting wallet data...');

        const data = await wallet.export();

        // Store this securely! Never share or commit to git
        console.log('⚠️  Save this data securely:');
        console.log(data);

        return data;
    } catch (error) {
        console.error('❌ Export failed:', error);
        throw error;
    }
}

/**
 * Complete Integration Example
 */
export async function completeIntegrationExample() {
    try {
        console.log('\n🚀 Starting Coinbase SDK + Paymaster Integration\n');

        // Step 1: Initialize SDK
        await initializeCoinbaseSDK();

        // Step 2: Get or create wallet
        const wallet = await getCoinbaseWallet();

        // Step 3: Get Base address
        const address = await getBaseAddress(wallet);

        // Step 4: Check balance
        await getWalletBalance(wallet);

        // Step 5: Send gasless transaction
        // await sendGaslessTransaction(wallet, 'RECIPIENT_ADDRESS', 0.001);

        // Step 6: Monitor activity
        await monitorWallet(wallet);

        console.log('\n✅ Integration complete!\n');

        return { wallet, address };
    } catch (error) {
        console.error('❌ Integration failed:', error);
        throw error;
    }
}

// Export all functions
export default {
    initializeCoinbaseSDK,
    initializePaymaster,
    getCoinbaseWallet,
    getBaseAddress,
    sendGaslessTransaction,
    sendWithPaymaster,
    getWalletBalance,
    tradeOnBase,
    stakeAssets,
    createSmartWallet,
    batchTransactions,
    monitorWallet,
    exportWallet,
    completeIntegrationExample,
};
