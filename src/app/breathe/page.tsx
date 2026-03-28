'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const PHASES = [
  { label: 'Breathe in',  secs: 4, scale: 1.3  },
  { label: 'Hold',        secs: 2, scale: 1.3  },
  { label: 'Breathe out', secs: 6, scale: 0.85 },
]

export default function BreathePage() {
  const router    = useRouter()
  const [running, setRunning]   = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [count, setCount]       = useState(4)
  const [cycles, setCycles]     = useState(0)
  const tickRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const stateRef  = useRef({ phase: 0, count: 4, cycles: 0 })

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
      clearTick()
      setRunning(false)
      setPhaseIdx(0)
      setCount(4)
      setCycles(0)
    } else {
      setRunning(true)
      startCycle(0, 0)
    }
  }

  useEffect(() => () => clearTick(), [])

  const phase = PHASES[phaseIdx]
  const progress = running ? ((PHASES[phaseIdx].secs - count) / PHASES[phaseIdx].secs) : 0

  return (
    <div className="breathe-page">
      <div className="breathe-header">
        <button className="alarm-close" onClick={() => router.push('/')}>✕</button>
        <span className="breathe-title">Slow Exhale Breathing</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="breathe-content">
        <p className="breathe-why">The exhale activates your parasympathetic nervous system — the brake pedal on fight-or-flight. Longer out than in is the medicine.</p>

        <div className="breathe-ring-wrap" onClick={toggle}>
          <svg className="breathe-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--border)" strokeWidth="4" />
            {running && (
              <circle
                cx="100" cy="100" r="88"
                fill="none"
                stroke="var(--accent2)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress)}`}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
            )}
          </svg>
          <div
            className="breathe-orb"
            style={{
              transform: running ? `scale(${phase.scale})` : 'scale(1)',
              transition: running
                ? phaseIdx === 0 ? `transform ${PHASES[0].secs}s ease-in-out`
                : phaseIdx === 1 ? 'transform 0.3s ease'
                : `transform ${PHASES[2].secs}s ease-in-out`
                : 'transform 0.3s ease',
            }}
          />
          <div className="breathe-label">
            {running ? phase.label : 'Tap to begin'}
          </div>
          <div className="breathe-count">
            {running ? count : ''}
          </div>
        </div>

        <div className="breathe-phases">
          {PHASES.map((p, i) => (
            <div key={i} className={`breathe-phase${running && phaseIdx === i ? ' active' : ''}`}>
              <div className="breathe-phase-num">{p.secs}s</div>
              <div className="breathe-phase-label">{p.label}</div>
            </div>
          ))}
        </div>

        {cycles > 0 && (
          <div className="breathe-cycles">{cycles} {cycles === 1 ? 'cycle' : 'cycles'} complete</div>
        )}

        <div className="breathe-tip">
          <strong>4 in · 2 hold · 6 out.</strong> Do this for 5 minutes daily — not just when anxious. The nervous system learns from repetition.
        </div>
      </div>
    </div>
  )
}
