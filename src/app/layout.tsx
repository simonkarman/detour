import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Detour',
  description: 'Detour is an app that can be used to take detours when cycling.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/detour/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/detour/android-chrome-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/detour/android-chrome-512x512.png"
          type="image/png"
          sizes="512x512"
        />
        <link
          rel="apple-touch-icon"
          href="/detour/apple-touch-icon.png"
          type="image/png"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
