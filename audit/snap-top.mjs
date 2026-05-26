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
  await page.waitForTimeout(900)
  // Snap the banner + nav area only (top 200px)
  await page.screenshot({
    path: join(OUT, `top-${w}.png`),
    clip: { x: 0, y: 0, width: w, height: 160 },
  })
  const sections = await page.evaluate(() => {
    const all = document.querySelectorAll('section')
    const hero = all[0]
    return {
      heroHeight: hero ? Math.round(hero.getBoundingClientRect().height) : null,
    }
  })
  console.log(`${w}: hero=${sections.heroHeight}px`)
  await ctx.close()
}

await browser.close()
