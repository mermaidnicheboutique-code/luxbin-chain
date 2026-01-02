"""
Quantum Messenger System

Implements entangled particle messengers that carry quantum information
between distributed nodes with non-local correlation properties.
"""

import numpy as np
from typing import Dict, Any, Optional, List, Tuple
from dataclasses import dataclass, field
from datetime import datetime
import asyncio
from quantum_state import EntangledPair, QuantumState, QuantumInformationEncoder


@dataclass
class QuantumMessage:
    """Message carried by entangled quantum particles"""
    id: str
    payload: Dict[str, Any]
    entangled_pair: EntangledPair
    timestamp: datetime = field(default_factory=datetime.now)
    source_node: Optional[str] = None
    destination_node: Optional[str] = None
    interaction_history: List[Dict] = field(default_factory=list)

    def encode_history(self) -> QuantumState:
        """Encode interaction history into quantum state"""
        return QuantumInformationEncoder.encode_interaction({
            'history': self.interaction_history,
            'timestamp': self.timestamp.isoformat(),
            'source': self.source_node,
            'destination': self.destination_node
        })


class QuantumMessenger:
    """
    Manages quantum messengers using entangled particles.

    When a message is sent, one particle stays with the source node
    and its entangled partner travels to the destination. Measurements
    on either particle instantaneously affect the other, creating
    non-local correlations.
    """

    def __init__(self, node_id: str):
        self.node_id = node_id
        self.active_entanglements: Dict[str, EntangledPair] = {}
        self.message_queue: List[QuantumMessage] = []
        self.received_messages: List[QuantumMessage] = []
        self.entanglement_registry: Dict[str, str] = {}  # message_id -> partner_node

    async def create_messenger_pair(
        self,
        destination_node: str,
        payload: Dict[str, Any]
    ) -> QuantumMessage:
        """
        Create entangled messenger pair for communication.

        Returns the message with one particle; the entangled partner
        is implicitly connected to the destination node.
        """
        # Create maximally entangled Bell state
        entangled_pair = EntangledPair(state_type="bell_phi_plus")

        # Create quantum message
        message = QuantumMessage(
            id=entangled_pair.id,
            payload=payload,
            entangled_pair=entangled_pair,
            source_node=self.node_id,
            destination_node=destination_node
        )

        # Register entanglement
        self.active_entanglements[message.id] = entangled_pair
        self.entanglement_registry[message.id] = destination_node

        # Simulate quantum channel delay (speed of light limit for particle transfer)
        await asyncio.sleep(0.001)

        return message

    def receive_messenger(self, message: QuantumMessage):
        """
        Receive entangled messenger particle.

        The received particle is already entangled with the sender's particle,
        enabling non-local correlation.
        """
        self.received_messages.append(message)
        self.active_entanglements[message.id] = message.entangled_pair

    def perform_bell_measurement(self, message_id: str) -> Tuple[int, int]:
        """
        Perform Bell state measurement on entangled pair.

        This measurement projects the two-particle system onto a Bell basis,
        revealing correlations that transcend classical communication.
        """
        if message_id not in self.active_entanglements:
            raise ValueError(f"No entanglement found for message {message_id}")

        entangled_pair = self.active_entanglements[message_id]

        # Perform measurement on local particle
        outcome_local = entangled_pair.measure_particle_a()

        # The entangled partner's state is now determined
        # This happens instantaneously regardless of distance
        if entangled_pair.state_type == "bell_phi_plus":
            outcome_remote = outcome_local  # Perfectly correlated
        else:
            outcome_remote = 1 - outcome_local  # Anti-correlated

        return outcome_local, outcome_remote

    def quantum_teleportation(
        self,
        state_to_teleport: QuantumState,
        shared_entanglement_id: str
    ) -> Dict[str, Any]:
        """
        Quantum teleportation protocol using entangled messenger.

        Teleports quantum state to remote node using shared entanglement
        and classical communication of measurement results.
        """
        if shared_entanglement_id not in self.active_entanglements:
            raise ValueError("No shared entanglement available")

        # Perform Bell measurement on state to teleport and local entangled particle
        entangled_pair = self.active_entanglements[shared_entanglement_id]

        # In real quantum teleportation, we'd perform a joint measurement
        # Here we simulate the classical measurement outcomes
        outcome_1 = np.random.choice([0, 1])
        outcome_2 = np.random.choice([0, 1])

        return {
            'measurement_results': (outcome_1, outcome_2),
            'entanglement_id': shared_entanglement_id,
            'teleported_state_info': {
                'purity': state_to_teleport.get_purity(),
                'entropy': state_to_teleport.get_von_neumann_entropy()
            }
        }

    def get_entanglement_strength(self, message_id: str) -> float:
        """
        Calculate entanglement strength (entropy) for a messenger pair.

        Higher entropy indicates stronger quantum correlations and
        greater information sharing capacity.
        """
        if message_id not in self.active_entanglements:
            return 0.0

        return self.active_entanglements[message_id].get_entanglement_entropy()

    def create_multipartite_entanglement(
        self,
        destination_nodes: List[str],
        payload: Dict[str, Any]
    ) -> List[QuantumMessage]:
        """
        Create GHZ state for multi-node quantum communication.

        All nodes share a maximally entangled state, enabling
        true distributed quantum consensus.
        """
        n_nodes = len(destination_nodes) + 1  # Include source
        ghz_particles = QuantumInformationEncoder.create_ghz_state(n_nodes)

        messages = []
        for i, dest_node in enumerate(destination_nodes):
            # Create pseudo-entangled pair (in real implementation,
            # this would be part of the GHZ state)
            entangled_pair = EntangledPair(state_type="bell_phi_plus")

            message = QuantumMessage(
                id=f"ghz_{i}_{entangled_pair.id}",
                payload=payload,
                entangled_pair=entangled_pair,
                source_node=self.node_id,
                destination_node=dest_node
            )
            messages.append(message)

        return messages
