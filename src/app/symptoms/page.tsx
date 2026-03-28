'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SYMPTOMS = [
  {
    id: 'heart',
    icon: '💓',
    name: 'Racing Heart',
    aka: 'Palpitations · Heart pounding · Skipped beats',
    colour: '#c8744a',
    what: 'Your heart is suddenly hammering, pounding, or fluttering. It might feel like it\'s beating irregularly, too fast, or about to burst out of your chest.',
    why: 'Adrenaline tells the heart to beat faster to pump more blood to your muscles — preparing you to run or fight. Every beat you feel is your heart doing its job with unusual efficiency. The "pounding" sensation is simply your heart contracting more forcefully than usual.',
    safe: 'A healthy heart can sustain a rate of 180-200 beats per minute during intense exercise for extended periods. Panic-related heart racing is far below this ceiling and stops naturally when adrenaline clears — within minutes.',
    reframe: 'Your heart is strong and working. This is the same feeling as sprinting — not a heart attack.',
  },
  {
    id: 'derealisation',
    icon: '🌫️',
    name: 'Derealization',
    aka: 'Unreality · Dissociation · "Am I going mad?"',
    colour: '#4a7c8e',
    what: 'The world around you feels unreal, dreamlike, or like you\'re watching yourself from outside. Familiar places look strange. You feel detached from your surroundings or your own body. It\'s one of the most frightening anxiety symptoms — and one of the least understood.',
    why: 'Adrenaline causes hyperventilation — breathing faster and shallower than normal. This reduces CO2 in your blood, which causes blood vessels to narrow slightly. The reduced blood flow to the brain\'s visual and perceptual centres creates the dreamlike, unreal quality. It is 100% reversible and stops the moment breathing normalises.',
    safe: 'Derealization has never caused anyone to "go mad," lose their mind, or become permanently disconnected from reality. It is a temporary perceptual effect of changed blood CO2 levels. It is not a psychiatric emergency. It is chemistry.',
    reframe: 'This dreamlike feeling is CO2 levels in your blood — nothing more. Slow your exhale and it will pass.',
  },
  {
    id: 'thoughts',
    icon: '🌀',
    name: 'Racing Thoughts',
    aka: 'Mind spinning · Can\'t stop thinking · Thought spirals',
    colour: '#7a5a8e',
    what: 'Your mind is racing, jumping between catastrophic thoughts faster than you can process them. "What if" thoughts multiply. You can\'t slow down or control where your mind goes. Each frightening thought seems to spawn three more.',
    why: 'Adrenaline heightens alertness and sharpens threat-detection — it\'s designed to rapidly scan for danger. In a sensitised nervous system with no real physical threat to focus on, this scanning turns inward, cycling through potential threats compulsively. The racing is your threat-detection system in overdrive with nothing real to find.',
    safe: 'Racing thoughts cannot cause madness, brain damage, or loss of control. The mind will not race forever — when adrenaline clears, the scanning slows. Every person who has ever had a thought spiral has eventually stopped having it.',
    reframe: 'Your mind is scanning for a threat that isn\'t there. It will stop scanning when the adrenaline clears.',
  },
  {
    id: 'breath',
    icon: '🫁',
    name: 'Breathlessness',
    aka: 'Chest tightness · Can\'t get a full breath · Smothering feeling',
    colour: '#5a8a6a',
    what: 'You feel like you can\'t get a full breath, like your chest is tight or heavy, like you\'re being smothered. Paradoxically, you might feel this way while actually breathing faster than normal.',
    why: 'Adrenaline triggers faster, shallower breathing to take in more oxygen for the muscles. This can create a paradox: you\'re breathing more than usual but feel breathless. The tightness is the chest muscles tensing as part of the alarm response. The "can\'t get a full breath" feeling is often hyperventilation — too much breathing, not too little.',
    safe: 'You are not suffocating. Your blood oxygen is normal or elevated. The smothering feeling is a sensation caused by muscle tension and breathing pattern — not actual oxygen shortage. Slowing the exhale (longer out than in) resolves it directly.',
    reframe: 'You are not running out of air. Slow your exhale — longer out than in — and the sensation will ease.',
  },
  {
    id: 'nausea',
    icon: '🤢',
    name: 'Nausea',
    aka: 'Stomach churning · Feeling sick · Digestive discomfort',
    colour: '#8a7a4a',
    what: 'Your stomach is churning, you feel nauseous, or you might feel the urge to use the bathroom urgently. Eating feels impossible. There might be cramping or a hollow, sick feeling in your gut.',
    why: 'Adrenaline shunts blood away from the digestive system toward the muscles and heart. Digestion literally stops. The stomach churning is the digestive system shutting down mid-process. The nausea is your body\'s efficient reprioritisation — it\'s not wasting energy on digesting food when it thinks you\'re facing a threat.',
    safe: 'Anxiety-related nausea is not illness. You are not about to vomit uncontrollably. The sensation is uncomfortable but harmless and temporary — it resolves as soon as the adrenaline clears and blood returns to the digestive system.',
    reframe: 'Your body stopped digesting to send energy to your muscles. Normal. Uncomfortable. Temporary.',
  },
  {
    id: 'trembling',
    icon: '🫨',
    name: 'Trembling',
    aka: 'Shaking · Legs like jelly · Internal vibration',
    colour: '#c8744a',
    what: 'Your hands shake, your legs feel weak or like they might give way, your whole body might tremble, or you feel a deep internal vibrating sensation that nobody else can see.',
    why: 'Adrenaline floods the muscles with glucose and tenses them for action. When there\'s no physical action (running, fighting), the muscles are primed but unused — creating the trembling and shaking as the energy has nowhere to go. "Legs like jelly" is the leg muscles being simultaneously tensed and weakened by the competing signals.',
    safe: 'Your legs will not give way. The trembling is muscles with too much energy, not muscles about to fail. Physical movement — walking, even pacing — burns the adrenaline and stops the shaking faster than anything else.',
    reframe: 'Your muscles are loaded with energy and ready to run. Walk or move — it burns the adrenaline directly.',
  },
  {
    id: 'heat',
    icon: '🔥',
    name: 'Hot Flushes & Sweating',
    aka: 'Sudden heat · Cold sweats · Flushing · Chills',
    colour: '#d4822a',
    what: 'A sudden wave of heat, or cold and clammy sweating, or rapid alternation between hot and cold. You might go red, feel your face flush, or notice cold sweat despite feeling hot internally.',
    why: 'Adrenaline redirects blood flow to the large muscles and away from the skin — creating the flushed or pale appearance. Sweating is your body\'s cooling system activating pre-emptively, preparing for the physical exertion it expects. The paradoxical hot/cold sensations are blood flow shifting rapidly between the skin and core.',
    safe: 'You are not developing a fever. You are not physically ill. The sweating and flushing are your body\'s cooling and circulation systems working correctly — just activated by a false alarm rather than actual physical exertion.',
    reframe: 'Your body is cooling itself for exercise that isn\'t happening. The flush and sweat are readiness, not illness.',
  },
  {
    id: 'tingling',
    icon: '⚡',
    name: 'Tingling & Numbness',
    aka: 'Pins and needles · Numb hands or face · Electric sensations',
    colour: '#4a7c8e',
    what: 'Tingling or numbness in the hands, feet, or face — often the lips and fingertips. Sometimes an electric or buzzing sensation. Sometimes the face feels strange or numb. This symptom frequently triggers the fear of a stroke.',
    why: 'Hyperventilation (fast shallow breathing during panic) reduces CO2 in the blood, which causes blood vessels to constrict slightly. The extremities — hands, feet, face — receive slightly less blood flow first, creating the tingling and numbness. It is entirely caused by breathing pattern and is 100% reversible.',
    safe: 'This is not a stroke. Stroke numbness is persistent, one-sided, and accompanied by other neurological symptoms. Anxiety tingling is bilateral (both sides), temporary, and resolves completely when breathing normalises. Every time. Without exception.',
    reframe: 'This is CO2 and blood flow — not a stroke. Slow your exhale and it will clear within minutes.',
  },
]

export default function SymptomsPage() {
  const router = useRouter()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="symptoms-page">
      <div className="symptoms-header-bar">
        <button className="alarm-close" onClick={() => router.back()}>✕</button>
      </div>

      <div className="symptoms-hero">
        <div className="symptoms-hero-tag">What's Happening To Me</div>
        <h1 className="symptoms-hero-title">Every symptom explained.</h1>
        <p className="symptoms-hero-sub">Everything you feel during anxiety has a direct physiological cause. None of it is dangerous. All of it is adrenaline doing its job.</p>
      </div>

      <div className="symptoms-list">
        {SYMPTOMS.map(s => (
          <div
            key={s.id}
            className={`symptom-card${expanded === s.id ? ' expanded' : ''}`}
            onClick={() => setExpanded(expanded === s.id ? null : s.id)}
          >
            <div className="symptom-card-header">
              <div className="symptom-icon-wrap" style={{ background: s.colour + '18' }}>
                <span className="symptom-icon">{s.icon}</span>
              </div>
              <div className="symptom-name-wrap">
                <div className="symptom-name">{s.name}</div>
                <div className="symptom-aka">{s.aka}</div>
              </div>
              <div className="symptom-chevron" style={{ transform: expanded === s.id ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</div>
            </div>

            {expanded === s.id && (
              <div className="symptom-body">
                <div className="symptom-section">
                  <div className="symptom-section-label" style={{ color: s.colour }}>What it feels like</div>
                  <p className="symptom-text">{s.what}</p>
                </div>

                <div className="symptom-divider" />

                <div className="symptom-section">
                  <div className="symptom-section-label" style={{ color: s.colour }}>What's actually causing it</div>
                  <p className="symptom-text">{s.why}</p>
                </div>

                <div className="symptom-divider" />

                <div className="symptom-section">
                  <div className="symptom-section-label" style={{ color: s.colour }}>Why it's not dangerous</div>
                  <p className="symptom-text">{s.safe}</p>
                </div>

                <div className="symptom-reframe" style={{ borderColor: s.colour, background: s.colour + '12' }}>
                  <span className="symptom-reframe-label">Remember</span>
                  <p className="symptom-reframe-text">{s.reframe}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="symptoms-footer">
        <p>Every symptom on this page has the same root cause: adrenaline. Every single one is temporary. Every single one resolves when the adrenaline clears — in minutes, every time.</p>
      </div>
    </div>
  )
}
