'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="lp">

      {/* Nav */}
      <nav className={`lp-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="lp-nav-inner">
          <div className="lp-logo">{"It's Just"} <span>Adrenaline</span></div>
          <Link href="/auth/login" className="lp-nav-signin">Sign in</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-tag">Based on the method of Dr. Claire Weekes</div>
          <h1 className="lp-hero-headline">
            You have tried<br />everything.<br />
            <span>This is different.</span>
          </h1>
          <p className="lp-hero-sub">
            Not another coping strategy. Not another management technique.
            The actual truth about what anxiety is — and why, once you truly
            understand it, the fear begins to dissolve on its own.
          </p>
          <div className="lp-hero-actions">
            <Link href="/auth/signup" className="lp-btn-primary">
              Start free — first 5 lessons
            </Link>
            <div className="lp-hero-note">No credit card · Unlock anytime for $67</div>
          </div>
        </div>
        <div className="lp-hero-scroll-hint">↓</div>
      </section>

      {/* The recognition section */}
      <section className="lp-section lp-recognition">
        <div className="lp-inner">
          <div className="lp-recognition-opener">
            If you are anything like most people who end up here —
          </div>
          <div className="lp-shelf-items">
            {[
              { icon: '📚', text: 'A bookshelf full of self-help books and half-filled workbooks' },
              { icon: '💊', text: 'A vitamin drawer stacked with supplements from Reddit' },
              { icon: '🧘', text: 'Meditation apps you used for two weeks then abandoned' },
              { icon: '🧠', text: 'CBT, EMDR, therapy — all helpful, none of it fixed it' },
              { icon: '📱', text: 'Every anxiety app on the App Store, at some point' },
              { icon: '🔍', text: 'Hours on forums searching for the thing that finally clicks' },
            ].map((item, i) => (
              <div key={i} className="lp-shelf-item">
                <span className="lp-shelf-icon">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="lp-recognition-close">
            <p>You have put in the work. And yet here you are. Still searching.</p>
            <p>
              That is not a failure of effort. That is what happens when you are
              solving the wrong problem.
            </p>
          </div>
        </div>
      </section>

      {/* The truth section */}
      <section className="lp-section lp-truth">
        <div className="lp-inner">
          <div className="lp-truth-label">The truth nobody told you clearly</div>
          <h2 className="lp-truth-headline">
            Anxiety is not complex.<br />We made it complex.
          </h2>
          <div className="lp-truth-body">
            <p>
              Those things were never going to fix it — not because they are useless,
              but because they were all built on the wrong idea about what anxiety
              actually is.
            </p>
            <p>
              Anxiety is not a deep psychological disorder requiring years of careful
              management. It is a sensitised nervous system misfiring. One chemical —
              adrenaline — released by an over-alert alarm system that has learned,
              through accumulated stress, to fire at almost nothing.
            </p>
            <p>
              That is the whole mechanism. Embarrassingly simple, once you see it.
              And entirely reversible — not through management, but through understanding.
            </p>
          </div>
          <div className="lp-truth-callout">
            The feeling of panic and the feeling of excitement are chemically
            identical. Same adrenaline. Same racing heart. Same breathlessness.
            The only difference is the story your brain tells about what it means.
          </div>
        </div>
      </section>

      {/* Second Fear */}
      <section className="lp-section lp-secondfear">
        <div className="lp-inner">
          <h2 className="lp-sf-headline">The real problem is what you add on top.</h2>
          <div className="lp-sf-scenario">
            <p className="lp-sf-scene">
              You are sitting on the sofa. Nothing is happening. And then —
              your heart spikes. A wave moves through your chest.
              The alarm fires.
            </p>
            <p className="lp-sf-scene">That is adrenaline. Left alone, it passes in minutes.</p>
            <p className="lp-sf-scene">But then your mind speaks:</p>
            <div className="lp-sf-thoughts">
              <div className="lp-sf-thought">"What is that? Something is wrong."</div>
              <div className="lp-sf-thought">"Am I having a heart attack?"</div>
              <div className="lp-sf-thought">"What if I stop breathing?"</div>
              <div className="lp-sf-thought">"What if I'm losing my mind?"</div>
              <div className="lp-sf-thought">"Why won't it stop?"</div>
            </div>
            <p className="lp-sf-scene">
              Dr. Claire Weekes called this <strong>Second Fear</strong> — the fear
              of the feeling itself, added on top of the original alarm.
              Each thought is a new injection of adrenaline. The wave that
              would have passed in three minutes is now a full panic attack.
            </p>
            <p className="lp-sf-scene lp-sf-key">
              The fight is the fuel. Stop the fight — stop adding the story —
              and the wave has nothing to feed on. It peaks. And it passes.
              Every single time.
            </p>
          </div>
        </div>
      </section>

      {/* Weekes */}
      <section className="lp-section lp-weekes">
        <div className="lp-inner">
          <div className="lp-weekes-inner">
            <div className="lp-weekes-text">
              <div className="lp-weekes-label">The method</div>
              <h2 className="lp-weekes-headline">Dr. Claire Weekes figured this out decades ago.</h2>
              <p>
                A physician and researcher who had experienced severe anxiety herself,
                she spent her life explaining what it actually was — and what to do about it.
              </p>
              <p>
                She called her method <strong>floating</strong>. Not fighting the feeling,
                not managing it — floating through it. Dropping the shoulders. Slowing
                the exhale. Letting the wave be there without resistance. Understanding
                that the feeling cannot harm you.
              </p>
              <p>
                Thousands of people have recovered using nothing more than this understanding.
                No special supplements. No years of therapy. Just the truth, clearly seen.
              </p>
            </div>
            <div className="lp-weekes-quote-wrap">
              <blockquote className="lp-weekes-quote">
                "I have seen people recover from the most severe anxiety disorders
                imaginable through understanding alone."
              </blockquote>
              <cite className="lp-weekes-cite">— Dr. Claire Weekes</cite>
            </div>
          </div>
        </div>
      </section>

      {/* The Float */}
      <section className="lp-section lp-float">
        <div className="lp-inner">
          <div className="lp-float-label">The method in four words</div>
          <div className="lp-float-words">
            {['Face it.', 'Accept it.', 'Float through it.', 'Let time pass.'].map((w, i) => (
              <div key={i} className="lp-float-word">
                <span className="lp-float-num">0{i + 1}</span>
                <span className="lp-float-w">{w}</span>
              </div>
            ))}
          </div>
          <p className="lp-float-desc">
            Not a technique. Not a coping mechanism. A complete shift in your
            relationship with the feeling — from something to be fought and escaped,
            to something to be understood and floated through.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="lp-section lp-features">
        <div className="lp-inner">
          <div className="lp-features-label">What is inside</div>
          <h2 className="lp-features-headline">Everything you need. Nothing you don't.</h2>
          <div className="lp-features-grid">
            {[
              {
                icon: '📖',
                title: '21 lessons across two parts',
                desc: 'Part 1 demystifies what is happening in your body. Part 2 teaches the Float in full. Move at your own pace — no schedule, no pressure.'
              },
              {
                icon: '🌊',
                title: 'The Float Pocket',
                desc: 'When anxiety hits right now — the truth, the float instructions, and breathing guidance. Always one tap away, no login required.'
              },
              {
                icon: '⚓',
                title: 'Anchors',
                desc: 'Save the passages that land for you. Your personal collection of truths to return to when the lie feels convincing at 2am.'
              },
              {
                icon: '📋',
                title: 'Evidence Journal',
                desc: 'Log what anxiety predicted versus what actually happened. Build your documented proof that the prediction has never once been right.'
              },
              {
                icon: '🔍',
                title: 'Symptom Explainer',
                desc: 'Racing heart, derealization, tingling, nausea — every symptom explained physiologically. None of it dangerous. All of it adrenaline.'
              },
              {
                icon: '∞',
                title: 'Yours forever',
                desc: 'One payment. No subscription. No monthly fee. The programme, the tools, every update — yours for life.'
              },
            ].map((f, i) => (
              <div key={i} className="lp-feature-card">
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms + Thoughts */}
      <section className="lp-section lp-symptoms-thoughts">
        <div className="lp-inner">

          {/* Physical */}
          <div className="lp-st-label">What adrenaline does to your body</div>
          <h2 className="lp-st-headline">Every symptom has a name. None of them are dangerous.</h2>
          <p className="lp-st-intro">
            The reason anxiety symptoms are so frightening is that they arrive without explanation.
            A racing heart at rest. A chest that won't expand. The world going dreamlike and unreal.
            Legs that feel like they'll give way. Tingling where there shouldn't be tingling.
            A dry mouth, tunnel vision, crushing exhaustion despite doing nothing at all.
            Without knowing what's causing them, the natural conclusion is: something is seriously wrong.
          </p>
          <p className="lp-st-intro">
            Nothing is seriously wrong. Every single symptom maps directly to adrenaline — one chemical,
            doing its job with mechanical precision.
          </p>

          <div className="lp-symptom-grid">
            {[
              {
                icon: '💓', name: 'Racing heart',
                why: 'Adrenaline tells the SA node to fire faster. The heart pumps harder to move blood to the muscles. The pounding you feel is your heart doing its job with unusual force — not failing. Not attacking. Working.'
              },
              {
                icon: '🫁', name: 'Breathlessness & chest tightness',
                why: 'Three things at once: chest muscles tense under the alarm response, breathing quickens to pull in oxygen, and the oesophagus — which runs directly behind the heart — can spasm under sympathetic activation, producing a squeezing pressure almost indistinguishable from cardiac pain. This is why anxiety chest pain sends people to emergency rooms. Scans come back normal. The cause is muscular spasm. You are not having a heart attack. Your blood oxygen is normal or elevated.'
              },
              {
                icon: '🌫️', name: 'Derealization',
                why: 'Hyperventilation lowers CO2 in the blood, causing the cerebral arteries to narrow. Studies show cerebral blood flow can drop by up to 40% during sustained hyperventilation. The brain\'s perceptual centres, receiving less blood, produce the dreamlike, unreal, "behind glass" quality. It is blood chemistry — not madness, not a breakdown. Completely reversible, every time, within minutes of breathing normalising.'
              },
              {
                icon: '⚡', name: 'Tingling & numbness',
                why: 'The same CO2 mechanism. Extremities — fingers, lips, feet — receive slightly less flow first, creating pins and needles. Not a stroke. Not neurological damage. Breathing chemistry, fixed the moment breathing normalises.'
              },
              {
                icon: '🤢', name: 'Nausea',
                why: 'Adrenaline diverts blood from the digestive system to the muscles. Digestion stops mid-process. The churning, sick feeling is your body efficiently reprioritising — not illness. It resolves the moment the adrenaline clears.'
              },
              {
                icon: '🫨', name: 'Trembling & weak legs',
                why: 'Adrenaline floods the muscles with glucose and primes them for action. With no physical outlet — no running, no fighting — the muscles tremble with stored energy. Your legs will not give way. They have too much energy, not too little.'
              },
              {
                icon: '🔥', name: 'Sweating & flushing',
                why: 'The body activates its cooling system pre-emptively, expecting physical exertion. Blood is redirected from the skin to core muscles, creating the flush or pallor. The cold sweat is your body preparing for a sprint that isn\'t happening.'
              },
              {
                icon: '😨', name: 'Sense of doom',
                why: 'The amygdala — your brain\'s threat-detection centre — communicates in one language: danger. When flooded with adrenaline, it sends the maximum alarm signal. The certainty of catastrophe is not evidence of catastrophe. It is the alarm at full volume.'
              },
              {
                icon: '👁️', name: 'Visual disturbances',
                why: 'Adrenaline dilates the pupils to admit more light — useful for scanning for threats in the dark, overwhelming in normal daylight. The result is photosensitivity, glare, and blurring. Under extreme activation, the visual field itself narrows — the brain prioritises forward threat-detection and filters out peripheral awareness. Tunnel vision in anxiety is literal, physiological, and temporary.'
              },
              {
                icon: '🫙', name: 'Dry mouth',
                why: 'Saliva production is a parasympathetic ("rest and digest") function. The moment the sympathetic alarm fires, it suppresses the salivary glands. The dry, sticky mouth arrives within seconds — the body has no interest in digestion when it thinks you\'re facing a threat. The moment the alarm quietens, saliva returns.'
              },
              {
                icon: '🪫', name: 'Exhaustion despite doing nothing',
                why: 'Muscles held in continuous low-level tension under sustained adrenaline burn energy constantly — without any physical movement to show for it. The anxiety sufferer who hasn\'t left the house is often as exhausted as someone who ran a race. They have been running one, inside their own body, all day.'
              },
            ].map((s, i) => (
              <div key={i} className="lp-symptom-card">
                <div className="lp-symptom-top">
                  <span className="lp-symptom-icon">{s.icon}</span>
                  <span className="lp-symptom-name">{s.name}</span>
                </div>
                <p className="lp-symptom-why">{s.why}</p>
              </div>
            ))}
          </div>

          <div className="lp-symptom-footer">
            Same chemical. Same alarm system. Every symptom. Every single time.
          </div>
        </div>
      </section>

      {/* Anxious Thinking */}
      <section className="lp-section lp-thinking">
        <div className="lp-inner">
          <div className="lp-st-label" style={{color:'white', opacity:0.5}}>What adrenaline does to your mind</div>
          <h2 className="lp-thinking-headline">
            The thoughts feel real.<br />They are not real.<br />They are adrenaline.
          </h2>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">Why you can't think clearly when anxious</div>
            <p>
              When adrenaline fires, it doesn't just change your body — it changes your brain.
              The amygdala, your threat-detection centre, activates and partially overrides
              the prefrontal cortex — the seat of rational thought, perspective, and clear
              reasoning. Neuroscientists call this an amygdala hijack. Your rational brain
              doesn't go offline completely, but it goes quiet. The threat-scanner takes over.
            </p>
            <p>
              The threat-scanner does one thing: it looks for danger. It does this fast,
              broadly, and without nuance. It pattern-matches at speed and flags anything
              that could conceivably be a threat. In a genuinely dangerous situation this
              is lifesaving. In a sensitised nervous system with no real threat present,
              it turns inward — scanning your body, scanning your thoughts, scanning the
              room — and finding danger everywhere it looks.
            </p>
            <p>
              The thoughts this produces feel like clear reasoning. They don't feel like
              a frightened smoke detector making noise. They feel like insight.
              <em> That is the trick.</em> The emotional certainty of the amygdala mimics
              the clarity of rational thought — but it is not rational thought. It is threat-detection
              in overdrive, producing conclusions without evidence.
            </p>
          </div>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">The thoughts that feel most true when anxious</div>
            <div className="lp-anxious-thoughts">
              {[
                { thought: '"What if I\'m losing my mind?"', truth: 'You are not. The amygdala produces this thought because "going mad" is a threat. The thought is the alarm making noise — not a psychiatric assessment.' },
                { thought: '"What if I stop breathing?"', truth: 'You cannot. Breathing is controlled by the brainstem, not by willpower or thought. It is not possible to forget to breathe. Your body will never let that happen.' },
                { thought: '"What if this is a heart attack?"', truth: 'Anxiety-related heart racing is nowhere near the threshold of cardiac danger. The fear of a heart attack is itself adrenaline-generated — it feeds the alarm and adds more adrenaline.' },
                { thought: '"I\'m broken. I will never get better."', truth: 'This is the exhausted mind, flooded with cortisol and adrenaline, making long-term predictions from a position of maximum fear. It has never once been right. The nervous system heals.' },
                { thought: '"Something terrible is about to happen."', truth: 'This is the amygdala\'s only output: maximum danger signal. Check your track record. Something terrible was always "about to happen." How many times has it actually happened?' },
              ].map((item, i) => (
                <div key={i} className="lp-anxious-thought">
                  <div className="lp-anxious-thought-text">{item.thought}</div>
                  <div className="lp-anxious-thought-truth">{item.truth}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">The proof they aren't real: they don't survive calm</div>
            <p>
              Here is the simplest and most important thing to understand about anxious thoughts:
              when the adrenaline clears and you are genuinely calm, these thoughts dissolve.
              The certainty that you were losing your mind, that something catastrophic was
              imminent, that you were fundamentally broken — it evaporates.
              When calm, you cannot even quite reconstruct why the thought felt so convincing.
            </p>
            <p>
              That is the proof. A real assessment of your situation — a genuine conclusion
              reached by a functioning rational mind — does not dissolve when a chemical
              clears from your bloodstream. Only adrenaline-generated fear does that.
              The thoughts were never true. They were produced by a frightened brain
              doing what frightened brains do: generating worst-case scenarios at speed.
            </p>
            <p>
              This is not reassurance. This is evidence. You have lived it, every time the
              anxiety has passed and the catastrophe hasn't arrived. The thoughts have never
              once survived contact with calm.
            </p>
          </div>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">Why the thoughts loop — and why you can't just stop</div>
            <p>
              Alongside adrenaline, the alarm response releases cortisol — a stress hormone
              that keeps the nervous system on high alert. Cortisol affects the hippocampus
              (memory and context) and the prefrontal cortex, keeping threat-related material
              active and accessible. This is why anxious thoughts loop. The brain, under
              cortisol, keeps returning to the perceived threat compulsively — not as a
              choice, but as a physiological process. It is trying to solve a problem that
              has no rational solution, because there is no actual problem.
            </p>
            <p>
              This is also why "just don't think about it" is useless advice. You cannot
              willpower your way out of a physiological loop. Psychologist Daniel Wegner
              demonstrated this with a simple experiment: tell someone not to think about
              a white bear. The bear becomes impossible to evict. The act of suppression
              keeps the suppressed thought active — you have to keep checking whether you're
              thinking it, which means thinking it. Trying not to think about something
              is itself thinking about something.
            </p>
            <p>
              The same mechanism applies to anxious thoughts. The harder you try to push
              the thought away, the more the brain flags it as important — important enough
              to keep trying to suppress. The fight with the thought is itself what keeps
              the thought alive.
            </p>
          </div>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">Sticky thoughts — and what they actually mean</div>
            <p>
              Some thoughts don't just loop — they stick. They feel impossible to dislodge.
              They return with images, certainties, questions that demand answers:
              <em> What if? What if? What if?</em> The more disturbing or frightening the
              thought content, the stickier it tends to be — because the amygdala flags
              high-threat content for priority processing. The brain is not done with it.
              It keeps returning because it believes it is protecting you.
            </p>
            <p>
              What makes a sticky thought sticky is not its content. It is the relationship
              you have with it. A thought you can observe with neutrality — "there's that
              thought again, I know what it is" — passes through. A thought you fight,
              argue with, try to answer, try to eliminate, or try to reassure yourself
              about gets amplified. Every engagement with the thought is a signal to the
              amygdala: this is important, keep monitoring this.
            </p>
            <p>
              The thought itself is not the problem. Thoughts are just events in the mind —
              electrical patterns, the brain doing what brains do. A thought about something
              terrible happening is not a prediction of something terrible happening. It is
              a thought. The question is what you do next.
            </p>
          </div>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">Thought-action fusion: when having a thought feels like doing it</div>
            <p>
              There is a specific mechanism that makes certain anxious thoughts feel uniquely
              unbearable — thoughts about harm, about losing control, about terrible things happening
              to people you love. Researchers call it thought-action fusion. It is the belief,
              held implicitly at the level of the nervous system rather than consciously, that
              having a thought and performing an action are morally equivalent — or that thinking
              something makes it more likely to occur.
            </p>
            <p>
              "If I thought it, it must mean something about me." "If I imagined it, maybe I want it."
              "If I keep thinking about it, maybe I'll do it." These are the conclusions the anxious
              mind draws. They feel like moral insights. They are not. They are what happens when
              a frightened amygdala tags a thought as a threat, and the partially-offline prefrontal
              cortex cannot supply the corrective: <em>thoughts are not actions, thoughts are not
              character, thoughts are not predictions.</em>
            </p>
            <p>
              The people who experience the most distressing intrusive thoughts are almost always
              the people least likely to act on them. The distress is itself the evidence of that —
              a person with violent or disturbing impulses does not experience those thoughts with
              horror. They experience them with indifference or pleasure. Horror is the response of
              a mind that finds the thought completely unacceptable. The thought says nothing about
              you. It says everything about the state of your nervous system.
            </p>
            <p>
              The mechanism that keeps these thoughts sticky is the same: fighting them, checking
              whether you're still thinking them, seeking reassurance that you're not a bad person,
              analysing why the thought appeared — all of it confirms to the amygdala that the
              content is threatening and important. The way out is the same as it is for every
              anxious thought: allow it to be there without engaging, without fighting, without
              seeking the reassurance that never permanently works. The thought can be there.
              You are still you.
            </p>
          </div>

          <div className="lp-thinking-proof">
            <blockquote className="lp-thinking-quote">
              "The thoughts are produced by a frightened brain, not a reasoning one.
              You do not think like this when you are calm. That is not a coincidence.
              That is the proof."
            </blockquote>
          </div>

          <div className="lp-thinking-block">
            <div className="lp-thinking-block-title">What to do: allow, don't fight</div>
            <p>
              Dr. Claire Weekes had a specific instruction for anxious thoughts: float past them.
              Not fight them. Not argue with them. Not seek reassurance about them.
              Not try to answer the "what if" question. Float past them — observe them
              without engaging, let them be there, and continue.
            </p>
            <p>
              This sounds impossible when you are in the middle of it. The thoughts feel
              urgent. They demand a response. The "what if" feels like it needs an answer.
              It doesn't. The "what if" question generated by an adrenaline-flooded amygdala
              has no satisfying answer — because it was never a real question. It was an alarm
              making noise. Answering it is like arguing with a smoke detector.
            </p>
            <p>
              The practice is this: when the thought arrives, notice it without engaging.
              Name it for what it is: <em>"There is that thought. I know what it is.
              My nervous system is frightened and generating threat-content. This thought
              does not require a response."</em> Then return your attention to whatever
              you were doing. Not because the thought has gone — it may still be there —
              but because engaging with it is what gives it its only power.
            </p>
            <p>
              The thought can be there. You can do whatever you want with it there.
              You can go to the supermarket with that thought present. You can have a
              conversation with that thought in the background. You can do your work,
              be with your family, live your life — with the thought present, not fighting
              it, not fleeing it, not trying to resolve it. Just letting it be there,
              untouched. That is the whole practice.
            </p>
            <p>
              And without the fight, the thought has nothing to feed on. It loses urgency.
              It becomes less sticky. Not immediately — the nervous system takes time to
              update — but through the accumulation of non-responses, the brain learns:
              this thought is not important. The amygdala lowers its threat rating.
              The thought returns less often. Eventually it barely registers at all.
            </p>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="lp-section lp-record">
        <div className="lp-inner">
          <div className="lp-record-stat">100%</div>
          <div className="lp-record-text">
            Your panic attack survival rate. Every single one you have ever had ended.
            Every catastrophe anxiety predicted never arrived. Not once, in your entire
            history with this feeling, has the prediction been right.
          </div>
          <div className="lp-record-sub">
            That is not reassurance. That is your documented track record.
            That is the evidence. The lie has never once told the truth.
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="lp-section lp-pricing">
        <div className="lp-inner">
          <div className="lp-pricing-card">
            <div className="lp-pricing-badge">Full Programme</div>
            <div className="lp-pricing-headline">
              The truth about anxiety.<br />Finally, clearly told.
            </div>
            <div className="lp-pricing-includes">
              {[
                '21 lessons — Part 1: The Truth + Part 2: The Float',
                'Float Pocket — instant support when it hits',
                'Anchors — save the passages that land',
                'Evidence Journal — build your proof',
                'Symptom Explainer — every sensation demystified',
                'Lifetime access — no subscription, ever',
              ].map((item, i) => (
                <div key={i} className="lp-pricing-include">
                  <span className="lp-pricing-check">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="lp-pricing-price-row">
              <div className="lp-pricing-price">$67</div>
              <div className="lp-pricing-price-detail">
                One-time payment<br />
                <span>No subscription · Lifetime access</span>
              </div>
            </div>
            <Link href="/auth/signup" className="lp-btn-primary lp-btn-full">
              Start free — first 5 lessons
            </Link>
            <div className="lp-pricing-reassurance">
              Try the first 5 lessons completely free.
              No credit card required to start.
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lp-section lp-final">
        <div className="lp-inner">
          <h2 className="lp-final-headline">
            You were always going<br />to be okay.
          </h2>
          <p className="lp-final-body">
            Every panic attack you have ever had ended. The threat was never real.
            The adrenaline always burned off. Your body was always protecting you,
            not attacking you.
          </p>
          <p className="lp-final-body">
            You just needed someone to explain that clearly.
          </p>
          <Link href="/auth/signup" className="lp-btn-primary">
            Start your recovery →
          </Link>
          <div className="lp-final-sign">— {"It's Just Adrenaline"}</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-logo">{"It's Just"} <span>Adrenaline</span></div>
          <div className="lp-footer-links">
            <Link href="/auth/login">Sign in</Link>
            <Link href="/auth/signup">Start free</Link>
          </div>
          <div className="lp-footer-note">
            Based on the methods of Dr. Claire Weekes. Not a substitute for medical advice.
          </div>
        </div>
      </footer>

    </div>
  )
}
