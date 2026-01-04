import React from 'react';

export default function BrandKit() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Luxbin Brand Kit</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Colors */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 border border-white/20 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm">Primary Dark<br/>#111827</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm">Accent Purple<br/>#8B5CF6</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-500 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm">Accent Pink<br/>#EC4899</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-cyan-300 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm">Highlight Cyan<br/>#67E8F9</p>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Typography</h2>
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold mb-1">Inter Bold</p>
                <p className="text-sm text-gray-400">Headlines & Buttons</p>
              </div>
              <div>
                <p className="text-lg mb-1">Inter Regular</p>
                <p className="text-sm text-gray-400">Body Text</p>
              </div>
              <div>
                <p className="text-sm mb-1">Inter Light</p>
                <p className="text-sm text-gray-400">Captions & Details</p>
              </div>
            </div>
          </section>

          {/* Logo */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Logo</h2>
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                LUXBIN
              </div>
              <p className="text-sm text-gray-400">Primary Logo</p>
            </div>
          </section>

          {/* Videos */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Brand Videos</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold mb-1">Hero Video</p>
                <p className="text-sm text-gray-400">hero-video_ZEl7oZjy.mp4</p>
              </div>
              <div>
                <p className="font-bold mb-1">Robot Video</p>
                <p className="text-sm text-gray-400">hero-robot-video.mp4</p>
              </div>
              <div>
                <p className="font-bold mb-1">Chatbot Avatar</p>
                <p className="text-sm text-gray-400">chatbot-avatar.mp4</p>
              </div>
              <div>
                <p className="font-bold mb-1">Background Videos</p>
                <p className="text-sm text-gray-400">bg-video-1.mp4 to bg-video-6.mp4</p>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Usage Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">✅ Do's</h3>
                <ul className="text-sm space-y-1">
                  <li>Use purple/pink gradients for highlights</li>
                  <li>Maintain dark theme with white text</li>
                  <li>Include quantum/blockchain imagery</li>
                  <li>Emphasize zero-fee, temporal features</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">❌ Don'ts</h3>
                <ul className="text-sm space-y-1">
                  <li>Use bright colors that clash</li>
                  <li>Overuse animations (keep subtle)</li>
                  <li>Claim unrealistic features</li>
                  <li>Ignore accessibility (contrast, alt text)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Download Assets */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Download Assets</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/favicon.svg" download className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-500/20 transition-all text-center">
                <div className="text-2xl mb-2">🖼️</div>
                <p className="font-bold">Logo SVG</p>
                <p className="text-sm text-gray-400">favicon.svg</p>
              </a>
              <a href="/ultrax-logo.svg" download className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-500/20 transition-all text-center">
                <div className="text-2xl mb-2">🎨</div>
                <p className="font-bold">Ultrax Logo</p>
                <p className="text-sm text-gray-400">ultrax-logo.svg</p>
              </a>
              <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-500/20 transition-all text-center">
                <div className="text-2xl mb-2">📁</div>
                <p className="font-bold">All Assets</p>
                <p className="text-sm text-gray-400">GitHub Repo</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}