'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PanicPage() {
  const router = useRouter()

  return (
    <div className="panic-hub">
      <div className="panic-hub-header">
        <button className="alarm-close" onClick={() => router.push('/')}>✕</button>
      </div>

      <div className="panic-hub-content">

        {/* The truth — top of page */}
        <div className="panic-truth-card">
          <div className="panic-truth-label">What is happening right now</div>
          <p className="panic-truth-text">
            Your nervous system has fired the alarm. Adrenaline is in your bloodstream.
            It feels like danger. It is not danger. It is a sensitised nervous system
            misfiring — the same chemical as excitement, in a body that has learned
            to be too alert. It will peak and pass. It always does. You have survived
            every single one.
          </p>
        </div>

        {/* The Float — main instruction */}
        <div className="float-steps-card">
          <div className="float-steps-title">The Float</div>
          <div className="float-step">
            <div className="float-step-word">Drop</div>
            <div className="float-step-desc">Shoulders down. Jaw unclenched. Hands open. Soften your belly. Do it now, physically.</div>
          </div>
          <div className="float-step-divider" />
          <div className="float-step">
            <div className="float-step-word">Slow exhale</div>
            <div className="float-step-desc">Breathe in naturally. Breathe out slowly — longer than the inhale. This is the brake pedal on your nervous system.</div>
          </div>
          <div className="float-step-divider" />
          <div className="float-step">
            <div className="float-step-word">Say this</div>
            <div className="float-step-desc italic">"I know what this is. Adrenaline. A sensitised nervous system. Not danger. I'm not going anywhere."</div>
          </div>
          <div className="float-step-divider" />
          <div className="float-step">
            <div className="float-step-word">Float</div>
            <div className="float-step-desc">Don't fight it. Don't flee it. Let it move through you like a wave. Stay soft. It will peak — within minutes — and pass. Every time.</div>
          </div>
        </div>

        {/* Weekes quote */}
        <div className="panic-weekes">
          "Float, don't fight. The wave cannot drown a person who does not resist it."
          <span className="panic-weekes-attr">— Dr. Claire Weekes</span>
        </div>

        {/* Tools */}
        <div className="panic-tools-label">More tools</div>

        <Link href="/breathe" className="panic-tool-card panic-tool-breathe">
          <div className="panic-tool-icon">🫁</div>
          <div>
            <div className="panic-tool-name">Breathing Timer</div>
            <div className="panic-tool-desc">4 in · 6 out. Guided exhale to activate the parasympathetic brake.</div>
          </div>
          <div className="panic-tool-arrow">→</div>
        </Link>

        <Link href="/symptoms" className="panic-tool-card panic-tool-symptoms">
          <div className="panic-tool-icon">🔍</div>
          <div>
            <div className="panic-tool-name">What's Happening To Me</div>
            <div className="panic-tool-desc">Racing heart, derealization, tingling — every symptom explained. None of it dangerous.</div>
          </div>
          <div className="panic-tool-arrow">→</div>
        </Link>

        <Link href="/setback" className="panic-tool-card panic-tool-setback">
          <div className="panic-tool-icon">🌊</div>
          <div>
            <div className="panic-tool-name">Setback Mode</div>
            <div className="panic-tool-desc">Feels like you've gone backwards? This is a wave, not the tide. Start here.</div>
          </div>
          <div className="panic-tool-arrow">→</div>
        </Link>

        {/* Track record */}
        <div className="panic-record">
          <div className="panic-record-num">100%</div>
          <div className="panic-record-text">Your survival rate. Every panic attack you have ever had ended. This one will too.</div>
        </div>

      </div>
    </div>
  )
}
