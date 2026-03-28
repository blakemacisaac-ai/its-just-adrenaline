'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import styles from './AuthForm.module.css'

interface Props { mode: 'login' | 'signup' }

export default function AuthForm({ mode }: Props) {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [fullName, setFullName]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const [useMagic, setUseMagic]   = useState(false)

  const supabase = createClient()
  const router   = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (useMagic) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
      })
      if (error) setError(error.message)
      else setMagicSent(true)
      setLoading(false)
      return
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName }, emailRedirectTo: `${window.location.origin}/auth/callback` }
      })
      if (error) setError(error.message)
      else setMagicSent(true) // show confirmation message
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/')
    }
    setLoading(false)
  }

  if (magicSent) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successIcon}>📬</div>
          <h2 className={styles.title}>Check your email</h2>
          <p className={styles.sub}>We sent a link to <strong>{email}</strong>. Tap it to {mode === 'signup' ? 'confirm your account' : 'sign in'}.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.logo}>Just <span>Adrenaline</span></div>
        <p className={styles.tagline}>A 90-day recovery program based on the method of Dr. Claire Weekes</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>{mode === 'login' ? 'Welcome back' : 'Start your recovery'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && !useMagic && (
            <div className={styles.field}>
              <label className={styles.label}>Your name</label>
              <input
                type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                className={styles.input} placeholder="First name" required
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className={styles.input} placeholder="you@email.com" required
            />
          </div>

          {!useMagic && (
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                className={styles.input} placeholder="••••••••"
                minLength={8} required
              />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={`btn btn-primary btn-full ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Please wait…' : useMagic ? 'Send magic link' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <button className={styles.magicToggle} onClick={() => setUseMagic(!useMagic)}>
          {useMagic ? '← Use password instead' : '✉️ Sign in with magic link (no password)'}
        </button>

        <div className={styles.switchLink}>
          {mode === 'login' ? (
            <>Don&rsquo;t have an account? <Link href="/signup">Start free →</Link></>
          ) : (
            <>Already have an account? <Link href="/login">Sign in →</Link></>
          )}
        </div>
      </div>

      {mode === 'signup' && (
        <div className={styles.freeBadge}>
          ✓ Days 1–5 completely free &nbsp;·&nbsp; No credit card needed
        </div>
      )}
    </div>
  )
}
