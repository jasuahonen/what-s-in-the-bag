import { GolfBagCard } from '@/components/GolfBagCard'

interface UserSetup {
id: number
imageUrl: string
author: string
uploadedAt: string
averageRating: number
averageHandicapGuess: number
}

const userSetups: UserSetup[] = [
{
id: 1,
imageUrl: '/placeholder.svg?height=600&width=400',
author: 'CurrentUser',
uploadedAt: '2023-12-20T10:00:00Z',
averageRating: 4.2,
averageHandicapGuess: 8.5
},
{
id: 2,
imageUrl: '/placeholder.svg?height=600&width=400',
author: 'CurrentUser',
uploadedAt: '2023-12-15T14:30:00Z',
averageRating: 3.8,
averageHandicapGuess: 12.3
},
]

export function UserGolfBags() {
return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
    {userSetups.map((setup) => (
    <GolfBagCard
        key={setup.id}
        imageUrl={setup.imageUrl}
        author={setup.author}
        uploadedAt={setup.uploadedAt}
        averageRating={setup.averageRating}
        averageHandicapGuess={setup.averageHandicapGuess}
        isProfileView={true}
    />
    ))}
</div>
)
}

