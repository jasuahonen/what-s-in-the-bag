'use client'

import { useState, useEffect } from 'react'
import { GolfBagCard } from '@/components/GolfBagCard'
import { FilterToggle } from '@/components/FilterToggle'

interface GolfBag {
  id: number
  image_url: string
  user_id: string
  username: string
  created_at: string
  average_rating: number
  average_handicap_guess: number
}

export function GolfBagFeed() {
  const [filter, setFilter] = useState<'latest' | 'best' | 'worst'>('latest')
  const [golfBags, setGolfBags] = useState<GolfBag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGolfBags() {
      try {
        const response = await fetch('/api/golfbags')
        if (!response.ok) {
          throw new Error('Failed to fetch golf bags')
        }
        const data = await response.json()
        // Ensure default values for averages
        const bagsWithDefaults = data.map((bag: GolfBag) => ({
          ...bag,
          average_rating: bag.average_rating || 0,
          average_handicap_guess: bag.average_handicap_guess || 0
        }))
        setGolfBags(bagsWithDefaults)
      } catch (err) {
        console.error('Error fetching golf bags:', err)
        setError('Failed to load golf bags')
      } finally {
        setLoading(false)
      }
    }

    fetchGolfBags()
  }, [])

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>
  }

  const sortedBags = [...golfBags].sort((a, b) => {
    if (filter === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else if (filter === 'best') {
      return (b.average_rating || 0) - (a.average_rating || 0)
    } else {
      return (a.average_rating || 0) - (b.average_rating || 0)
    }
  })

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <FilterToggle onFilterChange={setFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {sortedBags.map((bag) => (
          <GolfBagCard
            key={bag.id}
            id={bag.id}
            imageUrl={bag.image_url}
            author={bag.username || 'Anonymous'}
            uploadedAt={bag.created_at}
            averageRating={bag.average_rating || 0}
            averageHandicapGuess={bag.average_handicap_guess || 0}
            onRatingUpdate={(newAverage) => {
              setGolfBags(golfBags.map(b =>
                b.id === bag.id ? { ...b, average_rating: newAverage } : b
              ))
            }}
            onHandicapGuessUpdate={(newAverage) => {
              setGolfBags(golfBags.map(b =>
                b.id === bag.id ? { ...b, average_handicap_guess: newAverage } : b
              ))
            }}
          />
        ))}
      </div>
    </div>
  )
}

