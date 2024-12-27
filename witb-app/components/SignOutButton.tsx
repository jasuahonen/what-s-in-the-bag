'use client'

import { Button } from '@/components/ui/button'
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
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      Sign Out
    </Button>
  )
}