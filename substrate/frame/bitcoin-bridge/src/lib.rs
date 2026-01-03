#![cfg_attr(not(feature = "std"), no_std)]

//! # LUXBIN Bitcoin Bridge Pallet
//!
//! Reads Bitcoin blockchain timestamps for temporal acoustic tuning.
//!
//! ## Overview
//!
//! This pallet connects to Bitcoin Core to:
//! - Read Bitcoin block timestamps
//! - Sync timestamps with LUXBIN temporal cryptography
//! - Use Bitcoin's immutable timestamp record for acoustic tuning
//! - Convert binary data to photonic (light/color) encoding
//!
//! ## Bitcoin Timestamp Integration
//!
//! Bitcoin's timestamp acts as a universal time reference for:
//! - Temporal cryptographic key generation
//! - Acoustic wave frequency synchronization
//! - Photonic state transitions
//!
//! ## Photonic Encoding
//!
//! Binary (0/1) → Light (colors):
//! - 0 = Red light (wavelength 700nm)
//! - 1 = Blue light (wavelength 400nm)
//! - Intermediate = Rainbow spectrum
//!
//! This allows the blockchain to communicate in light instead of binary.

pub use pallet::*;

use frame_support::{
	pallet_prelude::*,
	traits::Time,
};
use frame_system::pallet_prelude::*;
use sp_core::H256;
use sp_std::vec::Vec;

/// Bitcoin block header data
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub struct BitcoinBlockHeader {
	/// Bitcoin block hash
	pub block_hash: H256,
	/// Bitcoin block timestamp (Unix timestamp)
	pub timestamp: u64,
	/// Bitcoin block height
	pub height: u64,
	/// Difficulty target
	pub bits: u32,
}

/// Photonic light state (replacing binary 0/1)
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub enum PhotonicState {
	/// Red light (0 in binary)
	Red,
	/// Blue light (1 in binary)
	Blue,
	/// Orange (intermediate)
	Orange,
	/// Yellow (intermediate)
	Yellow,
	/// Green (intermediate)
	Green,
	/// Indigo (intermediate)
	Indigo,
	/// Violet (intermediate)
	Violet,
}

impl PhotonicState {
	/// Convert binary bit to photonic state
	pub fn from_bit(bit: u8) -> Self {
		if bit == 0 {
			Self::Red
		} else {
			Self::Blue
		}
	}

	/// Convert to wavelength (nanometers)
	pub fn wavelength(&self) -> u16 {
		match self {
			Self::Red => 700,
			Self::Orange => 620,
			Self::Yellow => 580,
			Self::Green => 530,
			Self::Blue => 470,
			Self::Indigo => 450,
			Self::Violet => 400,
		}
	}
}

/// Acoustic wave synchronized with Bitcoin timestamp
#[derive(Clone, Encode, Decode, TypeInfo, MaxEncodedLen, PartialEq, Eq, Debug)]
pub struct TemporalAcousticWave {
	/// Bitcoin timestamp reference
	pub btc_timestamp: u64,
	/// Frequency in Hz (derived from timestamp)
	pub frequency: u64,
	/// Amplitude (0-1000)
	pub amplitude: u16,
	/// Phase offset in degrees
	pub phase: u16,
	/// Photonic color representation
	pub photonic_color: PhotonicState,
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

	/// Storage for latest Bitcoin block header
	#[pallet::storage]
	#[pallet::getter(fn latest_btc_block)]
	pub type LatestBitcoinBlock<T: Config> = StorageValue<_, BitcoinBlockHeader>;

	/// Storage for photonic state sequence (blockchain as light)
	#[pallet::storage]
	#[pallet::getter(fn photonic_sequence)]
	pub type PhotonicSequence<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // Block number
		Vec<PhotonicState>, // Light sequence
	>;

	/// Storage for temporal acoustic waves
	#[pallet::storage]
	#[pallet::getter(fn acoustic_waves)]
	pub type AcousticWaves<T: Config> = StorageMap<
		_,
		Blake2_128Concat,
		u64, // Timestamp
		TemporalAcousticWave,
	>;

	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Bitcoin timestamp synced
		BitcoinTimestampSynced { timestamp: u64, block_hash: H256 },
		/// Binary converted to photonic state
		BinaryToPhotonic { data: Vec<u8>, photonic: Vec<PhotonicState> },
		/// Acoustic wave generated from timestamp
		AcousticWaveGenerated { frequency: u64, timestamp: u64 },
		/// Light-based consensus achieved
		PhotonicConsensusAchieved { block_number: u64, color: PhotonicState },
	}

	#[pallet::error]
	pub enum Error<T> {
		/// Bitcoin RPC connection failed
		BitcoinRPCFailed,
		/// Invalid timestamp
		InvalidTimestamp,
		/// Photonic conversion failed
		PhotonicConversionFailed,
	}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// Sync with Bitcoin timestamp (off-chain worker calls this)
		#[pallet::call_index(0)]
		#[pallet::weight(10_000)]
		pub fn sync_bitcoin_timestamp(
			origin: OriginFor<T>,
			block_hash: H256,
			timestamp: u64,
			height: u64,
			bits: u32,
		) -> DispatchResult {
			ensure_root(origin)?;

			let header = BitcoinBlockHeader {
				block_hash,
				timestamp,
				height,
				bits,
			};

			LatestBitcoinBlock::<T>::put(header.clone());

			// Generate acoustic wave from timestamp
			let acoustic = Self::generate_acoustic_wave(timestamp);
			AcousticWaves::<T>::insert(timestamp, acoustic.clone());

			Self::deposit_event(Event::BitcoinTimestampSynced {
				timestamp,
				block_hash,
			});

			Self::deposit_event(Event::AcousticWaveGenerated {
				frequency: acoustic.frequency,
				timestamp,
			});

			Ok(())
		}

		/// Convert binary data to photonic (light) encoding
		#[pallet::call_index(1)]
		#[pallet::weight(10_000)]
		pub fn convert_to_photonic(
			origin: OriginFor<T>,
			binary_data: Vec<u8>,
		) -> DispatchResult {
			let _who = ensure_signed(origin)?;

			let mut photonic: Vec<PhotonicState> = Vec::new();

			// Convert each bit to light
			for byte in binary_data.iter() {
				for bit_pos in 0..8 {
					let bit = (byte >> bit_pos) & 1;
					photonic.push(PhotonicState::from_bit(bit));
				}
			}

			Self::deposit_event(Event::BinaryToPhotonic {
				data: binary_data,
				photonic: photonic.clone(),
			});

			Ok(())
		}

		/// Achieve photonic consensus (light-based instead of binary)
		#[pallet::call_index(2)]
		#[pallet::weight(10_000)]
		pub fn photonic_consensus(
			origin: OriginFor<T>,
			block_number: u64,
			photonic_sequence: Vec<PhotonicState>,
		) -> DispatchResult {
			ensure_root(origin)?;

			PhotonicSequence::<T>::insert(block_number, photonic_sequence.clone());

			// Use first color as consensus indicator
			let consensus_color = photonic_sequence.first()
				.unwrap_or(&PhotonicState::Green)
				.clone();

			Self::deposit_event(Event::PhotonicConsensusAchieved {
				block_number,
				color: consensus_color,
			});

			Ok(())
		}
	}

	impl<T: Config> Pallet<T> {
		/// Generate acoustic wave from Bitcoin timestamp
		fn generate_acoustic_wave(timestamp: u64) -> TemporalAcousticWave {
			// Use timestamp to derive frequency (temporal acoustic tuning)
			// Frequency cycles between 100 MHz and 1 GHz based on timestamp
			let frequency = 100_000_000 + (timestamp % 900_000_000);

			// Amplitude varies with timestamp
			let amplitude = ((timestamp % 1000) as u16).saturating_add(100);

			// Phase derived from timestamp
			let phase = ((timestamp % 360) as u16);

			// Photonic color based on frequency
			let photonic_color = if frequency < 300_000_000 {
				PhotonicState::Red
			} else if frequency < 500_000_000 {
				PhotonicState::Yellow
			} else if frequency < 700_000_000 {
				PhotonicState::Green
			} else {
				PhotonicState::Blue
			};

			TemporalAcousticWave {
				btc_timestamp: timestamp,
				frequency,
				amplitude,
				phase,
				photonic_color,
			}
		}
	}
}
