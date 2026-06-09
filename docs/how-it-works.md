# How it works

Tegro liquid staking lets you put your **TON** to work while keeping a liquid, transferable token
that represents your stake.

## The basics

1. **Stake.** You send TON to the staking contract and receive **stgTON** in return, at the current
   on-chain rate.
2. **Earn.** stgTON is an *appreciating-rate* liquid staking token: its value in TON grows over time
   as staking rewards accrue. You don't receive extra tokens — instead, **1 stgTON becomes worth
   more TON** as the rate rises. The rate is published on-chain and only moves **up**.
3. **Hold or use.** stgTON is a standard TON jetton — you keep it in your wallet, transfer it, or
   use it elsewhere, all while it keeps earning.
4. **Unstake.** When you want to exit, you burn stgTON. The contract issues you a **withdrawal
   voucher** for the TON value of your stgTON at that moment.
5. **Claim.** After a **72-hour** unbonding period, you claim the voucher and receive your TON.

## The rate (1 stgTON = rate × TON)

The exchange rate between stgTON and TON is stored on-chain and is **monotonic** — it never goes
down during normal operation. It is bounded so it can never exceed the protocol's actual backing.
When you stake or unstake, you always transact at the live rate, so there is no timing advantage to
be gained.

This is the same liquid-staking model used by leading LSTs (e.g. Lido, Tonstakers, bemo): your
balance of stgTON stays constant, and its **worth in TON appreciates**.

## Why a 72-hour withdrawal?

Liquid staking pools deploy capital to earn rewards, so exits use a short **unbonding window**
(72 hours) instead of being instant. This protects every staker by keeping the pool solvent and
orderly. Your withdrawal amount is **locked in at unstake time** — the 72-hour wait does not change it.

> Need liquidity sooner? Because stgTON is a liquid token, you can also trade it on the open market
> at any time instead of unstaking — subject to available market liquidity.
