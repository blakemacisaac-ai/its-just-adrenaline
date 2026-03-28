'use client'
import { useState } from 'react'
import BottomNav from './BottomNav'
import { createClient } from '@/lib/supabase/client'

interface Anchor {
  id: string
  created_at: string
  text: string
  lesson_id: number
  lesson_title: string
  part: string
}

interface Props {
  userId: string
  anchors: Anchor[]
}

export default function AnchorsClient({ userId, anchors: initial }: Props) {
  const [anchors, setAnchors] = useState<Anchor[]>(initial)

  async function deleteAnchor(id: string) {
    const supabase = createClient()
    await supabase.from('anchors').delete().eq('id', id)
    setAnchors(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="app-shell">
      <nav className="navbar">
        <span className="navbar-logo">{"It's Just"} <span>Adrenaline</span></span>
      </nav>

      <div className="page-content fade-up">
        <div className="anchors-header">
          <h2>Anchors</h2>
          <p className="anchors-sub">
            The passages that landed. The truths that broke through.
            When the alarm fires and everything you know seems to vanish —
            open this and read what you saved.
          </p>
        </div>

        {anchors.length === 0 && (
          <div className="anchors-empty">
            <div className="anchors-empty-icon">⚓</div>
            <div className="anchors-empty-title">No anchors yet</div>
            <p>
              As you work through the programme, tap the anchor button
              on any passage that lands for you. It will be saved here —
              your personal collection of the truths that got through.
            </p>
          </div>
        )}

        <div className="anchors-list">
          {anchors.map(anchor => (
            <div key={anchor.id} className="anchor-card">
              <div className="anchor-card-source">
                <span className="anchor-part">{anchor.part}</span>
                <span className="anchor-lesson-title">{anchor.lesson_title}</span>
              </div>
              <blockquote className="anchor-text">{anchor.text}</blockquote>
              <button
                className="anchor-delete"
                onClick={() => deleteAnchor(anchor.id)}
                title="Remove anchor"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {anchors.length >= 3 && (
          <div className="anchors-truth">
            These are your truths. The ones your mind selected.
            Return here whenever the lie feels convincing.
          </div>
        )}
      </div>

      <BottomNav active="anchors" />
    </div>
  )
}
