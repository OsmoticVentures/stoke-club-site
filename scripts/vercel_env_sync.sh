#!/usr/bin/env bash
# Push this site's .env.local to its Vercel project (stoke-club-site, Osmotic
# Ventures team), then redeploy so the sign-up form can write to the sheet.
# Prints variable names only. Run from anywhere:
#   bash osmotic-ventures/stoke-club/site/scripts/vercel_env_sync.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SCOPE=osmotic-ventures-vercel-team
while IFS='=' read -r k v; do
  [[ -z "$k" || "$k" == \#* ]] && continue
  v="${v%\"}"; v="${v#\"}"
  npx vercel env rm "$k" production --yes --scope "$SCOPE" >/dev/null 2>&1 || true
  printf '%s' "$v" | npx vercel env add "$k" production --scope "$SCOPE" >/dev/null 2>&1 \
    && echo "set $k" || echo "FAILED $k"
done < .env.local
npx vercel deploy --prod --yes --scope "$SCOPE" >/dev/null 2>&1 && echo "redeployed"
