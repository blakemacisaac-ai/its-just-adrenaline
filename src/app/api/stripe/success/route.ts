import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) return NextResponse.redirect(new URL('/program', process.env.NEXT_PUBLIC_APP_URL!))

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status === 'paid' && session.metadata?.userId) {
    const supabase = await createClient()
    await supabase.from('profiles').update({ is_unlocked: true }).eq('id', session.metadata.userId)
  }

  return NextResponse.redirect(new URL('/program?unlocked=true', process.env.NEXT_PUBLIC_APP_URL!))
}
