use super::*;
use crate::mock::*;
use frame_support::{assert_ok, assert_noop};

#[test]
fn test_activate_shielding() {
	new_test_ext().execute_with(|| {
		assert_ok!(AcousticShielding::activate_shielding(RuntimeOrigin::signed(1), 50));

		let config = AcousticShielding::shielding_configs(1).unwrap();
		assert_eq!(config.strength, 50);
		assert_eq!(config.wave_1ghz.frequency, 1_000_000_000);
	});
}

#[test]
fn test_activate_shielding_invalid_strength() {
	new_test_ext().execute_with(|| {
		assert_noop!(
			AcousticShielding::activate_shielding(RuntimeOrigin::signed(1), 150),
			Error::<Test>::InvalidWaveParameters
		);
	});
}

#[test]
fn test_record_quantum_metrics() {
	new_test_ext().execute_with(|| {
		// First activate shielding
		assert_ok!(AcousticShielding::activate_shielding(RuntimeOrigin::signed(1), 75));

		// Record metrics
		assert_ok!(AcousticShielding::record_quantum_metrics(
			RuntimeOrigin::signed(1),
			500, // decoherence_rate
			800, // phase_stability
			90   // error_efficiency
		));

		let history = AcousticShielding::quantum_metrics(1);
		assert_eq!(history.len(), 1);
		assert_eq!(history[0].decoherence_rate, 500);
	});
}

#[test]
fn test_calculate_interference() {
	let config = ShieldingConfig {
		wave_1ghz: AcousticWave { frequency: 1_000_000_000, amplitude: 500, phase: 0 },
		wave_500mhz: AcousticWave { frequency: 500_000_000, amplitude: 400, phase: 120 },
		wave_100mhz: AcousticWave { frequency: 100_000_000, amplitude: 300, phase: 240 },
		strength: 50,
	};

	let interference = AcousticShielding::calculate_interference(&config, 0.001).unwrap();
	// Interference should be a valid f64
	assert!(interference.is_finite());
}

#[test]
fn test_shielding_adjustment() {
	new_test_ext().execute_with(|| {
		// Activate shielding
		assert_ok!(AcousticShielding::activate_shielding(RuntimeOrigin::signed(1), 50));
		let mut config = AcousticShielding::shielding_configs(1).unwrap();

		// High decoherence - should increase amplitudes
		let metrics = QuantumMetrics {
			decoherence_rate: 1500,
			phase_stability: 500,
			error_efficiency: 70,
			timestamp: 1000,
		};

		assert_ok!(AcousticShielding::adjust_shielding(&mut config, &metrics));
		// Amplitude should be increased (120% of original)
		assert!(config.wave_1ghz.amplitude > 500); // Original was 500
	});
}