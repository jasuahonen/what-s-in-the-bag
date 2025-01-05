import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getAuthenticatedClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { userId } = await getAuth(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await Promise.resolve(context.params)
    const golfBagId = parseInt(id)

    if (isNaN(golfBagId)) {
      return NextResponse.json({ error: 'Invalid golf bag ID' }, { status: 400 })
    }

    const supabase = await getAuthenticatedClient(request)

    // Check ratings
    const { data: ratingData } = await supabase
      .from('ratings')
      .select('*')
      .eq('user_id', userId)
      .eq('golf_bag_id', golfBagId)
      .single()

    // Check handicap guesses
    const { data: guessData } = await supabase
      .from('handicap_guesses')
      .select('*')
      .eq('user_id', userId)
      .eq('golf_bag_id', golfBagId)
      .single()

    return NextResponse.json({
      hasRated: !!ratingData,
      hasGuessed: !!guessData
    })
  } catch (error) {
    console.error('Error checking user interactions:', error)
    return NextResponse.json(
      { error: 'Failed to check user interactions' },
      { status: 500 }
    )
  }
}