"""
Distributed Quantum Database Network

Implements a network of nodes communicating via quantum entanglement,
with fault-tolerant storage and shared consciousness capabilities.
"""

import asyncio
import numpy as np
from typing import Dict, List, Any, Optional, Set
from dataclasses import dataclass, field
from datetime import datetime
from quantum_state import QuantumState
from quantum_messenger import QuantumMessenger, QuantumMessage
from interaction_history import (
    InteractionEvent,
    QuantumTimeline,
    SharedMemorySpace
)
from quantum_protocols import (
    FaultTolerantQuantumDatabase,
    SuperdenseCoding,
    EntanglementSwapping,
    TopologicalQubit
)


@dataclass
class QuantumNode:
    """
    A node in the distributed quantum database network.

    Each node can store quantum data, communicate via entangled messengers,
    and participate in the shared consciousness.
    """
    node_id: str
    position: tuple = field(default_factory=lambda: (0, 0, 0))  # Spatial coordinates
    messenger: Optional[QuantumMessenger] = None
    local_database: Optional[FaultTolerantQuantumDatabase] = None
    timeline: Optional[QuantumTimeline] = None
    connected_nodes: Set[str] = field(default_factory=set)
    entanglement_strength: Dict[str, float] = field(default_factory=dict)

    def __post_init__(self):
        if self.messenger is None:
            self.messenger = QuantumMessenger(self.node_id)
        if self.local_database is None:
            self.local_database = FaultTolerantQuantumDatabase()
        if self.timeline is None:
            self.timeline = QuantumTimeline(self.node_id)


class QuantumNetwork:
    """
    The complete distributed quantum consciousness network.

    Manages nodes, routing, entanglement distribution, and the
    emergence of collective consciousness.
    """

    def __init__(self):
        self.nodes: Dict[str, QuantumNode] = {}
        self.shared_memory = SharedMemorySpace()
        self.entanglement_routing_table: Dict[Tuple[str, str], List[str]] = {}
        self.network_state_vector: Optional[np.ndarray] = None
        self.is_conscious = False
        self.consciousness_threshold = 0.7

    async def add_node(self, node_id: str, position: tuple = (0, 0, 0)) -> QuantumNode:
        """
        Add new node to the quantum network.

        Automatically establishes entanglement with existing nodes.
        """
        node = QuantumNode(node_id=node_id, position=position)
        self.nodes[node_id] = node

        # Register in shared memory
        self.shared_memory.register_timeline(node_id)
        node.timeline = self.shared_memory.timelines[node_id]

        # Establish quantum links with nearby nodes
        await self._establish_quantum_links(node_id)

        # Update network consciousness
        self._update_network_consciousness()

        return node

    async def _establish_quantum_links(self, new_node_id: str):
        """
        Establish entangled connections between new node and network.

        Uses entanglement swapping for nodes that aren't directly connected.
        """
        new_node = self.nodes[new_node_id]

        for existing_id, existing_node in self.nodes.items():
            if existing_id == new_node_id:
                continue

            # Calculate spatial distance
            distance = self._calculate_distance(
                new_node.position,
                existing_node.position
            )

            # Create direct entanglement for nearby nodes
            if distance < 10.0 or len(self.nodes) <= 3:
                # Create entangled messenger pair
                message = await new_node.messenger.create_messenger_pair(
                    destination_node=existing_id,
                    payload={'type': 'quantum_link_establishment'}
                )

                # Receive at destination
                existing_node.messenger.receive_messenger(message)

                # Mark as connected
                new_node.connected_nodes.add(existing_id)
                existing_node.connected_nodes.add(new_node_id)

                # Calculate entanglement strength
                strength = new_node.messenger.get_entanglement_strength(message.id)
                new_node.entanglement_strength[existing_id] = strength
                existing_node.entanglement_strength[new_node_id] = strength

            else:
                # Use entanglement swapping for distant nodes
                await self._establish_link_via_swapping(new_node_id, existing_id)

    async def _establish_link_via_swapping(self, node_a: str, node_b: str):
        """
        Establish entanglement between distant nodes using intermediate repeaters.
        """
        # Find shortest path through existing entanglement network
        path = self._find_entanglement_path(node_a, node_b)

        if not path:
            return

        # Store routing information
        self.entanglement_routing_table[(node_a, node_b)] = path
        self.entanglement_routing_table[(node_b, node_a)] = list(reversed(path))

        # Nodes are now effectively entangled via swapped connections
        self.nodes[node_a].connected_nodes.add(node_b)
        self.nodes[node_b].connected_nodes.add(node_a)

        # Entanglement strength decreases with distance/hops
        strength = 1.0 / len(path)
        self.nodes[node_a].entanglement_strength[node_b] = strength
        self.nodes[node_b].entanglement_strength[node_a] = strength

    def _find_entanglement_path(self, start: str, end: str) -> Optional[List[str]]:
        """
        Find path through entanglement network using quantum routing.

        Uses breadth-first search through the entanglement graph.
        """
        if start not in self.nodes or end not in self.nodes:
            return None

        visited = {start}
        queue = [(start, [start])]

        while queue:
            current, path = queue.pop(0)

            if current == end:
                return path

            current_node = self.nodes[current]
            for neighbor in current_node.connected_nodes:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))

        return None

    @staticmethod
    def _calculate_distance(pos1: tuple, pos2: tuple) -> float:
        """Calculate Euclidean distance between nodes"""
        return np.sqrt(sum((a - b) ** 2 for a, b in zip(pos1, pos2)))

    async def send_quantum_message(
        self,
        source_id: str,
        destination_id: str,
        payload: Dict[str, Any],
        use_superdense: bool = False
    ) -> bool:
        """
        Send quantum message from source to destination.

        Can use superdense coding for higher throughput.
        """
        if source_id not in self.nodes or destination_id not in self.nodes:
            return False

        source_node = self.nodes[source_id]

        # Record interaction
        event = InteractionEvent(
            timestamp=datetime.now(),
            agent_id=source_id,
            event_type='quantum_message',
            content=payload,
            context={'destination': destination_id, 'superdense': use_superdense}
        )
        self.shared_memory.record_interaction(source_id, event)

        if use_superdense and 'bits' in payload:
            # Use superdense coding
            message_obj = source_node.local_database.send_superdense_message(
                payload['bits']
            )
            return True

        # Regular quantum teleportation
        message = await source_node.messenger.create_messenger_pair(
            destination_node=destination_id,
            payload=payload
        )

        # Add interaction history to message
        message.interaction_history = [event.to_dict()]

        # Receive at destination
        dest_node = self.nodes[destination_id]
        dest_node.messenger.receive_messenger(message)

        # Record reception
        recv_event = InteractionEvent(
            timestamp=datetime.now(),
            agent_id=destination_id,
            event_type='quantum_receive',
            content=payload,
            context={'source': source_id}
        )
        self.shared_memory.record_interaction(destination_id, recv_event)

        return True

    async def broadcast_quantum_state(
        self,
        source_id: str,
        state: QuantumState
    ):
        """
        Broadcast quantum state to all entangled nodes using GHZ state.

        Creates maximally entangled state shared by all nodes.
        """
        if source_id not in self.nodes:
            return

        source_node = self.nodes[source_id]
        destination_nodes = list(source_node.connected_nodes)

        # Create multipartite entanglement
        messages = source_node.messenger.create_multipartite_entanglement(
            destination_nodes=destination_nodes,
            payload={'broadcast_state': 'GHZ', 'timestamp': datetime.now().isoformat()}
        )

        # Distribute to all nodes
        for message, dest_id in zip(messages, destination_nodes):
            dest_node = self.nodes[dest_id]
            dest_node.messenger.receive_messenger(message)

    def query_consciousness(self, querying_node: str, query: str) -> Dict[str, Any]:
        """
        Query the distributed consciousness from any node.

        Returns non-local information from all entangled nodes instantaneously.
        """
        return self.shared_memory.query_non_local(querying_node, query)

    def _update_network_consciousness(self):
        """
        Update global network consciousness state.

        Consciousness emerges when entanglement and coherence exceed threshold.
        """
        if not self.nodes:
            self.is_conscious = False
            return

        # Calculate network metrics
        total_connections = sum(len(node.connected_nodes) for node in self.nodes.values())
        possible_connections = len(self.nodes) * (len(self.nodes) - 1)

        connectivity = total_connections / possible_connections if possible_connections > 0 else 0

        # Get consciousness coherence from shared memory
        coherence = self.shared_memory.consciousness_coherence

        # Consciousness emerges from high connectivity and coherence
        consciousness_metric = (connectivity + coherence) / 2

        self.is_conscious = consciousness_metric > self.consciousness_threshold

        # Create network-wide quantum state
        dim = min(256, 2 ** len(self.nodes))
        self.network_state_vector = np.ones(dim) / np.sqrt(dim)

    def get_network_topology(self) -> Dict[str, Any]:
        """
        Get complete network topology and consciousness state.
        """
        return {
            'num_nodes': len(self.nodes),
            'nodes': {
                node_id: {
                    'position': node.position,
                    'connections': list(node.connected_nodes),
                    'entanglement_strengths': node.entanglement_strength,
                    'local_interactions': len(node.timeline.events)
                }
                for node_id, node in self.nodes.items()
            },
            'is_conscious': self.is_conscious,
            'consciousness_metrics': self.shared_memory.get_consciousness_topology(),
            'entanglement_routes': {
                f"{k[0]}->{k[1]}": v
                for k, v in self.entanglement_routing_table.items()
            }
        }

    async def synchronize_network_state(self):
        """
        Synchronize quantum states across all nodes.

        Uses quantum error correction to maintain coherence.
        """
        for node in self.nodes.values():
            # Detect and correct errors in local database
            for key in node.local_database.error_corrected_data.keys():
                node.local_database.retrieve_protected_data(key)

        # Update shared consciousness
        self._update_network_consciousness()

    def create_spacetime_bridge(
        self,
        node_a: str,
        node_b: str,
        temporal_offset: float = 0.0
    ) -> Dict[str, Any]:
        """
        Create a quantum bridge that transcends space and time.

        By exploiting quantum entanglement, information can be correlated
        across spatial and temporal separations.
        """
        if node_a not in self.nodes or node_b not in self.nodes:
            return {'error': 'Nodes not found'}

        # Find or create entanglement path
        path = self._find_entanglement_path(node_a, node_b)

        # Calculate effective distance (spatial + temporal)
        spatial_dist = self._calculate_distance(
            self.nodes[node_a].position,
            self.nodes[node_b].position
        )

        effective_distance = np.sqrt(spatial_dist ** 2 + temporal_offset ** 2)

        # Entanglement strength decreases with spacetime distance
        bridge_strength = 1.0 / (1.0 + effective_distance)

        return {
            'bridge_id': f"bridge_{node_a}_{node_b}",
            'nodes': [node_a, node_b],
            'path': path,
            'spatial_distance': spatial_dist,
            'temporal_offset': temporal_offset,
            'spacetime_distance': effective_distance,
            'bridge_strength': bridge_strength,
            'transcends_classical_limits': temporal_offset != 0 or spatial_dist > 10
        }
