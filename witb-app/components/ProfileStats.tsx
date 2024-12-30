import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProfileStats() {
  const stats = {
    averageRating: 4.2,
    averageHandicapGuess: 12.5,
  }

  return (
    <div className="flex justify-center gap-8 mb-8">
      <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-gray-300">Rating</span>
        <span className="text-2xl font-bold text-yellow-400">{stats.averageRating.toFixed(1)}</span>
      </div>
      <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-gray-300">Average HCP</span>
        <span className="text-2xl font-bold text-yellow-400">{stats.averageHandicapGuess.toFixed(1)}</span>
      </div>
    </div>
  )
}

