//! Minimal draft pallet skeleton describing Temporal Lock anchoring for LUXBIN
//! NOTE: This is a non-compiling, illustrative draft. Use as a starting point.

#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{decl_module, decl_storage, decl_event, decl_error, dispatch::DispatchResult};
use frame_system::ensure_signed;

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as TemporalOnchain {
        // Map account -> Optional temporal lock (encoded bytes)
        TemporalLocks get(fn temporal_locks): map hasher(blake2_128_concat) T::AccountId => Option<[u8;32]>;
        // Anchored memory roots
        MemoryRoots get(fn memory_roots): map hasher(blake2_128_concat) T::Hash => Option<[u8;32]>;
    }
}

decl_event! (
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        TemporalLockSubmitted(AccountId, u64),
        MemoryRootAnchored(AccountId),
    }
);

decl_error! {
    pub enum Error for Module<T: Config> {
        TooLarge,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        pub fn submit_temporal_lock(origin, target: T::AccountId, initial_hash: [u8;32], reveal_time: u64) -> DispatchResult {
            let who = ensure_signed(origin)?;
            // store only the initial hash as anchor; full puzzle verification off-chain
            <TemporalLocks<T>>::insert(&target, Some(initial_hash));
            Self::deposit_event(RawEvent::TemporalLockSubmitted(who, reveal_time));
            Ok(())
        }

        #[weight = 10_000]
        pub fn attest_memory_root(origin, root: [u8;32]) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let key = <frame_system::Module<T>>::block_number();
            // naive store by block number hash
            <MemoryRoots<T>>::insert(<T as frame_system::Config>::Hashing::hash_of(&key), Some(root));
            Self::deposit_event(RawEvent::MemoryRootAnchored(who));
            Ok(())
        }
    }
}
