"""Tegro liquid staking — Python quickstart (read-only).

Reads are open. Writing actions (stake/unstake/claim) build an unsigned TON Connect
transaction the user signs in their wallet — see quickstart.ts for that flow.

    pip install httpx
    python quickstart.py
"""

import httpx

API = "https://tegro.finance/api/v1"
MASTER = "EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc"


def get_pools() -> list[dict]:
    return httpx.get(f"{API}/liquid-staking/pools", timeout=15).json()


def get_pool_data(master: str = MASTER) -> dict:
    return httpx.get(f"{API}/liquid-staking/pool/{master}/data", timeout=15).json()


def get_withdrawals(master: str, session_cookie: str) -> list[dict]:
    """Authenticated: a user's pending vouchers (amount in nanoTON + 72h claim_after)."""
    return httpx.get(
        f"{API}/liquid-staking/pool/{master}/withdrawals",
        cookies={"token": session_cookie},
        timeout=15,
    ).json()


if __name__ == "__main__":
    pools = get_pools()
    data = get_pool_data()
    rate = int(data["price"]) / 1e9 if data.get("price") else None
    print("pools:", pools)
    print("stgTON -> TON rate:", rate)
