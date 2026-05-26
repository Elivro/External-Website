import TopBanner from '@/components/TopBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoStrip from '@/components/LogoStrip'
import Features from '@/components/Features'
import ProductShowcase from '@/components/ProductShowcase'
import Manifesto from '@/components/Manifesto'
import CaseProof from '@/components/CaseProof'
import AboutUs from '@/components/AboutUs'
import StartupOffer from '@/components/StartupOffer'
import Footer from '@/components/Footer'

/**
 * Landing-page composition — Brand Kit v4
 *
 * Light/dark alternation; Hero light, Susanne opens dark. StartupOffer
 * runs light per request (CaseProof light → StartupOffer light-soft gives
 * a quiet tone shift rather than a hard repeat). data-surface drives the
 * v4 palette override layer.
 *
 *   Hero            light
 *   LogoStrip       dark   ← Susanne reference
 *   Features        light
 *   ProductShowcase dark   ← carousel
 *   AboutUs         light
 *   Manifesto       dark
 *   CaseProof       light
 *   StartupOffer    light-soft
 *   Footer          dark
 *
 * Hidden for now: FAQSection. Removed earlier: QuizCTA, standalone CTA.
 */
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-paper text-ink">
      <TopBanner />
      <Navbar />

      <div data-surface="light">
        <Hero />
      </div>

      <div data-surface="dark">
        <LogoStrip />
      </div>

      <div data-surface="light">
        <Features />
      </div>

      <div data-surface="dark">
        <ProductShowcase />
      </div>

      <div data-surface="light">
        <AboutUs />
      </div>

      <div data-surface="dark">
        <Manifesto />
      </div>

      <div data-surface="light">
        <CaseProof />
      </div>

      <div data-surface="light-soft">
        <StartupOffer />
      </div>

      <div data-surface="dark">
        <Footer />
      </div>
    </main>
  )
}
