#!/usr/bin/env python3
"""
HCT (Harmonic Convergence Theory) Core Engine
Production-grade systems-level harmonization metric for LUXBIN

HCT = (αB · βH · γG · δR · εE)^(1/5)

Where:
- B (Biology): system health and adaptability
- H (History): memory and precedent
- G (Geology): infrastructure substrate
- R (Religion): ethics, norms, and constraints
- E (Electromagnetism): energy, time, and signal

All terms normalized to [0, 1], α–ε are governance-tunable weights.
"""

import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
from enum import Enum
import json
from scipy.stats import entropy as scipy_entropy

class HCTComponent(Enum):
    """Five HCT components"""
    BIOLOGY = "B"
    HISTORY = "H"
    GEOLOGY = "G"
    RELIGION = "R"
    ELECTROMAGNETISM = "E"

@dataclass
class HCTCoefficients:
    """Governance-tunable coefficients (α, β, γ, δ, ε)"""
    alpha: float = 1.0  # Biology weight
    beta: float = 1.0   # History weight
    gamma: float = 1.0  # Geology weight
    delta: float = 1.0  # Religion weight
    epsilon: float = 1.0  # Electromagnetism weight

    last_updated: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_by: str = "system"

    def normalize(self) -> 'HCTCoefficients':
        """Normalize coefficients to sum to 5.0 (geometric mean constraint)"""
        total = self.alpha + self.beta + self.gamma + self.delta + self.epsilon
        scale = 5.0 / total

        return HCTCoefficients(
            alpha=self.alpha * scale,
            beta=self.beta * scale,
            gamma=self.gamma * scale,
            delta=self.delta * scale,
            epsilon=self.epsilon * scale,
            last_updated=datetime.utcnow().isoformat(),
            updated_by=self.updated_by
        )

    def to_dict(self) -> Dict:
        return {
            "alpha": self.alpha,
            "beta": self.beta,
            "gamma": self.gamma,
            "delta": self.delta,
            "epsilon": self.epsilon,
            "last_updated": self.last_updated,
            "updated_by": self.updated_by
        }

@dataclass
class HCTMetrics:
    """Raw metrics for HCT computation"""

    # Biology (B) - System Health & Adaptability
    b_entropy: float = 0.0              # Cell diversity entropy
    b_fault_tolerance: float = 0.0      # Redundancy capacity
    b_mutation_rate: float = 0.0        # Adaptive evolution rate
    b_uptime: float = 0.0               # System availability

    # History (H) - Memory & Precedent
    h_replay_integrity: float = 0.0     # Block replay success rate
    h_fork_awareness: float = 0.0       # Fork detection rate
    h_anomaly_learning: float = 0.0     # Non-recurrence of threats
    h_auditability: float = 0.0         # Complete provenance

    # Geology (G) - Infrastructure Substrate
    g_geo_diversity: float = 0.0        # Geographic decentralization
    g_hw_heterogeneity: float = 0.0     # Hardware diversity
    g_dependency_concentration: float = 0.0  # Single-point-of-failure risk
    g_physical_decentralization: float = 0.0  # Datacenter distribution

    # Religion (R) - Ethics & Constraints
    r_protocol_compliance: float = 0.0  # Rule adherence
    r_safety_constraints: float = 0.0   # Safety violations
    r_non_violence: float = 0.0         # Non-malicious behavior
    r_permission_boundaries: float = 0.0  # Access control integrity

    # Electromagnetism (E) - Energy, Time, Signal
    e_power_efficiency: float = 0.0     # Energy usage
    e_timing_accuracy: float = 0.0      # Clock synchronization
    e_latency_consistency: float = 0.0  # Response time variance
    e_signal_integrity: float = 0.0     # Data corruption rate

    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def validate(self) -> List[str]:
        """Validate all metrics are in [0, 1] range"""
        errors = []
        for key, value in self.__dict__.items():
            if key == 'timestamp':
                continue
            if not (0.0 <= value <= 1.0):
                errors.append(f"{key} = {value:.4f} (out of range [0, 1])")
        return errors

@dataclass
class HCTResult:
    """Complete HCT computation result"""

    # Component scores [0, 1]
    B: float  # Biology
    H: float  # History
    G: float  # Geology
    R: float  # Religion
    E: float  # Electromagnetism

    # Weighted components
    weighted_B: float
    weighted_H: float
    weighted_G: float
    weighted_R: float
    weighted_E: float

    # Final HCT score [0, 1]
    HCT: float

    # Metadata
    coefficients: HCTCoefficients
    raw_metrics: HCTMetrics
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    computation_time_ms: float = 0.0

    def to_dict(self) -> Dict:
        return {
            "components": {
                "B": self.B,
                "H": self.H,
                "G": self.G,
                "R": self.R,
                "E": self.E
            },
            "weighted_components": {
                "weighted_B": self.weighted_B,
                "weighted_H": self.weighted_H,
                "weighted_G": self.weighted_G,
                "weighted_R": self.weighted_R,
                "weighted_E": self.weighted_E
            },
            "HCT": self.HCT,
            "timestamp": self.timestamp,
            "computation_time_ms": self.computation_time_ms,
            "coefficients": self.coefficients.to_dict()
        }

    def get_weakest_component(self) -> Tuple[str, float]:
        """Identify weakest component for remediation"""
        components = {
            "B": self.B,
            "H": self.H,
            "G": self.G,
            "R": self.R,
            "E": self.E
        }
        weakest = min(components.items(), key=lambda x: x[1])
        return weakest

    def get_breach_threshold(self, threshold: float = 0.5) -> List[str]:
        """Get components below threshold"""
        breached = []
        components = {
            "B": self.B,
            "H": self.H,
            "G": self.G,
            "R": self.R,
            "E": self.E
        }
        for name, value in components.items():
            if value < threshold:
                breached.append(f"{name}={value:.3f}")
        return breached

class HCTEngine:
    """
    Core HCT computation engine

    Computes HCT = (αB · βH · γG · δR · εE)^(1/5)

    Design principles:
    - Deterministic: same inputs → same outputs
    - Normalized: all terms in [0, 1]
    - Falsifiable: each metric has clear definition
    - Production-ready: handles edge cases, validates inputs
    """

    def __init__(self, coefficients: Optional[HCTCoefficients] = None):
        self.coefficients = coefficients or HCTCoefficients()
        self.history: List[HCTResult] = []

    def compute(self, metrics: HCTMetrics) -> HCTResult:
        """
        Compute HCT from raw metrics

        Steps:
        1. Validate inputs
        2. Compute component scores (geometric means of sub-metrics)
        3. Apply coefficients
        4. Compute geometric mean

        Returns:
            HCTResult with complete computation breakdown

        Raises:
            ValueError if metrics are invalid
        """
        start_time = datetime.utcnow()

        # 1. Validate
        errors = metrics.validate()
        if errors:
            raise ValueError(f"Invalid metrics: {errors}")

        # 2. Compute component scores
        B = self._compute_biology(metrics)
        H = self._compute_history(metrics)
        G = self._compute_geology(metrics)
        R = self._compute_religion(metrics)
        E = self._compute_electromagnetism(metrics)

        # 3. Apply coefficients (weights)
        weighted_B = B ** self.coefficients.alpha
        weighted_H = H ** self.coefficients.beta
        weighted_G = G ** self.coefficients.gamma
        weighted_R = R ** self.coefficients.delta
        weighted_E = E ** self.coefficients.epsilon

        # 4. Geometric mean: (product)^(1/5)
        # Using log-space for numerical stability
        if any(x <= 0 for x in [weighted_B, weighted_H, weighted_G, weighted_R, weighted_E]):
            # Handle zero values (set HCT to 0)
            HCT = 0.0
        else:
            log_product = (
                np.log(weighted_B) +
                np.log(weighted_H) +
                np.log(weighted_G) +
                np.log(weighted_R) +
                np.log(weighted_E)
            )
            HCT = np.exp(log_product / 5.0)

        # Compute time
        end_time = datetime.utcnow()
        computation_time_ms = (end_time - start_time).total_seconds() * 1000

        result = HCTResult(
            B=B,
            H=H,
            G=G,
            R=R,
            E=E,
            weighted_B=weighted_B,
            weighted_H=weighted_H,
            weighted_G=weighted_G,
            weighted_R=weighted_R,
            weighted_E=weighted_E,
            HCT=HCT,
            coefficients=self.coefficients,
            raw_metrics=metrics,
            computation_time_ms=computation_time_ms
        )

        # Store in history
        self.history.append(result)

        return result

    def _compute_biology(self, m: HCTMetrics) -> float:
        """
        B = geometric_mean(entropy, fault_tolerance, mutation_rate, uptime)

        Biology measures system health and adaptability:
        - High entropy = diverse cell types (resilient)
        - High fault tolerance = can lose cells without failure
        - Optimal mutation rate = adapting but not chaotic
        - High uptime = reliable system
        """
        values = [m.b_entropy, m.b_fault_tolerance, m.b_mutation_rate, m.b_uptime]
        return self._geometric_mean(values)

    def _compute_history(self, m: HCTMetrics) -> float:
        """
        H = geometric_mean(replay_integrity, fork_awareness, anomaly_learning, auditability)

        History measures memory and precedent:
        - Replay integrity = can reconstruct past states
        - Fork awareness = detect and handle chain splits
        - Anomaly learning = don't repeat same attacks
        - Auditability = complete provenance trail
        """
        values = [m.h_replay_integrity, m.h_fork_awareness, m.h_anomaly_learning, m.h_auditability]
        return self._geometric_mean(values)

    def _compute_geology(self, m: HCTMetrics) -> float:
        """
        G = geometric_mean(geo_diversity, hw_heterogeneity, dependency_concentration, physical_decentralization)

        Geology measures infrastructure substrate:
        - Geographic diversity = nodes spread across countries
        - Hardware heterogeneity = diverse OS/hardware (no monoculture)
        - Low dependency concentration = no single library kills system
        - Physical decentralization = not all in AWS us-east-1
        """
        values = [m.g_geo_diversity, m.g_hw_heterogeneity, m.g_dependency_concentration, m.g_physical_decentralization]
        return self._geometric_mean(values)

    def _compute_religion(self, m: HCTMetrics) -> float:
        """
        R = geometric_mean(protocol_compliance, safety_constraints, non_violence, permission_boundaries)

        Religion measures ethics, norms, and constraints:
        - Protocol compliance = following the rules
        - Safety constraints = no double-spends, valid states only
        - Non-violence = not attacking others
        - Permission boundaries = proper access control
        """
        values = [m.r_protocol_compliance, m.r_safety_constraints, m.r_non_violence, m.r_permission_boundaries]
        return self._geometric_mean(values)

    def _compute_electromagnetism(self, m: HCTMetrics) -> float:
        """
        E = geometric_mean(power_efficiency, timing_accuracy, latency_consistency, signal_integrity)

        Electromagnetism measures energy, time, and signal:
        - Power efficiency = low energy waste
        - Timing accuracy = synchronized clocks
        - Latency consistency = predictable response times
        - Signal integrity = low corruption/noise
        """
        values = [m.e_power_efficiency, m.e_timing_accuracy, m.e_latency_consistency, m.e_signal_integrity]
        return self._geometric_mean(values)

    def _geometric_mean(self, values: List[float]) -> float:
        """
        Compute geometric mean with numerical stability

        Geometric mean is sensitive to zeros (any zero → result is zero)
        This is DESIRABLE: one critical failure should tank the score

        Uses log-space: exp(mean(log(values)))
        """
        if not values:
            return 0.0

        # Filter out zeros (would cause log error)
        non_zero = [v for v in values if v > 0]

        if len(non_zero) < len(values):
            # If any zeros, geometric mean is 0
            return 0.0

        # Compute in log-space for numerical stability
        log_values = np.log(non_zero)
        return np.exp(np.mean(log_values))

    def update_coefficients(self, new_coefficients: HCTCoefficients, normalize: bool = True):
        """
        Update coefficients via governance

        Args:
            new_coefficients: New coefficient values
            normalize: Whether to normalize to sum=5.0
        """
        if normalize:
            self.coefficients = new_coefficients.normalize()
        else:
            self.coefficients = new_coefficients

    def get_trend(self, window: int = 10) -> Optional[float]:
        """
        Get HCT trend over last N computations

        Returns:
            Trend coefficient (positive = improving, negative = degrading)
            None if insufficient history
        """
        if len(self.history) < 2:
            return None

        recent = self.history[-window:]
        hct_values = [r.HCT for r in recent]

        # Simple linear regression
        x = np.arange(len(hct_values))
        slope = np.polyfit(x, hct_values, 1)[0]

        return slope

    def get_volatility(self, window: int = 10) -> Optional[float]:
        """
        Get HCT volatility (coefficient of variation)

        High volatility = unstable system
        Low volatility = stable system
        """
        if len(self.history) < 2:
            return None

        recent = self.history[-window:]
        hct_values = [r.HCT for r in recent]

        mean = np.mean(hct_values)
        std = np.std(hct_values)

        if mean == 0:
            return float('inf')

        return std / mean  # Coefficient of variation

    def export_history(self, filepath: str):
        """Export HCT history as JSON"""
        data = {
            "coefficients": self.coefficients.to_dict(),
            "history": [h.to_dict() for h in self.history]
        }

        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)

    def import_history(self, filepath: str):
        """Import HCT history from JSON"""
        with open(filepath, 'r') as f:
            data = json.load(f)

        # Restore coefficients
        coeff_data = data["coefficients"]
        self.coefficients = HCTCoefficients(**coeff_data)

        # Note: History is not restored (would need to reconstruct HCTResult objects)
        # This is intentional - import is for coefficients only

# ============================================================================
# Utility Functions
# ============================================================================

def compute_shannon_entropy(distribution: List[float]) -> float:
    """
    Compute Shannon entropy of a distribution

    Entropy measures diversity/unpredictability
    - High entropy = uniform distribution (all values equally likely)
    - Low entropy = concentrated distribution (one value dominates)

    Normalized to [0, 1] by dividing by log(n)
    """
    if not distribution or sum(distribution) == 0:
        return 0.0

    # Normalize to probabilities
    total = sum(distribution)
    probs = [x / total for x in distribution]

    # Compute entropy
    ent = scipy_entropy(probs, base=2)

    # Normalize to [0, 1]
    max_entropy = np.log2(len(distribution))
    if max_entropy == 0:
        return 0.0

    return ent / max_entropy

def compute_gini_coefficient(values: List[float]) -> float:
    """
    Compute Gini coefficient (inequality measure)

    0 = perfect equality (all values same)
    1 = perfect inequality (one value has everything)

    Used for measuring concentration/centralization
    """
    if not values or len(values) == 1:
        return 0.0

    values = sorted(values)
    n = len(values)

    # Gini formula
    numerator = sum((i + 1) * val for i, val in enumerate(values))
    denominator = n * sum(values)

    if denominator == 0:
        return 0.0

    gini = (2 * numerator) / denominator - (n + 1) / n

    return max(0.0, min(1.0, gini))

def compute_herfindahl_index(market_shares: List[float]) -> float:
    """
    Compute Herfindahl-Hirschman Index (concentration measure)

    Sum of squared market shares
    - Low HHI = competitive/decentralized
    - High HHI = concentrated/centralized

    Normalized to [0, 1]
    """
    if not market_shares:
        return 0.0

    # Normalize to shares (sum to 1)
    total = sum(market_shares)
    if total == 0:
        return 0.0

    shares = [x / total for x in market_shares]

    # HHI = sum of squared shares
    hhi = sum(s**2 for s in shares)

    # Normalize: 1/n (perfect competition) to 1 (monopoly)
    n = len(shares)
    if n == 1:
        return 1.0

    min_hhi = 1.0 / n
    normalized = (hhi - min_hhi) / (1.0 - min_hhi)

    return max(0.0, min(1.0, normalized))

def coefficient_of_variation(values: List[float]) -> float:
    """
    Compute coefficient of variation (CV)

    CV = std / mean

    Measures relative variability
    - Low CV = consistent/stable
    - High CV = variable/unstable

    Returns value in [0, inf), caller should normalize
    """
    if not values or len(values) < 2:
        return 0.0

    mean = np.mean(values)
    std = np.std(values)

    if mean == 0:
        return float('inf') if std > 0 else 0.0

    return std / abs(mean)

# ============================================================================
# Example Usage
# ============================================================================

if __name__ == "__main__":
    # Create HCT engine with default coefficients
    engine = HCTEngine()

    # Example metrics (all normalized to [0, 1])
    metrics = HCTMetrics(
        # Biology - good health
        b_entropy=0.85,           # High diversity
        b_fault_tolerance=0.75,   # Can lose 25% of cells
        b_mutation_rate=0.60,     # Moderate adaptation
        b_uptime=0.99,            # 99% uptime

        # History - strong memory
        h_replay_integrity=0.95,  # Can replay 95% of blocks
        h_fork_awareness=0.90,    # Detect 90% of forks
        h_anomaly_learning=0.80,  # 80% non-recurrence
        h_auditability=0.98,      # 98% complete audit trail

        # Geology - moderate decentralization
        g_geo_diversity=0.70,     # Spread across countries
        g_hw_heterogeneity=0.65,  # Some hardware diversity
        g_dependency_concentration=0.60,  # Some single points of failure
        g_physical_decentralization=0.55,  # Mostly cloud providers

        # Religion - strong ethics
        r_protocol_compliance=0.98,  # 98% rule adherence
        r_safety_constraints=0.99,   # 99% safety compliance
        r_non_violence=0.95,         # 95% non-malicious
        r_permission_boundaries=0.97,  # 97% proper access control

        # Electromagnetism - good energy/signal
        e_power_efficiency=0.70,     # 30% energy waste
        e_timing_accuracy=0.85,      # 85% synchronized
        e_latency_consistency=0.80,  # 80% consistent
        e_signal_integrity=0.95      # 5% corruption
    )

    # Compute HCT
    result = engine.compute(metrics)

    print("=" * 80)
    print("HCT COMPUTATION RESULT")
    print("=" * 80)
    print(f"B (Biology):         {result.B:.4f}")
    print(f"H (History):         {result.H:.4f}")
    print(f"G (Geology):         {result.G:.4f}")
    print(f"R (Religion):        {result.R:.4f}")
    print(f"E (Electromagnetism): {result.E:.4f}")
    print()
    print(f"HCT SCORE:           {result.HCT:.4f}")
    print()
    print(f"Weakest component:   {result.get_weakest_component()}")
    print(f"Computation time:    {result.computation_time_ms:.2f} ms")
    print("=" * 80)
