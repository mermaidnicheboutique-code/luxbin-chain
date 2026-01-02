#!/usr/bin/env python3
"""
LUXBIN Automatic Repository Analyzer
====================================

One-command repository analysis for bug bounty hunting.
"""

import os
import sys
import subprocess
import re
import time

def run_luxbin_analysis(repo_url):
    """
    Complete LUXBIN analysis workflow
    """
    print("🚀 LUXBIN Auto-Analysis Starting")
    print(f"📁 Target: {repo_url}")
    print("=" * 50)

    # Step 1: Clone repo
    print("📥 Cloning repository...")
    repo_name = repo_url.split('/')[-1].replace('.git', '')
    temp_dir = f"luxbin_temp_{repo_name}"

    try:
        result = subprocess.run(['git', 'clone', '--depth', '1', repo_url, temp_dir],
                              capture_output=True, text=True, timeout=60)

        if result.returncode != 0:
            print(f"❌ Clone failed: {result.stderr}")
            return False

        print("✅ Repository cloned")

        # Step 2: Find Solidity files
        sol_files = []
        for root, dirs, files in os.walk(temp_dir):
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules']]
            for file in files:
                if file.endswith('.sol'):
                    sol_files.append(os.path.join(root, file))

        print(f"📄 Found {len(sol_files)} Solidity files")

        # Step 3: Analyze files
        total_findings = 0

        for file_path in sol_files:
            print(f"\n🔬 Analyzing: {os.path.basename(file_path)}")
            findings = analyze_file(file_path)
            if findings:
                total_findings += len(findings)
                print(f"🚨 Found {len(findings)} potential issues")

                # Generate report
                generate_report(file_path, findings, repo_url)

        # Cleanup
        subprocess.run(['rm', '-rf', temp_dir])
        print(f"🧹 Cleaned up {temp_dir}")

        print("
✅ Analysis Complete!"        print(f"📊 Total findings: {total_findings}")
        print("📂 Check generated .md files for contest submissions"
        return True

    except Exception as e:
        print(f"❌ Analysis failed: {e}")
        return False

def analyze_file(file_path):
    """
    Analyze a Solidity file for vulnerabilities
    """
    findings = []

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            lines = content.split('\n')

        # Check for reentrancy
        for i, line in enumerate(lines):
            if any(call in line.lower() for call in ['.call(', '.send(', '.transfer(']):
                findings.append({
                    'type': 'reentrancy',
                    'severity': 'HIGH',
                    'line': i + 1,
                    'description': 'Potential reentrancy vulnerability',
                    'recommendation': 'Use checks-effects-interactions pattern'
                })

        # Check for access control
        for i, line in enumerate(lines):
            if re.match(r'\s*function\s+\w+\s*\(', line):
                if any(critical in line.lower() for critical in ['withdraw', 'transfer']):
                    # Check for modifier
                    has_modifier = False
                    for j in range(max(0, i-3), i):
                        if 'only' in lines[j].lower():
                            has_modifier = True
                            break

                    if not has_modifier:
                        findings.append({
                            'type': 'access_control',
                            'severity': 'HIGH',
                            'line': i + 1,
                            'description': 'Critical function lacks access control',
                            'recommendation': 'Add onlyOwner modifier'
                        })

    except Exception as e:
        print(f"⚠️ Error analyzing file: {e}")

    return findings

def generate_report(file_path, findings, repo_url):
    """
    Generate a contest submission report
    """
    if not findings:
        return

    contract_name = os.path.basename(file_path)
    timestamp = int(time.time())

    report_content = f"""# LUXBIN AI Vulnerability Report - {contract_name}

## Repository Information
- **Repository:** {repo_url}
- **Contract:** {contract_name}
- **Analysis Time:** {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp))}

## Findings Summary
Found {len(findings)} potential vulnerabilities:

"""

    for i, finding in enumerate(findings, 1):
        report_content += f"""
### Finding {i}: {finding['type'].upper()}
- **Severity:** {finding['severity']}
- **Line:** {finding['line']}
- **Description:** {finding['description']}
- **Recommendation:** {finding['recommendation']}
"""

    report_content += f"""

## Contest Submission Instructions

### Code4rena
- Submit to: https://code4rena.com/contests
- Find the relevant contest (e.g., Panoptic)
- Copy this report content
- No identity verification required

### Sherlock
- Submit to: https://app.sherlock.xyz/contests
- Anonymous participation
- USDC rewards

### Cantina
- Submit to: https://cantina.xyz/competitions
- No KYC required
- Multiple competition formats

---
*Generated by LUXBIN Ethical AI Whitehat System*
"""

    # Save report
    filename = f"luxbin_auto_{contract_name}_{timestamp}.md"
    with open(filename, 'w') as f:
        f.write(report_content)

    print(f"📄 Report saved: {filename}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 luxbin_auto_analyzer.py <github-repo-url>")
        print("Example: python3 luxbin_auto_analyzer.py https://github.com/code-423n4/2025-12-panoptic")
        sys.exit(1)

    repo_url = sys.argv[1]
    success = run_luxbin_analysis(repo_url)

    if success:
        print("\n🎯 Ready to submit findings to contests!")
        print("💰 Potential earnings: $1,000 - $50,000+ per valid finding")
    else:
        print("\n❌ Analysis failed. Check repository URL and try again.")

if __name__ == "__main__":
    main()