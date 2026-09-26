-- Stoke Club site: the phone-number magnet.
-- Run once against the project named in STOKE_SUPABASE_URL.
-- Inserts happen only through the server route (service role key), so RLS
-- is left with no policies: nothing public can read or write this table.

create table if not exists public.stoke_club_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  opt_new_music boolean not null default false,
  opt_shows_la boolean not null default false,
  opt_big_announcements boolean not null default false,
  source text not null default 'site',
  created_at timestamptz not null default now()
);

alter table public.stoke_club_signups enable row level security;
