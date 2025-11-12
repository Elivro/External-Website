import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import FounderStory from '@/components/FounderStory'
import CTA from '@/components/CTA'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />              {/* 1. Hero */}
      <ProblemSection />    {/* 2. Pain Point */}
      <HowItWorks />        {/* 3. How It Works - moved up per Walter Chen */}
      <Features />          {/* 4. Features */}
      {/* 5. Social Proof - add when you have customers */}
      <FounderStory />      {/* 6. Founder's Story - moved up per Walter Chen */}
      <CTA />               {/* 7. Pricing */}
      <FAQSection />        {/* 8. FAQ - moved down per Walter Chen */}
      <Footer />            {/* 9. Footer */}
    </main>
  )
}
