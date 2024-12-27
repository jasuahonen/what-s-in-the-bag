'use client'

import { useState, useEffect } from 'react'
import { GolfBagCard } from '@/components/GolfBagCard'
import { FilterToggle } from '@/components/FilterToggle'

interface GolfBag {
id: number
imageUrl: string
author: string
uploadedAt: string
averageRating: number
averageHandicapGuess: number
}

export function GolfBagFeed() {
const [filter, setFilter] = useState<'latest' | 'best' | 'worst'>('latest')
const [golfBags, setGolfBags] = useState<GolfBag[]>([])

useEffect(() => {
async function fetchGolfBags() {
    const response = await fetch('/api/golfbags')
    const data = await response.json()
    setGolfBags(data)
}
fetchGolfBags()
}, [])

const sortedSetups = [...golfBags].sort((a, b) => {
if (filter === 'latest') {
    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
} else if (filter === 'best') {
    return b.averageRating - a.averageRating
} else {
    return a.averageRating - b.averageRating
}
})

return (
<div>
    <div className="mb-6 flex justify-center">
    <FilterToggle onFilterChange={setFilter} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
    {sortedSetups.map((setup) => (
        <GolfBagCard
        key={setup.id}
        imageUrl={setup.imageUrl}
        author={setup.author}
        uploadedAt={setup.uploadedAt}
        averageRating={setup.averageRating}
        averageHandicapGuess={setup.averageHandicapGuess}
        />
    ))}
    </div>
</div>
)
}

