import { Header } from '@/components/Header'
import { GolfBagFeed } from '@/components/GolfBagFeed'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-[2.55rem] font-bold text-gray-50 text-center">
            What's in the bag?
          </h1>
        </div>
        <GolfBagFeed />
      </main>
    </div>
  )
}

