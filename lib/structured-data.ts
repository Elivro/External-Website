/**
 * Structured Data (JSON-LD) Schemas for SEO
 *
 * These schemas help Google understand your content and show rich snippets.
 * Import and use with the JsonLd component.
 */

// Organization Schema - Company information
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://elivro.se/#organization',
  name: 'Elivro AB',
  url: 'https://elivro.se',
  logo: {
    '@type': 'ImageObject',
    url: 'https://elivro.se/logo.png', // TODO: Add actual logo file
  },
  description:
    'AI-driven assistansplanering för svenska assistansföretag. Spara 40% jämfört med AIAI och Tidvis.',
  foundingDate: '2023',
  founders: [
    {
      '@type': 'Person',
      name: 'Jimmy Hermansson',
      jobTitle: 'VD & Grundare',
    },
    {
      '@type': 'Person',
      name: 'Filiph',
      jobTitle: 'CTO',
    },
    {
      '@type': 'Person',
      name: 'Daniel',
      jobTitle: 'Säkerhetschef',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'daniel@elivro.se',
    contactType: 'Customer Service',
    availableLanguage: ['Swedish'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SE',
  },
  // Add social media profiles when created:
  // sameAs: [
  //   'https://www.linkedin.com/company/elivro',
  //   'https://twitter.com/elivro',
  // ],
}

// SoftwareApplication Schema - Product information
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Elivro',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Assistansplanering',
  operatingSystem: 'Web',
  description:
    'AI-driven plattform för assistansföretag som kombinerar smart rekrytering, intelligent schemaläggning och automatisk FK-rapportering.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'SEK',
    lowPrice: '449',
    highPrice: '449', // Update when you have multiple tiers public
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '449',
      priceCurrency: 'SEK',
      unitText: 'per brukare per månad',
    },
  },
  featureList: [
    'AI-driven matchning av assistenter och brukare',
    'Real-time budgetöversikt vid schemaläggning',
    'Automatisk ATL-övervakning',
    'FK-integration (E-RÄK, ELT, E-IOA)',
    'BankID-attestering',
    'Mobilapp för assistenter',
  ],
  screenshot: 'https://elivro.se/elivro-macbook-color.webp',
  // Add aggregateRating when you have reviews:
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: '5.0',
  //   reviewCount: '10',
  // },
}

// FAQ Schema - from FAQSection component
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hur lång tid tar det att komma igång?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Från första demo till go-live tar det vanligtvis 2-4 veckor. Vi hjälper er med konfiguration, dataimport och utbildning av teamet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Finns det någon risk att testa Elivro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nej. Vi erbjuder 30 dagars pengarna-tillbaka-garanti. Ingen bindningstid. Ni kan avsluta när som helst och får full återbetalning om ni inte är nöjda första månaden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad kostar Elivro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elivro kostar från 449 kr/brukare/mån med volymrabatter – ju fler brukare, desto lägre pris per brukare. Typiska kunder sparar 40% jämfört med AIAI och Tidvis. Ingen bindningstid. Boka demo för exakt prissättning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur säkras personuppgifter enligt GDPR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elivro är GDPR-compliant med kryptering, rollbaserade behörigheter och servrar i Sverige. GDPR & PUB-stöd ingår.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur får vi support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All support sker på svenska via e-post (daniel@elivro.se) och telefon. Vi erbjuder dedikerad onboarding-support och löpande hjälp. Support ingår i alla abonnemang.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad händer med vår data om vi avslutar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er data är er egendom. Vid uppsägning får ni en fullständig export av all data i vanliga format (Excel/CSV). Vi raderar era personuppgifter enligt GDPR inom 30 dagar efter avslut.',
      },
    },
  ],
}

// WebSite Schema - Search functionality (add when you have site search)
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://elivro.se/#website',
  url: 'https://elivro.se',
  name: 'Elivro',
  description: 'AI-driven assistansplanering för svenska assistansföretag',
  publisher: {
    '@id': 'https://elivro.se/#organization',
  },
  // Add when you have site search:
  // potentialAction: {
  //   '@type': 'SearchAction',
  //   target: {
  //     '@type': 'EntryPoint',
  //     urlTemplate: 'https://elivro.se/search?q={search_term_string}',
  //   },
  //   'query-input': 'required name=search_term_string',
  // },
}

// BreadcrumbList Schema - Navigation breadcrumbs
// Use this on sub-pages to show navigation hierarchy
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Article Schema - For blog posts
// Use this in blog post pages
export function createArticleSchema(article: {
  title: string
  description: string
  publishedAt: string
  modifiedAt?: string
  author: string
  url: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elivro AB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elivro.se/logo.png',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    url: article.url,
    image: article.imageUrl,
    inLanguage: 'sv-SE',
  }
}
