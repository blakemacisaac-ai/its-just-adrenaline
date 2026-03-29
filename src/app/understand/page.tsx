'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'

const SYMPTOMS = [
  {
    id: 'heart',
    icon: '💓',
    name: 'Racing heart',
    aka: 'Palpitations · Heart pounding · Skipped beats',
    colour: '#c8744a',
    what: 'Your heart is suddenly hammering, pounding, or fluttering. It might feel like it\'s beating irregularly, too fast, or about to burst out of your chest.',
    why: 'Adrenaline binds to receptors in the heart and tells the SA node — the heart\'s natural pacemaker — to fire faster. Heart rate can jump from a resting 60–70 bpm to over 120 within seconds. Each contraction is also stronger, pumping more blood to the muscles. The pounding you feel is your heart doing its job with unusual force. Not failing. Not attacking. Working.',
    safe: 'A healthy heart can sustain 180–200 bpm during intense exercise for extended periods. Panic-related racing is far below this ceiling and stops naturally when adrenaline clears — within minutes. Every time.',
    reframe: 'Your heart is strong and working correctly. This is the same feeling as sprinting — not a heart attack.',
  },
  {
    id: 'chest',
    icon: '🫁',
    name: 'Breathlessness & chest tightness',
    aka: 'Chest pain · Can\'t get a full breath · Smothering feeling',
    colour: '#5a8a6a',
    what: 'You feel like you can\'t get a full breath, like your chest is tight or heavy, like you\'re being smothered. Sometimes there is genuine chest pain — squeezing, burning, or pressure — that feels indistinguishable from a cardiac event.',
    why: 'Three things happen simultaneously. First, the chest muscles tense under the alarm response. Second, breathing quickens and shallows, creating a paradox: you\'re breathing more than usual but feel breathless. Third — and this is the one that sends people to emergency rooms — the oesophagus runs directly behind the heart and can spasm under sympathetic activation, producing a squeezing mid-chest pressure almost identical to cardiac pain. Scans come back normal. The cause is muscular spasm, not cardiac pathology.',
    safe: 'You are not having a heart attack. You are not suffocating. Your blood oxygen is normal or elevated. The breathlessness feeling is caused by too much breathing, not too little.',
    reframe: 'Slow the exhale — longer out than in. The chest will release. This is muscle tension and breathing, not your heart.',
  },
  {
    id: 'derealisation',
    icon: '🌫️',
    name: 'Derealization',
    aka: 'Unreality · Dissociation · "Am I going mad?"',
    colour: '#4a7c8e',
    what: 'The world around you feels unreal, dreamlike, or like you\'re watching yourself from outside. Familiar places look strange. You feel detached from your surroundings or your own body.',
    why: 'Rapid breathing during anxiety lowers CO2 in the blood. CO2 regulates the diameter of the cerebral arteries — less CO2, the arteries narrow. Studies show cerebral blood flow can drop by up to 40% during sustained hyperventilation. The brain\'s visual and perceptual centres, receiving less blood, produce the dreamlike, unreal, "behind glass" quality. It is blood chemistry. Not madness. Not a breakdown.',
    safe: 'Derealization has never caused anyone to lose their mind, become permanently disconnected, or suffer neurological damage. It is a temporary perceptual effect of blood CO2 levels. It resolves completely, every time, within minutes of breathing normalising.',
    reframe: 'This dreamlike feeling is CO2 levels in your blood. Slow your exhale and it will clear.',
  },
  {
    id: 'tingling',
    icon: '⚡',
    name: 'Tingling & numbness',
    aka: 'Pins and needles · Numb hands or face · Electric sensations',
    colour: '#4a7c8e',
    what: 'Tingling or numbness in the hands, feet, or face — often the lips and fingertips. Sometimes an electric or buzzing sensation. This symptom frequently triggers the fear of a stroke.',
    why: 'The same CO2 drop from hyperventilation shifts how calcium behaves in the blood. Calcium is essential for normal nerve function — less available calcium makes nerves fire more easily and unpredictably. The extremities, with their small blood vessels, are also the first to feel peripheral vasoconstriction. The result: tingling, numbness, pins and needles in the hands, feet, lips, and face.',
    safe: 'This is not a stroke. Stroke numbness is persistent, one-sided, and accompanied by other neurological symptoms. Anxiety tingling is bilateral, temporary, and resolves completely when breathing normalises. Without exception.',
    reframe: 'CO2 and blood flow — not a stroke. Slow your exhale and it will clear within minutes.',
  },
  {
    id: 'nausea',
    icon: '🤢',
    name: 'Nausea',
    aka: 'Stomach churning · Feeling sick · Urgent bathroom need',
    colour: '#8a7a4a',
    what: 'Your stomach is churning, you feel nauseous, or you might feel the urgent need to use the bathroom. Eating feels impossible. A hollow, sick feeling sits in your gut.',
    why: 'Digestion is a parasympathetic function — "rest and digest." When adrenaline activates the sympathetic system, it simultaneously suppresses the parasympathetic. Blood is redirected from the digestive system to the muscles. Digestion stops mid-process. The gut has its own nervous system — the enteric nervous system — and it reacts directly and immediately to adrenaline. The churning, sick feeling is your body efficiently deprioritising digestion.',
    safe: 'Anxiety-related nausea is not illness. It resolves as soon as the adrenaline clears and blood returns to the digestive system. Uncomfortable. Temporary. Not dangerous.',
    reframe: 'Your body stopped digesting to send energy to your muscles. Normal. It will restart when the alarm quietens.',
  },
  {
    id: 'trembling',
    icon: '🫨',
    name: 'Trembling & weak legs',
    aka: 'Shaking · Legs like jelly · Internal vibration',
    colour: '#c8744a',
    what: 'Your hands shake, your legs feel weak or like they might give way, your whole body might tremble. Sometimes a deep internal vibrating sensation nobody else can see.',
    why: 'Adrenaline floods the muscles with glucose and primes them for action. With no physical outlet — no running, no fighting — the muscles are loaded with energy and nowhere to put it. They tremble. The "legs like jelly" feeling is the leg muscles simultaneously primed and trembling with unused energy, combined with a slight disruption to proprioception — the sense of knowing where your body is in space — as the nervous system recalibrates.',
    safe: 'Your legs will not give way. No one collapses from anxiety alone. The trembling is muscles with too much energy, not muscles about to fail. Movement — walking, pacing — burns the adrenaline directly.',
    reframe: 'Your muscles are loaded with energy and ready to run. Walk if you can — it burns the adrenaline.',
  },
  {
    id: 'heat',
    icon: '🔥',
    name: 'Sweating & flushing',
    aka: 'Sudden heat · Cold sweats · Flushing · Chills',
    colour: '#d4822a',
    what: 'A sudden wave of heat, or cold and clammy sweating, or rapid alternation between hot and cold. You might go red, feel your face flush, or notice cold sweat despite feeling hot internally.',
    why: 'Adrenaline activates the body\'s cooling system pre-emptively — expecting intense physical exertion, it begins sweating before the exertion starts. Blood is redirected from the skin to core muscles, creating the flush or pallor. The paradoxical hot/cold sensations are blood flow shifting rapidly between the skin and core as the system activates.',
    safe: 'You are not developing a fever. You are not physically ill. The sweating and flushing are your body\'s cooling and circulation systems working correctly — activated by a false alarm rather than actual exertion.',
    reframe: 'Your body is cooling itself for exercise that isn\'t happening. Readiness, not illness.',
  },
  {
    id: 'vision',
    icon: '👁️',
    name: 'Visual disturbances',
    aka: 'Tunnel vision · Blurring · Light sensitivity · Spots',
    colour: '#7a5a8e',
    what: 'Unusual sensitivity to light, blurring, or a narrowing of the visual field. Under extreme activation, the world seems to shrink to a central cone.',
    why: 'Adrenaline dilates the pupils to admit more light — useful for scanning dark environments for threats. In normal daylight, this creates photosensitivity and glare. The focusing muscles of the eye are also disrupted by the autonomic imbalance, producing blurring. Under extreme sympathetic activation, the visual field itself literally narrows — tunnel vision. The brain prioritises forward threat-detection and filters peripheral awareness.',
    safe: 'None of this represents eye damage or neurological injury. All of it reverses completely as adrenaline clears.',
    reframe: 'Your eyes are scanning for a threat. They will settle when the adrenaline does.',
  },
  {
    id: 'mouth',
    icon: '🫙',
    name: 'Dry mouth',
    aka: 'Sticky mouth · Difficulty swallowing',
    colour: '#5a8a6a',
    what: 'A sudden dry, sticky mouth that arrives with the anxiety — making it difficult to speak, swallow, or eat.',
    why: 'Saliva production is a parasympathetic function. The moment the sympathetic alarm fires, it suppresses the salivary glands. There is no evolutionary need for digestion when facing a threat. The dry mouth arrives within seconds and is one of the most immediate and reliable signs of sympathetic activation.',
    safe: 'Completely harmless and completely reversible. As soon as the alarm quietens, saliva returns.',
    reframe: 'Your salivary glands have been switched off temporarily. They will switch back on.',
  },
  {
    id: 'exhaustion',
    icon: '🪫',
    name: 'Exhaustion despite doing nothing',
    aka: 'Fatigue · Wiped out · Heavy body',
    colour: '#8a7a4a',
    what: 'A bone-deep tiredness that doesn\'t match your level of physical activity. You have done nothing all day. You are exhausted.',
    why: 'Muscles held in continuous low-level tension under sustained adrenaline burn energy constantly — without any physical movement to show for it. The anxiety sufferer who hasn\'t left the house has been running a race inside their own body all day. Add to this the metabolic cost of sustained cortisol, the disrupted sleep that anxiety causes, and the cognitive load of a threat-scanning brain that never quite switches off.',
    safe: 'This exhaustion is a physiological reality, not weakness or laziness. The body has been working hard. It needs rest — not more alarm.',
    reframe: 'You have been running a race. The exhaustion is real. Rest is not failure.',
  },
  {
    id: 'doom',
    icon: '😨',
    name: 'Sense of doom',
    aka: 'Certainty something terrible will happen · Impending catastrophe',
    colour: '#c8744a',
    what: 'An overwhelming conviction that something terrible is about to happen — that you are about to die, collapse, lose your mind, or face catastrophe. It arrives with total certainty.',
    why: 'The amygdala communicates in one language: danger. When flooded with adrenaline it sends the maximum alarm signal. The certainty you feel is not evidence of an incoming catastrophe — it is the emotional output of a maximally activated amygdala with no specific target. It doesn\'t know what the threat is. It just knows the alarm is at full volume. The cortex, partially suppressed, cannot override this with rational analysis.',
    safe: 'Check your track record. Every time this feeling has arrived — every single time — the catastrophe it predicted did not come. Not once. The alarm has never once told the truth about this.',
    reframe: 'This is the alarm at full volume — not a prediction of reality. It has never once been right.',
  },
]

const THINKING_BLOCKS = [
  {
    title: 'Why you can\'t think clearly when anxious',
    body: [
      'When adrenaline fires, it doesn\'t just change your body — it changes your brain. The amygdala, your threat-detection centre, activates and partially overrides the prefrontal cortex — the seat of rational thought, perspective, and clear reasoning. High levels of noradrenaline actually cause measurable retraction of the synaptic connections in the prefrontal cortex. Your rational brain doesn\'t go offline completely, but it goes quiet. The threat-scanner takes over.',
      'The threat-scanner does one thing: it looks for danger. It does this fast, broadly, and without nuance. It pattern-matches at speed and flags anything that could conceivably be a threat. In a genuinely dangerous situation this is lifesaving. In a sensitised nervous system with no real threat present, it turns inward — scanning your body, scanning your thoughts, scanning the room — and finding danger everywhere it looks.',
      'The thoughts this produces feel like clear reasoning. They don\'t feel like a frightened smoke detector making noise. They feel like insight. That is the trick. The emotional certainty of the amygdala mimics the clarity of rational thought — but it is not rational thought. It is threat-detection in overdrive, producing conclusions without evidence.',
    ]
  },
  {
    title: 'The proof they aren\'t real: they don\'t survive calm',
    body: [
      'Take the most frightening thought from your last anxiety episode. Look at it now, calmly. Does it have the same weight? The same terrible inevitability? Almost certainly not. It probably looks exaggerated, or faintly absurd.',
      'What changed? Not the content of the thought. Not the facts it refers to. The brain chemistry changed. The adrenaline cleared. The prefrontal cortex came back online. The amygdala\'s activation decreased. The same thought, processed through a functioning brain, looks like what it always was: a hypothesis generated by a frightened nervous system.',
      'The conviction of an anxious thought is not a measure of its truth. It is a measure of the amygdala\'s current activation level. A real conclusion reached by a functioning rational mind does not dissolve when a chemical clears from your bloodstream. Only adrenaline-generated fear does that. The thoughts were never true. They were produced by a frightened brain doing what frightened brains do.',
    ]
  },
  {
    title: 'Why the thoughts loop — and why you can\'t just stop',
    body: [
      'Alongside adrenaline, the alarm response releases cortisol — a stress hormone that keeps the nervous system on high alert. Cortisol affects the hippocampus and prefrontal cortex, keeping threat-related material active and compulsively accessible. The brain returns to the perceived threat again and again — not as a choice, but as a physiological process. It is trying to solve a problem that has no rational solution, because there is no actual problem.',
      '"Just don\'t think about it" is useless advice. Psychologist Daniel Wegner demonstrated why: tell someone not to think about a white bear and they ring a bell every time they do. They ring it constantly. The act of suppression requires constantly monitoring whether you\'re thinking the suppressed thought — which means thinking it. The harder you try to push the thought away, the more the brain flags it as important. The fight with the thought is exactly what keeps the thought alive.',
    ]
  },
  {
    title: 'Sticky thoughts — why some feel impossible to dislodge',
    body: [
      'Some thoughts don\'t just loop — they stick. They return with images, certainties, questions that demand answers: What if? What if? What if? The more disturbing the content, the stickier it tends to be — because the amygdala flags high-threat content for priority processing. It keeps returning because it believes it is protecting you.',
      'What makes a sticky thought sticky is not its content. It is the relationship you have with it. A thought you can observe neutrally — "there\'s that thought again" — passes through. A thought you fight, argue with, try to answer, try to eliminate, or seek reassurance about gets amplified. Every engagement signals to the amygdala: this is important, keep monitoring this. The thought is not the problem. The fight with the thought is the problem.',
    ]
  },
  {
    title: 'Thought-action fusion: when having a thought feels like doing it',
    body: [
      '"If I thought it, it must mean something about me." "If I keep thinking about it, maybe I\'ll do it." These conclusions feel like moral insights. They are not. They are what happens when a frightened amygdala tags a thought as a threat and the partially-offline prefrontal cortex cannot supply the corrective: thoughts are not actions, thoughts are not character, thoughts are not predictions.',
      'The people who experience the most distressing intrusive thoughts are almost always the people least likely to act on them. The distress is itself the evidence — a person with genuine harmful impulses does not experience those thoughts with horror. They experience them with indifference. Horror is the response of a mind that finds the thought completely unacceptable. The thought says nothing about you. It says everything about the state of your nervous system.',
      'The mechanism that keeps these thoughts sticky is identical: fighting them, checking whether you\'re still thinking them, seeking reassurance that you\'re not a bad person — all of it confirms to the amygdala that the content is threatening and important. The way out is the same as every anxious thought: allow it to be there without engaging. The thought can be there. You are still you.',
    ]
  },
  {
    title: 'What to do: allow, don\'t fight',
    body: [
      'Dr. Claire Weekes had a specific instruction for anxious thoughts: float past them. Not fight them. Not argue with them. Not seek reassurance about them. Not try to answer the "what if." Float past them — observe without engaging, let them be there, and continue.',
      'The "what if" question generated by an adrenaline-flooded amygdala has no satisfying answer — because it was never a real question. It was an alarm making noise. Answering it is like arguing with a smoke detector. Every attempt to get the thought to stop confirms to the nervous system that the thought is dangerous and important.',
      'The practice: when the thought arrives, notice it without engaging. Name it — "there is that thought, I know what it is, it does not require a response" — then return your attention to whatever you were doing. Not because the thought has gone. It may still be there. But the thought can be there while you go to the supermarket, have a conversation, do your work, live your life. Without the fight, it has nothing to feed on. It loses urgency. The nervous system, through accumulated non-responses, learns: this is not important. Over time, the thought comes less often. Eventually it barely registers at all.',
    ]
  },
]

export default function UnderstandPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'body' | 'mind'>('body')
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="app-shell">
      <nav className="navbar">
        <button className="nav-back" onClick={() => router.back()}>← Back</button>
        <span className="navbar-logo">{"It's Just"} <span>Adrenaline</span></span>
        <div style={{width: 80}} />
      </nav>

      <div className="page-content fade-up" style={{paddingBottom: '100px'}}>

        <div style={{padding: '24px 0 8px'}}>
          <div style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'10px'}}>
            Demystified
          </div>
          <h1 style={{fontFamily:'var(--font-serif)', fontSize:'1.8rem', fontWeight:700, color:'var(--ink)', lineHeight:1.15, marginBottom:'12px'}}>
            What anxiety actually is
          </h1>
          <p style={{fontSize:'0.9rem', color:'var(--muted)', lineHeight:1.7}}>
            Every symptom. Every thought. Every sensation. All of it has a direct physiological cause — and none of it is dangerous.
          </p>
        </div>

        {/* Tabs */}
        <div className="day-tabs" style={{marginBottom: '4px'}}>
          <button
            className={`day-tab${tab === 'body' ? ' active' : ''}`}
            onClick={() => { setTab('body'); setExpanded(null) }}
          >
            Your body
          </button>
          <button
            className={`day-tab${tab === 'mind' ? ' active' : ''}`}
            onClick={() => { setTab('mind'); setExpanded(null) }}
          >
            Your mind
          </button>
        </div>

        {tab === 'body' && (
          <>
            <p style={{fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.7, padding:'16px 0 8px'}}>
              Every physical symptom of anxiety maps directly to adrenaline doing its job.
              The racing heart, the breathlessness, the derealization, the trembling — none of it is random,
              none of it is dangerous, and all of it is temporary. Tap any symptom to see exactly what is causing it.
            </p>
            <div className="symptoms-list" style={{padding: '8px 0'}}>
              {SYMPTOMS.map(s => (
                <div
                  key={s.id}
                  className={`symptom-card${expanded === s.id ? ' expanded' : ''}`}
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                >
                  <div className="symptom-card-header">
                    <div className="symptom-icon-wrap" style={{background: s.colour + '18'}}>
                      <span className="symptom-icon">{s.icon}</span>
                    </div>
                    <div className="symptom-name-wrap">
                      <div className="symptom-name">{s.name}</div>
                      <div className="symptom-aka">{s.aka}</div>
                    </div>
                    <div className="symptom-chevron" style={{transform: expanded === s.id ? 'rotate(90deg)' : 'rotate(0deg)'}}>›</div>
                  </div>

                  {expanded === s.id && (
                    <div className="symptom-body">
                      <div className="symptom-section">
                        <div className="symptom-section-label" style={{color: s.colour}}>What it feels like</div>
                        <p className="symptom-text">{s.what}</p>
                      </div>
                      <div className="symptom-divider" />
                      <div className="symptom-section">
                        <div className="symptom-section-label" style={{color: s.colour}}>What's actually causing it</div>
                        <p className="symptom-text">{s.why}</p>
                      </div>
                      <div className="symptom-divider" />
                      <div className="symptom-section">
                        <div className="symptom-section-label" style={{color: s.colour}}>Why it's not dangerous</div>
                        <p className="symptom-text">{s.safe}</p>
                      </div>
                      <div className="symptom-reframe" style={{borderColor: s.colour, background: s.colour + '12'}}>
                        <span className="symptom-reframe-label">Remember</span>
                        <p className="symptom-reframe-text">{s.reframe}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="symptoms-footer">
              <p>Same chemical. Same alarm system. Every symptom. Every single time.</p>
            </div>
          </>
        )}

        {tab === 'mind' && (
          <>
            <p style={{fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.7, padding:'16px 0 20px'}}>
              Adrenaline doesn't just change your body — it changes your brain. The looping thoughts,
              the catastrophic certainties, the thoughts that feel true in the moment and absurd when calm —
              all of it has a physiological explanation. None of it is you. All of it is chemistry.
            </p>

            {/* The specific thoughts */}
            <div style={{marginBottom: '32px'}}>
              <div style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px'}}>
                The thoughts that feel most real when anxious
              </div>
              {[
                { thought: '"What if I\'m losing my mind?"', truth: 'You are not. The amygdala produces this thought because "going mad" is a threat. It is the alarm making noise — not a psychiatric assessment. When calm, this thought will look like what it is.' },
                { thought: '"What if I stop breathing?"', truth: 'You cannot. Breathing is controlled by the brainstem — not by willpower or thought. It is not physically possible to forget to breathe. Your body will never allow that to happen.' },
                { thought: '"What if this is a heart attack?"', truth: 'The fear of a heart attack is itself adrenaline-generated, which adds more adrenaline, which increases the heart rate, which feels more like a heart attack. The cycle feeds itself. You have survived every one of these.' },
                { thought: '"I\'m broken. I will never get better."', truth: 'This is an exhausted brain flooded with cortisol making long-term predictions from a position of maximum fear. It has never once been right about this. The nervous system heals.' },
                { thought: '"Something terrible is about to happen."', truth: 'Check your track record. This feeling has arrived hundreds of times. How many times has the terrible thing actually happened? The alarm has never once told the truth about this.' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px 0',
                  borderBottom: '1px solid var(--border)',
                  ...(i === 0 ? {borderTop: '1px solid var(--border)'} : {})
                }}>
                  <div style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'1rem', color:'var(--ink)', marginBottom:'8px', lineHeight:1.4}}>
                    {item.thought}
                  </div>
                  <div style={{fontSize:'0.83rem', color:'var(--muted)', lineHeight:1.7}}>
                    {item.truth}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep blocks */}
            {THINKING_BLOCKS.map((block, i) => (
              <div key={i} style={{marginBottom: '36px'}}>
                <div style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px'}}>
                  {block.title}
                </div>
                {block.body.map((para, j) => (
                  <p key={j} style={{fontSize:'0.9rem', color:'var(--ink2)', lineHeight:1.8, marginBottom:'12px'}}>
                    {para}
                  </p>
                ))}
              </div>
            ))}

            <div style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: '20px',
              marginTop: '8px',
            }}>
              <p style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'1rem', color:'var(--ink)', lineHeight:1.65, margin:0}}>
                "The thoughts are produced by a frightened brain, not a reasoning one.
                You do not think like this when you are calm. That is not a coincidence.
                That is the proof."
              </p>
            </div>
          </>
        )}

      </div>

      <BottomNav active="understand" />
    </div>
  )
}
