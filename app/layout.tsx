import type { Metadata } from 'next'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'

export const metadata: Metadata = {
  metadataBase: new URL('https://elivro.se'),
  title: {
    default: 'Elivro - Kvalitet eller budget? Nu kan du få båda | AI-driven Assistansplanering',
    template: '%s | Elivro'
  },
  description: 'Assistansplanering med AI för rekrytering, schemaläggning och FK-rapportering. Från 449 kr/brukare/mån. Spara 40% jämfört med AIAI och Tidvis. Transparent prissättning, 30 dagars garanti, ingen bindningstid.',
  keywords: [
    'assistansplanering',
    'assistans system',
    'assistansföretag mjukvara',
    'personlig assistans schema',
    'fk rapportering assistans',
    'assistans rekrytering',
    'ai assistans',
    'aiai alternativ',
    'tidvis alternativ',
    'schema assistans',
    'tidrapportering assistans',
    'atl assistans',
    'assistans budget'
  ],
  authors: [{ name: 'Elivro AB' }],
  creator: 'Elivro AB',
  publisher: 'Elivro AB',
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://elivro.se',
    siteName: 'Elivro',
    title: 'Elivro - Kvalitet eller budget? Nu kan du få båda',
    description: 'AI-driven assistansplanering från 449 kr/brukare/mån. Spara 40% jämfört med AIAI och Tidvis. Transparent prissättning, ingen bindningstid. Byggt av aktiv assistent.',
    images: [
      {
        url: '/elivro-macbook-color.webp', // TODO: Create dedicated /og-image.png (1200x630)
        width: 1200,
        height: 630,
        alt: 'Elivro - AI-driven Assistansplanering för kvalitet och budget',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elivro - AI-driven Assistansplanering',
    description: 'Spara 40% på assistansplanering. Från 449 kr/brukare/mån. Transparent prissättning, ingen bindningstid.',
    images: ['/elivro-macbook-color.webp'],
  },
  // Add Google Search Console verification here after setup:
  // verification: {
  //   google: 'YOUR_VERIFICATION_CODE',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
