import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // First, get all golf bags
    const { data: golfBags, error: golfBagsError } = await supabase
      .from('golf_bags')
      .select(`
        id,
        image_url,
        user_id,
        username,
        created_at
      `)
      .order('created_at', { ascending: false })

    if (golfBagsError) throw golfBagsError

    // For each golf bag, get its ratings and handicap guesses
    const bagsWithAverages = await Promise.all(
      golfBags.map(async (bag) => {
        // Get ratings
        const { data: ratings } = await supabase
          .from('ratings')
          .select('rating')
          .eq('golf_bag_id', bag.id)

        // Get handicap guesses
        const { data: guesses } = await supabase
          .from('handicap_guesses')
          .select('handicap_guess')
          .eq('golf_bag_id', bag.id)

        // Calculate averages
        const avgRating = ratings?.length
          ? Number((ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1))
          : 0

        const avgHandicap = guesses?.length
          ? Number((guesses.reduce((acc, curr) => acc + curr.handicap_guess, 0) / guesses.length).toFixed(1))
          : 0

        // Update the golf bag's averages in the database
        await supabase
          .from('golf_bags')
          .update({
            average_rating: avgRating,
            average_handicap_guess: avgHandicap
          })
          .eq('id', bag.id)

        // Return the bag with calculated averages
        return {
          ...bag,
          average_rating: avgRating,
          average_handicap_guess: avgHandicap
        }
      })
    )

    return NextResponse.json(bagsWithAverages)
  } catch (error) {
    console.error('Error fetching golf bags:', error)
    return NextResponse.json({ error: 'Failed to fetch golf bags' }, { status: 500 })
  }
}

