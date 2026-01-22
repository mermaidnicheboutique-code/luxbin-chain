#!/usr/bin/env python3
"""
LUXBIN Chain - Compensation Web Portal
Web interface for users to claim LUX token compensation for theft losses
"""

import os
import sys
from flask import Flask, render_template_string, request, jsonify
from datetime import datetime
import json

# Add recovery-system to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'recovery-system'))

try:
    from luxbin_compensation_system import LUXBINCompensationSystem
    COMPENSATION_AVAILABLE = True
except ImportError:
    COMPENSATION_AVAILABLE = False
    print("⚠️ Compensation system not available")

app = Flask(__name__)

# Global compensation system instance
compensation_system = None

def get_compensation_system():
    """Get or create compensation system instance"""
    global compensation_system
    if compensation_system is None and COMPENSATION_AVAILABLE:
        compensation_system = LUXBINCompensationSystem()
    return compensation_system

# HTML Template for Compensation Portal
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🛡️ LUXBIN Chain - Theft Compensation Portal</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 40px 0;
        }
        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #00ff88, #00aaff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .claim-form {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            margin: 20px 0;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
        }
        button {
            background: linear-gradient(45deg, #00ff88, #00aaff);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #00ff88;
        }
        .alert {
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .alert-success {
            background: rgba(0, 255, 136, 0.2);
            border: 1px solid #00ff88;
        }
        .alert-error {
            background: rgba(255, 0, 0, 0.2);
            border: 1px solid #ff4444;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ LUXBIN Chain</h1>
            <h2>Theft Compensation Portal</h2>
            <p>Get compensated in LUX tokens for funds stolen on other chains</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-value">$3.8B</div>
                <div>Stolen in 2023</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">5-10%</div>
                <div>Recovery Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">100%</div>
                <div>LUXBIN Recovery Rate</div>
            </div>
        </div>

        <div class="claim-form">
            <h3>Submit Theft Claim</h3>
            <form id="claimForm">
                <div class="form-group">
                    <label for="victimAddress">Your Wallet Address:</label>
                    <input type="text" id="victimAddress" name="victimAddress"
                           placeholder="0x..." required>
                </div>

                <div class="form-group">
                    <label for="stolenChain">Chain Where Theft Occurred:</label>
                    <select id="stolenChain" name="stolenChain" required>
                        <option value="">Select Chain</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="polygon">Polygon</option>
                        <option value="bsc">BSC</option>
                        <option value="arbitrum">Arbitrum</option>
                        <option value="optimism">Optimism</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="stolenAmount">Amount Stolen (in ETH/USD equivalent):</label>
                    <input type="number" id="stolenAmount" name="stolenAmount"
                           step="0.0001" placeholder="1.5" required>
                </div>

                <div class="form-group">
                    <label for="theftTxHash">Theft Transaction Hash:</label>
                    <input type="text" id="theftTxHash" name="theftTxHash"
                           placeholder="0x..." required>
                </div>

                <div class="form-group">
                    <label for="luxWallet">LUXBIN Wallet Address (for compensation):</label>
                    <input type="text" id="luxWallet" name="luxWallet"
                           placeholder="0x..." required>
                </div>

                <button type="submit">Submit Claim for Verification</button>
            </form>
        </div>

        <div id="result"></div>
    </div>

    <script>
        document.getElementById('claimForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/submit_claim', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                let alertClass = result.success ? 'alert-success' : 'alert-error';
                document.getElementById('result').innerHTML =
                    `<div class="alert ${alertClass}">${result.message}</div>`;

            } catch (error) {
                document.getElementById('result').innerHTML =
                    '<div class="alert alert-error">Error submitting claim. Please try again.</div>';
            }
        });
    </script>
</body>
</html>
"""

@app.route('/')
def home():
    """Serve the compensation portal homepage"""
    return render_template_string(HTML_TEMPLATE)

@app.route('/submit_claim', methods=['POST'])
def submit_claim():
    """Handle theft claim submission"""
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['victimAddress', 'stolenChain', 'stolenAmount', 'theftTxHash', 'luxWallet']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                })

        # Get compensation system
        comp_system = get_compensation_system()
        if not comp_system:
            return jsonify({
                'success': False,
                'message': 'Compensation system not available'
            })

        # Verify the theft (simplified for demo)
        verification = comp_system.verify_theft(
            victim_address=data['victimAddress'],
            stolen_chain=data['stolenChain'],
            stolen_amount=float(data['stolenAmount']),
            theft_tx_hash=data['theftTxHash']
        )

        if verification.get('verified', False):
            # Calculate compensation
            compensation_amount = comp_system.calculate_compensation(
                stolen_amount=float(data['stolenAmount']),
                stolen_chain=data['stolenChain']
            )

            # Mint and send compensation
            tx_result = comp_system.mint_compensation(
                victim_address=data['luxWallet'],
                compensation_amount=compensation_amount,
                theft_details=verification
            )

            return jsonify({
                'success': True,
                'message': f'Claim verified! {compensation_amount:,.2f} LUX tokens sent to {data["luxWallet"]}',
                'transaction': tx_result
            })
        else:
            return jsonify({
                'success': False,
                'message': f'Claim verification failed: {verification.get("reason", "Unknown error")}'
            })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error processing claim: {str(e)}'
        })

@app.route('/stats')
def get_stats():
    """Get compensation statistics"""
    comp_system = get_compensation_system()
    if not comp_system:
        return jsonify({'error': 'Compensation system not available'})

    return jsonify({
        'total_compensated': sum(claim.get('compensation_amount', 0) for claim in comp_system.compensation_claims),
        'claims_processed': len(comp_system.compensation_claims),
        'pool_remaining': comp_system.compensation_pool
    })

if __name__ == '__main__':
    print("🚀 Starting LUXBIN Compensation Portal...")
    print("Visit: http://localhost:5001")
    app.run(debug=True, host='0.0.0.0', port=5001)