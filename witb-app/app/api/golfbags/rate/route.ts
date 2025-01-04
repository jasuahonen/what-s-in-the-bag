import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getAuthenticatedClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuth(request)
    const { userId } = auth
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bagId, rating } = await request.json()
    if (!bagId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
    }

    const supabase = await getAuthenticatedClient(request)

    // Check if user has already rated this bag
    const { data: existingRating } = await supabase
      .from('ratings')
      .select('*')
      .eq('user_id', userId)
      .eq('golf_bag_id', bagId)
      .single()

    if (existingRating) {
      return NextResponse.json({ error: 'You have already rated this bag' }, { status: 400 })
    }

    // Insert new rating
    const { error: ratingError } = await supabase
      .from('ratings')
      .insert([{ user_id: userId, golf_bag_id: bagId, rating }])

    if (ratingError) throw ratingError

    // Calculate new average rating
    const { data: ratings, error: ratingsError } = await supabase
      .from('ratings')
      .select('rating')
      .eq('golf_bag_id', bagId)

    if (ratingsError) throw ratingsError

    const totalRating = ratings?.reduce((acc, curr) => acc + curr.rating, 0) || 0
    const averageRating = ratings?.length ? Number((totalRating / ratings.length).toFixed(1)) : 0

    // Update golf bag with new average
    const { error: updateError } = await supabase
      .from('golf_bags')
      .update({ average_rating: averageRating })
      .eq('id', bagId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      averageRating: Number(averageRating.toFixed(1))
    })
  } catch (error) {
    console.error('Rating error:', error)
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 })
  }
}