import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getAuthenticatedClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await getAuthenticatedClient(request)
    const { data, error } = await supabase
      .from('golf_bags')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Found golf bags:', data)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching golf bags:', error)
    return NextResponse.json({ error: 'Failed to fetch golf bags' }, { status: 500 })
  }
}