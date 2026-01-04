import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research & Publications | LUXBIN',
  description: 'Academic research, whitepapers, and technical publications on LUXBIN quantum blockchain technology.',
}

export default function ResearchPage() {
  const publications = [
    {
      title: "LUXBIN: Quantum-Secured Blockchain with Biological Immune System",
      type: "Research Paper",
      date: "December 2024",
      description: "Comprehensive academic paper on LUXBIN's quantum cryptography, biological security framework, and AI-driven consensus mechanisms.",
      file: "luxbin-paper.pdf",
      size: "351KB"
    },
    {
      title: "LUXBIN Immune Framework Documentation",
      type: "Technical Documentation",
      date: "December 2024",
      description: "Detailed implementation of LUXBIN's biological-inspired immune system for autonomous threat detection and response.",
      file: "LUXBIN_IMMUNE_FRAMEWORK.md",
      size: "28KB"
    },
    {
      title: "Ethical AI Integration in Blockchain Systems",
      type: "Research Documentation",
      date: "December 2024",
      description: "Integration of vegetarian failsafe principles into AI-driven blockchain operations and decision-making processes.",
      file: "DEPLOY_WITH_ETHICAL_AI.md",
      size: "19KB"
    },
    {
      title: "Tesla FSD Optimization Using LUXBIN Compute",
      type: "Integration Study",
      date: "December 2024",
      description: "Research on optimizing Tesla's Full Self-Driving computer using LUXBIN's AI compute framework to extend vehicle range.",
      file: "HOW_TO_GET_LUXBIN_TO_TESLA.md",
      size: "13KB"
    },
    {
      title: "Hardware Testing Plan",
      type: "Technical Specification",
      date: "December 2024",
      description: "Comprehensive hardware testing methodology for quantum-resistant blockchain implementations.",
      file: "hardware-testing-plan.md",
      size: "23KB"
    },
    {
      title: "Vegetarian Robotics Blueprint",
      type: "Research Blueprint",
      date: "December 2024",
      description: "Integration of ethical computing principles into autonomous robotic systems using LUXBIN's vegetarian failsafe.",
      file: "VEGETARIAN_ROBOTICS_BLUEPRINT.md",
      size: "18KB"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Research & Publications
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Cutting-edge research on quantum blockchain technology, AI-driven consensus, biological security systems, and ethical computing.
          </p>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {pub.type}
                  </span>
                  <span className="text-xs text-gray-400">{pub.size}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {pub.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  {pub.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{pub.date}</span>
                  <a
                    href={`/docs/${pub.file}`}
                    className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Read
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Research Focus Areas</h2>
            <p className="text-gray-400">LUXBIN's interdisciplinary research encompasses multiple cutting-edge fields</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚛️",
                title: "Quantum Cryptography",
                description: "Post-quantum cryptographic algorithms using Cirq quantum computing framework"
              },
              {
                icon: "🧬",
                title: "Biological Security",
                description: "Immune system-inspired autonomous threat detection and response mechanisms"
              },
              {
                icon: "🤖",
                title: "Ethical AI",
                description: "Vegetarian failsafe integration ensuring AI systems respect ethical boundaries"
              },
              {
                icon: "🔗",
                title: "Blockchain Innovation",
                description: "ERC-4337 account abstraction and gasless transaction frameworks"
              },
              {
                icon: "🚗",
                title: "AI Compute Optimization",
                description: "Tesla FSD optimization using LUXBIN's efficient AI compute framework"
              },
              {
                icon: "🌱",
                title: "Sustainable Computing",
                description: "Energy-efficient consensus mechanisms and hardware optimization"
              },
              {
                icon: "🔒",
                title: "MPC Wallets",
                description: "Multi-party computation wallet security with Coinbase Smart Wallet integration"
              },
              {
                icon: "🧠",
                title: "Autonomous Systems",
                description: "Self-evolving blockchain networks with AI-driven contract deployment"
              }
            ].map((area, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:bg-white/8 hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-3xl mb-3">{area.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{area.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citations */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Academic Citations</h2>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 mb-4">
              <strong>Christie, N.</strong> (2024). LUXBIN: Quantum-Secured Blockchain with Biological Immune System.
              <em>LUXBIN Research Publications</em>.
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Christie, N.</strong> (2024). Ethical AI Integration in Blockchain Systems: Vegetarian Failsafe Implementation.
              <em>LUXBIN Technical Documentation</em>.
            </p>
            <p className="text-gray-300">
              <strong>Christie, N.</strong> (2024). Autonomous Contract Deployment Using AI Compute and Quantum Security.
              <em>LUXBIN Innovation Framework</em>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}