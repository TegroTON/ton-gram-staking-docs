<div align="center">

# TON · Gram Staking — Tegro Docs

**Liquid staking on [The Open Network (TON)](https://ton.org) by [Tegro Finance](https://tegro.finance).**
Stake TON, receive **stgTON** — a liquid, appreciating-rate staking token — earn, and exit via a
72-hour voucher. Non-custodial, on-chain, verifiable.

[![Docs](https://img.shields.io/badge/docs-docs.tegro.finance-2AABEE)](https://docs.tegro.finance)
[![App](https://img.shields.io/badge/app-tegro.finance%2Fstaking-2AABEE)](https://tegro.finance/staking)
[![Network](https://img.shields.io/badge/network-TON%20mainnet-0098EA)](https://tonviewer.com/EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc)
[![License](https://img.shields.io/badge/license-MIT%20%2F%20CC--BY--4.0-green)](LICENSE)
[![llms.txt](https://img.shields.io/badge/llms.txt-✓-black)](llms.txt)

</div>

> This repo holds the **public** docs, FAQ, contract registry, API spec and integration examples.
> It does **not** contain smart-contract source. Built to be easy for **developers and AI agents**
> to consume (`llms.txt` + OpenAPI + runnable examples).

## Quickstart

```bash
# read live pool data (no auth)
curl -s https://tegro.finance/api/v1/liquid-staking/pool/EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc/data | jq .
```

Then: build a stake/unstake/claim transaction via the API and sign it with the user's wallet
(TON Connect) — see [`examples/`](examples/) and the [API reference](docs/api.md).

## Documentation

| | |
|---|---|
| [How it works](docs/how-it-works.md) | the liquid staking model in plain language |
| [Architecture](docs/architecture.md) | components, lifecycle & trust model (diagrams) |
| [Guide](docs/guide.md) | step-by-step stake · unstake · claim |
| [FAQ](docs/faq.md) | APY, fees, the 72h withdrawal, safety |
| [Contracts](docs/contracts.md) | on-chain addresses & code hashes — verify them yourself |
| [Security model](docs/security.md) | on-chain invariants, `get_solvency`, reviews |
| [Disclaimer & risks](DISCLAIMER.md) | variable yield, smart-contract & market risk |

**Developers & AI agents:** [AI / agent integration](docs/ai-integration.md) ·
[API reference](docs/api.md) · [OpenAPI](openapi.yaml) · [examples](examples/) ·
[`llms.txt`](llms.txt)

## Quick facts

| | |
|---|---|
| Liquid token | **stgTON** (jetton, 9 decimals) · appreciating rate vs TON |
| Stake asset | TON · **Network:** TON mainnet |
| Target yield | up to ~12% APY *(variable, not guaranteed)* |
| Fees | 0.5% redeem (unstake) · no deposit fee |
| Withdrawal | unstake → 72h unbonding → claim |
| Custody | non-custodial (on-chain smart contract) |
| Contract | `EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc` |

## Repository layout

```
├── docs/            how-it-works · architecture · guide · faq · contracts · security · api · ai-integration
├── examples/        runnable TS / Python / curl integration examples
├── openapi.yaml     OpenAPI 3.0 spec of the staking API
├── llms.txt         machine-readable index for LLM tools
├── CONTRIBUTING.md · SECURITY.md · DISCLAIMER.md · LICENSE
```

## Contributing & security

Improvements to these docs are welcome — see [CONTRIBUTING](CONTRIBUTING.md). For security issues,
please follow responsible disclosure in [SECURITY](SECURITY.md).

---

<div align="center">

Made by [Tegro Finance](https://tegro.finance) · [docs.tegro.finance](https://docs.tegro.finance) ·
[t.me/TegroFinance](https://t.me/TegroFinance) · [@TegroDEX](https://x.com/TegroDEX)

Documentation only — not financial advice. See [DISCLAIMER](DISCLAIMER.md).

</div>
