-- Migration: replace simple journal_entries with full episode-log schema
-- Run this in the Supabase SQL editor

-- Drop the old table (it only had day_id + content, nothing worth keeping)
drop table if exists public.journal_entries cascade;

-- Recreate with the full schema
create table public.journal_entries (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid references public.profiles(id) on delete cascade not null,
  prediction     text not null default '',
  intensity      int  not null default 0,
  floated        boolean,
  what_happened  text not null default '',
  body_sensations text,
  second_fear    text,
  insight        text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table public.journal_entries enable row level security;

create policy "Users can manage own journals" on public.journal_entries
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create trigger set_journals_updated_at
  before update on public.journal_entries
  for each row execute function public.handle_updated_at();
