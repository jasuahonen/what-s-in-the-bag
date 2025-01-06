'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'

export function Header() {
  const { isSignedIn } = useAuth()

  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/ratemybag.png"
            alt="RMB Logo"
            width={65}
            height={65}
            className="rounded-full"
          />
          <Link
            href="/"
            className="text-lg md:text-xl lg:text-2xl text-gray-50 scale-100 md:scale-110 lg:scale-125 transition-transform"
          >
            RateMyBag
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-800 text-sm md:text-base lg:text-lg xl:text-xl">
              Home
            </Button>
          </Link>

          {isSignedIn ? (
            <Link href="/profile" passHref>
              <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-800 text-sm md:text-base lg:text-lg xl:text-xl">
                Profile
              </Button>
            </Link>
          ) : (
            <SignInButton>
              <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-gray-800 text-sm md:text-base lg:text-lg xl:text-xl">
                Sign In
              </Button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  )
}