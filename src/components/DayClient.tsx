'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Day } from '@/lib/program-data'
import { createClient } from '@/lib/supabase/client'

interface Props {
  day: Day
  userId?: string
  initialJournal: string
  isCompleted: boolean
  isTaskDone: boolean
  currentDay: number
}

export default function DayClient({ day, userId, initialJournal, isCompleted, isTaskDone, currentDay }: Props) {
  const router = useRouter()
  const [journal, setJournal] = useState(initialJournal)
  const [taskDone, setTaskDone] = useState(isTaskDone)
  const [completed, setCompleted] = useState(isCompleted)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const l = day.lesson

  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(''), 2500)
  }

  async function saveJournal() {
    if (!journal.trim()) { showToast('Write something first'); return }
    setSaving(true)
    const supabase = createClient()
    await supabase.from('journal_entries').upsert(
      { user_id: userId, day_id: day.id, content: journal },
      { onConflict: 'user_id,day_id' }
    )
    setSaving(false)
    showToast('Journal saved ✓')
  }

  async function completeTask() {
    setTaskDone(true)
    const supabase = createClient()
    await supabase.from('completed_tasks').upsert(
      { user_id: userId, day_id: day.id },
      { onConflict: 'user_id,day_id' }
    )
    showToast('Task done ✓')
  }

  async function markDayDone() {
    setCompleted(true)
    const supabase = createClient()
    await Promise.all([
      supabase.from('completed_days').upsert({ user_id: userId, day_id: day.id }, { onConflict: 'user_id,day_id' }),
      supabase.from('profiles').update({ current_day: day.id + 1, streak: currentDay + 1 }).eq('id', userId),
    ])
    showToast(`Day ${day.id} complete! 🎉`)
    setTimeout(() => router.push('/program'), 1500)
  }

  return (
    <div className="app-shell" style={{paddingBottom:'40px'}}>
      <div className="lesson-header">
        <button className="back-btn" onClick={() => router.back()}>←</button>
        <div className="lesson-header-info">
          <div className="lesson-day-label">{l.arc}</div>
          <div className="lesson-header-title">Day {day.id}</div>
        </div>
      </div>

      <div className="lesson-hero">
        <div className="lesson-arc-tag">{l.arc}</div>
        <div className="lesson-title">{day.title}</div>
        <div className="lesson-intro">{l.intro}</div>
      </div>

      <div className="lesson-section">
        <div className="section-label" style={{marginBottom:'16px'}}>Today's Lesson</div>
        <div className="lesson-body" dangerouslySetInnerHTML={{ __html: l.body }} />
      </div>

      {/* DAILY TASK */}
      <div className="lesson-section">
        <div className="section-label" style={{marginBottom:'16px'}}>Daily Task</div>
        <div className="task-card">
          <div className="task-header">
            <span className="task-icon">{l.task.icon}</span>
            <div>
              <div className="task-type">Task for today</div>
              <div className="task-title">{l.task.title}</div>
            </div>
          </div>
          <div className="task-body">{l.task.body}</div>
          <button className={`task-done-btn${taskDone ? ' done' : ''}`} onClick={completeTask}>
            {taskDone ? '✓ Task completed' : '○ Mark as done'}
          </button>
        </div>
      </div>

      {/* JOURNAL — just the reflection prompt + textarea */}
      <div className="lesson-section">
        <div className="section-label" style={{marginBottom:'16px'}}>Today's Journal</div>
        <div className="journal-card">
          <div className="journal-prompt-block">
            <p className="journal-prompt-text">{l.journal}</p>
          </div>
          <textarea
            className="textarea"
            placeholder="Write freely here. Only you can see this."
            value={journal}
            onChange={e => setJournal(e.target.value)}
            rows={7}
          />
          <div className="journal-footer">
            <span className="journal-hint">Entries appear in your Progress page</span>
            <button className="save-journal-btn" onClick={saveJournal} disabled={saving}>
              {saving ? 'Saving…' : 'Save entry →'}
            </button>
          </div>
        </div>
      </div>

      <div className="mantra-card">
        <div className="mantra-label">Today's Mantra</div>
        <div className="mantra-text">"{l.mantra}"</div>
      </div>

      <div className="mark-done-wrap">
        <button
          className="btn btn-full"
          style={{background: completed ? 'var(--green)' : 'var(--accent)', color:'white'}}
          onClick={markDayDone}
        >
          {completed ? '✓ Day Complete' : 'Mark Day Complete →'}
        </button>
      </div>

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
    </div>
  )
}
