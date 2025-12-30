import type { Metadata } from 'next'
import '../globals.css'
import CookieConsent from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: 'Elivro - Lättare rekrytering. Snabbare schemaläggning. Enklare rapportering',
  description: 'God assistans handlar om relationer. Därför bygger vi teknik som stärker det mänskliga, inte ersätter det.',
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL('https://elivro.se'),
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://elivro.se',
    title: 'Elivro - För assistans som förändrar liv',
    description: 'God assistans handlar om relationer. Därför bygger vi teknik som stärker det mänskliga, inte ersätter det.',
    siteName: 'Elivro',
    images: [
      {
        url: '/elivro-macbook-color.webp',
        width: 1200,
        height: 630,
        alt: 'Elivro - Assistansverktyg som fokuserar på kvalitet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elivro - För assistans som förändrar liv',
    description: 'God assistans handlar om relationer. Därför bygger vi teknik som stärker det mänskliga, inte ersätter det.',
    images: ['/elivro-macbook-color.webp'],
  },
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" data-scroll-behavior="smooth">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
