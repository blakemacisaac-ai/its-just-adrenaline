'use client'
import { useState, useRef } from 'react'
import BottomNav from './BottomNav'
import { createClient } from '@/lib/supabase/client'

interface Entry {
  id: string
  created_at: string
  fear: string
  intensity: number
  duration_mins: number
  outcome: string
  location?: string
}

interface Props {
  userId: string
  entries: Entry[]
}

const INTENSITY_LABELS = ['', 'Mild', 'Moderate', 'Strong', 'Intense', 'Peak']
const INTENSITY_COLORS = ['', '#4caf50', '#8bc34a', '#ff9800', '#f44336', '#9c27b0']

const OUTCOME_DEFAULTS = [
  'Nothing happened. I was fine.',
  'The feeling passed on its own.',
  'I stayed and it subsided.',
  'I felt uncomfortable but I was safe.',
]

export default function EvidenceClient({ userId, entries: initial }: Props) {
  const [entries, setEntries]     = useState<Entry[]>(initial)
  const [showForm, setShowForm]   = useState(false)
  const [saving, setSaving]       = useState(false)
  const [toast, setToast]         = useState('')
  const [expandedId, setExpanded] = useState<string | null>(null)

  // Use refs for form values to avoid stale closure issues
  const fearRef     = useRef('')
  const outcomeRef  = useRef('')
  const locationRef = useRef('')
  const durationRef = useRef('')

  // Also keep display state for controlled inputs
  const [fearVal, setFearVal]         = useState('')
  const [outcomeVal, setOutcomeVal]   = useState('')
  const [locationVal, setLocationVal] = useState('')
  const [durationVal, setDurationVal] = useState('')
  const [intensity, setIntensity]     = useState(3)

  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(''), 3000)
  }

  function resetForm() {
    setFearVal(''); fearRef.current = ''
    setOutcomeVal(''); outcomeRef.current = ''
    setLocationVal(''); locationRef.current = ''
    setDurationVal(''); durationRef.current = ''
    setIntensity(3)
  }

  function openForm() {
    resetForm()
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    resetForm()
  }

  function setOutcomeDefault(val: string) {
    setOutcomeVal(val)
    outcomeRef.current = val
  }

  async function saveEntry() {
    const fearValue    = fearRef.current.trim()
    const outcomeValue = outcomeRef.current.trim()

    if (!fearValue) {
      showToast('Please describe what you feared')
      return
    }
    if (!outcomeValue) {
      showToast('Please write what actually happened')
      return
    }

    setSaving(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('evidence_entries')
      .insert({
        user_id:      userId,
        fear:         fearValue,
        intensity,
        duration_mins: parseInt(durationRef.current) || 0,
        outcome:      outcomeValue,
        location:     locationRef.current.trim() || null,
      })
      .select()
      .single()

    setSaving(false)

    if (error) {
      showToast('Something went wrong — try again')
      console.error(error)
      return
    }

    if (data) {
      setEntries(prev => [data, ...prev])
      closeForm()
      showToast('Episode logged ✓')
    }
  }

  const total      = entries.length
  const pct        = total > 0 ? 100 : 0
  const avgDuration = total > 0
    ? Math.round(entries.reduce((s, e) => s + (e.duration_mins || 0), 0) / total)
    : 0

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="app-shell" style={{ paddingBottom: 100 }}>
      <nav className="navbar">
        <span className="navbar-logo">It's Just <span>Adrenaline</span></span>
      </nav>

      <div className="page-content fade-up">

        <div className="ev-header">
          <h1 className="ev-title">Your Evidence</h1>
          <p className="ev-subtitle">Your personal proof that the lie has never once told the truth.</p>
        </div>

        {/* Stats */}
        <div className="ev-stats">
          <div className="ev-stat">
            <div className="ev-stat-num">{total}</div>
            <div className="ev-stat-label">Episodes logged</div>
          </div>
          <div className="ev-stat ev-stat-highlight">
            <div className="ev-stat-num">{pct}%</div>
            <div className="ev-stat-label">Nothing bad happened</div>
          </div>
          <div className="ev-stat">
            <div className="ev-stat-num">{avgDuration || '—'}</div>
            <div className="ev-stat-label">Avg. minutes</div>
          </div>
        </div>

        {total > 0 && (
          <>
            <div className="ev-truth-bar">
              <div className="ev-truth-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="ev-truth-label">
              {total} out of {total} episodes — nothing bad happened. <strong>Every single time.</strong>
            </div>
          </>
        )}

        <button className="ev-log-btn" onClick={openForm}>
          + Log an episode
        </button>

        {/* Empty state */}
        {total === 0 && !showForm && (
          <div className="ev-empty">
            <div className="ev-empty-icon">📋</div>
            <div className="ev-empty-title">No episodes logged yet</div>
            <p className="ev-empty-sub">After your next anxious moment passes, log it here. Over time you will build undeniable proof that the lie has never once told the truth.</p>
          </div>
        )}

        {/* Entry list */}
        {entries.map(entry => (
          <div
            key={entry.id}
            className="ev-entry"
            onClick={() => setExpanded(expandedId === entry.id ? null : entry.id)}
          >
            <div className="ev-entry-header">
              <div className="ev-entry-meta">
                <span className="ev-entry-date">{formatDate(entry.created_at)}</span>
                {entry.location && <span className="ev-entry-location">· {entry.location}</span>}
              </div>
              <div className="ev-entry-badges">
                <span
                  className="ev-entry-intensity"
                  style={{ background: INTENSITY_COLORS[entry.intensity] + '22', color: INTENSITY_COLORS[entry.intensity] }}
                >
                  Level {entry.intensity}
                </span>
                {entry.duration_mins > 0 && (
                  <span className="ev-entry-duration">{entry.duration_mins} min</span>
                )}
              </div>
            </div>

            {expandedId === entry.id ? (
              <div className="ev-entry-expanded">
                <div className="ev-entry-section">
                  <span className="ev-entry-section-label">😰 What I feared</span>
                  <p className="ev-entry-text">{entry.fear}</p>
                </div>
                <div className="ev-entry-divider" />
                <div className="ev-entry-section">
                  <span className="ev-entry-section-label">✓ What actually happened</span>
                  <p className="ev-entry-text ev-entry-outcome">{entry.outcome}</p>
                </div>
              </div>
            ) : (
              <div className="ev-entry-preview">
                <span className="ev-entry-fear-preview">{entry.fear}</span>
                <span className="ev-entry-result">→ Nothing happened</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form — rendered outside scroll area to avoid stacking issues */}
      {showForm && (
        <div className="ev-form-overlay">
          <div className="ev-form">
            <div className="ev-form-title">Log an episode</div>
            <p className="ev-form-sub">Fill this in after the anxiety has passed — while the contrast is fresh.</p>

            <div className="ev-field">
              <label className="ev-label">What did you fear would happen?</label>
              <textarea
                className="textarea"
                rows={3}
                placeholder="e.g. I feared I was having a heart attack and would collapse."
                value={fearVal}
                onChange={e => { setFearVal(e.target.value); fearRef.current = e.target.value }}
              />
            </div>

            <div className="ev-field">
              <label className="ev-label">Intensity (1–5)</label>
              <div className="ev-intensity-row">
                {[1,2,3,4,5].map(v => (
                  <button
                    key={v}
                    className={`ev-intensity-btn${intensity === v ? ' selected' : ''}`}
                    style={intensity === v ? { background: INTENSITY_COLORS[v], borderColor: INTENSITY_COLORS[v] } : {}}
                    onClick={() => setIntensity(v)}
                  >
                    <span>{v}</span>
                    <span className="ev-intensity-label">{INTENSITY_LABELS[v]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ev-field">
              <label className="ev-label">How long did it last? (minutes)</label>
              <input
                className="ev-input"
                type="number"
                placeholder="e.g. 8"
                value={durationVal}
                onChange={e => { setDurationVal(e.target.value); durationRef.current = e.target.value }}
              />
            </div>

            <div className="ev-field">
              <label className="ev-label">What actually happened?</label>
              <div className="ev-defaults">
                {OUTCOME_DEFAULTS.map(d => (
                  <button key={d} className="ev-default-btn" onClick={() => setOutcomeDefault(d)}>
                    {d}
                  </button>
                ))}
              </div>
              <textarea
                className="textarea"
                rows={2}
                placeholder="Or write your own..."
                value={outcomeVal}
                onChange={e => { setOutcomeVal(e.target.value); outcomeRef.current = e.target.value }}
              />
            </div>

            <div className="ev-field">
              <label className="ev-label">Where were you? (optional)</label>
              <input
                className="ev-input"
                placeholder="e.g. Supermarket, driving, at work..."
                value={locationVal}
                onChange={e => { setLocationVal(e.target.value); locationRef.current = e.target.value }}
              />
            </div>

            <div className="ev-form-actions">
              <button className="ev-cancel-btn" onClick={closeForm}>Cancel</button>
              <button className="ev-save-btn" onClick={saveEntry} disabled={saving}>
                {saving ? 'Saving…' : 'Add to evidence →'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="evidence" />
      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
    </div>
  )
}
