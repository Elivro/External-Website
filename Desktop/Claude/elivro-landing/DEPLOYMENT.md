# Deployment Guide - Elivro Landing Page

This guide covers deploying the Elivro landing page to Vercel with SSG (Static Site Generation) + Serverless Functions.

## Architecture

The site uses **hybrid deployment**:
- **Static pages**: `/`, `/privacy`, `/terms` → Pre-rendered at build time (SSG)
- **API route**: `/api/demo` → Runs as Vercel Serverless Function

## Prerequisites

1. **Vercel account** - Sign up at [vercel.com](https://vercel.com)
2. **Resend API key** - Get from [resend.com/api-keys](https://resend.com/api-keys)
3. **Git repository** (optional but recommended)

## Deployment Method 1: Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Navigate to Project Directory

```bash
cd Desktop/Claude/elivro-landing
```

### Step 3: Login to Vercel

```bash
vercel login
```

### Step 4: Deploy

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account/team
- **Link to existing project?** → No (first time)
- **Project name** → `elivro-landing` (or your preference)
- **Directory** → `./` (current directory)
- **Override settings?** → No

### Step 5: Add Environment Variable

After first deployment, add the Resend API key:

```bash
vercel env add RESEND_API_KEY
```

When prompted:
- **Value** → Paste your Resend API key (starts with `re_`)
- **Environments** → Select all (Production, Preview, Development)

### Step 6: Redeploy with Environment Variable

```bash
vercel --prod
```

Your site is now live!

---

## Deployment Method 2: Vercel Dashboard (GitHub Integration)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Elivro landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/elivro-landing.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave as `./` or set to `Desktop/Claude/elivro-landing` if deploying from parent repo
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables

In the project settings:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (starts with `re_`)
   - **Environments**: Select all (Production, Preview, Development)

### Step 4: Deploy

Click **Deploy**. Vercel will:
1. Install dependencies
2. Run build process
3. Generate static pages
4. Deploy serverless functions
5. Provide a live URL

---

## Verify Deployment

After deployment, verify:

### 1. Static Pages Load Instantly
- Visit your production URL
- Check homepage (`/`)
- Check `/privacy` and `/terms`
- Pages should load instantly (pre-rendered HTML)

### 2. API Route Works
- Fill out the demo form on homepage
- Submit form
- Check that you receive confirmation email
- Check that admin receives notification at `daniel@elivro.se`

### 3. Check Build Logs
In Vercel dashboard → **Deployments** → Click latest deployment → **Building**

Look for:
```
Route (app)
┌ ○ /              (Static)
├ ○ /privacy       (Static)
├ ○ /terms         (Static)
└ ƒ /api/demo      (Dynamic)
```

✓ `○ (Static)` = SSG pages (good!)
✓ `ƒ (Dynamic)` = Serverless function (good!)

---

## Configuration Files

### `next.config.js`
```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
}
```

**Important**: Do NOT use `output: 'export'` - it breaks the API route.

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["arn1"],
  "env": {
    "RESEND_API_KEY": "@resend-api-key"
  }
}
```

### `.vercelignore`
Excludes unnecessary files from deployment (node_modules, .env files, etc.)

---

## Environment Variables

### Required
- `RESEND_API_KEY` - Your Resend API key for sending emails

### How to Get Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use Resend's test domain for development)
3. Go to **API Keys** → **Create API Key**
4. Copy the key (starts with `re_`)
5. Add to Vercel environment variables

---

## Troubleshooting

### Build Fails with "output: export" Error
**Solution**: Remove `output: 'export'` from `next.config.js`. API routes require serverless functions.

### Form Submission Fails (500 Error)
**Cause**: Missing `RESEND_API_KEY` environment variable
**Solution**: Add the environment variable in Vercel dashboard and redeploy

### TypeScript Errors During Build
**Solution**: Run `npm run build` locally first to catch errors before deploying

### Images Not Loading
**Cause**: Image optimization requires Vercel's image service
**Solution**: Images are automatically optimized on Vercel - no action needed

### "Multiple lockfiles detected" Warning
**Cause**: Multiple package-lock.json files in parent directories
**Solution**: This is just a warning - deployment will work fine. To silence it, add `turbopack.root` to next.config.js (optional)

---

## Post-Deployment

### Custom Domain
1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `www.elivro.se`)
3. Update DNS records as instructed
4. Vercel automatically provisions SSL certificate

### Production Checklist
- [ ] Verify all static pages load instantly
- [ ] Test form submission on production URL
- [ ] Confirm admin receives emails at `daniel@elivro.se`
- [ ] Check mobile responsiveness
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Verify SEO meta tags (Open Graph, Twitter Cards)
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (Google Analytics, Vercel Analytics, etc.)

---

## Performance

Expected metrics:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Lighthouse Score**: > 90

Static pages are served from Vercel's global CDN for maximum performance.

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)

---

## Notes

- **No customer data**: This is a pre-launch landing page - no testimonials or social proof
- **Swedish language**: All content is in Swedish for B2B audience
- **Messaging source**: Refer to `Elivro_Värdeerbjudande_Kvalitetsfokus.md` for copy updates
- **Design system**: Follows Aura.build conventions (glassmorphism, violet/purple palette)
