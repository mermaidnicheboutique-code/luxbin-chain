# LUXBIN AI Compute - Demo

**Complete end-to-end demonstration of the LUXBIN temporal-gated AI compute network**

---

## What This Demo Shows

This demo demonstrates the complete flow of LUXBIN's revolutionary AI compute network:

1. **User Client** - Generates temporal keys and submits AI requests
2. **Blockchain** - Validates temporal proofs and routes requests
3. **AI Node** - Computes results and generates HMAC proofs
4. **Verification** - User receives cryptographically verified results

---

## Directory Structure

```
demo/
├── user-client/
│   └── luxbin_ai_client.py    # User SDK for submitting AI requests
├── ai-node/
│   └── luxbin_ai_node.py       # AI compute node implementation
├── scripts/
│   └── full_demo.py            # Complete end-to-end demonstration
└── README.md                   # This file
```

---

## Quick Start

### Option 1: Run Complete Demo (Recommended)

```bash
cd demo/scripts
python3 full_demo.py
```

This runs the full end-to-end flow showing:
- User generating temporal key
- Submitting AI request to blockchain
- AI node claiming and processing request
- HMAC verification
- Payment release
- Result delivery

---

### Option 2: Run Individual Components

**User Client Only:**
```bash
cd demo/user-client
python3 luxbin_ai_client.py
```

Shows:
- Temporal key generation
- Request submission
- Result verification

**AI Node Only:**
```bash
cd demo/ai-node
python3 luxbin_ai_node.py
```

Shows:
- Node registration
- Request scanning
- AI computation
- HMAC generation

---

## Demo Output Example

```
======================================================================
  LUXBIN AI COMPUTE - COMPLETE DEMONSTRATION
======================================================================

🌟 This demo shows the revolutionary LUXBIN AI network:
   • Temporal-gated AI access (time-locked keys)
   • Blockchain-verified computation (trustless)
   • Automatic escrow and payment
   • Decentralized AI marketplace

----------------------------------------------------------------------
STEP 1: USER: Initialize Client
----------------------------------------------------------------------

👤 User: Alice
   Account ID: alice
   Secret Phrase: "AI COMPUTE REQUEST"
   Balance: 10,000 LUXBIN tokens

----------------------------------------------------------------------
STEP 2: AI NODE: Register on Blockchain
----------------------------------------------------------------------

🤖 Registering AI Node: bob
   Supported Models: GPT4, ClaudeOpus, ClaudeSonnet, GeminiPro
✅ Node registered successfully!
✅ Blockchain: Node bob registered

----------------------------------------------------------------------
STEP 3: USER: Submit AI Compute Request
----------------------------------------------------------------------

📝 Alice wants to ask AI:
   Prompt: "Explain quantum computing in simple terms"
   Model: GPT4
   Payment: 1,000 LUXBIN tokens

🔑 Generating temporal key...

✅ AI Compute Request Submitted
   Request ID: 0
   Model: GPT4
   Temporal Key: a1b2c3d4e5f6...
   Request Hash: 7890abcdef...
   Payment: 1000 LUXBIN tokens
   Prompt: "Explain quantum computing in simple terms"

----------------------------------------------------------------------
STEP 4: BLOCKCHAIN: Validate Temporal Proof
----------------------------------------------------------------------

⛓️  Blockchain validating...
   ✓ Temporal key valid (within 30-second window)
   ✓ Payment reserved (1,000 LUXBIN)
   ✓ Request added to pending queue
   ✓ Ready for AI node assignment

----------------------------------------------------------------------
STEP 5: AI NODE: Scan and Claim Request
----------------------------------------------------------------------

👀 Bob scanning blockchain...
   Found 1 pending request(s)

✅ Found compatible request!
   Request ID: 0
   Model: GPT4
   Payment: 1000 LUXBIN

----------------------------------------------------------------------
STEP 6: AI NODE: Run AI Model
----------------------------------------------------------------------

🧠 Running GPT4...
   Prompt: "Explain quantum computing in simple terms"
   Max Tokens: 10000
✅ AI computation complete!
   Output: "Quantum computing uses quantum bits (qubits) that can be 0, 1, or both..."

📤 Generating HMAC signature...
   Output Hash: f3e2d1c0b9a8...
   HMAC: 9876543210ab...

----------------------------------------------------------------------
STEP 7: BLOCKCHAIN: Verify HMAC and Release Payment
----------------------------------------------------------------------

⛓️  Blockchain verifying...
✅ Blockchain: HMAC verified!
💰 Blockchain: Releasing 1000 LUXBIN to bob

✅ Verification successful!
   ✓ HMAC matches temporal key
   ✓ Output hash valid
   ✓ Payment released: 1,000 LUXBIN → Bob
   ✓ Request marked complete

----------------------------------------------------------------------
STEP 8: USER: Receive Verified Result
----------------------------------------------------------------------

👤 Alice retrieves result from blockchain...

✅ Result Verified!
   Request ID: 0
   Output Hash: f3e2d1c0b9a8...
   HMAC: 9876543210ab...
   Output: "Quantum computing uses quantum bits (qubits)..."

======================================================================
  TRANSACTION COMPLETE
======================================================================

📊 FINAL STATE:

   Alice (User):
   • Spent: 1,000 LUXBIN
   • Received: Verified AI response
   • Trust: Cryptographic proof of computation

   Bob (AI Node):
   • Earned: 1,000 LUXBIN
   • Completed: 1 request(s)
   • Reputation: 100% success rate

   Blockchain:
   • Requests Processed: 1
   • Temporal Proofs Verified: 1
   • Payments Released: 1,000 LUXBIN
```

---

## Key Concepts Demonstrated

### 1. Temporal Key Generation

```python
# Generate time-locked cryptographic key
temporal_key = LUXBINTemporalKey.generate_temporal_key(
    timestamp=current_time(),
    phrase="AI COMPUTE REQUEST"
)
```

**Security:**
- Valid only at specific timestamp (±30 seconds)
- Cannot be replayed
- Cannot be pre-computed
- Quantum-resistant (photonic encoding)

---

### 2. HMAC Verification

```python
# AI node generates HMAC
output_hash = hash(ai_output)
hmac = SHA3_512(output_hash + temporal_key)

# Blockchain verifies
computed_hmac = SHA3_512(output_hash + temporal_key)
assert computed_hmac == submitted_hmac  # Trustless verification
```

**Guarantees:**
- AI actually ran computation
- Output hasn't been tampered with
- Temporal key was used correctly
- Node cannot cheat

---

### 3. Automatic Escrow

```
User submits request
    ↓
Blockchain reserves payment
    ↓
AI node computes result
    ↓
Blockchain verifies HMAC
    ↓
Payment automatically released to node
```

**Benefits:**
- No manual invoicing
- Instant settlement
- Fair payment (only for verified work)
- No intermediaries

---

### 4. Decentralized Marketplace

```
User requests GPT-4
    ↓
Blockchain routes to nodes supporting GPT-4
    ↓
Multiple nodes can compete
    ↓
Market-driven pricing
```

**Impact:**
- No OpenAI/Anthropic monopoly
- Lower costs (competition)
- Choice of providers
- Censorship-resistant

---

## Technical Details

### Temporal Key Algorithm

```
1. timestamp_binary = encode_time(HH:MM:SS)
2. photonic_data = luxbin_encode(phrase)
3. combined = timestamp_binary + photonic_data.binary
4. temporal_key = SHA3_512(combined)
```

### HMAC Verification

```
1. output_hash = BLAKE2b(ai_output)
2. combined = output_hash + temporal_key
3. hmac = SHA3_512(combined)
4. blockchain_verifies: computed_hmac == submitted_hmac
```

### Payment Flow

```
1. Reserve: user_balance -= payment
2. Escrow: blockchain holds payment
3. Verify: check HMAC proof
4. Release: node_balance += payment
```

---

## Real-World Integration

To connect this demo to an actual Substrate blockchain:

1. **Install Substrate SDK:**
   ```bash
   pip install substrate-interface
   ```

2. **Connect to Node:**
   ```python
   from substrateinterface import SubstrateInterface

   substrate = SubstrateInterface(
       url="ws://127.0.0.1:9944"
   )
   ```

3. **Submit Extrinsic:**
   ```python
   call = substrate.compose_call(
       call_module='AICompute',
       call_function='submit_ai_compute_request',
       call_params={
           'temporal_key': temporal_key,
           'request_hash': request_hash,
           'model': 'GPT4',
           'max_tokens': 10000,
           'payment': 1000
       }
   )

   extrinsic = substrate.create_signed_extrinsic(
       call=call,
       keypair=keypair
   )

   substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)
   ```

---

## Requirements

- Python 3.7+
- No external dependencies for demo (uses stdlib only)
- For real integration: `substrate-interface`, `openai`, `anthropic`, etc.

---

## Next Steps

1. **Run the demo** to understand the flow
2. **Read the code** in `user-client/` and `ai-node/`
3. **Explore integration** with real blockchain
4. **Add AI APIs** (OpenAI, Anthropic, local LLMs)
5. **Deploy testnet** and run actual on-chain demo

---

## Learn More

- **[Integration Plan](../docs/INTEGRATION_PLAN.md)** - Technical roadmap
- **[Partnership Deck](../docs/PARTNERSHIP_DECK.md)** - Business proposal
- **[AI Compute Integration](../docs/AI_COMPUTE_INTEGRATION.md)** - Option 1 details
- **[Pallet AI Compute](../docs/PALLET_AI_COMPUTE.md)** - Option 2 architecture

---

## Support

Questions? Issues? Want to contribute?

- GitHub: https://github.com/mermaidnicheboutique-code/luxbin-chain
- Email: nicholechristie555@gmail.com

---

**✨ Welcome to the future of decentralized AI computation.**
