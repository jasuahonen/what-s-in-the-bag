import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { SignInProvider } from '@/contexts/SignInContext'
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
    <html lang="en" className="dark">
      <body className={`${robotoMono.variable} font-mono antialiased bg-gray-950 text-gray-50`}>
        <SignInProvider>
          {children}
        </SignInProvider>
      </body>
    </html>
  )
}

