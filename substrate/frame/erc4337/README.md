# ERC-4337 Account Abstraction Pallet

This pallet implements ERC-4337 Account Abstraction on Substrate, enabling Coinbase Smart Wallets and other ERC-4337 compatible wallets to deploy and interact with contracts on the LUXBIN chain.

## Overview

ERC-4337 Account Abstraction allows users to use smart contract wallets instead of EOAs (Externally Owned Accounts), providing features like:

- **Social Recovery**: Recover access using trusted contacts
- **Gasless Transactions**: Paymaster-sponsored transactions
- **Batch Operations**: Execute multiple operations in one transaction
- **Advanced Security**: Multi-signature and time-locked operations

## Features

### User Operation Submission
- Submit ERC-4337 user operations to the entry point
- Validate operations before processing
- Store operations for bundling

### Bundle Execution
- Execute bundles of user operations
- Reward bundlers for including operations
- Handle failed operations gracefully

### EVM Integration
- Works with pallet-revive (EVM on Substrate)
- Supports contract deployment and interaction
- Gas fee calculation and payment

## Configuration

The pallet requires several configuration parameters:

```rust
impl pallet_erc4337::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;
    type Currency = Balances;
    type AddressMapping = pallet_revive::AccountId32Mapper<Self>;
    type GasWeightMapping = pallet_revive::evm::fees::BlockRatioFee<1, 1, Self>;
    type EntryPointAddress = EntryPointAddress; // ERC-4337 EntryPoint contract
    type MaxBundleSize = MaxBundleSize;        // Maximum operations per bundle
    type MaxOpsPerBundle = MaxOpsPerBundle;    // Maximum operations per bundle
}
```

## Usage

### For Smart Wallet Users

1. **Connect Coinbase Smart Wallet** to LUXBIN chain
2. **Deploy contracts** without needing ETH for gas
3. **Use social recovery** if access is lost
4. **Batch multiple operations** in single transactions

### For DApp Developers

```javascript
// Submit user operation
const userOp = {
  sender: smartWalletAddress,
  nonce: await getNonce(),
  initCode: deploymentCode,
  callData: contractCallData,
  // ... other fields
};

await substrateApi.tx.erc4337.submitUserOperation(userOp);
```

## Security Considerations

- **EntryPoint Verification**: Only valid ERC-4337 operations are accepted
- **Gas Limits**: Operations are bounded to prevent abuse
- **Signature Validation**: All operations require valid signatures
- **Rate Limiting**: Prevents spam and DoS attacks

## Future Enhancements

- Paymaster integration for sponsored transactions
- Cross-chain operation support
- Advanced signature schemes (passkeys, MPC)
- Native token bridging with account abstraction

## Coinbase Smart Wallet Integration

This pallet enables LUXBIN to be the first Substrate chain with native Coinbase Smart Wallet support, providing:

- **Seamless onboarding** for Coinbase users
- **Enhanced security** through MPC wallets
- **Gasless experiences** for contract deployment
- **Social recovery** for lost access

The implementation follows ERC-4337 standards while being optimized for Substrate's architecture.