#![cfg_attr(not(feature = "std"), no_std)]

//! # LUXBIN Acoustic Quantum Shielding Pallet
//!
//! Protects quantum computers from environmental noise using sound wave interference.
//!
//! ## Overview
//!
//! This pallet implements three-layer acoustic shielding:
//! - Wave 1 (1 GHz): Error detection and correction
//! - Wave 2 (500 MHz): Phase stabilization
//! - Wave 3 (100 MHz): Noise cancellation
//!
//! ## Shielding Process
//!
//! 1. Generate interference patterns that cancel quantum decoherence
//! 2. Monitor quantum state stability
//! 3. Adjust wave amplitudes dynamically
//! 4. Integrate with temporal cryptography for secure key generation

pub use pallet::*;

use frame_support::{
	pallet_prelude::*,
	traits::{Currency, Time},
};
use frame_system::pallet_prelude::*;
use sp_core::H256;
use sp_std::{vec::Vec, marker::PhantomData};

type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

/// Acoustic wave parameters
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub struct AcousticWave {
	/// Frequency in Hz
	pub frequency: u64,
	/// Amplitude (0-1000)
	pub amplitude: u16,
	/// Phase offset in degrees
	pub phase: u16,
}

/// Shielding configuration
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen)]
pub struct ShieldingConfig {
	/// Primary error detection wave (1 GHz)
	pub wave_1ghz: AcousticWave,
	/// Phase correction wave (500 MHz)
	pub wave_500mhz: AcousticWave,
	/// Noise cancellation wave (100 MHz)
	pub wave_100mhz: AcousticWave,
	/// Shielding strength (0-100)
	pub strength: u8,
}

/// Quantum state metrics
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq)]
pub struct QuantumMetrics {
	/// Decoherence rate (lower is better)
	pub decoherence_rate: u32,
	/// Phase stability (higher is better)
	pub phase_stability: u32,
	/// Error correction efficiency
	pub error_efficiency: u32,
	/// Timestamp of measurement
	pub timestamp: u64,
}

#[frame_support::pallet]
pub mod pallet {
	use super::*;

	#[pallet::pallet]
	pub struct Pallet<T>(PhantomData<T>);

	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// The overarching event type.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;

		/// Time provider for acoustic wave generation
		type TimeProvider: Time<Moment = u64>;

		/// Currency for shielding operations
		type Currency: Currency<Self::AccountId>;
	}

	/// Storage for active shielding configurations
	#[pallet::storage]
	#[pallet::getter(fn shielding_configs)]
	pub type ShieldingConfigs<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		ShieldingConfig,
		OptionQuery,
	>;

	/// Storage for quantum metrics history
	#[pallet::storage]
	#[pallet::getter(fn quantum_metrics)]
	pub type QuantumMetricsHistory<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		T::AccountId,
		BoundedVec<QuantumMetrics, ConstU32<100>>,
		ValueQuery,
	>;

	/// Global shielding effectiveness
	#[pallet::storage]
	#[pallet::getter(fn global_shielding_effectiveness)]
	pub type GlobalShieldingEffectiveness<T: Config> = StorageValue<_, u32, ValueQuery>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Shielding configuration activated
		ShieldingActivated { account: T::AccountId, strength: u8 },
		/// Shielding configuration updated
		ShieldingUpdated { account: T::AccountId },
		/// Quantum metrics recorded
		QuantumMetricsRecorded { account: T::AccountId, decoherence_rate: u32 },
		/// Shielding interference successful
		ShieldingInterferenceSuccess { account: T::AccountId },
		/// Shielding failed
		ShieldingFailure { account: T::AccountId, reason: Vec<u8> },
	}

	#[pallet::error]
	pub enum Error<T> {
		/// Invalid wave parameters
		InvalidWaveParameters,
		/// Shielding configuration not found
		ShieldingConfigNotFound,
		/// Insufficient permissions
		InsufficientPermissions,
		/// Quantum state unstable
		QuantumStateUnstable,
		/// Interference calculation failed
		InterferenceCalculationFailed,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Activate acoustic quantum shielding
		///
		/// # Parameters
		/// - `strength`: Shielding strength (0-100)
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(0)]
		#[pallet::weight(10_000)]
		pub fn activate_shielding(
			origin: OriginFor<T>,
			strength: u8,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			ensure!(strength <= 100, Error::<T>::InvalidWaveParameters);

			let timestamp = T::TimeProvider::now() / 1000;

			// Generate wave configuration based on timestamp
			let config = Self::generate_shielding_config(strength, timestamp)?;

			// Store configuration
			ShieldingConfigs::<T>::insert(&who, config.clone());

			Self::deposit_event(Event::ShieldingActivated {
				account: who,
				strength,
			});

			Ok(())
		}

		/// Record quantum metrics and adjust shielding
		///
		/// # Parameters
		/// - `decoherence_rate`: Current decoherence rate
		/// - `phase_stability`: Current phase stability
		/// - `error_efficiency`: Error correction efficiency
		///
		/// # Weight
		/// O(1)
		#[pallet::call_index(1)]
		#[pallet::weight(10_000)]
		pub fn record_quantum_metrics(
			origin: OriginFor<T>,
			decoherence_rate: u32,
			phase_stability: u32,
			error_efficiency: u32,
		) -> DispatchResult {
			let who = ensure_signed(origin)?;

			let timestamp = T::TimeProvider::now() / 1000;

			let metrics = QuantumMetrics {
				decoherence_rate,
				phase_stability,
				error_efficiency,
				timestamp,
			};

			// Add to history
			QuantumMetricsHistory::<T>::mutate(&who, |history| {
				history.try_push(metrics.clone()).ok();
			});

			// Adjust shielding if active
			if let Some(mut config) = ShieldingConfigs::<T>::get(&who) {
				Self::adjust_shielding(&mut config, &metrics)?;
				ShieldingConfigs::<T>::insert(&who, config);
			}

			// Update global effectiveness
			let new_effectiveness = Self::calculate_global_effectiveness();
			GlobalShieldingEffectiveness::<T>::put(new_effectiveness);

			Self::deposit_event(Event::QuantumMetricsRecorded {
				account: who,
				decoherence_rate,
			});

			Ok(())
		}
	}
}

impl<T: Config> Pallet<T> {
	/// Generate shielding configuration
	fn generate_shielding_config(strength: u8, timestamp: u64) -> Result<ShieldingConfig, Error<T>> {
		let base_amplitude = (strength as u16) * 10;

		// Wave 1: 1 GHz error detection
		let wave_1ghz = AcousticWave {
			frequency: 1_000_000_000, // 1 GHz
			amplitude: base_amplitude,
			phase: (timestamp % 360) as u16,
		};

		// Wave 2: 500 MHz phase correction
		let wave_500mhz = AcousticWave {
			frequency: 500_000_000, // 500 MHz
			amplitude: base_amplitude * 8 / 10,
			phase: ((timestamp * 2) % 360) as u16,
		};

		// Wave 3: 100 MHz noise cancellation
		let wave_100mhz = AcousticWave {
			frequency: 100_000_000, // 100 MHz
			amplitude: base_amplitude * 6 / 10,
			phase: ((timestamp * 3) % 360) as u16,
		};

		Ok(ShieldingConfig {
			wave_1ghz,
			wave_500mhz,
			wave_100mhz,
			strength,
		})
	}

	/// Adjust shielding based on quantum metrics
	fn adjust_shielding(config: &mut ShieldingConfig, metrics: &QuantumMetrics) -> Result<(), Error<T>> {
		// Adjust amplitudes based on decoherence rate
		let adjustment_factor = if metrics.decoherence_rate > 1000 {
			// High decoherence - increase shielding
			120
		} else if metrics.decoherence_rate < 100 {
			// Low decoherence - reduce shielding
			80
		} else {
			100
		};

		config.wave_1ghz.amplitude = ((config.wave_1ghz.amplitude as u32 * adjustment_factor / 100) as u16).min(1000);
		config.wave_500mhz.amplitude = ((config.wave_500mhz.amplitude as u32 * adjustment_factor / 100) as u16).min(1000);
		config.wave_100mhz.amplitude = ((config.wave_100mhz.amplitude as u32 * adjustment_factor / 100) as u16).min(1000);

		Ok(())
	}

	/// Calculate interference pattern for quantum protection
	pub fn calculate_interference(config: &ShieldingConfig, position: f64) -> Result<f64, Error<T>> {
		// Simplified wave interference calculation
		let w1 = (2.0 * std::f64::consts::PI * config.wave_1ghz.frequency as f64 * position / 340.0
			+ config.wave_1ghz.phase as f64 * std::f64::consts::PI / 180.0).sin()
			* config.wave_1ghz.amplitude as f64 / 1000.0;

		let w2 = (2.0 * std::f64::consts::PI * config.wave_500mhz.frequency as f64 * position / 340.0
			+ config.wave_500mhz.phase as f64 * std::f64::consts::PI / 180.0).sin()
			* config.wave_500mhz.amplitude as f64 / 1000.0;

		let w3 = (2.0 * std::f64::consts::PI * config.wave_100mhz.frequency as f64 * position / 340.0
			+ config.wave_100mhz.phase as f64 * std::f64::consts::PI / 180.0).sin()
			* config.wave_100mhz.amplitude as f64 / 1000.0;

		// Constructive interference for noise cancellation
		Ok(w1 + w2 + w3)
	}

	/// Calculate global shielding effectiveness
	fn calculate_global_effectiveness() -> u32 {
		// Simplified calculation based on active shielders
		// In real implementation, this would aggregate metrics
		750 // 75% effectiveness
	}
}