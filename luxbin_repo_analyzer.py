#!/usr/bin/env python3
"""
LUXBIN Repository Analyzer
==========================

Automatically clones and analyzes GitHub repositories for smart contract vulnerabilities.
Uses ethical AI to detect security issues and generate audit reports.
"""

import os
import sys
import subprocess
import re
import json
import time
from pathlib import Path
from urllib.parse import urlparse

# Add Luxbin paths
sys.path.append('LUXBIN_Project/luxbin-chain/python-implementation')
sys.path.append('.')

from luxbin_whitehat_mode import LuxbinWhitehat

class LuxbinRepoAnalyzer:
    def __init__(self):
        self.whitehat = LuxbinWhitehat()
        self.repo_path = None
        self.findings = []

    def analyze_repository(self, repo_url, branch='main'):
        """
        Main function to analyze a GitHub repository
        """
        print(f"🔍 LUXBIN Repository Analysis Starting...")
        print(f"📁 Repository: {repo_url}")
        print(f"🌿 Branch: {branch}")
        print("=" * 60)

        try:
            # Step 1: Clone repository
            self.repo_path = self.clone_repository(repo_url, branch)

            # Step 2: Find Solidity files
            solidity_files = self.find_solidity_files()

            print(f"📄 Found {len(solidity_files)} Solidity files")

            # Step 3: Analyze each file
            for file_path in solidity_files:
                print(f"\n🔬 Analyzing: {file_path}")
                vulnerabilities = self.analyze_solidity_file(file_path)
                if vulnerabilities:
                    print(f"🚨 Found {len(vulnerabilities)} potential issues")
                    for vuln in vulnerabilities:
                        self.add_finding(file_path, vuln)

            # Step 4: Generate reports
            self.generate_reports(repo_url)

            print(f"\n✅ Analysis complete! Found {len(self.findings)} potential vulnerabilities")

        except Exception as e:
            print(f"❌ Analysis failed: {e}")
            return False

        return True

    def clone_repository(self, repo_url, branch='main'):
        """
        Clone the repository to a temporary directory
        """
        # Parse repo URL
        parsed = urlparse(repo_url)
        repo_name = parsed.path.split('/')[-1].replace('.git', '')

        # Create temp directory
        temp_dir = f"luxbin_analysis_{int(time.time())}"
        os.makedirs(temp_dir, exist_ok=True)

        print(f"📥 Cloning repository to {temp_dir}...")

        try:
            # Clone the repository
            cmd = ['git', 'clone', '--branch', branch, '--depth', '1', repo_url, temp_dir]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

            if result.returncode != 0:
                # Try without branch specification
                cmd = ['git', 'clone', '--depth', '1', repo_url, temp_dir]
                result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

                if result.returncode != 0:
                    raise Exception(f"Git clone failed: {result.stderr}")

            print("✅ Repository cloned successfully")
            return temp_dir

        except subprocess.TimeoutExpired:
            raise Exception("Repository clone timed out")
        except FileNotFoundError:
            raise Exception("Git is not installed. Please install Git first.")

    def find_solidity_files(self):
        """
        Find all .sol files in the repository
        """
        solidity_files = []

        for root, dirs, files in os.walk(self.repo_path):
            # Skip common non-code directories
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'build', 'artifacts']]

            for file in files:
                if file.endswith('.sol'):
                    solidity_files.append(os.path.join(root, file))

        return solidity_files

    def analyze_solidity_file(self, file_path):
        """
        Analyze a Solidity file for vulnerabilities
        """
        vulnerabilities = []

        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                lines = content.split('\n')

            # Analyze for common vulnerabilities
            vulnerabilities.extend(self.check_reentrancy(content, lines, file_path))
            vulnerabilities.extend(self.check_overflow(content, lines, file_path))
            vulnerabilities.extend(self.check_access_control(content, lines, file_path))
            vulnerabilities.extend(self.check_unchecked_calls(content, lines, file_path))
            vulnerabilities.extend(self.check_oracle_manipulation(content, lines, file_path))

        except Exception as e:
            print(f"⚠️ Error analyzing {file_path}: {e}")

        return vulnerabilities

    def check_reentrancy(self, content, lines, file_path):
        """Check for reentrancy vulnerabilities"""
        vulnerabilities = []

        # Look for external calls before state updates
        for i, line in enumerate(lines):
            line_lower = line.lower().strip()

            # Check for external calls
            if any(call in line_lower for call in ['.call(', '.send(', '.transfer(', 'call{']):
                # Look for state updates after this line
                state_updated = False
                for j in range(i + 1, min(i + 10, len(lines))):
                    if any(keyword in lines[j].lower() for keyword in ['= ', '+=', '-=', '*=', '/=']):
                        state_updated = True
                        break

                if not state_updated:
                    vulnerabilities.append({
                        'type': 'reentrancy',
                        'severity': 'HIGH',
                        'description': 'Potential reentrancy: external call before state update',
                        'line': i + 1,
                        'code': line.strip(),
                        'recommendation': 'Use checks-effects-interactions pattern'
                    })

        return vulnerabilities

    def check_overflow(self, content, lines, file_path):
        """Check for integer overflow vulnerabilities"""
        vulnerabilities = []

        # Look for unchecked arithmetic
        unchecked_pattern = r'unchecked\s*{'
        if re.search(unchecked_pattern, content, re.IGNORECASE):
            for i, line in enumerate(lines):
                if 'unchecked' in line.lower():
                    vulnerabilities.append({
                        'type': 'overflow',
                        'severity': 'MEDIUM',
                        'description': 'Unchecked arithmetic operations may cause overflow/underflow',
                        'line': i + 1,
                        'code': line.strip(),
                        'recommendation': 'Use SafeMath library or Solidity 0.8+ built-in checks'
                    })
                    break

        return vulnerabilities

    def check_access_control(self, content, lines, file_path):
        """Check for access control vulnerabilities"""
        vulnerabilities = []

        # Look for functions without modifiers
        for i, line in enumerate(lines):
            if re.match(r'\s*function\s+\w+\s*\(', line):
                func_line = line.strip()
                # Check if it has access control
                has_modifier = False
                # Look backwards for modifiers
                for j in range(max(0, i-5), i):
                    if any(mod in lines[j].lower() for mod in ['onlyowner', 'onlyadmin', 'modifier']):
                        has_modifier = True
                        break

                if not has_modifier and any(critical in func_line.lower() for critical in ['withdraw', 'transfer', 'mint', 'burn']):
                    vulnerabilities.append({
                        'type': 'access_control',
                        'severity': 'HIGH',
                        'description': 'Critical function lacks access control modifier',
                        'line': i + 1,
                        'code': func_line,
                        'recommendation': 'Add onlyOwner or appropriate access control modifier'
                    })

        return vulnerabilities

    def check_unchecked_calls(self, content, lines, file_path):
        """Check for unchecked external calls"""
        vulnerabilities = []

        for i, line in enumerate(lines):
            if any(call in line for call in ['.call(', '.send(', '.transfer(']):
                # Check if the call is checked
                call_checked = False
                # Look at next few lines for success check
                for j in range(i, min(i + 5, len(lines))):
                    if any(check in lines[j].lower() for check in ['require(', 'if (', 'assert(']):
                        call_checked = True
                        break

                if not call_checked:
                    vulnerabilities.append({
                        'type': 'unchecked_call',
                        'severity': 'MEDIUM',
                        'description': 'External call result not checked for success',
                        'line': i + 1,
                        'code': line.strip(),
                        'recommendation': 'Check return value of external calls'
                    })

        return vulnerabilities

    def check_oracle_manipulation(self, content, lines, file_path):
        """Check for oracle manipulation vulnerabilities"""
        vulnerabilities = []

        # Look for price feeds without validation
        if 'chainlink' in content.lower() or 'oracle' in content.lower():
            for i, line in enumerate(lines):
                if 'latestanswer' in line.lower() or 'price' in line.lower():
                    # Check if price is validated
                    validated = False
                    for j in range(max(0, i-5), min(i+5, len(lines))):
                        if 'require' in lines[j].lower() or 'validate' in lines[j].lower():
                            validated = True
                            break

                    if not validated:
                        vulnerabilities.append({
                            'type': 'oracle_manipulation',
                            'severity': 'HIGH',
                            'description': 'Oracle price used without validation or staleness check',
                            'line': i + 1,
                            'code': line.strip(),
                            'recommendation': 'Validate oracle price and check for staleness'
                        })
                        break

        return vulnerabilities

    def add_finding(self, file_path, vulnerability):
        """
        Add a finding to the results
        """
        finding = {
            'file': file_path.replace(self.repo_path + '/', ''),
            'contract': os.path.basename(file_path),
            'network': 'ethereum',
            'vulnerabilities': [vulnerability],
            'severity': vulnerability['severity'],
            'temporal_key': self.whitehat.temporal.currentKey,
            'timestamp': time.time()
        }

        self.findings.append(finding)

    def generate_reports(self, repo_url):
        """
        Generate submission reports for all findings
        """
        print(f"\n📄 Generating {len(self.findings)} submission reports...")

        for finding in self.findings:
            # Generate for multiple platforms
            platforms = ['code4rena', 'sherlock', 'cantina']
            for platform in platforms:
                self.whitehat.submit_to_bounty_platform(finding, platform)

        print("✅ All reports generated!")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 luxbin_repo_analyzer.py <github-repo-url> [branch]")
        print("Example: python3 luxbin_repo_analyzer.py https://github.com/code-423n4/2025-12-panoptic main")
        sys.exit(1)

    repo_url = sys.argv[1]
    branch = sys.argv[2] if len(sys.argv) > 2 else 'main'

    analyzer = LuxbinRepoAnalyzer()
    success = analyzer.analyze_repository(repo_url, branch)

    if success:
        print(f"\n🏆 Analysis complete! Check generated .md files for submissions.")
        print(f"📊 Total findings: {len(analyzer.findings)}")
    else:
        print("\n❌ Analysis failed. Check error messages above.")

if __name__ == "__main__":
    main()