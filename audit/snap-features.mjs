import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const URL = process.env.URL || 'http://localhost:3001'
const OUT_DIR = 'audit/screenshots'
await fs.mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()

async function shotFeatures(name, width, height, expandFirst) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'declined') } catch {} })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.addStyleTag({ content: `nav[class*="fixed"],nav[class*="sticky"]{position:static!important}` })

  const sec = page.locator('#features')
  await sec.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)

  if (expandFirst) {
    // Expand the 2nd and 4th group to show open state alongside closed.
    await page.locator('#features .feat-head').nth(1).click()
    await page.locator('#features .feat-head').nth(3).click()
    await page.waitForTimeout(600)
  }
  await sec.screenshot({ path: `${OUT_DIR}/features-${name}.png` })
  console.log(`saved features-${name}.png`)
  await ctx.close()
}

await shotFeatures('mobile-collapsed', 414, 900, false)
await shotFeatures('mobile-expanded', 414, 900, true)
await shotFeatures('desktop', 1280, 900, false)

await browser.close()
