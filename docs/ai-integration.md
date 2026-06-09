# AI / agent integration

This documentation is built to be **easy for AI agents and LLM tools to discover and integrate** —
the same approach the TON docs use.

## Machine-readable resources

| Resource | What it is |
|---|---|
| [`/llms.txt`](../llms.txt) | Machine-readable index of these docs + structured key facts |
| [`/openapi.yaml`](../openapi.yaml) | OpenAPI 3.0 definition of the staking API |
| [`docs/api.md`](api.md) | Human-readable API reference |
| [`docs/contracts.md`](contracts.md) | On-chain addresses + code hashes (verifiable) |

Every page in this repo is **plain Markdown**, so a tool can fetch the raw content directly.

## How an agent integrates Tegro staking

Tegro staking is **non-custodial** — actions are signed by the user's wallet, never by a server or
agent. So an integration splits into **read** (anything) and **write** (build → user signs):

1. **Read state** — call the open endpoints (`/pools`, `/pool/{address}/data`) or read the contract
   directly on TON (`get_solvency`, jetton data). No auth.
2. **Build an action** — call a builder endpoint (`/stake`, `/unstake`, `/claim`). It returns an
   **unsigned TON Connect transaction**.
3. **Hand it to the wallet** — the agent presents the transaction to the user, who signs it in their
   own TON wallet (Tonkeeper, Wallet in Telegram, etc.) via TON Connect. The agent never needs keys.
4. **Track withdrawals** — after an unstake, poll `/withdrawals` (or read the voucher on-chain) for
   the amount and the 72-hour `claim_after` timer.

## Direct on-chain integration (no API)

Everything is also reachable straight from TON, without our API:

- **stgTON master:** `EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc` (code hash in
  [contracts.md](contracts.md)). Standard TEP-74 jetton master + staking getters incl.
  `get_solvency()`.
- **Stake** = send TON to the master with the stake op; **unstake** = burn stgTON on your st-wallet;
  **claim** = send the claim op to your matured voucher.

## Stay current

- App: https://tegro.finance/staking
- API base: `https://tegro.finance/api/v1`
- Contracts & verification: [contracts.md](contracts.md)

*(An official MCP server for agent tool-use is on the roadmap.)*
