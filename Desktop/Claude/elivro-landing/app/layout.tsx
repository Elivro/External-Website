import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elivro - Allt-i-ett plattform för Assistansbranschen',
  description: 'Lättare rekrytering. Snabbare schemaläggning. Enklare rapportering. För assistans som förändrar liv.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
}
