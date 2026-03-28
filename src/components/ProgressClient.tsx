'use client'
import BottomNav from './BottomNav'
import { getAllDays } from '@/lib/program-data'

interface Props {
  checkins: { level: number; created_at: string }[]
  journals: { day_id: number; content: string; updated_at: string }[]
  completedCount: number
}

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function ProgressClient({ checkins, journals, completedCount }: Props) {
  const allDays = getAllDays()
  const recentCheckins = checkins.slice(-7)
  const padded = Array(Math.max(0, 7 - recentCheckins.length)).fill(null).concat(recentCheckins)

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="navbar-logo">It's Just <span>Adrenaline</span></span>
      </nav>

      <div className="page-content fade-up">
        <div className="progress-header">
          <h2>Your Progress</h2>
          <p style={{fontSize:'0.88rem',color:'var(--muted)',marginTop:'6px'}}>Recovery isn't linear — and that's normal.</p>
        </div>

        <div className="chart-card">
          <div className="chart-title">Anxiety Levels This Week</div>
          <div className="chart-sub">Lower is calmer. Progress shows over weeks, not days.</div>
          <div className="mood-bars">
            {padded.map((c, i) => (
              <div key={i} className="mood-bar-col">
                <div
                  className={`mood-bar${c ? ` level-${c.level}` : ''}`}
                  style={{ height: c ? `${(c.level / 5) * 70}px` : '4px', opacity: c ? 1 : 0.2, background: c ? undefined : 'var(--border)' }}
                />
                <div className="mood-bar-day">{DAYS[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-row" style={{margin:'0 24px 24px'}}>
          <div className="stat-card"><div className="stat-num">{completedCount}</div><div className="stat-label">Days Done</div></div>
          <div className="stat-card"><div className="stat-num">{checkins.length}</div><div className="stat-label">Check-ins</div></div>
          <div className="stat-card"><div className="stat-num">{journals.length}</div><div className="stat-label">Journal Entries</div></div>
        </div>

        <div className="section-header">Insights</div>
        <div className="insights-list">
          {[
            { icon: '🔥', title: 'Keep the streak alive', body: 'Consistency matters more than perfection. Even 5 minutes a day rewires your nervous system\'s response over time.' },
            { icon: '🌊', title: 'Setbacks are part of recovery', body: 'Claire Weekes wrote that setbacks are not failure — they are the recovery process itself. Each wave you float through is a lesson.' },
            { icon: '🧠', title: 'Your brain is literally changing', body: 'Each time you face anxiety without fleeing, your amygdala learns: this is safe. That learning is cumulative and permanent.' },
          ].map(i => (
            <div key={i.title} className="insight-card">
              <span className="insight-icon">{i.icon}</span>
              <div>
                <div className="insight-title">{i.title}</div>
                <div className="insight-body">{i.body}</div>
              </div>
            </div>
          ))}
        </div>

        {journals.length > 0 && (
          <>
            <div className="section-header" style={{padding:'0 24px',marginBottom:'14px'}}>Journal History</div>
            <div className="journal-history">
              {journals.map((j, i) => {
                const day = allDays.find(d => d.id === j.day_id)
                const date = new Date(j.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                return (
                  <div key={i} className="journal-entry">
                    <div className="je-date">{date}</div>
                    <div className="je-day">Day {j.day_id}{day ? ` — ${day.title}` : ''}</div>
                    <div className="je-text">{j.content.slice(0, 200)}{j.content.length > 200 ? '…' : ''}</div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      <BottomNav active="progress" />
    </div>
  )
}
