'use client'
import Link from 'next/link'
import BottomNav from './BottomNav'
import { PROGRAM } from '@/lib/program-data'

interface Props {
  user: { email?: string; id?: string } | null
  profile: { current_day: number; streak: number; is_unlocked: boolean } | null
  completedLessons: number[]
}

export default function HomeClient({ user, profile, completedLessons }: Props) {
  const currentLesson = profile?.current_day || 1
  const allLessons = PROGRAM.flatMap(p => p.lessons)
  const today = allLessons.find(l => l.id === currentLesson) || allLessons[0]
  const completedCount = completedLessons.length
  const isNew = completedCount === 0

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="navbar-logo">{"It's Just"} <span>Adrenaline</span></span>
        <div className="navbar-actions">
          <Link href="/panic" className="icon-btn" title="The Float">🌊</Link>
          <form action="/auth/signout" method="POST">
            <button className="icon-btn" title="Sign out">↩</button>
          </form>
        </div>
      </nav>

      <div className="page-content fade-up">

        <div className="section-header">
          {isNew ? 'Start here' : 'Continue your programme'}
        </div>
        <Link href={`/lesson/${today.id}`} className="today-card">
          <div className="today-badge">
            📖 Lesson {currentLesson} of {allLessons.length}
            {completedCount > 0 && ` · ${completedCount} done`}
          </div>
          <div className="today-body">
            <div className="today-arc">{today.lesson.part}</div>
            <div className="today-title">{today.title}</div>
            <div className="today-excerpt">{today.lesson.intro}</div>
          </div>
          <div className="today-cta">{isNew ? 'Begin →' : 'Continue →'}</div>
        </Link>

      </div>

      <BottomNav active="home" />
    </div>
  )
}
