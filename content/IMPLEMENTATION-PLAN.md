# Content Strategy Implementation Plan
## How to Integrate Content into Elivro.se

**Target:** Transform CONTENT-STRATEGY-INDEX into a high-converting content marketing engine
**Timeline:** 8-12 weeks for full implementation
**Tech Stack:** Next.js 16 (App Router), MDX for content, Tailwind CSS

---

## Phase 1: Site Architecture (Week 1-2)

### 1.1 URL Structure

Create SEO-friendly, logical URL hierarchy:

```
elivro.se/
├── /                           # Homepage (existing)
├── /funktioner                 # Features (existing as "three-pillars")
├── /priser                     # Pricing (existing in CTA section)
├── /om-oss                     # About (existing as FounderStory)
├── /demo                       # Demo booking (existing CTA form)
│
├── /resurser                   # NEW: Resources hub (pillar content)
│   ├── /fk-rapporteringsguide-2026
│   ├── /gdpr-checklista-assistansbolag
│   ├── /lex-sarah-guide
│   └── /ivo-krav-dokumentation
│
├── /jamfor                     # NEW: Comparison hub
│   ├── /aiai-alternativ
│   ├── /tidvis-alternativ
│   ├── /primass-alternativ
│   └── /basta-assistanssystem-2026
│
├── /blogg                      # NEW: Blog for long-tail SEO
│   ├── /ob-tillagg-assistans-2026
│   ├── /e-rak-integration-guide
│   ├── /bankid-attestering-krav
│   └── ... (12 posts total)
│
└── /gratis-testversion         # NEW: Trial signup landing page
```

### 1.2 Navigation Updates

**Primary Navigation (Navbar):**
```tsx
// Current: Utmaningar, Hur det fungerar, Funktioner, Om oss, FAQ, Boka demo
// Add:
- "Resurser" dropdown → Guides, Blog, Jämförelser
```

**New Navbar Component:**
```tsx
const navItems = [
  { label: 'Funktioner', href: '#three-pillars' },
  { label: 'Hur det fungerar', href: '#how-it-works' },
  { label: 'Priser', href: '#cta-section' },
  {
    label: 'Resurser',
    dropdown: [
      { label: 'Guider', href: '/resurser' },
      { label: 'Blogg', href: '/blogg' },
      { label: 'Jämför system', href: '/jamfor' },
    ]
  },
  { label: 'Om oss', href: '#about' },
  { label: 'Boka demo', href: '#cta-section', primary: true }
]
```

**Footer Updates:**
```tsx
// Add "Resurser" column
<footer>
  <div className="grid grid-cols-4 gap-8">
    <div>
      <h4>Produkt</h4>
      <ul>
        <li><Link href="/funktioner">Funktioner</Link></li>
        <li><Link href="/priser">Priser</Link></li>
        <li><Link href="/demo">Boka demo</Link></li>
      </ul>
    </div>

    <div>
      <h4>Resurser</h4>  {/* NEW */}
      <ul>
        <li><Link href="/resurser">Guider</Link></li>
        <li><Link href="/blogg">Blogg</Link></li>
        <li><Link href="/jamfor">Jämför system</Link></li>
      </ul>
    </div>

    <div>
      <h4>Företag</h4>
      <ul>
        <li><Link href="/om-oss">Om oss</Link></li>
        <li><Link href="/kontakt">Kontakt</Link></li>
      </ul>
    </div>

    <div>
      <h4>Juridiskt</h4>
      <ul>
        <li><Link href="/integritetspolicy">Integritet</Link></li>
        <li><Link href="/villkor">Villkor</Link></li>
      </ul>
    </div>
  </div>
</footer>
```

---

## Phase 2: Technical Implementation (Week 2-4)

### 2.1 Content Management Setup

**Option A: MDX Files (Recommended for Now)**

```bash
# Directory structure
app/
├── resurser/
│   ├── page.tsx                    # Resources hub
│   ├── [slug]/
│   │   └── page.tsx                # Dynamic guide pages
│   └── _guides/                    # MDX content
│       ├── fk-rapporteringsguide-2026.mdx
│       ├── gdpr-checklista.mdx
│       ├── lex-sarah-guide.mdx
│       └── ivo-krav-dokumentation.mdx
│
├── jamfor/
│   ├── page.tsx                    # Comparison hub
│   └── [slug]/
│       └── page.tsx                # Dynamic comparison pages
│
└── blogg/
    ├── page.tsx                    # Blog index
    └── [slug]/
        └── page.tsx                # Individual blog posts
```

**Why MDX?**
- ✅ Write content in Markdown (easy to edit)
- ✅ Embed React components (CTAs, forms, interactive elements)
- ✅ Type-safe with TypeScript
- ✅ Fast builds (no external CMS needed yet)
- ✅ Git-based workflow (track changes, review content)

**Install dependencies:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time
npm install rehype-highlight rehype-slug rehype-autolink-headings
```

**Configure next.config.js:**
```js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      require('rehype-highlight'),
      require('rehype-slug'),
      require('rehype-autolink-headings'),
    ],
  },
})

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
```

### 2.2 Convert Markdown to MDX

**Template for Pillar Guides:**

```mdx
---
title: "Komplett FK-Rapporteringsguide 2026"
description: "Allt du behöver veta om Försäkringskassans rapporteringskrav för personlig assistans"
publishedAt: "2025-11-18"
updatedAt: "2025-11-18"
author: "Elivro Team"
category: "Guides"
keywords: ["FK rapportering", "E-RÄK", "assistans", "tidrapporter"]
readingTime: "25 min"
downloadable: true
leadMagnet: true
---

import { DownloadCTA } from '@/components/DownloadCTA'
import { DemoCTA } from '@/components/DemoCTA'

# Komplett FK-Rapporteringsguide 2026

<p className="lead">
FK-rapportering är ryggraden i assistansersättning. **Varje felaktig eller sen rapport
riskerar återkrav, avstängningar och ekonomisk kris** för ditt assistansbolag.
</p>

## Sammanfattning (TL;DR)

**Vad du lär dig i denna guide:**
- ✓ FK-rapporteringskrav 2026 (E-RÄK, tidrapporter, avstämningar)
- ✓ Vanliga fel som leder till återkrav (och hur du undviker dem)
...

<DownloadCTA
  title="Ladda ner som PDF"
  description="Få guiden som PDF + bonus-checklista för månatlig rapportering"
  fileName="FK-Rapporteringsguide-2026.pdf"
/>

## 1. Introduktion: Varför FK-rapportering är kritisk

...content...

<DemoCTA
  variant="inline"
  message="Vill du se hur Elivro automatiserar FK-rapportering?"
/>

...more content...

## 10. Slutsats och Nästa Steg

<DemoCTA
  variant="full"
  headline="Slipp FK-stress med Elivro"
  message="Boka en gratis demo och se hur vi automatiserar hela FK-rapporteringsprocessen"
/>
```

### 2.3 Create Reusable Components

**DownloadCTA Component:**
```tsx
// components/DownloadCTA.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface DownloadCTAProps {
  title: string
  description: string
  fileName: string
}

export function DownloadCTA({ title, description, fileName }: DownloadCTAProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send email to your email service (Resend, ConvertKit, etc.)
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'guide_download',
        guide: fileName
      })
    })

    // Trigger PDF download
    window.open(`/downloads/${fileName}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="my-8 p-8 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl border border-violet-500/20">
        <h3 className="text-2xl font-bold text-white mb-2">✅ Tack! Din guide är på väg</h3>
        <p className="text-zinc-300">
          Vi har skickat PDF:en till <strong>{email}</strong>.
          Kolla din inkorg (och skräppost om du inte ser den).
        </p>
      </div>
    )
  }

  return (
    <div className="my-8 p-8 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl border border-violet-500/20">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-300 mb-4">{description}</p>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          required
          placeholder="din@email.se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
        />
        <Button type="submit" variant="primary">
          Ladda ner gratis
        </Button>
      </form>

      <p className="text-xs text-zinc-500 mt-2">
        Ingen spam. Vi använder din e-post endast för att skicka guiden och relevanta resurser.
      </p>
    </div>
  )
}
```

**DemoCTA Component:**
```tsx
// components/DemoCTA.tsx
import { Button } from '@/components/ui/Button'

interface DemoCTAProps {
  variant?: 'inline' | 'full'
  headline?: string
  message?: string
}

export function DemoCTA({
  variant = 'inline',
  headline = 'Redo att testa Elivro?',
  message = 'Boka en gratis demo'
}: DemoCTAProps) {

  if (variant === 'inline') {
    return (
      <div className="my-6 p-6 bg-zinc-800/30 border-l-4 border-violet-500 rounded-r-lg">
        <p className="text-white font-medium mb-3">{message}</p>
        <Button href="#cta-section" variant="secondary">
          Boka demo
        </Button>
      </div>
    )
  }

  return (
    <div className="my-12 p-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 text-center">
      <h3 className="text-3xl font-bold text-white mb-4">{headline}</h3>
      <p className="text-xl text-zinc-300 mb-6 max-w-2xl mx-auto">{message}</p>
      <div className="flex gap-4 justify-center">
        <Button href="#cta-section" variant="primary" size="lg">
          Boka gratis demo
        </Button>
        <Button href="/gratis-testversion" variant="secondary" size="lg">
          Starta testversion
        </Button>
      </div>
      <p className="text-sm text-zinc-400 mt-4">
        ✓ 30 dagars pengarna-tillbaka · ✓ Ingen bindningstid · ✓ Inget kreditkort krävs
      </p>
    </div>
  )
}
```

---

## Phase 3: Content Pages Implementation (Week 3-5)

### 3.1 Resources Hub Page

**File: `app/resurser/page.tsx`**

```tsx
import Link from 'next/link'
import { getAllGuides } from '@/lib/content'

export const metadata = {
  title: 'Resurser för Assistansbolag | Elivro',
  description: 'Guider, checklistor och resurser för att driva högkvalitativ personlig assistans',
}

export default async function ResourcesPage() {
  const guides = await getAllGuides()

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Resurser för Assistansbolag
          </h1>
          <p className="text-xl text-zinc-300">
            Guider, checklistor och verktyg för att navigera FK-krav, GDPR,
            Lex Sarah och IVO-inspektioner.
          </p>
        </div>
      </section>

      {/* Pillar Guides Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            Kompletta Guider
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/resurser/${guide.slug}`}
                className="group p-8 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-violet-500/50 rounded-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">📚</div>
                  {guide.leadMagnet && (
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full">
                      Gratis nedladdning
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {guide.title}
                </h3>

                <p className="text-zinc-400 mb-4">
                  {guide.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span>⏱ {guide.readingTime}</span>
                  <span>📥 {guide.downloads || 0} nedladdningar</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vill du förenkla FK, GDPR och IVO?
          </h2>
          <p className="text-xl text-zinc-300 mb-6">
            Elivro automatiserar compliance så du kan fokusera på kvalitetsassistans.
          </p>
          <Link
            href="/demo"
            className="inline-block px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Boka gratis demo
          </Link>
        </div>
      </section>
    </div>
  )
}
```

### 3.2 Dynamic Guide Pages

**File: `app/resurser/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getGuideBySlug, getAllGuides } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { DownloadCTA } from '@/components/DownloadCTA'
import { DemoCTA } from '@/components/DemoCTA'

const components = {
  DownloadCTA,
  DemoCTA,
}

export async function generateStaticParams() {
  const guides = await getAllGuides()
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = await getGuideBySlug(params.slug)

  if (!guide) return {}

  return {
    title: `${guide.title} | Elivro`,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
    },
  }
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = await getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Article Header */}
      <header className="pt-32 pb-12 px-4 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full">
              {guide.category}
            </span>
            <span className="text-zinc-500">⏱ {guide.readingTime}</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            {guide.title}
          </h1>

          <p className="text-xl text-zinc-400">
            {guide.description}
          </p>

          <div className="flex items-center gap-6 mt-6 text-sm text-zinc-500">
            <span>Senast uppdaterad: {new Date(guide.updatedAt).toLocaleDateString('sv-SE')}</span>
            <span>·</span>
            <span>Av {guide.author}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-zinc prose-lg">
          <MDXRemote source={guide.content} components={components} />
        </div>
      </article>

      {/* Related Content */}
      <section className="py-12 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Fler resurser</h2>
          {/* Show related guides */}
        </div>
      </section>
    </div>
  )
}
```

### 3.3 Content Helper Functions

**File: `lib/content.ts`**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Guide {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  updatedAt: string
  author: string
  category: string
  keywords: string[]
  readingTime: string
  downloadable: boolean
  leadMagnet: boolean
  downloads?: number
}

export async function getAllGuides(): Promise<Guide[]> {
  const guidesDir = path.join(contentDirectory, 'pillar-guides')
  const files = fs.readdirSync(guidesDir)

  const guides = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const fullPath = path.join(guidesDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        content,
        publishedAt: data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        author: data.author || 'Elivro Team',
        category: data.category || 'Guides',
        keywords: data.keywords || [],
        readingTime: readingTime(content).text,
        downloadable: data.downloadable || false,
        leadMagnet: data.leadMagnet || false,
      }
    })

  return guides.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  try {
    const fullPath = path.join(contentDirectory, 'pillar-guides', `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author,
      category: data.category,
      keywords: data.keywords,
      readingTime: readingTime(content).text,
      downloadable: data.downloadable,
      leadMagnet: data.leadMagnet,
    }
  } catch {
    return null
  }
}
```

---

## Phase 4: SEO Optimization (Week 5-6)

### 4.1 Metadata & Schema Markup

**Add JSON-LD structured data to guides:**

```tsx
// In app/resurser/[slug]/page.tsx

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = await getGuideBySlug(params.slug)

  if (!guide) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Organization',
      name: 'Elivro AB',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elivro AB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elivro.se/logo.png',
      },
    },
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    keywords: guide.keywords.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Rest of page */}
    </>
  )
}
```

### 4.2 Sitemap Generation

**File: `app/sitemap.ts`**

```ts
import { MetadataRoute } from 'next'
import { getAllGuides } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getAllGuides()

  const guideUrls = guides.map((guide) => ({
    url: `https://elivro.se/resurser/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://elivro.se',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://elivro.se/resurser',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guideUrls,
  ]
}
```

### 4.3 Robots.txt

**File: `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://elivro.se/sitemap.xml
```

---

## Phase 5: Lead Capture & Analytics (Week 6-7)

### 5.1 Email Capture API

**File: `app/api/leads/route.ts`**

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, source, guide } = await request.json()

    // Save to database (or Airtable, Google Sheets, etc.)
    // For now, just send email notification

    await resend.emails.send({
      from: 'Elivro <noreply@elivro.se>',
      to: email,
      subject: `Din guide: ${guide}`,
      html: `
        <h1>Tack för ditt intresse!</h1>
        <p>Här är din guide: <a href="https://elivro.se/downloads/${guide}">Ladda ner PDF</a></p>
        <p>Vi hör av oss snart med mer resurser.</p>
        <p>Vill du se Elivro i aktion? <a href="https://elivro.se/demo">Boka en gratis demo</a></p>
      `,
    })

    // Notify internal team
    await resend.emails.send({
      from: 'Leads <leads@elivro.se>',
      to: 'daniel@elivro.se',
      subject: `🎯 Ny lead: ${email}`,
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Guide:</strong> ${guide}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return Response.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}
```

### 5.2 Analytics Tracking

**Install Plausible or Google Analytics:**

```bash
npm install next-plausible
```

**File: `app/layout.tsx`**

```tsx
import PlausibleProvider from 'next-plausible'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <PlausibleProvider domain="elivro.se" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Track custom events:**

```tsx
'use client'

import { usePlausible } from 'next-plausible'

export function DownloadCTA() {
  const plausible = usePlausible()

  const handleSubmit = async (e) => {
    e.preventDefault()

    plausible('Guide Download', { props: { guide: fileName } })

    // ... rest of submit logic
  }
}
```

---

## Phase 6: Blog Implementation (Week 7-8)

### 6.1 Blog Index Page

**File: `app/blogg/page.tsx`**

```tsx
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/content'

export const metadata = {
  title: 'Blogg | Elivro',
  description: 'Tips, guider och nyheter om personlig assistans',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">Blogg</h1>
          <p className="text-xl text-zinc-300">
            Tips, guider och nyheter för assistansbolag
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="block p-8 bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-zinc-500">
                  {new Date(post.publishedAt).toLocaleDateString('sv-SE')}
                </span>
                <span className="text-zinc-700">·</span>
                <span className="text-xs text-zinc-500">{post.readingTime}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 hover:text-violet-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-zinc-400">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
```

### 6.2 Create First Blog Posts

Start with 2-3 posts from the strategy:

1. **"Hur Fungerar OB-Tillägg 2026?"** - Quick practical guide
2. **"FK-återkrav: Hur Undvika Tidrapporteringsfel"** - Prevention tips
3. **"BankID Attestering: Juridiska Krav"** - Compliance explainer

**Publishing schedule:** 2 posts per month

---

## Phase 7: Comparison Pages (Week 8-10)

### 7.1 Comparison Hub

**File: `app/jamfor/page.tsx`**

Similar to resources hub, but focusing on competitive comparisons.

### 7.2 Individual Comparison Pages

Use same MDX approach as guides, but with comparison-specific components:

```tsx
// components/ComparisonTable.tsx
export function ComparisonTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th>Funktion</th>
            <th>Konkurent</th>
            <th className="bg-violet-500/10">Elivro</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.feature}>
              <td>{row.feature}</td>
              <td>{row.competitor}</td>
              <td className="bg-violet-500/5">{row.elivro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## Phase 8: Performance & Launch (Week 11-12)

### 8.1 Optimization Checklist

- [ ] **Image optimization** - Use Next.js `<Image>` component
- [ ] **Code splitting** - Lazy load heavy components
- [ ] **Caching** - Set proper cache headers
- [ ] **Minification** - Already handled by Next.js
- [ ] **Lighthouse score** - Target 90+ on all metrics

### 8.2 Pre-Launch Testing

**SEO Checklist:**
- [ ] All pages have unique titles
- [ ] Meta descriptions under 160 characters
- [ ] H1 tags present on all pages
- [ ] Internal linking structure logical
- [ ] Sitemap submitted to Google Search Console
- [ ] Robots.txt allows crawling

**Content Checklist:**
- [ ] All CTAs working
- [ ] Forms submit correctly
- [ ] Email capture triggers emails
- [ ] PDF downloads functional
- [ ] Mobile responsive

**Analytics Checklist:**
- [ ] Plausible tracking active
- [ ] Goal tracking configured
- [ ] Event tracking working

---

## Recommended Tech Stack Summary

```json
{
  "framework": "Next.js 16 (App Router)",
  "styling": "Tailwind CSS",
  "content": "MDX files (local, git-based)",
  "email": "Resend",
  "analytics": "Plausible Analytics",
  "hosting": "Vercel",
  "forms": "React Hook Form",
  "future-cms": "Consider Sanity.io or Contentful when scaling"
}
```

---

## Alternative: Quick MVP Approach (2 weeks)

If you want to launch faster:

1. **Week 1:** Convert 2 pillar guides to static pages (no MDX)
2. **Week 1:** Add 1 comparison page (AIAI Alternativ)
3. **Week 1:** Simple email capture form (hardcoded)
4. **Week 2:** Basic blog index with 2 posts
5. **Week 2:** SEO optimization & launch

**Skip for MVP:**
- Dynamic routing
- Complex MDX setup
- Analytics initially
- Full blog implementation

**Focus on:**
- Getting content live
- SEO basics
- Lead capture
- Quick iteration

---

## Success Metrics (3-6 months post-launch)

Track these KPIs:

**SEO:**
- Organic traffic growth (target: 50-100/month after 3 months)
- Keyword rankings (target: Top 10 for 3-5 keywords)
- Backlinks acquired (target: 10-15)

**Conversions:**
- Guide downloads (target: 20-30/month)
- Demo bookings from content (target: 5-10/month)
- Email list growth (target: 50-100 subscribers)

**Engagement:**
- Avg. time on page (target: >3 minutes for guides)
- Bounce rate (target: <60%)
- Pages per session (target: >2)

---

## Next Steps

Ready to implement? Here's what I recommend:

1. **Start with Phase 1-2** (Architecture + Tech Setup) - Get the foundation right
2. **Then Phase 3** (Resources Hub) - Launch pillar guides as first content
3. **Iterate from there** based on what resonates

Want me to help implement any specific phase? I can:
- Generate the MDX files with frontmatter
- Create the component code
- Set up the directory structure
- Build the API routes

Let me know where you'd like to start! 🚀
