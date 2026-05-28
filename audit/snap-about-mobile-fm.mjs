import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const URL = process.env.URL || 'http://localhost:3002'
const OUT_DIR = 'audit/screenshots'
await fs.mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 414, height: 1000 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'declined') } catch {} })
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(700)

// Full section (tall) — default state.
await page.locator('#about-us').screenshot({ path: `${OUT_DIR}/fm-full.png` })
console.log('saved fm-full.png')

// Just the founder block — default.
const fm = page.locator('#about-us .about-fm')
await fm.scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await fm.screenshot({ path: `${OUT_DIR}/fm-card-1.png` })
console.log('saved fm-card-1.png')

// Next founder.
await page.locator('#about-us .about-fm-arrow').nth(1).click()
await page.waitForTimeout(400)
await fm.screenshot({ path: `${OUT_DIR}/fm-card-2.png` })
console.log('saved fm-card-2.png')

await ctx.close()
await browser.close()
