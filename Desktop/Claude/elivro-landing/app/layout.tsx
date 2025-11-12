import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elivro - Lättare rekrytering. Snabbare schemaläggning. Enklare rapportering',
  description: 'God assistans handlar om relationer. Därför bygger vi teknik som stärker det mänskliga, inte ersätter det.',
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
