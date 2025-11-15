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
        className="w-full bg-black pt-18 md:pt-24 lg:pt-32 pb-0 relative overflow-hidden"
      >
        {/* Background gradient elements - Green/Emerald theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h2
              id="founder-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              Grundat av experter inom assistans och teknologi
            </h2>
          </header>

          {/* Founders Grid - 3 columns on all screen sizes, cards on desktop only */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-10 mb-16 md:mb-20">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="
                  group relative text-center
                  p-2 sm:p-4
                  md:rounded-3xl md:bg-gradient-to-br md:from-zinc-800/50 md:to-zinc-900/50
                  md:backdrop-blur-sm md:border md:border-emerald-500/30
                  md:hover:border-emerald-400/50
                  md:transition-all md:duration-500 md:ease-out
                  md:p-6 lg:p-7
                "
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.3s ease-out ${(index + 1) * 150}ms`
                }}
              >
                {/* Founder Photo - Smaller on mobile for better fit */}
                <div className="relative mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-emerald-500/40 group-hover:border-emerald-400/60 transition-all duration-300">
                  <Image
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 128px"
                  />
                </div>

                {/* Name - Optimized for mobile */}
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2 leading-tight">
                  {founder.name}
                </h3>

                {/* Role - Tighter on mobile */}
                <p className="text-xs sm:text-sm md:text-base text-emerald-400 font-medium mb-0.5 sm:mb-1 md:mb-2 leading-tight">
                  {founder.role}
                </p>

                {/* Expertise - Compact on mobile */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-tight">
                  {founder.expertise}
                </p>
              </div>
            ))}
          </div>

          {/* Rockband Story - Team Chemistry & Creativity */}
          <div
            className="mx-auto max-w-5xl mb-16 md:mb-20"
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
              p-7 md:p-8 lg:p-12 mb-16 md:mb-20
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
          className="hidden md:block relative w-full mt-24 md:mt-32 mb-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.98)',
            transition: 'all 1.2s ease-out 900ms'
          }}
        >
          {/* Fullscreen Image Container with Glassmorphic Frame & Fade Effect */}
          <div
            className="relative w-full overflow-hidden border border-emerald-500/20 backdrop-blur-sm"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(16, 185, 129, 0.25),
                0 10px 40px rgba(139, 92, 246, 0.15),
                0 0 0 1px rgba(16, 185, 129, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
              maskImage: `linear-gradient(
                to bottom,
                transparent 0%,
                black 15%,
                black 100%
              )`,
              WebkitMaskImage: `linear-gradient(
                to bottom,
                transparent 0%,
                black 15%,
                black 100%
              )`
            }}
          >
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
