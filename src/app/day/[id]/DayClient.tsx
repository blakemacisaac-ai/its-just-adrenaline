'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ProgramDay } from '@/lib/program-data'
import styles from './Day.module.css'

interface Props {
  day: ProgramDay
  userId: string
  initialJournal: string
  isCompleted: boolean
}

export default function DayClient({ day, userId, initialJournal, isCompleted }: Props) {
  const [journal, setJournal]       = useState(initialJournal)
  const [taskDone, setTaskDone]     = useState(false)
  const [completed, setCompleted]   = useState(isCompleted)
  const [saving, setSaving]         = useState(false)
  const [toast, setToast]           = useState('')
  const [toastVisible, setToastVis] = useState(false)

  const supabase = createClient()
  const router   = useRouter()
  const l        = day.lesson

  function showToast(msg: string) {
    setToast(msg); setToastVis(true)
    setTimeout(() => setToastVis(false), 2500)
  }

  async function saveJournal() {
    if (!journal.trim()) { showToast('Write something first'); return }
    setSaving(true)
    await supabase.from('journal_entries').upsert(
      { user_id: userId, day_id: day.id, content: journal, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,day_id' }
    )
    setSaving(false)
    showToast('Journal saved ✓')
  }

  async function markComplete() {
    if (completed) return
    await supabase.from('completed_days').upsert({ user_id: userId, day_id: day.id }, { onConflict: 'user_id,day_id' })
    // Advance current_day on profile
    await supabase.from('profiles').update({ current_day: day.id + 1, streak: 999 }).eq('id', userId) // streak handled server-side ideally
    setCompleted(true)
    showToast('Day ' + day.id + ' complete! 🎉')
    setTimeout(() => router.push('/program'), 1500)
  }

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>←</button>
        <div>
          <div className={styles.dayLabel}>{l.arc}</div>
          <div className={styles.dayNum}>Day {day.id}</div>
        </div>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroArc}>{l.arc}</div>
        <h2 className={styles.heroTitle}>{day.title}</h2>
        <p className={styles.heroIntro}>{l.intro}</p>
      </div>

      {/* Lesson body */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Today&rsquo;s Lesson</div>
        <div className="lesson-body" dangerouslySetInnerHTML={{ __html: l.body }} />
      </div>

      {/* Task */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Daily Task</div>
        <div className={styles.taskCard}>
          <div className={styles.taskHeader}>
            <div className={styles.taskIcon}>{l.task.icon}</div>
            <div>
              <div className={styles.taskTypeLabel}>Task for today</div>
              <div className={styles.taskTitle}>{l.task.title}</div>
            </div>
          </div>
          <p className={styles.taskBody}>{l.task.body}</p>
          <button
            className={`${styles.taskCompleteBtn} ${taskDone ? styles.taskDone : ''}`}
            onClick={() => { setTaskDone(true); showToast('Task done ✓') }}>
            {taskDone ? '✓ Task completed' : '○ Mark as done'}
          </button>
        </div>
      </div>

      {/* Journal */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Journal Prompt</div>
        <div className={styles.journalCard}>
          <p className={styles.journalPrompt}>{l.journal}</p>
          <textarea
            className={styles.journalTextarea}
            placeholder="Write freely here. No one else sees this."
            value={journal}
            onChange={e => setJournal(e.target.value)}
            rows={6}
          />
          <button className={styles.saveBtn} onClick={saveJournal} disabled={saving}>
            {saving ? 'Saving…' : 'Save entry →'}
          </button>
        </div>
      </div>

      {/* Mantra */}
      <div className={styles.mantraCard}>
        <div className={styles.mantraLabel}>Today&rsquo;s Mantra</div>
        <p className={styles.mantraText}>&ldquo;{l.mantra}&rdquo;</p>
      </div>

      {/* Complete button */}
      <div className={styles.completeSection}>
        <button
          className={`btn btn-full ${completed ? styles.completedBtn : 'btn-primary'}`}
          onClick={markComplete}
          disabled={completed}>
          {completed ? '✓ Day Complete' : 'Mark Day Complete →'}
        </button>
      </div>

      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toast}</div>
    </div>
  )
}
