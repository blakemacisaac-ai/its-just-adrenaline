import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "It's Just Adrenaline",
  description: 'Understand your anxiety. Based on the method of Dr. Claire Weekes.',
  manifest: '/manifest.json',
  themeColor: '#f7f4ef',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
