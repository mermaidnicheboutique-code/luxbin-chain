//! ERC-4337 Account Abstraction Implementation for LUXBIN Runtime
//!
//! This pallet enables ERC-4337 account abstraction on the LUXBIN Substrate chain,
//! allowing Coinbase Smart Wallets and other ERC-4337 compatible wallets to interact.

#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

use codec::{Decode, Encode, MaxEncodedLen};
use frame_support::pallet_prelude::*;
use frame_system::pallet_prelude::*;
use scale_info::TypeInfo;
use sp_core::H160;
use sp_runtime::traits::Hash;
use sp_std::prelude::*;

// User Operation structure matching ERC-4337
#[derive(Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
#[codec(mel_bound())]
pub struct UserOperation<T: Config> {
	pub sender: H160,
	pub nonce: u64,
	pub init_code: BoundedVec<u8, T::MaxInitCodeSize>,
	pub call_data: BoundedVec<u8, T::MaxCallDataSize>,
	pub call_gas_limit: u64,
	pub verification_gas_limit: u64,
	pub pre_verification_gas: u64,
	pub max_fee_per_gas: u128,
	pub max_priority_fee_per_gas: u128,
	pub paymaster_and_data: BoundedVec<u8, T::MaxPaymasterDataSize>,
	pub signature: BoundedVec<u8, T::MaxSignatureSize>,
}

// Manual implementations for UserOperation
impl<T: Config> Clone for UserOperation<T> {
	fn clone(&self) -> Self {
		Self {
			sender: self.sender,
			nonce: self.nonce,
			init_code: self.init_code.clone(),
			call_data: self.call_data.clone(),
			call_gas_limit: self.call_gas_limit,
			verification_gas_limit: self.verification_gas_limit,
			pre_verification_gas: self.pre_verification_gas,
			max_fee_per_gas: self.max_fee_per_gas,
			max_priority_fee_per_gas: self.max_priority_fee_per_gas,
			paymaster_and_data: self.paymaster_and_data.clone(),
			signature: self.signature.clone(),
		}
	}
}

impl<T: Config> PartialEq for UserOperation<T> {
	fn eq(&self, other: &Self) -> bool {
		self.sender == other.sender &&
		self.nonce == other.nonce &&
		self.init_code == other.init_code &&
		self.call_data == other.call_data &&
		self.call_gas_limit == other.call_gas_limit &&
		self.verification_gas_limit == other.verification_gas_limit &&
		self.pre_verification_gas == other.pre_verification_gas &&
		self.max_fee_per_gas == other.max_fee_per_gas &&
		self.max_priority_fee_per_gas == other.max_priority_fee_per_gas &&
		self.paymaster_and_data == other.paymaster_and_data &&
		self.signature == other.signature
	}
}

impl<T: Config> Eq for UserOperation<T> {}

impl<T: Config> sp_std::fmt::Debug for UserOperation<T> {
	fn fmt(&self, f: &mut sp_std::fmt::Formatter) -> sp_std::fmt::Result {
		f.debug_struct("UserOperation")
			.field("sender", &self.sender)
			.field("nonce", &self.nonce)
			.field("call_gas_limit", &self.call_gas_limit)
			.finish()
	}
}

#[frame_support::pallet]
pub mod pallet {
	use super::*;

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	#[pallet::config]
	pub trait Config: frame_system::Config {
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

		/// Maximum size of init code
		#[pallet::constant]
		type MaxInitCodeSize: Get<u32>;

		/// Maximum size of call data
		#[pallet::constant]
		type MaxCallDataSize: Get<u32>;

		/// Maximum size of paymaster data
		#[pallet::constant]
		type MaxPaymasterDataSize: Get<u32>;

		/// Maximum size of signature
		#[pallet::constant]
		type MaxSignatureSize: Get<u32>;

		/// Maximum number of operations in a bundle
		#[pallet::constant]
		type MaxBundleSize: Get<u32>;

		/// EntryPoint contract address
		#[pallet::constant]
		type EntryPointAddress: Get<H160>;
	}

	#[pallet::storage]
	#[pallet::getter(fn user_operations)]
	pub type UserOperations<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::Hash,
		UserOperation<T>,
		OptionQuery,
	>;

	#[pallet::storage]
	#[pallet::getter(fn nonces)]
	pub type Nonces<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		H160, // Smart wallet address
		u64,  // Nonce
		ValueQuery,
	>;

	#[pallet::storage]
	#[pallet::getter(fn deposited_balance)]
	pub type DepositedBalance<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		H160, // Smart wallet address
		u128, // Deposited balance for gas
		ValueQuery,
	>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// User operation submitted [op_hash, submitter]
		UserOperationSubmitted { op_hash: T::Hash, submitter: T::AccountId },
		/// User operation executed [op_hash, success, gas_used]
		UserOperationExecuted { op_hash: T::Hash, success: bool, gas_used: u64 },
		/// Bundle processed [num_ops, total_gas]
		BundleProcessed { num_ops: u32, total_gas: u64 },
		/// Deposit made [account, amount]
		DepositMade { account: H160, amount: u128 },
		/// Withdrawal made [account, amount]
		WithdrawalMade { account: H160, amount: u128 },
	}

	#[pallet::error]
	pub enum Error<T> {
		/// Invalid user operation
		InvalidUserOperation,
		/// Insufficient deposited funds
		InsufficientFunds,
		/// Bundle too large
		BundleTooLarge,
		/// Execution failed
		ExecutionFailed,
		/// Invalid signature
		InvalidSignature,
		/// Sender account not deployed
		SenderNotDeployed,
		/// Invalid nonce
		InvalidNonce,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Submit a user operation to the entry point
		#[pallet::call_index(0)]
		#[pallet::weight(100_000)]
		pub fn submit_user_operation(
			origin: OriginFor<T>,
			user_op: UserOperation<T>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Validate user operation
			Self::validate_user_operation(&user_op)?;

			// Generate user operation hash
			let user_op_hash = Self::hash_user_operation(&user_op);

			// Store user operation
			UserOperations::<T>::insert(user_op_hash, user_op);

			Self::deposit_event(Event::UserOperationSubmitted {
				op_hash: user_op_hash,
				submitter: who,
			});
			Ok(())
		}

		/// Execute a bundle of user operations (bundler only)
		#[pallet::call_index(1)]
		#[pallet::weight(200_000)]
		pub fn execute_bundle(
			origin: OriginFor<T>,
			user_ops: BoundedVec<UserOperation<T>, T::MaxBundleSize>,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			let mut total_gas = 0u64;
			let mut executed_ops = 0u32;

			for user_op in user_ops.iter() {
				match Self::execute_user_operation(user_op) {
					Ok(gas_used) => {
						let op_hash = Self::hash_user_operation(user_op);
						total_gas += gas_used;
						executed_ops += 1;

						Self::deposit_event(Event::UserOperationExecuted {
							op_hash,
							success: true,
							gas_used,
						});
					}
					Err(_) => {
						let op_hash = Self::hash_user_operation(user_op);
						Self::deposit_event(Event::UserOperationExecuted {
							op_hash,
							success: false,
							gas_used: 0,
						});
						continue;
					}
				}
			}

			Self::deposit_event(Event::BundleProcessed {
				num_ops: executed_ops,
				total_gas,
			});
			Ok(())
		}

		/// Deposit funds for gas payment
		#[pallet::call_index(2)]
		#[pallet::weight(50_000)]
		pub fn deposit(
			origin: OriginFor<T>,
			account: H160,
			amount: u128,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			DepositedBalance::<T>::mutate(account, |balance| {
				*balance = balance.saturating_add(amount);
			});

			Self::deposit_event(Event::DepositMade { account, amount });
			Ok(())
		}

		/// Withdraw deposited funds
		#[pallet::call_index(3)]
		#[pallet::weight(50_000)]
		pub fn withdraw(
			origin: OriginFor<T>,
			account: H160,
			amount: u128,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			DepositedBalance::<T>::try_mutate(account, |balance| {
				if *balance < amount {
					return Err(Error::<T>::InsufficientFunds);
				}
				*balance = balance.saturating_sub(amount);
				Ok(())
			})?;

			Self::deposit_event(Event::WithdrawalMade { account, amount });
			Ok(())
		}
	}

	impl<T: Config> Pallet<T> {
		fn validate_user_operation(user_op: &UserOperation<T>) -> DispatchResult {
			// Verify nonce
			let current_nonce = Nonces::<T>::get(user_op.sender);
			ensure!(user_op.nonce == current_nonce, Error::<T>::InvalidNonce);

			// Verify sufficient funds for gas
			let max_cost = user_op.call_gas_limit
				.saturating_mul(user_op.max_fee_per_gas as u64) as u128;
			let deposited = DepositedBalance::<T>::get(user_op.sender);
			ensure!(deposited >= max_cost, Error::<T>::InsufficientFunds);

			Ok(())
		}

		fn hash_user_operation(user_op: &UserOperation<T>) -> T::Hash {
			// Create a unique hash for the user operation
			let mut data = Vec::new();
			data.extend_from_slice(&user_op.sender.0);
			data.extend_from_slice(&user_op.nonce.to_be_bytes());
			data.extend_from_slice(&user_op.init_code);
			data.extend_from_slice(&user_op.call_data);
			data.extend_from_slice(&user_op.call_gas_limit.to_be_bytes());
			data.extend_from_slice(&user_op.verification_gas_limit.to_be_bytes());
			data.extend_from_slice(&user_op.pre_verification_gas.to_be_bytes());
			data.extend_from_slice(&user_op.max_fee_per_gas.to_be_bytes());
			data.extend_from_slice(&user_op.max_priority_fee_per_gas.to_be_bytes());

			<T as frame_system::Config>::Hashing::hash(&data)
		}

		fn execute_user_operation(user_op: &UserOperation<T>) -> Result<u64, DispatchError> {
			// Increment nonce
			Nonces::<T>::mutate(user_op.sender, |n| *n = n.saturating_add(1));

			// Deduct gas cost from deposited balance
			let gas_cost = user_op.call_gas_limit.saturating_mul(user_op.max_fee_per_gas as u64) as u128;
			DepositedBalance::<T>::mutate(user_op.sender, |balance| {
				*balance = balance.saturating_sub(gas_cost);
			});

			// In a real implementation, this would:
			// 1. Verify the signature
			// 2. Execute the call_data
			// 3. Handle paymaster logic if present
			// 4. Return actual gas used

			// For now, return the gas limit as gas used
			Ok(user_op.call_gas_limit)
		}
	}
}
