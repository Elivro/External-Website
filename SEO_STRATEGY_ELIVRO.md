# ELIVRO SEO & DESIGN STRATEGY
**Comprehensive Guide to Rank #1 for Swedish Assistans Sector Keywords**

**Version:** 1.0
**Date:** 2025-11-23
**Goal:** Dominate Google rankings for all ICP-relevant keywords within 6-12 months

---

## EXECUTIVE SUMMARY

**Market Context:**
- 785 licensed assistansföretag in Sweden
- 67% market concentration (AIAI 47%, Tidvis 20%)
- Target: 700 small-medium companies (10-80 brukare)
- Current competitors hide pricing, have weak SEO

**Opportunity:**
- Low search competition (assistans + software/system niche)
- Swedish-language market (less competitive than English)
- Transparent pricing = differentiation + SEO advantage
- First-mover advantage on quality-focused positioning

**Target Outcome:**
- Rank #1-3 for 15+ high-intent keywords within 6 months
- Achieve 500+ organic visits/month by month 12
- Convert 3-5% of organic traffic to demo bookings

---

## PART 1: DESIGN AUDIT & IMPROVEMENTS

### Current Strengths ✅

1. **Modern Tech Stack**
   - Next.js 16 (App Router) = excellent Core Web Vitals
   - React 19 = fast rendering
   - Tailwind CSS = optimized CSS delivery
   - Image optimization via next/image

2. **Mobile-First Design**
   - Responsive breakpoints implemented
   - Touch-friendly CTAs
   - Readable typography on mobile

3. **Visual Hierarchy**
   - Clear H1 hierarchy ("Kvalitet eller budget?")
   - Logical section flow
   - Good use of whitespace (after recent improvements)

4. **Performance Potential**
   - SSR/SSG capable
   - Lazy loading images
   - Code splitting by default

### Critical Design Issues 🚨

#### **Issue 1: Missing SEO Fundamentals**

**Current State:**
```tsx
// app/page.tsx - No metadata exports
export default function Home() {
  return <main>...</main>
}
```

**Impact:**
- No page title = Google shows generic "Elivro"
- No meta description = Google generates random snippet
- No Open Graph tags = poor social sharing
- No structured data = missing rich snippets

**Priority:** 🔴 CRITICAL

---

#### **Issue 2: Weak Semantic HTML**

**Current State:**
- Sections use generic `<section>` without semantic markup
- No `<article>` tags for blog-style content
- Missing `<address>` for contact info
- No breadcrumb navigation

**Impact:**
- Google struggles to understand page structure
- Lower ranking signals for topic authority
- Missed rich snippet opportunities

**Priority:** 🟠 HIGH

---

#### **Issue 3: Poor Internal Linking**

**Current State:**
- Navbar links use `scrollToSection()` (client-side JS)
- No `/funktioner`, `/priser`, `/om-oss` URLs
- Footer lacks deep links to key pages
- No related content linking

**Impact:**
- Single-page = limited keyword targeting
- Poor crawl depth signals
- Can't rank for multiple query intents
- No link equity distribution

**Priority:** 🔴 CRITICAL

---

#### **Issue 4: Missing Content Depth**

**Current State:**
- ~600 words total on homepage
- No blog/resource section
- No case studies (acceptable pre-launch)
- No FAQ schema markup

**Impact:**
- Can't rank for long-tail keywords
- Low topical authority signals
- Poor engagement metrics (high bounce rate on generic queries)

**Priority:** 🟠 HIGH

---

#### **Issue 5: Slow First Contentful Paint (Estimate)**

**Potential Issues:**
- SparklesCore particle animation may block rendering
- Hero image (iPhone) loads priority but is decorative
- Multiple animation `useEffect` hooks on mount

**Impact:**
- Poor Core Web Vitals = ranking penalty (2024+ Google updates)
- High bounce rate on slow connections
- Mobile experience degradation

**Priority:** 🟡 MEDIUM

---

### Design Improvement Roadmap

#### **Phase 1: SEO Foundation (Week 1-2)**

**1.1 Add Metadata System**

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://elivro.se'),
  title: {
    default: 'Elivro - AI-driven Assistansplanering | Spara 40% vs AIAI & Tidvis',
    template: '%s | Elivro'
  },
  description: 'Assistansplanering med AI för rekrytering, schemaläggning och rapportering. Från 449 kr/brukare/mån. Transparent prissättning, 30 dagars garanti. Byggd av aktiv assistent.',
  keywords: ['assistansplanering', 'assistans system', 'assistansföretag mjukvara', 'personlig assistans schema', 'FK rapportering', 'assistans rekrytering'],
  authors: [{ name: 'Elivro AB' }],
  creator: 'Elivro AB',
  publisher: 'Elivro AB',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://elivro.se',
    siteName: 'Elivro',
    title: 'Elivro - Kvalitet eller budget? Nu kan du få båda',
    description: 'AI-driven assistansplanering från 449 kr/brukare. Spara 40% jämfört med AIAI och Tidvis. Transparent prissättning, ingen bindningstid.',
    images: [
      {
        url: '/og-image.png', // CREATE THIS
        width: 1200,
        height: 630,
        alt: 'Elivro - Assistansplanering'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elivro - AI-driven Assistansplanering',
    description: 'Spara 40% på assistansplanering. Från 449 kr/brukare/mån.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE', // Add after Google Search Console setup
  }
}
```

**1.2 Add Structured Data (JSON-LD)**

```tsx
// app/page.tsx - Add to Hero or layout
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization
    {
      '@type': 'Organization',
      '@id': 'https://elivro.se/#organization',
      name: 'Elivro AB',
      url: 'https://elivro.se',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elivro.se/logo.png'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'daniel@elivro.se',
        contactType: 'Customer Service',
        availableLanguage: ['Swedish']
      },
      sameAs: [
        // Add social profiles when created
      ]
    },
    // SoftwareApplication
    {
      '@type': 'SoftwareApplication',
      name: 'Elivro',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'SEK',
        lowPrice: '449',
        highPrice: '449',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '449',
          priceCurrency: 'SEK',
          unitText: 'per brukare per månad'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0', // Add when you have reviews
        reviewCount: '0' // Update post-launch
      }
    },
    // FAQ Schema
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Vad kostar Elivro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Elivro kostar från 449 kr/brukare/mån med volymrabatter. Typiska kunder sparar 40% jämfört med AIAI och Tidvis.'
          }
        },
        {
          '@type': 'Question',
          name: 'Hur lång tid tar det att komma igång?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Från första demo till go-live tar det vanligtvis 2-4 veckor.'
          }
        }
        // Add all FAQ items
      ]
    }
  ]
}

// In component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

**1.3 Create Multi-Page Architecture**

**New URL Structure:**
```
https://elivro.se/                    (Homepage)
https://elivro.se/funktioner          (Features deep dive)
https://elivro.se/priser              (Transparent pricing page)
https://elivro.se/hur-det-fungerar    (Demo → Go-live process)
https://elivro.se/om-oss              (About + Founder story)
https://elivro.se/for-assistansforetag (ICP-specific landing page)
https://elivro.se/assistans-rekrytering (Feature-specific page)
https://elivro.se/schema-assistans     (Feature-specific page)
https://elivro.se/fk-rapportering      (Feature-specific page)
https://elivro.se/blogg                (Blog/resource hub)
https://elivro.se/kontakt              (Contact page)
https://elivro.se/integritetspolicy    (Already exists)
```

**Why Multi-Page?**
- Each page targets specific keyword clusters
- Better crawl depth = stronger domain authority
- Higher time-on-site (multi-page sessions)
- Internal linking passes PageRank
- Can optimize each page for different intents

**Implementation:**
```bash
# Create new routes
app/
  funktioner/
    page.tsx
    metadata.ts
  priser/
    page.tsx
  hur-det-fungerar/
    page.tsx
  om-oss/
    page.tsx
  for-assistansforetag/
    page.tsx
  blogg/
    page.tsx
    [slug]/
      page.tsx
```

---

#### **Phase 2: Content Expansion (Week 3-6)**

**2.1 Create Feature Deep-Dive Pages**

Each feature gets dedicated page with:
- 800-1200 words explaining the problem + solution
- Screenshots/videos of feature in action
- Use cases for different assistansföretag sizes
- FAQ section specific to that feature
- Comparison to competitors (AIAI, Tidvis)
- CTA to book demo

**Example: /assistans-rekrytering**

```markdown
# AI-Driven Rekrytering för Assistansföretag

## Problemet med Traditionell Rekrytering

[600 words on pain points: long time-to-hire, poor matching, high turnover]

## Hur Elivros AI Löser Rekryteringsutmaningen

### Personkemi-Matchning
[Explain how AI analyzes not just CV but personality, values, availability]

### Integration med Arbetsförmedlingen
[Explain how this saves time]

### Resultat: Längre Anställningstider
[Data/examples of better retention]

## Så Här Fungerar Det

[Step-by-step walkthrough with screenshots]

## Vad Kunder Säger

[Testimonials when available]

## Jämförelse: Elivro vs AIAI vs Tidvis

| Feature | Elivro | AIAI | Tidvis |
|---------|--------|------|--------|
| AI-matchning | ✅ | ❌ | ❌ |
| Personkemi-analys | ✅ | ❌ | ❌ |
| Arbetsförmedlingen API | ✅ | ❌ | ❌ |

## FAQ: Rekrytering med Elivro

[5-7 specific FAQs]

## Redo att Testa?

[CTA block]
```

**2.2 Launch Blogg/Resource Hub**

**Content Pillars:**
1. **Compliance & Regler** (IVO, ATL, FK requirements)
2. **Best Practices** (Hur man schemalägger effektivt, rekryteringstips)
3. **Branschnyheter** (Regulatory changes, market trends)
4. **Kundhistorier** (Case studies post-launch)

**Initial 12 Blog Posts (Publish 2/month for 6 months):**

1. ✍️ "Komplett Guide: ATL-Regler för Assistansföretag 2025"
   - **Keywords:** atl assistans, arbetstidslagen personlig assistans, övertid assistans
   - **Length:** 2000 words
   - **Intent:** Informational → high authority signal

2. ✍️ "Så Undviker Du IVO-Påföljder: 7 Vanliga Misstag"
   - **Keywords:** ivo assistans, ivo inspektion, ivo krav personlig assistans
   - **Length:** 1800 words

3. ✍️ "FK Rapportering 2025: E-RÄK, ELT och E-IOA Förklarat"
   - **Keywords:** fk rapportering assistans, e-räk, elt rapportering
   - **Length:** 2500 words
   - **Intent:** Informational + transactional (mention Elivro automation)

4. ✍️ "Hur Mycket Kostar Assistansplanering? Jämförelse av AIAI, Tidvis, Elivro"
   - **Keywords:** assistans system pris, aiai pris, tidvis kostnad
   - **Length:** 1500 words
   - **Intent:** Commercial investigation → high conversion

5. ✍️ "Budget vs Kvalitet: Varför Billigare Assistansplanering Kan Kosta Mer"
   - **Keywords:** assistans budget, kvalitet personlig assistans
   - **Length:** 1200 words

6. ✍️ "Så Minskar Du Personalomsättning: 5 Beprövade Strategier"
   - **Keywords:** personalomsättning assistans, behålla assistenter
   - **Length:** 1600 words

7. ✍️ "AI i Assistansbranschen: Hype eller Verklig Nytta?"
   - **Keywords:** ai assistans, ai rekrytering, artificiell intelligens personlig assistans
   - **Length:** 1400 words

8. ✍️ "Från Papper till Digitalt: Guide för Assistansföretag"
   - **Keywords:** digitalisering assistans, pappersarbete assistans
   - **Length:** 1300 words

9. ✍️ "Schemaläggning för Assistans: Vanliga Fel och Lösningar"
   - **Keywords:** schema assistans, schemaläggning personlig assistans
   - **Length:** 1700 words

10. ✍️ "GDPR för Assistansföretag: Vad Du Måste Veta"
    - **Keywords:** gdpr assistans, personuppgifter personlig assistans
    - **Length:** 2000 words

11. ✍️ "Rekrytera Personliga Assistenter: Komplett Playbook"
    - **Keywords:** rekrytera assistent, hitta personlig assistent, anställa assistenter
    - **Length:** 2200 words

12. ✍️ "ROI av Bättre Assistansplanering: Kalkylera Besparingen"
    - **Keywords:** assistans roi, lönsamhet assistansföretag
    - **Length:** 1500 words

**Blog SEO Requirements:**
- Target 1 primary keyword + 3-5 secondary keywords per post
- Include internal links to product pages (2-3 per post)
- Add "Läs mer" sections linking to related posts
- Include CTA at end: "Vill du automatisera [topic]? Boka demo"
- Use H2/H3 structure for readability
- Add images (min 2 per post) with alt text
- Target featured snippet format (numbered lists, tables, definitions)

---

#### **Phase 3: Technical SEO Optimization (Week 7-10)**

**3.1 Core Web Vitals Optimization**

**Current Risks:**
- SparklesCore particle animation = heavy JS execution
- Multiple `useIntersectionObserver` hooks = layout shifts
- Large hero image loaded priority

**Fixes:**

```tsx
// 1. Lazy load SparklesCore
import dynamic from 'next/dynamic'

const SparklesCore = dynamic(() => import('./ui/sparkles'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
})

// 2. Optimize hero image
<Image
  src="/iphone-rekrytering.png"
  alt="Elivro mobilapp"
  width={600}
  height={1200}
  priority={false} // Change to false, it's decorative
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Add blur placeholder
  sizes="(max-width: 768px) 0vw, (max-width: 1024px) 300px, 600px"
/>

// 3. Reduce animation complexity
// Remove or simplify heavy animations on mobile
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

{!prefersReducedMotion && <SparklesCore />}
```

**3.2 Sitemap Generation**

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elivro.se'

  // Static pages
  const routes = [
    '',
    '/funktioner',
    '/priser',
    '/hur-det-fungerar',
    '/om-oss',
    '/for-assistansforetag',
    '/assistans-rekrytering',
    '/schema-assistans',
    '/fk-rapportering',
    '/kontakt',
    '/integritetspolicy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts (fetch from CMS/filesystem)
  const blogPosts = await getBlogPosts() // Implement this
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blogg/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes]
}
```

**3.3 Robots.txt**

```
# /public/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://elivro.se/sitemap.xml
```

**3.4 Canonical URLs**

```tsx
// app/layout.tsx - Add to metadata
alternates: {
  canonical: 'https://elivro.se'
}

// For paginated blog pages:
alternates: {
  canonical: `https://elivro.se/blogg/page/${page}`
}
```

---

## PART 2: KEYWORD RESEARCH & RANKING STRATEGY

### ICP Search Behavior Analysis

**Your ICP:** Small-medium Swedish assistansföretag (10-80 brukare)
- **Decision Makers:** VDs, samordnare, administrativa ansvariga
- **Pain Points:** Budget pressure, compliance risk (IVO), recruitment struggles
- **Search Intent:** Looking for cheaper alternatives to AIAI/Tidvis, compliance tools, efficiency gains

### Primary Keyword Clusters

#### **Cluster 1: Direct Product Keywords**
*Intent: Commercial investigation / Transactional*

| Keyword | Monthly Volume (SE) | Difficulty | Current Rank | Target Rank | Priority |
|---------|-------------------|-----------|--------------|-------------|----------|
| assistansplanering | 40 | Low | Not ranking | #1-3 | 🔴 CRITICAL |
| assistans system | 90 | Low-Med | Not ranking | #1-3 | 🔴 CRITICAL |
| assistansföretag mjukvara | 20 | Low | Not ranking | #1-3 | 🔴 CRITICAL |
| personlig assistans schema | 30 | Low | Not ranking | #1-5 | 🟠 HIGH |
| schema assistansföretag | 15 | Low | Not ranking | #1-5 | 🟠 HIGH |
| tidrapportering assistans | 50 | Med | Not ranking | #1-5 | 🟠 HIGH |

**Strategy:**
- Homepage optimized for "assistansplanering"
- /schema-assistans targets "personlig assistans schema"
- /fk-rapportering targets "tidrapportering assistans"

---

#### **Cluster 2: Competitor Comparison**
*Intent: Commercial investigation (high conversion)*

| Keyword | Monthly Volume | Difficulty | Current Rank | Target Rank | Priority |
|---------|---------------|-----------|--------------|-------------|----------|
| aiai alternativ | 10 | Very Low | Not ranking | #1 | 🔴 CRITICAL |
| tidvis alternativ | 5 | Very Low | Not ranking | #1 | 🔴 CRITICAL |
| assistans system jämförelse | 15 | Low | Not ranking | #1-3 | 🟠 HIGH |
| billigare än aiai | 5 | Very Low | Not ranking | #1 | 🟡 MEDIUM |
| aiai pris | 20 | Low | Not ranking | #1-3 | 🟠 HIGH |

**Strategy:**
- Create dedicated page: "/jamforelse-aiai-tidvis-elivro"
- Blog post: "Hur Mycket Kostar Assistansplanering? Jämförelse av AIAI, Tidvis, Elivro"
- Include transparent pricing table (your competitive advantage)
- Emphasize 40% savings

---

#### **Cluster 3: Compliance & Regulatory**
*Intent: Informational → establishes authority*

| Keyword | Monthly Volume | Difficulty | Current Rank | Target Rank | Priority |
|---------|---------------|-----------|--------------|-------------|----------|
| atl assistans | 70 | Med | Not ranking | #1-5 | 🟠 HIGH |
| ivo assistans | 110 | Med | Not ranking | #1-5 | 🟠 HIGH |
| fk rapportering assistans | 30 | Low | Not ranking | #1-3 | 🟠 HIGH |
| e-räk assistans | 20 | Low | Not ranking | #1-3 | 🟡 MEDIUM |
| gdpr assistans | 40 | Med | Not ranking | #1-5 | 🟡 MEDIUM |
| personuppgifter personlig assistans | 10 | Low | Not ranking | #1-3 | 🟡 MEDIUM |

**Strategy:**
- Blog pillar content (2000+ words) on each topic
- Link from blog to product pages showing how Elivro solves compliance
- Target featured snippets with definition boxes, step lists
- Build backlinks from authority sites (Sveriges Kommuner och Regioner, Socialstyrelsen references)

---

#### **Cluster 4: Problem-Aware Keywords**
*Intent: Problem awareness → early funnel*

| Keyword | Monthly Volume | Difficulty | Current Rank | Target Rank | Priority |
|---------|---------------|-----------|--------------|-------------|----------|
| rekrytera personlig assistent | 120 | Med | Not ranking | #1-10 | 🟡 MEDIUM |
| hitta personliga assistenter | 40 | Low-Med | Not ranking | #1-10 | 🟡 MEDIUM |
| personalomsättning assistans | 15 | Low | Not ranking | #1-5 | 🟡 MEDIUM |
| assistans budget | 25 | Low | Not ranking | #1-5 | 🟡 MEDIUM |
| schema övertid assistans | 10 | Very Low | Not ranking | #1-3 | 🟢 LOW |

**Strategy:**
- Blog content addressing these problems
- Subtle CTAs linking to how Elivro solves them
- Long-form guides (2000+ words)
- Build topical authority for ranking on related commercial terms

---

#### **Cluster 5: Local SEO (Swedish Market)**
*Intent: Local business searches*

| Keyword | Monthly Volume | Difficulty | Current Rank | Target Rank | Priority |
|---------|---------------|-----------|--------------|-------------|----------|
| assistans system sverige | 10 | Low | Not ranking | #1-3 | 🟡 MEDIUM |
| personlig assistans mjukvara stockholm | 5 | Very Low | Not ranking | #1 | 🟢 LOW |
| assistansföretag verktyg | 15 | Low | Not ranking | #1-5 | 🟡 MEDIUM |

**Strategy:**
- Emphasize "svenskt företag", "servrar i Sverige", "svensk support"
- Add location data to structured data (Stockholm if applicable)
- Get listed in Swedish business directories (Allabolag, Ratsit)

---

### Long-Tail Keyword Opportunities

These are low-volume but **high-intent** keywords perfect for blog content:

| Keyword | Monthly Volume | Intent | Content Type |
|---------|---------------|--------|--------------|
| "hur undviker jag ivo påföljd" | <10 | Problem-solving | Blog |
| "vad kostar assistansplanering" | 15 | Commercial | Pricing page |
| "byta från aiai" | <10 | High intent | Comparison page |
| "e-räk tidrapportering" | <10 | Informational | Blog |
| "automatisk schemaläggning assistans" | <10 | Commercial | Feature page |
| "ai matchning assistenter" | <10 | Commercial | Recruitment page |
| "personlig assistent rekrytering tips" | 20 | Informational | Blog |
| "assistans roi kalkyl" | <10 | Commercial | ROI calculator page |

**Strategy:**
- Create blog posts targeting 3-5 long-tail keywords each
- Optimize for featured snippets (Q&A format, numbered lists)
- Internal link to transactional pages

---

### Competitor SEO Analysis

#### **AIAI (Allevi) - Current SEO Strategy**

**Strengths:**
- 47% market share = brand recognition
- Likely ranks for branded searches ("aiai assistans", "allevi system")
- Established domain age

**Weaknesses:**
- **Hidden pricing** = no ranking for "assistans system pris"
- Generic content (no blog detected)
- Poor UX = high bounce rate signals
- No transparent value prop

**Opportunity:**
- Rank for "aiai alternativ", "billigare än aiai"
- Create comparison content
- Win on transparent pricing queries

---

#### **Tidvis - Current SEO Strategy**

**Strengths:**
- 20% market share
- B2B customer base

**Weaknesses:**
- Similar to AIAI: hidden pricing, minimal content
- Weak online presence

**Opportunity:**
- Rank for "tidvis alternativ"
- Position as modern alternative

---

### Ranking Strategy: 6-Month Plan

#### **Month 1-2: Foundation**
- ✅ Implement technical SEO (metadata, structured data, sitemap)
- ✅ Launch 5 core pages (Funktioner, Priser, Hur det fungerar, Om oss, Jämförelse)
- ✅ Publish 4 blog posts (1 compliance, 1 comparison, 2 best practices)
- ✅ Set up Google Search Console & Analytics
- ✅ Submit sitemap to Google

**Expected Outcome:**
- Indexed by Google
- Ranking #10-30 for target keywords
- ~50-100 impressions/month

---

#### **Month 3-4: Content Expansion**
- ✅ Publish 4 more blog posts
- ✅ Launch feature-specific pages (Rekrytering, Schema, FK-Rapportering)
- ✅ Build internal linking structure
- ✅ Start guest posting on assistans industry blogs

**Expected Outcome:**
- Ranking #5-15 for 5-10 target keywords
- ~200-400 impressions/month
- 20-50 clicks/month

---

#### **Month 5-6: Authority Building**
- ✅ Publish final 4 blog posts (12 total)
- ✅ Get backlinks from 3-5 industry sites
- ✅ Update all content with new data/testimonials
- ✅ Launch ROI calculator (interactive content)

**Expected Outcome:**
- Ranking #1-5 for 10-15 target keywords
- ~800-1500 impressions/month
- 80-150 clicks/month
- 3-5 demo bookings from organic

---

## PART 3: IMPLEMENTATION DOCUMENTATION

### Week-by-Week Implementation Plan

#### **Week 1: Technical SEO Setup**

**Day 1-2: Metadata Implementation**
```bash
# Create metadata configuration
touch app/lib/metadata.ts
touch app/components/JsonLd.tsx
```

```typescript
// app/lib/metadata.ts
export const defaultMetadata = {
  title: {
    default: 'Elivro - AI-driven Assistansplanering | Spara 40% vs AIAI & Tidvis',
    template: '%s | Elivro'
  },
  // ... (see Phase 1.1 above)
}

// Export page-specific metadata
export const pagesMetadata = {
  home: {
    title: 'Elivro - Kvalitet eller budget? Nu kan du få båda',
    description: '...',
    keywords: ['assistansplanering', ...]
  },
  funktioner: {
    title: 'Funktioner - AI för Rekrytering, Schema & Rapportering',
    // ...
  }
  // ... for each page
}
```

```tsx
// app/components/JsonLd.tsx
export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Usage in page.tsx:
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, faqSchema } from '@/lib/structured-data'

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      {/* ... rest of page */}
    </>
  )
}
```

**Day 3-4: Sitemap & Robots**
```bash
# Create sitemap
touch app/sitemap.ts
touch public/robots.txt
```

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // See Phase 3.2 above
}
```

**Day 5-7: Google Search Console Setup**
1. Go to https://search.google.com/search-console
2. Add property: https://elivro.se
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: https://elivro.se/sitemap.xml
5. Enable all email notifications
6. Set up Google Analytics 4

---

#### **Week 2: Multi-Page Architecture**

**Day 1-3: Create New Routes**

```bash
# Create directory structure
mkdir -p app/{funktioner,priser,hur-det-fungerar,om-oss,for-assistansforetag,assistans-rekrytering,schema-assistans,fk-rapportering,kontakt,blogg}

# Create page files
touch app/funktioner/page.tsx
touch app/priser/page.tsx
# ... etc
```

**Example: app/funktioner/page.tsx**

```tsx
import { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Funktioner - AI-driven Rekrytering, Schema & Rapportering',
  description: 'Tre pelare för bättre assistans: intelligent matchning, smart schemaläggning med real-time budget, och automatisk FK-rapportering. Spara 40% jämfört med AIAI.',
  keywords: ['assistans funktioner', 'ai rekrytering assistans', 'schema assistans', 'fk rapportering'],
  alternates: {
    canonical: 'https://elivro.se/funktioner'
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://elivro.se' },
    { '@type': 'ListItem', position: 2, name: 'Funktioner', item: 'https://elivro.se/funktioner' }
  ]
}

export default function FunktionerPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="pt-32 pb-16 px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            Tre Pelare för Bättre Assistans
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Elivro kombinerar AI-driven rekrytering, intelligent schemaläggning och automatisk rapportering
            i ett system. Spara 40% jämfört med AIAI och Tidvis.
          </p>
        </section>

        {/* Feature Deep Dives */}
        <section className="py-16 px-4">
          {/* Lättare Rekrytering */}
          <article className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              🎯 Lättare Rekrytering - Matchning som Bygger Relationer
            </h2>

            <div className="prose prose-invert prose-lg">
              <h3>Problemet med Traditionell Rekrytering</h3>
              <p>
                Traditionell rekrytering fokuserar på CV och formell kompetens. Resultatet?
                Kortare anställningstider, missnöjda kunder och en evig cykel av rekrytering.
              </p>

              <h3>Hur Elivros AI Löser Det</h3>
              <ul>
                <li><strong>Personkemi-analys:</strong> Vår AI analyserar inte bara CV utan också personlighet, värderingar och livserfarenhet</li>
                <li><strong>Behovsbaserad matchning:</strong> Matchar baserat på kundens unika behov, inte bara formella krav</li>
                <li><strong>Geografisk optimering:</strong> Tar hänsyn till tillgänglighet och reslängd</li>
              </ul>

              <h3>Resultat</h3>
              <p>
                Längre anställningstider när person och roll passar → djupare förståelse för kundens behov →
                mindre stress för både assistent och kund → högre kvalitet i assistansen.
              </p>

              <h3>Jämförelse med AIAI och Tidvis</h3>
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Elivro</th>
                    <th>AIAI</th>
                    <th>Tidvis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AI-driven matchning</td>
                    <td>✅ Ja</td>
                    <td>❌ Nej</td>
                    <td>❌ Nej</td>
                  </tr>
                  <tr>
                    <td>Personkemi-analys</td>
                    <td>✅ Ja</td>
                    <td>❌ Nej</td>
                    <td>❌ Nej</td>
                  </tr>
                  <tr>
                    <td>Arbetsförmedlingen API</td>
                    <td>✅ Ja</td>
                    <td>❌ Nej</td>
                    <td>❌ Nej</td>
                  </tr>
                </tbody>
              </table>

              <a href="/assistans-rekrytering" className="text-violet-400 hover:underline">
                Läs mer om AI-driven rekrytering →
              </a>
            </div>
          </article>

          {/* Repeat for Snabbare Schemaläggning and Enklare Rapportering */}
        </section>

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Redo att Testa Alla Funktioner?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Boka en gratis demo och se hur Elivro kan förbättra din assistansplanering.
          </p>
          <button className="px-8 py-4 bg-white text-violet-600 rounded-full font-semibold">
            Boka Gratis Demo
          </button>
          <p className="text-sm text-zinc-500 mt-4">
            Inget kreditkort krävs • 30 dagars pengarna-tillbaka-garanti
          </p>
        </section>
      </main>
    </>
  )
}
```

**Day 4-5: Update Navbar with Links**

```tsx
// components/Navbar.tsx
const navItems = [
  { name: 'Funktioner', href: '/funktioner' },
  { name: 'Priser', href: '/priser' },
  { name: 'Hur det fungerar', href: '/hur-det-fungerar' },
  { name: 'Om oss', href: '/om-oss' },
  { name: 'Blogg', href: '/blogg' }
]

// Replace scrollToSection with Link component
import Link from 'next/link'

{navItems.map((item) => (
  <Link
    key={item.name}
    href={item.href}
    className="text-zinc-300 hover:text-white transition-colors"
  >
    {item.name}
  </Link>
))}
```

**Day 6-7: Internal Linking Strategy**

Add "Related Content" sections to each page:

```tsx
// components/RelatedContent.tsx
export function RelatedContent({ items }: { items: Array<{ title: string; href: string; description: string }> }) {
  return (
    <section className="py-12 bg-zinc-900/30 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Relaterat Innehåll</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link href={item.href} key={item.href} className="group">
            <div className="border border-zinc-700/30 rounded-xl p-6 hover:border-violet-500/50 transition-all">
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400">
                {item.title}
              </h4>
              <p className="text-sm text-zinc-400">{item.description}</p>
              <span className="text-violet-400 text-sm mt-2 inline-block">
                Läs mer →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Usage in page:
<RelatedContent
  items={[
    {
      title: 'AI-Driven Rekrytering',
      href: '/assistans-rekrytering',
      description: 'Hur personkemi-matchning minskar personalomsättning'
    },
    {
      title: 'Jämför med AIAI',
      href: '/jamforelse-aiai-tidvis-elivro',
      description: 'Se hur Elivro sparar 40% jämfört med konkurrenterna'
    },
    {
      title: 'Blogg: ATL-Regler 2025',
      href: '/blogg/atl-regler-assistans-2025',
      description: 'Komplett guide till arbetstidslagen för assistansföretag'
    }
  ]}
/>
```

---

#### **Week 3-4: Blog Setup & First Posts**

**Day 1-2: Blog Infrastructure**

```bash
# Set up blog structure
mkdir -p app/blogg/[slug]
mkdir -p content/blog

# Install markdown parser
npm install gray-matter remark remark-html
```

```typescript
// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  author: string
  keywords: string[]
  content: string
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        ...data,
        content
      } as BlogPost
    })

  return allPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    ...data,
    content: contentHtml
  } as BlogPost
}
```

```tsx
// app/blogg/page.tsx - Blog Index
import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'

export const metadata = {
  title: 'Blogg - Guides om Assistansplanering, Compliance & Best Practices',
  description: 'Lär dig om ATL-regler, IVO-krav, FK-rapportering, rekrytering och mer. Expertguides för assistansföretag.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-black pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">Blogg</h1>
        <p className="text-xl text-zinc-400 mb-12">
          Guides, tips och best practices för assistansföretag
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-zinc-800 pb-8">
              <Link href={`/blogg/${post.slug}`}>
                <h2 className="text-2xl font-bold text-white hover:text-violet-400 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-zinc-400 mb-4">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <time>{new Date(post.publishedAt).toLocaleDateString('sv-SE')}</time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
```

```tsx
// app/blogg/[slug]/page.tsx - Individual Post
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { JsonLd } from '@/components/JsonLd'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://elivro.se/blogg/${params.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author]
    }
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elivro AB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://elivro.se/logo.png'
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt
  }

  return (
    <>
      <JsonLd data={articleSchema} />

      <main className="min-h-screen bg-black pt-32 px-4">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <time>{new Date(post.publishedAt).toLocaleDateString('sv-SE')}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA at end of post */}
          <div className="mt-16 p-8 bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl border border-violet-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vill du automatisera din assistansplanering?
            </h3>
            <p className="text-zinc-300 mb-6">
              Boka en gratis demo och se hur Elivro kan hjälpa ditt assistansföretag.
            </p>
            <button className="px-6 py-3 bg-white text-violet-600 rounded-full font-semibold">
              Boka Gratis Demo
            </button>
          </div>
        </article>
      </main>
    </>
  )
}
```

**Day 3-7: Write First 2 Blog Posts**

```markdown
# content/blog/atl-regler-assistans-2025.md
---
title: "Komplett Guide: ATL-Regler för Assistansföretag 2025"
description: "Allt du behöver veta om arbetstidslagen för personlig assistans. Övertidsregler, veckovila, raster och vanliga fallgropar."
publishedAt: "2025-11-24"
author: "Jimmy Hermansson"
keywords:
  - atl assistans
  - arbetstidslagen personlig assistans
  - övertid assistans
  - veckovila assistans
  - raster personlig assistans
---

# Komplett Guide: ATL-Regler för Assistansföretag 2025

Som assistansföretag är det avgörande att följa **arbetstidslagen (ATL)** till punkt och pricka. Ett enda misstag kan leda till IVO-påföljder, stressade assistenter och missnöjda kunder.

Den här guiden ger dig en komplett överblick över ATL-reglerna för personlig assistans i 2025.

## Innehållsförteckning

1. [Vad är Arbetstidslagen?](#vad-ar-arbetstidslagen)
2. [Grundläggande Regler för Assistans](#grundlaggande-regler)
3. [Övertid och Mertid](#overtid-och-mertid)
4. [Veckovila och Dygnsvila](#veckovila-och-dygnsvila)
5. [Raster och Pauser](#raster-och-pauser)
6. [Vanliga Fallgropar](#vanliga-fallgropar)
7. [Hur Elivro Hjälper](#hur-elivro-hjalper)

---

## Vad är Arbetstidslagen?

Arbetstidslagen (1982:673) reglerar arbetstid, övertid, veckovila och raster i Sverige. För assistansföretag är ATL extra viktig eftersom:

- Assistenter ofta arbetar oregelbundna tider
- Jourpass och nattpass är vanliga
- Risken för övertid är hög om schemaläggning inte övervakas

**Kort sagt:** ATL skyddar både arbetstagare och arbetsgivare genom att sätta tydliga gränser.

---

## Grundläggande Regler för Assistans

### Högsta Arbetstid per Vecka

- **40 timmar/vecka** i genomsnitt (beräknat över 4 veckor)
- **Max 48 timmar/vecka** inklusive övertid (över 4 veckor)
- **Max 50 timmar/vecka** enskild vecka (tillfälligt)

**Exempel:**

Om en assistent arbetar 48 timmar en vecka måste nästa vecka kompensera med färre timmar för att hålla genomsnittet på 40.

```
Vecka 1: 48 timmar
Vecka 2: 38 timmar
Vecka 3: 40 timmar
Vecka 4: 34 timmar
Genomsnitt: 40 timmar/vecka ✅
```

### Högsta Arbetstid per Dygn

- **Max 13 timmar/dygn** (inklusive övertid)

**OBS:** Jourpass räknas som arbetstid även om assistenten sover, enligt Arbetsmiljöverkets tolkning av personlig assistans.

---

## Övertid och Mertid

ATL skiljer på **övertid** och **mertid**:

### Övertid

- Arbete **utöver ordinarie arbetstid**
- Max **48 timmar övertid** per 4 veckor
- Max **200 timmar övertid** per kalenderår

### Mertid

- Arbete **utöver 40 timmar/vecka** men inom ordinarie schema
- Max **150 timmar mertid** per kalenderår

**Varför detta är viktigt:**

Om du överskrider dessa gränser riskerar du:
- IVO-påföljder
- Vite från Arbetsmiljöverket
- Missnöjda assistenter (utbrändhet)

---

## Veckovila och Dygnsvila

### Veckovila

- **Minst 36 timmar sammanhängande** per vecka
- Ska helst infalla på söndag

**Undantag:** Personlig assistans kan ha kortare veckovila (24 timmar) men då måste kompensation ges inom 14 dagar.

### Dygnsvila

- **Minst 11 timmar sammanhängande** per dygn

**Exempel på fel schema:**

```
Måndag: 08:00 - 22:00 (14 timmar)
Tisdag: 06:00 - 20:00 (14 timmar)

Problem: Endast 8 timmar mellan passen → bryter mot dygnsvila ❌
```

**Rätt schema:**

```
Måndag: 08:00 - 21:00 (13 timmar)
Tisdag: 08:00 - 20:00 (12 timmar)

Mellanrum: 11 timmar → OK ✅
```

---

## Raster och Pauser

### Rast (måltidsuppehåll)

- **Minst 30 minuter** om arbetspasset är längre än 6 timmar
- Ska vara **sammanhängande**
- Räknas **inte** som arbetstid (obetald)

**OBS:** I personlig assistans kan rasten vara **svår att genomföra** eftersom assistenten måste vara tillgänglig för kunden. Då kan rasten räknas som arbetstid.

### Paus

- Kortare avbrott (10-15 min) under arbetspasset
- Räknas som arbetstid (betald)

---

## Vanliga Fallgropar

### 1. Schemaläggning i blindo

**Problem:** Du lägger schema utan att se om du bryter mot ATL-regler.

**Lösning:** Använd system som **varnar dig i real-time** när schema riskerar att bryta mot:
- Övertidsgränser
- Dygnsvila
- Veckovila

**Exempel:** Elivro visar direkt om ett pass bryter mot ATL innan du sparar schemat.

---

### 2. Jourpass som inte räknas som arbetstid

**Problem:** Du tror att jourpass där assistenten sover inte räknas som arbetstid.

**Lösning:** Arbetsmiljöverket har slagit fast att **jourpass i personlig assistans = arbetstid** eftersom assistenten måste vara tillgänglig.

---

### 3. Ingen kompensation för kortare veckovila

**Problem:** Assistenten har 24 timmars veckovila istället för 36, men får ingen kompensation inom 14 dagar.

**Lösning:** Planera kompensationen i förväg och dokumentera den.

---

## Hur Elivro Hjälper

Elivro har inbyggd **ATL-övervakning** som:

✅ **Varnar dig i real-time** när schema riskerar att bryta mot ATL
✅ **Beräknar övertid automatiskt** baserat på faktisk arbetstid
✅ **Visar dygnsvila och veckovila** för varje assistent
✅ **Förhindrar schemaläggning** som bryter mot reglerna

**Resultat:**
- Inga IVO-påföljder för ATL-brott
- Nöjdare assistenter (ingen överbelastning)
- Tryggare schemaläggning

[Boka en gratis demo](/kontakt) och se hur Elivro kan hjälpa ditt assistansföretag följa ATL.

---

## Sammanfattning

| Regel | Gräns | Konsekvens vid brott |
|-------|-------|----------------------|
| Arbetstid/vecka | Max 40h (genomsnitt) | IVO-påföljd, vite |
| Övertid/4 veckor | Max 48h | Vite från Arbetsmiljöverket |
| Övertid/år | Max 200h | Vite, missnöjda assistenter |
| Dygnsvila | Min 11h sammanhängande | IVO-påföljd, risk för olycka |
| Veckovila | Min 36h sammanhängande | IVO-påföljd, utbrändhet |
| Rast | Min 30 min (pass >6h) | Arbetsmiljöverket påföljd |

---

## Läs mer

- [FK Rapportering 2025: E-RÄK, ELT och E-IOA Förklarat](/blogg/fk-rapportering-assistans-2025)
- [Så Undviker Du IVO-Påföljder: 7 Vanliga Misstag](/blogg/undvik-ivo-pafolj der)
- [Hur Elivros AI Hjälper med Schemaläggning](/schema-assistans)

---

**Om författaren:**
Jimmy Hermansson arbetar aktivt som personlig assistent och är VD på Elivro. Han har erfarenhet av schemaläggning, FK-rapportering och IVO-krav sedan 2023.
```

---

#### **Week 5-8: Link Building & Authority**

**Link Building Strategy:**

1. **Industry Directories**
   - Allabolag.se (add business listing)
   - Ratsit.se
   - SvD Affärsliv (if budget allows)

2. **Guest Posting**
   - Reach out to:
     - Sveriges Kommuner och Regioner (SKR) blogs
     - Assistansförbundet
     - Care industry blogs
   - Pitch: "AI in Care: How Technology Improves Quality"

3. **PR & News**
   - Submit press release: "Svensk startup utmanar AIAI med transparent prissättning"
   - Reach out to:
     - Dagens Industri
     - Breakit
     - Ny Teknik

4. **Partnerships**
   - Partner with payroll providers (Fortnox, Visma)
   - Get listed on their "integrations" page = high-quality backlink

5. **Local SEO**
   - Google Business Profile (if applicable)
   - Swedish business associations

---

#### **Week 9-12: Content Updates & Refinement**

1. **Update Existing Content**
   - Add customer testimonials (when available)
   - Refresh blog posts with new data
   - Add more internal links

2. **Create Interactive Content**
   - ROI Calculator: "Hur mycket kan du spara med Elivro?"
   - Comparison tool: "Elivro vs AIAI vs Tidvis"

3. **Track & Optimize**
   - Analyze Google Search Console data
   - Identify underperforming pages
   - Optimize meta descriptions for better CTR

---

## PART 4: TRACKING & MEASUREMENT

### Key Metrics to Track

#### **Google Search Console (Weekly)**

1. **Impressions by Query**
   - Target: 1000+ impressions/month by Month 6
   - Track top 20 keywords

2. **Click-Through Rate (CTR)**
   - Target: 3-5% average CTR
   - If CTR < 2%, improve meta descriptions

3. **Average Position**
   - Target: Position 5-10 by Month 3
   - Target: Position 1-5 by Month 6

4. **Indexing Status**
   - All pages indexed within 1 week
   - Fix any coverage errors immediately

#### **Google Analytics 4 (Weekly)**

1. **Organic Traffic**
   - Target: 50-100 visits/month by Month 3
   - Target: 200-400 visits/month by Month 6

2. **Bounce Rate**
   - Target: < 60% for homepage
   - Target: < 50% for blog posts

3. **Avg. Session Duration**
   - Target: > 2 minutes for blog posts
   - Target: > 1 minute for product pages

4. **Goal Conversions**
   - Demo booking form submissions
   - Email signups
   - Target: 3-5% conversion rate from organic

---

## PART 5: COMPETITIVE MOAT

### Sustainable SEO Advantages

1. **Transparent Pricing**
   - You're the ONLY transparent pricing in the market
   - Ranks for "assistans system pris", "vad kostar assistansplanering"

2. **Founder Authenticity**
   - "Byggt av aktiv assistent" = unique story
   - Ranks for "assistent skapat system", "autentisk assistansplanering"

3. **Quality Positioning**
   - "Kvalitet över effektivitet" = differentiated messaging
   - Ranks for "kvalitet personlig assistans", "bättre assistans"

4. **Content Depth**
   - 12+ blog posts = more indexed pages than AIAI + Tidvis combined
   - Topical authority on compliance, best practices

---

## SUMMARY: 6-MONTH SEO ROADMAP

| Month | Activities | Expected Outcomes |
|-------|-----------|-------------------|
| **1** | Technical SEO setup, metadata, sitemap, GSC | Indexed by Google, 0-50 impressions/month |
| **2** | Launch 5 core pages, publish 2 blog posts | Ranking #10-30 for target keywords, 50-100 impressions |
| **3** | Publish 2 blog posts, build 3-5 backlinks | Ranking #5-15 for 5-10 keywords, 200-400 impressions |
| **4** | Feature pages, guest posting, PR push | Ranking #5-10 for 10+ keywords, 400-800 impressions |
| **5** | Publish 2 blog posts, update content | Ranking #1-5 for 5-10 keywords, 800-1200 impressions |
| **6** | Final content, link building, optimization | Ranking #1-5 for 15+ keywords, 1000-1500 impressions, 80-150 clicks, 3-5 demos |

---

## IMPLEMENTATION CHECKLIST

### Technical (Week 1-2)
- [ ] Add metadata to all pages
- [ ] Implement JSON-LD structured data (Organization, FAQ, SoftwareApplication)
- [ ] Create sitemap.ts
- [ ] Add robots.txt
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Submit sitemap to Google
- [ ] Verify mobile-friendliness (Google Mobile-Friendly Test)
- [ ] Test Core Web Vitals (PageSpeed Insights)

### Content (Week 3-12)
- [ ] Launch Funktioner page (800+ words)
- [ ] Launch Priser page (600+ words with pricing table)
- [ ] Launch Hur det fungerar page
- [ ] Launch Om oss page
- [ ] Launch Jämförelse page (AIAI, Tidvis, Elivro comparison)
- [ ] Launch 3 feature-specific pages (Rekrytering, Schema, FK-Rapportering)
- [ ] Write and publish 12 blog posts (2/month)
- [ ] Create ROI calculator
- [ ] Add internal linking (min 3 links per page)

### Link Building (Week 5-12)
- [ ] Add business to Allabolag, Ratsit
- [ ] Submit press release to 3 news outlets
- [ ] Publish 2 guest posts on industry blogs
- [ ] Partner with 1-2 payroll providers for backlinks
- [ ] Reach out to 5 Swedish business associations

### Tracking (Ongoing)
- [ ] Weekly Google Search Console review
- [ ] Weekly Google Analytics review
- [ ] Monthly keyword ranking check (use Ahrefs/SEMrush free trial)
- [ ] Monthly content update (refresh top posts)
- [ ] Quarterly SEO audit (identify new opportunities)

---

## TOOLS NEEDED

### Free Tools
- Google Search Console
- Google Analytics 4
- Google PageSpeed Insights
- Google Mobile-Friendly Test
- Bing Webmaster Tools

### Paid Tools (Optional but Recommended)
- **Ahrefs** (€99/month) - Keyword research, backlink analysis, competitor tracking
- **SEMrush** (€119/month) - Comprehensive SEO suite
- **Screaming Frog** (Free up to 500 URLs, £149/year for unlimited) - Technical SEO audits

### Alternative: Use Free Trials
- Ahrefs: 7-day trial for $7
- SEMrush: 7-day free trial
- Use trials strategically for monthly audits

---

## FINAL NOTES

**Why This Strategy Will Work:**

1. **Low Competition** - Swedish assistans + software niche is underserved
2. **Transparent Pricing** - Your biggest SEO advantage (competitors hide it)
3. **Quality Content** - 12+ blog posts = more than AIAI + Tidvis combined
4. **Authentic Story** - "Byggt av aktiv assistent" = unique, rankable angle
5. **Multi-Page Architecture** - More indexed pages = more keyword targets

**Expected Timeline:**
- **Month 3:** Start seeing traffic (50-100 visits/month)
- **Month 6:** Ranking top 5 for 10-15 keywords (200-400 visits/month)
- **Month 12:** Dominate niche (#1-3 for all primary keywords, 500+ visits/month)

**Long-Term Vision:**
- Become the #1 resource for Swedish assistansföretag
- "Elivro blogg" becomes trusted source for compliance/best practices
- Organic traffic drives 30-50% of demo bookings
- Domain authority strong enough to launch new products easily

---

**Next Steps:**

1. Review this document with your team
2. Prioritize tasks based on resources
3. Start with Week 1 technical implementation
4. Commit to publishing 2 blog posts/month
5. Track progress weekly in Google Search Console

**Questions?**

This is a living document. Update it as you learn what works for your specific audience.

Good luck! 🚀
