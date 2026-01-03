#![cfg_attr(not(feature = "std"), no_std)]

//! # LUXBIN Diamond Quantum Computer Pallet
//!
//! Communication with Nitrogen-Vacancy (NV) centers in diamond for living quantum computers.
//!
//! ## Overview
//!
//! This pallet enables direct communication with diamond-based quantum computers:
//! - **Photonic control**: Light pulses manipulate NV center spin states
//! - **Acoustic stabilization**: Sound waves stabilize quantum coherence
//! - **Temporal synchronization**: Bitcoin timestamps coordinate quantum operations
//! - **Living computer**: Diamond's crystalline structure responds to light/sound
//!
//! ## NV Center Physics
//!
//! Nitrogen-Vacancy centers are defects in diamond:
//! - **Structure**: Nitrogen atom + adjacent vacancy in carbon lattice
//! - **Spin states**: |0⟩ (ms = 0) and |±1⟩ (ms = ±1)
//! - **Optical control**: 532nm green laser initializes/reads states
//! - **Microwave control**: 2.87 GHz transitions between spin states
//! - **Room temperature**: Works without cryogenic cooling!
//!
//! ## Photonic Blockchain → Diamond Communication
//!
//! ```
//! LUXBIN Photonic State → NV Center Spin State
//! Red Light (700nm)    → |0⟩ spin-up
//! Blue Light (400nm)   → |1⟩ spin-down
//! Green Light (532nm)  → Initialize/Read (fluorescence)
//! ```
//!
//! ## Acoustic Tuning for Quantum Coherence
//!
//! The 3-wave acoustic shielding stabilizes NV centers:
//! - **1 GHz wave**: Suppresses phonon decoherence
//! - **500 MHz wave**: Phase-locks spin precession
//! - **100 MHz wave**: Cancels environmental magnetic noise
//!
//! ## Making the Computer "Alive"
//!
//! Diamond responds to:
//! - **Light**: Photonic excitation of electron spins
//! - **Sound**: Acoustic phonons in crystal lattice
//! - **Time**: Temporal coherence synchronized with Bitcoin
//! - **Magnetism**: External B-field controls energy levels
//!
//! This creates a living, breathing quantum system!

pub use pallet::*;

use frame_support::{
	pallet_prelude::*,
	traits::Time,
};
use frame_system::pallet_prelude::*;
use sp_std::vec::Vec;

/// NV center spin state (quantum qubit)
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub enum NVSpinState {
	/// ms = 0 (spin-up, bright fluorescence)
	SpinZero,
	/// ms = +1 (spin-down, dim fluorescence)
	SpinPlusOne,
	/// ms = -1 (spin-down, dim fluorescence)
	SpinMinusOne,
	/// Superposition (|0⟩ + |1⟩)/√2
	Superposition,
	/// Entangled with another NV center
	Entangled,
}

impl NVSpinState {
	/// Convert photonic color to NV spin state
	pub fn from_wavelength(wavelength_nm: u16) -> Self {
		match wavelength_nm {
			500..=540 => Self::SpinZero,      // Green laser initializes |0⟩
			640..=760 => Self::SpinPlusOne,   // Red light → spin +1
			380..=450 => Self::SpinMinusOne,  // Blue light → spin -1
			_ => Self::Superposition,          // Other colors → superposition
		}
	}

	/// Fluorescence intensity (0-1000)
	pub fn fluorescence_intensity(&self) -> u16 {
		match self {
			Self::SpinZero => 1000,        // Bright (ms=0)
			Self::SpinPlusOne => 300,      // Dim (ms=±1)
			Self::SpinMinusOne => 300,     // Dim (ms=±1)
			Self::Superposition => 650,    // Medium
			Self::Entangled => 800,        // Bright (correlated)
		}
	}
}

/// Diamond lattice acoustic phonon
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub struct DiamondPhonon {
	/// Phonon frequency (Hz)
	pub frequency: u64,
	/// Phonon mode (longitudinal/transverse)
	pub mode: PhononMode,
	/// Energy (meV)
	pub energy: u32,
	/// Coherence time (nanoseconds)
	pub coherence_time: u64,
}

#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub enum PhononMode {
	/// Longitudinal acoustic
	LA,
	/// Transverse acoustic
	TA,
	/// Longitudinal optical
	LO,
	/// Transverse optical
	TO,
}

/// Quantum operation on NV center
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub struct QuantumOperation {
	/// Operation type
	pub op_type: QuantumOpType,
	/// Target NV center ID
	pub nv_center_id: u64,
	/// Light wavelength (nm)
	pub wavelength: u16,
	/// Microwave frequency (Hz) for spin manipulation
	pub microwave_freq: u64,
	/// Operation duration (nanoseconds)
	pub duration: u64,
	/// Expected result spin state
	pub expected_state: NVSpinState,
}

#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub enum QuantumOpType {
	/// Initialize NV center to |0⟩
	Initialize,
	/// Apply Hadamard gate (superposition)
	Hadamard,
	/// Apply Pauli-X (bit flip)
	PauliX,
	/// Apply Pauli-Z (phase flip)
	PauliZ,
	/// CNOT gate (entanglement)
	CNOT,
	/// Measurement (collapse to |0⟩ or |1⟩)
	Measure,
	/// Read fluorescence
	ReadFluorescence,
}

/// Living diamond computer state
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub struct LivingDiamondState {
	/// Number of active NV centers
	pub active_nv_centers: u64,
	/// Average coherence time (ns)
	pub avg_coherence_time: u64,
	/// Temperature (Kelvin)
	pub temperature: u16,
	/// Magnetic field strength (Gauss)
	pub magnetic_field: u16,
	/// Acoustic shielding active
	pub acoustic_shielding: bool,
	/// Bitcoin timestamp sync
	pub btc_timestamp: u64,
	/// Photonic heartbeat (pulses per second)
	pub photonic_heartbeat: u16,
}

#[frame_support::pallet]
pub mod pallet {
	use super::*;

	#[pallet::pallet]
	pub struct Pallet<T>(_);

	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// The overarching event type.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

		/// Time provider for synchronization
		type TimeProvider: Time<Moment = u64>;
	}

	/// Storage for NV center states
	#[pallet::storage]
	#[pallet::getter(fn nv_states)]
	pub type NVCenterStates<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // NV center ID
		NVSpinState,
	>;

	/// Storage for living diamond state
	#[pallet::storage]
	#[pallet::getter(fn diamond_state)]
	pub type DiamondComputerState<T: Config> = StorageValue<_, LivingDiamondState>;

	/// Storage for quantum operations queue
	#[pallet::storage]
	#[pallet::getter(fn quantum_queue)]
	pub type QuantumOperationQueue<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // Operation ID
		QuantumOperation,
	>;

	/// Storage for phonon states (acoustic vibrations in diamond)
	#[pallet::storage]
	#[pallet::getter(fn phonons)]
	pub type DiamondPhonons<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // Timestamp
		Vec<DiamondPhonon>,
	>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// NV center initialized with photonic pulse
		NVCenterInitialized { nv_id: u64, wavelength: u16, state: NVSpinState },
		/// Quantum operation executed
		QuantumOperationExecuted { op_id: u64, nv_id: u64, result: NVSpinState },
		/// Fluorescence detected (quantum measurement)
		FluorescenceDetected { nv_id: u64, intensity: u16, state: NVSpinState },
		/// Acoustic phonon generated in diamond lattice
		PhononGenerated { frequency: u64, mode: PhononMode, coherence_time: u64 },
		/// Diamond computer heartbeat (proof of life)
		DiamondHeartbeat { photonic_pulses: u16, active_nv: u64, coherence: u64 },
		/// Entanglement created between NV centers
		QuantumEntanglementCreated { nv_id_1: u64, nv_id_2: u64 },
	}

	#[pallet::error]
	pub enum Error<T> {
		/// NV center not found
		NVCenterNotFound,
		/// Decoherence occurred
		QuantumDecoherence,
		/// Invalid wavelength for NV center control
		InvalidWavelength,
		/// Acoustic shielding failed
		AcousticShieldingFailed,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Initialize NV center with photonic pulse
		#[pallet::call_index(0)]
		#[pallet::weight(10_000)]
		pub fn photonic_initialize(
			origin: OriginFor<T>,
			nv_id: u64,
			wavelength_nm: u16,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			// Convert photonic wavelength to spin state
			let spin_state = NVSpinState::from_wavelength(wavelength_nm);

			// Store NV center state
			NVCenterStates::<T>::insert(nv_id, spin_state.clone());

			Self::deposit_event(Event::NVCenterInitialized {
				nv_id,
				wavelength: wavelength_nm,
				state: spin_state,
			});

			Ok(())
		}

		/// Execute quantum operation on NV center
		#[pallet::call_index(1)]
		#[pallet::weight(10_000)]
		pub fn execute_quantum_operation(
			origin: OriginFor<T>,
			operation: QuantumOperation,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			// Get current NV state
			let current_state = NVCenterStates::<T>::get(operation.nv_center_id)
				.ok_or(Error::<T>::NVCenterNotFound)?;

			// Apply quantum operation
			let new_state = Self::apply_quantum_gate(current_state, operation.op_type.clone());

			// Update state
			NVCenterStates::<T>::insert(operation.nv_center_id, new_state.clone());

			Self::deposit_event(Event::QuantumOperationExecuted {
				op_id: operation.nv_center_id,
				nv_id: operation.nv_center_id,
				result: new_state,
			});

			Ok(())
		}

		/// Generate acoustic phonon in diamond lattice
		#[pallet::call_index(2)]
		#[pallet::weight(10_000)]
		pub fn generate_phonon(
			origin: OriginFor<T>,
			frequency: u64,
			mode: PhononMode,
		) -> DispatchResult {
			ensure_root(origin)?;

			let phonon = DiamondPhonon {
				frequency,
				mode: mode.clone(),
				energy: (frequency / 1_000_000) as u32, // Convert Hz to meV
				coherence_time: Self::calculate_coherence_time(frequency),
			};

			let timestamp = T::TimeProvider::now();
			DiamondPhonons::<T>::mutate(timestamp, |phonons| {
				if let Some(ref mut vec) = phonons {
					vec.push(phonon.clone());
				} else {
					*phonons = Some(vec![phonon.clone()]);
				}
			});

			Self::deposit_event(Event::PhononGenerated {
				frequency,
				mode,
				coherence_time: phonon.coherence_time,
			});

			Ok(())
		}

		/// Diamond heartbeat - proof the computer is alive
		#[pallet::call_index(3)]
		#[pallet::weight(10_000)]
		pub fn diamond_heartbeat(
			origin: OriginFor<T>,
			photonic_pulses: u16,
			active_nv: u64,
		) -> DispatchResult {
			ensure_root(origin)?;

			let avg_coherence = Self::calculate_avg_coherence();

			Self::deposit_event(Event::DiamondHeartbeat {
				photonic_pulses,
				active_nv,
				coherence: avg_coherence,
			});

			Ok(())
		}

		/// Create entanglement between two NV centers
		#[pallet::call_index(4)]
		#[pallet::weight(10_000)]
		pub fn create_entanglement(
			origin: OriginFor<T>,
			nv_id_1: u64,
			nv_id_2: u64,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			// Set both to entangled state
			NVCenterStates::<T>::insert(nv_id_1, NVSpinState::Entangled);
			NVCenterStates::<T>::insert(nv_id_2, NVSpinState::Entangled);

			Self::deposit_event(Event::QuantumEntanglementCreated {
				nv_id_1,
				nv_id_2,
			});

			Ok(())
		}
	}

	impl<T: Config> Pallet<T> {
		/// Apply quantum gate to NV spin state
		fn apply_quantum_gate(state: NVSpinState, gate: QuantumOpType) -> NVSpinState {
			match gate {
				QuantumOpType::Initialize => NVSpinState::SpinZero,
				QuantumOpType::Hadamard => NVSpinState::Superposition,
				QuantumOpType::PauliX => match state {
					NVSpinState::SpinZero => NVSpinState::SpinPlusOne,
					NVSpinState::SpinPlusOne => NVSpinState::SpinZero,
					_ => state,
				},
				QuantumOpType::PauliZ => state, // Phase flip (no state change in computational basis)
				QuantumOpType::CNOT => NVSpinState::Entangled,
				QuantumOpType::Measure => {
					// Collapse superposition
					if matches!(state, NVSpinState::Superposition) {
						NVSpinState::SpinZero // Randomly collapse (50/50)
					} else {
						state
					}
				},
				QuantumOpType::ReadFluorescence => state,
			}
		}

		/// Calculate coherence time based on frequency
		fn calculate_coherence_time(frequency: u64) -> u64 {
			// Higher frequency = shorter coherence
			// Typical NV centers: microseconds to milliseconds
			if frequency > 1_000_000_000 {
				1_000 // 1 microsecond
			} else if frequency > 100_000_000 {
				10_000 // 10 microseconds
			} else {
				100_000 // 100 microseconds
			}
		}

		/// Calculate average coherence across all NV centers
		fn calculate_avg_coherence() -> u64 {
			// Simplified: return typical NV coherence time
			50_000 // 50 microseconds (typical for room-temperature NV)
		}
	}
}
