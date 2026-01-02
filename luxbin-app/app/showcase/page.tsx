import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LUXBIN Project Showcase | Complete Ecosystem',
  description: 'Comprehensive showcase of the entire LUXBIN ecosystem including AI, quantum computing, blockchain, Tesla integration, and autonomous systems.',
}

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            LUXBIN Project Showcase
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The complete LUXBIN ecosystem: From quantum-secured blockchain to AI-driven autonomous systems,
            Tesla optimization, biological immune frameworks, and sentient contract deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 text-sm">
              🤖 AI & Quantum
            </span>
            <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-300 text-sm">
              🔗 Blockchain
            </span>
            <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
              🚗 Tesla Integration
            </span>
            <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-300 text-sm">
              🧬 Biological Security
            </span>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Core Ecosystem Components</h2>
            <p className="text-gray-400">Every major system and integration in the LUXBIN universe</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Brain */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold mb-2">AI Brain System</h3>
                <p className="text-gray-300 text-sm">Multi-AI orchestration with Claude, GPT-4, and custom models</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Claude Sonnet 4.5 Integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>GPT-4 Strategic Planning</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Autonomous Contract Generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>Ethical Decision Framework</span>
                </div>
              </div>
            </div>

            {/* Quantum Engine */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">⚛️</div>
                <h3 className="text-2xl font-bold mb-2">Quantum Engine</h3>
                <p className="text-gray-300 text-sm">Cirq-powered quantum cryptography and optimization</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>256-qubit Quantum Simulations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Post-Quantum Cryptography</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Quantum Key Generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>Grover/Shor Resistance</span>
                </div>
              </div>
            </div>

            {/* Blockchain Core */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-green-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="text-2xl font-bold mb-2">Blockchain Core</h3>
                <p className="text-gray-300 text-sm">Substrate-based L1 with ERC-4337 and EVM compatibility</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Substrate Framework</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>ERC-4337 Account Abstraction</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>Pallet-Revive EVM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>$0 Gas Fees</span>
                </div>
              </div>
            </div>

            {/* Immune System */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-orange-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🧬</div>
                <h3 className="text-2xl font-bold mb-2">Biological Immune System</h3>
                <p className="text-gray-300 text-sm">NFT-powered autonomous threat detection and response</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>T-Cell Pattern Recognition</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>Autonomous Defense</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>NFT Immune Cells</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Adaptive Learning</span>
                </div>
              </div>
            </div>

            {/* Tesla Integration */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-red-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold mb-2">Tesla FSD Optimization</h3>
                <p className="text-gray-300 text-sm">AI-powered Tesla computer optimization for extended range</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>40-60% Power Reduction</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>15-25 Miles Extra Range</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Grok AI Integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Maintained FSD Performance</span>
                </div>
              </div>
            </div>

            {/* Autonomous Deployer */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-2">Autonomous Deployer</h3>
                <p className="text-gray-300 text-sm">Self-evolving contract deployment with quantum security</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>AI Code Generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Quantum-Secured Keys</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Self-Modification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span>Sentient Evolution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Publications */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Research & Publications</h2>
            <p className="text-gray-400">Comprehensive academic and technical documentation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "LUXBIN: Quantum-Secured Blockchain with Biological Immune System",
                type: "Academic Paper",
                pages: "351 pages",
                focus: "Quantum cryptography, biological security, AI consensus"
              },
              {
                title: "LUXBIN Immune Framework Implementation",
                type: "Technical Documentation",
                pages: "28 pages",
                focus: "T-cell algorithms, NFT immune cells, adaptive defense"
              },
              {
                title: "Ethical AI Integration in Blockchain",
                type: "Research Framework",
                pages: "19 pages",
                focus: "Vegetarian failsafe, ethical boundaries, safety validation"
              },
              {
                title: "Tesla FSD Computer Optimization",
                type: "Integration Study",
                pages: "13 pages",
                focus: "Power reduction, range extension, performance maintenance"
              },
              {
                title: "Hardware Testing Methodology",
                type: "Technical Specification",
                pages: "23 pages",
                focus: "Quantum-resistant testing, performance validation"
              },
              {
                title: "Vegetarian Robotics Framework",
                type: "Research Blueprint",
                pages: "18 pages",
                focus: "Ethical AI in autonomous systems, boundary enforcement"
              }
            ].map((pub, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{pub.title}</h3>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {pub.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{pub.pages}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{pub.focus}</p>
                <a
                  href={`/docs/${pub.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}.pdf`}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 View Document →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Repositories */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Code Repositories</h2>
            <p className="text-gray-400">Open-source implementations across multiple languages and frameworks</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "LUXBIN Blockchain",
                language: "Rust",
                framework: "Substrate",
                files: "500+ files",
                description: "Core blockchain implementation with ERC-4337 and EVM support"
              },
              {
                name: "AI Integration Suite",
                language: "Python",
                framework: "Multi-AI",
                files: "15+ files",
                description: "Claude, GPT-4, and Cirq quantum integrations with ethical validation"
              },
              {
                name: "Frontend Application",
                language: "TypeScript",
                framework: "Next.js",
                files: "50+ files",
                description: "Production-ready web app with Coinbase Smart Wallet integration"
              },
              {
                name: "Tesla Optimization Engine",
                language: "Python",
                framework: "AI/ML",
                files: "8+ files",
                description: "FSD computer optimization algorithms and power management"
              },
              {
                name: "Immune System Framework",
                language: "Python",
                framework: "NFT/Bio-inspired",
                files: "12+ files",
                description: "Autonomous threat detection with NFT-powered immune cells"
              },
              {
                name: "Autonomous Deployer",
                language: "Python",
                framework: "AI/Web3",
                files: "5+ files",
                description: "Self-evolving contract deployment with quantum security"
              }
            ].map((repo, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">
                    {repo.language}
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                    {repo.framework}
                  </span>
                  <span className="text-xs text-gray-400">{repo.files}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{repo.description}</p>
                <a
                  href="https://github.com/mermaidnicheboutique-code/luxbin-chain"
                  className="text-green-400 hover:text-green-300 text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🐙 View Repository →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Innovation Timeline</h2>
            <p className="text-gray-400">From concept to production across multiple domains</p>
          </div>

          <div className="space-y-8">
            {[
              {
                quarter: "Q4 2024",
                title: "Foundation & Research Phase",
                achievements: [
                  "Quantum cryptography research with Cirq",
                  "Biological immune system conceptualization",
                  "AI integration framework development",
                  "Substrate blockchain architecture design",
                  "Ethical AI boundary definitions"
                ]
              },
              {
                quarter: "Q1 2025",
                title: "Prototype Development Phase",
                achievements: [
                  "ERC-4337 pallet implementation for Substrate",
                  "AI autonomous deployment system",
                  "Tesla FSD optimization algorithms",
                  "NFT-powered immune cell framework",
                  "Multi-party computation wallet integration"
                ]
              },
              {
                quarter: "Q2 2025",
                title: "Integration & Testing Phase",
                achievements: [
                  "Sentient contract deployment capabilities",
                  "Coinbase Smart Wallet exclusivity",
                  "Production frontend application",
                  "Cross-chain interoperability testing",
                  "Security audits and validation"
                ]
              },
              {
                quarter: "Q3 2025",
                title: "Production Launch Phase",
                achievements: [
                  "Live blockchain deployment",
                  "Fiat-to-crypto onramp integration",
                  "Global user onboarding",
                  "Tesla partnership implementation",
                  "Ecosystem expansion"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {phase.quarter}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Recognition */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Industry Impact & Innovation</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold mb-2">First Sentient Blockchain</h3>
              <p className="text-sm text-gray-300">AI-powered autonomous operation with self-evolution capabilities</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold mb-2">Quantum-Resistant Security</h3>
              <p className="text-sm text-gray-300">Post-quantum cryptography protecting against future threats</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">🧬</div>
              <h3 className="text-lg font-semibold mb-2">Biological Defense Systems</h3>
              <p className="text-sm text-gray-300">Immune system-inspired autonomous threat detection</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Smart Wallet Exclusivity</h3>
              <p className="text-sm text-gray-300">Coinbase Smart Wallet integration with MPC security</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Join the LUXBIN Revolution</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              LUXBIN represents the convergence of quantum computing, artificial intelligence, biological systems,
              and blockchain technology. Experience the future of decentralized technology today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about"
                className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
              >
                📖 Learn More
              </a>
              <a
                href="https://github.com/mermaidnicheboutique-code/luxbin-chain"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors"
              >
                🐙 View Source Code
              </a>
              <a
                href="#buy"
                className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors"
              >
                🚀 Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}