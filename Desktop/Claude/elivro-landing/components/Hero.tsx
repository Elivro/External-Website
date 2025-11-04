'use client'

import AnimatedText from './AnimatedText'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-zinc-900 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-8 z-20 animate-fade-in">
        <p className="text-violet-500 text-lg sm:text-xl font-semibold tracking-widest">ELIVRO</p>
      </div>

      {/* Content - Two Column Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left z-20">
            {/* Main Heading */}
            <div className="mb-8">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white">
                <AnimatedText
                  text="Det bästa rekryteringsverktyget"
                  className="block"
                  delay={200}
                />
                <AnimatedText
                  text="i assistansbranschen."
                  className="block"
                  delay={400}
                />
              </div>
            </div>

            {/* Subheading */}
            <div className="animate-slide-in-up" style={{ animationDelay: '1.2s' }}>
              <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
                Använd AI för att effektivisera din rekrytering och hitta de bästa assistanterna.
                Spara tid, förbättra matchningen och fokusera på det som betyder mest.
              </p>
            </div>

            {/* CTA Button */}
            <div className="animate-slide-in-up mt-5" style={{ animationDelay: '1.4s' }}>
              <a
                href="#"
                className="group inline-flex rounded-full p-[1px] transition-shadow duration-300"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
                  boxShadow: '0 10px 30px rgba(139,92,246,.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(139,92,246,.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139,92,246,.25)';
                }}
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-semibold transition-transform duration-300 will-change-transform group-hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
                  style={{
                    backgroundColor: '#121216',
                    fontSize: '15px',
                  }}
                >
                  Boka en demo
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="animate-slide-in-up relative z-10 order-first lg:order-last" style={{ animationDelay: '0.8s' }}>
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 shadow-2xl border border-zinc-700/30">
              <div className="relative w-full h-full">
                <Image
                  src="/hero-image.png"
                  alt="Elivro Dashboard"
                  fill
                  className="object-contain mix-blend-lighten"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-violet-500 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-violet-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </section>
  )
}
