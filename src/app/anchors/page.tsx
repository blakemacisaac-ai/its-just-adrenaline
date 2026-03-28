import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AnchorsClient from '@/components/AnchorsClient'

export default async function AnchorsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: anchors } = await supabase
    .from('anchors')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <AnchorsClient userId={user.id} anchors={anchors || []} />
}
