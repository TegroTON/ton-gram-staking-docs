/**
 * Solvency monitor — read the pool's on-chain health directly from TON, on a loop.
 *
 * `get_solvency()` returns [total_liability, on_chain_liquid, attested_backing, pending] in nanoTON.
 * Anyone can run this to watch that promised >= available, with no trust in a dashboard.
 *
 *   npm i @ton/ton @ton/core
 *   npx tsx solvency-monitor.ts
 */

import { TonClient, Address } from "@ton/ton";

const MASTER = "EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc";
const INTERVAL_MS = 60_000;

const ton = (nano: bigint) => (Number(nano) / 1e9).toFixed(4);

async function readSolvency(client: TonClient) {
  const { stack } = await client.runMethod(Address.parse(MASTER), "get_solvency");
  const totalLiability = stack.readBigNumber();
  const onChainLiquid = stack.readBigNumber();
  const attestedBacking = stack.readBigNumber();
  const pending = stack.readBigNumber();

  const backedRatio = totalLiability > 0n
    ? Number(attestedBacking) / Number(totalLiability)
    : 1;

  console.log(
    `[${new Date().toISOString()}] liability=${ton(totalLiability)} liquid=${ton(onChainLiquid)} ` +
      `backing=${ton(attestedBacking)} pending=${ton(pending)} TON | backed=${(backedRatio * 100).toFixed(1)}%`
  );

  if (attestedBacking < totalLiability) console.warn("  ⚠️ attested backing < liability");
  if (pending > onChainLiquid) console.warn("  ⚠️ pending withdrawals exceed on-chain liquidity (off-chain recall needed)");
}

async function main() {
  const client = new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC" });
  await readSolvency(client);
  setInterval(() => readSolvency(client).catch(console.error), INTERVAL_MS);
}

main().catch(console.error);
