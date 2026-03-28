import { createClient } from '@/lib/supabase/server'
import { getDayById } from '@/lib/program-data'
import { notFound } from 'next/navigation'
import DayClient from '@/components/DayClient'

export default async function DayPage({ params }: { params: { id: string } }) {
  const dayId = parseInt(params.id)
  const day = getDayById(dayId)
  if (!day) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let journalEntry = null
  let isCompleted = false
  let isTaskDone = false

  if (user) {
    const [profileRes, journalRes, completedRes, taskRes] = await Promise.all([
      supabase.from('profiles').select('is_unlocked,current_day').eq('id', user.id).single(),
      supabase.from('journal_entries').select('content').eq('user_id', user.id).eq('day_id', dayId).single(),
      supabase.from('completed_days').select('id').eq('user_id', user.id).eq('day_id', dayId).single(),
      supabase.from('completed_tasks').select('id').eq('user_id', user.id).eq('day_id', dayId).single(),
    ])
    profile = profileRes.data
    journalEntry = journalRes.data?.content || ''
    isCompleted = !!completedRes.data
    isTaskDone = !!taskRes.data

    // Gate non-free days
    if (!day.free && !profile?.is_unlocked) {
      return (
        <div className="app-shell" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'24px',textAlign:'center'}}>
          <div>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔒</div>
            <h2 style={{marginBottom:'12px'}}>Unlock the Full Program</h2>
            <p style={{color:'var(--muted)',marginBottom:'24px'}}>This day is part of the full 90-day program.</p>
            <a href="/program" className="btn btn-primary">View Program →</a>
          </div>
        </div>
      )
    }
  }

  return (
    <DayClient
      day={day}
      userId={user?.id}
      initialJournal={journalEntry || ''}
      isCompleted={isCompleted}
      isTaskDone={isTaskDone}
      currentDay={profile?.current_day || 1}
    />
  )
}
