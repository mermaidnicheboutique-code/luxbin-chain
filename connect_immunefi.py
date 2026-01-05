#!/usr/bin/env python3
"""
Connect LUXBIN Whitehat to Immunefi Account
"""

import os
import sys
sys.path.append('LUXBIN_Project/luxbin-chain/python-implementation')
sys.path.append('.')

def setup_immunefi_connection():
    """
    Guide user through connecting to Immunefi
    """
    print("🔗 Connecting LUXBIN Whitehat to Immunefi")
    print("=" * 50)

    print("\n📋 To connect your Immunefi account:")
    print("1. Go to: https://immunefi.com/dashboard")
    print("2. Sign in to your account")
    print("3. Go to Settings → API Keys")
    print("4. Generate a new API key")
    print("5. Copy the API key (keep it secret!)")

    api_key = input("\n🔑 Paste your Immunefi API key (or press Enter if none available): ").strip()

    if api_key:
        # Save to environment (you could also save to a config file)
        os.environ['IMMUNEFI_API_KEY'] = api_key
        print("✅ API key saved to environment")

        # Test connection
        from luxbin_whitehat_mode import LuxbinWhitehat
        whitehat = LuxbinWhitehat(immunefi_api_key=api_key)

        print("\n🧪 Testing connection...")
        # Test with a sample submission
        test_finding = {
            'contract': '0xTEST123',
            'network': 'ethereum',
            'vulnerabilities': [{'type': 'test', 'severity': 'LOW'}],
            'severity': 'LOW',
            'temporal_key': 'test'
        }

        success = whitehat.submit_to_bounty_platform(test_finding, 'immunefi')
        if success:
            print("✅ API connection successful! Ready to submit real findings.")
        else:
            print("⚠️ API connection test failed, but key saved.")

    else:
        print("📄 No API key provided - LUXBIN will generate manual submission reports instead.")
        print("✅ Manual submission mode activated!")

        # Test manual report generation
        from luxbin_whitehat_mode import LuxbinWhitehat
        whitehat = LuxbinWhitehat()

        print("\n🧪 Testing manual report generation...")
        test_finding = {
            'contract': '0xTEST123',
            'network': 'ethereum',
            'vulnerabilities': [{'type': 'reentrancy', 'severity': 'HIGH', 'description': 'Test vulnerability', 'line': 100, 'recommendation': 'Fix it'}],
            'severity': 'HIGH',
            'temporal_key': 'test'
        }

        success = whitehat.submit_to_bounty_platform(test_finding, 'immunefi')
        if success:
            print("✅ Manual report generation successful!")
        else:
            print("❌ Manual report generation failed.")

    print("\n💰 How Immunefi Payments Work:")
    print("1. Submit vulnerability report")
    print("2. Immunefi reviews and validates")
    print("3. If approved, you get paid according to bounty rules")
    print("4. Payments typically in USDC or other stablecoins")
    print("5. Funds sent to your wallet address")

    print("\n🎯 Bounty Amounts (approximate):")
    print("- Critical: $50,000 - $500,000")
    print("- High: $10,000 - $50,000")
    print("- Medium: $5,000 - $10,000")
    print("- Low: $1,000 - $5,000")

    print("\n⚡ LUXBIN will automatically:")
    print("- Detect vulnerabilities ethically")
    print("- Format professional reports")
    print("- Submit to Immunefi")
    print("- Track potential earnings")
    print("- Help you get paid for helping secure DeFi!")

if __name__ == "__main__":
    setup_immunefi_connection()