#!/usr/bin/env python3
"""
Tesla Fleet API Real Integration
================================

This script uses your actual client credentials to integrate with Tesla Fleet API.
"""

import json
from tesla_luxbin_adapter import TeslaLUXBINAdapter

# Your actual credentials (keep secure!)
CLIENT_ID = "bbcf9403-6f56-409f-86cc-6f79923e1c6d"
CLIENT_SECRET = "ta-secret.t_+Oe&n+LJODYngW"

def main():
    try:
        # Initialize adapter in real mode with your credentials
        adapter = TeslaLUXBINAdapter(
            mode='real',
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET
        )

        print("🔌 Adapter initialized with real Fleet API.")

        # Get list of vehicles in your fleet
        vehicles = adapter.get_vehicles()
        if vehicles and 'response' in vehicles and vehicles['response']:
            print("Fleet Vehicles:")
            print(json.dumps(vehicles, indent=2))
            # Pick the first vehicle for testing
            vehicle_id = vehicles['response'][0]['id_s']
            adapter.vehicle_id = vehicle_id
            print(f"Using vehicle ID: {vehicle_id}")
        else:
            print("No vehicles found in your Tesla account. Fleet API requires actual Tesla vehicles.")
            print("You can still test the authentication by checking the OAuth token.")
            return

        # Proceed with the selected vehicle
        data = adapter.get_vehicle_data()
        if data:
            print("Vehicle Data:")
            print(json.dumps(data, indent=2))
        else:
            print("No data received.")

        # Example: Run energy management
        adapter.energy_management()

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()