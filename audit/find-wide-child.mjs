import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } })
const page = await ctx.newPage()
await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

const result = await page.evaluate(() => {
  // Find every descendant inside .about-wrap whose rect width > 360.
  const wrap = document.querySelector('.about-wrap')
  if (!wrap) return { error: 'no .about-wrap' }
  const all = wrap.querySelectorAll('*')
  const offenders = []
  for (const el of all) {
    const r = el.getBoundingClientRect()
    if (r.width > 360) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        cls: (el.className || '').toString().slice(0, 80),
        width: Math.round(r.width),
        height: Math.round(r.height),
        left: Math.round(r.left),
        scrollWidth: el.scrollWidth,
        textSnippet: (el.textContent || '').trim().slice(0, 50),
      })
    }
  }
  // Sort by width descending
  offenders.sort((a, b) => b.width - a.width)
  return offenders.slice(0, 15)
})

console.log(JSON.stringify(result, null, 2))
await browser.close()
