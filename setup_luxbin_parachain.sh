#!/bin/bash
# Automated setup for LUXBIN Parachain on Ubuntu

echo "Updating system..."
sudo apt update && sudo apt install -y git curl

echo "Installing Rust..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env

echo "Cloning Polkadot SDK..."
git clone --depth 1 https://github.com/paritytech/polkadot-sdk.git

echo "Setting up LUXBIN parachain..."
cp -r polkadot-sdk/cumulus/parachain-template luxbin_parachain
cd luxbin_parachain

echo "Creating LUXBIN pallet..."
mkdir -p pallets/pallet-luxbin-ai/src
cat > pallets/pallet-luxbin-ai/src/lib.rs << 'EOF'
#![cfg_attr(not(feature = "std"), no_std)]

/// LUXBIN AI Pallet
/// Temporal cryptography with Bitcoin timestamp integration
pub use pallet::*;

use frame_support::pallet_prelude::*;
use frame_system::pallet_prelude::*;
use sp_std::vec::Vec;
use sp_io::hashing::blake2_256;

#[pallet::pallet]
pub struct Pallet<T>(_);

#[pallet::config]
pub trait Config: frame_system::Config {
    type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
}

#[pallet::event]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> {
    AIRequestSubmitted { request_id: T::Hash },
    AIResultVerified { request_id: T::Hash },
}

#[pallet::error]
pub enum Error<T> {
    InvalidTemporalKey,
    HmacVerificationFailed,
}

#[pallet::storage]
pub type AIRequests<T: Config> = StorageMap<
    _,
    Blake2_128Concat,
    T::Hash,
    (T::AccountId, Vec<u8>, [u8; 32], u64),
>;

#[pallet::storage]
pub type AIResults<T: Config> = StorageMap<
    _,
    Blake2_128Concat,
    T::Hash,
    Vec<u8>,
>;

#[pallet::call]
impl<T: Config> Pallet<T> {
    #[pallet::call_index(0)]
    #[pallet::weight(10_000)]
    pub fn submit_ai_request(
        origin: OriginFor<T>,
        prompt: Vec<u8>,
        temporal_key: [u8; 32],
    ) -> DispatchResult {
        let who = ensure_signed(origin)?;
        let request_id = T::Hashing::hash_of(&(&who, &prompt, &temporal_key, frame_system::Pallet::<T>::block_number()));
        let deadline = frame_system::Pallet::<T>::block_number().saturated_into::<u64>() + 100;
        <AIRequests<T>>::insert(request_id, (who, prompt, temporal_key, deadline));
        Self::deposit_event(Event::AIRequestSubmitted { request_id });
        Ok(())
    }

    #[pallet::call_index(1)]
    #[pallet::weight(10_000)]
    pub fn submit_ai_result(
        origin: OriginFor<T>,
        request_id: T::Hash,
        result: Vec<u8>,
        hmac: [u8; 32],
    ) -> DispatchResult {
        ensure_signed(origin)?;
        let (requester, prompt, temporal_key, deadline) = <AIRequests<T>>::get(request_id).ok_or(Error::<T>::InvalidTemporalKey)?;
        let current_time = frame_system::Pallet::<T>::block_number().saturated_into::<u64>();
        ensure!(current_time <= deadline, Error::<T>::InvalidTemporalKey);
        let combined = [&temporal_key[..], &blake2_256(&result)[..]].concat();
        let expected_hmac = blake2_256(&combined);
        ensure!(hmac == expected_hmac, Error::<T>::HmacVerificationFailed);
        <AIResults<T>>::insert(request_id, result);
        <AIRequests<T>>::remove(request_id);
        Self::deposit_event(Event::AIResultVerified { request_id });
        Ok(())
    }
}
EOF

echo "Updating Cargo.toml..."
cat >> pallets/Cargo.toml << 'EOF'

[dependencies.pallet-luxbin-ai]
path = "pallet-luxbin-ai"
default-features = false
EOF

echo "Updating runtime..."
sed -i '/frame-system/a \
pallet_luxbin_ai: { PolkadotSdk::Pallet, Storage, Event, Error<T> },' runtime/src/lib.rs

sed -i '/Balances: pallet_balances/a \
LuxbinAi: pallet_luxbin_ai,' runtime/src/lib.rs

echo "Building parachain..."
cargo build --release

echo "Setup complete! Run with: ./target/release/parachain-collator --dev --ws-external"