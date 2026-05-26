import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const URL = process.env.AUDIT_URL || 'http://localhost:3001/'
const OUT = join(__dirname, 'screenshots')

const VIEWPORTS = [
  { name: '360', width: 360, height: 740 },
  { name: '414', width: 414, height: 896 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1536', width: 1536, height: 864 },
  { name: '1920', width: 1920, height: 1080 },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext()
const page = await ctx.newPage()

const report = []

for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.width, height: vp.height })
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
  // Give the page a beat for any layout-shifts from fonts / images.
  await page.waitForTimeout(1200)

  const data = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth
    const winW = window.innerWidth
    const offenders = []
    // Find any visible element whose right edge exceeds viewport width by >1px.
    const all = document.querySelectorAll('body *')
    for (const el of all) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.right > winW + 1) {
        // Truncate selector & dimensions to keep report compact.
        const tag = el.tagName.toLowerCase()
        const cls = (el.getAttribute('class') || '').slice(0, 80)
        const id = el.id ? `#${el.id}` : ''
        offenders.push({
          selector: `${tag}${id}${cls ? '.' + cls.replace(/ /g, '.') : ''}`,
          right: Math.round(r.right),
          width: Math.round(r.width),
          left: Math.round(r.left),
        })
      }
    }
    // Dedupe to outermost offenders (largest by area).
    offenders.sort((a, b) => b.width - a.width)
    const top = offenders.slice(0, 8)
    return {
      docW,
      winW,
      overflow: docW - winW,
      offenders: top,
    }
  })

  // Section-level tap-target audit: find clickable elements smaller than 44x44.
  const tapIssues = await page.evaluate(() => {
    const selectors = ['button', 'a[href]', '[role="button"]', 'input[type="button"]', 'input[type="submit"]']
    const els = document.querySelectorAll(selectors.join(','))
    const issues = []
    for (const el of els) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const tooSmall = r.width < 44 || r.height < 44
      if (tooSmall) {
        const cls = (el.getAttribute('class') || '').slice(0, 60)
        const txt = (el.textContent || '').trim().slice(0, 30)
        issues.push({
          tag: el.tagName.toLowerCase(),
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: txt,
          cls,
        })
      }
    }
    // Dedupe by tag+cls
    const seen = new Set()
    const dedup = []
    for (const i of issues) {
      const k = `${i.tag}|${i.cls}|${i.text}`
      if (seen.has(k)) continue
      seen.add(k)
      dedup.push(i)
    }
    return dedup.slice(0, 12)
  })

  await page.screenshot({
    path: join(OUT, `vp-${vp.name}.png`),
    fullPage: false, // viewport-only first
  })

  report.push({ vp: vp.name, ...data, tapIssues })
  process.stdout.write(`\n== ${vp.name}px ==\nscrollWidth=${data.docW} innerWidth=${data.winW} overflow=${data.overflow}\n`)
  if (data.offenders.length > 0) {
    process.stdout.write(`Offenders (right > viewport):\n`)
    for (const o of data.offenders) {
      process.stdout.write(`  right=${o.right} width=${o.width} left=${o.left}  ${o.selector}\n`)
    }
  }
  if (tapIssues.length > 0 && vp.width <= 768) {
    process.stdout.write(`Tap targets <44x44 (mobile only matters):\n`)
    for (const t of tapIssues) {
      process.stdout.write(`  ${t.tag} ${t.w}x${t.h}  ${JSON.stringify(t.text)}  cls=${t.cls}\n`)
    }
  }
}

await browser.close()

// Final summary
const totalOverflow = report.filter(r => r.overflow > 0).length
const offenderViewports = report.filter(r => r.offenders.length > 0).map(r => r.vp)
process.stdout.write(`\n=== SUMMARY ===\n`)
process.stdout.write(`Viewports with scroll overflow: ${totalOverflow}/${report.length}\n`)
process.stdout.write(`Viewports with off-viewport elements: ${offenderViewports.length}/${report.length} ${offenderViewports.length ? '(' + offenderViewports.join(', ') + ')' : ''}\n`)
