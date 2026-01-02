#![cfg_attr(not(feature = "std"), no_std)]

//! # LUXBIN Quantum AI Pallet
//!
//! Interactive quantum threat prediction, neural analysis, energy optimization, and quantum eyes visualization.
//!
//! ## Overview
//!
//! This pallet provides 4 interactive quantum AI features:
//! 1. **Threat Prediction**: Quantum-enhanced threat analysis using Grover's algorithm
//! 2. **Neural Analyzer**: Federated learning across multiple chains (Base, Ethereum, Arbitrum, Polygon)
//! 3. **Energy Optimization**: Tesla Fleet integration for compute load optimization
//! 4. **Quantum Eyes**: Photonic vision system for blockchain transaction decoding
//!
//! ## User Interactions
//!
//! Users can submit on-chain requests for:
//! - Threat analysis of transactions
//! - Neural network configuration
//! - Energy optimization recommendations
//! - Quantum eyes transaction decoding
//!
//! Off-chain workers (Python services) fulfill these requests and submit results.

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

/// Request Status
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub enum RequestStatus {
	Pending,
	Processing,
	Completed,
	Failed,
}

/// Chain Identifier
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub enum ChainId {
	Base = 1,
	Ethereum = 2,
	Arbitrum = 3,
	Polygon = 4,
}

/// Attack Type
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub enum AttackType {
	MEVSandwich,
	FrontRunning,
	FlashLoan,
	ReentrancyAttack,
	CrossChainBridge,
	OracleManipulation,
	GovernanceAttack,
	Custom(BoundedVec<u8, ConstU32<32>>),
}

/// Light Color for Quantum Eyes
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub enum LightColor {
	Red = 0,
	Orange = 1,
	Yellow = 2,
	Green = 3,
	Cyan = 4,
	Blue = 5,
	Violet = 6,
}

/// Polarization Type
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub enum Polarization {
	Horizontal,
	Vertical,
	Diagonal,
	Circular,
}

/// Urgency Level for Energy Optimization
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub enum UrgencyLevel {
	Low,
	Normal,
	High,
}

/// Transaction Data for Threat Analysis
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct TransactionData {
	pub from_address: H256,
	pub to_address: H256,
	pub value: u128,
	pub gas_price: u64,
	pub gas_limit: u64,
	pub block_number: u32,
}

/// Threat Analysis Request
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct ThreatAnalysisRequest<T: Config> {
	pub requester: T::AccountId,
	pub tx_data: TransactionData,
	pub timestamp: u64,
	pub status: RequestStatus,
}

/// Threat Analysis Result
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct ThreatAnalysisResult {
	/// Threat probability (0-100)
	pub threat_probability: u8,
	/// Cross-chain risk score (0-100)
	pub cross_chain_risk: u8,
	/// Quantum advantage factor (1-20)
	pub quantum_advantage: u8,
	/// Top 5 predicted attack types
	pub predicted_attacks: BoundedVec<AttackType, ConstU32<5>>,
	/// Timestamp of analysis
	pub timestamp: u64,
}

/// Neural Configuration
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct NeuralConfig {
	pub low_threshold: u8,
	pub medium_threshold: u8,
	pub high_threshold: u8,
	pub enabled_chains: BoundedVec<ChainId, ConstU32<4>>,
}

/// Neural Analyzer State
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct NeuralState<T: Config> {
	pub chain_id: ChainId,
	/// Model hash (IPFS CID or local hash)
	pub model_hash: H256,
	/// Accuracy percentage (0-100)
	pub accuracy: u8,
	/// Total threats detected
	pub total_detected: u64,
	/// False positives count
	pub false_positives: u64,
	/// Last training round
	pub last_trained_block: BlockNumberFor<T>,
	/// Federated learning round number
	pub round_number: u32,
}

/// Energy Optimization Request
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct EnergyOptimizationRequest<T: Config> {
	pub requester: T::AccountId,
	pub pending_transactions: u32,
	pub urgency_level: UrgencyLevel,
	pub timestamp: u64,
	pub status: RequestStatus,
}

/// Energy Optimization Result
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct EnergyOptimizationResult {
	/// Should charge from grid
	pub charge_from_grid: bool,
	/// Should discharge to grid
	pub discharge_to_grid: bool,
	/// Power for compute (kW)
	pub power_compute_kw: u32,
	/// Battery power (kW)
	pub battery_power_kw: u32,
	/// Grid power (kW)
	pub grid_power_kw: u32,
	/// Recommendation reasoning
	pub reasoning: BoundedVec<u8, ConstU32<256>>,
	/// Timestamp
	pub timestamp: u64,
}

/// Energy Data
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct EnergyData {
	/// Tesla fleet capacity (kWh)
	pub fleet_capacity_kwh: u32,
	/// Available capacity (kWh)
	pub available_capacity_kwh: u32,
	/// Grid demand (0-100 scale)
	pub grid_demand: u8,
	/// Electricity price (cents per kWh)
	pub electricity_price: u16,
	/// Arbitrage profit (USDC cents)
	pub arbitrage_profit: u32,
	/// Carbon offset (kg CO2)
	pub carbon_offset_kg: u32,
	/// Compute load (0-100 scale)
	pub compute_load: u8,
	/// Timestamp
	pub timestamp: u64,
}

/// Quantum Eyes Request
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct QuantumEyesRequest<T: Config> {
	pub requester: T::AccountId,
	pub tx_hash: H256,
	pub timestamp: u64,
	pub status: RequestStatus,
}

/// Photon
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub struct Photon {
	/// Wavelength (nanometers)
	pub wavelength: u16,
	/// Energy (eV * 100 for precision)
	pub energy: u16,
	/// Polarization type
	pub polarization: Polarization,
}

/// Photonic Vision
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct PhotonicVision {
	/// Transaction hash
	pub tx_hash: H256,
	/// Left eye photons
	pub left_eye: BoundedVec<Photon, ConstU32<100>>,
	/// Right eye photons
	pub right_eye: BoundedVec<Photon, ConstU32<100>>,
	/// Dominant color
	pub color: LightColor,
	/// Quantum state representation (binary)
	pub quantum_state: BoundedVec<u8, ConstU32<512>>,
	/// Decoded message
	pub decoded_message: BoundedVec<u8, ConstU32<256>>,
	/// Timestamp
	pub timestamp: u64,
}

/// Threat Data (for automated per-block predictions)
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
#[scale_info(skip_type_params(T))]
pub struct ThreatData<T: Config> {
	/// Threat probability (0-100)
	pub threat_probability: u8,
	/// Cross-chain risk score (0-100)
	pub cross_chain_risk: u8,
	/// Quantum advantage factor (1-20)
	pub quantum_advantage: u8,
	/// Top 5 predicted attack types
	pub predicted_attacks: BoundedVec<AttackType, ConstU32<5>>,
	/// Timestamp of prediction
	pub timestamp: u64,
	/// Block hash for verification
	pub block_hash: T::Hash,
}

#[frame_support::pallet]
pub mod pallet {
	use super::*;

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	#[pallet::config]
	pub trait Config: frame_system::Config + pallet_temporal_crypto::Config {
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

		/// Maximum threat predictions stored per session
		#[pallet::constant]
		type MaxThreatPredictions: Get<u32>;

		/// Maximum neural chains supported
		#[pallet::constant]
		type MaxNeuralChains: Get<u32>;

		/// Maximum grid metric entries (24h at 10min intervals = 144)
		#[pallet::constant]
		type MaxGridMetrics: Get<u32>;

		/// Maximum quantum eyes entries
		#[pallet::constant]
		type MaxQuantumEyesEntries: Get<u32>;

		/// Minimum threat level to trigger alert (0-100)
		#[pallet::constant]
		type ThreatAlertThreshold: Get<u8>;
	}

	// ===== STORAGE =====

	/// Threat prediction storage (automated per-block)
	#[pallet::storage]
	#[pallet::getter(fn threat_predictions)]
	pub type ThreatPredictions<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		BlockNumberFor<T>,
		ThreatData<T>,
		OptionQuery,
	>;

	/// Neural analyzer state per chain
	#[pallet::storage]
	#[pallet::getter(fn neural_state)]
	pub type NeuralAnalyzerState<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		ChainId,
		NeuralState<T>,
		OptionQuery,
	>;

	/// Grid metrics storage
	#[pallet::storage]
	#[pallet::getter(fn grid_metrics)]
	pub type GridMetrics<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // timestamp
		EnergyData,
		OptionQuery,
	>;

	/// Quantum eyes data
	#[pallet::storage]
	#[pallet::getter(fn quantum_eyes_data)]
	pub type QuantumEyesData<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		H256, // tx hash
		PhotonicVision,
		OptionQuery,
	>;

	// ===== USER REQUEST STORAGE =====

	/// Next request ID counter
	#[pallet::storage]
	pub type NextRequestId<T: Config> = StorageValue<_, u64, ValueQuery>;

	/// Pending threat analysis requests
	#[pallet::storage]
	pub type PendingThreatRequests<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		ThreatAnalysisRequest<T>,
		OptionQuery,
	>;

	/// Threat analysis results
	#[pallet::storage]
	pub type ThreatAnalysisResults<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		ThreatAnalysisResult,
		OptionQuery,
	>;

	/// User neural configurations
	#[pallet::storage]
	pub type UserNeuralConfigs<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		NeuralConfig,
		OptionQuery,
	>;

	/// Pending energy optimization requests
	#[pallet::storage]
	pub type PendingEnergyRequests<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		EnergyOptimizationRequest<T>,
		OptionQuery,
	>;

	/// Energy optimization results
	#[pallet::storage]
	pub type EnergyOptimizationResults<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		EnergyOptimizationResult,
		OptionQuery,
	>;

	/// Pending quantum eyes requests
	#[pallet::storage]
	pub type PendingEyesRequests<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // request_id
		QuantumEyesRequest<T>,
		OptionQuery,
	>;

	/// Authorized workers (can submit results)
	#[pallet::storage]
	pub type AuthorizedWorkers<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		bool,
		ValueQuery,
	>;

	// ===== EVENTS =====

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Threat prediction submitted (automated)
		ThreatPredictionSubmitted { block_number: BlockNumberFor<T>, threat_level: u8 },
		/// Neural state updated
		NeuralStateUpdated { chain_id: ChainId, accuracy: u8 },
		/// Grid metrics submitted
		GridMetricsSubmitted { timestamp: u64, demand: u8 },
		/// Quantum eyes data submitted
		QuantumEyesDataSubmitted { tx_hash: H256, color: LightColor },

		// User request events
		/// Threat analysis requested by user
		ThreatAnalysisRequested { request_id: u64, requester: T::AccountId },
		/// Threat analysis completed
		ThreatAnalysisCompleted { request_id: u64, threat_level: u8 },
		/// Neural params configured
		NeuralParamsConfigured { user: T::AccountId, chains: BoundedVec<ChainId, ConstU32<4>> },
		/// Energy optimization requested
		EnergyOptimizationRequested { request_id: u64, requester: T::AccountId, urgency: UrgencyLevel },
		/// Energy optimization completed
		EnergyOptimizationCompleted { request_id: u64 },
		/// Quantum eyes requested
		QuantumEyesRequested { request_id: u64, requester: T::AccountId, tx_hash: H256 },
		/// Quantum eyes completed
		QuantumEyesCompleted { request_id: u64, color: LightColor },

		/// Worker authorized
		WorkerAuthorized { worker: T::AccountId },
		/// Worker deauthorized
		WorkerDeauthorized { worker: T::AccountId },
	}

	// ===== ERRORS =====

	#[pallet::error]
	pub enum Error<T> {
		/// Unauthorized worker
		Unauthorized,
		/// Invalid thresholds
		InvalidThresholds,
		/// Request not found
		RequestNotFound,
		/// Request already completed
		RequestAlreadyCompleted,
	}

	// ===== EXTRINSICS =====

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		// ===== USER-CALLABLE EXTRINSICS =====

		/// Request quantum threat analysis for a transaction
		#[pallet::call_index(0)]
		#[pallet::weight(10_000)]
		pub fn request_threat_analysis(
			origin: OriginFor<T>,
			tx_data: TransactionData,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			let request_id = <NextRequestId<T>>::get();
			<NextRequestId<T>>::put(request_id + 1);

			let timestamp = <pallet_timestamp::Pallet<T>>::get().saturated_into::<u64>();

			<PendingThreatRequests<T>>::insert(request_id, ThreatAnalysisRequest {
				requester: who.clone(),
				tx_data,
				timestamp,
				status: RequestStatus::Pending,
			});

			Self::deposit_event(Event::ThreatAnalysisRequested {
				request_id,
				requester: who,
			});

			Ok(())
		}

		/// Configure neural analyzer parameters
		#[pallet::call_index(1)]
		#[pallet::weight(10_000)]
		pub fn configure_neural_params(
			origin: OriginFor<T>,
			low_threshold: u8,
			medium_threshold: u8,
			high_threshold: u8,
			enabled_chains: BoundedVec<ChainId, ConstU32<4>>,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			ensure!(low_threshold < medium_threshold, Error::<T>::InvalidThresholds);
			ensure!(medium_threshold < high_threshold, Error::<T>::InvalidThresholds);

			<UserNeuralConfigs<T>>::insert(who.clone(), NeuralConfig {
				low_threshold,
				medium_threshold,
				high_threshold,
				enabled_chains: enabled_chains.clone(),
			});

			Self::deposit_event(Event::NeuralParamsConfigured {
				user: who,
				chains: enabled_chains,
			});

			Ok(())
		}

		/// Request energy optimization for compute load
		#[pallet::call_index(2)]
		#[pallet::weight(10_000)]
		pub fn request_energy_optimization(
			origin: OriginFor<T>,
			pending_transactions: u32,
			urgency_level: UrgencyLevel,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			let request_id = <NextRequestId<T>>::get();
			<NextRequestId<T>>::put(request_id + 1);

			let timestamp = <pallet_timestamp::Pallet<T>>::get().saturated_into::<u64>();

			<PendingEnergyRequests<T>>::insert(request_id, EnergyOptimizationRequest {
				requester: who.clone(),
				pending_transactions,
				urgency_level: urgency_level.clone(),
				timestamp,
				status: RequestStatus::Pending,
			});

			Self::deposit_event(Event::EnergyOptimizationRequested {
				request_id,
				requester: who,
				urgency: urgency_level,
			});

			Ok(())
		}

		/// Request quantum eyes decoding for transaction
		#[pallet::call_index(3)]
		#[pallet::weight(10_000)]
		pub fn request_quantum_eyes_decode(
			origin: OriginFor<T>,
			tx_hash: H256,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			let request_id = <NextRequestId<T>>::get();
			<NextRequestId<T>>::put(request_id + 1);

			let timestamp = <pallet_timestamp::Pallet<T>>::get().saturated_into::<u64>();

			<PendingEyesRequests<T>>::insert(request_id, QuantumEyesRequest {
				requester: who.clone(),
				tx_hash,
				timestamp,
				status: RequestStatus::Pending,
			});

			Self::deposit_event(Event::QuantumEyesRequested {
				request_id,
				requester: who,
				tx_hash,
			});

			Ok(())
		}

		// ===== WORKER-CALLABLE EXTRINSICS =====

		/// Submit threat analysis result (off-chain worker only)
		#[pallet::call_index(10)]
		#[pallet::weight(10_000)]
		pub fn submit_threat_analysis_result(
			origin: OriginFor<T>,
			request_id: u64,
			result: ThreatAnalysisResult,
		) -> DispatchResult {
			let worker = ensure_signed(origin)?;
			ensure!(Self::is_authorized_worker(&worker), Error::<T>::Unauthorized);

			<PendingThreatRequests<T>>::mutate(request_id, |req| {
				if let Some(r) = req {
					r.status = RequestStatus::Completed;
				}
			});

			<ThreatAnalysisResults<T>>::insert(request_id, result.clone());

			Self::deposit_event(Event::ThreatAnalysisCompleted {
				request_id,
				threat_level: result.threat_probability,
			});

			Ok(())
		}

		/// Submit threat prediction (automated per-block, off-chain worker only)
		#[pallet::call_index(11)]
		#[pallet::weight(10_000)]
		pub fn submit_threat_prediction(
			origin: OriginFor<T>,
			block_number: BlockNumberFor<T>,
			threat_data: ThreatData<T>,
		) -> DispatchResult {
			let worker = ensure_signed(origin)?;
			ensure!(Self::is_authorized_worker(&worker), Error::<T>::Unauthorized);

			<ThreatPredictions<T>>::insert(block_number, threat_data.clone());

			Self::deposit_event(Event::ThreatPredictionSubmitted {
				block_number,
				threat_level: threat_data.threat_probability,
			});

			Ok(())
		}

		/// Update neural analyzer state (off-chain worker only)
		#[pallet::call_index(12)]
		#[pallet::weight(10_000)]
		pub fn update_neural_state(
			origin: OriginFor<T>,
			chain_id: ChainId,
			neural_state: NeuralState<T>,
		) -> DispatchResult {
			let worker = ensure_signed(origin)?;
			ensure!(Self::is_authorized_worker(&worker), Error::<T>::Unauthorized);

			<NeuralAnalyzerState<T>>::insert(chain_id.clone(), neural_state.clone());

			Self::deposit_event(Event::NeuralStateUpdated {
				chain_id,
				accuracy: neural_state.accuracy,
			});

			Ok(())
		}

		/// Submit grid metrics (off-chain worker only)
		#[pallet::call_index(13)]
		#[pallet::weight(10_000)]
		pub fn submit_grid_metrics(
			origin: OriginFor<T>,
			timestamp: u64,
			energy_data: EnergyData,
		) -> DispatchResult {
			let worker = ensure_signed(origin)?;
			ensure!(Self::is_authorized_worker(&worker), Error::<T>::Unauthorized);

			<GridMetrics<T>>::insert(timestamp, energy_data.clone());

			Self::deposit_event(Event::GridMetricsSubmitted {
				timestamp,
				demand: energy_data.grid_demand,
			});

			Ok(())
		}

		/// Submit energy optimization result (off-chain worker only)
		#[pallet::call_index(14)]
		#[pallet::weight(10_000)]
		pub fn submit_energy_optimization_result(
			origin: OriginFor<T>,
			request_id: u64,
			result: EnergyOptimizationResult,
		) -> DispatchResult {
			let worker = ensure_signed(origin)?;
			ensure!(Self::is_authorized_worker(&worker), Error::<T>::Unauthorized);

			<PendingEnergyRequests<T>>::mutate(request_id, |req| {
				if let Some(r) = req {
					r.status = RequestStatus::Completed;
				}
			});

			<EnergyOptimizationResults<T>>::insert(request_id, result);

			Self::deposit_event(Event::EnergyOptimizationCompleted { request_id });

			Ok(())
		}

		/// Submit quantum eyes data (off-chain worker only)
		#[pallet::call_index(15)]
		#[pallet::weight(10_000)]
		pub fn submit_quantum_eyes(
			origin: OriginFor<T>,
			request_id: u64,
			photonic_vision: PhotonicVision,
		) -> DispatchResult {
			let worker = ensure_signed(origin)?;
			ensure!(Self::is_authorized_worker(&worker), Error::<T>::Unauthorized);

			<PendingEyesRequests<T>>::mutate(request_id, |req| {
				if let Some(r) = req {
					r.status = RequestStatus::Completed;
				}
			});

			<QuantumEyesData<T>>::insert(photonic_vision.tx_hash, photonic_vision.clone());

			Self::deposit_event(Event::QuantumEyesCompleted {
				request_id,
				color: photonic_vision.color,
			});

			Ok(())
		}

		// ===== ADMIN EXTRINSICS =====

		/// Authorize a worker (sudo only)
		#[pallet::call_index(20)]
		#[pallet::weight(10_000)]
		pub fn authorize_worker(
			origin: OriginFor<T>,
			worker: T::AccountId,
		) -> DispatchResult {
			ensure_root(origin)?;
			<AuthorizedWorkers<T>>::insert(&worker, true);

			Self::deposit_event(Event::WorkerAuthorized { worker });

			Ok(())
		}

		/// Deauthorize a worker (sudo only)
		#[pallet::call_index(21)]
		#[pallet::weight(10_000)]
		pub fn deauthorize_worker(
			origin: OriginFor<T>,
			worker: T::AccountId,
		) -> DispatchResult {
			ensure_root(origin)?;
			<AuthorizedWorkers<T>>::insert(&worker, false);

			Self::deposit_event(Event::WorkerDeauthorized { worker });

			Ok(())
		}
	}

	// ===== HELPER FUNCTIONS =====

	impl<T: Config> Pallet<T> {
		pub fn is_authorized_worker(account: &T::AccountId) -> bool {
			<AuthorizedWorkers<T>>::get(account)
		}
	}
}
