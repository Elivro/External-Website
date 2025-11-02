'use client'

import AnimatedText from './AnimatedText'
import { useState } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

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

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <AnimatedText
            text="Det bästa rekryteringsverktyget i assistansbranschen."
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white"
            delay={200}
          />
        </div>

        {/* Subheading */}
        <div className="mb-16 animate-slide-in-up flex flex-col items-center justify-center" style={{ animationDelay: '1.2s' }}>
          <div className="w-full flex justify-center">
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed text-center">
              Använd AI för att effektivisera din rekrytering och hitta de bästa assistanterna.
              Spara tid, förbättra matchningen och fokusera på det som betyder mest.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16 animate-slide-in-up" style={{ animationDelay: '1.4s' }}>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="px-14 py-6 bg-transparent border-2 border-violet-500 hover:border-violet-400 text-white hover:text-violet-400 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg sm:text-xl"
          >
            Boka en demo
          </button>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-violet-500 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-violet-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </section>
  )
}
