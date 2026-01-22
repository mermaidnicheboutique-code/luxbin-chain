import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About LUXBIN | Nichole Christie',
  description: 'Meet Nichole Christie, the creator of LUXBIN - pioneering quantum blockchain technology with biological security and AI-driven consensus.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About LUXBIN
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pioneering the future of blockchain through quantum cryptography, biological security, and autonomous AI systems.
            </p>
          </div>

          {/* Creator Profile */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold">
                NC
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Nichole Christie</h2>
                <p className="text-purple-400 mb-4">Blockchain Innovator & AI Researcher</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Creator of LUXBIN, pioneering quantum-secured blockchain technology with biological immune systems and ethical AI integration.
                  Combining cutting-edge research in quantum computing, artificial intelligence, and blockchain consensus mechanisms.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">Quantum Cryptography</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full">AI Research</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">Blockchain Innovation</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full">Ethical Computing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Vision */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Project Vision</h2>
            <p className="text-gray-400">Building the next generation of blockchain technology</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">🌟 Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To create a blockchain ecosystem that combines quantum-resistant security, biological immune systems,
                ethical AI integration, and autonomous operation - making blockchain technology safer, more efficient,
                and truly intelligent.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">🎯 Goals</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Quantum Security:</strong> Future-proof cryptography against quantum threats</li>
                <li>• <strong>Biological Defense:</strong> Autonomous threat detection and response</li>
                <li>• <strong>Ethical AI:</strong> Vegetarian failsafe integration in all systems</li>
                <li>• <strong>Smart Wallets:</strong> Coinbase Smart Wallet exclusivity</li>
                <li>• <strong>Autonomous Operation:</strong> Self-evolving blockchain networks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-gray-400">Interdisciplinary approach combining multiple cutting-edge technologies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                category: "Blockchain Infrastructure",
                technologies: [
                  "Substrate Framework",
                  "ERC-4337 Account Abstraction",
                  "Pallet-revive (EVM on Substrate)",
                  "Aura + GRANDPA Consensus"
                ]
              },
              {
                category: "AI & Quantum Computing",
                technologies: [
                  "Cirq Quantum Framework",
                  "Claude AI Integration",
                  "Ethical Compute Validation",
                  "Autonomous Contract Generation"
                ]
              },
              {
                category: "Security & Biology",
                technologies: [
                  "Biological Immune System",
                  "Quantum-Resistant Crypto",
                  "MPC Wallet Integration",
                  "Vegetarian Failsafe"
                ]
              }
            ].map((stack, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-purple-400">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className="flex items-center gap-2 text-gray-300">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Project Timeline</h2>
            <p className="text-gray-400">From concept to production-ready blockchain</p>
          </div>

          <div className="space-y-8">
            {[
              {
                date: "Q4 2024",
                title: "Foundation & Research",
                description: "Core research in quantum cryptography, biological security systems, and ethical AI integration"
              },
              {
                date: "Q1 2025",
                title: "Prototype Development",
                description: "Substrate blockchain implementation with ERC-4337 pallet and Cirq quantum integration"
              },
              {
                date: "Q2 2025",
                title: "AI Autonomous Systems",
                description: "Implementation of sentient deployment systems and autonomous contract generation"
              },
              {
                date: "Q3 2025",
                title: "Production Launch",
                description: "Full production deployment with Coinbase Smart Wallet integration and fiat onramp"
              },
              {
                date: "Q4 2025+",
                title: "Ecosystem Expansion",
                description: "Tesla integration, expanded AI capabilities, and global adoption"
              }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                      {milestone.date}
                    </span>
                  </div>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 mb-6">
              Interested in collaborating on quantum blockchain research, AI integration, or exploring partnership opportunities?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:Nicholechristie555@gmail.com"
                className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
              >
                📧 Email: Nicholechristie555@gmail.com
              </a>
              <a
                href="https://github.com/mermaidnicheboutique-code/luxbin-chain"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors"
              >
                🐙 GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}