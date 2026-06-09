# Contracts

All Tegro staking contracts are deployed on **TON mainnet** and are publicly verifiable. Always
confirm an address on a TON explorer before interacting with it.

## stgTON — liquid staking master

| Field | Value |
|---|---|
| Network | TON mainnet |
| Contract | **`EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc`** |
| Token | stgTON (Tegro Staked TON) |
| Decimals | 9 |
| Code hash | `d12d097f8e94c138768b45333c1ca1b02c07b3e5244c772c4c15961e067c0da3` |
| Version | 1 |

Verify:
- Tonviewer: https://tonviewer.com/EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc
- Tonscan: https://tonscan.org/jetton/EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc

> The **code hash** lets anyone confirm that the on-chain bytecode matches the audited build. If a
> contract's code hash differs from the value above, it is **not** the official stgTON master.

## Per-withdrawal vouchers

When you unstake, the master mints a **withdrawal voucher** — a small contract that holds your
pending payout and the time it becomes claimable (72h after unstake). Each voucher is unique to your
unstake and can only be claimed by you. Voucher addresses are deterministic and visible on-chain.

## How to read on-chain state

The master exposes public getters, including `get_solvency()` — which makes the relationship between
**promised** and **available** funds observable directly on-chain. See the
[security model](security.md).

---

*Token metadata & logo are being submitted to the TON token registries (Tonkeeper / Tonviewer /
ton-assets) so the stgTON icon appears across wallets.*
