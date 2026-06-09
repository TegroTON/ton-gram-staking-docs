# Architecture

Tegro liquid staking is a set of on-chain TON contracts plus a thin, stateless HTTP API that only
**reads** state and **builds** transactions — the user's wallet signs everything. No custody, no
off-chain control of funds.

## Components

```mermaid
flowchart LR
  U["User wallet<br/>(Tonkeeper / Wallet…)"]
  FE["tegro.finance/staking<br/>(web app)"]
  API["Tegro Staking API<br/>(read + tx builders)"]
  M["stgTON master<br/>(staking contract)"]
  W["User st-wallet<br/>(stgTON jetton wallet)"]
  V["Withdrawal voucher<br/>(per unstake, 72h)"]

  U <-->|TON Connect: sign| FE
  FE -->|read / build| API
  API -->|reads only| M
  U -->|signed tx| M
  M -->|mint stgTON| W
  W -->|burn → notify| M
  M -->|deploy| V
  U -->|claim| V
  V -->|release| M
  M -->|payout TON| U
```

The API never holds keys and never moves funds: it returns an unsigned [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
transaction that the user signs in their own wallet.

## Lifecycle

```mermaid
sequenceDiagram
  actor User
  participant App as Web app / API
  participant Master as stgTON master
  participant Wallet as st-wallet
  participant Voucher as Withdrawal voucher

  Note over User,Voucher: STAKE
  User->>App: choose TON amount
  App-->>User: unsigned stake tx
  User->>Master: signed: stake (TON)
  Master->>Wallet: mint stgTON @ rate

  Note over User,Voucher: EARN
  Master-->>Master: rate appreciates (monotonic, capped by backing)

  Note over User,Voucher: UNSTAKE
  User->>Wallet: signed: burn stgTON
  Wallet->>Master: burn notification
  Master->>Voucher: deploy (amount, claim_after = now + 72h)

  Note over User,Voucher: CLAIM (after 72h)
  User->>Voucher: signed: claim
  Voucher->>Master: release
  Master->>User: payout TON
```

## The rate

`1 stgTON = rate(t) × TON`. The rate is stored on-chain and is:

- **monotonic** — it never decreases during normal operation;
- **bounded** — capped by the protocol's attested backing, so it can't exceed real assets;
- **applied live** — stake and unstake both use the current rate, so there is no timing arbitrage.

Yield is delivered through the rate, not by minting extra tokens: your stgTON balance is constant and
its **worth in TON** grows.

## Withdrawal vouchers

Each unstake mints a dedicated voucher contract holding `{ owner, amount, claim_after, claimed }`.
A voucher:

- is claimable only by its `owner`;
- only after `claim_after` (unstake + 72h);
- only once (double-claim and early-claim revert on-chain);
- has a deterministic address, discoverable from the master's transactions.

## Trust model

| Property | Guarantee |
|---|---|
| Custody | Non-custodial — wallet signs every action |
| Solvency | `get_solvency()` getter exposes liability vs. liquidity vs. pending on-chain |
| Exit | 72h unbonding queue; payout fixed at unstake time |
| Privileged ops | Time-locked, narrowly scoped (safety, not routine) |
| Review | Independent adversarial review; no unprivileged fund-drain found |

See the [security model](security.md) for details.
