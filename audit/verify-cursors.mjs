import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const page = await ctx.newPage()
await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

const report = await page.evaluate(() => {
  const tags = ['button', 'a', '[role="button"]']
  const els = document.querySelectorAll(tags.join(','))
  const wrong = []
  let total = 0
  for (const el of els) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    total++
    const cs = getComputedStyle(el)
    const isDisabled =
      el.disabled === true ||
      el.getAttribute('aria-disabled') === 'true'
    const expected = isDisabled ? 'not-allowed' : 'pointer'
    if (cs.cursor !== expected) {
      wrong.push({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().slice(0, 40),
        cursor: cs.cursor,
        expected,
      })
    }
  }
  return { total, wrong: wrong.slice(0, 15), wrongCount: wrong.length }
})

console.log(`Checked ${report.total} interactive elements`)
console.log(`Cursor mismatches: ${report.wrongCount}`)
for (const w of report.wrong) {
  console.log(`  <${w.tag}> cursor=${w.cursor} expected=${w.expected}  ${JSON.stringify(w.text)}`)
}

await browser.close()
