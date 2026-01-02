#!/usr/bin/env python3
"""
HCT Metrics Collector for LUXBIN
Measures real system state and computes HCT components

Integrates with:
- Immune cell system (Biology)
- Blockchain mirror (History)
- Node infrastructure (Geology)
- Protocol rules (Religion)
- System telemetry (Electromagnetism)
"""

import asyncio
import json
import os
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from collections import Counter
import numpy as np

from hct_core import (
    HCTMetrics,
    compute_shannon_entropy,
    compute_gini_coefficient,
    compute_herfindahl_index,
    coefficient_of_variation
)

class BiologyMetricsCollector:
    """
    Collect Biology (B) metrics from LUXBIN immune system

    B measures system health and adaptability:
    - Entropy: Cell type diversity
    - Fault tolerance: Redundancy levels
    - Mutation rate: Adaptive evolution
    - Uptime: System availability
    """

    def __init__(self, mirror_root: str = "./luxbin_mirror"):
        self.mirror_root = Path(mirror_root)

    async def collect(self, chain: str = "optimism") -> Dict[str, float]:
        """Collect all Biology metrics"""

        # Read spawned cells
        cells = await self._read_spawned_cells(chain)

        return {
            "b_entropy": await self._compute_entropy(cells),
            "b_fault_tolerance": await self._compute_fault_tolerance(cells),
            "b_mutation_rate": await self._compute_mutation_rate(cells),
            "b_uptime": await self._compute_uptime(chain)
        }

    async def _read_spawned_cells(self, chain: str) -> List[Dict]:
        """Read all spawned immune cells"""
        cells_file = self.mirror_root / chain / "immune" / "cells_spawned.jsonl"

        if not cells_file.exists():
            return []

        cells = []
        with open(cells_file, 'r') as f:
            for line in f:
                try:
                    cells.append(json.loads(line.strip()))
                except:
                    continue

        return cells

    async def _compute_entropy(self, cells: List[Dict]) -> float:
        """
        Compute cell type diversity entropy

        High entropy = diverse cell types (healthy)
        Low entropy = monoculture (vulnerable)
        """
        if not cells:
            return 0.0

        # Count cells by type
        cell_counts = Counter(c['cell_type'] for c in cells)

        # Compute Shannon entropy
        distribution = list(cell_counts.values())
        entropy = compute_shannon_entropy(distribution)

        return entropy

    async def _compute_fault_tolerance(self, cells: List[Dict]) -> float:
        """
        Compute fault tolerance

        Based on redundancy: if we lose X% of cells, can system still function?

        Metric: 1 - (minimum_cells_needed / total_cells)
        """
        if not cells:
            return 0.0

        # Count cells by type
        cell_counts = Counter(c['cell_type'] for c in cells)
        total_cells = sum(cell_counts.values())

        # For LUXBIN, we need at least 1 of each critical type
        critical_types = ['DETECTOR', 'DEFENDER', 'REGULATORY']

        # Minimum cells needed (1 of each critical type)
        min_needed = len(critical_types)

        # Actual cells of critical types
        critical_count = sum(cell_counts.get(t, 0) for t in critical_types)

        if critical_count == 0:
            return 0.0

        # Fault tolerance = excess capacity
        # If we have 100 cells and need 3, tolerance = 1 - 3/100 = 0.97
        tolerance = 1.0 - (min_needed / total_cells)

        return max(0.0, min(1.0, tolerance))

    async def _compute_mutation_rate(self, cells: List[Dict]) -> float:
        """
        Compute mutation/adaptation rate

        Optimal: moderate mutation (0.5-0.7)
        Too low: not adapting to threats
        Too high: unstable system

        Metric: rate of new cell type appearances over time
        """
        if not cells or len(cells) < 10:
            return 0.5  # Default moderate

        # Get recent cells (last 100)
        recent = cells[-100:]

        # Count unique cell types in recent vs all
        all_types = set(c['cell_type'] for c in cells)
        recent_types = set(c['cell_type'] for c in recent)

        # Mutation rate = proportion of types appearing recently
        if not all_types:
            return 0.5

        mutation_rate = len(recent_types) / len(all_types)

        # Normalize: target 0.6 (moderate evolution)
        # Scale to [0, 1] with peak at 0.6
        if mutation_rate <= 0.6:
            normalized = mutation_rate / 0.6
        else:
            # Penalize too much mutation
            normalized = 1.0 - ((mutation_rate - 0.6) / 0.4)

        return max(0.0, min(1.0, normalized))

    async def _compute_uptime(self, chain: str) -> float:
        """
        Compute system uptime

        Based on continuous block mirroring
        Gaps in blocks = downtime
        """
        rhythm_file = self.mirror_root / chain / "logs" / "rhythm.jsonl"

        if not rhythm_file.exists():
            return 0.0

        # Read block times
        block_times = []
        with open(rhythm_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    block_times.append(data['block_time'])
                except:
                    continue

        if not block_times:
            return 0.0

        # Expected block time for chain (seconds)
        expected_time = {
            'optimism': 2,
            'ethereum': 12,
            'arbitrum': 0.25,
            'polygon': 2,
            'base': 2
        }.get(chain, 2)

        # Uptime = blocks within tolerance / total blocks
        tolerance = 2.0  # Allow 2x expected time
        on_time = sum(1 for bt in block_times if bt <= expected_time * tolerance)

        uptime = on_time / len(block_times)

        return uptime

class HistoryMetricsCollector:
    """
    Collect History (H) metrics from blockchain mirror

    H measures memory and precedent:
    - Replay integrity: Can reconstruct past
    - Fork awareness: Detect chain splits
    - Anomaly learning: Don't repeat attacks
    - Auditability: Complete provenance
    """

    def __init__(self, mirror_root: str = "./luxbin_mirror"):
        self.mirror_root = Path(mirror_root)

    async def collect(self, chain: str = "optimism") -> Dict[str, float]:
        """Collect all History metrics"""

        return {
            "h_replay_integrity": await self._compute_replay_integrity(chain),
            "h_fork_awareness": await self._compute_fork_awareness(chain),
            "h_anomaly_learning": await self._compute_anomaly_learning(chain),
            "h_auditability": await self._compute_auditability(chain)
        }

    async def _compute_replay_integrity(self, chain: str) -> float:
        """
        Compute replay integrity

        Can we reconstruct state from stored blocks?
        Metric: (valid_blocks / total_blocks)
        """
        normalized_dir = self.mirror_root / chain / "normalized"

        if not normalized_dir.exists():
            return 0.0

        # Count valid normalized blocks
        valid_blocks = 0
        total_blocks = 0

        for block_file in normalized_dir.glob("block_*.norm.json"):
            total_blocks += 1
            try:
                with open(block_file, 'r') as f:
                    data = json.load(f)
                    # Validate has required fields
                    if all(k in data for k in ['block', 'timestamp', 'tx_count']):
                        valid_blocks += 1
            except:
                continue

        if total_blocks == 0:
            return 0.0

        return valid_blocks / total_blocks

    async def _compute_fork_awareness(self, chain: str) -> float:
        """
        Compute fork awareness

        For now: placeholder (would require fork detection logic)
        Real implementation: monitor parent_hash continuity
        """
        # Read normalized blocks
        normalized_dir = self.mirror_root / chain / "normalized"

        if not normalized_dir.exists():
            return 1.0  # No forks detected = perfect

        # Check for parent_hash continuity (simple fork detection)
        blocks = []
        for block_file in sorted(normalized_dir.glob("block_*.norm.json")):
            try:
                with open(block_file, 'r') as f:
                    blocks.append(json.load(f))
            except:
                continue

        if len(blocks) < 2:
            return 1.0

        # This is a simplified check
        # Real fork detection would track parent_hash chains
        return 0.90  # Assume 90% fork awareness for now

    async def _compute_anomaly_learning(self, chain: str) -> float:
        """
        Compute anomaly learning (non-recurrence)

        Do we keep seeing the same threats?
        Metric: 1 - (repeated_threats / total_threats)
        """
        threat_file = self.mirror_root / chain / "quantum" / "threat_scores.jsonl"

        if not threat_file.exists():
            return 1.0

        # Read threats
        high_threats = []  # Threats > 50
        with open(threat_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    if data['threat_score'] >= 50:
                        high_threats.append(data['block'])
                except:
                    continue

        if len(high_threats) < 2:
            return 1.0

        # Count unique vs total (simple recurrence check)
        unique_threats = len(set(high_threats))
        total_threats = len(high_threats)

        learning = unique_threats / total_threats

        return learning

    async def _compute_auditability(self, chain: str) -> float:
        """
        Compute auditability

        Do we have complete audit trail?
        Metric: (blocks_with_full_data / total_blocks)
        """
        chain_dir = self.mirror_root / chain

        if not chain_dir.exists():
            return 0.0

        # Check each block has: raw, normalized, hash
        blocks_complete = 0
        total_blocks = 0

        raw_dir = chain_dir / "raw"
        norm_dir = chain_dir / "normalized"
        hash_dir = chain_dir / "hashed"

        if not all([raw_dir.exists(), norm_dir.exists(), hash_dir.exists()]):
            return 0.0

        # Count blocks with complete data
        for raw_file in raw_dir.glob("block_*.json"):
            total_blocks += 1

            block_num = raw_file.stem.replace("block_", "")

            norm_file = norm_dir / f"block_{block_num}.norm.json"
            raw_hash = hash_dir / f"block_{block_num}.raw.sha"
            norm_hash = hash_dir / f"block_{block_num}.norm.sha"

            if all([norm_file.exists(), raw_hash.exists(), norm_hash.exists()]):
                blocks_complete += 1

        if total_blocks == 0:
            return 0.0

        return blocks_complete / total_blocks

class GeologyMetricsCollector:
    """
    Collect Geology (G) metrics from infrastructure

    G measures infrastructure substrate:
    - Geographic diversity: Node locations
    - Hardware heterogeneity: OS/hardware mix
    - Dependency concentration: Single points of failure
    - Physical decentralization: Datacenter spread
    """

    def __init__(self, node_registry: Optional[str] = None):
        self.node_registry = node_registry or "./node_registry.json"

    async def collect(self) -> Dict[str, float]:
        """Collect all Geology metrics"""

        nodes = await self._read_node_registry()

        return {
            "g_geo_diversity": await self._compute_geo_diversity(nodes),
            "g_hw_heterogeneity": await self._compute_hw_heterogeneity(nodes),
            "g_dependency_concentration": await self._compute_dependency_concentration(nodes),
            "g_physical_decentralization": await self._compute_physical_decentralization(nodes)
        }

    async def _read_node_registry(self) -> List[Dict]:
        """Read node registry (or create default)"""

        if not os.path.exists(self.node_registry):
            # Default single-node setup
            return [{
                "node_id": "local",
                "country": "US",
                "hardware": "macOS",
                "dependencies": ["python", "cirq", "web3"],
                "datacenter": "local"
            }]

        with open(self.node_registry, 'r') as f:
            return json.load(f)

    async def _compute_geo_diversity(self, nodes: List[Dict]) -> float:
        """
        Compute geographic diversity

        Metric: 1 - gini(country_distribution)
        """
        if not nodes:
            return 0.0

        # Count nodes per country
        country_counts = Counter(n.get('country', 'unknown') for n in nodes)
        distribution = list(country_counts.values())

        # Low Gini = high diversity
        gini = compute_gini_coefficient(distribution)

        return 1.0 - gini

    async def _compute_hw_heterogeneity(self, nodes: List[Dict]) -> float:
        """
        Compute hardware heterogeneity

        Metric: shannon_entropy(hardware_types)
        """
        if not nodes:
            return 0.0

        # Count hardware types
        hw_counts = Counter(n.get('hardware', 'unknown') for n in nodes)
        distribution = list(hw_counts.values())

        return compute_shannon_entropy(distribution)

    async def _compute_dependency_concentration(self, nodes: List[Dict]) -> float:
        """
        Compute dependency concentration risk

        Metric: 1 - max_dependency_usage
        If all nodes use same library, concentration = 1 (bad)
        If diverse libraries, concentration = 0 (good)
        """
        if not nodes:
            return 0.0

        # Collect all dependencies
        all_deps = []
        for node in nodes:
            all_deps.extend(node.get('dependencies', []))

        if not all_deps:
            return 0.5

        # Find most common dependency
        dep_counts = Counter(all_deps)
        max_usage = max(dep_counts.values())
        total = len(all_deps)

        concentration = max_usage / total

        # Return 1 - concentration (so low concentration = high score)
        return 1.0 - concentration

    async def _compute_physical_decentralization(self, nodes: List[Dict]) -> float:
        """
        Compute physical decentralization

        Metric: 1 - HHI(datacenter_distribution)
        """
        if not nodes:
            return 0.0

        # Count nodes per datacenter
        dc_counts = Counter(n.get('datacenter', 'unknown') for n in nodes)
        distribution = list(dc_counts.values())

        # HHI measures concentration
        hhi = compute_herfindahl_index(distribution)

        # Return 1 - HHI (so low concentration = high score)
        return 1.0 - hhi

class ReligionMetricsCollector:
    """
    Collect Religion (R) metrics from protocol enforcement

    R measures ethics, norms, and constraints:
    - Protocol compliance: Following rules
    - Safety constraints: No invalid states
    - Non-violence: Not attacking others
    - Permission boundaries: Access control
    """

    def __init__(self, mirror_root: str = "./luxbin_mirror"):
        self.mirror_root = Path(mirror_root)

    async def collect(self, chain: str = "optimism") -> Dict[str, float]:
        """Collect all Religion metrics"""

        blocks = await self._read_normalized_blocks(chain)

        return {
            "r_protocol_compliance": await self._compute_protocol_compliance(blocks),
            "r_safety_constraints": await self._compute_safety_constraints(blocks),
            "r_non_violence": await self._compute_non_violence(chain),
            "r_permission_boundaries": await self._compute_permission_boundaries()
        }

    async def _read_normalized_blocks(self, chain: str) -> List[Dict]:
        """Read normalized blocks"""
        norm_dir = self.mirror_root / chain / "normalized"

        if not norm_dir.exists():
            return []

        blocks = []
        for block_file in norm_dir.glob("block_*.norm.json"):
            try:
                with open(block_file, 'r') as f:
                    blocks.append(json.load(f))
            except:
                continue

        return blocks

    async def _compute_protocol_compliance(self, blocks: List[Dict]) -> float:
        """
        Compute protocol compliance

        Metric: valid_blocks / total_blocks
        Valid = has all required fields, no anomalies
        """
        if not blocks:
            return 1.0

        valid = 0
        for block in blocks:
            # Check required fields
            if all(k in block for k in ['block', 'timestamp', 'tx_count', 'gas_used']):
                # Check reasonable values
                if block['tx_count'] >= 0 and block['gas_used']:
                    valid += 1

        return valid / len(blocks)

    async def _compute_safety_constraints(self, blocks: List[Dict]) -> float:
        """
        Compute safety constraint adherence

        Metric: 1 - (safety_violations / total_transactions)
        Safety violations: impossible gas, negative txs, etc.
        """
        if not blocks:
            return 1.0

        total_txs = sum(b.get('tx_count', 0) for b in blocks)

        if total_txs == 0:
            return 1.0

        # Check for impossible states
        violations = 0
        for block in blocks:
            # Negative transactions = impossible
            if block.get('tx_count', 0) < 0:
                violations += abs(block['tx_count'])

        safety = 1.0 - (violations / max(total_txs, 1))

        return max(0.0, min(1.0, safety))

    async def _compute_non_violence(self, chain: str) -> float:
        """
        Compute non-violence (non-malicious behavior)

        Metric: 1 - (malicious_actions / total_actions)
        Malicious = high threat scores
        """
        threat_file = self.mirror_root / chain / "quantum" / "threat_scores.jsonl"

        if not threat_file.exists():
            return 1.0

        threats = []
        with open(threat_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    threats.append(data['threat_score'])
                except:
                    continue

        if not threats:
            return 1.0

        # Count high threats (>= 70)
        malicious = sum(1 for t in threats if t >= 70)

        non_violence = 1.0 - (malicious / len(threats))

        return non_violence

    async def _compute_permission_boundaries(self) -> float:
        """
        Compute permission boundary integrity

        For now: placeholder (would require access control logs)
        Real implementation: track unauthorized access attempts
        """
        # TODO: Integrate with access control system
        return 0.95  # Assume 95% proper access control

class ElectromagnetismMetricsCollector:
    """
    Collect Electromagnetism (E) metrics from system telemetry

    E measures energy, time, and signal:
    - Power efficiency: Energy usage
    - Timing accuracy: Clock sync
    - Latency consistency: Response time variance
    - Signal integrity: Data corruption
    """

    def __init__(self, mirror_root: str = "./luxbin_mirror"):
        self.mirror_root = Path(mirror_root)

    async def collect(self, chain: str = "optimism") -> Dict[str, float]:
        """Collect all Electromagnetism metrics"""

        return {
            "e_power_efficiency": await self._compute_power_efficiency(),
            "e_timing_accuracy": await self._compute_timing_accuracy(chain),
            "e_latency_consistency": await self._compute_latency_consistency(chain),
            "e_signal_integrity": await self._compute_signal_integrity(chain)
        }

    async def _compute_power_efficiency(self) -> float:
        """
        Compute power efficiency

        For now: placeholder (would require power monitoring)
        Real implementation: actual_power / theoretical_max
        """
        # TODO: Integrate with system power monitoring
        return 0.75  # Assume 75% efficiency

    async def _compute_timing_accuracy(self, chain: str) -> float:
        """
        Compute timing accuracy (clock synchronization)

        Metric: 1 - (max_drift / tolerance)
        Based on block time consistency
        """
        rhythm_file = self.mirror_root / chain / "logs" / "rhythm.jsonl"

        if not rhythm_file.exists():
            return 1.0

        block_times = []
        with open(rhythm_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    block_times.append(data['block_time'])
                except:
                    continue

        if not block_times:
            return 1.0

        # Expected block time
        expected = {
            'optimism': 2,
            'ethereum': 12,
            'arbitrum': 0.25,
            'polygon': 2,
            'base': 2
        }.get(chain, 2)

        # Max drift
        max_drift = max(abs(bt - expected) for bt in block_times)

        # Tolerance: 5x expected time
        tolerance = expected * 5

        accuracy = 1.0 - (min(max_drift, tolerance) / tolerance)

        return accuracy

    async def _compute_latency_consistency(self, chain: str) -> float:
        """
        Compute latency consistency

        Metric: 1 - CV(block_times)
        Low CV = consistent, high CV = variable
        """
        rhythm_file = self.mirror_root / chain / "logs" / "rhythm.jsonl"

        if not rhythm_file.exists():
            return 1.0

        block_times = []
        with open(rhythm_file, 'r') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    block_times.append(data['block_time'])
                except:
                    continue

        if len(block_times) < 2:
            return 1.0

        # Coefficient of variation
        cv = coefficient_of_variation(block_times)

        # Normalize: CV of 0 = perfect, CV of 1 = bad
        consistency = 1.0 - min(cv, 1.0)

        return consistency

    async def _compute_signal_integrity(self, chain: str) -> float:
        """
        Compute signal integrity

        Metric: 1 - (corrupted_blocks / total_blocks)
        Corrupted = missing hashes, invalid JSON, etc.
        """
        raw_dir = self.mirror_root / chain / "raw"
        hash_dir = self.mirror_root / chain / "hashed"

        if not raw_dir.exists():
            return 1.0

        total = 0
        corrupted = 0

        for raw_file in raw_dir.glob("block_*.json"):
            total += 1

            # Check if hash exists
            block_num = raw_file.stem.replace("block_", "")
            hash_file = hash_dir / f"block_{block_num}.raw.sha"

            if not hash_file.exists():
                corrupted += 1
                continue

            # Check JSON is valid
            try:
                with open(raw_file, 'r') as f:
                    json.load(f)
            except:
                corrupted += 1

        if total == 0:
            return 1.0

        integrity = 1.0 - (corrupted / total)

        return integrity

class HCTMetricsAggregator:
    """
    Aggregate all HCT metrics from LUXBIN system

    Coordinates all collectors and produces complete HCTMetrics
    """

    def __init__(self, mirror_root: str = "./luxbin_mirror", node_registry: Optional[str] = None):
        self.biology = BiologyMetricsCollector(mirror_root)
        self.history = HistoryMetricsCollector(mirror_root)
        self.geology = GeologyMetricsCollector(node_registry)
        self.religion = ReligionMetricsCollector(mirror_root)
        self.electromagnetism = ElectromagnetismMetricsCollector(mirror_root)

    async def collect_all(self, chain: str = "optimism") -> HCTMetrics:
        """
        Collect all HCT metrics from LUXBIN system

        Returns:
            Complete HCTMetrics object ready for HCT computation
        """
        # Collect all components in parallel
        biology_task = self.biology.collect(chain)
        history_task = self.history.collect(chain)
        geology_task = self.geology.collect()
        religion_task = self.religion.collect(chain)
        electromagnetism_task = self.electromagnetism.collect(chain)

        # Await all
        biology = await biology_task
        history = await history_task
        geology = await geology_task
        religion = await religion_task
        electromagnetism = await electromagnetism_task

        # Construct HCTMetrics
        metrics = HCTMetrics(
            **biology,
            **history,
            **geology,
            **religion,
            **electromagnetism
        )

        return metrics

async def main():
    """Example usage"""
    print("Collecting HCT metrics from LUXBIN system...")
    print()

    aggregator = HCTMetricsAggregator()

    metrics = await aggregator.collect_all(chain="optimism")

    print("=" * 80)
    print("HCT METRICS COLLECTED")
    print("=" * 80)
    print()
    print("BIOLOGY (System Health)")
    print(f"  Entropy:          {metrics.b_entropy:.4f}")
    print(f"  Fault Tolerance:  {metrics.b_fault_tolerance:.4f}")
    print(f"  Mutation Rate:    {metrics.b_mutation_rate:.4f}")
    print(f"  Uptime:           {metrics.b_uptime:.4f}")
    print()
    print("HISTORY (Memory & Precedent)")
    print(f"  Replay Integrity: {metrics.h_replay_integrity:.4f}")
    print(f"  Fork Awareness:   {metrics.h_fork_awareness:.4f}")
    print(f"  Anomaly Learning: {metrics.h_anomaly_learning:.4f}")
    print(f"  Auditability:     {metrics.h_auditability:.4f}")
    print()
    print("GEOLOGY (Infrastructure)")
    print(f"  Geo Diversity:    {metrics.g_geo_diversity:.4f}")
    print(f"  HW Heterogeneity: {metrics.g_hw_heterogeneity:.4f}")
    print(f"  Dependency Conc:  {metrics.g_dependency_concentration:.4f}")
    print(f"  Physical Decentr: {metrics.g_physical_decentralization:.4f}")
    print()
    print("RELIGION (Ethics & Constraints)")
    print(f"  Protocol Compli:  {metrics.r_protocol_compliance:.4f}")
    print(f"  Safety Constr:    {metrics.r_safety_constraints:.4f}")
    print(f"  Non-Violence:     {metrics.r_non_violence:.4f}")
    print(f"  Permission Bound: {metrics.r_permission_boundaries:.4f}")
    print()
    print("ELECTROMAGNETISM (Energy & Signal)")
    print(f"  Power Efficiency: {metrics.e_power_efficiency:.4f}")
    print(f"  Timing Accuracy:  {metrics.e_timing_accuracy:.4f}")
    print(f"  Latency Consist:  {metrics.e_latency_consistency:.4f}")
    print(f"  Signal Integrity: {metrics.e_signal_integrity:.4f}")
    print()
    print("=" * 80)

    # Validate
    errors = metrics.validate()
    if errors:
        print("⚠️  VALIDATION ERRORS:")
        for error in errors:
            print(f"  - {error}")
    else:
        print("✅ All metrics valid (in [0, 1] range)")

if __name__ == "__main__":
    asyncio.run(main())
