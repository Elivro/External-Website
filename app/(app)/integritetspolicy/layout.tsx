import type { Metadata } from 'next'

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  alternates: { canonical: '/integritetspolicy' },
  title: 'Integritetspolicy',
  description:
    'Hur Elivro samlar in, använder och skyddar personuppgifter — behandling, rättslig grund, lagringstid och dina rättigheter enligt GDPR.',
  robots: { index: true, follow: true },
}

export default function IntegritetspolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
