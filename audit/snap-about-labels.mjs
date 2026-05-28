import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const URL = process.env.URL || 'http://localhost:3002'
const OUT_DIR = 'audit/screenshots'
await fs.mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()
await page.addInitScript(() => {
  try { localStorage.setItem('cookie-consent', 'declined') } catch {}
})
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(700)
await page.addStyleTag({
  content: `nav[class*="fixed"], nav[class*="sticky"] { position: static !important; }`,
})

// Scroll the about section so its top sits ~40px below the viewport top.
await page.evaluate(() => {
  const el = document.getElementById('about-us')
  const top = el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top: top - 40, behavior: 'instant' })
})
await page.waitForTimeout(400)

const stage = page.locator('#about-us .about-stage')
const box = await stage.boundingBox()
await page.screenshot({
  path: `${OUT_DIR}/about-labels-crop.png`,
  clip: {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: box.width,
    height: Math.min(330, box.height),
  },
})
console.log('saved about-labels-crop.png  (stage box:', JSON.stringify(box), ')')

await ctx.close()
await browser.close()
