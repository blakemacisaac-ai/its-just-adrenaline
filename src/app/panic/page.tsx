import { createClient } from '@/lib/supabase/server'
import FloatClient from './FloatClient'
import Link from 'next/link'

export default async function FloatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let hasReachedFloat = false

  if (user) {
    const { data } = await supabase
      .from('completed_days')
      .select('day_id')
      .eq('user_id', user.id)
      .gte('day_id', 10)
      .limit(1)
    hasReachedFloat = (data?.length ?? 0) > 0
  }

  if (!hasReachedFloat) {
    return (
      <div className="app-shell">
        <nav className="navbar">
          <Link href="/" className="nav-back">← Home</Link>
        </nav>
        <div className="page-content" style={{display:'flex',flexDirection:'column',justifyContent:'center',minHeight:'70vh',padding:'40px 24px'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'24px'}}>🌊</div>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:'1.6rem',marginBottom:'16px',lineHeight:'1.3'}}>
            The Float unlocks in Part 2
          </h2>
          <p style={{color:'var(--text)',lineHeight:'1.7',marginBottom:'16px'}}>
            The Float is the technique. But it only works once the bewilderment is gone.
          </p>
          <p style={{color:'var(--text)',lineHeight:'1.7',marginBottom:'16px'}}>
            Part 1 does one thing: it removes the mystery from what is happening in your body.
            Once you genuinely understand — not just intellectually, but in your bones — that
            what you are feeling is adrenaline misfiring, that it cannot hurt you, that every
            symptom has a direct physiological cause and none of it is dangerous, The Float
            becomes possible.
          </p>
          <p style={{color:'var(--text)',lineHeight:'1.7',marginBottom:'32px'}}>
            Not before. The technique without the understanding is just another coping strategy.
            With the understanding, it is the end of the fear.
          </p>
          <Link href="/program" className="btn btn-primary">
            Continue Part 1 →
          </Link>
          <p style={{fontSize:'0.8rem',color:'var(--muted)',marginTop:'16px',textAlign:'center'}}>
            The Float unlocks when you complete Part 1
          </p>
        </div>
      </div>
    )
  }

  return <FloatClient />
}
