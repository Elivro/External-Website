import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono, Plus_Jakarta_Sans, DM_Sans, Quicksand } from 'next/font/google'
import '../globals.css'
import CookieConsent from '@/components/CookieConsent'
import { FAQS } from '@/lib/faq-data'

/* =============================================================
   FONT LOADING — Brand Kit v4
   - Plus Jakarta Sans (display, headings) via next/font/google.
   - Inter (body / UI) via next/font/google.
   - Fraunces (italic accent inside <em>) via next/font/google.
   - JetBrains Mono (code / URLs) via next/font/google.
   ============================================================= */

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

const fontVariables = [
  jakarta.variable,
  inter.variable,
  fraunces.variable,
  jetbrainsMono.variable,
  dmSans.variable,
  quicksand.variable,
].join(' ')

export const metadata: Metadata = {
  metadataBase: new URL('https://elivro.se'),
  title: {
    default: 'Elivro — Verksamhetssystem för svenska assistansanordnare',
    template: '%s · Elivro',
  },
  description:
    'Verksamhetssystem för svenska assistansanordnare. Mindre admin, tryggare regelefterlevnad, snabbare rekrytering. Byggt inifrån, co-byggt med 2U Assistans. Vi tar betalt för utfall, inte för försök.',
  keywords: [
    'assistansanordnare',
    'verksamhetssystem',
    'personlig assistans',
    'rekrytering',
    'schemaläggning',
    'regelefterlevnad',
    'tillsynsberedskap',
    'IVO',
    'kundansvariga',
    'kvalitetsledning',
  ],
  authors: [{ name: 'Elivro' }],
  creator: 'Elivro',
  publisher: 'Elivro',
  applicationName: 'Elivro',
  alternates: {
    canonical: '/',
    languages: {
      'sv-SE': '/',
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://elivro.se',
    title: 'Elivro — Verksamhetssystem för svenska assistansanordnare',
    description:
      'Mindre admin. Tryggare regelefterlevnad. Snabbare rekrytering. Vi tar betalt för utfall, inte för försök.',
    siteName: 'Elivro',
    images: [
      {
        url: '/elivro-macbook-color.webp',
        width: 1200,
        height: 630,
        alt: 'Elivro — verksamhetssystem för svenska assistansanordnare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elivro — Verksamhetssystem för svenska assistansanordnare',
    description:
      'Mindre admin. Tryggare regelefterlevnad. Snabbare rekrytering.',
    images: ['/elivro-macbook-color.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="sv"
      data-scroll-behavior="smooth"
      className={fontVariables}
      style={{ backgroundColor: '#FAFAF7', colorScheme: 'light' }}
    >
      <head>
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Elivro',
              url: 'https://elivro.se',
              logo: 'https://elivro.se/brand-assets/elivro_logo2.png',
              description:
                'Verksamhetssystem för svenska assistansanordnare. Mindre admin, tryggare regelefterlevnad, snabbare rekrytering.',
              email: 'daniel@elivro.se',
              areaServed: { '@type': 'Country', name: 'Sverige' },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'SE',
                addressLocality: 'Västerås',
              },
              sameAs: ['https://login.elivro.se'],
            }),
          }}
        />
        {/* SoftwareApplication JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Elivro',
              applicationCategory: 'BusinessApplication',
              applicationSubCategory: 'Verksamhetssystem för personlig assistans',
              operatingSystem: 'Web',
              description:
                'Verksamhetssystem för svenska assistansanordnare. Tio funktioner i samma system. AI-import av era befintliga rutiner.',
              inLanguage: 'sv-SE',
              audience: {
                '@type': 'BusinessAudience',
                audienceType: 'Assistansanordnare i Sverige',
              },
              featureList: [
                'Rekrytering och anställning',
                'Schema och bemanning',
                'Tid, lön och FK-räkning',
                'Kunder',
                'Kvalitet och regelefterlevnad',
                'Avvikelser och förbättring',
                'Processer och årshjul',
                'Kompetens och delegationer',
                'AI-assistent',
                'Säkerhet och plattform',
              ],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'SEK',
                description: 'Pilot 90 dagar med pengarna tillbaka',
              },
            }),
          }}
        />
        {/* Service JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Verksamhetssystem för personlig assistans',
              provider: { '@type': 'Organization', name: 'Elivro' },
              areaServed: { '@type': 'Country', name: 'Sverige' },
              audience: {
                '@type': 'BusinessAudience',
                audienceType: 'Assistansanordnare',
              },
              description:
                'Verksamhetssystem byggt inifrån för svenska assistansanordnare. AI:n läser era Word-rutiner och bygger strukturerade processer ni styr.',
            }),
          }}
        />
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Elivro',
              url: 'https://elivro.se',
              inLanguage: 'sv-SE',
              publisher: { '@type': 'Organization', name: 'Elivro' },
            }),
          }}
        />
        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              inLanguage: 'sv-SE',
              mainEntity: FAQS.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            }),
          }}
        />
      </head>
      <body style={{ backgroundColor: '#FAFAF7', color: '#111111' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-paper-card focus:text-ink focus:rounded-md focus:border focus:border-line-strong"
        >
          Hoppa till innehåll
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
