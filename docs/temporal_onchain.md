# Temporal Locks & Merkle Roots — On-chain representation (draft)

This document describes a compact, deterministic, on-chain-friendly representation for the
`temporal_lock` and `memory` Merkle roots produced by the immune system simulation.

Goals:
- Deterministic encoding using byte arrays acceptable to Substrate pallets (Vec<u8> / [u8]).
- Compact enough to store in storage maps (bounded size recommended).
- Verifiable off-chain (recompute hash-chain / merkle root client-side).

Formats
-------

1) Temporal Lock (time-locked puzzle)
- Off-chain structure (Python):
  {
    "reveal_time": <u64>,
    "hash_chain_depth": <u32>,
    "initial_hash": "<hex>"
  }

- On-chain storage: `TemporalLock` encoded as SCALE struct:
  - `reveal_time: u64`
  - `hash_chain_depth: u32`
  - `initial_hash: [u8; 32]`

- Rationale: fixed 32-byte initial_hash fits SHA256; SCALE encodes fixed-size bytes compactly.

2) Memory Merkle Root
- `merkle_root`: 32-byte SHA256 hex string produced by simulation.
- Store as `Vec<u8>` of length 32 in pallet storage.

Pallet API (high-level)
-----------------------

- Storage:
  - `TemporalLocks: map AccountId => Option<TemporalLock>`
  - `MemoryRoots: map Hash => Vec<u8>`

- Calls:
  - `fn submit_temporal_lock(origin, target: AccountId, lock: TemporalLock)` — submit a lock for a target address.
  - `fn attest_memory_root(origin, root: [u8;32])` — record/anchor a Merkle root.

- Events:
  - `TemporalLockSubmitted(who, target, reveal_time)`
  - `MemoryRootAnchored(who, root)`

Security & Notes
----------------
- Include weight limits for `submit_temporal_lock` (fixed cost).
- On-chain verification of hash-chains is expensive; prefer anchoring only initial_hash + metadata and perform heavy verification off-chain.

Example off-chain verification
-----------------------------
- Client recomputes SHA256 iterations and uses on-chain `initial_hash` and `reveal_time` to validate puzzle correctness before submitting.

