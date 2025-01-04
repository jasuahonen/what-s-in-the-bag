import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getAuthenticatedClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await getAuth(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bagId, handicapGuess } = await request.json()
    if (!bagId || handicapGuess === undefined || handicapGuess < -10 || handicapGuess > 54) {
      return NextResponse.json({ error: 'Invalid handicap guess' }, { status: 400 })
    }

    const supabase = await getAuthenticatedClient(request)

    // Check if user has already guessed for this bag
    const { data: existingGuess } = await supabase
      .from('handicap_guesses')
      .select('*')
      .eq('user_id', userId)
      .eq('golf_bag_id', bagId)
      .single()

    if (existingGuess) {
      return NextResponse.json({ error: 'You have already guessed the handicap for this bag' }, { status: 400 })
    }

    // Insert new handicap guess
    const { error: guessError } = await supabase
      .from('handicap_guesses')
      .insert([{ user_id: userId, golf_bag_id: bagId, handicap_guess: handicapGuess }])

    if (guessError) throw guessError

    // Calculate new average handicap guess
    const { data: guesses, error: guessesError } = await supabase
      .from('handicap_guesses')
      .select('handicap_guess')
      .eq('golf_bag_id', bagId)

    if (guessesError) throw guessesError

    const totalGuess = guesses?.reduce((acc, curr) => acc + curr.handicap_guess, 0) || 0
    const averageHandicap = guesses?.length ? Number((totalGuess / guesses.length).toFixed(1)) : 0

    // Update golf bag with new average
    const { error: updateError } = await supabase
      .from('golf_bags')
      .update({ average_handicap_guess: averageHandicap })
      .eq('id', bagId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      averageHandicap: Number(averageHandicap.toFixed(1))
    })
  } catch (error) {
    console.error('Handicap guess error:', error)
    return NextResponse.json({ error: 'Failed to submit handicap guess' }, { status: 500 })
  }
}