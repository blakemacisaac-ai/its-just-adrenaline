'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const PHASES = [
  { label: 'Breathe in',  secs: 4, scale: 1.25 },
  { label: 'Hold',        secs: 2, scale: 1.25 },
  { label: 'Breathe out', secs: 6, scale: 0.8  },
]

export default function FloatClient() {
  const router = useRouter()
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [count, setCount] = useState(4)
  const [cycles, setCycles] = useState(0)
  const tickRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const stateRef = useRef({ phase: 0, count: 4, cycles: 0 })

  function clearTick() {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
  }

  function startCycle(phaseI: number, c: number) {
    stateRef.current.phase = phaseI
    stateRef.current.count = PHASES[phaseI].secs
    setPhaseIdx(phaseI)
    setCount(PHASES[phaseI].secs)
    tickRef.current = setInterval(() => {
      stateRef.current.count--
      setCount(stateRef.current.count)
      if (stateRef.current.count <= 0) {
        clearTick()
        const nextPhase = (phaseI + 1) % 3
        const newCycles = nextPhase === 0 ? c + 1 : c
        stateRef.current.cycles = newCycles
        setCycles(newCycles)
        setTimeout(() => startCycle(nextPhase, newCycles), 200)
      }
    }, 1000)
  }

  function toggle() {
    if (running) {
      clearTick(); setRunning(false); setPhaseIdx(0); setCount(4); setCycles(0)
    } else {
      setRunning(true); startCycle(0, 0)
    }
  }

  useEffect(() => () => clearTick(), [])

  const phase = PHASES[phaseIdx]

  return (
    <div className="panic-hub">
      <div className="panic-hub-header">
        <button className="alarm-close" onClick={() => router.push('/')}>✕</button>
      </div>

      <div className="panic-hub-content">

        {/* The Float */}
        <div className="float-steps-card">
          <div className="float-steps-title">The Float</div>

          {/* Step 1 — Drop */}
          <div className="float-step">
            <div className="float-step-word">1 · Drop the body</div>
            <div className="float-step-desc">
              When adrenaline fires, every muscle braces as if preparing for impact. This
              is automatic — and it makes everything worse. Physical tension sends the signal
              back to your nervous system that the threat is real, which releases more
              adrenaline, which creates more tension. You break the loop here.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              Shoulders — let them drop from your ears. Jaw — unclench it. Most people are
              clenching right now without realising. Hands — open them, uncurl the fingers.
              Belly — release the tightness you have been holding. Scan your whole body and
              find where you are bracing. Let it go physically, right now.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px', fontStyle:'italic'}}>
              You will not feel calm. The adrenaline is still there. But the body is no
              longer confirming the alarm. That is enough for now.
            </div>
          </div>

          <div className="float-step-divider" />

          {/* Step 2 — Exhale */}
          <div className="float-step">
            <div className="float-step-word">2 · Slow the exhale</div>
            <div className="float-step-desc">
              The exhale is the brake pedal on your nervous system. A slow, extended
              out-breath directly activates the vagus nerve — the main pathway of your
              parasympathetic system, the part that signals: stand down, the threat has
              passed, the alarm can quieten.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              Not deep breathing — that activates fight-or-flight. The exhale specifically.
              Breathe in naturally, however feels right. Then breathe out slowly, longer
              than you breathed in. Four seconds in, six out. Don't force it. Just extend
              the out-breath and let the body follow.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              Use the timer below. Keep the body soft while you breathe.
            </div>
          </div>

          {/* Embedded breathing timer */}
          <div style={{margin:'20px 0', textAlign:'center'}}>
            <div
              style={{
                position:'relative', width:'140px', height:'140px',
                margin:'0 auto 16px', cursor:'pointer'
              }}
              onClick={toggle}
            >
              <svg width="140" height="140" viewBox="0 0 140 140" style={{position:'absolute',top:0,left:0}}>
                <circle cx="70" cy="70" r="62" fill="none" stroke="var(--border)" strokeWidth="3" />
                {running && (
                  <circle
                    cx="70" cy="70" r="62"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 62}`}
                    strokeDashoffset={`${2 * Math.PI * 62 * (1 - (PHASES[phaseIdx].secs - count) / PHASES[phaseIdx].secs)}`}
                    transform="rotate(-90 70 70)"
                    style={{transition:'stroke-dashoffset 0.9s linear'}}
                  />
                )}
              </svg>
              <div style={{
                position:'absolute', inset:0, display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', gap:'4px'
              }}>
                <div style={{
                  width:'70px', height:'70px', borderRadius:'50%',
                  background:'var(--accent)', opacity: running ? 0.15 : 0.08,
                  transform: running ? `scale(${phase.scale})` : 'scale(1)',
                  transition: running
                    ? phaseIdx === 0 ? `transform ${PHASES[0].secs}s ease-in-out`
                    : phaseIdx === 2 ? `transform ${PHASES[2].secs}s ease-in-out`
                    : 'transform 0.3s ease'
                    : 'transform 0.3s ease',
                  position:'absolute'
                }} />
                <div style={{fontFamily:'var(--font-serif)', fontSize:'0.9rem', position:'relative', zIndex:1}}>
                  {running ? phase.label : 'Tap to begin'}
                </div>
                <div style={{fontSize:'1.4rem', fontWeight:'600', color:'var(--accent)', position:'relative', zIndex:1}}>
                  {running ? count : ''}
                </div>
              </div>
            </div>

            <div style={{display:'flex', justifyContent:'center', gap:'20px', marginBottom: cycles > 0 ? '10px' : '0'}}>
              {PHASES.map((p, i) => (
                <div key={i} style={{
                  textAlign:'center', opacity: running && phaseIdx === i ? 1 : 0.4,
                  transition:'opacity 0.3s'
                }}>
                  <div style={{fontSize:'1rem', fontWeight:'700', color:'var(--accent)'}}>{p.secs}s</div>
                  <div style={{fontSize:'0.7rem', color:'var(--muted)'}}>{p.label}</div>
                </div>
              ))}
            </div>
            {cycles > 0 && (
              <div style={{fontSize:'0.8rem', color:'var(--muted)'}}>
                {cycles} {cycles === 1 ? 'cycle' : 'cycles'} — keep going
              </div>
            )}
          </div>

          <div className="float-step-divider" />

          {/* Step 3 — Say this */}
          <div className="float-step">
            <div className="float-step-word">3 · Say this</div>
            <div className="float-step-desc" style={{fontStyle:'italic', marginBottom:'10px'}}>
              "I know what this is. Adrenaline. A sensitised nervous system. Not danger.
              I am not going anywhere."
            </div>
            <div className="float-step-desc">
              This phrase does two things. First, it names what is happening accurately —
              which interrupts the catastrophic story your brain defaults to. "Danger" becomes
              "adrenaline." "Something is wrong with me" becomes "a sensitised nervous system
              misfiring." The bewilderment is what gives it power. The name removes the bewilderment.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              Second, the final words — "I am not going anywhere" — are a commitment to stay
              rather than flee. Fleeing confirms the alarm. Staying disproves it. Say it
              internally. If it doesn't feel true yet, say it anyway. The nervous system
              responds to what you do, not what you feel.
            </div>
          </div>

          <div className="float-step-divider" />

          {/* Step 4 — Float */}
          <div className="float-step">
            <div className="float-step-word">4 · Float</div>
            <div className="float-step-desc">
              Floating is not a technique for making anxiety go away. It is a way of being
              present with the feeling while it passes on its own — which it always does,
              within minutes, every single time.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              Right now every instinct is telling you to fight the feeling, escape it, or
              make it stop. Every one of those responses adds adrenaline to adrenaline. It
              feeds the alarm. Floating is the opposite: you stop adding. You become like a
              rag doll in a wave — present, soft, not resisting. You don't grab the feeling
              and you don't push it away. You let it move through you.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              Keep the shoulders down. Keep the exhale slow. Let the sensations be there.
              Don't monitor them or measure whether it's working — monitoring is a subtle
              form of fighting. Just stay soft and let time pass.
            </div>
            <div className="float-step-desc" style={{marginTop:'10px'}}>
              The peak will come. It lasts minutes. It will pass — it has always passed,
              every single time without exception. When it does, the nervous system has
              recorded something: false alarm, nothing happened, I stayed, the threshold
              can rise. That is how recovery happens — one float at a time.
            </div>
          </div>
        </div>

        {/* Weekes quote */}
        <div className="panic-weekes">
          "Float, don't fight. Loosen your body — go slack, like a rag doll in the wave.
          The wave cannot drown a person who does not resist it."
          <span className="panic-weekes-attr">— Dr. Claire Weekes</span>
        </div>

        {/* Track record */}
        <div className="panic-record">
          <div className="panic-record-num">100%</div>
          <div className="panic-record-text">
            Your survival rate. Every panic attack you have ever had ended.
            Every catastrophe anxiety predicted never arrived. This one will pass too.
          </div>
        </div>

      </div>
    </div>
  )
}
