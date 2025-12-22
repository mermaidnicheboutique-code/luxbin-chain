#!/usr/bin/env python3
"""
HCT Demo - Complete demonstration of HCT system

Demonstrates:
1. Metrics collection from LUXBIN
2. HCT computation
3. Integration with immune system
4. Coefficient tuning
5. Circuit breaker logic
6. Performance benchmarking
"""

import asyncio
import time
from typing import Dict
import json

from hct_core import (
    HCTEngine,
    HCTCoefficients,
    HCTMetrics,
    compute_shannon_entropy,
    compute_gini_coefficient
)
from hct_metrics_collector import HCTMetricsAggregator
from hct_integration import HCTIntegration, HCTPolicy, SystemMode

def print_section(title: str):
    """Print section header"""
    print()
    print("=" * 80)
    print(f" {title}")
    print("=" * 80)
    print()

async def demo_basic_computation():
    """Demo 1: Basic HCT computation"""
    print_section("DEMO 1: Basic HCT Computation")

    # Create engine
    engine = HCTEngine()

    # Create sample metrics (simulating a healthy system)
    metrics = HCTMetrics(
        # Biology - excellent health
        b_entropy=0.90,
        b_fault_tolerance=0.85,
        b_mutation_rate=0.60,
        b_uptime=0.99,

        # History - strong memory
        h_replay_integrity=0.95,
        h_fork_awareness=0.90,
        h_anomaly_learning=0.85,
        h_auditability=0.98,

        # Geology - good decentralization
        g_geo_diversity=0.75,
        g_hw_heterogeneity=0.70,
        g_dependency_concentration=0.65,
        g_physical_decentralization=0.60,

        # Religion - excellent ethics
        r_protocol_compliance=0.99,
        r_safety_constraints=0.98,
        r_non_violence=0.95,
        r_permission_boundaries=0.97,

        # Electromagnetism - good energy/signal
        e_power_efficiency=0.75,
        e_timing_accuracy=0.90,
        e_latency_consistency=0.85,
        e_signal_integrity=0.95
    )

    # Compute HCT
    start = time.time()
    result = engine.compute(metrics)
    elapsed = (time.time() - start) * 1000

    print(f"Component Scores:")
    print(f"  B (Biology):         {result.B:.4f}")
    print(f"  H (History):         {result.H:.4f}")
    print(f"  G (Geology):         {result.G:.4f}")
    print(f"  R (Religion):        {result.R:.4f}")
    print(f"  E (Electromagnetism): {result.E:.4f}")
    print()
    print(f"Final HCT Score:       {result.HCT:.4f}")
    print(f"Computation Time:      {elapsed:.2f} ms")
    print()

    weakest = result.get_weakest_component()
    print(f"Weakest Component:     {weakest[0]} = {weakest[1]:.4f}")

async def demo_edge_cases():
    """Demo 2: Edge cases and validation"""
    print_section("DEMO 2: Edge Cases & Validation")

    engine = HCTEngine()

    # Test 1: Perfect system
    print("Test 1: Perfect System (all metrics = 1.0)")
    perfect = HCTMetrics(**{
        k: 1.0 for k in [
            'b_entropy', 'b_fault_tolerance', 'b_mutation_rate', 'b_uptime',
            'h_replay_integrity', 'h_fork_awareness', 'h_anomaly_learning', 'h_auditability',
            'g_geo_diversity', 'g_hw_heterogeneity', 'g_dependency_concentration', 'g_physical_decentralization',
            'r_protocol_compliance', 'r_safety_constraints', 'r_non_violence', 'r_permission_boundaries',
            'e_power_efficiency', 'e_timing_accuracy', 'e_latency_consistency', 'e_signal_integrity'
        ]
    })
    result = engine.compute(perfect)
    print(f"  HCT = {result.HCT:.4f} (expected: 1.0000)")
    print()

    # Test 2: Critical failure (one component = 0)
    print("Test 2: Critical Failure (B_entropy = 0.0)")
    critical = HCTMetrics(**{**perfect.__dict__, 'b_entropy': 0.0})
    result = engine.compute(critical)
    print(f"  HCT = {result.HCT:.4f} (expected: 0.0000)")
    print(f"  Interpretation: Any critical metric at 0 → HCT = 0")
    print()

    # Test 3: Moderate system
    print("Test 3: Moderate System (all metrics = 0.5)")
    moderate = HCTMetrics(**{
        k: 0.5 for k in [
            'b_entropy', 'b_fault_tolerance', 'b_mutation_rate', 'b_uptime',
            'h_replay_integrity', 'h_fork_awareness', 'h_anomaly_learning', 'h_auditability',
            'g_geo_diversity', 'g_hw_heterogeneity', 'g_dependency_concentration', 'g_physical_decentralization',
            'r_protocol_compliance', 'r_safety_constraints', 'r_non_violence', 'r_permission_boundaries',
            'e_power_efficiency', 'e_timing_accuracy', 'e_latency_consistency', 'e_signal_integrity'
        ]
    })
    result = engine.compute(moderate)
    print(f"  HCT = {result.HCT:.4f} (expected: 0.5000)")
    print()

async def demo_coefficient_tuning():
    """Demo 3: Coefficient tuning via governance"""
    print_section("DEMO 3: Coefficient Tuning")

    # Base metrics
    metrics = HCTMetrics(
        b_entropy=0.8, b_fault_tolerance=0.7, b_mutation_rate=0.6, b_uptime=0.9,
        h_replay_integrity=0.9, h_fork_awareness=0.8, h_anomaly_learning=0.7, h_auditability=0.95,
        g_geo_diversity=0.6, g_hw_heterogeneity=0.5, g_dependency_concentration=0.5, g_physical_decentralization=0.4,
        r_protocol_compliance=0.95, r_safety_constraints=0.96, r_non_violence=0.9, r_permission_boundaries=0.93,
        e_power_efficiency=0.7, e_timing_accuracy=0.8, e_latency_consistency=0.75, e_signal_integrity=0.9
    )

    # Default coefficients (all = 1.0)
    print("Scenario 1: Default Coefficients (α=β=γ=δ=ε=1.0)")
    engine1 = HCTEngine()
    result1 = engine1.compute(metrics)
    print(f"  HCT = {result1.HCT:.4f}")
    print()

    # Prioritize Biology (α = 2.0, others = 0.75)
    print("Scenario 2: Prioritize Biology (α=2.0, others=0.75)")
    coeffs2 = HCTCoefficients(alpha=2.0, beta=0.75, gamma=0.75, delta=0.75, epsilon=0.75)
    coeffs2 = coeffs2.normalize()
    engine2 = HCTEngine(coeffs2)
    result2 = engine2.compute(metrics)
    print(f"  Normalized: α={coeffs2.alpha:.2f}, β={coeffs2.beta:.2f}, γ={coeffs2.gamma:.2f}, δ={coeffs2.delta:.2f}, ε={coeffs2.epsilon:.2f}")
    print(f"  HCT = {result2.HCT:.4f} (Biology heavily weighted)")
    print()

    # Ignore Geology (γ = 0.1, others = 1.225)
    print("Scenario 3: De-prioritize Geology (γ=0.1, others=1.225)")
    coeffs3 = HCTCoefficients(alpha=1.225, beta=1.225, gamma=0.1, delta=1.225, epsilon=1.225)
    coeffs3 = coeffs3.normalize()
    engine3 = HCTEngine(coeffs3)
    result3 = engine3.compute(metrics)
    print(f"  Normalized: α={coeffs3.alpha:.2f}, β={coeffs3.beta:.2f}, γ={coeffs3.gamma:.2f}, δ={coeffs3.delta:.2f}, ε={coeffs3.epsilon:.2f}")
    print(f"  HCT = {result3.HCT:.4f} (Geology barely matters)")
    print()

    print("Comparison:")
    print(f"  Default:             {result1.HCT:.4f}")
    print(f"  Prioritize Biology:  {result2.HCT:.4f} ({result2.HCT - result1.HCT:+.4f})")
    print(f"  Ignore Geology:      {result3.HCT:.4f} ({result3.HCT - result1.HCT:+.4f})")

async def demo_integration():
    """Demo 4: Integration with LUXBIN immune system"""
    print_section("DEMO 4: Integration with LUXBIN")

    print("Simulating three system states...")
    print()

    # State 1: Healthy system
    print("State 1: HEALTHY SYSTEM")
    integration1 = HCTIntegration()
    integration1.current_hct = HCTEngine().compute(HCTMetrics(**{
        k: 0.85 for k in [
            'b_entropy', 'b_fault_tolerance', 'b_mutation_rate', 'b_uptime',
            'h_replay_integrity', 'h_fork_awareness', 'h_anomaly_learning', 'h_auditability',
            'g_geo_diversity', 'g_hw_heterogeneity', 'g_dependency_concentration', 'g_physical_decentralization',
            'r_protocol_compliance', 'r_safety_constraints', 'r_non_violence', 'r_permission_boundaries',
            'e_power_efficiency', 'e_timing_accuracy', 'e_latency_consistency', 'e_signal_integrity'
        ]
    }))
    integration1.current_mode = integration1.policy.get_mode(integration1.current_hct.HCT)

    print(f"  HCT: {integration1.current_hct.HCT:.4f}")
    print(f"  Mode: {integration1.current_mode.value.upper()}")
    print(f"  Consensus weight: {integration1.get_consensus_weight():.2f}x")
    print(f"  Staking multiplier: {integration1.get_staking_multiplier():.2f}x")
    print(f"  Immune response: {integration1.get_immune_response_multiplier():.2f}x")
    halt, reason = integration1.should_halt()
    print(f"  Should halt: {'YES - ' + reason if halt else 'NO'}")
    print()

    # State 2: Degraded system
    print("State 2: DEGRADED SYSTEM")
    integration2 = HCTIntegration()
    integration2.current_hct = HCTEngine().compute(HCTMetrics(**{
        k: 0.55 for k in [
            'b_entropy', 'b_fault_tolerance', 'b_mutation_rate', 'b_uptime',
            'h_replay_integrity', 'h_fork_awareness', 'h_anomaly_learning', 'h_auditability',
            'g_geo_diversity', 'g_hw_heterogeneity', 'g_dependency_concentration', 'g_physical_decentralization',
            'r_protocol_compliance', 'r_safety_constraints', 'r_non_violence', 'r_permission_boundaries',
            'e_power_efficiency', 'e_timing_accuracy', 'e_latency_consistency', 'e_signal_integrity'
        ]
    }))
    integration2.current_mode = integration2.policy.get_mode(integration2.current_hct.HCT)

    print(f"  HCT: {integration2.current_hct.HCT:.4f}")
    print(f"  Mode: {integration2.current_mode.value.upper()}")
    print(f"  Consensus weight: {integration2.get_consensus_weight():.2f}x")
    print(f"  Staking multiplier: {integration2.get_staking_multiplier():.2f}x")
    print(f"  Immune response: {integration2.get_immune_response_multiplier():.2f}x")
    halt, reason = integration2.should_halt()
    print(f"  Should halt: {'YES - ' + reason if halt else 'NO'}")
    print()

    # State 3: Emergency
    print("State 3: EMERGENCY SYSTEM")
    integration3 = HCTIntegration()
    integration3.current_hct = HCTEngine().compute(HCTMetrics(**{
        k: 0.25 for k in [
            'b_entropy', 'b_fault_tolerance', 'b_mutation_rate', 'b_uptime',
            'h_replay_integrity', 'h_fork_awareness', 'h_anomaly_learning', 'h_auditability',
            'g_geo_diversity', 'g_hw_heterogeneity', 'g_dependency_concentration', 'g_physical_decentralization',
            'r_protocol_compliance', 'r_safety_constraints', 'r_non_violence', 'r_permission_boundaries',
            'e_power_efficiency', 'e_timing_accuracy', 'e_latency_consistency', 'e_signal_integrity'
        ]
    }))
    integration3.current_mode = integration3.policy.get_mode(integration3.current_hct.HCT)

    print(f"  HCT: {integration3.current_hct.HCT:.4f}")
    print(f"  Mode: {integration3.current_mode.value.upper()}")
    print(f"  Consensus weight: {integration3.get_consensus_weight():.2f}x")
    print(f"  Staking multiplier: {integration3.get_staking_multiplier():.2f}x")
    print(f"  Immune response: {integration3.get_immune_response_multiplier():.2f}x")
    halt, reason = integration3.should_halt()
    print(f"  Should halt: {'YES - ' + reason if halt else 'NO'}")

async def demo_threat_adjustment():
    """Demo 5: Threat severity adjustment"""
    print_section("DEMO 5: Threat Severity Adjustment")

    base_threat = 50.0

    print(f"Base threat score: {base_threat:.0f}")
    print()

    for hct_value in [0.2, 0.4, 0.6, 0.8, 1.0]:
        integration = HCTIntegration()
        integration.current_hct = HCTEngine().compute(HCTMetrics(**{
            k: hct_value for k in [
                'b_entropy', 'b_fault_tolerance', 'b_mutation_rate', 'b_uptime',
                'h_replay_integrity', 'h_fork_awareness', 'h_anomaly_learning', 'h_auditability',
                'g_geo_diversity', 'g_hw_heterogeneity', 'g_dependency_concentration', 'g_physical_decentralization',
                'r_protocol_compliance', 'r_safety_constraints', 'r_non_violence', 'r_permission_boundaries',
                'e_power_efficiency', 'e_timing_accuracy', 'e_latency_consistency', 'e_signal_integrity'
            ]
        }))

        adjusted = integration.adjust_threat_severity(base_threat)

        print(f"HCT = {hct_value:.1f} → Adjusted threat = {adjusted:.0f} ({adjusted - base_threat:+.0f})")

    print()
    print("Interpretation:")
    print("  Low HCT (0.2) → Amplify threats (system is weak)")
    print("  High HCT (0.8) → Dampen threats (system is strong)")

async def demo_performance():
    """Demo 6: Performance benchmarking"""
    print_section("DEMO 6: Performance Benchmarking")

    engine = HCTEngine()

    # Create sample metrics
    metrics = HCTMetrics(
        b_entropy=0.8, b_fault_tolerance=0.7, b_mutation_rate=0.6, b_uptime=0.9,
        h_replay_integrity=0.9, h_fork_awareness=0.8, h_anomaly_learning=0.7, h_auditability=0.95,
        g_geo_diversity=0.6, g_hw_heterogeneity=0.5, g_dependency_concentration=0.5, g_physical_decentralization=0.4,
        r_protocol_compliance=0.95, r_safety_constraints=0.96, r_non_violence=0.9, r_permission_boundaries=0.93,
        e_power_efficiency=0.7, e_timing_accuracy=0.8, e_latency_consistency=0.75, e_signal_integrity=0.9
    )

    # Benchmark
    iterations = 10000
    print(f"Computing HCT {iterations:,} times...")

    start = time.time()
    for _ in range(iterations):
        engine.compute(metrics)
    elapsed = time.time() - start

    avg_time = (elapsed / iterations) * 1000 * 1000  # microseconds
    throughput = iterations / elapsed

    print()
    print(f"Total time:      {elapsed:.2f} seconds")
    print(f"Average time:    {avg_time:.2f} μs per computation")
    print(f"Throughput:      {throughput:,.0f} computations/second")
    print()
    print(f"✅ Performance target (<10ms): {'PASS' if avg_time < 10000 else 'FAIL'}")

async def demo_live_metrics():
    """Demo 7: Collect live metrics from LUXBIN (if available)"""
    print_section("DEMO 7: Live Metrics Collection")

    try:
        aggregator = HCTMetricsAggregator()
        print("Attempting to collect live metrics from LUXBIN...")
        print()

        metrics = await aggregator.collect_all(chain="optimism")

        print("✅ Successfully collected live metrics!")
        print()

        # Show sample
        print("Sample metrics:")
        print(f"  B_entropy:          {metrics.b_entropy:.4f}")
        print(f"  H_auditability:     {metrics.h_auditability:.4f}")
        print(f"  G_geo_diversity:    {metrics.g_geo_diversity:.4f}")
        print(f"  R_protocol_compl:   {metrics.r_protocol_compliance:.4f}")
        print(f"  E_signal_integrity: {metrics.e_signal_integrity:.4f}")
        print()

        # Validate
        errors = metrics.validate()
        if errors:
            print("⚠️  Validation issues:")
            for error in errors:
                print(f"  - {error}")
        else:
            print("✅ All metrics valid (in [0, 1] range)")
            print()

            # Compute HCT
            engine = HCTEngine()
            result = engine.compute(metrics)

            print(f"Live HCT Score: {result.HCT:.4f}")

    except Exception as e:
        print(f"⚠️  Could not collect live metrics: {e}")
        print("   (This is normal if LUXBIN mirror is not running)")

async def main():
    """Run all demos"""

    print()
    print("╔════════════════════════════════════════════════════════════╗")
    print("║                                                            ║")
    print("║       HCT (Harmonic Convergence Theory) Demo              ║")
    print("║       Comprehensive System Demonstration                  ║")
    print("║                                                            ║")
    print("╚════════════════════════════════════════════════════════════╝")

    await demo_basic_computation()
    await demo_edge_cases()
    await demo_coefficient_tuning()
    await demo_integration()
    await demo_threat_adjustment()
    await demo_performance()
    await demo_live_metrics()

    print()
    print("=" * 80)
    print(" Demo Complete!")
    print("=" * 80)
    print()
    print("Next steps:")
    print("  1. Run live mirror: ./START_LIVE_MIRROR.sh")
    print("  2. Collect HCT: python3 hct_integration.py")
    print("  3. View dashboard: [future implementation]")
    print()

if __name__ == "__main__":
    asyncio.run(main())
