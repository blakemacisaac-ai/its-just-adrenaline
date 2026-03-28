'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TRUTHS = [
  { icon: '🌊', title: 'This is a wave, not the tide.', body: 'Recovery is not a straight line. The nervous system de-sensitises in surges and ebbs — two steps forward, one back. This moment is the one step back. The tide is still going out. Waves are not the tide.' },
  { icon: '📊', title: 'Your average is still moving.', body: 'Judge your recovery not by today but by the last 4 weeks. Are the good days longer than they were? Are the bad days slightly less bad? That direction is real, and a single hard day does not erase it.' },
  { icon: '🧠', title: 'The nervous system is still healing.', body: 'A sensitised nervous system that is recalibrating will still fire the alarm during stress, illness, tiredness, or for no reason at all. This is the process working, not failing. The alarm firing is not evidence you are back to square one.' },
  { icon: '⚡', title: 'The only thing that makes it a relapse is avoidance.', body: 'A setback becomes a relapse if you respond by avoiding again. As long as you keep facing, keep running A.L.A.R.M., keep moving — this is just a wave. The decision you make right now is the only one that matters.' },
]

export default function SetbackPage() {
  const router = useRouter()
  const [step, setStep] = useState<'land' | 'truths' | 'action'>('land')

  return (
    <div className="setback-page">
      <div className="setback-header">
        <button className="alarm-close" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => router.push('/')}>✕</button>
      </div>

      {step === 'land' && (
        <div className="setback-land fade-up">
          <div className="setback-land-icon">🌊</div>
          <h1 className="setback-land-title">Having a hard day?</h1>
          <p className="setback-land-body">You are not back to square one. Recovery is never a straight line. What you are experiencing right now has a name and an explanation — and it is not failure.</p>
          <button className="setback-btn" onClick={() => setStep('truths')}>Tell me what's happening →</button>
        </div>
      )}

      {step === 'truths' && (
        <div className="setback-truths fade-up">
          <h2 className="setback-truths-title">Here is what is actually happening</h2>
          <div className="setback-truths-list">
            {TRUTHS.map((t, i) => (
              <div key={i} className="setback-truth-card">
                <div className="setback-truth-icon">{t.icon}</div>
                <div>
                  <div className="setback-truth-title">{t.title}</div>
                  <p className="setback-truth-body">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="setback-btn" onClick={() => setStep('action')}>What do I do right now? →</button>
        </div>
      )}

      {step === 'action' && (
        <div className="setback-action fade-up">
          <h2 className="setback-action-title">Right now. These three things.</h2>

          <div className="setback-action-card">
            <div className="setback-action-num">1</div>
            <div>
              <div className="setback-action-label">Run A.L.A.R.M.</div>
              <p className="setback-action-body">Whatever is happening in your body right now — acknowledge it, loosen, allow it, run toward it, keep moving. The method works on setback days too.</p>
              <button className="setback-action-link" onClick={() => router.push('/alarm')}>Open guided A.L.A.R.M. →</button>
            </div>
          </div>

          <div className="setback-action-card">
            <div className="setback-action-num">2</div>
            <div>
              <div className="setback-action-label">Do not avoid anything today.</div>
              <p className="setback-action-body">The single most important decision on a bad day. Stay in the situations. Do the things. Avoidance today is the only thing that turns a wave into a setback that lasts.</p>
            </div>
          </div>

          <div className="setback-action-card">
            <div className="setback-action-num">3</div>
            <div>
              <div className="setback-action-label">Give it time. Don't judge.</div>
              <p className="setback-action-body">Do not measure your recovery by today. Give the wave time to pass. It always does. You have survived every single one. Your track record is perfect.</p>
            </div>
          </div>

          <div className="setback-quote">
            "A setback met with the same acceptance and understanding as the original illness will resolve faster than the original illness."
            <span className="setback-quote-attr">— Dr. Claire Weekes</span>
          </div>

          <button className="setback-btn" onClick={() => router.push('/')}>I've got this. Back to home →</button>
        </div>
      )}
    </div>
  )
}
