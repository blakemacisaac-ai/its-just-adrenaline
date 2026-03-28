'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PROGRAM } from '@/lib/program-data'
import styles from './Program.module.css'

interface Props {
  currentDay: number
  isUnlocked: boolean
  completedDays: number[]
}

export default function ProgramClient({ currentDay, isUnlocked, completedDays }: Props) {
  const [activeArc, setActiveArc] = useState(1)
  const arc = PROGRAM[activeArc - 1]

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>Your 28-Day<br />Recovery Program</h2>
        <p className={styles.sub}>Based on the methods of Dr. Claire Weekes &amp; the DARE technique</p>
      </div>

      {/* Arc Tabs — all 3 always visible */}
      <div className={styles.tabs}>
        {PROGRAM.map(a => (
          <button
            key={a.id}
            className={`${styles.tab} ${activeArc === a.id ? styles.tabActive : ''}`}
            onClick={() => setActiveArc(a.id)}
          >
            {a.title}
          </button>
        ))}
      </div>

      {/* Arc info */}
      <div className={styles.arcWrap}>
        <div className={styles.arcInfo}>
          <div className={styles.arcTag}>{arc.tag}</div>
          <div className={styles.arcTitle}>{arc.title}</div>
          <div className={styles.arcDesc}>{arc.desc}</div>
        </div>

        {/* Days — paywall locks individual days, never hides whole arc */}
        {arc.weeks.map(week => (
          <div key={week.label} className={styles.weekGroup}>
            <div className={styles.weekLabel}>{week.label}</div>
            {week.days.map(day => {
              const completed = completedDays.includes(day.id)
              const isToday   = day.id === currentDay
              const locked    = !day.free && !isUnlocked

              return (
                <div
                  key={day.id}
                  className={`${styles.dayRow} ${completed ? styles.completed : ''} ${isToday ? styles.today : ''} ${locked ? styles.locked : ''}`}
                >
                  {locked ? (
                    <Link href="/checkout" className={styles.dayInner}>
                      <div className={styles.dayNum}>{day.id}</div>
                      <div className={styles.dayInfo}>
                        <div className={styles.dayTitle}>{day.title}</div>
                        <div className={styles.dayMeta}>{day.lesson.arc}</div>
                      </div>
                      <span className={styles.lockIcon}>🔒</span>
                    </Link>
                  ) : (
                    <Link href={`/day/${day.id}`} className={styles.dayInner}>
                      <div className={`${styles.dayNum} ${completed ? styles.dayNumDone : isToday ? styles.dayNumToday : ''}`}>
                        {completed ? '✓' : day.id}
                      </div>
                      <div className={styles.dayInfo}>
                        <div className={styles.dayTitle}>{day.title}</div>
                        <div className={styles.dayMeta}>{day.lesson.arc}{isToday ? ' · Today' : ''}</div>
                      </div>
                      {isToday && <span className={styles.todayArrow}>→</span>}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* Upgrade nudge at bottom if not unlocked */}
        {!isUnlocked && (
          <div className={styles.paywall}>
            <h3>Unlock the Full 28 Days</h3>
            <p>Days 1–5 are free. The full programme walks you through understanding, method, and integration.</p>
            <div className={styles.price}>$38</div>
            <div className={styles.priceSub}>One-time · Yours forever · No subscription</div>
            <Link href="/checkout" className="btn btn-primary btn-full">Get the Full Program →</Link>
          </div>
        )}
      </div>
    </div>
  )
}
