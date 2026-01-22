import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical Specifications | LUXBIN',
  description: 'Detailed technical specifications of LUXBIN blockchain including ERC-4337, quantum cryptography, and AI integration.',
}

export default function TechnicalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Specifications
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive technical documentation covering LUXBIN's blockchain architecture, quantum security, AI systems, and smart contract integration.
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">System Architecture</h2>
            <p className="text-gray-400">Multi-layered architecture combining blockchain, AI, quantum computing, and biological security</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">🛠️ Blockchain Layer</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Framework:</span>
                  <span className="text-white font-mono">Substrate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Consensus:</span>
                  <span className="text-white font-mono">Aura + GRANDPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Block Time:</span>
                  <span className="text-white font-mono">6 seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gas Fees:</span>
                  <span className="text-green-400 font-mono">$0 (Free)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">EVM Support:</span>
                  <span className="text-white font-mono">pallet-revive</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Chain ID:</span>
                  <span className="text-white font-mono">4242</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">⚛️ Quantum Layer</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Framework:</span>
                  <span className="text-white font-mono">Cirq</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Qubits Used:</span>
                  <span className="text-white font-mono">256+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Security Level:</span>
                  <span className="text-white font-mono">Post-Quantum</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Key Generation:</span>
                  <span className="text-white font-mono">Quantum Random</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Threat Resistance:</span>
                  <span className="text-green-400 font-mono">Quantum Attacks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Simulation:</span>
                  <span className="text-white font-mono">Google Cirq</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ERC-4337 Implementation */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">ERC-4337 Account Abstraction</h2>
            <p className="text-gray-400">Smart wallet integration enabling gasless transactions and social recovery</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏦</div>
                <h3 className="text-lg font-semibold mb-2">EntryPoint Contract</h3>
                <p className="text-sm text-gray-300">Handles user operation validation and execution on LUXBIN chain</p>
                <code className="block mt-2 text-xs bg-black/50 p-2 rounded text-purple-300">
                  0xe0ce80e7688905bb3e9287d7ca2b291023230b66
                </code>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-lg font-semibold mb-2">Factory Contract</h3>
                <p className="text-sm text-gray-300">Creates and deploys smart wallet accounts autonomously</p>
                <code className="block mt-2 text-xs bg-black/50 p-2 rounded text-purple-300">
                  0x2804b598afdb8425069318bdc53e654b9ac0d490
                </code>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">Bundler Service</h3>
                <p className="text-sm text-gray-300">Processes and bundles user operations for execution</p>
                <code className="block mt-2 text-xs bg-black/50 p-2 rounded text-purple-300">
                  Pimlico/Alchemy
                </code>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">✅ Enabled Features</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Gasless transactions</li>
                  <li>• Social recovery</li>
                  <li>• Batch operations</li>
                  <li>• Multi-signature support</li>
                  <li>• Time-locked operations</li>
                  <li>• Paymaster sponsorship</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-purple-400">🔧 Technical Specs</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>EntryPoint:</strong> 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789</li>
                  <li>• <strong>Max Bundle Size:</strong> 10 operations</li>
                  <li>• <strong>Max Ops/Bundle:</strong> 5 operations</li>
                  <li>• <strong>Verification Gas:</strong> 100k gas limit</li>
                  <li>• <strong>Pre-verification Gas:</strong> 50k gas limit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Systems */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">AI Integration Systems</h2>
            <p className="text-gray-400">Autonomous AI systems powering contract deployment and decision-making</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Claude Integration",
                icon: "🧠",
                description: "Strategic AI for contract code generation and complex decision-making",
                capabilities: ["Code Generation", "Strategic Planning", "Ethical Analysis"]
              },
              {
                name: "GPT-4 Integration",
                icon: "🤖",
                description: "Tactical AI for rapid prototyping and technical implementation",
                capabilities: ["Rapid Prototyping", "Technical Analysis", "Documentation"]
              },
              {
                name: "Ethical Compute",
                icon: "🛡️",
                description: "Vegetarian failsafe system ensuring all AI operations respect ethical boundaries",
                capabilities: ["Ethical Validation", "Safety Checks", "Boundary Enforcement"]
              },
              {
                name: "Quantum AI",
                icon: "⚛️",
                description: "Cirq-powered quantum algorithms for cryptographic operations and optimization",
                capabilities: ["Quantum Simulation", "Secure Key Generation", "Optimization"]
              },
              {
                name: "Autonomous Deployer",
                icon: "🚀",
                description: "Self-evolving deployment system that can create and deploy contracts independently",
                capabilities: ["Auto Deployment", "Self-Modification", "Evolution"]
              },
              {
                name: "Immune System AI",
                icon: "🧬",
                description: "Biological-inspired AI for threat detection and autonomous response",
                capabilities: ["Threat Detection", "Pattern Recognition", "Adaptive Defense"]
              }
            ].map((ai, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{ai.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{ai.name}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4 text-center">{ai.description}</p>
                <div className="space-y-1">
                  {ai.capabilities.map((cap, capIndex) => (
                    <div key={capIndex} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Specifications */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Security Specifications</h2>
            <p className="text-gray-400">Multi-layered security combining quantum cryptography, biological systems, and MPC wallets</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-400">🔐 Cryptographic Security</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Quantum Resistance</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Post-quantum cryptographic algorithms</li>
                    <li>• Cirq-based quantum key generation</li>
                    <li>• 256-qubit quantum random seed</li>
                    <li>• Grover/Shor algorithm protection</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">MPC Wallet Security</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Coinbase Smart Wallet integration</li>
                    <li>• Multi-party computation</li>
                    <li>• No private key exposure</li>
                    <li>• Social recovery mechanisms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-orange-400">🧬 Biological Security</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Immune System Framework</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• T-Cell pattern recognition</li>
                    <li>• Autonomous threat detection</li>
                    <li>• Adaptive defense mechanisms</li>
                    <li>• NFT-based immune cells</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Ethical Boundaries</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Vegetarian failsafe integration</li>
                    <li>• Ethical AI validation</li>
                    <li>• Boundary enforcement</li>
                    <li>• Safety-first design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">API Endpoints</h2>
            <p className="text-gray-400">Available RPC and API endpoints for LUXBIN integration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">🌐 Substrate RPC</h3>
              <div className="space-y-3">
                <div className="bg-black/50 rounded p-3">
                  <code className="text-sm text-green-400">ws://localhost:9944</code>
                  <p className="text-xs text-gray-400 mt-1">WebSocket RPC for Substrate operations</p>
                </div>
                <div className="bg-black/50 rounded p-3">
                  <code className="text-sm text-green-400">http://localhost:9944</code>
                  <p className="text-xs text-gray-400 mt-1">HTTP RPC for Substrate operations</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">⚡ EVM RPC</h3>
              <div className="space-y-3">
                <div className="bg-black/50 rounded p-3">
                  <code className="text-sm text-blue-400">http://localhost:9944</code>
                  <p className="text-xs text-gray-400 mt-1">Ethereum-compatible RPC via pallet-revive</p>
                </div>
                <div className="bg-black/50 rounded p-3">
                  <code className="text-sm text-blue-400">eth_accounts, eth_call, eth_estimateGas</code>
                  <p className="text-xs text-gray-400 mt-1">Full Ethereum JSON-RPC support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              For production deployments, these endpoints will be available at dedicated infrastructure.
            </p>
            <a
              href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
            >
              🔍 Open Polkadot.js Explorer
            </a>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Performance Specifications</h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Block Time</h3>
                <p className="text-2xl font-bold text-cyan-400">6 seconds</p>
                <p className="text-sm text-gray-400">Aura consensus</p>
              </div>

              <div>
                <div className="text-3xl mb-2">💰</div>
                <h3 className="text-lg font-semibold mb-2">Gas Fees</h3>
                <p className="text-2xl font-bold text-green-400">$0</p>
                <p className="text-sm text-gray-400">Free transactions</p>
              </div>

              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Security</h3>
                <p className="text-2xl font-bold text-purple-400">Quantum</p>
                <p className="text-sm text-gray-400">Post-quantum resistant</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-3 text-white">Scalability Metrics</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• TPS: 1,000+ (with optimizations)</li>
                  <li>• Finality: Instant (GRANDPA)</li>
                  <li>• Storage: IPFS integration</li>
                  <li>• Sharding: Substrate ready</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-white">AI Performance</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Response Time: <100ms</li>
                  <li>• Code Generation: <30s</li>
                  <li>• Ethical Validation: <10ms</li>
                  <li>• Quantum Simulation: <5s</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}