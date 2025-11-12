'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import FadeSection from './FadeSection'

interface Founder {
  name: string
  role: string
  expertise: string
  image: string
}

export default function FounderStory() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)

  const founders: Founder[] = [
    {
      name: 'Jimmy',
      role: 'VD & Grundare',
      expertise: 'Kundupplevelse- & Assistansexpert',
      image: '/founders/jimmy.jpg'
    },
    {
      name: 'Filiph',
      role: 'Grundare',
      expertise: 'System- & Mjukvaruexpert',
      image: '/founders/filiph.png'
    },
    {
      name: 'Daniel',
      role: 'Grundare',
      expertise: 'Server- & Säkerhetsexpert',
      image: '/founders/daniel.png'
    }
  ]

  return (
    <FadeSection>
      <section
        id="about"
        ref={sectionRef}
        aria-labelledby="founder-title"
        className="w-full bg-black pt-20 md:pt-32 pb-0 relative overflow-hidden"
      >
        {/* Background gradient elements - Green/Emerald theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-16">
            <h2
              id="founder-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              Grundat av experter inom assistans och teknologi
            </h2>
          </header>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="
                  group relative overflow-hidden rounded-3xl
                  bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
                  backdrop-blur-sm border border-emerald-500/30
                  hover:border-emerald-400/50
                  transition-all duration-500 ease-out
                  p-8 text-center
                "
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.3s ease-out ${(index + 1) * 150}ms`
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-green-400/0 to-emerald-600/0 group-hover:from-emerald-500/5 group-hover:via-green-400/5 group-hover:to-emerald-600/5 transition-all duration-500 pointer-events-none" />

                {/* Founder Photo */}
                <div className="relative mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300">
                  <Image
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {founder.name}
                </h3>

                {/* Role */}
                <p className="text-emerald-400 font-medium mb-2">
                  {founder.role}
                </p>

                {/* Expertise */}
                <p className="text-zinc-300 text-sm">
                  {founder.expertise}
                </p>
              </div>
            ))}
          </div>

          {/* Rockband Story - Team Chemistry & Creativity */}
          <div
            className="mx-auto max-w-5xl mb-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.3s ease-out 500ms'
            }}
          >
            {/* Headline */}
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Kreativitet och samarbete – sedan 2012
            </h3>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Band Image */}
              <div
                className="relative rounded-3xl overflow-hidden border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 shadow-2xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                  transition: 'all 1s ease-out 650ms'
                }}
              >
                <Image
                  src="/elivro-band.jpg"
                  alt="Elivro-grundarna i sitt rockband"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Story Text */}
              <div
                className="space-y-6"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                  transition: 'all 1s ease-out 800ms'
                }}
              >
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Innan Elivro skapade vi musik tillsammans. Vi lärde oss att{' '}
                  <span className="text-emerald-400 font-semibold">lyssna, improvisera och leverera under press</span>.
                </p>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Den kreativitet och lyhördheten vi utvecklade på scen har format hur vi bygger
                  produkter idag – med fokus på användarupplevelse och genuint samarbete.
                </p>
                <blockquote className="border-l-4 border-emerald-400 pl-6 italic">
                  <p className="text-base md:text-lg text-zinc-400">
                    "Ett fantastiskt team låter bra tillsammans, oavsett om det är på scen eller i koden."
                  </p>
                  <footer className="text-sm text-emerald-400 mt-2 not-italic">– Jimmy</footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Origin Story */}
          <div
            className="
              mx-auto max-w-4xl rounded-3xl
              bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
              backdrop-blur-sm border border-emerald-500/30
              p-8 lg:p-12 mb-20
            "
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.3s ease-out 600ms'
            }}
          >
            <div className="space-y-6 text-center">
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                Som assistent tröttnade jag på att använda omoderna system. Program där det enkla blev något svårt.
              </p>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                Därför skapade vi Elivro – ett system som ger oss alla superkraften att kunna{' '}
                <span className="text-emerald-400 font-semibold">fokusera på kvalitet och relationer</span>
                {' '}– inte administration.
              </p>
            </div>
          </div>

        </div>

        {/* MacBook Showcase - Fullscreen */}
        <div
          className="relative w-full mt-32 mb-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.98)',
            transition: 'all 1.2s ease-out 900ms'
          }}
        >
          {/* Fullscreen Image Container */}
          <div className="relative w-full overflow-hidden shadow-2xl shadow-emerald-500/20">
            {/* MacBook Image */}
            <Image
              src="/elivro-macbook-color.webp"
              alt="Elivro kandidatöversikt på MacBook - matchning som bygger relationer"
              width={1920}
              height={1200}
              className="w-full h-auto object-cover block"
              priority={false}
              sizes="100vw"
            />
          </div>
        </div>
      </section>
    </FadeSection>
  )
}
