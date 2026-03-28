'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getAllDays } from '@/lib/program-data'
import styles from './Home.module.css'

interface Profile {
  id: string
  full_name: string
  current_day: number
  streak: number
  is_unlocked: boolean
}

interface Checkin {
  checked_at: string
  level: number
}

interface Props {
  profile: Profile | null
  checkins: Checkin[]
  checkedInToday: boolean
  completedCount: number
}

const CHECKIN_LABELS = ['', 'Calm 😌', 'Mild 🙂', 'Tense 😐', 'High 😟', 'Peak 😰']
const CHECKIN_MSGS = ['', "Beautiful. Float through the day.", "You're doing well. Keep going.", "That's okay. You know what this is.", "Hard moment. You have the tools.", "You know exactly what to do. Let's go."]

export default function HomeClient({ profile, checkins, checkedInToday, completedCount }: Props) {
  const [checkinDone, setCheckinDone] = useState(checkedInToday)
  const [checkinVal, setCheckinVal] = useState<number | null>(null)
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const supabase = createClient()
  const currentDay = profile?.current_day ?? 1
  const streak = profile?.streak ?? 0
  const name = profile?.full_name?.split(' ')[0] ?? 'there'

  const allDays = getAllDays()
  const todayLesson = allDays.find(d => d.id === currentDay) ?? allDays[0]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  function showToast(msg: string) {
    setToast(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  async function doCheckin(level: number) {
    setCheckinVal(level)
    setCheckinDone(true)
    const { error } = await supabase.from('checkins').upsert({
      user_id: profile!.id,
      checked_at: new Date().toISOString().split('T')[0],
      level
    }, { onConflict: 'user_id,checked_at' })
    if (!error) showToast('Check-in saved ✓')
  }

  const PRINCIPLES = [
    { icon: '👁️', word: 'Face',         desc: 'Stop running. Turn toward the feeling.' },
    { icon: '🤲', word: 'Accept',       desc: "Don't fight or add \"second fear.\"" },
    { icon: '🌊', word: 'Float',        desc: 'Soften. Move through, not against.' },
    { icon: '⏳', word: 'Let time pass', desc: 'Setbacks are waves. They pass.' },
  ]

  return (
    <>
      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.greeting}>{greeting}, {name}</div>
          <h1 className={styles.title}>
            How&rsquo;s your<br /><em>nervous system</em><br />today?
          </h1>
        </div>

        {/* Check-in */}
        <div className={styles.checkinCard}>
          {checkinDone ? (
            <div className={styles.checkinDone}>
              <div className={styles.checkinLabel}>Today&rsquo;s Check-in ✓</div>
              <div className={styles.checkinMsg}>
                Level <strong>{checkinVal ?? '—'} — {CHECKIN_LABELS[checkinVal ?? 0]}</strong>
                <br /><br />
                {CHECKIN_MSGS[checkinVal ?? 0]}
              </div>
            </div>
          ) : (
            <>
              <div className={styles.checkinLabel}>Daily Check-in</div>
              <div className={styles.checkinQ}>Rate your anxiety level right now</div>
              <div className={styles.nsScale}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} className={styles.nsBtn} onClick={() => doCheckin(n)}>
                    <span className={styles.nsNum}>{n}</span>
                    <span className={styles.nsLab}>{['Calm','Mild','Tense','High','Peak'][n-1]}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Today's lesson */}
        <Link href={`/day/${todayLesson.id}`} className={styles.todayCard}>
          <div className={styles.todayBadge}>📖 Today&rsquo;s Practice — Day {currentDay}</div>
          <div className={styles.todayBody}>
            <div className={styles.todayArc}>{todayLesson.lesson.arc}</div>
            <div className={styles.todayTitle}>{todayLesson.title}</div>
            <div className={styles.todayExcerpt}>{todayLesson.lesson.intro}</div>
            <div className={styles.todayMeta}>
              <span className={styles.pill}>📚 5 min read</span>
              <span className={styles.pill}>✍️ Journal</span>
              <span className={styles.pill}>🎯 Task</span>
            </div>
          </div>
        </Link>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}><div className={styles.statNum}>{streak}</div><div className={styles.statLab}>Day Streak 🔥</div></div>
          <div className={styles.statCard}><div className={styles.statNum}>{completedCount}</div><div className={styles.statLab}>Days Done ✓</div></div>
          <div className={styles.statCard}><div className={styles.statNum}>{currentDay}</div><div className={styles.statLab}>of 90 Days</div></div>
        </div>

        {/* Principles */}
        <span className="section-label">The 4 Principles · Claire Weekes</span>
        <div className={styles.principlesGrid}>
          {PRINCIPLES.map(p => (
            <div key={p.word} className={styles.principleCard}
              onClick={() => showToast(`${p.word}: ${p.desc}`)}>
              <div className={styles.pIcon}>{p.icon}</div>
              <div className={styles.pWord}>{p.word}</div>
              <div className={styles.pDesc}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Panic button */}
        <Link href="/panic" className={styles.panicBtn}>
          <div className={styles.panicLeft}>
            <div className={styles.panicIcon}>⚡</div>
            <div>
              <div className={styles.panicTitle}>Panic Pocket</div>
              <div className={styles.panicSub}>Feeling it right now? Tap here.</div>
            </div>
          </div>
          <span>→</span>
        </Link>
      </div>

      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toast}</div>
    </>
  )
}
