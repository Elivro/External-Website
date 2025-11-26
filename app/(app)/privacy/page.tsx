export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Integritetspolicy
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mb-8"></div>
        </div>

        <p className="text-xl text-zinc-400 mb-12">
          Integritetspolicy kommer snart.
        </p>

        <div className="space-y-4 text-zinc-500 text-sm">
          <p>
            Vi arbetar på att färdigställa vår integritetspolicy. Den kommer att beskriva hur vi samlar in,
            använder och skyddar dina personuppgifter i enlighet med GDPR.
          </p>
          <p>
            För frågor om integritet och dataskydd, kontakta oss på{' '}
            <a
              href="mailto:daniel@elivro.se"
              className="text-emerald-400 hover:text-emerald-300 transition-colors underline"
            >
              daniel@elivro.se
            </a>
          </p>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← Tillbaka till startsidan
          </a>
        </div>
      </div>
    </div>
  )
}
