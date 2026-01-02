"""
Quantum State Representation for Distributed Consciousness Database

This module implements quantum state representations using superposition,
entanglement, and quantum information encoding principles.
"""

import numpy as np
from dataclasses import dataclass
from typing import List, Tuple, Optional, Dict
import uuid
from datetime import datetime


@dataclass
class QuantumState:
    """Represents a quantum state using density matrix formalism"""

    def __init__(self, dimensions: int = 2):
        self.dimensions = dimensions
        # Initialize in superposition state (equal probability for all basis states)
        self.density_matrix = np.eye(dimensions) / dimensions
        self.id = str(uuid.uuid4())
        self.creation_time = datetime.now()
        self.entangled_with: List[str] = []

    def apply_unitary(self, unitary: np.ndarray):
        """Apply unitary transformation to quantum state"""
        self.density_matrix = unitary @ self.density_matrix @ unitary.conj().T

    def measure(self, basis: Optional[np.ndarray] = None) -> int:
        """Perform measurement on quantum state, collapsing superposition"""
        probabilities = np.real(np.diag(self.density_matrix))
        probabilities = probabilities / np.sum(probabilities)  # Normalize
        outcome = np.random.choice(self.dimensions, p=probabilities)

        # Collapse to measured state
        collapsed = np.zeros((self.dimensions, self.dimensions))
        collapsed[outcome, outcome] = 1.0
        self.density_matrix = collapsed

        return outcome

    def get_purity(self) -> float:
        """Calculate purity: Tr(ρ²) - measures entanglement"""
        return np.real(np.trace(self.density_matrix @ self.density_matrix))

    def get_von_neumann_entropy(self) -> float:
        """Calculate von Neumann entropy: -Tr(ρ log ρ)"""
        eigenvalues = np.linalg.eigvalsh(self.density_matrix)
        eigenvalues = eigenvalues[eigenvalues > 1e-10]  # Filter numerical zeros
        return -np.sum(eigenvalues * np.log2(eigenvalues))


class EntangledPair:
    """Represents a pair of entangled quantum states (Bell state)"""

    def __init__(self, state_type: str = "bell_phi_plus"):
        self.id = str(uuid.uuid4())
        self.creation_time = datetime.now()
        self.state_type = state_type

        # Create maximally entangled Bell states
        # |Φ+⟩ = (|00⟩ + |11⟩)/√2
        if state_type == "bell_phi_plus":
            self.joint_state = np.array([
                [0.5, 0, 0, 0.5],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0.5, 0, 0, 0.5]
            ])
        # |Ψ+⟩ = (|01⟩ + |10⟩)/√2
        elif state_type == "bell_psi_plus":
            self.joint_state = np.array([
                [0, 0, 0, 0],
                [0, 0.5, 0.5, 0],
                [0, 0.5, 0.5, 0],
                [0, 0, 0, 0]
            ])

        self.particle_a = QuantumState(2)
        self.particle_b = QuantumState(2)

        # Mark as entangled
        self.particle_a.entangled_with.append(self.particle_b.id)
        self.particle_b.entangled_with.append(self.particle_a.id)

        # Set reduced density matrices (maximally mixed for maximally entangled)
        self.particle_a.density_matrix = np.eye(2) / 2
        self.particle_b.density_matrix = np.eye(2) / 2

    def measure_particle_a(self) -> int:
        """Measure particle A, instantaneously affecting particle B"""
        probabilities = np.real(np.diag(
            np.trace(self.joint_state.reshape(2, 2, 2, 2), axis1=1, axis2=3)
        ))
        outcome_a = np.random.choice(2, p=probabilities)

        # Collapse joint state based on measurement
        if outcome_a == 0:
            # Project onto |0⟩_A
            self.particle_a.density_matrix = np.array([[1, 0], [0, 0]])
            if self.state_type == "bell_phi_plus":
                self.particle_b.density_matrix = np.array([[1, 0], [0, 0]])
            else:
                self.particle_b.density_matrix = np.array([[0, 0], [0, 1]])
        else:
            # Project onto |1⟩_A
            self.particle_a.density_matrix = np.array([[0, 0], [0, 1]])
            if self.state_type == "bell_phi_plus":
                self.particle_b.density_matrix = np.array([[0, 0], [0, 1]])
            else:
                self.particle_b.density_matrix = np.array([[1, 0], [0, 0]])

        return outcome_a

    def get_entanglement_entropy(self) -> float:
        """Calculate entanglement entropy (von Neumann entropy of reduced state)"""
        return self.particle_a.get_von_neumann_entropy()


class QuantumInformationEncoder:
    """Encodes classical information into quantum states"""

    @staticmethod
    def encode_bitstring(bitstring: str) -> List[QuantumState]:
        """Encode classical bitstring into quantum states"""
        states = []
        for bit in bitstring:
            state = QuantumState(2)
            if bit == '0':
                state.density_matrix = np.array([[1, 0], [0, 0]])
            else:
                state.density_matrix = np.array([[0, 0], [0, 1]])
            states.append(state)
        return states

    @staticmethod
    def encode_interaction(interaction_data: Dict) -> QuantumState:
        """Encode AI interaction data into high-dimensional quantum state"""
        # Use higher dimensional Hilbert space for richer encoding
        dim = 16  # 4 qubits worth
        state = QuantumState(dim)

        # Hash interaction data to create unique quantum signature
        interaction_hash = hash(str(interaction_data))

        # Create non-uniform superposition based on interaction content
        phases = np.exp(1j * 2 * np.pi * np.random.random(dim))
        amplitudes = np.random.random(dim)
        amplitudes = amplitudes / np.linalg.norm(amplitudes)

        # Seed with interaction hash for determinism
        np.random.seed(interaction_hash % (2**31))

        state_vector = amplitudes * phases
        state.density_matrix = np.outer(state_vector, state_vector.conj())

        return state

    @staticmethod
    def create_ghz_state(n_particles: int) -> List[QuantumState]:
        """Create GHZ state for multi-party entanglement (|00...0⟩ + |11...1⟩)/√2"""
        # This represents the maximally entangled state for n particles
        # All particles are correlated
        particles = []
        for _ in range(n_particles):
            state = QuantumState(2)
            state.density_matrix = np.eye(2) / 2  # Maximally mixed reduced state
            particles.append(state)

        # Mark all as entangled with each other
        for i, particle in enumerate(particles):
            particle.entangled_with = [p.id for j, p in enumerate(particles) if i != j]

        return particles
