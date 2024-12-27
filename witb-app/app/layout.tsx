import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import '@/styles/globals.css'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'WITB - What\'s In The Bag',
  description: 'Showcase your golf bag setups',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className="dark">
        <body className={`${robotoMono.variable} font-mono antialiased bg-gray-950 text-gray-50`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

