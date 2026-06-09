/**
 * Full exit flow — unstake, then poll for the matured voucher, then claim.
 *
 * Builders return an unsigned TON Connect transaction the user signs. Between unstake and claim
 * there is a 72-hour unbonding window; this script shows how to track it via /withdrawals.
 *
 *   npx tsx unstake-claim-flow.ts
 */

const API = "https://tegro.finance/api/v1";
const MASTER = "EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc";

type TxData = { valid_until: number; messages: { to: string; amount: string; payload?: string }[] };
type Withdrawal = { voucher_address: string; amount: number; claim_after: number; claimable: boolean };

async function buildAndSign(tonConnectUI: any, path: string, body: object) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // session cookie from TON Connect auth
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  const tx: TxData = await res.json();
  return tonConnectUI.sendTransaction({
    validUntil: tx.valid_until,
    messages: tx.messages.map((m) => ({ address: m.to, amount: m.amount, payload: m.payload })),
  });
}

/** 1. Burn stgTON -> the master mints a 72h withdrawal voucher. */
export async function unstake(tonConnectUI: any, stgTonAmount: number) {
  return buildAndSign(tonConnectUI, `/liquid-staking/pool/${MASTER}/unstake`, {
    shares_amount: Math.round(stgTonAmount * 1e9),
  });
}

/** 2. Your pending vouchers (amount in nanoTON + claim_after timer). */
export async function getWithdrawals(): Promise<Withdrawal[]> {
  const res = await fetch(`${API}/liquid-staking/pool/${MASTER}/withdrawals`, {
    credentials: "include",
  });
  return res.json();
}

/** 3. Claim a matured voucher -> TON returns to the wallet. */
export async function claim(tonConnectUI: any, voucherAddress: string) {
  return buildAndSign(tonConnectUI, `/liquid-staking/pool/${MASTER}/claim`, {
    voucher_address: voucherAddress,
  });
}

/** Example glue: claim everything that has matured. */
export async function claimMatured(tonConnectUI: any) {
  const pending = await getWithdrawals();
  const ready = pending.filter((w) => w.claimable);
  if (!ready.length) {
    const next = pending.sort((a, b) => a.claim_after - b.claim_after)[0];
    if (next) {
      const mins = Math.max(0, Math.round((next.claim_after - Date.now() / 1000) / 60));
      console.log(`nothing matured yet — next claim in ~${mins} min`);
    }
    return;
  }
  for (const w of ready) {
    console.log(`claiming ${(w.amount / 1e9).toFixed(4)} TON from ${w.voucher_address}`);
    await claim(tonConnectUI, w.voucher_address);
  }
}
