import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } })
const page = await ctx.newPage()
await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)

const result = await page.evaluate(() => {
  const wrap = document.querySelector('.about-wrap')
  if (!wrap) return { error: 'no .about-wrap found' }
  const cs = getComputedStyle(wrap)
  const r = wrap.getBoundingClientRect()
  return {
    width: r.width,
    height: r.height,
    left: r.left,
    right: r.right,
    gridTemplateColumns: cs.gridTemplateColumns,
    display: cs.display,
    maxWidth: cs.maxWidth,
    padding: cs.padding,
    margin: cs.margin,
    boxSizing: cs.boxSizing,
    parentWidth: wrap.parentElement?.getBoundingClientRect().width,
    parentTagClass: wrap.parentElement ? `${wrap.parentElement.tagName.toLowerCase()}.${wrap.parentElement.className.slice(0, 40)}` : null,
  }
})

console.log(JSON.stringify(result, null, 2))
await browser.close()
