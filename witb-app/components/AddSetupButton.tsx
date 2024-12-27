'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

export function AddSetupButton() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return null
  }

  return (
    <Button className="bg-green-600 hover:bg-green-700 text-white lg:text-base md:text-sm sm:text-xs">
      <PlusCircle className="mr-2 h-4 w-4 lg:h-4 lg:w-4 md:h-3 md:w-3 sm:h-2 sm:w-2" />
      Add a New Bag
    </Button>
  )
}

