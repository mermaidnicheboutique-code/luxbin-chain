#!/usr/bin/env python3
"""
HCT Integration with LUXBIN Immune System
Uses HCT score for:
- Consensus weight (validator selection)
- Staking modifiers (rewards)
- Circuit breakers (safety triggers)
- Threat severity multipliers
- Routing preference
"""

import asyncio
import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass
from enum import Enum

from hct_core import HCTEngine, HCTCoefficients, HCTResult
from hct_metrics_collector import HCTMetricsAggregator

class SystemMode(Enum):
    """System operating mode based on HCT"""
    NORMAL = "normal"         # HCT >= 0.7
    DEGRADED = "degraded"     # 0.5 <= HCT < 0.7
    CRITICAL = "critical"     # 0.3 <= HCT < 0.5
    EMERGENCY = "emergency"   # HCT < 0.3

@dataclass
class HCTPolicy:
    """HCT-based operational policy"""

    # Circuit breaker thresholds
    emergency_threshold: float = 0.3   # Emergency mode
    critical_threshold: float = 0.5    # Critical mode
    degraded_threshold: float = 0.7    # Degraded mode

    # Consensus weights
    min_consensus_hct: float = 0.5     # Min HCT to participate in consensus
    hct_consensus_weight: float = 2.0  # Multiplier for consensus weight

    # Staking modifiers
    min_staking_hct: float = 0.4       # Min HCT to earn full rewards
    hct_staking_multiplier: float = 1.5  # Max reward multiplier

    # Threat severity
    hct_threat_sensitivity: float = 1.2  # How much HCT affects threat response

    # Component breach response
    component_breach_threshold: float = 0.3  # Action if any component below this

    def get_mode(self, hct: float) -> SystemMode:
        """Determine system mode based on HCT"""
        if hct < self.emergency_threshold:
            return SystemMode.EMERGENCY
        elif hct < self.critical_threshold:
            return SystemMode.CRITICAL
        elif hct < self.degraded_threshold:
            return SystemMode.DEGRADED
        else:
            return SystemMode.NORMAL

class HCTIntegration:
    """
    Integrate HCT with LUXBIN immune system

    Provides HCT-based decision making for:
    - Validator selection
    - Staking rewards
    - Safety mode triggers
    - Threat response tuning
    """

    def __init__(
        self,
        mirror_root: str = "./luxbin_mirror",
        node_registry: Optional[str] = None,
        policy: Optional[HCTPolicy] = None
    ):
        self.aggregator = HCTMetricsAggregator(mirror_root, node_registry)
        self.engine = HCTEngine()
        self.policy = policy or HCTPolicy()

        self.current_hct: Optional[HCTResult] = None
        self.current_mode: SystemMode = SystemMode.NORMAL

        self.hct_history: List[HCTResult] = []
        self.mode_changes: List[Dict] = []

    async def compute_hct(self, chain: str = "optimism") -> HCTResult:
        """
        Compute current HCT score

        Returns:
            Complete HCT result with all components
        """
        # Collect metrics
        metrics = await self.aggregator.collect_all(chain)

        # Compute HCT
        result = self.engine.compute(metrics)

        # Update state
        self.current_hct = result

        # Check for mode change
        new_mode = self.policy.get_mode(result.HCT)
        if new_mode != self.current_mode:
            await self._handle_mode_change(new_mode, result)

        # Check for component breaches
        breached = result.get_breach_threshold(self.policy.component_breach_threshold)
        if breached:
            await self._handle_component_breach(breached, result)

        return result

    async def _handle_mode_change(self, new_mode: SystemMode, result: HCTResult):
        """Handle system mode change"""

        old_mode = self.current_mode
        self.current_mode = new_mode

        change = {
            "timestamp": datetime.utcnow().isoformat(),
            "old_mode": old_mode.value,
            "new_mode": new_mode.value,
            "hct": result.HCT,
            "trigger": "hct_threshold"
        }

        self.mode_changes.append(change)

        print(f"🚨 MODE CHANGE: {old_mode.value.upper()} → {new_mode.value.upper()}")
        print(f"   HCT: {result.HCT:.4f}")
        print(f"   Action: {self._get_mode_action(new_mode)}")
        print()

    async def _handle_component_breach(self, breached: List[str], result: HCTResult):
        """Handle individual component breach"""

        print(f"⚠️  COMPONENT BREACH DETECTED")
        print(f"   Breached: {', '.join(breached)}")
        print(f"   Threshold: {self.policy.component_breach_threshold:.2f}")
        print()

        # Get weakest component
        weakest_name, weakest_value = result.get_weakest_component()
        print(f"   Weakest: {weakest_name} = {weakest_value:.4f}")
        print(f"   Recommendation: {self._get_remediation(weakest_name)}")
        print()

    def _get_mode_action(self, mode: SystemMode) -> str:
        """Get action description for mode"""
        actions = {
            SystemMode.NORMAL: "All systems operational",
            SystemMode.DEGRADED: "Reduce non-critical operations, monitor closely",
            SystemMode.CRITICAL: "Spawn additional immune cells, increase scanning",
            SystemMode.EMERGENCY: "HALT new transactions, emergency recovery mode"
        }
        return actions[mode]

    def _get_remediation(self, component: str) -> str:
        """Get remediation recommendation for component"""
        remediation = {
            "B": "Spawn more immune cells, increase diversity",
            "H": "Improve block storage, enable full replay",
            "G": "Add nodes in different regions/datacenters",
            "R": "Audit protocol compliance, tighten safety checks",
            "E": "Optimize power usage, sync clocks, reduce latency"
        }
        return remediation.get(component, "Unknown component")

    # ========================================================================
    # Consensus Integration
    # ========================================================================

    def get_consensus_weight(self, base_weight: float = 1.0) -> float:
        """
        Get consensus weight based on HCT

        Higher HCT = more voting power

        Args:
            base_weight: Base consensus weight

        Returns:
            Adjusted weight (base_weight * HCT_multiplier)
        """
        if self.current_hct is None:
            return base_weight

        hct = self.current_hct.HCT

        # Below minimum HCT? No consensus participation
        if hct < self.policy.min_consensus_hct:
            return 0.0

        # Linear scaling: weight = base * (1 + (HCT - 0.5) * multiplier)
        multiplier = self.policy.hct_consensus_weight
        adjusted_weight = base_weight * (1.0 + (hct - 0.5) * multiplier)

        return max(0.0, adjusted_weight)

    # ========================================================================
    # Staking Integration
    # ========================================================================

    def get_staking_multiplier(self) -> float:
        """
        Get staking reward multiplier based on HCT

        Higher HCT = higher rewards (incentivize system health)

        Returns:
            Reward multiplier in [0, 1 + hct_staking_multiplier]
        """
        if self.current_hct is None:
            return 1.0

        hct = self.current_hct.HCT

        # Below minimum? Reduced rewards
        if hct < self.policy.min_staking_hct:
            penalty = (self.policy.min_staking_hct - hct) / self.policy.min_staking_hct
            return 1.0 - (penalty * 0.5)  # Max 50% penalty

        # Above minimum: linear bonus
        # multiplier = 1.0 + (HCT - 0.4) * 1.5
        # At HCT=0.4: multiplier = 1.0
        # At HCT=1.0: multiplier = 1.9
        bonus = (hct - self.policy.min_staking_hct) / (1.0 - self.policy.min_staking_hct)
        multiplier = 1.0 + (bonus * self.policy.hct_staking_multiplier)

        return multiplier

    # ========================================================================
    # Threat Response Integration
    # ========================================================================

    def adjust_threat_severity(self, base_threat: float) -> float:
        """
        Adjust threat severity based on HCT

        Low HCT = more sensitive to threats (system is weak)
        High HCT = less sensitive (system is strong)

        Args:
            base_threat: Base threat score [0, 100]

        Returns:
            Adjusted threat score
        """
        if self.current_hct is None:
            return base_threat

        hct = self.current_hct.HCT

        # Low HCT amplifies threats
        # High HCT dampens threats
        sensitivity = self.policy.hct_threat_sensitivity

        # adjustment = 1 + (0.5 - HCT) * sensitivity
        # At HCT=0.5: adjustment = 1.0 (no change)
        # At HCT=0.2: adjustment = 1.36 (amplify)
        # At HCT=0.8: adjustment = 0.64 (dampen)
        adjustment = 1.0 + (0.5 - hct) * sensitivity

        adjusted_threat = base_threat * adjustment

        return min(100.0, max(0.0, adjusted_threat))

    def get_immune_response_multiplier(self) -> float:
        """
        Get immune cell spawn multiplier based on HCT

        Low HCT = spawn more cells (compensate for weakness)
        High HCT = normal spawning
        """
        if self.current_hct is None:
            return 1.0

        hct = self.current_hct.HCT

        # Inverse relationship
        # HCT=0.3: 2.0x cells
        # HCT=0.7: 1.0x cells
        # HCT=1.0: 0.7x cells (system is strong, needs fewer)

        if hct < 0.5:
            # Below 0.5: spawn extra cells
            return 2.0 - (hct * 2)  # 2.0 at HCT=0, 1.0 at HCT=0.5
        else:
            # Above 0.5: reduce spawning
            return 1.0 - ((hct - 0.5) * 0.6)  # 1.0 at HCT=0.5, 0.7 at HCT=1.0

    # ========================================================================
    # Circuit Breaker
    # ========================================================================

    def should_halt(self) -> Tuple[bool, Optional[str]]:
        """
        Check if system should halt (circuit breaker)

        Returns:
            (should_halt, reason)
        """
        if self.current_hct is None:
            return False, None

        # Emergency mode = halt
        if self.current_mode == SystemMode.EMERGENCY:
            return True, f"Emergency mode (HCT={self.current_hct.HCT:.4f})"

        # Critical component failure
        weakest_name, weakest_value = self.current_hct.get_weakest_component()
        if weakest_value < 0.2:
            return True, f"Critical {weakest_name} failure ({weakest_value:.4f})"

        return False, None

    # ========================================================================
    # Monitoring & Reporting
    # ========================================================================

    def get_health_report(self) -> Dict:
        """Get comprehensive health report"""

        if self.current_hct is None:
            return {"status": "no_data"}

        result = self.current_hct

        report = {
            "timestamp": datetime.utcnow().isoformat(),
            "hct_score": result.HCT,
            "system_mode": self.current_mode.value,
            "components": {
                "B": result.B,
                "H": result.H,
                "G": result.G,
                "R": result.R,
                "E": result.E
            },
            "weakest_component": dict(zip(["name", "value"], result.get_weakest_component())),
            "breaches": result.get_breach_threshold(self.policy.component_breach_threshold),
            "operational_status": {
                "consensus_weight": self.get_consensus_weight(),
                "staking_multiplier": self.get_staking_multiplier(),
                "immune_response_multiplier": self.get_immune_response_multiplier(),
                "should_halt": self.should_halt()[0]
            },
            "trend": self.engine.get_trend(),
            "volatility": self.engine.get_volatility()
        }

        return report

    def print_health_report(self):
        """Print formatted health report"""

        report = self.get_health_report()

        if report.get("status") == "no_data":
            print("⚠️  No HCT data available")
            return

        print()
        print("=" * 80)
        print("LUXBIN HEALTH REPORT")
        print("=" * 80)
        print(f"Timestamp: {report['timestamp']}")
        print()
        print(f"HCT Score:    {report['hct_score']:.4f}")
        print(f"System Mode:  {report['system_mode'].upper()}")
        print()
        print("Component Scores:")
        for name, value in report['components'].items():
            status = "✅" if value >= 0.7 else "⚠️" if value >= 0.5 else "❌"
            print(f"  {status} {name}: {value:.4f}")
        print()

        weakest = report['weakest_component']
        print(f"Weakest: {weakest['name']} = {weakest['value']:.4f}")

        if report['breaches']:
            print(f"⚠️  Breaches: {', '.join(report['breaches'])}")
        print()

        ops = report['operational_status']
        print("Operational Modifiers:")
        print(f"  Consensus Weight:   {ops['consensus_weight']:.2f}x")
        print(f"  Staking Multiplier: {ops['staking_multiplier']:.2f}x")
        print(f"  Immune Response:    {ops['immune_response_multiplier']:.2f}x")

        halt, reason = self.should_halt()
        if halt:
            print(f"  🚨 HALT: {reason}")
        else:
            print(f"  ✅ Operating normally")
        print()

        if report['trend'] is not None:
            trend_str = "improving" if report['trend'] > 0 else "degrading"
            print(f"Trend (10-period): {trend_str} ({report['trend']:+.6f}/period)")

        if report['volatility'] is not None:
            print(f"Volatility (CV):   {report['volatility']:.4f}")

        print("=" * 80)
        print()

async def main():
    """Example usage"""

    print("=" * 80)
    print("HCT INTEGRATION WITH LUXBIN")
    print("=" * 80)
    print()

    # Create integration
    integration = HCTIntegration()

    # Compute HCT
    print("Computing HCT from LUXBIN system...")
    result = await integration.compute_hct(chain="optimism")

    print()
    print(f"HCT Score: {result.HCT:.4f}")
    print(f"System Mode: {integration.current_mode.value.upper()}")
    print()

    # Show operational impacts
    print("Operational Impacts:")
    print(f"  Consensus weight:   {integration.get_consensus_weight():.2f}x")
    print(f"  Staking multiplier: {integration.get_staking_multiplier():.2f}x")
    print()

    # Threat adjustment example
    base_threat = 50.0
    adjusted = integration.adjust_threat_severity(base_threat)
    print(f"Threat Adjustment:")
    print(f"  Base threat: {base_threat:.0f}")
    print(f"  Adjusted:    {adjusted:.0f}")
    print()

    # Full report
    integration.print_health_report()

    # Export history
    integration.engine.export_history("hct_history.json")
    print("HCT history exported to hct_history.json")

if __name__ == "__main__":
    asyncio.run(main())
