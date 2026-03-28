-- ============================================
-- Just Adrenaline — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  current_day INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  is_unlocked BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Daily check-ins
CREATE TABLE checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  level INTEGER CHECK (level BETWEEN 1 AND 5) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal entries
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_id INTEGER NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, day_id)
);

-- Completed days
CREATE TABLE completed_days (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_id INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, day_id)
);

-- Completed tasks
CREATE TABLE completed_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_id INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, day_id)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_tasks ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Checkins
CREATE POLICY "Users can view own checkins" ON checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checkins" ON checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Journal entries
CREATE POLICY "Users can view own journals" ON journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journals" ON journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journals" ON journal_entries FOR UPDATE USING (auth.uid() = user_id);

-- Completed days
CREATE POLICY "Users can view own completed days" ON completed_days FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completed days" ON completed_days FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Completed tasks
CREATE POLICY "Users can view own completed tasks" ON completed_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completed tasks" ON completed_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service role can update profiles (for Stripe webhook)
CREATE POLICY "Service role can update profiles" ON profiles FOR UPDATE USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX checkins_user_id_idx ON checkins(user_id);
CREATE INDEX checkins_created_at_idx ON checkins(created_at);
CREATE INDEX journal_entries_user_day_idx ON journal_entries(user_id, day_id);
CREATE INDEX completed_days_user_id_idx ON completed_days(user_id);

-- Daily habits tracking
CREATE TABLE IF NOT EXISTS daily_habits (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid REFERENCES auth.users ON DELETE CASCADE,
  date       date NOT NULL,
  habits     jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE daily_habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own habits" ON daily_habits
  FOR ALL USING (auth.uid() = user_id);
