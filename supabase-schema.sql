-- ============================================================
-- Just Adrenaline — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension (already enabled on Supabase by default)
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
-- Auto-created when a user signs up (via trigger below)
create table public.profiles (
  id              uuid references auth.users on delete cascade primary key,
  email           text,
  full_name       text,
  is_unlocked     boolean not null default false,
  current_day     int     not null default 1,
  streak          int     not null default 0,
  last_checkin    date,
  stripe_customer_id text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ─── CHECKINS ────────────────────────────────────────────────
create table public.checkins (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references public.profiles(id) on delete cascade not null,
  checked_at date not null default current_date,
  level      int  not null check (level between 1 and 5),
  created_at timestamptz not null default now()
);

alter table public.checkins enable row level security;
create policy "Users can manage own checkins" on public.checkins
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index checkins_user_date on public.checkins(user_id, checked_at desc);

-- ─── JOURNAL ENTRIES ─────────────────────────────────────────
create table public.journal_entries (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete cascade not null,
  prediction      text not null default '',
  intensity       int  not null default 0,
  floated         boolean,
  what_happened   text not null default '',
  body_sensations text,
  second_fear     text,
  insight         text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.journal_entries enable row level security;
create policy "Users can manage own journals" on public.journal_entries
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── COMPLETED DAYS ──────────────────────────────────────────
create table public.completed_days (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references public.profiles(id) on delete cascade not null,
  day_id       int  not null,
  completed_at timestamptz not null default now(),
  unique(user_id, day_id)
);

alter table public.completed_days enable row level security;
create policy "Users can manage own completed days" on public.completed_days
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── AUTO-CREATE PROFILE ON SIGNUP ───────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── AUTO-UPDATE updated_at ───────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_journals_updated_at
  before update on public.journal_entries
  for each row execute procedure public.set_updated_at();
