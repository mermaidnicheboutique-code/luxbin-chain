<!-- Copilot instructions for AI coding agents working on luxbin-chain -->
# Copilot Guidance — LUXBIN Chain (concise)

Purpose: give an AI coding agent the minimal, actionable knowledge to be productive in this repo.

1) Big picture (what matters)
- Built on Substrate/Polkadot: core runtime and node live under `substrate/` and `polkadot/`.
- Runtime pallets of interest: `temporal-crypto` and `ai-compute` (see runtime folders under `substrate/frame/` and `templates/solochain/runtime/`).
- Node binary name used in Makefile: `solochain-template-node` (see [Makefile](Makefile)).
- Frontend / tooling: `interact.js` + `luxbin-ui.html` talk to local RPC at `ws://127.0.0.1:9944`.
- Native experiments and tooling: Python immune system (`luxbin_immune_system.py`) uses `cirq` for quantum simulation — treat it as a separate toolchain (Python + pip).

2) Where to look first (files/dirs to open)
- High-level README: [README.md](README.md) and [LUXBIN-README.md](LUXBIN-README.md).
- Build & workflows: [Makefile](Makefile) (primary dev commands: `make setup`, `make build`, `make run-dev`, `make run-testnet`).
- Runtime & pallets: `templates/solochain/runtime/` and `substrate/frame/` (search for `temporal-crypto`, `ai-compute`).
- Node and polkadot tooling: [polkadot/](polkadot/) and top-level `Cargo.toml`.
- Smart contracts: [contracts/](contracts/) (Solidity contracts used by demo/bridges).
- Python tools/demos: `luxbin_immune_system.py`, `luxbin_immune_config.py` (dependencies: `cirq`, `asyncio`).

3) Dev workflows (concrete commands)
- Initial setup: `make setup` — installs Rust toolchains and basic system deps (see [Makefile](Makefile)).
- Build node (debug): `make build` or `cargo build --manifest-path=Cargo.toml`.
- Build release node: `make build-release`.
- Run single-node dev: `make run-dev` (builds and runs `solochain-template-node --validator --dev`).
- Local 2-node testnet: `make run-testnet` (spawns Alice + Bob with ports and bootnode).
- Docs: `make doc` / `make doc-open` (uses `cargo doc`).
- Tests: `make test`, `make test-unit`, `make test-integration` (delegates to `cargo test`).
- Python demo: `python3 luxbin_immune_system.py` (ensure `cirq` installed: `pip install cirq`).

4) Project-specific conventions & patterns
- Node naming: binaries and systemd-like scripts expect `solochain-template-node` (don't rename without updating Makefile/scripts).
- Runtime layout: pallets live in `templates/solochain/runtime/src/` and are referenced by the top-level `Cargo.toml` – changes to pallet APIs usually require rebuilding runtime wasm and node.
- Photonic/address model: many JS/Python utilities expect HSL-based addresses; check `interact.js` and UI for encoding helpers.
- Experimental code: `luxbin_immune_system.py` is a simulation/demo, not production code — changes here should not be assumed to affect the runtime unless explicitly wired into pallets or contracts.

5) Integration & external dependencies
- Requires Rust toolchain + `wasm32-unknown-unknown` target for runtime builds (see `make setup`).
- Uses Docker for some components (`docker/`), but Makefile runs locally by default.
- Contracts in `contracts/` require `solc`/Hardhat if modified — search `demo/` for how contracts are deployed in tests.

6) Quick PR checklist for automated edits
- Run `make fmt` and `cargo clippy` locally (or `make check`).
- Ensure `cargo test` passes for any Rust changes.
- For runtime/pallet changes, run full `make build-release` and test `make run-dev` before PR.

7) Helpful heuristics for an AI agent
- When editing runtime pallets, update weights/stubs — search for TODOs and placeholder weights in `templates/solochain/runtime/`.
- Preserve binary names, Cargo features, and feature flags in `Cargo.toml` unless intentionally changing CI/packaging.
- Prefer small, focused changes: runtime edits are risky and require rebuild & manual run; prefer unit-level fixes first.

8) Where to ask for clarification
- Maintainer notes / context live in top-level READMEs and `docs/` — reference these in PR descriptions.

If any part needs more detail (CI, Docker compose, contract deployment scripts), tell me which area to expand and I will iterate.
