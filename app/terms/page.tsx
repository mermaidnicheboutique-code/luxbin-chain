import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Luxbin Terms of Service</h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Luxbin ("the App"), a quantum-secured blockchain platform on Coinbase Base,
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p>
              Luxbin provides zero-fee blockchain transactions using temporal cryptography and quantum-resistant
              security. The App includes token management, staking, and DeFi features on the Base network.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Provide accurate information when using the App.</li>
              <li>Use the App legally and ethically.</li>
              <li>Secure your wallet, private keys, and access credentials.</li>
              <li>Not engage in fraudulent, harmful, or prohibited activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Disclaimers</h2>
            <p>
              The App is provided "as is" without warranties. Blockchain technology involves risks including
              price volatility, smart contract vulnerabilities, and regulatory changes. We do not guarantee
              token values, transaction success, or immunity from losses. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Luxbin and its developers are not liable for any
              direct, indirect, incidental, or consequential damages arising from your use of the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the App at any time for violations
              of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p>
              These Terms are governed by the laws of [Your Jurisdiction, e.g., United States], without regard
              to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use constitutes acceptance of changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
            <p>
              For questions, contact us at [Your Email] or via GitHub:
              <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" className="text-blue-400 underline ml-1">
                https://github.com/mermaidnicheboutique-code/luxbin-chain
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}