'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StarIcon, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

interface GolfBagCardProps {
  id?: number // Make optional since not all uses provide id
  imageUrl: string
  author: string
  uploadedAt: string
  averageRating: number
  averageHandicapGuess: number
  isProfileView?: boolean
  onDelete?: () => void // Add callback for parent refresh
}

export function GolfBagCard({
  id,
  imageUrl,
  author,
  uploadedAt,
  averageRating,
  averageHandicapGuess,
  isProfileView = false,
  onDelete
}: GolfBagCardProps) {
  const [rating, setRating] = useState(0)
  const [handicapGuess, setHandicapGuess] = useState('')
  const [hasRated, setHasRated] = useState(false)
  const [hasGuessedHandicap, setHasGuessedHandicap] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleRate = (newRating: number) => {
    setRating(newRating)
    setHasRated(true)
    // Here you would typically send this rating to your backend
  }

  const handleHandicapGuess = () => {
    setHasGuessedHandicap(true)
    // Here you would typically send this guess to your backend
  }

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this golf bag?')) {
      return
    }

    try {
      setIsDeleting(true)
      const response = await fetch('/api/golfbags/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bagId: id, imageUrl }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      onDelete?.()
      router.refresh()
    } catch (error) {
      console.error('Error deleting golf bag:', error)
      alert('Failed to delete golf bag')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700 flex flex-col transform scale-85 origin-top-left">
      <CardContent className="p-0 flex-grow relative">
        <div className="relative aspect-[2/3] w-full">
          <Image src={imageUrl} alt={`Golf bag by ${author}`} fill className="object-cover" />
        </div>
        {isProfileView && (
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 bg-grey-800 hover:bg-black"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 space-y-4">
        <div className="flex justify-between w-full">
          <span className="text-sm font-semibold text-gray-100 lg:text-sm md:text-xs sm:text-[10px]">@{author}</span>
          <span className="text-sm text-gray-400 lg:text-sm md:text-xs sm:text-[10px]">
            {format(new Date(uploadedAt), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="w-full space-y-4">
          {isProfileView ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300 lg:text-sm md:text-xs sm:text-[10px]">Average Rating:</span>
                <span className="text-sm font-semibold text-yellow-400 lg:text-sm md:text-xs sm:text-[10px]">{averageRating.toFixed(1)} / 5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300 lg:text-sm md:text-xs sm:text-[10px]">Average Handicap Guess:</span>
                <span className="text-sm font-semibold text-yellow-400 lg:text-sm md:text-xs sm:text-[10px]">{averageHandicapGuess.toFixed(1)}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="lg"
                      onClick={() => handleRate(star)}
                      className={`p-1 w-auto h-auto hover:bg-transparent group ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-500'
                      }`}
                    >
                      <StarIcon className="h-12 w-12 group-hover:text-yellow-400 transition-colors lg:h-12 lg:w-12 md:h-10 md:w-10 sm:h-8 sm:w-8" />
                    </Button>
                  ))}
                </div>
                {hasRated && (
                  <div className="space-y-1">
                    <p className="text-sm text-yellow-400 lg:text-sm md:text-xs sm:text-[10px]">Thanks for rating!</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300 lg:text-sm md:text-xs sm:text-[10px]">Average Rating:</span>
                      <span className="text-sm font-semibold text-yellow-400 lg:text-sm md:text-xs sm:text-[10px]">{averageRating.toFixed(1)} / 5</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Guess handicap"
                    value={handicapGuess}
                    onChange={(e) => setHandicapGuess(e.target.value)}
                    className="w-32 bg-gray-700 text-white border-gray-600 text-sm lg:text-sm md:text-xs sm:text-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button onClick={handleHandicapGuess} variant="secondary" size="sm" className="text-xs lg:text-sm md:text-xs sm:text-[10px]">
                    Guess
                  </Button>
                </div>
                {hasGuessedHandicap && (
                  <div className="space-y-1">
                    <p className="text-sm text-yellow-400 lg:text-sm md:text-xs sm:text-[10px]">Handicap guessed!</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300 lg:text-sm md:text-xs sm:text-[10px]">Average Handicap Guess:</span>
                      <span className="text-sm font-semibold text-yellow-400 lg:text-sm md:text-xs sm:text-[10px]">{averageHandicapGuess.toFixed(1)}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

