import { NextResponse } from 'next/server'

const dummySetups = [
{ id: 1, imageUrl: '/placeholder.svg?height=600&width=400', author: 'JohnDoe', uploadedAt: '2023-12-25T12:00:00Z', averageRating: 4.2, averageHandicapGuess: 12 },
{ id: 2, imageUrl: '/placeholder.svg?height=600&width=400', author: 'JaneSmith', uploadedAt: '2023-12-24T15:30:00Z', averageRating: 3.8, averageHandicapGuess: 15 },
{ id: 3, imageUrl: '/placeholder.svg?height=600&width=400', author: 'MikeGolf', uploadedAt: '2023-12-23T09:45:00Z', averageRating: 4.5, averageHandicapGuess: 8 },
{ id: 4, imageUrl: '/placeholder.svg?height=600&width=400', author: 'SarahPutt', uploadedAt: '2023-12-22T18:20:00Z', averageRating: 4.0, averageHandicapGuess: 10 },
{ id: 5, imageUrl: '/placeholder.svg?height=600&width=400', author: 'TomIrons', uploadedAt: '2023-12-21T11:15:00Z', averageRating: 3.9, averageHandicapGuess: 14 },
{ id: 6, imageUrl: '/placeholder.svg?height=600&width=400', author: 'EmilyVintage', uploadedAt: '2023-12-20T14:00:00Z', averageRating: 4.3, averageHandicapGuess: 11 },
]

export async function GET() {
return NextResponse.json(dummySetups)
}

