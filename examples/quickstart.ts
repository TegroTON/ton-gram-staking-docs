/**
 * Tegro liquid staking — TypeScript quickstart.
 *
 * Reads are open. Builders (stake/unstake/claim) return an unsigned TON Connect transaction;
 * the user signs it in their own wallet. This file shows: read pool data, then build a stake
 * transaction and hand it to TON Connect.
 *
 * Run reads with: `npx tsx quickstart.ts`  (the TON Connect part runs in a browser dApp.)
 */

const API = "https://tegro.finance/api/v1";
const MASTER = "EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc";

// --- 1. Read (open, no auth) ---------------------------------------------------

export async function getPools() {
  const res = await fetch(`${API}/liquid-staking/pools`);
  return res.json(); // [{ address, apy, min_offer_amount, is_active }]
}

export async function getPoolData(master = MASTER) {
  const res = await fetch(`${API}/liquid-staking/pool/${master}/data`);
  return res.json(); // { address, price, is_active }  — `price` is the live stgTON→TON rate
}

// --- 2. Build a stake tx (auth) + sign with TON Connect ------------------------
//
// The session cookie comes from authenticating the wallet via TON Connect first.
// `tonConnectUI` is from @tonconnect/ui-react (or @tonconnect/sdk).

type TxData = { valid_until: number; messages: { to: string; amount: string; payload?: string }[] };

export async function stake(tonConnectUI: any, master: string, tonAmount: number) {
  // build (server returns an unsigned TON Connect tx)
  const res = await fetch(`${API}/liquid-staking/pool/${master}/stake`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send the session cookie
    body: JSON.stringify({ offer_amount: Math.round(tonAmount * 1e9) }), // nanoTON
  });
  if (!res.ok) throw new Error(`stake build failed: ${res.status}`);
  const tx: TxData = await res.json();

  // sign — the wallet moves the funds, not us
  return tonConnectUI.sendTransaction({
    validUntil: tx.valid_until,
    messages: tx.messages.map((m) => ({ address: m.to, amount: m.amount, payload: m.payload })),
  });
}

// Unstake and claim follow the exact same build→sign shape:
//   POST /liquid-staking/pool/{master}/unstake  { shares_amount: <nano stgTON> }
//   GET  /liquid-staking/pool/{master}/withdrawals            -> pending vouchers (+72h timer)
//   POST /liquid-staking/pool/{master}/claim    { voucher_address }

if (typeof require !== "undefined" && require.main === module) {
  Promise.all([getPools(), getPoolData()]).then(([pools, data]) =>
    console.log({ pools, data })
  );
}
