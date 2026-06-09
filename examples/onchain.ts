/**
 * Read Tegro staking state DIRECTLY on TON — no Tegro API, just a public TON endpoint.
 *
 * Shows two get-methods on the stgTON master:
 *   - get_rate()      -> the current stgTON↔TON rate
 *   - get_solvency()  -> [total_liability, on_chain_liquid, attested_backing, pending]
 *
 *   npm i @ton/ton @ton/core
 *   npx tsx onchain.ts
 */

import { TonClient, Address } from "@ton/ton";

const MASTER = "EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc";
const RATE_SCALE = 1_000_000_000_000_000_000n; // 1e18

async function main() {
  const client = new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC" });
  const master = Address.parse(MASTER);

  // current rate
  const { stack: rateStack } = await client.runMethod(master, "get_rate");
  const rate = rateStack.readBigNumber();
  console.log("rate (stgTON->TON):", Number(rate) / Number(RATE_SCALE));

  // solvency — promised vs available, observable by anyone
  const { stack } = await client.runMethod(master, "get_solvency");
  const totalLiability = stack.readBigNumber();
  const onChainLiquid = stack.readBigNumber();
  const attestedBacking = stack.readBigNumber();
  const pending = stack.readBigNumber();
  console.log("solvency (nanoTON):", { totalLiability, onChainLiquid, attestedBacking, pending });
}

main().catch(console.error);
