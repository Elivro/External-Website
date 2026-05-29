import { chromium } from 'playwright'
import fs from 'node:fs/promises'
const URL = process.env.URL || 'http://localhost:3002'
await fs.mkdir('audit/screenshots', { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.addInitScript(() => { try { localStorage.setItem('cookie-consent','declined') } catch {} })
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.addStyleTag({ content: `nav[class*="fixed"],nav[class*="sticky"]{position:static!important}` })
// ProductShowcase image
const ps = page.locator('#product')
if (await ps.count()) { await ps.scrollIntoViewIfNeeded(); await page.waitForTimeout(800); await ps.screenshot({ path: 'audit/screenshots/sharp-product.png' }) ; console.log('product') }
// Hero hexagon
await page.evaluate(() => window.scrollTo({top:0}))
await page.waitForTimeout(400)
await page.locator('section').first().screenshot({ path: 'audit/screenshots/sharp-hero.png' })
console.log('hero')
await ctx.close(); await browser.close()
