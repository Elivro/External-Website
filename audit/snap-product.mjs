import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, 'screenshots')
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
for (const [w, h] of [[1280, 800], [360, 740]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3001/#product', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1500)
  // Scroll the product section into view, then snap it.
  await page.evaluate(() => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'instant', block: 'start' })
  })
  await page.waitForTimeout(500)
  const section = page.locator('#product').first()
  await section.screenshot({ path: join(OUT, `product-${w}.png`) })
  console.log(`${w}: product section captured`)
  await ctx.close()
}
await browser.close()
