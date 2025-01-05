import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import '@/styles/globals.css'
import { dark } from '@clerk/themes'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'RMB - Rate My Bag',
  description: 'Showcase your golf bag setups',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
    appearance={{ baseTheme: dark }} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={`dark ${outfit.variable}`}>
        <body className="font-sans antialiased bg-gray-950 text-gray-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

