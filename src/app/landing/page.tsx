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
