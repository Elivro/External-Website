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
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: join(OUT, `hero-fold-${w}x${h}.png`) })
  // Measure the hero section height
  const heroBox = await page.locator('section').first().boundingBox()
  console.log(`${w}x${h}: viewportH=${h} heroH=${heroBox?.height} ratio=${(heroBox?.height / h).toFixed(2)}`)
  await ctx.close()
}

await browser.close()
