'use client'

import FeatureRow from './features/FeatureRow'

export default function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="container mx-auto px-6 py-20 md:py-28"
    >
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
        <p className="mt-4 text-white/70 text-lg">
          Revolutionera rekrytering inom assistansbranschen.
        </p>
      </header>

      {/* Feature Rows */}
      <div className="mt-14 md:mt-20 space-y-20 md:space-y-28">
        <FeatureRow
          eyebrow="AI-Driven Matching"
          title="Perfekt matchning – automatiskt"
          description="Vår AI analyserar kandidatprofiler och krav för att hitta den bästa matchningen. Spara tid och förbättra kvaliteten på dina anställningar med intelligent matchning som lär sig av varje rekrytering."
          /* imageSrc="/images/screens/matching.webp" */
          imageAlt="Elivro kandidatmatchning"
        />

        <FeatureRow
          reverse
          eyebrow="Snabb Rekrytering"
          title="Flytta kandidater på sekunder"
          description="Dra-och-släpp-flöde som minskar rekryteringstiden från veckor till dagar. Hantera hela rekryteringsprocessen i ett intuitivt gränssnitt som gör det enkelt att hålla koll på alla kandidater."
          /* imageSrc="/images/screens/kanban.webp" */
          imageAlt="Elivro kandidatflöde"
        />
      </div>
    </section>
  )
}
