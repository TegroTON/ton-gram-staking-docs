# API reference

Public HTTP API for Tegro liquid staking. Machine-readable definition: [`openapi.yaml`](../openapi.yaml).

- **Base URL:** `https://tegro.finance/api/v1`
- **Auth:** read endpoints are open. Builder endpoints (`stake`/`unstake`/`claim`) and `withdrawals`
  require a **session cookie** (`token`) obtained by authenticating the wallet via **TON Connect**.
- **Signing:** builder endpoints return an **unsigned TON Connect transaction**. The user signs it in
  their own wallet — the API never holds keys or moves funds itself.

## Read (open)

### List pools
```
GET /liquid-staking/pools
```
Returns the available staking pools (`address`, `apy`, `min_offer_amount`, `is_active`).

### Pool data
```
GET /liquid-staking/pool/{address}/data
```
Live `price` (the stgTON→TON rate), `is_active`.

```bash
curl https://tegro.finance/api/v1/liquid-staking/pool/EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc/data
```

## Build transactions (auth)

Each returns `TransactionData` — `{ valid_until, messages: [{ to, amount, payload }] }` — to pass
straight into TON Connect `sendTransaction`.

| Action | Endpoint | Body |
|---|---|---|
| Stake | `POST /liquid-staking/pool/{address}/stake` | `{ "offer_amount": <nanoTON> }` |
| Unstake | `POST /liquid-staking/pool/{address}/unstake` | `{ "shares_amount": <nano stgTON> }` |
| Claim | `POST /liquid-staking/pool/{address}/claim` | `{ "voucher_address": "<addr>" }` |

- **Stake:** sends TON to the master, mints stgTON to your st-wallet.
- **Unstake:** burns stgTON via your st-wallet; the master issues a 72h withdrawal voucher.
- **Claim:** pulls a matured voucher. The server verifies on-chain that the voucher is **yours**,
  **matured** (72h) and **unclaimed** before building the message.

## Withdrawals (auth)

```
GET /liquid-staking/pool/{address}/withdrawals
```
Your pending vouchers: `voucher_address`, `amount` (nanoTON), `claim_after` (unix ts), `claimable`.

## Typical flow

1. `GET …/pools` and `…/data` to read rate & APY.
2. Authenticate the wallet (TON Connect) → session cookie.
3. `POST …/stake` → sign with TON Connect.
4. Later: `POST …/unstake` → sign → voucher appears in `…/withdrawals` with a 72h timer.
5. After 72h: `POST …/claim` → sign → TON returns.
