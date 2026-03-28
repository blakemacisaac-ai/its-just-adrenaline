'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProgramLesson, Part } from '@/lib/program-data'
import BottomNav from './BottomNav'
import { createClient } from '@/lib/supabase/client'

interface Props {
  lesson: ProgramLesson
  part: Part
  nextLesson: ProgramLesson | null
  prevLesson: ProgramLesson | null
  userId?: string
  isCompleted: boolean
  lessonNumber: number
  totalLessons: number
}

function parseBlocks(html: string): { type: 'p' | 'quote' | 'other'; content: string }[] {
  const blocks: { type: 'p' | 'quote' | 'other'; content: string }[] = []
  const segments = html
    .split(/(<p>.*?<\/p>|<div class="weekes-quote">.*?<\/div>)/gs)
    .filter(s => s.trim())
  for (const seg of segments) {
    if (seg.startsWith('<p>')) {
      const inner = seg.replace(/^<p>/, '').replace(/<\/p>$/, '')
      if (inner.trim()) blocks.push({ type: 'p', content: inner })
    } else if (seg.startsWith('<div class="weekes-quote">')) {
      blocks.push({ type: 'quote', content: seg })
    } else if (seg.trim()) {
      blocks.push({ type: 'other', content: seg })
    }
  }
  return blocks
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

export default function LessonClient({
  lesson, part, nextLesson, prevLesson, userId, isCompleted, lessonNumber, totalLessons
}: Props) {
  const [completed, setCompleted] = useState(isCompleted)
  const [activeTab, setActiveTab] = useState<'lesson'|'task'>('lesson')
  const [savedAnchors, setSavedAnchors] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState('')
  const router = useRouter()

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  async function saveAnchor(text: string) {
    if (!userId || savedAnchors.has(text)) return
    const supabase = createClient()
    const { error } = await supabase.from('anchors').insert({
      user_id: userId,
      text,
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      part: lesson.lesson.part,
    })
    if (!error) {
      setSavedAnchors(prev => new Set([...prev, text]))
      showToast('Saved to Anchors ⚓')
    }
  }

  async function markComplete() {
    if (!userId || completed) return
    try {
      await fetch('/api/complete-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayId: lesson.id })
      })
      setCompleted(true)
    } catch (e) {
      console.error(e)
    }
  }

  const blocks = parseBlocks(lesson.lesson.body)

  return (
    <div className="app-shell">
      <nav className="navbar">
        <button className="nav-back" onClick={() => router.push('/program')}>← Programme</button>
        <Link href="/anchors" className="icon-btn" title="My Anchors">⚓</Link>
      </nav>

      <div className="day-content fade-up">

        <div className="day-header">
          <div className="day-arc-tag">{lesson.lesson.part}</div>
          <h1 className="day-title">{lesson.title}</h1>
          <p className="day-intro">{lesson.lesson.intro}</p>
          <div className="lesson-progress-hint">
            Lesson {lessonNumber} of {totalLessons} · Move on when this lands
          </div>
        </div>

        <div className="day-tabs">
          {(['lesson','task'] as const).map(tab => (
            <button
              key={tab}
              className={`day-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'lesson' ? 'The Lesson' : 'Practice'}
            </button>
          ))}
        </div>

        {activeTab === 'lesson' && (
          <div className="day-body">
            <div className="lesson-body-content">
              {blocks.map((block, i) => {
                if (block.type === 'quote') {
                  return <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />
                }
                if (block.type === 'p') {
                  const plain = stripHtml(block.content)
                  const isSaved = savedAnchors.has(plain)
                  return (
                    <div key={i} className="lesson-para-wrap">
                      <p dangerouslySetInnerHTML={{ __html: block.content }} />
                      {userId && plain.length > 40 && (
                        <button
                          className={`anchor-btn${isSaved ? ' saved' : ''}`}
                          onClick={() => saveAnchor(plain)}
                          title={isSaved ? 'Saved to Anchors' : 'Save to Anchors'}
                        >
                          {isSaved ? '⚓' : '⚓'}
                        </button>
                      )}
                    </div>
                  )
                }
                return <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />
              })}
            </div>

            <div className="anchor-hint">
              Tap ⚓ next to any passage to save it to your Anchors
            </div>

            <div className="mantra-card">
              <div className="mantra-label">Hold onto this</div>
              <div className="mantra-text">{lesson.lesson.mantra}</div>
            </div>
          </div>
        )}

        {activeTab === 'task' && (
          <div className="day-body">
            <div className="task-card">
              <div className="task-icon">{lesson.lesson.task.icon}</div>
              <div className="task-title">{lesson.lesson.task.title}</div>
              <div className="task-body">{lesson.lesson.task.body}</div>
            </div>
            <div className="mantra-card" style={{marginTop:'16px'}}>
              <div className="mantra-label">Remember</div>
              <div className="mantra-text">{lesson.lesson.mantra}</div>
            </div>
          </div>
        )}

        <div className="lesson-footer">
          {!completed && userId && (
            <button className="btn btn-primary btn-full" onClick={markComplete}>
              ✓ I understand this — mark complete
            </button>
          )}
          {completed && (
            <div className="lesson-complete-badge">✓ Complete</div>
          )}
          <div className="lesson-nav-row">
            {prevLesson ? (
              <Link href={`/lesson/${prevLesson.id}`} className="lesson-nav-btn">
                ← {prevLesson.title}
              </Link>
            ) : <div />}
            {nextLesson ? (
              <Link href={`/lesson/${nextLesson.id}`} className="lesson-nav-btn lesson-nav-next">
                {nextLesson.title} →
              </Link>
            ) : (
              <Link href="/program" className="lesson-nav-btn lesson-nav-next">
                Back to Programme →
              </Link>
            )}
          </div>
        </div>

      </div>

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
      <BottomNav active="program" />
    </div>
  )
}
