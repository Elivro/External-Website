import type { Metadata } from 'next'
import {
  Fraunces,
  Instrument_Serif,
  Newsreader,
  Bodoni_Moda,
  Montserrat,
  JetBrains_Mono,
} from 'next/font/google'
import '../globals.css'
import CookieConsent from '@/components/CookieConsent'
import DisplayFontSwitcher from '@/components/DisplayFontSwitcher'

/* =============================================================
   FONT LOADING — see DESIGN_RULES § Font swap scaffolding.
   All four serif candidates load so the dev switcher can A/B in
   the browser without a code change. The active default is Fraunces
   per DESIGN.md. When the user picks a permanent display font,
   delete the unused candidates and the switcher in one PR.
   ============================================================= */

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni-moda',
  display: 'swap',
})

// Body sans — Montserrat. Variable name kept as `--font-inter` so existing
// references in globals.css and tailwind.config.mjs don't churn; rename in a
// later sweep if you want the slot to match the typeface.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const fontVariables = [
  fraunces.variable,
  instrumentSerif.variable,
  newsreader.variable,
  bodoniModa.variable,
  montserrat.variable,
  jetbrainsMono.variable,
].join(' ')

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
    <html lang="sv" data-scroll-behavior="smooth" className={fontVariables}>
      <body>
        {children}
        <CookieConsent />
        {process.env.NODE_ENV !== 'production' && <DisplayFontSwitcher />}
      </body>
    </html>
  )
}
