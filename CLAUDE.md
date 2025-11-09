# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Elivro landing page** - a Swedish B2B SaaS landing page for an assistant care platform. The project emphasizes **human-centered messaging** and **quality over efficiency** in personal assistance services.

**Core Value Proposition**: "Rekrytera rätt. Schemalägg smart. Rapportera enkelt. För assistans som förändrar liv - inte bara administrerar dem."

## Tech Stack

- **Next.js 16.0.1** (App Router)
- **React 19.2.0**
- **TypeScript 5.9.3**
- **Tailwind CSS 4.1.16**
- **Framer Motion 12.23.24** (for animations)
- **Resend 6.4.2** (for demo form email submissions)

## Common Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run clean        # Clean Next.js cache and build artifacts
npm run clean:build  # Clean and rebuild
```

## Architecture Overview

### Component Structure

The landing page follows a **vertical scroll structure** with these main sections in order:

1. **Navbar** - Fixed navigation with smooth scroll to sections
2. **Hero** - Primary value proposition with dual CTAs
3. **ProblemSection** - 2 pain points (validates customer challenges)
4. **Features** - "Three Pillars" with bullet-format benefits (Rekrytera, Schemalägg, Rapportera)
5. **HowItWorks** - 3-step process flow
6. **FAQSection** - 4 Q&As with accordion
7. **CTA** - Demo booking form
8. **Footer** - Navigation and trust signals

**Total: 7 sections** optimized for B2B SaaS best practices (visitors spend ~35 seconds on landing pages)

### Key Design Patterns

#### 1. Scroll-Triggered Animations
All major sections use **Intersection Observer API** for scroll-triggered animations:

```tsx
const [isVisible, setIsVisible] = useState(false)
const sectionRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  )
  if (sectionRef.current) observer.observe(sectionRef.current)
  return () => observer.disconnect()
}, [])
```

Elements use `transitionDelay` with staggered timing (e.g., `${index * 150}ms`) for sequential reveals.

#### 2. Smooth Scroll Navigation
All navigation links use JavaScript smooth scroll with navbar offset:

```tsx
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const navbarHeight = 64
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - navbarHeight - 20
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}
```

**Section IDs to scroll to**:
- `how-it-works` (HowItWorks section)
- `faq` (FAQSection)
- `cta-section` (CTA section)
- `three-pillars` (Features section)

#### 3. Glassmorphism Design System
Consistent styling pattern across all cards:

```tsx
className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 hover:border-purple-500/30"
```

**Color Palette**:
- Primary: `violet-500` (#8b5cf6), `purple-600`
- Accent: `teal-400` (#22d3ee)
- Background: `zinc-900`, `zinc-950`
- Text: `white`, `zinc-300`, `zinc-400`

#### 4. Aura.build Standards
The design follows Aura.build conventions:

- **Typography**: Inter font with scale (text-sm to text-6xl)
- **Animations**: 600ms ease-out for entrances, 300ms for hovers
- **Breakpoints**: Mobile-first (640px sm, 768px md, 1024px lg)
- **Timing**: Staggered delays (150-200ms between items)

## Important Content Guidelines

### B2B SaaS Best Practices

The landing page follows **B2B SaaS conversion optimization principles**:

- **Target word count**: 500-600 words total (optimal range for B2B SaaS)
- **35-second rule**: Visitors spend ~35 seconds on page - content must be scannable
- **Bullet format over paragraphs** - Use bullets for benefits/outcomes
- **3-second headlines** - Headlines should convey value in 3 seconds or less
- **One conversion goal**: Every section supports the primary CTA (demo booking)
- **Benefits over features** - Translate capabilities to business outcomes

### Messaging Principles

1. **NO percentage claims** - Avoid unsubstantiated metrics like "80% mindre tid"
2. **Quality over efficiency** - Emphasize relationships, trust, and human outcomes
3. **Swedish B2B tone** - Professional but warm, not overly technical
4. **Human-centered language** - "För assistans som förändrar liv" not "För assistans som effektiviserar processer"
5. **Three-pillar structure** - Always maintain: Rekrytera, Schemalägg, Rapportera
6. **Scannable format** - Bullets, short sentences, clear hierarchy
7. **Brevity is clarity** - Remove unnecessary words, get to the point quickly

### Pre-launch Context

**IMPORTANT**: Elivro has **no existing customers or testimonials** yet. The landing page focuses on:
- Product value demonstration
- Process clarity
- De-risking (guarantees, pilot program)
- Team/technology credibility

Do NOT add social proof, testimonials, customer logos, or case studies.

### Source Document

The authoritative messaging source is:
**`Elivro_Värdeerbjudande_Kvalitetsfokus.md`**

When editing copy, always reference this document for:
- Core value propositions
- Quality promises
- Three-pillar descriptions
- Persona-based messaging

## Email Integration

Demo form submissions use **Resend** via `/api/demo` endpoint.

**Form Fields**: name, company, email

The API route sends emails to `daniel@elivro.se` with submitted details.

## Development Notes

- All components are in `components/` directory
- Main page is `app/page.tsx`
- Email API route is `app/api/demo/route.ts`
- Shared UI components in `components/ui/` (Button, AnimatedText)
- All text content is **Swedish**
- Mobile-first responsive design
- Animations use CSS transitions + Intersection Observer (not Framer Motion in most cases)

## File Path Context

**Note**: There's a duplicate folder structure due to migration. The active codebase is:
```
C:\Users\jimmy\Repos\landing-page\Desktop\Claude\elivro-landing\
```

Not the root `landing-page` directory.
