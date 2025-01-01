import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('golf_bags')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching golf bags:', error)
    return NextResponse.json({ error: 'Failed to fetch golf bags' }, { status: 500 })
  }
}

