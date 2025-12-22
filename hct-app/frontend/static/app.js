// HCT Dashboard JavaScript

let hctChart;
const API_BASE = window.location.origin;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    loadCurrentHCT();
    loadCoefficients();
    setupEventListeners();

    // Auto-refresh every 10 seconds
    setInterval(loadCurrentHCT, 10000);
});

// Initialize Chart.js
function initializeChart() {
    const ctx = document.getElementById('hct-chart').getContext('2d');

    hctChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'HCT Score',
                data: [],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    ticks: {
                        callback: (value) => value.toFixed(2)
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Load current HCT
async function loadCurrentHCT() {
    try {
        const response = await fetch(`${API_BASE}/api/hct/current?chain=optimism`);
        const data = await response.json();

        if (data.success) {
            updateHCTDisplay(data);
            updateComponentsDisplay(data.components);
            await loadOperationalModifiers();
            await loadHistory();
            updateLastUpdate();
        }
    } catch (error) {
        console.error('Error loading HCT:', error);
    }
}

// Update HCT display
function updateHCTDisplay(data) {
    const scoreElement = document.querySelector('.score-value');
    const modeElement = document.querySelector('.mode-badge');

    scoreElement.textContent = data.hct.toFixed(4);

    // Color based on HCT value
    if (data.hct >= 0.7) {
        scoreElement.style.color = '#22c55e';
    } else if (data.hct >= 0.5) {
        scoreElement.style.color = '#f59e0b';
    } else {
        scoreElement.style.color = '#ef4444';
    }

    // Update mode badge
    modeElement.textContent = data.mode.toUpperCase();
    modeElement.className = `mode-badge ${data.mode}`;
}

// Update components display
function updateComponentsDisplay(components) {
    const componentNames = ['b', 'h', 'g', 'r', 'e'];
    const componentLabels = {
        'B': 'Biology',
        'H': 'History',
        'G': 'Geology',
        'R': 'Religion',
        'E': 'Electromagnetism'
    };

    componentNames.forEach(name => {
        const card = document.getElementById(`component-${name}`);
        const value = components[name.toUpperCase()];

        const valueElement = card.querySelector('.component-value');
        const progressFill = card.querySelector('.progress-fill');

        valueElement.textContent = value.toFixed(4);
        progressFill.style.width = `${value * 100}%`;

        // Color based on value
        if (value >= 0.7) {
            progressFill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
        } else if (value >= 0.5) {
            progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
        }
    });
}

// Load operational modifiers
async function loadOperationalModifiers() {
    try {
        const response = await fetch(`${API_BASE}/api/operational`);
        const data = await response.json();

        if (data.success) {
            document.getElementById('consensus-weight').textContent = `${data.consensus_weight.toFixed(2)}x`;
            document.getElementById('staking-multiplier').textContent = `${data.staking_multiplier.toFixed(2)}x`;
            document.getElementById('immune-response').textContent = `${data.immune_response_multiplier.toFixed(2)}x`;
        }
    } catch (error) {
        console.error('Error loading modifiers:', error);
    }
}

// Load HCT history
async function loadHistory() {
    try {
        const response = await fetch(`${API_BASE}/api/hct/history?limit=50`);
        const data = await response.json();

        if (data.success && data.history.length > 0) {
            const labels = data.history.map((_, i) => i.toString());
            const values = data.history.map(h => h.HCT);

            hctChart.data.labels = labels;
            hctChart.data.datasets[0].data = values;
            hctChart.update();
        }
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// Load coefficients
async function loadCoefficients() {
    try {
        const response = await fetch(`${API_BASE}/api/coefficients`);
        const data = await response.json();

        if (data.success) {
            const coeffs = data.coefficients;

            document.getElementById('alpha').value = coeffs.alpha;
            document.getElementById('alpha-value').textContent = coeffs.alpha.toFixed(2);

            document.getElementById('beta').value = coeffs.beta;
            document.getElementById('beta-value').textContent = coeffs.beta.toFixed(2);

            document.getElementById('gamma').value = coeffs.gamma;
            document.getElementById('gamma-value').textContent = coeffs.gamma.toFixed(2);

            document.getElementById('delta').value = coeffs.delta;
            document.getElementById('delta-value').textContent = coeffs.delta.toFixed(2);

            document.getElementById('epsilon').value = coeffs.epsilon;
            document.getElementById('epsilon-value').textContent = coeffs.epsilon.toFixed(2);
        }
    } catch (error) {
        console.error('Error loading coefficients:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Coefficient sliders
    ['alpha', 'beta', 'gamma', 'delta', 'epsilon'].forEach(name => {
        const slider = document.getElementById(name);
        const valueDisplay = document.getElementById(`${name}-value`);

        slider.addEventListener('input', (e) => {
            valueDisplay.textContent = parseFloat(e.target.value).toFixed(2);
        });
    });

    // Update coefficients button
    document.getElementById('update-coeffs').addEventListener('click', updateCoefficients);

    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', () => {
        loadCurrentHCT();
    });
}

// Update coefficients
async function updateCoefficients() {
    const coeffs = {
        alpha: parseFloat(document.getElementById('alpha').value),
        beta: parseFloat(document.getElementById('beta').value),
        gamma: parseFloat(document.getElementById('gamma').value),
        delta: parseFloat(document.getElementById('delta').value),
        epsilon: parseFloat(document.getElementById('epsilon').value),
        updated_by: 'dashboard_user'
    };

    try {
        const response = await fetch(`${API_BASE}/api/coefficients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coeffs)
        });

        const data = await response.json();

        if (data.success) {
            alert('Coefficients updated successfully!');
            await loadCoefficients();
            await loadCurrentHCT();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert(`Error updating coefficients: ${error.message}`);
    }
}

// Update last update timestamp
function updateLastUpdate() {
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleTimeString();
}
