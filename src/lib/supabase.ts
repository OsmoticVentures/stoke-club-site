import { createClient } from "@supabase/supabase-js";

// Server-only. STOKE_SUPABASE_SERVICE_ROLE_KEY bypasses row-level security,
// so this file is never imported from a client component.
export function getSupabaseAdmin() {
  const url = process.env.STOKE_SUPABASE_URL;
  const key = process.env.STOKE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
