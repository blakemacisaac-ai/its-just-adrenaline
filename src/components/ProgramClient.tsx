'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import BottomNav from './BottomNav'
import { PROGRAM } from '@/lib/program-data'
import { loadStripe } from '@stripe/stripe-js'

interface Props {
  currentLesson: number
  isUnlocked: boolean
  completedLessons: number[]
  userId?: string
}

export default function ProgramClient({ currentLesson, isUnlocked, completedLessons }: Props) {
  const [activePart, setActivePart] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handlePurchase() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const { sessionId } = await res.json()
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const part = PROGRAM[activePart - 1]
  const totalLessons = PROGRAM.flatMap(p => p.lessons).length
  const completedCount = completedLessons.length

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="navbar-logo">It's Just <span>Adrenaline</span></span>
      </nav>

      <div className="page-content fade-up">
        <div className="program-header">
          <h2>Your Recovery<br />Programme</h2>
          <p style={{fontSize:'0.88rem',color:'var(--muted)',marginTop:'8px'}}>Based on the methods of Dr. Claire Weekes</p>
          <p style={{fontSize:'0.8rem',color:'var(--muted)',marginTop:'4px'}}>Move on when you understand — not on a schedule.</p>
        </div>

        {/* Progress */}
        <div className="program-progress-bar-wrap">
          <div className="program-progress-bar">
            <div className="program-progress-fill" style={{width: `${(completedCount / totalLessons) * 100}%`}} />
          </div>
          <div className="program-progress-label">{completedCount} of {totalLessons} lessons</div>
        </div>

        {/* Part tabs */}
        <div className="arc-tabs">
          {PROGRAM.map(p => (
            <button
              key={p.id}
              className={`arc-tab${activePart === p.id ? ' active' : ''}`}
              onClick={() => setActivePart(p.id)}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="arc-section">
          <div className="arc-tag">{part.tag}</div>
          <div className="arc-title">{part.title}</div>
          <div className="arc-desc">{part.desc}</div>

          {/* Lessons */}
          <div className="week-group" style={{marginTop: '20px'}}>
            {part.lessons.map((lesson, idx) => {
              const completed = completedLessons.includes(lesson.id)
              const isCurrent = lesson.id === currentLesson
              const locked = !lesson.free && !isUnlocked
              let cls = 'day-row'
              if (completed) cls += ' completed'
              else if (isCurrent) cls += ' active-day'
              if (locked) cls += ' locked'

              if (locked) return (
                <Link key={lesson.id} href="/checkout" className={cls}>
                  <div className="day-num" style={{fontSize:'0.75rem'}}>
                    {idx + 1 + (activePart === 2 ? PROGRAM[0].lessons.length : 0)}
                  </div>
                  <div className="day-info">
                    <div className="day-title-text">{lesson.title}</div>
                    <div className="day-meta-text">{lesson.lesson.part}</div>
                  </div>
                  <span style={{fontSize:'14px',opacity:0.4}}>🔒</span>
                </Link>
              )

              return (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`} className={cls}>
                  <div className="day-num" style={{fontSize: completed ? '1rem' : '0.75rem'}}>
                    {completed ? '✓' : idx + 1 + (activePart === 2 ? PROGRAM[0].lessons.length : 0)}
                  </div>
                  <div className="day-info">
                    <div className="day-title-text">{lesson.title}</div>
                    <div className="day-meta-text">{lesson.lesson.part}{isCurrent ? ' · Continue here' : ''}</div>
                  </div>
                  {isCurrent && <span style={{fontSize:'18px', color:'var(--accent)'}}>→</span>}
                </Link>
              )
            })}
          </div>

          {/* Upgrade nudge */}
          {!isUnlocked && (
            <div className="paywall-banner">
              <h3>Unlock the Full Programme</h3>
              <p>The first 5 lessons are free. Unlock both parts, all 21 lessons, and every tool — yours for life.</p>
              <div className="price-tag">$67</div>
              <span className="price-sub">One-time · No subscription · Lifetime access</span>
              <button className="btn btn-primary btn-full" onClick={handlePurchase} disabled={loading}>
                {loading ? 'Loading…' : 'Get the Full Programme →'}
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="program" />
    </div>
  )
}
