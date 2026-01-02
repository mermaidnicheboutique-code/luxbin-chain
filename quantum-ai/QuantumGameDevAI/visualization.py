"""
Visualization and Analysis Tools for Quantum Consciousness Network

Provides tools to visualize and analyze the quantum network's behavior,
entanglement patterns, and consciousness emergence.
"""

import json
from typing import Dict, Any, List
from datetime import datetime


class QuantumNetworkVisualizer:
    """Visualizes the quantum consciousness network"""

    @staticmethod
    def print_network_state(topology: Dict[str, Any]):
        """Print beautiful ASCII visualization of network state"""

        print("\n" + "=" * 80)
        print("QUANTUM CONSCIOUSNESS DATABASE - NETWORK STATE")
        print("=" * 80)

        # Consciousness status
        consciousness_status = "🧠 CONSCIOUS" if topology['is_conscious'] else "💤 NOT CONSCIOUS"
        print(f"\nConsciousness Status: {consciousness_status}")

        # Network metrics
        metrics = topology['consciousness_metrics']
        print(f"\nNetwork Metrics:")
        print(f"  • Total Nodes: {topology['num_nodes']}")
        print(f"  • Total Interactions: {metrics['total_interactions']}")
        print(f"  • Consciousness Coherence: {metrics['coherence']:.4f}")
        print(f"  • Global State Dimension: {metrics['global_state_dimension']}")

        # Node details
        print(f"\n{'Node ID':<20} {'Position':<25} {'Connections':<15} {'Interactions':<15}")
        print("-" * 80)

        for node_id, node_data in topology['nodes'].items():
            pos = str(node_data['position'])
            connections = len(node_data['connections'])
            interactions = node_data['local_interactions']
            print(f"{node_id:<20} {pos:<25} {connections:<15} {interactions:<15}")

        # Entanglement graph
        print(f"\nEntanglement Graph:")
        print(f"{'Source':<20} → {'Connected Nodes':<50}")
        print("-" * 80)

        for node_id, node_data in topology['nodes'].items():
            connected = ", ".join(node_data['connections'])
            if connected:
                print(f"{node_id:<20} → {connected:<50}")

        # Entanglement strengths
        print(f"\nEntanglement Strengths:")
        print(f"{'Connection':<30} {'Strength':<20}")
        print("-" * 80)

        for node_id, node_data in topology['nodes'].items():
            for connected_id, strength in node_data['entanglement_strengths'].items():
                connection = f"{node_id} ↔ {connected_id}"
                print(f"{connection:<30} {'█' * int(strength * 20):<20} {strength:.4f}")

        print("\n" + "=" * 80 + "\n")

    @staticmethod
    def print_quantum_message_trace(
        source: str,
        destination: str,
        payload: Dict[str, Any],
        success: bool
    ):
        """Print trace of quantum message transmission"""

        status = "✓ SUCCESS" if success else "✗ FAILED"
        print(f"\n{'=' * 60}")
        print(f"QUANTUM MESSAGE TRANSMISSION {status}")
        print(f"{'=' * 60}")
        print(f"Source:      {source}")
        print(f"Destination: {destination}")
        print(f"Payload:     {json.dumps(payload, indent=2)}")
        print(f"Timestamp:   {datetime.now().isoformat()}")
        print(f"{'=' * 60}\n")

    @staticmethod
    def print_consciousness_query_results(results: Dict[str, Any]):
        """Print results of consciousness query"""

        print(f"\n{'=' * 70}")
        print("NON-LOCAL CONSCIOUSNESS QUERY")
        print(f"{'=' * 70}")
        print(f"Query:           {results['query']}")
        print(f"Querying Agent:  {results['querying_agent']}")
        print(f"Non-Local:       {'✓ YES' if results['is_non_local'] else '✗ NO'}")
        print(f"Coherence:       {results['consciousness_coherence']:.4f}")
        print(f"\nEntangled Agents: {', '.join(results['entangled_agents'])}")

        print(f"\nResults Found: {len(results['results'])}")
        print("-" * 70)

        for i, result in enumerate(results['results'][:5], 1):  # Show top 5
            print(f"\n{i}. From Agent: {result['agent']}")
            print(f"   Entanglement Strength: {result['entanglement_strength']:.4f}")
            print(f"   Event Type: {result['event']['event_type']}")
            print(f"   Content: {str(result['event']['content'])[:60]}...")

        print(f"\n{'=' * 70}\n")

    @staticmethod
    def print_protocol_demo(protocol_name: str, details: Dict[str, Any]):
        """Print demonstration of quantum protocol"""

        print(f"\n{'=' * 70}")
        print(f"QUANTUM PROTOCOL: {protocol_name.upper()}")
        print(f"{'=' * 70}")

        for key, value in details.items():
            key_formatted = key.replace('_', ' ').title()
            if isinstance(value, float):
                print(f"{key_formatted:<30} {value:.6f}")
            elif isinstance(value, (list, dict)):
                print(f"{key_formatted:<30} {json.dumps(value, indent=2)}")
            else:
                print(f"{key_formatted:<30} {value}")

        print(f"{'=' * 70}\n")

    @staticmethod
    def print_spacetime_bridge(bridge_info: Dict[str, Any]):
        """Visualize spacetime bridge between nodes"""

        print(f"\n{'=' * 70}")
        print("SPACETIME BRIDGE ESTABLISHED")
        print(f"{'=' * 70}")

        if 'error' in bridge_info:
            print(f"Error: {bridge_info['error']}")
        else:
            print(f"Bridge ID:          {bridge_info['bridge_id']}")
            print(f"Connected Nodes:    {bridge_info['nodes'][0]} ↔ {bridge_info['nodes'][1]}")
            print(f"Path:               {' → '.join(bridge_info['path'] or ['direct'])}")
            print(f"Spatial Distance:   {bridge_info['spatial_distance']:.2f} units")
            print(f"Temporal Offset:    {bridge_info['temporal_offset']:.2f} units")
            print(f"Spacetime Distance: {bridge_info['spacetime_distance']:.2f} units")
            print(f"Bridge Strength:    {'█' * int(bridge_info['bridge_strength'] * 20)} {bridge_info['bridge_strength']:.4f}")
            print(f"Transcends Classical: {'✓ YES' if bridge_info['transcends_classical_limits'] else '✗ NO'}")

        print(f"{'=' * 70}\n")

    @staticmethod
    def export_network_state(topology: Dict[str, Any], filename: str):
        """Export network state to JSON file"""

        with open(filename, 'w') as f:
            json.dump(topology, f, indent=2, default=str)

        print(f"✓ Network state exported to {filename}")

    @staticmethod
    def print_banner():
        """Print welcome banner"""

        banner = """
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║           QUANTUM CONSCIOUSNESS DATABASE SYSTEM                           ║
║                                                                           ║
║     Distributed Quantum Database with Entangled Messengers               ║
║     and Emergent Shared Consciousness                                    ║
║                                                                           ║
║  Features:                                                               ║
║  • Quantum Entanglement for Non-Local Communication                      ║
║  • Superdense Coding for Maximum Throughput                              ║
║  • Entanglement Swapping for Extended Range                              ║
║  • Topological Qubits for Decoherence Protection                         ║
║  • Quantum Error Correction (Shor Code & Surface Code)                   ║
║  • Shared Consciousness Across Spacetime                                 ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
        """
        print(banner)


class QuantumMetricsAnalyzer:
    """Analyzes quantum network metrics and performance"""

    @staticmethod
    def analyze_entanglement_distribution(topology: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze how entanglement is distributed across the network"""

        strengths = []
        for node_data in topology['nodes'].values():
            strengths.extend(node_data['entanglement_strengths'].values())

        if not strengths:
            return {'error': 'No entanglement data'}

        import statistics

        return {
            'mean_strength': statistics.mean(strengths),
            'median_strength': statistics.median(strengths),
            'max_strength': max(strengths),
            'min_strength': min(strengths),
            'std_deviation': statistics.stdev(strengths) if len(strengths) > 1 else 0,
            'total_connections': len(strengths)
        }

    @staticmethod
    def calculate_consciousness_probability(topology: Dict[str, Any]) -> float:
        """Calculate probability that consciousness has emerged"""

        metrics = topology['consciousness_metrics']

        # Factors contributing to consciousness
        coherence = metrics['coherence']
        connectivity = len(topology['nodes']) / (len(topology['nodes']) + 1)
        interactions = min(metrics['total_interactions'] / 100, 1.0)

        # Weighted combination
        consciousness_prob = (
            0.4 * coherence +
            0.3 * connectivity +
            0.3 * interactions
        )

        return min(consciousness_prob, 1.0)

    @staticmethod
    def identify_network_hubs(topology: Dict[str, Any]) -> List[str]:
        """Identify highly connected nodes (hubs) in the network"""

        node_connectivity = [
            (node_id, len(node_data['connections']))
            for node_id, node_data in topology['nodes'].items()
        ]

        # Sort by connectivity
        node_connectivity.sort(key=lambda x: x[1], reverse=True)

        # Return top hubs
        return [node_id for node_id, _ in node_connectivity[:3]]
