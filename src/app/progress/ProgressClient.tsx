'use client'

import { getAllDays } from '@/lib/program-data'
import styles from './Progress.module.css'

interface Checkin  { checked_at: string; level: number }
interface JEntry   { day_id: number; content: string; updated_at: string }

interface Props {
  streak: number
  currentDay: number
  completedCount: number
  checkins: Checkin[]
  journals: JEntry[]
}

const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function ProgressClient({ streak, currentDay, completedCount, checkins, journals }: Props) {
  const allDays = getAllDays()

  // Build 7-day chart data
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key = d.toISOString().split('T')[0]
    const match = checkins.find(c => c.checked_at === key)
    return { day: DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1], level: match?.level ?? 0 }
  })

  const insights = [
    { icon: '🔥', title: `${streak} day streak`, body: 'Consistency matters more than perfection. Even 5 minutes a day rewires your nervous system\'s response over time.' },
    { icon: '🌊', title: 'Setbacks are data, not failure', body: 'Claire Weekes wrote that setbacks are not failure — they are the recovery process itself. Each wave you float through makes you stronger.' },
    { icon: '🧠', title: 'Your brain is literally changing', body: 'Each time you face anxiety without fleeing, your amygdala learns: this is safe. That learning is cumulative and permanent.' },
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>Your Progress</h2>
        <p className={styles.sub}>Recovery isn&rsquo;t linear — and that&rsquo;s perfectly normal.</p>
      </div>

      {/* Mood chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>Anxiety Levels — Last 7 Days</div>
        <div className={styles.chartSub}>Lower is calmer. Progress shows over weeks, not days.</div>
        <div className={styles.bars}>
          {chartData.map((d, i) => {
            const h = d.level > 0 ? (d.level / 5) * 72 : 4
            const cls = d.level <= 2 ? styles.barLow : d.level === 3 ? styles.barMid : styles.barHigh
            return (
              <div key={i} className={styles.barCol}>
                <div className={`${styles.bar} ${cls}`} style={{ height: `${h}px` }} />
                <div className={styles.barDay}>{d.day}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}><div className={styles.statNum}>{streak}</div><div className={styles.statLab}>Day Streak</div></div>
        <div className={styles.statCard}><div className={styles.statNum}>{completedCount}</div><div className={styles.statLab}>Days Done</div></div>
        <div className={styles.statCard}><div className={styles.statNum}>{currentDay}</div><div className={styles.statLab}>of 90</div></div>
      </div>

      {/* Insights */}
      <span className="section-label">Insights</span>
      <div className={styles.insights}>
        {insights.map((ins, i) => (
          <div key={i} className={styles.insightCard}>
            <div className={styles.insightIcon}>{ins.icon}</div>
            <div>
              <div className={styles.insightTitle}>{ins.title}</div>
              <div className={styles.insightBody}>{ins.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Journal history */}
      <span className="section-label">Journal History</span>
      <div className={styles.journalHistory}>
        {journals.length === 0 ? (
          <div className={styles.emptyState}>Your journal entries will appear here as you complete lessons.</div>
        ) : journals.map((j, i) => {
          const day = allDays.find(d => d.id === j.day_id)
          const date = new Date(j.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          return (
            <div key={i} className={styles.journalCard}>
              <div className={styles.jDate}>{date}</div>
              <div className={styles.jDay}>Day {j.day_id}{day ? ` — ${day.title}` : ''}</div>
              <div className={styles.jText}>{j.content.slice(0, 200)}{j.content.length > 200 ? '…' : ''}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
