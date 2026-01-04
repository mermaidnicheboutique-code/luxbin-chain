"use client";

import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";
import Link from "next/link";
import { useState } from "react";

export default function DevelopersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <BackgroundVideos />
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              {/* Animated rotating logo using background videos */}
              <LuxbinTokenLogoRotating size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                LUXBIN
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                ← Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/mirror" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Mirror
              </Link>
              <Link href="/api-docs" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                API Docs
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Developer Portal
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Build the future on LUXBIN - The gasless Layer 1 blockchain
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                🚀 Clone Repository
              </a>
              <Link href="/api-docs" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all">
                📚 API Reference
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🚀 Quick Start</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Connect to LUXBIN */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">1. Connect to LUXBIN</h3>
                <p className="text-gray-300 mb-4">Connect to the LUXBIN RPC endpoint:</p>
                <div className="bg-black/50 rounded-xl p-4 relative">
                  <code className="text-sm text-green-300">
                    ws://localhost:9944
                  </code>
                  <button
                    onClick={() => copyCode("ws://localhost:9944", "rpc")}
                    className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                  >
                    {copiedCode === "rpc" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Install Polkadot.js */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">2. Install SDK</h3>
                <p className="text-gray-300 mb-4">Install Polkadot.js API:</p>
                <div className="bg-black/50 rounded-xl p-4 relative">
                  <code className="text-sm text-green-300">
                    npm install @polkadot/api
                  </code>
                  <button
                    onClick={() => copyCode("npm install @polkadot/api", "npm")}
                    className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                  >
                    {copiedCode === "npm" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">💻 Code Examples</h2>

            {/* JavaScript Example */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4">Connect with JavaScript</h3>
              <div className="bg-black/80 rounded-xl p-6 overflow-x-auto relative">
                <pre className="text-sm text-green-300">
{`const { ApiPromise, WsProvider } = require('@polkadot/api');

// Connect to LUXBIN
const wsProvider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create({ provider: wsProvider });

// Get chain info
const chain = await api.rpc.system.chain();
const version = await api.rpc.system.version();

console.log(\`Connected to \${chain} v\${version}\`);

// Transfer LUXBIN tokens (ZERO GAS FEES!)
const transfer = api.tx.balances.transfer(recipientAddress, amount);
await transfer.signAndSend(senderKeyPair);`}
                </pre>
                <button
                  onClick={() => copyCode(`const { ApiPromise, WsProvider } = require('@polkadot/api');

const wsProvider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create({ provider: wsProvider });

const chain = await api.rpc.system.chain();
const version = await api.rpc.system.version();

console.log(\`Connected to \${chain} v\${version}\`);

const transfer = api.tx.balances.transfer(recipientAddress, amount);
await transfer.signAndSend(senderKeyPair);`, "js")}
                  className="absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                >
                  {copiedCode === "js" ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Rust Smart Contract */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4">Deploy Rust Smart Contract (Pallet)</h3>
              <div className="bg-black/80 rounded-xl p-6 overflow-x-auto relative">
                <pre className="text-sm text-orange-300">
{`#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::storage]
    pub type MyStorage<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        ValueStored { value: u32 },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn store_value(origin: OriginFor<T>, value: u32) -> DispatchResult {
            ensure_signed(origin)?;
            MyStorage::<T>::put(value);
            Self::deposit_event(Event::ValueStored { value });
            Ok(())
        }
    }
}`}
                </pre>
                <button
                  onClick={() => copyCode(`#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::storage]
    pub type MyStorage<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        ValueStored { value: u32 },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn store_value(origin: OriginFor<T>, value: u32) -> DispatchResult {
            ensure_signed(origin)?;
            MyStorage::<T>::put(value);
            Self::deposit_event(Event::ValueStored { value });
            Ok(())
        }
    }
}`, "rust")}
                  className="absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                >
                  {copiedCode === "rust" ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Development Tools */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🛠️ Development Tools</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Polkadot.js Apps</h3>
                <p className="text-gray-300 text-sm mb-4">Web-based block explorer and wallet interface</p>
                <a href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  Launch Explorer →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Substrate Docs</h3>
                <p className="text-gray-300 text-sm mb-4">Official Substrate framework documentation</p>
                <a href="https://docs.substrate.io/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Rust Toolchain</h3>
                <p className="text-gray-300 text-sm mb-4">Install Rust and Substrate dependencies</p>
                <a href="https://docs.substrate.io/install/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  Installation Guide →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Contract Development */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">📝 Build Your First dApp</h2>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Clone LUXBIN Chain</h3>
                    <code className="text-sm bg-black/50 p-2 rounded block text-green-300">
                      git clone https://github.com/mermaidnicheboutique-code/luxbin-chain.git
                    </code>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Build the Runtime</h3>
                    <code className="text-sm bg-black/50 p-2 rounded block text-green-300">
                      cargo build --release -p solochain-template-runtime
                    </code>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Create Your Pallet</h3>
                    <p className="text-gray-300 text-sm">Add your custom pallet in <code className="bg-black/50 px-2 py-1 rounded">substrate/frame/your-pallet/</code></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Deploy to LUXBIN</h3>
                    <p className="text-gray-300 text-sm">Run the node and interact via Polkadot.js Apps - <strong>ZERO GAS FEES!</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference CTA */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Need More Details?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Check out the complete API documentation for advanced features
              </p>
              <Link href="/api-docs" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                📚 View API Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">💬 Get Help</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold mb-2">Discord</h3>
                <p className="text-gray-400 text-sm mb-4">Join our developer community</p>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  Coming Soon
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="font-bold mb-2">Email Support</h3>
                <p className="text-gray-400 text-sm mb-4">Get technical assistance</p>
                <a href="mailto:Nicholechristie555@gmail.com" className="text-purple-400 hover:text-purple-300 text-sm">
                  Contact Us →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🐙</div>
                <h3 className="font-bold mb-2">GitHub</h3>
                <p className="text-gray-400 text-sm mb-4">Report issues and contribute</p>
                <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain/issues" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  Open Issue →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
