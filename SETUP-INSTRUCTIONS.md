# Setup Instructions for Content System

## Step 1: Install Dependencies

Run these commands in your terminal:

```bash
# MDX and content processing
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time

# Syntax highlighting and enhancements
npm install rehype-highlight rehype-slug rehype-autolink-headings remark-gfm

# Type definitions
npm install -D @types/mdx
```

## Step 2: Update next.config.mjs

Replace your `next.config.mjs` with:

```js
import createMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
})

export default withMDX(nextConfig)
```

## Step 3: Create MDX Types

Create `mdx-components.tsx` in the root:

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

## Step 4: Install Resend for Email

```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=re_your_api_key_here
```

## Step 5: Deploy

After implementing all phases:

```bash
npm run build
npm run start  # Test locally
# Then deploy to Vercel
```

## Verification Checklist

- [ ] All dependencies installed without errors
- [ ] `next.config.mjs` updated
- [ ] `mdx-components.tsx` created
- [ ] Environment variables set
- [ ] Build succeeds (`npm run build`)
- [ ] Dev server runs (`npm run dev`)
- [ ] MDX files render correctly

## Troubleshooting

**Issue: MDX files not rendering**
- Check `next.config.mjs` syntax
- Verify `pageExtensions` includes 'mdx'
- Restart dev server after config changes

**Issue: "Module not found: Can't resolve 'gray-matter'"**
- Run `npm install` again
- Check `node_modules` exists
- Delete `.next` folder and rebuild

**Issue: Styles not applying to prose**
- Install Tailwind Typography: `npm install @tailwindcss/typography`
- Add to `tailwind.config.ts`: `plugins: [require('@tailwindcss/typography')]`

## Next Steps After Setup

1. Review `/lib/content.ts` - Content fetching functions
2. Review `/components/content/*` - Reusable CTAs
3. Test Resources page at `/resurser`
4. Test individual guide at `/resurser/fk-rapporteringsguide-2026`
5. Configure Resend API for lead capture
6. Submit sitemap to Google Search Console
