# Tegro Staking — Documentation

Public documentation, FAQ and contract registry for **Tegro liquid staking** (stgTON) on
[The Open Network (TON)](https://ton.org).

> **stgTON** is the liquid staking token of [Tegro Finance](https://tegro.finance). Stake TON,
> receive stgTON, and earn — non-custodial, on-chain, with a transparent appreciating rate.

This repository holds **only** the public-facing docs we are happy to share — it does **not**
contain smart-contract source code.

## Contents

- [How it works](docs/how-it-works.md) — the liquid staking model in plain language
- [FAQ](docs/faq.md) — APY, fees, the 72-hour withdrawal, safety
- [Guide: stake · unstake · claim](docs/guide.md) — step-by-step
- [Contracts](docs/contracts.md) — on-chain addresses & code hashes (verify them yourself)
- [Security model](docs/security.md) — the safety invariants of the protocol
- [Disclaimer & risks](DISCLAIMER.md)

### For developers & AI agents
- [AI / agent integration](docs/ai-integration.md) — discover & integrate Tegro staking
- [API reference](docs/api.md) · [OpenAPI spec](openapi.yaml) — the public staking API
- [`llms.txt`](llms.txt) — machine-readable index for LLM tools

> 🤖 **AI-friendly:** these docs follow the [TON AI-docs](https://docs.ton.org/overview/ai/overview)
> pattern — `llms.txt` index, plain-Markdown pages, and an OpenAPI spec — so agents and LLM tools can
> find and integrate Tegro staking easily.

## Quick facts

| | |
|---|---|
| Product | Tegro liquid staking (stgTON) |
| Network | TON mainnet |
| Stake asset | TON |
| Liquid token | stgTON (appreciating rate vs TON) |
| Target yield | up to ~12% APY *(variable, not guaranteed)* |
| Withdrawal | unstake → 72h unbonding → claim |
| Custody | non-custodial (on-chain smart contract) |

App: **https://tegro.finance/staking**

---

© Tegro Finance. Documentation only — not financial advice. See [DISCLAIMER](DISCLAIMER.md).
