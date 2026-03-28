import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EvidenceClient from '@/components/EvidenceClient'

export default async function EvidencePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: entries } = await supabase
    .from('evidence_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <EvidenceClient userId={user.id} entries={entries || []} />
}
