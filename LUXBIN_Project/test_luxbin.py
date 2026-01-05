#!/usr/bin/env python3

import torch
import numpy as np
import time
import matplotlib.pyplot as plt

print("🚀 LUXBIN Hardware Testing Demo")
print("================================")

# Check GPU availability
gpu_available = torch.cuda.is_available()
if gpu_available:
    print(f"✅ GPU Available: {torch.cuda.get_device_name(0)}")
    print(f"   Memory: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
    device = torch.device('cuda')
else:
    print("⚠️  No CUDA GPU - checking for MPS (Apple Silicon)")
    mps_available = torch.backends.mps.is_available()
    if mps_available:
        print("✅ MPS Available (Apple Silicon GPU)")
        device = torch.device('mps')
    else:
        print("⚠️  No GPU - using CPU")
        device = torch.device('cpu')

print(f"\n🧮 NumPy version: {np.__version__}")
print(f"🔥 PyTorch version: {torch.__version__}")
print(f"Device: {device}")
print("\n✅ All libraries ready!")

# Simple test: acoustic wave interference simulation
print("\n🌊 Testing LUXBIN Acoustic Wave Interference")

def acoustic_interference_simulation(freq1, freq2, time_range, position_range):
    speed_of_sound = 343.0
    times = np.linspace(0, time_range, 1000)
    positions = np.linspace(0, position_range, 100)
    k1 = 2 * np.pi * freq1 / speed_of_sound
    k2 = 2 * np.pi * freq2 / speed_of_sound
    T, X = np.meshgrid(times, positions, indexing='ij')
    phase1 = k1 * (speed_of_sound * T - X)
    phase2 = k2 * (speed_of_sound * T - X)
    wave1 = np.sin(phase1)
    wave2 = np.sin(phase2)
    interference = wave1 + wave2
    return interference, times, positions

freq1, freq2 = 1e6, 500e3
time_range = 0.001
position_range = 0.01

start_time = time.time()
interference, times, positions = acoustic_interference_simulation(
    freq1, freq2, time_range, position_range)
calc_time = time.time() - start_time

print("✅ Interference calculation completed!")
print(f"   Matrix shape: {interference.shape}")
print(f"   Calculation time: {calc_time:.4f} seconds")
print(f"   Max amplitude: {np.max(np.abs(interference)):.3f}")

print("\n🎯 Demo test successful!")