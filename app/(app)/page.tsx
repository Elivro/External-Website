import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import FounderStory from '@/components/FounderStory'
import CTA from '@/components/CTA'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import SectionDivider from '@/components/SectionDivider'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Philosophy />
      <Features />
      <SectionDivider />
      <HowItWorks />
      <FounderStory />
      <SectionDivider />
      <FAQSection />
      <CTA />
      <Footer />
    </main>
  )
}
