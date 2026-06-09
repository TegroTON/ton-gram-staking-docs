# FAQ

### What is stgTON?
stgTON is the **liquid staking token** of Tegro Finance on TON. You get it when you stake TON. It
represents your stake and earns yield through an appreciating exchange rate against TON.

### What yield can I expect?
A target of **up to ~12% APY**. Yield is **variable and not guaranteed** — it can change over time
and depends on network and market conditions.

### How is the yield paid?
Through the **rate**, not extra tokens. Your stgTON balance stays the same; each stgTON gradually
becomes worth more TON. When you unstake, you receive TON at the higher rate.

### Are there fees?
- **Staking:** no deposit fee.
- **Unstaking:** a small **redeem fee of 0.5%** is applied when you exit.
- Standard TON network gas applies to each transaction.

### Why does withdrawal take 72 hours?
It's the unbonding window for the pool (standard for liquid staking). Your payout amount is fixed at
the moment you unstake; the wait doesn't reduce it. You claim after 72 hours.

### Is it safe? Is it custodial?
It is **non-custodial**: an on-chain TON smart contract holds the logic, and you sign every action
from your own wallet. Tegro never holds your keys. See the [security model](security.md).

### Can the rate go down?
Under normal operation the rate is **monotonic (up only)** and is capped by the protocol's actual
backing so it can't run ahead of reality. There is a single, controlled emergency path reserved for
extreme loss scenarios; it exists for safety, not routine use.

### Can I lose money?
As with any staking or DeFi product, yes — risks exist (smart-contract risk, market risk, variable
yield). Please read the [disclaimer](../DISCLAIMER.md) and do your own research.

### How do I verify the contract?
All addresses and code hashes are published in [contracts.md](contracts.md). Verify them on a TON
explorer (e.g. tonviewer, tonscan) before interacting.

### Where do I stake?
At **https://tegro.finance/staking** — see the [step-by-step guide](guide.md).
