import { chromium } from 'playwright'

const browser = await chromium.launch()

// Test at various viewport heights to verify the clamp behavior.
const TESTS = [
  { w: 1280, h: 800 },
  { w: 1280, h: 900 },
  { w: 1280, h: 950 },
  { w: 1280, h: 1080 },
  { w: 1280, h: 1200 },
  { w: 1280, h: 1440 },
  { w: 360, h: 740 },
]

const BANNER_NAV = 116 // ~52 banner + ~64 navbar

for (const { w, h } of TESTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  const data = await page.evaluate(() => {
    const all = document.querySelectorAll('section')
    const hero = all[0]
    return {
      hero: hero ? Math.round(hero.getBoundingClientRect().height) : null,
      heroY: hero ? Math.round(hero.getBoundingClientRect().top) : null,
    }
  })
  const consumed = (data.heroY ?? 0) + (data.hero ?? 0)
  const peek = h - consumed
  console.log(
    `${w}x${h}: hero=${data.hero}px  consumed=${consumed}  next-section-peek=${peek > 0 ? peek : '(over)'}px`,
  )
  await ctx.close()
}

await browser.close()
