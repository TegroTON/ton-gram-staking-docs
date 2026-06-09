# Examples

Copy-paste examples for integrating Tegro liquid staking. **Reads** are open; **builders**
(`stake`/`unstake`/`claim`) return an unsigned TON Connect transaction the user signs in their wallet.

| File | Language | What it shows |
|---|---|---|
| [`curl.sh`](curl.sh) | shell | Raw HTTP — read pools & pool data |
| [`quickstart.ts`](quickstart.ts) | TypeScript | Read state, build a stake tx, hand it to TON Connect |
| [`quickstart.py`](quickstart.py) | Python | Read pools, pool data & a user's pending withdrawals |
| [`onchain.ts`](onchain.ts) | TypeScript | Read the stgTON rate & solvency **directly on TON** (no API) |

- **API base:** `https://tegro.finance/api/v1`
- **stgTON master:** `EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc`
- **OpenAPI:** [`../openapi.yaml`](../openapi.yaml) · **API reference:** [`../docs/api.md`](../docs/api.md)

> These snippets are illustrative and MIT-licensed. They are not financial advice; verify the
> contract address before interacting (see [`../docs/contracts.md`](../docs/contracts.md)).
