'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from './BottomNav'
import { createClient } from '@/lib/supabase/client'

interface Entry {
  id: string
  created_at: string
  prediction: string
  intensity: number
  floated: boolean | null
  what_happened: string
  body_sensations: string
  second_fear: string
  insight: string
}

interface Props {
  userId: string
  entries: Entry[]
}

const INTENSITY_LABELS = ['', 'Mild', 'Noticeable', 'Strong', 'Intense', 'Peak']
const INTENSITY_COLORS = ['', '#5a8a6a', '#8a7a4a', '#c8744a', '#b5523f', '#8e2a2a']

export default function JournalClient({ userId, entries: initial }: Props) {
  const [entries, setEntries] = useState<Entry[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [prediction, setPrediction] = useState('')
  const [intensity, setIntensity] = useState<number>(0)
  const [floated, setFloated] = useState<boolean | null>(null)
  const [whatHappened, setWhatHappened] = useState('')
  const [bodySensations, setBodySensations] = useState('')
  const [secondFear, setSecondFear] = useState('')
  const [insight, setInsight] = useState('')

  const router = useRouter()

  function resetForm() {
    setPrediction('')
    setIntensity(0)
    setFloated(null)
    setWhatHappened('')
    setBodySensations('')
    setSecondFear('')
    setInsight('')
  }

  async function saveEntry() {
    if (!prediction || !intensity || !whatHappened) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: userId,
        prediction,
        intensity,
        floated,
        what_happened: whatHappened,
        body_sensations: bodySensations,
        second_fear: secondFear,
        insight,
      })
      .select()
      .single()

    if (!error && data) {
      setEntries([data, ...entries])
      resetForm()
      setShowForm(false)
    }
    setSaving(false)
  }

  // Stats
  const total = entries.length
  const floatedCount = entries.filter(e => e.floated).length
  const avgIntensity = total > 0
    ? (entries.reduce((sum, e) => sum + e.intensity, 0) / total).toFixed(1)
    : '—'

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="navbar-logo">It's Just <span>Adrenaline</span></span>
      </nav>

      <div className="page-content fade-up">

        {/* Header */}
        <div className="journal-header">
          <h2>Your Evidence</h2>
          <p className="journal-sub">
            Every entry here is proof. The alarm made a prediction. Reality disagreed.
            Over time this becomes the most powerful thing you own — your personal,
            documented record that the lie has never once told the truth.
          </p>
        </div>

        {/* Stats row */}
        {total > 0 && (
          <div className="journal-stats">
            <div className="journal-stat">
              <div className="journal-stat-num">{total}</div>
              <div className="journal-stat-label">Episodes logged</div>
            </div>
            <div className="journal-stat">
              <div className="journal-stat-num" style={{color: 'var(--green)'}}>100%</div>
              <div className="journal-stat-label">Survived</div>
            </div>
            <div className="journal-stat">
              <div className="journal-stat-num">{avgIntensity}</div>
              <div className="journal-stat-label">Avg. intensity</div>
            </div>
            <div className="journal-stat">
              <div className="journal-stat-num">{total > 0 ? Math.round((floatedCount/total)*100) : 0}%</div>
              <div className="journal-stat-label">Floated</div>
            </div>
          </div>
        )}

        {/* Log button */}
        <button
          className="journal-log-btn"
          onClick={() => { setShowForm(true); setExpanded(null) }}
        >
          + Log an episode
        </button>

        {/* Form */}
        {showForm && (
          <div className="journal-form">
            <div className="journal-form-title">Log an episode</div>

            {/* Q1 */}
            <div className="journal-q">
              <div className="journal-q-label">What did the alarm tell you was about to happen?</div>
              <div className="journal-q-hint">Write exactly what anxiety predicted — "I was going to die", "I would lose control", "something was seriously wrong", whatever it said.</div>
              <textarea
                className="journal-textarea"
                placeholder="The alarm said..."
                value={prediction}
                onChange={e => setPrediction(e.target.value)}
                rows={3}
              />
            </div>

            {/* Q2 — intensity */}
            <div className="journal-q">
              <div className="journal-q-label">How intense was it?</div>
              <div className="intensity-row">
                {[1,2,3,4,5].map(v => (
                  <button
                    key={v}
                    className={`intensity-btn${intensity === v ? ' selected' : ''}`}
                    style={intensity === v ? { background: INTENSITY_COLORS[v], color: 'white', borderColor: INTENSITY_COLORS[v] } : {}}
                    onClick={() => setIntensity(v)}
                  >
                    <span className="intensity-num">{v}</span>
                    <span className="intensity-label">{INTENSITY_LABELS[v]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 — body */}
            <div className="journal-q">
              <div className="journal-q-label">Where did you feel it in your body?</div>
              <div className="journal-q-hint">Racing heart, tight chest, dizziness, nausea — name the sensations specifically.</div>
              <textarea
                className="journal-textarea"
                placeholder="I felt it as..."
                value={bodySensations}
                onChange={e => setBodySensations(e.target.value)}
                rows={2}
              />
            </div>

            {/* Q4 — second fear */}
            <div className="journal-q">
              <div className="journal-q-label">What did you tell yourself about those sensations?</div>
              <div className="journal-q-hint">This is the Second Fear — the story you added on top of the physical feeling. "Oh no, here it comes." "What if it doesn't stop." "Something must be seriously wrong." Write exactly what your inner voice said.</div>
              <textarea
                className="journal-textarea"
                placeholder="I told myself..."
                value={secondFear}
                onChange={e => setSecondFear(e.target.value)}
                rows={3}
              />
            </div>

            {/* Q5 — float or fight */}
            <div className="journal-q">
              <div className="journal-q-label">Did you float or fight?</div>
              <div className="float-fight-row">
                <button
                  className={`float-fight-btn${floated === true ? ' selected-float' : ''}`}
                  onClick={() => setFloated(true)}
                >
                  🌊 Floated
                </button>
                <button
                  className={`float-fight-btn${floated === false ? ' selected-fight' : ''}`}
                  onClick={() => setFloated(false)}
                >
                  ⚔️ Fought it
                </button>
              </div>
            </div>

            {/* Q5 — what actually happened */}
            <div className="journal-q">
              <div className="journal-q-label">What actually happened?</div>
              <div className="journal-q-hint">Did the catastrophe arrive? Did you die, lose control, go mad? Write exactly what occurred.</div>
              <textarea
                className="journal-textarea"
                placeholder="What actually happened was..."
                value={whatHappened}
                onChange={e => setWhatHappened(e.target.value)}
                rows={3}
              />
            </div>

            {/* Q6 — the gap */}
            <div className="journal-q">
              <div className="journal-q-label">What does the gap tell you?</div>
              <div className="journal-q-hint">The alarm predicted one thing. Reality delivered another. What does that gap mean to you?</div>
              <textarea
                className="journal-textarea"
                placeholder="The gap between the prediction and reality tells me..."
                value={insight}
                onChange={e => setInsight(e.target.value)}
                rows={2}
              />
            </div>

            <div className="journal-form-actions">
              <button
                className="btn btn-primary"
                onClick={saveEntry}
                disabled={saving || !prediction || !intensity || !whatHappened}
              >
                {saving ? 'Saving…' : 'Save to evidence file'}
              </button>
              <button className="journal-cancel" onClick={() => { setShowForm(false); resetForm() }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Entries */}
        {entries.length === 0 && !showForm && (
          <div className="journal-empty">
            <div className="journal-empty-icon">📋</div>
            <div className="journal-empty-title">No episodes logged yet</div>
            <p>After your next anxious moment passes, log it here. Over time you will build an undeniable personal record that the lie has never once told the truth.</p>
          </div>
        )}

        {entries.map(entry => (
          <div
            key={entry.id}
            className="journal-entry"
            onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
          >
            <div className="journal-entry-top">
              <div className="journal-entry-meta">
                <span
                  className="journal-entry-intensity"
                  style={{ background: INTENSITY_COLORS[entry.intensity] + '20', color: INTENSITY_COLORS[entry.intensity] }}
                >
                  {INTENSITY_LABELS[entry.intensity]}
                </span>
                {entry.floated !== null && (
                  <span className="journal-entry-floated">
                    {entry.floated ? '🌊 Floated' : '⚔️ Fought'}
                  </span>
                )}
              </div>
              <div className="journal-entry-date">{formatDate(entry.created_at)}</div>
            </div>

            <div className="journal-entry-prediction">
              <span className="journal-entry-field-label">Alarm predicted: </span>
              {entry.prediction}
            </div>

            {expanded === entry.id && (
              <div className="journal-entry-expanded">
{entry.body_sensations && (
                  <div className="journal-entry-field">
                    <div className="journal-entry-field-label">Body sensations</div>
                    <div className="journal-entry-field-value">{entry.body_sensations}</div>
                  </div>
                )}
                {entry.second_fear && (
                  <div className="journal-entry-field" style={{background:'var(--accent-light)', borderRadius:'10px', padding:'12px'}}>
                    <div className="journal-entry-field-label">Second Fear — what I told myself</div>
                    <div className="journal-entry-field-value" style={{fontStyle:'italic'}}>{entry.second_fear}</div>
                  </div>
                )}
                <div className="journal-entry-gap">
                  <div className="journal-entry-field-label">What actually happened</div>
                  <div className="journal-entry-field-value">{entry.what_happened}</div>
                </div>
                {entry.insight && (
                  <div className="journal-entry-field">
                    <div className="journal-entry-field-label">The gap</div>
                    <div className="journal-entry-field-value journal-insight">{entry.insight}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Bottom truth */}
        {total >= 3 && (
          <div className="journal-truth-card">
            <div className="journal-truth-num">{total}</div>
            <div className="journal-truth-text">
              predictions made. {total} times the alarm said catastrophe was coming.
              <strong> {total} times it was wrong.</strong> That is your track record.
              That is the evidence.
            </div>
          </div>
        )}

      </div>

      <BottomNav active="journal" />
    </div>
  )
}
