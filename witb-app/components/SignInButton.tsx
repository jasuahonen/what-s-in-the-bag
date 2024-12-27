'use client'

import { Button } from '@/components/ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { useSignInContext } from '@/contexts/SignInContext'

export function SignInButton() {
const { isSignedIn, setIsSignedIn } = useSignInContext()

const handleSignInClick = () => {
// Here you would typically implement your authentication logic
setIsSignedIn(!isSignedIn)
}

return (
<Button
    onClick={handleSignInClick}
    variant="outline"
    className="text-gray-200 border-gray-600 hover:bg-gray-800 hover:text-white scale-80"
>
    {isSignedIn ? (
    <>
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
    </>
    ) : (
    <>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
    </>
    )}
</Button>
)
}

