import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const URL = process.env.URL || 'http://localhost:3002'
const OUT_DIR = 'audit/screenshots'
await fs.mkdir(OUT_DIR, { recursive: true })

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 1100 },
  { name: 'wide-1680',    width: 1680, height: 1100 },
  { name: 'mobile-414',   width: 414,  height: 896 },
]

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()

  // Pre-set cookie consent so the banner never shows.
  await page.addInitScript(() => {
    try { localStorage.setItem('cookie-consent', 'declined') } catch {}
  })

  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  // Strip the sticky navbar's positioning so it doesn't bleed into element
  // screenshots that capture areas below the viewport fold.
  await page.addStyleTag({
    content: `
      nav[class*="fixed"], nav[class*="sticky"], header[class*="fixed"], header[class*="sticky"] {
        position: static !important;
      }
      [class*="z-50"], [class*="z-[50]"], [class*="z-40"], [class*="z-[40]"] {
        z-index: 0 !important;
      }
    `,
  })
  await page.waitForTimeout(200)

  const section = page.locator('#about-us')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  await section.screenshot({ path: `${OUT_DIR}/about-${vp.name}.png` })
  console.log(`saved about-${vp.name}.png`)

  // Hover states on desktop sizes.
  if (!vp.name.startsWith('mobile')) {
    for (const [idx, slug] of [[0, 'jimmy'], [1, 'filiph'], [2, 'daniel']]) {
      const zone = page.locator('#about-us .about-zone').nth(idx)
      if (await zone.count()) {
        await zone.hover()
        await page.waitForTimeout(700)
        await section.screenshot({ path: `${OUT_DIR}/about-${vp.name}-hover-${slug}.png` })
        console.log(`saved about-${vp.name}-hover-${slug}.png`)
      }
    }
  }

  await ctx.close()
}

await browser.close()
