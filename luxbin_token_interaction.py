#!/usr/bin/env python3
"""
Luxbin Token Interaction Script
==============================

Interact with the deployed Luxbin Token contract on Base Sepolia.
This script allows you to check balances, mint tokens, burn tokens, etc.
"""

import os
import json
from web3 import Web3
from eth_account import Account

# Contract details
TOKEN_ADDRESS = "0x66b4627B4Dd73228D24f24E844B6094091875169"  # Update if different
RPC_URL = "https://sepolia.base.org"
CHAIN_ID = 84532  # Base Sepolia

# Load ABI (you'll need to get this from the deployed contract)
TOKEN_ABI = [
    {"inputs": [{"internalType": "address", "name": "initialOwner", "type": "address"}], "stateMutability": "nonpayable", "type": "constructor"},
    {"inputs": [], "name": "name", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "symbol", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "decimals", "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "totalSupply", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "account", "type": "address"}], "name": "balanceOf", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "transfer", "outputs": [{"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "account", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [], "name": "owner", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}
]

def get_web3():
    return Web3(Web3.HTTPProvider(RPC_URL))

def get_contract(w3):
    return w3.eth.contract(address=TOKEN_ADDRESS, abi=TOKEN_ABI)

def check_balance(w3, contract, address):
    balance = contract.functions.balanceOf(address).call()
    decimals = contract.functions.decimals().call()
    return balance / (10 ** decimals)

def mint_tokens(w3, contract, private_key, to_address, amount):
    account = Account.from_key(private_key)
    nonce = w3.eth.get_transaction_count(account.address)

    # Convert amount to wei
    decimals = contract.functions.decimals().call()
    amount_wei = int(amount * (10 ** decimals))

    tx = contract.functions.mint(to_address, amount_wei).build_transaction({
        'chainId': CHAIN_ID,
        'gas': 200000,
        'gasPrice': w3.eth.gas_price,
        'nonce': nonce,
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return tx_hash.hex()

def burn_tokens(w3, contract, private_key, amount):
    account = Account.from_key(private_key)
    nonce = w3.eth.get_transaction_count(account.address)

    decimals = contract.functions.decimals().call()
    amount_wei = int(amount * (10 ** decimals))

    tx = contract.functions.burn(amount_wei).build_transaction({
        'chainId': CHAIN_ID,
        'gas': 200000,
        'gasPrice': w3.eth.gas_price,
        'nonce': nonce,
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return tx_hash.hex()

if __name__ == "__main__":
    w3 = get_web3()
    contract = get_contract(w3)

    print("Luxbin Token Interaction")
    print("========================")

    # Example: Check total supply
    total_supply = contract.functions.totalSupply().call()
    decimals = contract.functions.decimals().call()
    print(f"Total Supply: {total_supply / (10 ** decimals)} LUX")

    # Check your balance (replace with your address)
    your_address = "0x66b4627B4Dd73228D24f24E844B6094091875169"
    balance = check_balance(w3, contract, your_address)
    print(f"Your Balance: {balance} LUX")

    # To mint or burn, uncomment and set private_key
    # private_key = os.getenv("PRIVATE_KEY")
    # if private_key:
    #     tx_hash = mint_tokens(w3, contract, private_key, your_address, 1000)
    #     print(f"Mint TX: {tx_hash}")