'use client'

import { useState, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
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
      answer: 'Vanligtvis 2–4 veckor från första samtalet till att ni arbetar i systemet dagligen. Vi tar oss tid att göra det rätt – import av data, anpassning efter era rutiner, och utbildning som ger trygghet.'
    },
    {
      question: 'Finns det någon risk att testa Elivro?',
      answer: 'Ingen risk alls. Ni får 30 dagar att uppleva skillnaden. Ingen bindningstid. Och om systemet inte känns rätt kan ni avsluta när som helst – ingen förklaring krävs.'
    },
    {
      question: 'Vad kostar Elivro?',
      answer: 'Elivro är en investering i kvalitet, inte en kostnad att minimera. Prissättningen anpassas efter er verksamhets storlek och ambitionsnivå. Boka ett samtal så visar vi vad som passar er bäst.'
    },
    {
      question: 'Hur säkras personuppgifter enligt GDPR?',
      answer: 'Elivro är GDPR-compliant med kryptering, rollbaserade behörigheter och servrar i Sverige. All data behandlas enligt svensk lag med högsta säkerhet.'
    },
    {
      question: 'Hur får vi support?',
      answer: 'All support sker på svenska, från människor som förstår er bransch. E-post och telefon. Dedikerad hjälp när ni behöver det – ingen supportbot, inga biljettsystem.'
    },
    {
      question: 'Vad händer med vår data om vi avslutar?',
      answer: 'Er data är alltid er. Om ni väljer att avsluta får ni en fullständig export i vanliga format (Excel/CSV). Vi raderar era personuppgifter enligt GDPR inom 30 dagar. Inga krångel.'
    }
  ]

  const toggleFAQ = (index: number) => {
    if (toggleTimeoutRef.current) {
      clearTimeout(toggleTimeoutRef.current)
    }

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
      className="w-full bg-cream py-20 md:py-28 lg:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Section Header - Editorial */}
        <header className="text-center mb-16 md:mb-20">
          {/* Accent line */}
          <div
            className="mx-auto w-16 h-0.5 bg-terracotta mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'all 0.5s ease-out'
            }}
          />

          <h2
            id="faq-title"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-700 tracking-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease-out 0.1s'
            }}
          >
            Vanliga frågor
          </h2>
        </header>

        {/* FAQ List - Single Column Editorial */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-charcoal/10 ${index === 0 ? 'border-t' : ''}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.5s ease-out ${0.2 + index * 0.05}s`
              }}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center gap-4 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm group"
                aria-expanded={openIndex === index}
                type="button"
              >
                <h3 className="font-serif text-lg md:text-xl text-charcoal-700 pr-4 leading-snug group-hover:text-terracotta transition-colors duration-200">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border border-charcoal/20 flex items-center justify-center transition-colors duration-200 ${openIndex === index ? 'bg-terracotta border-terracotta' : 'group-hover:border-terracotta'}`}>
                  {openIndex === index ? (
                    <Minus className="w-3 h-3 text-cream-50" strokeWidth={2.5} />
                  ) : (
                    <Plus className="w-3 h-3 text-charcoal-500 group-hover:text-terracotta" strokeWidth={2.5} />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
              >
                <p className="text-charcoal-500 leading-relaxed pr-10">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Fallback */}
        <div
          className="text-center mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.5s ease-out 0.6s'
          }}
        >
          <p className="font-mono text-sm text-charcoal-400 tracking-wide">
            Hittar du inte svar?{' '}
            <a
              href="mailto:daniel@elivro.se"
              className="text-terracotta hover:text-terracotta-600 transition-colors duration-200"
            >
              Kontakta oss
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
