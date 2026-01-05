/**
 * Coinbase Developer Platform - Base Paymaster Integration
 * Backend Node.js Example
 */

const { ethers } = require('ethers');

// Configuration
const COINBASE_PAYMASTER_URL = 'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM';
const BASE_CHAIN_ID = 8453;

// Initialize provider with Coinbase Paymaster
const provider = new ethers.JsonRpcProvider(COINBASE_PAYMASTER_URL);

/**
 * Example 1: Get network information
 */
async function getNetworkInfo() {
    try {
        const network = await provider.getNetwork();
        console.log('Network:', {
            name: network.name,
            chainId: network.chainId.toString(),
        });

        const blockNumber = await provider.getBlockNumber();
        console.log('Current Block Number:', blockNumber);

        const feeData = await provider.getFeeData();
        console.log('Fee Data:', {
            gasPrice: ethers.formatUnits(feeData.gasPrice, 'gwei') + ' gwei',
            maxFeePerGas: ethers.formatUnits(feeData.maxFeePerGas, 'gwei') + ' gwei',
            maxPriorityFeePerGas: ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei') + ' gwei',
        });

        return { network, blockNumber, feeData };
    } catch (error) {
        console.error('Error getting network info:', error);
        throw error;
    }
}

/**
 * Example 2: Send a sponsored transaction
 * Note: You need a wallet with a private key for this
 */
async function sendSponsoredTransaction(privateKey, toAddress, amountInEth) {
    try {
        // Create wallet with the paymaster provider
        const wallet = new ethers.Wallet(privateKey, provider);

        console.log('Sending from:', wallet.address);
        console.log('To:', toAddress);
        console.log('Amount:', amountInEth, 'ETH');

        // Check balance before
        const balanceBefore = await provider.getBalance(wallet.address);
        console.log('Balance before:', ethers.formatEther(balanceBefore), 'ETH');

        // Create transaction
        const tx = {
            to: toAddress,
            value: ethers.parseEther(amountInEth.toString()),
        };

        // Send transaction (Paymaster sponsors gas)
        console.log('Sending transaction...');
        const txResponse = await wallet.sendTransaction(tx);
        console.log('Transaction hash:', txResponse.hash);
        console.log('View on BaseScan:', `https://basescan.org/tx/${txResponse.hash}`);

        // Wait for confirmation
        console.log('Waiting for confirmation...');
        const receipt = await txResponse.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);
        console.log('Gas used:', receipt.gasUsed.toString());

        // Check balance after
        const balanceAfter = await provider.getBalance(wallet.address);
        console.log('Balance after:', ethers.formatEther(balanceAfter), 'ETH');

        return receipt;
    } catch (error) {
        console.error('Error sending sponsored transaction:', error);
        throw error;
    }
}

/**
 * Example 3: Interact with a smart contract using Paymaster
 */
async function interactWithContract(privateKey, contractAddress, contractABI, methodName, params) {
    try {
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        console.log(`Calling ${methodName} on contract ${contractAddress}`);

        // Call the contract method
        const tx = await contract[methodName](...params);
        console.log('Transaction hash:', tx.hash);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt.hash);

        return receipt;
    } catch (error) {
        console.error('Error interacting with contract:', error);
        throw error;
    }
}

/**
 * Example 4: Get account balance
 */
async function getBalance(address) {
    try {
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balance);

        console.log(`Balance of ${address}:`, balanceInEth, 'ETH');
        return balanceInEth;
    } catch (error) {
        console.error('Error getting balance:', error);
        throw error;
    }
}

/**
 * Example 5: Estimate gas for a transaction
 */
async function estimateGas(fromAddress, toAddress, amountInEth) {
    try {
        const tx = {
            from: fromAddress,
            to: toAddress,
            value: ethers.parseEther(amountInEth.toString()),
        };

        const gasEstimate = await provider.estimateGas(tx);
        const feeData = await provider.getFeeData();

        const estimatedCost = gasEstimate * feeData.gasPrice;
        const estimatedCostInEth = ethers.formatEther(estimatedCost);

        console.log('Gas Estimate:', gasEstimate.toString());
        console.log('Estimated Cost:', estimatedCostInEth, 'ETH');

        return { gasEstimate, estimatedCostInEth };
    } catch (error) {
        console.error('Error estimating gas:', error);
        throw error;
    }
}

/**
 * Example 6: Listen for new blocks
 */
async function listenForBlocks() {
    console.log('Listening for new blocks...');

    provider.on('block', (blockNumber) => {
        console.log('New block:', blockNumber);
    });
}

/**
 * Example 7: Get transaction receipt
 */
async function getTransactionReceipt(txHash) {
    try {
        const receipt = await provider.getTransactionReceipt(txHash);

        if (receipt) {
            console.log('Transaction Receipt:', {
                hash: receipt.hash,
                blockNumber: receipt.blockNumber,
                from: receipt.from,
                to: receipt.to,
                gasUsed: receipt.gasUsed.toString(),
                status: receipt.status === 1 ? 'Success' : 'Failed',
            });
        } else {
            console.log('Transaction not found or still pending');
        }

        return receipt;
    } catch (error) {
        console.error('Error getting transaction receipt:', error);
        throw error;
    }
}

// Express.js API example
function setupExpressAPI() {
    const express = require('express');
    const app = express();
    app.use(express.json());

    // Endpoint to get network info
    app.get('/api/network', async (req, res) => {
        try {
            const info = await getNetworkInfo();
            res.json(info);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Endpoint to get balance
    app.get('/api/balance/:address', async (req, res) => {
        try {
            const balance = await getBalance(req.params.address);
            res.json({ address: req.params.address, balance });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Endpoint to send sponsored transaction
    app.post('/api/send', async (req, res) => {
        try {
            const { privateKey, toAddress, amount } = req.body;

            if (!privateKey || !toAddress || !amount) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const receipt = await sendSponsoredTransaction(privateKey, toAddress, amount);
            res.json({
                success: true,
                txHash: receipt.hash,
                blockNumber: receipt.blockNumber
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Endpoint to get transaction receipt
    app.get('/api/tx/:hash', async (req, res) => {
        try {
            const receipt = await getTransactionReceipt(req.params.hash);
            res.json(receipt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Coinbase Paymaster API running on port ${PORT}`);
    });

    return app;
}

// Main execution
async function main() {
    console.log('=== Coinbase Developer Platform - Base Paymaster Integration ===\n');

    // Get network information
    await getNetworkInfo();

    // Example: Get balance (replace with actual address)
    // await getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

    // Example: Send sponsored transaction (requires private key)
    // await sendSponsoredTransaction('YOUR_PRIVATE_KEY', 'RECIPIENT_ADDRESS', 0.001);

    // Start Express API (uncomment to use)
    // setupExpressAPI();
}

// Export functions for use in other modules
module.exports = {
    provider,
    getNetworkInfo,
    sendSponsoredTransaction,
    interactWithContract,
    getBalance,
    estimateGas,
    listenForBlocks,
    getTransactionReceipt,
    setupExpressAPI,
};

// Run main if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}
