import { GolfBagCard } from '@/components/GolfBagCard'

const dummySetups = [
{ id: 1, title: 'Summer Tournament Setup', imageUrl: '/placeholder.svg?height=300&width=400' },
{ id: 2, title: 'Casual Weekend Bag', imageUrl: '/placeholder.svg?height=300&width=400' },
{ id: 3, title: 'Pro Series Collection', imageUrl: '/placeholder.svg?height=300&width=400' },
{ id: 4, title: 'Beginner Friendly Set', imageUrl: '/placeholder.svg?height=300&width=400' },
]

export function GolfBagGrid() {
return (
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {dummySetups.map((setup) => (
    <GolfBagCard key={setup.id} title={setup.title} imageUrl={setup.imageUrl} />
    ))}
</div>
)
}

