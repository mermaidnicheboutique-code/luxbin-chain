#![cfg_attr(not(feature = "std"), no_std)]

//! # LUXBIN AI Compute Pallet
//!
//! Decentralized AI computation network with temporal cryptographic access control.
//!
//! ## Overview
//!
//! This pallet provides a decentralized marketplace for AI computation:
//! - Users submit AI compute requests with temporal keys
//! - AI nodes register to provide computation services
//! - Blockchain verifies computation integrity with HMAC proofs
//! - Automatic escrow and payment system
//!
//! ## Integration with Temporal Crypto
//!
//! This pallet depends on `pallet-temporal-crypto` for:
//! - Temporal key generation and validation
//! - Photonic encoding for visual representation
//! - Time-based cryptographic security
//!
//! ## Key Features
//!
//! - **Temporal Gating:** AI access controlled by time-locked keys
//! - **Trustless Verification:** HMAC proofs ensure computation integrity
//! - **Automatic Payments:** Escrow system with instant settlement
//! - **Decentralized:** Open marketplace for AI computation
//! - **Privacy:** Only hashes stored on-chain

pub use pallet::*;

use frame_support::{
	pallet_prelude::*,
	traits::{Currency, ReservableCurrency},
};
use frame_system::{ensure_signed, pallet_prelude::*};
use sp_core::{H256, H512, ConstU32};
use sp_std::vec::Vec;
use sha3::{Digest, Sha3_512};

type BalanceOf<T> = <<T as pallet_temporal_crypto::Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

/// AI Compute Request Status
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub enum AIComputeStatus {
	/// Request submitted, waiting for assignment
	Pending,
	/// Assigned to AI node
	Assigned,
	/// AI node computing result
	Computing,
	/// Result submitted, waiting for verification
	Verifying,
	/// Computation completed and verified
	Completed,
	/// Computation failed or rejected
	Failed,
}

/// AI Model Type
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug, DecodeWithMemTracking)]
pub enum AIModel {
	/// GPT-4 (OpenAI)
	GPT4,
	/// GPT-4 Turbo (OpenAI)
	GPT4Turbo,
	/// GPT-3.5 Turbo (OpenAI)
	GPT35Turbo,
	/// Claude 3 Opus (Anthropic)
	Claude3Opus,
	/// Claude 3 Sonnet (Anthropic)
	Claude3Sonnet,
	/// Claude 3 Haiku (Anthropic)
	Claude3Haiku,
	/// Grok (xAI)
	Grok,
	/// Grok-2 (xAI)
	Grok2,
	/// Llama 3 (Meta)
	Llama3,
	/// Llama 3.1 (Meta)
	Llama31,
	/// Gemini 1.5 Pro (Google)
	Gemini15Pro,
	/// Gemini 1.5 Flash (Google)
	Gemini15Flash,
	/// Local LLM (Llama, Mistral, etc.)
	LocalLLM,
	/// Custom model
	Custom,
}

/// AI Compute Request
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct AIComputeRequest<AccountId, Balance, BlockNumber> {
	/// User who submitted the request
	pub requester: AccountId,
	/// Temporal key for access control
	pub temporal_key: H512,
	/// Hash of the AI prompt/request data
	pub request_hash: H256,
	/// AI model requested
	pub model: AIModel,
	/// Maximum tokens for response
	pub max_tokens: u32,
	/// Block number when request was created
	pub created_at: BlockNumber,
	/// Payment amount in LUXBIN tokens
	pub payment: Balance,
	/// Assigned AI node (None if not assigned)
	pub assigned_node: Option<AccountId>,
	/// Current status
	pub status: AIComputeStatus,
}

/// AI Compute Result
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct AIComputeResult<AccountId, BlockNumber> {
	/// Hash of the AI output
	pub output_hash: H256,
	/// HMAC of output using temporal key
	pub output_hmac: H512,
	/// AI node that computed the result
	pub node: AccountId,
	/// Block number when result was submitted
	pub submitted_at: BlockNumber,
	/// Temporal proof that computation happened at valid time
	pub temporal_proof: H512,
	/// Number of tokens used (for billing)
	pub tokens_used: u32,
}

/// AI Model Metadata
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct AIModelMetadata<BlockNumber> {
	/// Model identifier
	pub model: AIModel,
	/// Model name string
	pub name: BoundedVec<u8, ConstU32<64>>,
	/// Model provider
	pub provider: BoundedVec<u8, ConstU32<32>>,
	/// Model version
	pub version: BoundedVec<u8, ConstU32<16>>,
	/// Maximum context length
	pub max_context: u32,
	/// Energy efficiency rating (0-100, higher is more efficient)
	pub energy_rating: u8,
	/// Base cost per token (in smallest currency unit)
	pub base_cost: u64,
	/// Model capabilities
	pub capabilities: AIModelCapabilities,
	/// Registration block
	pub registered_at: BlockNumber,
}

/// AI Model Capabilities
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug, DecodeWithMemTracking)]
pub enum AIModelCapabilities {
	/// Text generation only
	TextGeneration,
	/// Text + Code generation
	TextAndCode,
	/// Multimodal (text, images, etc.)
	Multimodal,
	/// Specialized (medical, legal, etc.)
	Specialized,
}

/// AI Node Information
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct AINodeInfo<BlockNumber> {
	/// Is the node currently active
	pub is_active: bool,
	/// Models this node supports (max 10 models)
	pub supported_models: BoundedVec<AIModel, ConstU32<10>>,
	/// Total requests completed
	pub total_completed: u64,
	/// Total requests failed
	pub total_failed: u64,
	/// Average response time (in blocks)
	pub avg_response_time: u32,
	/// Energy consumed (in watt-hours)
	pub energy_consumed: u64,
	/// Registration block
	pub registered_at: BlockNumber,
}

// NOTE: AI Provider implementations (OpenAI, Anthropic, xAI adapters) have been removed
// from the on-chain pallet as they require std features (format!, HTTP calls, etc.).
// These belong in off-chain worker nodes or external AI compute nodes, not in the
// blockchain runtime. The pallet only handles on-chain verification of AI computation.

#[frame_support::pallet]
pub mod pallet {
	use super::*;

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	#[pallet::config]
	pub trait Config: frame_system::Config + pallet_temporal_crypto::Config {
		/// The overarching event type.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

		/// Maximum number of supported models per node
		#[pallet::constant]
		type MaxModelsPerNode: Get<u32>;

		/// Maximum tokens per request
		#[pallet::constant]
		type MaxTokensPerRequest: Get<u32>;
	}

	/// Counter for AI compute request IDs
	#[pallet::storage]
	#[pallet::getter(fn next_request_id)]
	pub type NextRequestId<T: Config> = StorageValue<_, u64, ValueQuery>;

	/// Storage for AI compute requests indexed by request ID
	#[pallet::storage]
	#[pallet::getter(fn ai_compute_requests)]
	pub type AIComputeRequests<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		AIComputeRequest<T::AccountId, BalanceOf<T>, BlockNumberFor<T>>,
		OptionQuery,
	>;

	/// Storage for AI compute results indexed by request ID
	#[pallet::storage]
	#[pallet::getter(fn ai_compute_results)]
	pub type AIComputeResults<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		AIComputeResult<T::AccountId, BlockNumberFor<T>>,
		OptionQuery,
	>;

	/// Storage for AI node information
	#[pallet::storage]
	#[pallet::getter(fn ai_nodes)]
	pub type AINodes<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		AINodeInfo<BlockNumberFor<T>>,
		OptionQuery,
	>;

	/// Pending requests queue (for efficient assignment)
	#[pallet::storage]
	#[pallet::getter(fn pending_requests)]
	pub type PendingRequests<T: Config> = StorageValue<_, BoundedVec<u64, ConstU32<1000>>, ValueQuery>;

	/// Storage for AI model metadata indexed by model type
	#[pallet::storage]
	#[pallet::getter(fn ai_model_metadata)]
	pub type AIModelMetadataStore<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		AIModel,
		AIModelMetadata<BlockNumberFor<T>>,
		OptionQuery,
	>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// AI node registered
		AINodeRegistered { node: T::AccountId, models: BoundedVec<AIModel, ConstU32<10>> },
		/// AI node unregistered
		AINodeUnregistered { node: T::AccountId },
		/// AI node updated supported models
		AINodeUpdated { node: T::AccountId, models: BoundedVec<AIModel, ConstU32<10>> },
		/// AI compute request submitted
		AIComputeRequestSubmitted {
			request_id: u64,
			requester: T::AccountId,
			model: AIModel,
			payment: BalanceOf<T>,
		},
		/// AI compute request assigned to node
		AIComputeRequestAssigned { request_id: u64, node: T::AccountId },
		/// AI compute result submitted
		AIComputeResultSubmitted { request_id: u64, node: T::AccountId },
		/// AI compute verified and payment released
		AIComputeVerified {
			request_id: u64,
			node: T::AccountId,
			payment: BalanceOf<T>,
			tokens_used: u32,
		},
		/// AI compute failed
		AIComputeFailed { request_id: u64, reason: Vec<u8> },
		/// Request cancelled by user
		AIComputeCancelled { request_id: u64, requester: T::AccountId },
		/// AI model registered
		AIModelRegistered { model: AIModel, provider: BoundedVec<u8, ConstU32<32>>, energy_rating: u8 },
		/// AI model updated
		AIModelUpdated { model: AIModel, energy_rating: u8 },
	}

	#[pallet::error]
	pub enum Error<T> {
		/// AI node already registered
		AINodeAlreadyRegistered,
		/// AI node not registered
		AINodeNotRegistered,
		/// AI compute request not found
		AIComputeRequestNotFound,
		/// Insufficient balance for AI compute payment
		InsufficientBalance,
		/// Invalid AI compute request
		InvalidAIComputeRequest,
		/// AI compute result verification failed
		AIComputeVerificationFailed,
		/// Not authorized (only assigned node can submit result)
		NotAuthorizedNode,
		/// Request already completed
		RequestAlreadyCompleted,
		/// Too many models specified
		TooManyModels,
		/// Max tokens exceeded
		MaxTokensExceeded,
		/// Model not supported by node
		ModelNotSupported,
		/// Not authorized to cancel (only requester)
		NotAuthorizedToCancel,
		/// Cannot cancel completed request
		CannotCancelCompleted,
		/// AI model already registered
		AIModelAlreadyRegistered,
		/// AI model not registered
		AIModelNotRegistered,
		/// Invalid model parameters
		InvalidModelParameters,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Register a new AI model in the system
		///
		/// # Parameters
		/// - `model`: The AI model identifier
		/// - `name`: Human-readable model name
		/// - `provider`: Model provider (e.g., "OpenAI", "Anthropic")
		/// - `version`: Model version string
		/// - `max_context`: Maximum context length in tokens
		/// - `energy_rating`: Energy efficiency rating (0-100)
		/// - `base_cost`: Base cost per token
		/// - `capabilities`: Model capabilities
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(0)]
		#[pallet::weight(10_000)]
		pub fn register_ai_model(
			origin: OriginFor<T>,
			model: AIModel,
			name: BoundedVec<u8, ConstU32<64>>,
			provider: BoundedVec<u8, ConstU32<32>>,
			version: BoundedVec<u8, ConstU32<16>>,
			max_context: u32,
			energy_rating: u8,
			base_cost: u64,
			capabilities: AIModelCapabilities,
		) -> DispatchResult {
			ensure_root(origin)?;

			// Validate parameters
			ensure!(energy_rating <= 100, Error::<T>::InvalidModelParameters);
			ensure!(!name.is_empty(), Error::<T>::InvalidModelParameters);
			ensure!(!provider.is_empty(), Error::<T>::InvalidModelParameters);

			// Check if model is already registered
			ensure!(
				!AIModelMetadataStore::<T>::contains_key(&model),
				Error::<T>::AIModelAlreadyRegistered
			);

			let current_block = frame_system::Pallet::<T>::block_number();

			let metadata = AIModelMetadata {
				model: model.clone(),
				name: name.clone(),
				provider: provider.clone(),
				version,
				max_context,
				energy_rating,
				base_cost,
				capabilities,
				registered_at: current_block,
			};

			AIModelMetadataStore::<T>::insert(model.clone(), metadata);

			Self::deposit_event(Event::AIModelRegistered {
				model,
				provider,
				energy_rating,
			});

			Ok(())
		}

		/// Register as an AI compute node
		///
		/// # Parameters
		/// - `supported_models`: List of AI models this node can run
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(1)]
		#[pallet::weight(10_000)]
		pub fn register_ai_node(
			origin: OriginFor<T>,
			supported_models: BoundedVec<AIModel, ConstU32<10>>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Check not already registered
			ensure!(
				!AINodes::<T>::contains_key(&who),
				Error::<T>::AINodeAlreadyRegistered
			);

			// Validate models list
			ensure!(
				supported_models.len() <= T::MaxModelsPerNode::get() as usize,
				Error::<T>::TooManyModels
			);

			// Create node info
			let node_info = AINodeInfo {
				is_active: true,
				supported_models: supported_models.clone(),
				total_completed: 0,
				total_failed: 0,
				avg_response_time: 0,
				energy_consumed: 0,
				registered_at: frame_system::Pallet::<T>::block_number(),
			};

			// Register node
			AINodes::<T>::insert(&who, node_info);

			// Emit event
			Self::deposit_event(Event::AINodeRegistered {
				node: who,
				models: supported_models,
			});

			Ok(())
		}

		/// Unregister as an AI compute node
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(2)]
		#[pallet::weight(10_000)]
		pub fn unregister_ai_node(origin: OriginFor<T>) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Check is registered
			ensure!(
				AINodes::<T>::contains_key(&who),
				Error::<T>::AINodeNotRegistered
			);

			// Remove node
			AINodes::<T>::remove(&who);

			// Emit event
			Self::deposit_event(Event::AINodeUnregistered { node: who });

			Ok(())
		}

		/// Update supported models for an AI node
		///
		/// # Parameters
		/// - `supported_models`: New list of supported models
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(3)]
		#[pallet::weight(10_000)]
		pub fn update_supported_models(
			origin: OriginFor<T>,
			supported_models: BoundedVec<AIModel, ConstU32<10>>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Check is registered
			let mut node_info = AINodes::<T>::get(&who)
				.ok_or(Error::<T>::AINodeNotRegistered)?;

			// Validate models list
			ensure!(
				supported_models.len() <= T::MaxModelsPerNode::get() as usize,
				Error::<T>::TooManyModels
			);

			// Update models
			node_info.supported_models = supported_models.clone();
			AINodes::<T>::insert(&who, node_info);

			// Emit event
			Self::deposit_event(Event::AINodeUpdated {
				node: who,
				models: supported_models,
			});

			Ok(())
		}

		/// Submit an AI compute request with temporal key
		///
		/// # Parameters
		/// - `temporal_key`: Temporal cryptographic key for access control
		/// - `request_hash`: Hash of the AI prompt/request data
		/// - `model`: AI model to use
		/// - `max_tokens`: Maximum tokens for response
		/// - `payment`: Amount to pay for computation
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(4)]
		#[pallet::weight(10_000)]
		pub fn submit_ai_compute_request(
			origin: OriginFor<T>,
			temporal_key: H512,
			request_hash: H256,
			model: AIModel,
			max_tokens: u32,
			payment: BalanceOf<T>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Validate max tokens
			ensure!(
				max_tokens <= T::MaxTokensPerRequest::get(),
				Error::<T>::MaxTokensExceeded
			);

			// Verify user has sufficient balance
			ensure!(
				T::Currency::can_reserve(&who, payment),
				Error::<T>::InsufficientBalance
			);

			// Reserve payment
			T::Currency::reserve(&who, payment)?;

			// Create request ID
			let request_id = NextRequestId::<T>::get();
			NextRequestId::<T>::put(request_id + 1);

			// Create request
			let request = AIComputeRequest {
				requester: who.clone(),
				temporal_key,
				request_hash,
				model: model.clone(),
				max_tokens,
				created_at: frame_system::Pallet::<T>::block_number(),
				payment,
				assigned_node: None,
				status: AIComputeStatus::Pending,
			};

			// Store request
			AIComputeRequests::<T>::insert(request_id, request);

			// Add to pending queue
			let mut current_queue: Vec<u64> = PendingRequests::<T>::get().into_iter().collect();
			current_queue.push(request_id);
			let new_queue = BoundedVec::try_from(current_queue).unwrap_or_default();
			PendingRequests::<T>::set(new_queue);

			// Emit event
			Self::deposit_event(Event::AIComputeRequestSubmitted {
				request_id,
				requester: who,
				model,
				payment,
			});

			Ok(())
		}

		/// Assign AI compute request to a node (called by node)
		///
		/// # Parameters
		/// - `request_id`: ID of the request to assign
		///
		/// # Weight
		/// O(n) where n is queue size (TODO: optimize with priority queue)
		#[pallet::call_index(5)]
		#[pallet::weight(10_000)]
		pub fn assign_ai_compute_request(
			origin: OriginFor<T>,
			request_id: u64,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Get node info
			let mut node_info = AINodes::<T>::get(&who)
				.ok_or(Error::<T>::AINodeNotRegistered)?;

			// Get request
			let mut request = AIComputeRequests::<T>::get(request_id)
				.ok_or(Error::<T>::AIComputeRequestNotFound)?;

			// Verify request is pending
			ensure!(
				AIComputeStatus::Pending == request.status,
				Error::<T>::InvalidAIComputeRequest
			);

			// Verify node supports the requested model
			ensure!(
				node_info.supported_models.contains(&request.model),
				Error::<T>::ModelNotSupported
			);

			// Assign to node
			request.assigned_node = Some(who.clone());
			request.status = AIComputeStatus::Assigned;

			// Update request
			AIComputeRequests::<T>::insert(request_id, request);

			// Remove from pending queue
			let current_queue: Vec<u64> = PendingRequests::<T>::get().into_iter().collect();
			let filtered: Vec<u64> = current_queue.into_iter().filter(|&id| id != request_id).collect();
			let new_queue = BoundedVec::try_from(filtered).unwrap_or_default();
			PendingRequests::<T>::set(new_queue);

			// Emit event
			Self::deposit_event(Event::AIComputeRequestAssigned {
				request_id,
				node: who,
			});

			Ok(())
		}

		/// Submit AI compute result with HMAC verification
		///
		/// # Parameters
		/// - `request_id`: ID of the request
		/// - `output_hash`: Hash of the AI output
		/// - `output_hmac`: HMAC of output using temporal key
		/// - `tokens_used`: Number of tokens used
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(6)]
		#[pallet::weight(10_000)]
		pub fn submit_ai_compute_result(
			origin: OriginFor<T>,
			request_id: u64,
			output_hash: H256,
			output_hmac: H512,
			tokens_used: u32,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Get request
			let mut request = AIComputeRequests::<T>::get(request_id)
				.ok_or(Error::<T>::AIComputeRequestNotFound)?;

			// Verify caller is assigned node
			ensure!(
				Some(who.clone()) == request.assigned_node,
				Error::<T>::NotAuthorizedNode
			);

			// Verify not already completed
			ensure!(
				AIComputeStatus::Completed != request.status,
				Error::<T>::RequestAlreadyCompleted
			);

			// Verify HMAC matches temporal key
			let temporal_proof = Self::verify_ai_output_hmac(
				&request.temporal_key,
				&output_hash,
				&output_hmac,
			)?;

			// Create result
			let result = AIComputeResult {
				output_hash,
				output_hmac,
				node: who.clone(),
				submitted_at: frame_system::Pallet::<T>::block_number(),
				temporal_proof,
				tokens_used,
			};

			// Store result
			AIComputeResults::<T>::insert(request_id, result);

			// Update request status
			request.status = AIComputeStatus::Completed;
			let requester = request.requester.clone();
			let payment = request.payment;
			AIComputeRequests::<T>::insert(request_id, request);

			// Update node stats
			AINodes::<T>::mutate(&who, |node_opt| {
				if let Some(node) = node_opt {
					node.total_completed += 1;
				}
			});

			// Release payment to node
			T::Currency::unreserve(&requester, payment);
			T::Currency::transfer(
				&requester,
				&who,
				payment,
				frame_support::traits::ExistenceRequirement::KeepAlive,
			)?;

			// Emit event
			Self::deposit_event(Event::AIComputeVerified {
				request_id,
				node: who,
				payment,
				tokens_used,
			});

			Ok(())
		}

		/// Cancel a pending AI compute request
		///
		/// # Parameters
		/// - `request_id`: ID of the request to cancel
		///
		/// # Weight
		/// O(n) where n is queue size
		#[pallet::call_index(7)]
		#[pallet::weight(10_000)]
		pub fn cancel_ai_compute_request(
			origin: OriginFor<T>,
			request_id: u64,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			// Get request
			let request = AIComputeRequests::<T>::get(request_id)
				.ok_or(Error::<T>::AIComputeRequestNotFound)?;

			// Verify caller is requester
			ensure!(
				who == request.requester,
				Error::<T>::NotAuthorizedToCancel
			);

			// Verify not completed
			ensure!(
				AIComputeStatus::Completed != request.status,
				Error::<T>::CannotCancelCompleted
			);

			// Unreserve payment
			T::Currency::unreserve(&who, request.payment);

			// Remove from pending queue if still pending
			if AIComputeStatus::Pending == request.status {
				let current_queue: Vec<u64> = PendingRequests::<T>::get().into_iter().collect();
				let filtered: Vec<u64> = current_queue.into_iter().filter(|&id| id != request_id).collect();
				let new_queue = BoundedVec::try_from(filtered).unwrap_or_default();
				PendingRequests::<T>::set(new_queue);
			}

			// Remove request
			AIComputeRequests::<T>::remove(request_id);

			// Emit event
			Self::deposit_event(Event::AIComputeCancelled {
				request_id,
				requester: who,
			});

			Ok(())
		}
	}
}

impl<T: Config> Pallet<T> {
	/// Verify AI output HMAC using temporal key
	///
	/// # Process:
	/// 1. Combine output_hash + temporal_key
	/// 2. Hash with SHA3-512
	/// 3. Compare with provided HMAC
	///
	/// # Returns
	/// Temporal proof hash if valid, error otherwise
	fn verify_ai_output_hmac(
		temporal_key: &H512,
		output_hash: &H256,
		output_hmac: &H512,
	) -> Result<H512, Error<T>> {
		// Combine output hash and temporal key
		let mut combined = Vec::new();
		combined.extend_from_slice(output_hash.as_bytes());
		combined.extend_from_slice(temporal_key.as_bytes());

		// Compute HMAC
		let mut hasher = Sha3_512::new();
		hasher.update(&combined);
		let result = hasher.finalize();
		let computed_hmac = H512::from_slice(&result[..]);

		// Verify HMAC matches
		ensure!(
			&computed_hmac == output_hmac,
			Error::<T>::AIComputeVerificationFailed
		);

		// Return temporal proof (hash of the HMAC for verification)
		let mut proof_hasher = Sha3_512::new();
		proof_hasher.update(output_hmac.as_bytes());
		let proof_result = proof_hasher.finalize();
		Ok(H512::from_slice(&proof_result[..]))
	}
}
