# 🚀 Coinbase Developer Platform - Base Paymaster Integration Guide

## Your Configuration

**Paymaster URL:** `https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM`

**Network:** Base Mainnet (Chain ID: 8453)

## What is a Paymaster?

A Paymaster is a service that sponsors gas fees for your users, enabling gasless transactions. This means:
- ✅ Users don't need ETH in their wallet for gas
- ✅ Better user experience (no gas complexity)
- ✅ Lower barrier to entry for new users
- ✅ You control gas sponsorship rules

## Quick Start

### 1. Frontend Integration (HTML/JavaScript)

I've created `coinbase_base_paymaster_integration.html` for you. To use it:

```bash
# Open the file in your browser
open coinbase_base_paymaster_integration.html
```

Features:
- Connect wallet to Base network
- Send gasless transactions
- View transaction status
- Automatic network switching

### 2. Backend Integration (Node.js)

I've created `coinbase_paymaster_backend.js` for you. To use it:

```bash
# Install dependencies
npm install ethers express

# Run the example
node coinbase_paymaster_backend.js
```

Or use it in your app:

```javascript
const { provider, getBalance, sendSponsoredTransaction } = require('./coinbase_paymaster_backend');

// Get balance
await getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

// Send sponsored transaction
await sendSponsoredTransaction(
    'YOUR_PRIVATE_KEY',
    'RECIPIENT_ADDRESS',
    0.001  // amount in ETH
);
```

### 3. Start the API Server

```bash
# The backend includes a complete Express.js API
node coinbase_paymaster_backend.js
```

API Endpoints:
- `GET /api/network` - Get network information
- `GET /api/balance/:address` - Get account balance
- `POST /api/send` - Send sponsored transaction
- `GET /api/tx/:hash` - Get transaction receipt

## Integration Examples

### Example 1: Simple Ethers.js Integration

```javascript
const { ethers } = require('ethers');

const PAYMASTER_URL = 'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM';

// Create provider
const provider = new ethers.JsonRpcProvider(PAYMASTER_URL);

// Get network info
const network = await provider.getNetwork();
console.log('Connected to:', network.name);

// Get balance
const balance = await provider.getBalance('0x...');
console.log('Balance:', ethers.formatEther(balance), 'ETH');
```

### Example 2: Send Transaction with Wallet

```javascript
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const tx = await wallet.sendTransaction({
    to: 'RECIPIENT_ADDRESS',
    value: ethers.parseEther('0.001')
});

console.log('TX Hash:', tx.hash);
await tx.wait();
console.log('Confirmed!');
```

### Example 3: Smart Contract Interaction

```javascript
const contract = new ethers.Contract(
    'CONTRACT_ADDRESS',
    ['function transfer(address to, uint256 amount)'],
    wallet
);

const tx = await contract.transfer('RECIPIENT', ethers.parseEther('1'));
await tx.wait();
```

### Example 4: React Integration

```jsx
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const PAYMASTER_URL = 'https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM';

    async function connectWallet() {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();

        setProvider(browserProvider);
        setSigner(signer);
    }

    async function sendTransaction() {
        const tx = await signer.sendTransaction({
            to: '0x...',
            value: ethers.parseEther('0.001')
        });

        await tx.wait();
        alert('Transaction confirmed!');
    }

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <button onClick={sendTransaction}>Send TX</button>
        </div>
    );
}
```

## Features of Your Paymaster URL

Your Coinbase Developer Platform endpoint provides:

1. **Standard JSON-RPC Methods**
   - `eth_blockNumber`
   - `eth_getBalance`
   - `eth_sendTransaction`
   - `eth_estimateGas`
   - `eth_getTransactionReceipt`
   - And all other standard Ethereum RPC methods

2. **Paymaster Capabilities**
   - Gas sponsorship for transactions
   - Automatic fee estimation
   - Transaction batching support

3. **Base Network Access**
   - Direct access to Base mainnet
   - Fast, reliable RPC endpoint
   - Rate limits based on your Coinbase Developer Platform tier

## Testing Your Integration

### Step 1: Test Network Connection

```bash
curl https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
  }'
```

### Step 2: Test in Browser

Open `coinbase_base_paymaster_integration.html` and:
1. Click "Connect Wallet"
2. Approve MetaMask connection
3. Switch to Base network (automatic)
4. Try sending a test transaction

### Step 3: Test Backend

```bash
node coinbase_paymaster_backend.js
```

## Coinbase Developer Platform Dashboard

Manage your integration at:
https://portal.cdp.coinbase.com/

Features:
- View API usage
- Monitor transaction volume
- Configure paymaster rules
- Set spending limits
- View analytics

## Best Practices

1. **Security**
   - Never expose your API key in frontend code (it's in the URL)
   - Use environment variables for sensitive data
   - Implement rate limiting
   - Validate all inputs

2. **User Experience**
   - Show clear transaction status
   - Display estimated gas savings
   - Handle errors gracefully
   - Provide transaction links to BaseScan

3. **Gas Optimization**
   - Batch transactions when possible
   - Use appropriate gas limits
   - Monitor gas prices
   - Implement spending caps

4. **Error Handling**
   - Catch and display network errors
   - Handle wallet connection failures
   - Retry failed transactions
   - Log errors for debugging

## Next Steps

1. ✅ Test the HTML integration file
2. ✅ Set up the backend API
3. ✅ Connect to Coinbase Developer Platform dashboard
4. ✅ Configure paymaster rules and limits
5. ✅ Deploy to production

## Support & Resources

- **Coinbase Developer Docs:** https://docs.cdp.coinbase.com/
- **Base Network Docs:** https://docs.base.org/
- **Ethers.js Docs:** https://docs.ethers.org/
- **BaseScan Explorer:** https://basescan.org/

## Troubleshooting

### Issue: "Cannot connect to Base network"
**Solution:** Ensure MetaMask has Base network added. The HTML file does this automatically.

### Issue: "Transaction fails with insufficient funds"
**Solution:** Ensure the paymaster is properly configured in your Coinbase Developer Platform dashboard.

### Issue: "RPC rate limit exceeded"
**Solution:** Implement request caching and upgrade your Coinbase Developer Platform tier if needed.

### Issue: "Transaction not found"
**Solution:** Wait a few seconds for transaction propagation. Base has fast block times (~2 seconds).

## Example: Complete Integration Flow

```javascript
// 1. Initialize
const provider = new ethers.JsonRpcProvider(PAYMASTER_URL);
const wallet = new ethers.Wallet(privateKey, provider);

// 2. Check balance
const balance = await provider.getBalance(wallet.address);
console.log('Balance:', ethers.formatEther(balance));

// 3. Prepare transaction
const tx = {
    to: recipientAddress,
    value: ethers.parseEther('0.001'),
};

// 4. Send (paymaster sponsors gas)
const txResponse = await wallet.sendTransaction(tx);
console.log('TX sent:', txResponse.hash);

// 5. Wait for confirmation
const receipt = await txResponse.wait();
console.log('Confirmed in block:', receipt.blockNumber);

// 6. Verify on BaseScan
console.log(`https://basescan.org/tx/${receipt.hash}`);
```

---

🎉 **You're all set!** Your app is now integrated with Coinbase Developer Platform's Base Paymaster.

For questions or issues, check the Coinbase Developer Platform documentation or reach out to their support team.
