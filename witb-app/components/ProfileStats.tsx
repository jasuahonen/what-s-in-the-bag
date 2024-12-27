import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProfileStats() {
  // This data would typically come from your backend
const stats = {
totalUploads: 5,
averageRating: 4.2,
averageHandicapGuess: 12.5,
}

return (
<div className="grid gap-4 md:grid-cols-3 mb-8">
    <Card className="bg-gray-800 border-gray-700">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">Total Uploads</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold text-gray-100">{stats.totalUploads}</div>
    </CardContent>
    </Card>
    <Card className="bg-gray-800 border-gray-700">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">Average Rating</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold text-gray-100">{stats.averageRating.toFixed(1)}</div>
    </CardContent>
    </Card>
    <Card className="bg-gray-800 border-gray-700">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">Avg. Handicap Guess</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold text-gray-100">{stats.averageHandicapGuess.toFixed(1)}</div>
    </CardContent>
    </Card>
</div>
)
}

