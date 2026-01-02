#!/usr/bin/env python3
"""
LUXBIN HCT Dashboard
Web application for monitoring and visualizing Harmonic Convergence Theory metrics
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import asyncio
import json
from datetime import datetime
from pathlib import Path
import sys

# Add API directory to path
sys.path.insert(0, str(Path(__file__).parent / 'api'))

from hct_core import HCTEngine, HCTCoefficients
from hct_metrics_collector import HCTMetricsAggregator
from hct_integration import HCTIntegration, SystemMode

app = Flask(__name__,
           template_folder='frontend/templates',
           static_folder='frontend/static')
CORS(app)

# Global state
integration = None
hct_history = []

def get_integration():
    """Get or create HCT integration instance"""
    global integration
    if integration is None:
        integration = HCTIntegration(
            mirror_root="./luxbin_mirror",
            node_registry="./hct-app/config/nodes.json"
        )
    return integration

@app.route('/')
def index():
    """Main dashboard"""
    return render_template('index.html')

@app.route('/api/hct/current', methods=['GET'])
def get_current_hct():
    """Get current HCT score"""
    try:
        chain = request.args.get('chain', 'optimism')

        # Compute HCT
        integ = get_integration()
        result = asyncio.run(integ.compute_hct(chain))

        # Store in history
        global hct_history
        hct_history.append(result.to_dict())
        if len(hct_history) > 100:
            hct_history = hct_history[-100:]

        return jsonify({
            'success': True,
            'hct': result.HCT,
            'mode': integ.current_mode.value,
            'components': {
                'B': result.B,
                'H': result.H,
                'G': result.G,
                'R': result.R,
                'E': result.E
            },
            'timestamp': result.timestamp
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/hct/history', methods=['GET'])
def get_hct_history():
    """Get HCT history"""
    limit = int(request.args.get('limit', 50))
    return jsonify({
        'success': True,
        'history': hct_history[-limit:]
    })

@app.route('/api/hct/report', methods=['GET'])
def get_health_report():
    """Get complete health report"""
    try:
        integ = get_integration()
        report = integ.get_health_report()
        return jsonify({
            'success': True,
            'report': report
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/coefficients', methods=['GET', 'POST'])
def manage_coefficients():
    """Get or update coefficients"""
    integ = get_integration()

    if request.method == 'GET':
        return jsonify({
            'success': True,
            'coefficients': integ.engine.coefficients.to_dict()
        })

    elif request.method == 'POST':
        try:
            data = request.json
            coeffs = HCTCoefficients(
                alpha=float(data.get('alpha', 1.0)),
                beta=float(data.get('beta', 1.0)),
                gamma=float(data.get('gamma', 1.0)),
                delta=float(data.get('delta', 1.0)),
                epsilon=float(data.get('epsilon', 1.0)),
                updated_by=data.get('updated_by', 'user')
            )
            coeffs = coeffs.normalize()
            integ.engine.update_coefficients(coeffs)

            return jsonify({
                'success': True,
                'coefficients': coeffs.to_dict()
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/metrics', methods=['GET'])
def get_raw_metrics():
    """Get raw metrics breakdown"""
    try:
        chain = request.args.get('chain', 'optimism')
        aggregator = HCTMetricsAggregator()
        metrics = asyncio.run(aggregator.collect_all(chain))

        return jsonify({
            'success': True,
            'metrics': {
                'biology': {
                    'entropy': metrics.b_entropy,
                    'fault_tolerance': metrics.b_fault_tolerance,
                    'mutation_rate': metrics.b_mutation_rate,
                    'uptime': metrics.b_uptime
                },
                'history': {
                    'replay_integrity': metrics.h_replay_integrity,
                    'fork_awareness': metrics.h_fork_awareness,
                    'anomaly_learning': metrics.h_anomaly_learning,
                    'auditability': metrics.h_auditability
                },
                'geology': {
                    'geo_diversity': metrics.g_geo_diversity,
                    'hw_heterogeneity': metrics.g_hw_heterogeneity,
                    'dependency_concentration': metrics.g_dependency_concentration,
                    'physical_decentralization': metrics.g_physical_decentralization
                },
                'religion': {
                    'protocol_compliance': metrics.r_protocol_compliance,
                    'safety_constraints': metrics.r_safety_constraints,
                    'non_violence': metrics.r_non_violence,
                    'permission_boundaries': metrics.r_permission_boundaries
                },
                'electromagnetism': {
                    'power_efficiency': metrics.e_power_efficiency,
                    'timing_accuracy': metrics.e_timing_accuracy,
                    'latency_consistency': metrics.e_latency_consistency,
                    'signal_integrity': metrics.e_signal_integrity
                }
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/system/mode', methods=['GET'])
def get_system_mode():
    """Get current system mode"""
    integ = get_integration()

    if integ.current_hct is None:
        return jsonify({
            'success': True,
            'mode': 'unknown',
            'hct': None
        })

    return jsonify({
        'success': True,
        'mode': integ.current_mode.value,
        'hct': integ.current_hct.HCT,
        'should_halt': integ.should_halt()[0]
    })

@app.route('/api/operational', methods=['GET'])
def get_operational_modifiers():
    """Get operational modifiers (consensus, staking, etc.)"""
    try:
        integ = get_integration()

        if integ.current_hct is None:
            # Compute first
            asyncio.run(integ.compute_hct())

        base_threat = float(request.args.get('base_threat', 50.0))

        return jsonify({
            'success': True,
            'consensus_weight': integ.get_consensus_weight(),
            'staking_multiplier': integ.get_staking_multiplier(),
            'immune_response_multiplier': integ.get_immune_response_multiplier(),
            'threat_adjustment': integ.adjust_threat_severity(base_threat)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("=" * 80)
    print("LUXBIN HCT Dashboard Starting...")
    print("=" * 80)
    print()
    print("Open browser to: http://localhost:5000")
    print()

    app.run(host='0.0.0.0', port=5000, debug=True)
