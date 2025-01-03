'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      className="border border-gray-600 rounded-lg text-yellow-400 bg-gray-800 hover:bg-black transition-colors duration-200"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  )
}