'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface SignInContextType {
isSignedIn: boolean
setIsSignedIn: (value: boolean) => void
}

const SignInContext = createContext<SignInContextType | undefined>(undefined)

export function SignInProvider({ children }: { children: ReactNode }) {
const [isSignedIn, setIsSignedIn] = useState(false)

return (
<SignInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
    {children}
</SignInContext.Provider>
)
}

export function useSignInContext() {
const context = useContext(SignInContext)
if (context === undefined) {
throw new Error('useSignInContext must be used within a SignInProvider')
}
return context
}

