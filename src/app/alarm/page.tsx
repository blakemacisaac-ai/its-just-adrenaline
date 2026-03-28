'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
  {
    letter: 'A',
    word: 'Acknowledge',
    colour: '#c8744a',
    headline: 'Name it before Second Fear can speak.',
    instruction: 'Say this out loud, or firmly in your mind:',
    script: '"This is adrenaline. My protection system. Not danger."',
    body: 'You are not dying. You are not going mad. Your body released a chemical. That chemical is burning off right now. This is the same feeling as excitement — same chemical, same sensations. The only difference is the story.',
    cta: 'I said it — next step',
  },
  {
    letter: 'L',
    word: 'Loosen',
    colour: '#4a7c8e',
    headline: 'Your body is bracing. Stop bracing.',
    instruction: 'Do each of these right now:',
    script: 'Drop your shoulders ↓  Unclench your jaw ○  Open your hands ✋  Soften your belly  Breathe out slowly…',
    body: 'Every tense muscle sends a signal to your nervous system: threat confirmed. Loosening sends the opposite signal. You do not wait to feel calm — you loosen, and calm follows. The body leads. The mind follows.',
    cta: 'I loosened — next step',
  },
  {
    letter: 'A',
    word: 'Allow',
    colour: '#5a8a6a',
    headline: 'Stop trying to make it stop.',
    instruction: 'Say this and mean it as much as you can:',
    script: '"You can be here. I know what you are. I am not fighting you."',
    body: 'Fighting anxiety is like pulling on a Chinese finger trap — it tightens the grip. The moment you stop pulling, the trap releases. You do not need to escape this. You need to let it be here. The adrenaline has nothing to feed on when you stop adding Second Fear.',
    cta: 'I allowed it — next step',
  },
  {
    letter: 'R',
    word: 'Run Toward',
    colour: '#8e6a4a',
    headline: 'Don\'t just tolerate it. Meet it.',
    instruction: 'Say this — even if it feels wrong:',
    script: '"Is that all you\'ve got? Bring it on. I know exactly what you are."',
    body: 'This is where the power shifts. Instead of anxiety having power over you, you are moving toward it with confidence. Anxiety and excitement are the same sensation. When you lean in, your brain begins to reclassify what the feeling means. Not threat. Not danger. Just adrenaline.',
    cta: 'I ran toward it — next step',
  },
  {
    letter: 'M',
    word: 'Move',
    colour: '#7a5a8e',
    headline: 'Keep living. Anxiety is a passenger.',
    instruction: 'Get on with what you were doing:',
    script: 'Walk. Talk. Work. Drive. Stay in the room. Let anxiety ride along — it is not the driver.',
    body: 'If you stop and wait for it to pass, you teach your nervous system that the feeling requires special handling — that it is significant enough to pause your life for. But if you keep moving with it present, you send the most powerful signal possible: false alarm. Life continues. Nothing happened.',
    cta: 'Done — I kept moving',
  },
]

export default function AlarmPage() {
  const router  = useRouter()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  function next() {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      setDone(true)
    }
  }

  const s = STEPS[step]

  if (done) {
    return (
      <div className="alarm-page" style={{ background: 'var(--bg)' }}>
        <div className="alarm-done">
          <div className="alarm-done-icon">✓</div>
          <h2 className="alarm-done-title">You did it.</h2>
          <p className="alarm-done-body">You ran the full A.L.A.R.M. response. Every step. That is the work. Every time you do this, you write new data into your nervous system: false alarm. I stayed. Nothing happened.</p>
          <p className="alarm-done-track">Your track record remains perfect.</p>
          <button className="alarm-done-btn" onClick={() => router.push('/')}>Back to home</button>
          <button className="alarm-done-secondary" onClick={() => { setStep(0); setDone(false) }}>Run it again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="alarm-page" style={{ '--step-colour': s.colour } as React.CSSProperties}>
      <div className="alarm-header">
        <button className="alarm-close" onClick={() => router.push('/')}>✕</button>
        <div className="alarm-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={`alarm-pip${i <= step ? ' active' : ''}`} style={i <= step ? { background: s.colour } : {}} />
          ))}
        </div>
        <div style={{ width: 32 }} />
      </div>

      <div className="alarm-content">
        <div className="alarm-letter" style={{ color: s.colour }}>{s.letter}</div>
        <div className="alarm-word" style={{ color: s.colour }}>{s.word}</div>
        <h2 className="alarm-headline">{s.headline}</h2>

        <div className="alarm-instruction">{s.instruction}</div>
        <div className="alarm-script" style={{ borderColor: s.colour, background: s.colour + '15' }}>
          {s.script}
        </div>

        <p className="alarm-body">{s.body}</p>
      </div>

      <div className="alarm-footer">
        <div className="alarm-step-count">{step + 1} of {STEPS.length}</div>
        <button className="alarm-cta" style={{ background: s.colour }} onClick={next}>
          {s.cta} →
        </button>
      </div>
    </div>
  )
}
