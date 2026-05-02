import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Är Elivro rätt för er? | Kvalificeringsquiz',
  description: 'Svara på sex frågor och få en personlig bedömning av hur Elivro kan hjälpa er assistansverksamhet med rekrytering, schemaläggning och kvalitetsledning.',
  openGraph: {
    title: 'Är Elivro rätt för er?',
    description: 'Svara på sex frågor och få en personlig bedömning',
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-ink">
      {children}
    </div>
  )
}
