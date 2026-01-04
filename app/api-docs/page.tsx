"use client";

import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";
import Link from "next/link";
import { useState } from "react";

export default function APIDocsPage() {
  const [activeTab, setActiveTab] = useState("overview");

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
                LUXBIN API
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
              <Link href="/developers" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Developers
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              LUXBIN API Documentation
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Complete JSON-RPC API Reference for LUXBIN Chain
            </p>
            <p className="text-gray-400">
              Build amazing dApps with our gasless blockchain infrastructure
            </p>
          </div>
        </section>

        {/* Endpoint Info */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">🔗 API Endpoints</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">WebSocket RPC</p>
                  <code className="text-green-300 font-mono bg-black/50 px-4 py-2 rounded block">
                    ws://localhost:9944
                  </code>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">HTTP RPC</p>
                  <code className="text-green-300 font-mono bg-black/50 px-4 py-2 rounded block">
                    http://localhost:9944
                  </code>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                💡 All transactions on LUXBIN are <strong className="text-green-300">completely free</strong> - zero gas fees!
              </p>
            </div>
          </div>
        </section>

        {/* API Methods */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-4 mb-8 overflow-x-auto">
              {[
                { id: "overview", name: "Overview" },
                { id: "rpc", name: "RPC Methods" },
                { id: "storage", name: "Storage" },
                { id: "extrinsics", name: "Extrinsics" },
                { id: "events", name: "Events" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
                  <p className="text-gray-300 mb-4">
                    LUXBIN uses the Substrate JSON-RPC API, which is compatible with all Polkadot ecosystem tools.
                  </p>

                  <h3 className="text-xl font-bold mb-3 mt-6">Authentication</h3>
                  <p className="text-gray-300 mb-4">No API keys required! The RPC endpoint is open for local development.</p>

                  <h3 className="text-xl font-bold mb-3 mt-6">Rate Limits</h3>
                  <p className="text-gray-300 mb-4">No rate limits for local development. For production, implement your own rate limiting.</p>

                  <h3 className="text-xl font-bold mb-3 mt-6">Response Format</h3>
                  <p className="text-gray-300 mb-2">All responses follow the JSON-RPC 2.0 specification:</p>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* RPC Methods Tab */}
            {activeTab === "rpc" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">RPC Methods</h2>

                {/* system_chain */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">system_chain</h3>
                  <p className="text-gray-300 text-sm mb-4">Get the chain name</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "system_chain"
}`}
                    </pre>
                  </div>
                  <div className="bg-black/80 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">Response:</p>
                    <pre className="text-sm text-blue-300">
{`{
  "jsonrpc": "2.0",
  "result": "LUXBIN",
  "id": 1
}`}
                    </pre>
                  </div>
                </div>

                {/* chain_getBlock */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">chain_getBlock</h3>
                  <p className="text-gray-300 text-sm mb-4">Get block details by hash</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "chain_getBlock",
  "params": ["0x...blockhash"]
}`}
                    </pre>
                  </div>
                </div>

                {/* state_getStorage */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">state_getStorage</h3>
                  <p className="text-gray-300 text-sm mb-4">Query chain storage</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "state_getStorage",
  "params": ["0x...storageKey"]
}`}
                    </pre>
                  </div>
                </div>

                {/* author_submitExtrinsic */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">author_submitExtrinsic</h3>
                  <p className="text-gray-300 text-sm mb-4">Submit a signed transaction (ZERO FEES!)</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "author_submitExtrinsic",
  "params": ["0x...signedExtrinsic"]
}`}
                    </pre>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mt-4">
                    <p className="text-green-300 text-sm">
                      💰 <strong>Zero Gas Fees:</strong> Unlike other chains, LUXBIN transactions are completely free!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Tab */}
            {activeTab === "storage" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Storage Queries</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Query Account Balance</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const account = await api.query.system.account(address);
console.log('Balance:', account.data.free.toString());`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Query Total Issuance</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const totalIssuance = await api.query.balances.totalIssuance();
console.log('Total LUXBIN:', totalIssuance.toString());`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Extrinsics Tab */}
            {activeTab === "extrinsics" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Extrinsics (Transactions)</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Transfer LUXBIN Tokens</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const transfer = api.tx.balances.transfer(
  recipientAddress,
  amount
);

// Sign and send (ZERO GAS FEES!)
await transfer.signAndSend(senderKeyPair, ({ status }) => {
  if (status.isInBlock) {
    console.log('Transaction included in block');
  }
});`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Batch Transactions</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const batch = api.tx.utility.batch([
  api.tx.balances.transfer(address1, amount1),
  api.tx.balances.transfer(address2, amount2),
]);

await batch.signAndSend(senderKeyPair);`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Subscribe to Events</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">New Blocks</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
  console.log('New block:', header.number.toNumber());
});`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">System Events</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`api.query.system.events((events) => {
  events.forEach((record) => {
    const { event } = record;
    console.log(event.section, event.method, event.data.toString());
  });
});`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Balance Transfers</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`api.query.system.events((events) => {
  events.forEach((record) => {
    const { event } = record;
    if (event.section === 'balances' && event.method === 'Transfer') {
      const [from, to, amount] = event.data;
      console.log(\`Transfer: \${amount} from \${from} to \${to}\`);
    }
  });
});`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SDK Libraries */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">📦 SDK Libraries</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">JavaScript/TypeScript</h3>
                <code className="text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300">
                  npm install @polkadot/api
                </code>
                <a href="https://polkadot.js.org/docs/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-300">Rust</h3>
                <code className="text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300">
                  subxt = "0.35"
                </code>
                <a href="https://docs.rs/subxt/latest/subxt/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-300">Python</h3>
                <code className="text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300">
                  pip install substrate-interface
                </code>
                <a href="https://github.com/polkascan/py-substrate-interface" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Our developer community is here to support you
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/developers" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  📖 Developer Portal
                </Link>
                <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain/issues" target="_blank" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all">
                  🐙 GitHub Issues
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
