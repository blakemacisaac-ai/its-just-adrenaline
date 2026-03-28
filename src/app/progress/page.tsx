import { createClient } from '@/lib/supabase/server'
import ProgressClient from '@/components/ProgressClient'

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let checkins: { level: number; created_at: string }[] = []
  let journals: { day_id: number; content: string; updated_at: string }[] = []
  let completedCount = 0

  if (user) {
    const [checkinsRes, journalsRes, completedRes] = await Promise.all([
      supabase.from('checkins').select('level,created_at').eq('user_id', user.id).order('created_at').limit(14),
      supabase.from('journal_entries').select('day_id,content,updated_at').eq('user_id', user.id).order('updated_at', { ascending: false }).limit(10),
      supabase.from('completed_days').select('id', { count: 'exact' }).eq('user_id', user.id),
    ])
    checkins = checkinsRes.data || []
    journals = journalsRes.data || []
    completedCount = completedRes.count || 0
  }

  return <ProgressClient checkins={checkins} journals={journals} completedCount={completedCount} />
}
