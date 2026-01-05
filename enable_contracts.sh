#!/bin/bash

echo "🚀 Automatically Adding Contracts Pallet to LUXBIN Runtime..."
echo "This will modify your runtime files automatically."

# Backup files first
echo "📦 Creating backups..."
cp runtime/Cargo.toml runtime/Cargo.toml.backup.$(date +%s)
cp runtime/src/lib.rs runtime/src/lib.rs.backup.$(date +%s)

# Add contracts dependencies to Cargo.toml
echo "📝 Updating Cargo.toml..."
if ! grep -q "pallet-contracts" runtime/Cargo.toml; then
    # Find the line with pallet-temporal-crypto and add contracts after it
    sed -i '' '/pallet-temporal-crypto/a\
pallet-contracts = { git = "https://github.com/paritytech/polkadot-sdk", branch = "stable2407", default-features = false }\
pallet-contracts-primitives = { git = "https://github.com/paritytech/polkadot-sdk", branch = "stable2407", default-features = false }' runtime/Cargo.toml
    echo "✅ Added contracts dependencies to Cargo.toml"
else
    echo "ℹ️ Contracts dependencies already present"
fi

# Update lib.rs with contracts pallet
echo "🔧 Updating runtime/src/lib.rs..."

# Add contracts pallet to construct_runtime!
if ! grep -q "Contracts: pallet_contracts" runtime/src/lib.rs; then
    # Find the line with AiCompute and add contracts after it
    sed -i '' '/AiCompute: pallet_ai_compute/a\
		Contracts: pallet_contracts,' runtime/src/lib.rs
    echo "✅ Added Contracts pallet to construct_runtime!"
else
    echo "ℹ️ Contracts pallet already in construct_runtime!"
fi

# Add parameter_types for contracts
if ! grep -q "pub Schedule:" runtime/src/lib.rs; then
    # Find parameter_types! block and add contracts parameters
    sed -i '' '/parameter_types! {/a\
	pub const DepositPerItem: Balance = deposit(1, 0);\
	pub const DepositPerByte: Balance = deposit(0, 1);\
	pub Schedule: pallet_contracts::Schedule<Runtime> = Default::default();' runtime/src/lib.rs
    echo "✅ Added contracts parameter types"
else
    echo "ℹ️ Contracts parameters already present"
fi

# Add contracts Config impl
if ! grep -q "impl pallet_contracts::Config" runtime/src/lib.rs; then
    # Find a good place to add the impl block (after other pallet impls)
    sed -i '' '/impl pallet_temporal_crypto::Config/a\
\
impl pallet_contracts::Config for Runtime {\
	type Time = Timestamp;\
	type Randomness = RandomnessCollectiveFlip;\
	type Currency = Balances;\
	type RuntimeEvent = RuntimeEvent;\
	type RuntimeCall = RuntimeCall;\
	type CallFilter = Nothing;\
	type WeightPrice = pallet_transaction_payment::Pallet<Self>;\
	type WeightInfo = pallet_contracts::weights::SubstrateWeight<Self>;\
	type ChainExtension = ();\
	type Schedule = Schedule;\
	type CallStack = [pallet_contracts::Frame<Self>; 5];\
	type DeletionQueueDepth = ConstU32<128>;\
	type DeletionWeightLimit = ConstU32<500_000_000_000>;\
	type DepositPerByte = DepositPerByte;\
	type DepositPerItem = DepositPerItem;\
	type AddressGenerator = pallet_contracts::DefaultAddressGenerator;\
	type MaxCodeLen = ConstU32<{ 128 * 1024 }>;\
	type MaxStorageKeyLen = ConstU32<128>;\
	type UnsafeUnstableInterface = ConstBool<false>;\
	type MaxDebugBufferLen = ConstU32<{ 2 * 1024 * 1024 }>;\
}\
' runtime/src/lib.rs
    echo "✅ Added contracts Config implementation"
else
    echo "ℹ️ Contracts Config already implemented"
fi

echo "🎉 Contracts pallet successfully added to LUXBIN runtime!"
echo ""
echo "Next steps:"
echo "1. Run: cargo build --release --package solochain-template-node"
echo "2. Run: ./target/release/solochain-template-node --dev --tmp"
echo "3. Open: http://localhost:9944 (Polkadot.js Apps)"
echo "4. You should now see 'Contracts' in the menu!"
echo ""
echo "Then you can deploy your photonic translator contract! 🌟"
