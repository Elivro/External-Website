/**
 * Single source of truth for the FAQ. Used by FAQSection (the visible UI)
 * and by the FAQPage JSON-LD in app/(app)/layout.tsx so the two never drift.
 */

export type FAQ = { question: string; answer: string }

export const FAQS: readonly FAQ[] = [
  {
    question: 'Hur lång tid tar det att komma igång?',
    answer:
      'Vanligtvis 2–4 veckor från första samtalet till att ni arbetar i systemet dagligen. Vi tar oss tid att göra det rätt — import av data, anpassning efter era rutiner, och utbildning som ger trygghet.',
  },
  {
    question: 'Finns det någon risk att testa Elivro?',
    answer:
      'Nej. Testa systemet i 30 dagar utan förpliktelser. Passar det inte er verksamhet? Avsluta när som helst — inga bindningstider, inga frågor.',
  },
  {
    question: 'Vad kostar Elivro?',
    answer:
      'Elivro är en investering i kvalitet, inte en kostnad att minimera. Prissättningen anpassas efter er verksamhets storlek. Boka ett samtal så visar vi vad som passar er bäst.',
  },
  {
    question: 'Hur säkras personuppgifter enligt GDPR?',
    answer:
      'Elivro är GDPR-kompatibel med kryptering, rollbaserade behörigheter och servrar inom EU. All data behandlas enligt GDPR med högsta säkerhet och integritet.',
  },
  {
    question: 'Hur får vi support?',
    answer:
      'All support sker på svenska, från människor som förstår er bransch. E-post och telefon. Dedikerad hjälp när ni behöver det.',
  },
  {
    question: 'Vad händer med vår data om vi avslutar?',
    answer:
      'Er data är alltid er. Om ni väljer att avsluta får ni en fullständig export i vanliga format (Excel/CSV). Vi raderar era personuppgifter enligt GDPR inom 30 dagar.',
  },
] as const
