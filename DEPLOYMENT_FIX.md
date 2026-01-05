# 🔧 DEPLOYMENT FIX - Coinbase Wallet Compatibility

## Error Found:
```
Invalid request
params[0].to is a required field
```

## Root Cause:
`useDeployContract` hook isn't compatible with Coinbase Smart Wallet. It's trying to send a transaction without a "to" field, which Coinbase wallet rejects.

## Solution:
Use `useSendTransaction` with encoded bytecode + constructor params as `data` field.

## Changes Needed:

1. Replace `useDeployContract` with `useSendTransaction`
2. Encode constructor parameters with ABI encoder
3. Append encoded params to bytecode
4. Send as transaction data

This is how Remix does it - it sends the bytecode as transaction data, not as a special "deploy" transaction.
