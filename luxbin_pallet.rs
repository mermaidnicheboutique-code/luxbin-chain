#![cfg_attr(not(feature = "std"), no_std)]

/// LUXBIN AI Pallet
/// Implements temporal cryptography and AI compute verification
pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
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
        /// AI request submitted
        AIRequestSubmitted { request_id: T::Hash, requester: T::AccountId },
        /// AI result verified and stored
        AIResultVerified { request_id: T::Hash, result_hash: T::Hash },
    }

    #[pallet::error]
    pub enum Error<T> {
        /// Invalid temporal key
        InvalidTemporalKey,
        /// HMAC verification failed
        HmacVerificationFailed,
        /// Request not found
        RequestNotFound,
    }

    #[pallet::storage]
    pub type AIRequests<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::Hash,
        AIRequest<T::AccountId, BoundedVec<u8, ConstU32<1024>>>,
    >;

    #[pallet::storage]
    pub type AIResults<T: Config> = StorageMap<
        _,
        Blake2_128Concat,
        T::Hash,
        BoundedVec<u8, ConstU32<1024>>,
    >;

    #[derive(Clone, Encode, Decode, Eq, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct AIRequest<AccountId, Data> {
        pub requester: AccountId,
        pub prompt: Data,
        pub temporal_key: [u8; 32],
        pub deadline: u64,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// Submit an AI compute request with temporal key
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn submit_ai_request(
            origin: OriginFor<T>,
            prompt: BoundedVec<u8, ConstU32<1024>>,
            temporal_key: [u8; 32],
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let request_id = T::Hashing::hash_of(&(&who, &prompt, &temporal_key, frame_system::Pallet::<T>::block_number()));

            let request = AIRequest {
                requester: who.clone(),
                prompt,
                temporal_key,
                deadline: frame_system::Pallet::<T>::block_number().saturated_into::<u64>() + 100,
            };

            <AIRequests<T>>::insert(request_id, request);

            Self::deposit_event(Event::AIRequestSubmitted {
                request_id,
                requester: who,
            });

            Ok(())
        }

        /// Submit AI result with HMAC verification
        #[pallet::call_index(1)]
        #[pallet::weight(10_000)]
        pub fn submit_ai_result(
            origin: OriginFor<T>,
            request_id: T::Hash,
            result: BoundedVec<u8, ConstU32<1024>>,
            hmac: [u8; 32],
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;

            let request = <AIRequests<T>>::get(request_id).ok_or(Error::<T>::RequestNotFound)?;

            // Verify temporal key is valid (simple check for demo)
            let current_time = frame_system::Pallet::<T>::block_number().saturated_into::<u64>();
            ensure!(current_time <= request.deadline, Error::<T>::InvalidTemporalKey);

            // Generate expected HMAC (simplified)
            let combined = [&request.temporal_key[..], &blake2_256(&result)[..]].concat();
            let expected_hmac = blake2_256(&combined);

            ensure!(hmac == expected_hmac, Error::<T>::HmacVerificationFailed);

            <AIResults<T>>::insert(request_id, result);
            <AIRequests<T>>::remove(request_id);

            Self::deposit_event(Event::AIResultVerified {
                request_id,
                result_hash: T::Hashing::hash_of(&result),
            });

            Ok(())
        }
    }
}