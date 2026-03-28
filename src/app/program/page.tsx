import { createClient } from '@/lib/supabase/server'
import ProgramClient from '@/components/ProgramClient'

export default async function ProgramPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let completedLessons: number[] = []

  if (user) {
    const [profileRes, completedRes] = await Promise.all([
      supabase.from('profiles').select('current_day,is_unlocked').eq('id', user.id).single(),
      supabase.from('completed_days').select('day_id').eq('user_id', user.id),
    ])
    profile = profileRes.data
    completedLessons = (completedRes.data || []).map((r: { day_id: number }) => r.day_id)
  }

  return (
    <ProgramClient
      currentLesson={profile?.current_day || 1}
      isUnlocked={profile?.is_unlocked || false}
      completedLessons={completedLessons}
      userId={user?.id}
    />
  )
}
