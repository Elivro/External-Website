import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}
