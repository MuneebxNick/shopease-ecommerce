import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'ShopEase — Everyday goods, elevated.',
  description: 'Premium curated products for modern lifestyles.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import { TopLoader } from '@/components/top-loader'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth scroll-pt-20 bg-background ${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
