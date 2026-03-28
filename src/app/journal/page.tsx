import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import JournalClient from '@/components/JournalClient'

export default async function JournalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: entries } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <JournalClient userId={user.id} entries={entries || []} />
}
