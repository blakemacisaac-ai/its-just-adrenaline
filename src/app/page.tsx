import { createClient } from '@/lib/supabase/server'
import HomeClient from '@/components/HomeClient'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let completedLessons: number[] = []

  if (user) {
    const [profileRes, completedRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('completed_days').select('day_id').eq('user_id', user.id),
    ])
    profile = profileRes.data
    completedLessons = (completedRes.data || []).map((r: { day_id: number }) => r.day_id)
  }

  return (
    <HomeClient
      user={user}
      profile={profile}
      completedLessons={completedLessons}
    />
  )
}
