import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import FounderStory from '@/components/FounderStory'
import CTA from '@/components/CTA'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import {
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
  websiteSchema,
} from '@/lib/structured-data'

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={websiteSchema} />

      <main className="min-h-screen bg-black">
        <Navbar />
        <Hero />              {/* 1. Hero */}
        <ProblemSection />    {/* 2. Pain Point */}
        <Features />          {/* 3. Features - Solution benefits before purchase process */}
        <HowItWorks />        {/* 4. How It Works - Purchase process after understanding benefits */}
        {/* 5. Social Proof - add when you have customers */}
        <FounderStory />      {/* 6. Founder's Story */}
        <CTA />               {/* 7. Pricing */}
        <FAQSection />        {/* 8. FAQ */}
        <Footer />            {/* 9. Footer */}
      </main>
    </>
  )
}
