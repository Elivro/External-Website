import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, 'screenshots')
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

// --- 1) Banner snapshot at 360 + 1280 ---
for (const w of [360, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 200 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  const banner = await page.locator('a[href="#startup-offer"]').first()
  await banner.screenshot({ path: join(OUT, `banner-${w}.png`) })
  const box = await banner.boundingBox()
  console.log(`banner@${w}: bbox=${JSON.stringify(box)}`)
  await ctx.close()
}

// --- 2) Verify links on the page point at REAL anchors ---
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'))
    return anchors.map((a) => {
      const id = a.getAttribute('href').slice(1)
      const target = id ? document.getElementById(id) : null
      return {
        text: (a.textContent || '').trim().slice(0, 50),
        href: a.getAttribute('href'),
        exists: !!target,
      }
    })
  })

  console.log('\n--- Internal anchor links ---')
  let broken = 0
  for (const l of links) {
    const mark = l.exists ? 'OK ' : 'XX '
    if (!l.exists) broken++
    console.log(`  ${mark} ${l.href}  ${JSON.stringify(l.text)}`)
  }
  console.log(`\n${broken}/${links.length} broken`)
  await ctx.close()
}

// --- 3) Click each "Boka demo" button + verify modal opens ---
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  console.log('\n--- "Boka demo" click verification (desktop, 1280) ---')
  // Find every visible button or link whose visible text is "Boka demo"
  const candidates = await page.locator('text=/^Boka demo$/').all()
  console.log(`Found ${candidates.length} candidates at 1280px`)
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i]
    const visible = await c.isVisible()
    if (!visible) {
      console.log(`  [${i}] hidden, skip`)
      continue
    }
    const tag = await c.evaluate((el) => el.tagName.toLowerCase())
    // Click
    await c.scrollIntoViewIfNeeded()
    await c.click()
    await page.waitForTimeout(300)
    // Check if a dialog is now open by looking for the DemoModal's title or a role=dialog element
    const dialogVisible = await page.locator('[role="dialog"]').first().isVisible().catch(() => false)
    console.log(`  [${i}] <${tag}> → dialog open: ${dialogVisible}`)
    if (dialogVisible) {
      // Close it via Escape or by clicking an X
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
    }
  }
  await ctx.close()
}

await browser.close()
