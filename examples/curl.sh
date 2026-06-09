#!/usr/bin/env bash
# Read Tegro staking state over plain HTTP. No auth needed for reads.
set -euo pipefail

API="https://tegro.finance/api/v1"
MASTER="EQC-DUl20SfQFVH34cky8N76la1K0Uu5UWjel5IEn7mjIrfc"

echo "# Pools"
curl -s "$API/liquid-staking/pools" | jq .

echo "# Pool data (live rate, status)"
curl -s "$API/liquid-staking/pool/$MASTER/data" | jq .

# Auth-only endpoints (stake / unstake / claim / withdrawals) require a session cookie
# obtained by authenticating the wallet via TON Connect — see quickstart.ts.
