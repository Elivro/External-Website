import { chromium } from 'playwright'
import fs from 'node:fs/promises'
const URL = process.env.URL || 'http://localhost:3001'
await fs.mkdir('audit/screenshots', { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 414, height: 1400 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.addInitScript(() => { try { localStorage.setItem('cookie-consent','declined') } catch {} })
await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.locator('section').first().screenshot({ path: 'audit/screenshots/hero-mobile.png' })
console.log('saved hero-mobile.png')
await ctx.close(); await browser.close()
