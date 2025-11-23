# ELIVRO SEO QUICK START GUIDE

**Start here for immediate action items.**

See `SEO_STRATEGY_ELIVRO.md` for full strategy and implementation details.

---

## WEEK 1 PRIORITY TASKS

### Day 1: Set Up Google Tools

```bash
# 1. Create Google Account (if needed)
# 2. Go to https://search.google.com/search-console
# 3. Add property: https://elivro.se
# 4. Verify ownership via DNS TXT record:

# Add this TXT record to your DNS:
# Name: @
# Value: google-site-verification=XXXXXX (get from GSC)

# 5. Go to https://analytics.google.com
# 6. Create GA4 property for elivro.se
# 7. Get measurement ID (G-XXXXXXXXXX)
```

### Day 2-3: Add Metadata

```tsx
// app/layout.tsx - Add this export
export const metadata: Metadata = {
  title: {
    default: 'Elivro - AI-driven Assistansplanering | Spara 40% vs AIAI & Tidvis',
    template: '%s | Elivro'
  },
  description: 'Assistansplanering med AI för rekrytering, schemaläggning och rapportering. Från 449 kr/brukare/mån. Transparent prissättning, 30 dagars garanti.',
  keywords: ['assistansplanering', 'assistans system', 'personlig assistans schema', 'fk rapportering'],
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Elivro',
    title: 'Elivro - Kvalitet eller budget? Nu kan du få båda',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  }
}
```

### Day 4: Create Sitemap

```bash
# Create file: app/sitemap.ts
touch app/sitemap.ts
```

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://elivro.se',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://elivro.se/funktioner',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add more pages as you create them
  ]
}
```

### Day 5: Submit to Google

```bash
# 1. Deploy your site with metadata and sitemap
npm run build
npm run start

# 2. Go to Google Search Console
# 3. Sitemaps → Add new sitemap
# 4. Enter: https://elivro.se/sitemap.xml
# 5. Submit

# 6. Test indexing:
# URL Inspection → Enter https://elivro.se → Request Indexing
```

---

## WEEK 2 PRIORITY TASKS

### Create 3 New Pages

#### 1. Funktioner Page
```bash
mkdir app/funktioner
touch app/funktioner/page.tsx
```

**Content Requirements:**
- 800-1000 words
- Explain all 3 pillars (Rekrytering, Schema, Rapportering)
- Include comparison table (Elivro vs AIAI vs Tidvis)
- Add CTA at end

**Target Keywords:**
- assistans funktioner
- ai rekrytering assistans
- schema personlig assistans

---

#### 2. Priser Page
```bash
mkdir app/priser
touch app/priser/page.tsx
```

**Content Requirements:**
- Show transparent pricing: Från 449 kr/brukare/mån
- Emphasize "40% billigare än AIAI och Tidvis"
- Include trust signals (30 dagars garanti, ingen bindningstid)
- Add FAQ about pricing

**Target Keywords:**
- assistans system pris
- vad kostar assistansplanering
- billigare än aiai

---

#### 3. Jämförelse Page
```bash
mkdir app/jamforelse
touch app/jamforelse/page.tsx
```

**Content Requirements:**
- Side-by-side comparison: Elivro | AIAI | Tidvis
- Features, pricing, support
- Emphasize transparent pricing advantage
- "Why choose Elivro" section

**Target Keywords:**
- aiai alternativ
- tidvis alternativ
- assistans system jämförelse

---

## TOP 10 KEYWORDS TO TARGET (MONTH 1-3)

| Keyword | Priority | Target Page |
|---------|----------|-------------|
| assistansplanering | 🔴 CRITICAL | Homepage |
| assistans system | 🔴 CRITICAL | Homepage |
| aiai alternativ | 🔴 CRITICAL | Jämförelse page |
| assistans system pris | 🔴 CRITICAL | Priser page |
| personlig assistans schema | 🟠 HIGH | /schema-assistans |
| fk rapportering assistans | 🟠 HIGH | /fk-rapportering |
| tidvis alternativ | 🟠 HIGH | Jämförelse page |
| atl assistans | 🟡 MEDIUM | Blog post |
| ivo assistans | 🟡 MEDIUM | Blog post |
| rekrytera personlig assistent | 🟡 MEDIUM | /assistans-rekrytering |

---

## BLOG CONTENT CALENDAR (First 3 Months)

### Month 1
- **Week 2:** "Komplett Guide: ATL-Regler för Assistansföretag 2025" (2000 words)
  - Target: atl assistans, arbetstidslagen personlig assistans
- **Week 4:** "Hur Mycket Kostar Assistansplanering? Jämförelse AIAI, Tidvis, Elivro" (1500 words)
  - Target: assistans system pris, aiai pris, vad kostar assistansplanering

### Month 2
- **Week 2:** "FK Rapportering 2025: E-RÄK, ELT och E-IOA Förklarat" (2500 words)
  - Target: fk rapportering assistans, e-räk, elt rapportering
- **Week 4:** "Så Undviker Du IVO-Påföljder: 7 Vanliga Misstag" (1800 words)
  - Target: ivo assistans, ivo inspektion, ivo krav

### Month 3
- **Week 2:** "Rekrytera Personliga Assistenter: Komplett Playbook" (2200 words)
  - Target: rekrytera assistent, hitta personlig assistent
- **Week 4:** "AI i Assistansbranschen: Hype eller Verklig Nytta?" (1400 words)
  - Target: ai assistans, ai rekrytering, artificiell intelligens personlig assistans

---

## INTERNAL LINKING STRATEGY

**Homepage →**
- /funktioner (anchor: "Se alla funktioner")
- /priser (anchor: "Transparent prissättning")
- /blogg/atl-regler-assistans-2025 (anchor: "Läs om ATL-regler")

**/funktioner →**
- /assistans-rekrytering (anchor: "Läs mer om AI-rekrytering")
- /schema-assistans (anchor: "Läs mer om smart schemaläggning")
- /fk-rapportering (anchor: "Läs mer om FK-automation")

**/priser →**
- /jamforelse (anchor: "Jämför med AIAI och Tidvis")
- /blogg/assistans-roi-kalkyl (anchor: "Beräkna din besparing")

**Blog posts →**
- Link to relevant feature pages (2-3 links per post)
- Link to other blog posts (1-2 related articles)
- Always end with CTA to book demo

---

## TECHNICAL SEO CHECKLIST

### Immediate (Week 1)
- [ ] Add metadata to app/layout.tsx
- [ ] Create sitemap.ts
- [ ] Add robots.txt to /public
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Submit sitemap to Google
- [ ] Request indexing for homepage

### Short-term (Week 2-4)
- [ ] Add JSON-LD structured data (Organization, FAQ)
- [ ] Optimize Core Web Vitals (lazy load SparklesCore)
- [ ] Add alt text to all images
- [ ] Ensure all links have descriptive anchor text
- [ ] Test mobile-friendliness
- [ ] Add canonical URLs

### Medium-term (Month 2-3)
- [ ] Create feature-specific pages
- [ ] Publish 4 blog posts
- [ ] Build 3-5 backlinks
- [ ] Update sitemap with new pages
- [ ] Monitor GSC for indexing issues

---

## TRACKING DASHBOARD (Weekly Review)

### Google Search Console Metrics
- **Impressions:** Target 100+ by Month 2
- **Clicks:** Target 10+ by Month 2
- **Average Position:** Target 10-20 by Month 2
- **CTR:** Target 2-5%

### Google Analytics Metrics
- **Organic Traffic:** Target 20-50 visits/month by Month 2
- **Bounce Rate:** Target < 60%
- **Avg. Session Duration:** Target > 1 minute
- **Demo Bookings:** Track conversions

---

## QUICK WINS (Do These First)

1. **Fix Homepage Title Tag**
   - Current: Generic "Elivro"
   - New: "Elivro - AI-driven Assistansplanering | Spara 40% vs AIAI & Tidvis"

2. **Add FAQ Schema to FAQSection**
   - Increases chance of rich snippets
   - Shows directly in Google search results

3. **Create /priser Page with Transparent Pricing**
   - No competitor shows pricing
   - Easy #1 ranking for "assistans system pris"

4. **Write "AIAI Alternativ" Blog Post**
   - Very low competition
   - High commercial intent
   - Easy #1 ranking

5. **Get Listed on Allabolag.se**
   - Free backlink
   - Takes 5 minutes

---

## AVOID THESE MISTAKES

❌ **Don't:**
- Use generic meta descriptions like "Elivro är ett system för assistans"
- Ignore mobile optimization
- Forget to add internal links
- Copy content from competitors
- Overstuff keywords ("assistansplanering assistansplanering assistansplanering")
- Skip alt text on images
- Use vague anchor text like "klicka här"

✅ **Do:**
- Write unique, helpful content
- Focus on user intent
- Add value in every blog post
- Update content regularly
- Build relationships for backlinks
- Monitor GSC weekly

---

## RESOURCES

### Official Documentation
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)

### Tools (Free)
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Keyword Research (Free Trials)
- [Ahrefs](https://ahrefs.com/) - 7 days for $7
- [SEMrush](https://www.semrush.com/) - 7 days free

---

## NEXT STEPS

1. ✅ Read full strategy: `SEO_STRATEGY_ELIVRO.md`
2. ✅ Complete Week 1 tasks above
3. ✅ Create tracking spreadsheet for weekly reviews
4. ✅ Start writing first blog post
5. ✅ Review progress weekly and adjust

---

**Questions?** Refer to `SEO_STRATEGY_ELIVRO.md` for detailed explanations and examples.

**Good luck!** 🚀
