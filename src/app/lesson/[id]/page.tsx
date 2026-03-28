import { createClient } from '@/lib/supabase/server'
import { getLessonById, getPartForLesson, getAllLessons } from '@/lib/program-data'
import LessonClient from '@/components/LessonClient'
import { notFound } from 'next/navigation'

export default async function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = parseInt(params.id)
  const lesson = getLessonById(lessonId)
  if (!lesson) notFound()

  const part = getPartForLesson(lessonId)
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex(l => l.id === lessonId)
  const nextLesson = allLessons[currentIndex + 1] || null
  const prevLesson = allLessons[currentIndex - 1] || null

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isUnlocked = lesson.free
  let isCompleted = false

  if (user) {
    const [profileRes, completedRes] = await Promise.all([
      supabase.from('profiles').select('is_unlocked').eq('id', user.id).single(),
      supabase.from('completed_days').select('day_id').eq('user_id', user.id).eq('day_id', lessonId).single(),
    ])
    isUnlocked = lesson.free || profileRes.data?.is_unlocked || false
    isCompleted = !!completedRes.data
  }

  if (!isUnlocked) {
    return (
      <div className="app-shell">
        <nav className="navbar">
          <span className="navbar-logo">It's Just <span>Adrenaline</span></span>
        </nav>
        <div className="page-content" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',padding:'40px 24px',textAlign:'center'}}>
          <div style={{fontSize:'2rem',marginBottom:'16px'}}>🔒</div>
          <h2 style={{fontFamily:'var(--font-serif)',marginBottom:'12px'}}>Unlock the Full Programme</h2>
          <p style={{color:'var(--muted)',marginBottom:'28px',lineHeight:'1.6'}}>This lesson is part of the full programme. One payment, lifetime access, no subscription.</p>
          <a href="/checkout" className="btn btn-primary">Unlock for $67 →</a>
        </div>
      </div>
    )
  }

  return (
    <LessonClient
      lesson={lesson}
      part={part!}
      nextLesson={nextLesson}
      prevLesson={prevLesson}
      userId={user?.id}
      isCompleted={isCompleted}
      lessonNumber={currentIndex + 1}
      totalLessons={allLessons.length}
    />
  )
}
