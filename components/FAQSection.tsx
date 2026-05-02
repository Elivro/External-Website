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
      answer: 'Vanligtvis 2–4 veckor från första samtalet till att ni arbetar i systemet dagligen. Vi tar oss tid att göra det rätt — import av data, anpassning efter era rutiner, och utbildning som ger trygghet.',
    },
    {
      question: 'Finns det någon risk att testa Elivro?',
      answer: 'Nej. Testa systemet i 30 dagar utan förpliktelser. Passar det inte er verksamhet? Avsluta när som helst — inga bindningstider, inga frågor.',
    },
    {
      question: 'Vad kostar Elivro?',
      answer: 'Elivro är en investering i kvalitet, inte en kostnad att minimera. Prissättningen anpassas efter er verksamhets storlek. Boka ett samtal så visar vi vad som passar er bäst.',
    },
    {
      question: 'Hur säkras personuppgifter enligt GDPR?',
      answer: 'Elivro är GDPR-kompatibel med kryptering, rollbaserade behörigheter och servrar inom EU. All data behandlas enligt GDPR med högsta säkerhet och integritet.',
    },
    {
      question: 'Hur får vi support?',
      answer: 'All support sker på svenska, från människor som förstår er bransch. E-post och telefon. Dedikerad hjälp när ni behöver det.',
    },
    {
      question: 'Vad händer med vår data om vi avslutar?',
      answer: 'Er data är alltid er. Om ni väljer att avsluta får ni en fullständig export i vanliga format (Excel/CSV). Vi raderar era personuppgifter enligt GDPR inom 30 dagar.',
    },
  ]

  const toggleFAQ = (index: number) => {
    if (toggleTimeoutRef.current) clearTimeout(toggleTimeoutRef.current)
    toggleTimeoutRef.current = setTimeout(() => {
      setOpenIndex((prev) => (prev === index ? null : index))
      toggleTimeoutRef.current = null
    }, 10)
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-title"
      className="w-full bg-ink py-24 md:py-32 relative"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <header className="mb-16 md:mb-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-muted mb-4">
            Vanliga frågor
          </p>
          <h2
            id="faq-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-light text-fg tracking-[-0.021em] leading-[1.05]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            Det vi <em className="font-serif italic">brukar</em> få frågor om.
          </h2>
        </header>

        <div className="border-t border-edge">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-edge"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 500ms cubic-bezier(0.2, 0.7, 0.2, 1) ${100 + index * 40}ms, transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1) ${100 + index * 40}ms`,
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center gap-4 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-obs-sm group"
                aria-expanded={openIndex === index}
                type="button"
              >
                <h3
                  className={`font-serif text-lg md:text-xl font-normal pr-4 leading-[1.3] transition-colors ease-obsidian duration-obs-sm ${
                    openIndex === index ? 'text-accent' : 'text-fg group-hover:text-accent'
                  }`}
                >
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ease-obsidian duration-obs-sm ${
                    openIndex === index
                      ? 'border-accent bg-accent text-ink'
                      : 'border-edge-strong text-fg-soft group-hover:border-accent group-hover:text-accent'
                  }`}
                >
                  {openIndex === index ? <Minus className="w-3.5 h-3.5" strokeWidth={2.5} /> : <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all ease-obsidian duration-obs-md ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-fg-soft leading-[1.55] pr-10">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 500ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) 500ms',
          }}
        >
          <p className="text-fg-muted text-sm">
            Hittar du inte svar?{' '}
            <a
              href="mailto:daniel@elivro.se"
              className="text-fg-soft hover:text-accent transition-colors ease-obsidian duration-obs-sm underline underline-offset-2"
            >
              Skriv till daniel@elivro.se
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
