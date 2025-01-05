'use client'

import { useEffect, useState } from 'react'
import { GolfBagCard } from '@/components/GolfBagCard'
import { AddSetupButton } from '@/components/AddSetupButton'
import { useRouter } from 'next/navigation'

interface UserSetup {
  id: number
  image_url: string
  user_id: string
  username: string
  created_at: string
  average_rating: number
  average_handicap_guess: number
}

export function UserGolfBags() {
  const [setups, setSetups] = useState<UserSetup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserSetups() {
      try {
        const response = await fetch('/api/user/golfbags')
        if (!response.ok) {
          throw new Error('Failed to fetch golf bags')
        }
        const data = await response.json()
        setSetups(data)
      } catch (error) {
        console.error('Error fetching setups:', error)
        setError('Failed to load your golf bags')
      } finally {
        setLoading(false)
      }
    }

    fetchUserSetups()
  }, [router])

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>
  }

  if (setups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <p className="text-gray-400 text-lg">You haven't added any golf bags yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {setups.map((setup) => (
        <GolfBagCard
          key={setup.id}
          id={setup.id}
          imageUrl={setup.image_url}
          author={setup.username || 'You'}
          uploadedAt={setup.created_at}
          averageRating={setup.average_rating}
          averageHandicapGuess={setup.average_handicap_guess}
          isProfileView={true}
          onDelete={() => {
            setSetups(setups.filter(s => s.id !== setup.id))
          }}
        />
      ))}
    </div>
  )
}

