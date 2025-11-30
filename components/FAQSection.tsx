'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface FAQ {
  question: string
  answer: string
}

export default function FAQSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const faqs: FAQ[] = [
    {
      question: 'Hur lång tid tar det att komma igång?',
      answer: 'Från första demo till go-live tar det vanligtvis 2-4 veckor. Vi hjälper er med konfiguration, dataimport och utbildning av teamet.'
    },
    {
      question: 'Finns det någon risk att testa Elivro?',
      answer: 'Nej. Vi erbjuder 30 dagars pengarna-tillbaka-garanti. Ingen bindningstid. Ni kan avsluta när som helst och får full återbetalning om ni inte är nöjda första månaden.'
    },
    {
      question: 'Vad kostar Elivro?',
      answer: 'Varje företag har olika behov och förutsättningar. Vi erbjuder konkurrenskraftig prissättning som anpassas efter er verksamhets storlek och specifika behov. Kontakta oss för en skräddarsydd offert som passar er situation.'
    },
    {
      question: 'Hur säkras personuppgifter enligt GDPR?',
      answer: 'Elivro är GDPR-compliant med kryptering, rollbaserade behörigheter och servrar i Sverige. GDPR & PUB-stöd ingår.'
    },
    {
      question: 'Hur får vi support?',
      answer: 'All support sker på svenska via e-post (daniel@elivro.se) och telefon. Vi erbjuder dedikerad onboarding-support och löpande hjälp. Support ingår i alla abonnemang.'
    },
    {
      question: 'Vad händer med vår data om vi avslutar?',
      answer: 'Er data är er egendom. Vid uppsägning får ni en fullständig export av all data i vanliga format (Excel/CSV). Vi raderar era personuppgifter enligt GDPR inom 30 dagar efter avslut.'
    }
  ]

  const toggleFAQ = (index: number) => {
    // Clear any pending toggle
    if (toggleTimeoutRef.current) {
      clearTimeout(toggleTimeoutRef.current)
    }

    // Debounce to prevent double-clicks
    toggleTimeoutRef.current = setTimeout(() => {
      setOpenIndex(prev => prev === index ? null : index)
      toggleTimeoutRef.current = null
    }, 10)
  }

  return (
      <section
        id="faq"
        ref={sectionRef}
        aria-labelledby="faq-title"
        className="w-full bg-zinc-950 py-18 md:py-24 lg:py-32 relative overflow-hidden"
      >
        {/* Background gradient elements - Blue/Teal theme */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <header className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <h2
              id="faq-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              Vanliga frågor
            </h2>
          </header>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 mb-12 items-start">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="
                  relative rounded-3xl
                  bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
                  backdrop-blur-sm border border-blue-500/30
                  hover:border-teal-400/50
                  transition-all duration-500 ease-out
                  flex flex-col
                  self-start
                "
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `all 0.3s ease-out ${(index + 1) * 150}ms`
                }}
              >
                <div className="w-full p-7 md:p-8 lg:p-10 flex flex-col overflow-hidden">
                  {/* Question - Clickable */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex justify-between items-start gap-4 focus:outline-none rounded-lg p-2 -m-2"
                    aria-expanded={openIndex === index}
                    type="button"
                  >
                    <h3 className="text-lg lg:text-xl font-bold text-white pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`
                        w-6 h-6 text-teal-400 flex-shrink-0 mt-1
                        transition-transform duration-300
                        ${openIndex === index ? 'rotate-180' : ''}
                      `}
                      strokeWidth={2}
                    />
                  </button>

                  {/* Answer */}
                  {openIndex === index && (
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
                    >
                      <p className="text-zinc-300 text-base lg:text-lg leading-relaxed mt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Fallback */}
          <div
            className="text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease-out 1000ms'
            }}
          >
            <p className="text-zinc-400 text-lg">
              Hittar du inte svar?{' '}
              <a
                href="mailto:daniel@elivro.se"
                className="text-teal-400 hover:text-teal-300 transition-colors duration-200 underline decoration-teal-400/30 hover:decoration-teal-300/50"
              >
                Kontakta oss: daniel@elivro.se
              </a>
            </p>
          </div>
        </div>
      </section>
  )
}
