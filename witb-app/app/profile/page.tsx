import { Header } from '@/components/Header'
import { UserGolfBags } from '@/components/UserGolfBags'
import { AddSetupButton } from '@/components/AddSetupButton'

export default function ProfilePage() {
return (
<div className="min-h-screen bg-gray-950">
    <Header />
    <main className="container mx-auto px-4 py-8">
    <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-50 mb-4 text-center lg:text-3xl md:text-2xl sm:text-xl">My Profile</h1>
        <AddSetupButton />
    </div>
    <UserGolfBags />
    </main>
</div>
)
}

