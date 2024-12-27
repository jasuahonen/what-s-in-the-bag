'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserGolfBags } from '@/components/UserGolfBags'
import { AddSetupButton } from '@/components/AddSetupButton'
import { ProfileStats } from '@/components/ProfileStats'
import { SignOutButton } from '@/components/SignOutButton'

export function ProfileContent() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-50 mb-4 text-center lg:text-3xl md:text-2xl sm:text-xl">My Profile</h1>
        <div className="flex gap-4">
          <AddSetupButton />
          <SignOutButton />
        </div>
      </div>
      <ProfileStats />
      <UserGolfBags />
    </main>
  )
}