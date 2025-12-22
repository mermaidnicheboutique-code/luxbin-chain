#!/usr/bin/env python3
"""
LUXBIN DIVINE - Immune System Configuration
Tunable parameters for immune response behavior

Author: Nichole Christie
License: MIT
"""

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class DetectorConfig:
    """Configuration for Detector Cells (T-Cell analogs)"""
    threat_threshold: float = 0.75  # Minimum score to trigger alert
    quantum_qubits: int = 8  # Number of qubits for quantum scanning
    reputation_decay: float = 0.99  # Reputation decay per false positive
    sampling_rate: float = 0.5  # Fraction of detectors to activate per transaction


@dataclass
class DefenderConfig:
    """Configuration for Defender Cells (B-Cell/Antibody analogs)"""
    temporal_lock_delay: int = 300  # Seconds to delay response (5 min default)
    response_strength_multiplier: float = 1.2  # Boost for known threats
    max_concurrent_defenders: int = 100  # Maximum active defender cells
    antibody_decay_rate: float = 0.95  # Response strength decay over time


@dataclass
class MemoryConfig:
    """Configuration for Memory Cells (Immune Memory analogs)"""
    fuzzy_match_threshold: float = 0.85  # Similarity threshold for threat matching
    max_memories_per_cell: int = 10000  # Maximum stored threat patterns
    merkle_update_frequency: int = 100  # Update Merkle root every N memories
    quantum_fingerprint_qubits: int = 8  # Qubits for quantum fingerprinting


@dataclass
class RegulatoryConfig:
    """Configuration for Regulatory Cells (Regulatory T-Cell analogs)"""
    suppression_threshold: float = 0.9  # Minimum confidence to allow response
    max_severity_multiplier: float = 1.5  # Maximum proportional response
    approval_consensus: float = 0.7  # Fraction of regulators that must approve
    max_quarantine_duration: int = 86400  # Maximum quarantine time (24 hours)


@dataclass
class AhimsamProtocol:
    """Non-violence ethical constraints"""
    no_irreversible_harm: bool = True
    no_collective_punishment: bool = True
    require_redemption_path: bool = True
    proportional_force_only: bool = True
    appeal_window_seconds: int = 259200  # 3 days
    max_permanent_bans_allowed: int = 0  # Zero permanent bans


@dataclass
class TokenomicsConfig:
    """Economic incentives for immune system participation"""
    detection_reward: float = 10.0  # LUXBIN tokens for successful detection
    false_positive_penalty: float = 50.0  # Tokens slashed for false alarm
    memory_storage_reward: float = 5.0  # Reward for anchoring memory
    regulatory_approval_reward: float = 2.0  # Reward for correct validation
    nft_reputation_increase: int = 1  # Reputation gain per success
    nft_reputation_decrease: int = 5  # Reputation loss per failure
    nft_burn_threshold: int = -20  # Reputation below which NFT burns


@dataclass
class EvolutionConfig:
    """Genetic algorithm parameters for detector evolution"""
    population_size: int = 100  # Number of detector variants
    elite_percentage: float = 0.2  # Top performers to keep each generation
    mutation_rate: float = 0.1  # Probability of random mutation
    evolution_frequency: int = 100  # Evolve every N threats
    crossover_enabled: bool = True  # Allow trait mixing from parents


@dataclass
class NetworkConfig:
    """Blockchain network integration settings"""
    validator_stake_required: float = 1000.0  # LUXBIN tokens to run immune cells
    max_validators: int = 10000  # Maximum network validators
    consensus_threshold: float = 0.6  # Fraction of detectors that must agree
    block_time_seconds: int = 6  # Average block time
    transactions_per_block: int = 1000  # Average transactions per block


@dataclass
class LuxbinImmuneSystemConfig:
    """Master configuration for complete immune system"""

    # Component configurations
    detector: DetectorConfig = field(default_factory=DetectorConfig)
    defender: DefenderConfig = field(default_factory=DefenderConfig)
    memory: MemoryConfig = field(default_factory=MemoryConfig)
    regulatory: RegulatoryConfig = field(default_factory=RegulatoryConfig)
    ahimsa: AhimsamProtocol = field(default_factory=AhimsamProtocol)
    tokenomics: TokenomicsConfig = field(default_factory=TokenomicsConfig)
    evolution: EvolutionConfig = field(default_factory=EvolutionConfig)
    network: NetworkConfig = field(default_factory=NetworkConfig)

    # System-wide settings
    num_detector_cells: int = 1000
    num_memory_cells: int = 100
    num_regulatory_cells: int = 50
    log_level: str = "INFO"
    enable_quantum_scanning: bool = True
    enable_temporal_cryptography: bool = True
    enable_evolution: bool = True

    def validate(self) -> List[str]:
        """Validate configuration for consistency"""
        errors = []

        # Check thresholds are in valid range
        if not 0.0 <= self.detector.threat_threshold <= 1.0:
            errors.append("detector.threat_threshold must be between 0.0 and 1.0")

        if not 0.0 <= self.memory.fuzzy_match_threshold <= 1.0:
            errors.append("memory.fuzzy_match_threshold must be between 0.0 and 1.0")

        if not 0.0 <= self.regulatory.suppression_threshold <= 1.0:
            errors.append("regulatory.suppression_threshold must be between 0.0 and 1.0")

        # Check detector threshold < regulatory threshold
        if self.detector.threat_threshold >= self.regulatory.suppression_threshold:
            errors.append(
                "detector.threat_threshold should be lower than regulatory.suppression_threshold"
            )

        # Check tokenomics makes sense
        if self.tokenomics.detection_reward >= self.tokenomics.false_positive_penalty:
            errors.append(
                "false_positive_penalty should exceed detection_reward to discourage false alarms"
            )

        # Check network parameters
        if self.network.consensus_threshold > 1.0 or self.network.consensus_threshold < 0.5:
            errors.append("network.consensus_threshold should be between 0.5 and 1.0")

        # Check cell counts are reasonable
        if self.num_detector_cells < 10:
            errors.append("num_detector_cells should be at least 10 for effective detection")

        if self.num_regulatory_cells < 3:
            errors.append("num_regulatory_cells should be at least 3 for consensus")

        return errors

    def to_dict(self) -> Dict:
        """Convert configuration to dictionary for serialization"""
        return {
            'detector': self.detector.__dict__,
            'defender': self.defender.__dict__,
            'memory': self.memory.__dict__,
            'regulatory': self.regulatory.__dict__,
            'ahimsa': self.ahimsa.__dict__,
            'tokenomics': self.tokenomics.__dict__,
            'evolution': self.evolution.__dict__,
            'network': self.network.__dict__,
            'num_detector_cells': self.num_detector_cells,
            'num_memory_cells': self.num_memory_cells,
            'num_regulatory_cells': self.num_regulatory_cells,
            'log_level': self.log_level,
            'enable_quantum_scanning': self.enable_quantum_scanning,
            'enable_temporal_cryptography': self.enable_temporal_cryptography,
            'enable_evolution': self.enable_evolution
        }


# Preset configurations for different deployment scenarios

def development_config() -> LuxbinImmuneSystemConfig:
    """Configuration for local development and testing"""
    config = LuxbinImmuneSystemConfig()
    config.num_detector_cells = 20
    config.num_memory_cells = 5
    config.num_regulatory_cells = 3  # Minimum 3 for consensus
    config.detector.threat_threshold = 0.7  # Lower threshold for testing
    config.network.validator_stake_required = 10.0  # Lower stake for dev
    config.log_level = "DEBUG"
    return config


def testnet_config() -> LuxbinImmuneSystemConfig:
    """Configuration for testnet deployment"""
    config = LuxbinImmuneSystemConfig()
    config.num_detector_cells = 100
    config.num_memory_cells = 20
    config.num_regulatory_cells = 10
    config.detector.threat_threshold = 0.75
    config.network.validator_stake_required = 100.0
    config.log_level = "INFO"
    return config


def mainnet_config() -> LuxbinImmuneSystemConfig:
    """Configuration for mainnet production deployment"""
    config = LuxbinImmuneSystemConfig()
    config.num_detector_cells = 1000
    config.num_memory_cells = 100
    config.num_regulatory_cells = 50
    config.detector.threat_threshold = 0.8  # Higher threshold for production
    config.regulatory.suppression_threshold = 0.95  # Very high confidence required
    config.network.validator_stake_required = 1000.0
    config.log_level = "WARNING"
    config.enable_evolution = True
    return config


def high_security_config() -> LuxbinImmuneSystemConfig:
    """Configuration for maximum security (DeFi, high-value networks)"""
    config = mainnet_config()
    config.detector.threat_threshold = 0.85
    config.regulatory.suppression_threshold = 0.98  # Extremely high confidence
    config.detector.quantum_qubits = 16  # More quantum scanning
    config.memory.quantum_fingerprint_qubits = 16
    config.num_detector_cells = 2000  # Double detectors
    config.network.consensus_threshold = 0.75  # Higher consensus requirement
    config.tokenomics.false_positive_penalty = 100.0  # Heavy penalty for mistakes
    return config


def permissive_config() -> LuxbinImmuneSystemConfig:
    """Configuration for low-risk networks prioritizing accessibility"""
    config = LuxbinImmuneSystemConfig()
    config.detector.threat_threshold = 0.65  # Lower threshold
    config.regulatory.suppression_threshold = 0.85
    config.regulatory.max_quarantine_duration = 3600  # Max 1 hour quarantine
    config.ahimsa.appeal_window_seconds = 86400  # 24 hour appeal window
    config.tokenomics.false_positive_penalty = 25.0  # Lower penalty
    config.num_detector_cells = 500
    return config


# Load configuration based on environment
def load_config(environment: str = "development") -> LuxbinImmuneSystemConfig:
    """Load appropriate configuration for environment"""

    configs = {
        'development': development_config,
        'dev': development_config,
        'testnet': testnet_config,
        'test': testnet_config,
        'mainnet': mainnet_config,
        'production': mainnet_config,
        'prod': mainnet_config,
        'high_security': high_security_config,
        'defi': high_security_config,
        'permissive': permissive_config,
        'accessible': permissive_config
    }

    config_func = configs.get(environment.lower(), development_config)
    config = config_func()

    # Validate configuration
    errors = config.validate()
    if errors:
        print(f"⚠️  Configuration validation errors for '{environment}':")
        for error in errors:
            print(f"   - {error}")
        raise ValueError(f"Invalid configuration: {errors}")

    print(f"✅ Loaded '{environment}' configuration successfully")
    return config


if __name__ == "__main__":
    # Test all configurations
    print("🔧 LUXBIN Immune System - Configuration Validator\n")

    environments = ['development', 'testnet', 'mainnet', 'high_security', 'permissive']

    for env in environments:
        print(f"\n{'=' * 60}")
        print(f"Testing {env.upper()} configuration")
        print('=' * 60)

        try:
            config = load_config(env)

            print(f"\nCell Counts:")
            print(f"  Detectors:   {config.num_detector_cells}")
            print(f"  Memory:      {config.num_memory_cells}")
            print(f"  Regulatory:  {config.num_regulatory_cells}")

            print(f"\nThresholds:")
            print(f"  Detection:   {config.detector.threat_threshold}")
            print(f"  Regulatory:  {config.regulatory.suppression_threshold}")
            print(f"  Consensus:   {config.network.consensus_threshold}")

            print(f"\nTokenomics:")
            print(f"  Detection Reward:      {config.tokenomics.detection_reward} LUXBIN")
            print(f"  False Positive Penalty: {config.tokenomics.false_positive_penalty} LUXBIN")
            print(f"  Validator Stake:       {config.network.validator_stake_required} LUXBIN")

            print(f"\nFeatures:")
            print(f"  Quantum Scanning:  {config.enable_quantum_scanning}")
            print(f"  Temporal Crypto:   {config.enable_temporal_cryptography}")
            print(f"  Evolution:         {config.enable_evolution}")

            print(f"\n✅ {env.upper()} configuration valid")

        except Exception as e:
            print(f"\n❌ {env.upper()} configuration failed: {e}")

    print(f"\n{'=' * 60}")
    print("Configuration validation complete!")
