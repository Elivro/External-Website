import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'declined') } catch {} })
await page.goto('http://localhost:3002', { waitUntil: 'networkidle' })
await page.waitForTimeout(700)
await page.addStyleTag({ content: `nav[class*="fixed"],nav[class*="sticky"]{position:static!important}` })
await page.evaluate(() => {
  const e = document.getElementById('about-us')
  window.scrollTo({ top: e.getBoundingClientRect().top + window.scrollY - 40, behavior: 'instant' })
})
await page.waitForTimeout(300)
// Scroll the bullet list into the middle of the viewport, then hover one.
await page.locator('#about-us .about-bullets').scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
const b = page.locator('#about-us .about-bullet').nth(1)
await b.hover()
await page.waitForTimeout(400)
const list = await page.locator('#about-us .about-bullets').boundingBox()
await page.screenshot({
  path: 'audit/screenshots/about-bullet-hover.png',
  clip: { x: 0, y: Math.max(0, list.y - 20), width: 460, height: Math.min(420, list.height + 40) },
})
console.log('saved about-bullet-hover.png')
await ctx.close()
await browser.close()
