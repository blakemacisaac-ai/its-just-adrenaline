'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handlePurchase() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const { sessionId } = await res.json()
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div className="checkout-page">
      <button className="nav-back" onClick={() => router.back()} style={{marginBottom:'24px', display:'block'}}>
        ← Back
      </button>

      <div className="checkout-card">

        <div className="checkout-badge">Full Programme</div>

        <h1 className="checkout-title">
          The truth about anxiety.<br />Finally, clearly told.
        </h1>

        <p className="checkout-sub">
          You have tried everything. This is different. Not another coping strategy —
          the actual understanding that makes the fear dissolve on its own.
        </p>

        <div className="checkout-divider" />

        <div className="checkout-includes-label">What you get</div>
        <div className="checkout-includes">
          <div className="checkout-include">
            <span className="checkout-include-icon">📖</span>
            <div>
              <div className="checkout-include-title">22 lessons across two parts</div>
              <div className="checkout-include-desc">Part 1: The Truth — demystifying exactly what is happening in your body. Part 2: The Float — Weekes' method in full. Move at your own pace.</div>
            </div>
          </div>
          <div className="checkout-include">
            <span className="checkout-include-icon">🌊</span>
            <div>
              <div className="checkout-include-title">The Float</div>
              <div className="checkout-include-desc">When anxiety hits right now — the truth, the float instructions, and the breathing tool. Unlocks when you complete Part 1. Always one tap away.</div>
            </div>
          </div>
          <div className="checkout-include">
            <span className="checkout-include-icon">⚓</span>
            <div>
              <div className="checkout-include-title">Anchors</div>
              <div className="checkout-include-desc">Save the passages that land for you. Your personal collection of truths to return to when the lie feels convincing.</div>
            </div>
          </div>
          <div className="checkout-include">
            <span className="checkout-include-icon">📋</span>
            <div>
              <div className="checkout-include-title">Evidence Journal</div>
              <div className="checkout-include-desc">Log what anxiety predicted versus what actually happened. Build your personal, documented proof that the lie has never once told the truth.</div>
            </div>
          </div>
          <div className="checkout-include">
            <span className="checkout-include-icon">🔍</span>
            <div>
              <div className="checkout-include-title">Symptom Explainer</div>
              <div className="checkout-include-desc">Every symptom — racing heart, derealization, tingling, nausea — explained physiologically. None of it dangerous. All of it adrenaline.</div>
            </div>
          </div>
        </div>

        <div className="checkout-divider" />

        <div className="checkout-price-row">
          <div className="checkout-price">$67</div>
          <div className="checkout-price-detail">
            <div className="checkout-price-main">One-time payment</div>
            <div className="checkout-price-sub">No subscription · Lifetime access · Yours forever</div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-full checkout-btn"
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Get the Full Programme →'}
        </button>

        <div className="checkout-secure">🔒 Secure payment via Stripe</div>

        <div className="checkout-weekes">
          <div className="checkout-weekes-quote">
            "I have seen people recover from the most severe anxiety disorders imaginable
            through understanding alone — through finally seeing clearly what was
            happening to them and what they needed to do."
          </div>
          <div className="checkout-weekes-attr">— Dr. Claire Weekes</div>
        </div>

      </div>
    </div>
  )
}
