# Security model

stgTON is designed so that a user's funds are protected by **on-chain invariants**, not by trust in
an operator. This page summarises those protections. (It describes *what* the protocol guarantees,
not implementation internals.)

## Core protections

- **Non-custodial.** The protocol is an on-chain TON smart contract. You sign every action from your
  own wallet; your keys are never held by Tegro.
- **Appreciating, bounded rate.** The stgTON↔TON rate is **monotonic (up-only)** in normal
  operation and is **capped by the protocol's attested backing**, so it can never run ahead of the
  real assets supporting it. There is no rate-timing arbitrage: every stake and unstake uses the
  live rate.
- **On-chain solvency visibility.** A public `get_solvency()` getter exposes total liability vs.
  available liquidity vs. pending withdrawals — anyone can monitor the pool's health directly on
  TON, without trusting a dashboard.
- **72-hour unbonding queue.** Exits are queued through per-user withdrawal vouchers; your payout
  amount is fixed at unstake time and protected by your voucher until you claim.
- **Liquidity buffer.** A portion of the pool is kept liquid to service withdrawals smoothly.
- **Claim safety.** A voucher can only be claimed by its owner, only after its 72-hour maturity, and
  only once — double-claim and early-claim are rejected on-chain.
- **Controlled emergency paths.** Privileged operations (e.g. parameter changes, the single
  loss-regime path) are time-locked and narrowly scoped — they exist for safety, not routine use.

## Reviews

The contracts underwent **independent adversarial review** (multiple reviewers, multiple rounds)
focused on the money path. No unprivileged fund-drain was found; findings were remediated and
re-verified before deployment. The full live cycle — stake → unstake → voucher → claim — has been
validated on mainnet.

## What this page does *not* cover

To keep the protocol and our users safe, this documentation intentionally **does not** publish
smart-contract source, exploit-level internals, or the details of how yield is generated. Public,
verifiable facts (addresses, code hashes, behaviour, invariants) are in this repository; source and
proprietary mechanics are not.

> Found a security issue? Please report it responsibly to the Tegro team before any public
> disclosure.
