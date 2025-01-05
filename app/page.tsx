import { Header } from '@/components/Header'
import { GolfBagFeed } from '@/components/GolfBagFeed'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-[2.55rem] font-bold text-gray-50 text-center">
          </h1>
          <h2 className="text-grey-800 text-center text-lg md:text-xl lg:text-2xl">
            A place for golfers to share their bag and get honest reviews from other users.
            <br />
            Rate the bags, guess the players handicap. Simple and entertaining.
          </h2>
        </div>
        <GolfBagFeed />
      </main>
    </div>
  )
}

