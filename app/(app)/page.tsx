import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoStrip from '@/components/LogoStrip'
import ProductShowcase from '@/components/ProductShowcase'
import Features from '@/components/Features'
import Manifesto from '@/components/Manifesto'
import CaseProof from '@/components/CaseProof'
import AboutUs from '@/components/AboutUs'
import StartupOffer from '@/components/StartupOffer'
import QuizCTA from '@/components/QuizCTA'
import FAQSection from '@/components/FAQSection'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-fg">
      <Navbar />
      <Hero />
      <LogoStrip />
      <ProductShowcase />
      <Features />
      <AboutUs />
      <Manifesto />
      <CaseProof />
      <StartupOffer />
      <QuizCTA />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  )
}
