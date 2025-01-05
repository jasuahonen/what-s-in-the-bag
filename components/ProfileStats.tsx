'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  averageRating: number
  averageHandicapGuess: number
}

export function ProfileStats() {
  const [stats, setStats] = useState<Stats>({
    averageRating: 0,
    averageHandicapGuess: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/user/golfbags')
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const bags = await response.json()

        // Calculate averages from all user's golf bags
        const totalBags = bags.length
        if (totalBags === 0) {
          setStats({
            averageRating: 0,
            averageHandicapGuess: 0
          })
          return
        }

        const avgRating = bags.reduce((acc: number, bag: any) =>
          acc + (bag.average_rating || 0), 0) / totalBags

        const avgHandicap = bags.reduce((acc: number, bag: any) =>
          acc + (bag.average_handicap_guess || 0), 0) / totalBags

        setStats({
          averageRating: avgRating,
          averageHandicapGuess: avgHandicap
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center gap-8 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-gray-300">Loading...</span>
        </div>
        <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-gray-300">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-8 mb-8">
      <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-gray-300">Rating</span>
        <span className="text-2xl font-bold text-yellow-400">
          {stats.averageRating === 0 ? '-' : stats.averageRating.toFixed(1)}
        </span>
      </div>
      <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-gray-300">Average HCP</span>
        <span className="text-2xl font-bold text-yellow-400">
          {stats.averageHandicapGuess === 0 ? '-' : stats.averageHandicapGuess.toFixed(1)}
        </span>
      </div>
    </div>
  )
}

