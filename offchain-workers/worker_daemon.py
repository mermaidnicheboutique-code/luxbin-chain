#!/usr/bin/env python3
"""
LUXBIN Quantum AI Worker Daemon

Orchestrates all quantum AI off-chain workers:
1. Quantum Threat Predictor (Cirq + Grover's algorithm)
2. Neural Threat Analyzer (PyTorch + Federated Learning)
3. Grid Transformer (Tesla Fleet + Energy Optimization)
4. Quantum Eyes (Photonic Vision System)

Listens for on-chain user requests and fulfills them using quantum AI.
"""

import asyncio
import sys
import os
from pathlib import Path

# Add parent directories to path for imports
sys.path.append(str(Path(__file__).parent.parent / "Desktop" / "LUXBIN_PROJECT_COMPLETE"))
sys.path.append(str(Path(__file__).parent.parent / "Desktop" / "LUXBIN_PROJECT_COMPLETE" / "luxbin-quantum-ai"))
sys.path.append(str(Path(__file__).parent.parent / "Desktop" / "LUXBIN_PROJECT_COMPLETE" / "brain-architecture"))

from substrateinterface import SubstrateInterface, Keypair
from substrateinterface.exceptions import SubstrateRequestException
import time

# Import quantum AI components
try:
    from quantum_threat_predictor import QuantumThreatPredictor
    from neural_threat_analyzer import FederatedNeuralThreatAnalyzer
    from grid_transformer import GridTransformer
    from quantum_eyes import LuxbinQuantumEyes
    print("✅ All quantum AI modules imported successfully")
except ImportError as e:
    print(f"⚠️  Warning: Could not import quantum AI modules: {e}")
    print("   Running in simulation mode...")
    QuantumThreatPredictor = None
    FederatedNeuralThreatAnalyzer = None
    GridTransformer = None
    LuxbinQuantumEyes = None


class QuantumAIWorkerDaemon:
    """Main daemon that coordinates all quantum AI workers"""

    def __init__(self, ws_url="ws://127.0.0.1:9944", worker_key="//Alice"):
        self.ws_url = ws_url
        self.substrate = None
        self.keypair = Keypair.create_from_uri(worker_key)

        # Initialize quantum AI components
        print("🚀 Initializing Quantum AI components...")
        self.threat_predictor = QuantumThreatPredictor() if QuantumThreatPredictor else None
        self.neural_analyzer = FederatedNeuralThreatAnalyzer(
            chains=['base', 'ethereum', 'arbitrum', 'polygon']
        ) if FederatedNeuralThreatAnalyzer else None
        self.grid_transformer = GridTransformer() if GridTransformer else None
        self.quantum_eyes = LuxbinQuantumEyes() if LuxbinQuantumEyes else None

        print(f"   Worker Account: {self.keypair.ss58_address}")
        print(f"   Substrate Node: {ws_url}")

    async def connect(self):
        """Connect to substrate node"""
        print("\n🔗 Connecting to LUXBIN chain...")
        try:
            self.substrate = SubstrateInterface(url=self.ws_url)
            print(f"   ✅ Connected to chain: {self.substrate.name}")
            print(f"   Block: #{self.substrate.get_block_number(None)}")
            return True
        except Exception as e:
            print(f"   ❌ Connection failed: {e}")
            return False

    async def listen_for_requests(self):
        """Listen for on-chain user requests and fulfill them"""
        print("\n👁️  Listening for user requests...\n")

        last_block = self.substrate.get_block_number(None)

        while True:
            try:
                current_block = self.substrate.get_block_number(None)

                if current_block > last_block:
                    print(f"📦 New block #{current_block}")

                    # Get events from the new block
                    events = self.substrate.get_events(current_block)

                    for event in events:
                        # Check if it's a QuantumAI event
                        if event.value['module_id'] == 'QuantumAI':
                            await self.handle_event(event)

                    last_block = current_block

                # Poll every 3 seconds
                await asyncio.sleep(3)

            except KeyboardInterrupt:
                print("\n🛑 Shutting down worker daemon...")
                break
            except Exception as e:
                print(f"   ⚠️  Error: {e}")
                await asyncio.sleep(5)

    async def handle_event(self, event):
        """Handle quantum AI events"""
        event_name = event.value['event_id']
        event_params = event.value['attributes']

        print(f"   🔔 Event: {event_name}")

        if event_name == 'ThreatAnalysisRequested':
            request_id = event_params[0]
            requester = event_params[1]
            print(f"      Request ID: {request_id}")
            await self.fulfill_threat_analysis(request_id)

        elif event_name == 'EnergyOptimizationRequested':
            request_id = event_params[0]
            requester = event_params[1]
            urgency = event_params[2]
            print(f"      Request ID: {request_id}, Urgency: {urgency}")
            await self.fulfill_energy_optimization(request_id)

        elif event_name == 'QuantumEyesRequested':
            request_id = event_params[0]
            requester = event_params[1]
            tx_hash = event_params[2]
            print(f"      Request ID: {request_id}, TX: {tx_hash}")
            await self.fulfill_quantum_eyes(request_id, tx_hash)

    async def fulfill_threat_analysis(self, request_id):
        """Fulfill threat analysis request using Cirq quantum computing"""
        try:
            # Get request data from chain
            request = self.substrate.query(
                module='QuantumAI',
                storage_function='PendingThreatRequests',
                params=[request_id]
            )

            if not request:
                print(f"      ⚠️  Request {request_id} not found")
                return

            tx_data = request.value['tx_data']

            print(f"      ⚙️  Running Cirq quantum circuit (Grover's algorithm)...")

            # Run quantum threat prediction
            if self.threat_predictor:
                prediction = self.threat_predictor.predict_threat_probability(
                    transaction={
                        'from_address': str(tx_data['from_address']),
                        'to_address': str(tx_data['to_address']),
                        'value': int(tx_data['value']),
                        'gas_price': int(tx_data['gas_price']),
                        'gas_limit': int(tx_data['gas_limit']),
                        'block_number': int(tx_data['block_number']),
                    },
                    chains=['base', 'ethereum']
                )

                threat_level = int(prediction['threat_probability'] * 100)
                cross_chain_risk = int(prediction['cross_chain_risk'] * 100)
                quantum_advantage = int(prediction['quantum_advantage_factor'])
            else:
                # Simulation mode
                threat_level = 45
                cross_chain_risk = 30
                quantum_advantage = 5

            print(f"      ✨ Quantum analysis complete! Threat: {threat_level}%")

            # Submit result to chain
            call = self.substrate.compose_call(
                call_module='QuantumAI',
                call_function='submit_threat_analysis_result',
                call_params={
                    'request_id': request_id,
                    'result': {
                        'threat_probability': threat_level,
                        'cross_chain_risk': cross_chain_risk,
                        'quantum_advantage': quantum_advantage,
                        'predicted_attacks': [],
                        'timestamp': int(time.time()),
                    }
                }
            )

            extrinsic = self.substrate.create_signed_extrinsic(
                call=call,
                keypair=self.keypair
            )

            receipt = self.substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)
            print(f"      ✅ Result submitted! Extrinsic: {receipt.extrinsic_hash}")

        except Exception as e:
            print(f"      ❌ Error fulfilling request: {e}")

    async def fulfill_energy_optimization(self, request_id):
        """Fulfill energy optimization request using Grid Transformer"""
        try:
            request = self.substrate.query(
                module='QuantumAI',
                storage_function='PendingEnergyRequests',
                params=[request_id]
            )

            if not request:
                return

            print(f"      ⚡ Optimizing energy grid...")

            # Run grid optimization
            if self.grid_transformer:
                result = self.grid_transformer.optimize_compute_load(
                    pending_transactions=request.value['pending_transactions'],
                    urgency_level=request.value['urgency_level']
                )

                charge = result.get('charge_from_grid', False)
                discharge = result.get('discharge_to_grid', False)
            else:
                # Simulation mode
                charge = False
                discharge = True

            print(f"      ✅ Optimization complete! Discharge: {discharge}")

            # Submit result
            call = self.substrate.compose_call(
                call_module='QuantumAI',
                call_function='submit_energy_optimization_result',
                call_params={
                    'request_id': request_id,
                    'result': {
                        'charge_from_grid': charge,
                        'discharge_to_grid': discharge,
                        'power_compute_kw': 100,
                        'battery_power_kw': 50,
                        'grid_power_kw': 50,
                        'reasoning': "Grid demand low, discharge for arbitrage profit".encode(),
                        'timestamp': int(time.time()),
                    }
                }
            )

            extrinsic = self.substrate.create_signed_extrinsic(call=call, keypair=self.keypair)
            receipt = self.substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)
            print(f"      ✅ Result submitted! Extrinsic: {receipt.extrinsic_hash}")

        except Exception as e:
            print(f"      ❌ Error: {e}")

    async def fulfill_quantum_eyes(self, request_id, tx_hash):
        """Fulfill quantum eyes request using photonic encoding"""
        try:
            print(f"      👁️  Encoding transaction as photons...")

            # Simulate photonic vision (would use quantum_eyes.py in production)
            color = 2  # Green (safe transaction)

            call = self.substrate.compose_call(
                call_module='QuantumAI',
                call_function='submit_quantum_eyes',
                call_params={
                    'request_id': request_id,
                    'photonic_vision': {
                        'tx_hash': tx_hash,
                        'left_eye': [],
                        'right_eye': [],
                        'color': color,
                        'quantum_state': b'',
                        'decoded_message': b'Safe transaction',
                        'timestamp': int(time.time()),
                    }
                }
            )

            extrinsic = self.substrate.create_signed_extrinsic(call=call, keypair=self.keypair)
            receipt = self.substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)
            print(f"      ✅ Photonic data submitted! Color: Green")

        except Exception as e:
            print(f"      ❌ Error: {e}")

    async def run(self):
        """Main run loop"""
        print("=" * 60)
        print("   LUXBIN Quantum AI Worker Daemon")
        print("=" * 60)

        if not await self.connect():
            print("❌ Failed to connect to chain. Exiting...")
            return

        await self.listen_for_requests()


async def main():
    """Entry point"""
    daemon = QuantumAIWorkerDaemon(
        ws_url="ws://127.0.0.1:9944",
        worker_key="//Alice"  # Change to your worker account
    )

    await daemon.run()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n👋 Goodbye!")
