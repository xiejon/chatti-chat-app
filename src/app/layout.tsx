import './globals.css'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chatti - Collaborate & Connect',
  description: 'A better way to collaborate with teammates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={josefin.className}>{children}</body>
    </html>
  )
}
