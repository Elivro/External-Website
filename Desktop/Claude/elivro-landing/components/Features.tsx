'use client'

import FeatureRow from './features/FeatureRow'

export default function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="w-full bg-zinc-900 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background gradient elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-widest text-purple-300/80">
          Varför välja Elivro?
        </p>
        <h2
          id="features-title"
          className="mt-3 text-4xl md:text-5xl font-extrabold text-white"
        >
          Vi kombinerar avancerad AI med ett användarvänligt gränssnitt.
        </h2>
        <p className="mt-4 text-white/70">
          Revolutionera rekrytering inom assistansbranschen.
        </p>
      </header>

      {/* Feature Rows */}
      <div className="mt-16 md:mt-24 space-y-24 md:space-y-32">
        <FeatureRow
          eyebrow="AI-Driven Matching"
          title="Perfekt matchning – automatiskt"
          description="Vår AI analyserar kandidatprofiler och krav för att hitta den bästa matchningen. Spara tid och förbättra kvaliteten på dina anställningar med intelligent matchning som lär sig av varje rekrytering."
          imageSrc="/dash.png"
          imageAlt="Elivro AI-driven kandidatmatchning"
        />

        <FeatureRow
          reverse
          eyebrow="Snabb Rekrytering"
          title="Flytta kandidater på sekunder"
          description="Dra-och-släpp-flöde som minskar rekryteringstiden från veckor till dagar. Hantera hela rekryteringsprocessen i ett intuitivt gränssnitt som gör det enkelt att hålla koll på alla kandidater."
          imageSrc="/kundfeedb.png"
          imageAlt="Kandidatprofilvy i Elivro"
        />
      </div>
      </div>
    </section>
  )
}
