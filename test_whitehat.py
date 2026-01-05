import sys
sys.path.append('LUXBIN_Project/luxbin-chain/python-implementation')
sys.path.append('.')
from luxbin_whitehat_mode import LuxbinWhitehat

whitehat = LuxbinWhitehat()
print("Starting bounty scan...")
findings = whitehat.scan_public_contracts()
print(f"Scan complete! Found {len(findings)} vulnerabilities")
print(f"Potential earnings: ${whitehat.earnings}")
for i, finding in enumerate(findings[:2]):
    print(f"- {finding['contract']}: {finding['severity']} severity")
