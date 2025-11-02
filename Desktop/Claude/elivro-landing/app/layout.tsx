import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elivro - AI Rekryteringsverktyg för Assistansbranschen',
  description: 'Det bästa rekryteringsverktyget i assistansbranschen. Använd AI för att effektivisera din rekrytering.',
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
