#!/usr/bin/env node
/**
 * Omvärldsbevakning — polls the Swedish personlig-assistans news feeds and
 * reports what is new since the last run.
 *
 * Usage
 *   npm run omvarld           new items since last run
 *   npm run omvarld:all       ignore state, show everything (preview)
 *   npm run omvarld:email     new items + a digest mail via Resend
 *
 * No dependencies. Node's fetch plus a tolerant RSS/Atom reader — the four
 * feeds below are plain RSS 2.0 and do not justify an XML parser.
 *
 * State lives in .omvarld-state.json (gitignored). Delete it to reset.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const STATE_FILE = join(ROOT, '.omvarld-state.json')
const DIGEST_TO = process.env.OMVARLD_TO || 'daniel@elivro.se'
const DIGEST_FROM = process.env.OMVARLD_FROM || 'Elivro omvärld <onboarding@resend.dev>'

/**
 * Verified live on 2026-08-25. `mode` decides how much noise a source may
 * contribute:
 *   'all'    — the whole feed is on-topic, pass everything through
 *   'filter' — a firehose; only items matching KEYWORDS survive
 *
 * IVO, Försäkringskassan, Socialstyrelsen and Fremia publish no RSS at all —
 * they are listed in NO_FEED and have to be checked by hand.
 */
const SOURCES = [
  {
    name: 'Assistanskoll',
    url: 'https://assistanskoll.se/artiklar.rss',
    mode: 'all',
    note: 'Independent Living Institute. The sector-defining independent voice.',
  },
  {
    name: 'HejaOlika',
    url: 'https://hejaolika.se/feed/',
    mode: 'all',
    note: 'LSS/funktionsrätt news, high volume.',
  },
  {
    name: 'Vårdföretagarna',
    url: 'https://www.vardforetagarna.se/feed',
    mode: 'all',
    note: 'Employer org, Bransch Personlig Assistans.',
  },
  {
    name: 'Regeringen',
    url: 'https://www.regeringen.se/Filter/RssFeed?filterType=Taxonomy&filterByType=FilterablePageBase&preFilteredCategories=1324&rootPageReference=0',
    mode: 'filter',
    note: 'All-department firehose. The keyword filter is load-bearing here.',
  },
]

/** Sources with no feed. The skill checks these by hand. */
export const NO_FEED = [
  { name: 'IVO', url: 'https://www.ivo.se/om-ivo/nyheter/', why: 'tillsynsfokus, beslut' },
  { name: 'Försäkringskassan', url: 'https://www.forsakringskassan.se/nyheter', why: 'schablonbelopp, räkningsrutiner' },
  { name: 'Socialstyrelsen', url: 'https://www.socialstyrelsen.se/om-socialstyrelsen/pressrum/', why: 'föreskrifter, allmänna råd' },
  { name: 'Fremia', url: 'https://www.fremia.se/', why: 'kollektivavtal' },
]

const KEYWORDS = [
  'assistans', 'lss', 'assistansersättning', 'schablonbelopp', 'personlig assistent',
  'funktionshinder', 'funktionsnedsättning', 'ivo', 'lex sarah', 'brukare',
  'assistansanordnare', 'omvårdnadsbidrag', 'merkostnadsersättning',
]

// ---------------------------------------------------------------- parsing

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decode(input = '') {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&#0?39;/g, "'")
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => ENTITIES[name])
    .replace(/\s+/g, ' ')
    .trim()
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
  return match ? decode(match[1]) : ''
}

function parseFeed(xml) {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/(item|entry)>/gi) || []
  return blocks.map((block) => {
    // Atom puts the URL in an attribute; RSS puts it in the element body.
    const href = block.match(/<link[^>]*href="([^"]+)"/i)
    return {
      title: tag(block, 'title'),
      link: href ? href[1] : tag(block, 'link') || tag(block, 'guid'),
      date: tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated'),
      summary: (tag(block, 'description') || tag(block, 'summary')).slice(0, 320),
      id: tag(block, 'guid') || tag(block, 'id') || tag(block, 'link') || tag(block, 'title'),
    }
  })
}

function onTopic(item) {
  const hay = `${item.title} ${item.summary}`.toLowerCase()
  return KEYWORDS.some((word) => hay.includes(word))
}

// ---------------------------------------------------------------- fetching

async function pull(source) {
  try {
    const res = await fetch(source.url, {
      headers: { 'user-agent': 'Elivro omvarldsbevakning (+https://elivro.se)' },
      signal: AbortSignal.timeout(25_000),
    })
    if (!res.ok) return { source, items: [], error: `HTTP ${res.status}` }
    const items = parseFeed(await res.text())
    return {
      source,
      items: source.mode === 'filter' ? items.filter(onTopic) : items,
      error: null,
    }
  } catch (err) {
    // A dead feed must never take the run down — report it and move on.
    return { source, items: [], error: err.message }
  }
}

// ---------------------------------------------------------------- state

async function readState() {
  try {
    return JSON.parse(await readFile(STATE_FILE, 'utf8'))
  } catch {
    return { seen: [], lastRun: null }
  }
}

// ---------------------------------------------------------------- output

function renderText(groups) {
  const lines = []
  for (const group of groups) {
    if (!group.items.length) continue
    lines.push(`\n## ${group.source.name}  (${group.items.length})`)
    for (const item of group.items) {
      lines.push(`\n  ${item.title}`)
      if (item.date) lines.push(`  ${item.date}`)
      lines.push(`  ${item.link}`)
      if (item.summary) lines.push(`  ${item.summary.slice(0, 180)}...`)
    }
  }
  return lines.join('\n')
}

function escapeHtml(value) {
  return String(value).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
}

function renderHtml(groups, total) {
  const sections = groups
    .filter((group) => group.items.length)
    .map((group) => {
      const rows = group.items
        .map(
          (item) => `<div style="padding:14px 0;border-top:1px solid rgba(17,17,17,.07)">
<a href="${escapeHtml(item.link)}" style="font:600 16px/1.35 -apple-system,sans-serif;color:#111111;text-decoration:none">${escapeHtml(item.title)}</a>
<div style="font:400 13px/1.5 -apple-system,sans-serif;color:#A5A9AF;margin-top:4px">${escapeHtml(item.date)}</div>
${item.summary ? `<div style="font:400 14px/1.55 -apple-system,sans-serif;color:#686F76;margin-top:6px">${escapeHtml(item.summary.slice(0, 200))}...</div>` : ''}
</div>`,
        )
        .join('')
      return `<h2 style="font:600 13px/1.3 -apple-system,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#DC2626;margin:32px 0 12px">${escapeHtml(group.source.name)}</h2>${rows}`
    })
    .join('')

  return `<div style="max-width:640px;margin:0 auto;padding:32px 24px;background:#FAFAF7">
<div style="font:400 14px/1.5 -apple-system,sans-serif;color:#4A4F54;margin-bottom:8px">${total} ${total === 1 ? 'ny notis' : 'nya notiser'} i omvärldsbevakningen.</div>
${sections}
<p style="font:400 12px/1.5 -apple-system,sans-serif;color:#A5A9AF;margin-top:40px;border-top:1px solid rgba(17,17,17,.07);padding-top:16px">Automatisk bevakning. Källor: ${SOURCES.map((s) => s.name).join(', ')}. IVO, Försäkringskassan, Socialstyrelsen och Fremia saknar RSS och kollas manuellt.</p>
</div>`
}

async function sendDigest(groups, total) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('\n[omvarld] RESEND_API_KEY saknas - hoppar over mejlet.')
    return false
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: DIGEST_FROM,
      to: [DIGEST_TO],
      subject: `Omvärld · ${total} ${total === 1 ? 'ny notis' : 'nya notiser'}`,
      html: renderHtml(groups, total),
    }),
  })
  if (!res.ok) {
    console.error(`\n[omvarld] Resend svarade ${res.status}: ${await res.text()}`)
    return false
  }
  console.error(`\n[omvarld] Digest skickad till ${DIGEST_TO}.`)
  return true
}

// ---------------------------------------------------------------- main

const args = new Set(process.argv.slice(2))
const showAll = args.has('--all')
const wantEmail = args.has('--email')
const asJson = args.has('--json')

const state = await readState()
const seen = new Set(state.seen)

const results = await Promise.all(SOURCES.map(pull))

const groups = results.map((result) => ({
  ...result,
  items: showAll ? result.items : result.items.filter((item) => !seen.has(item.id)),
}))

const fresh = groups.flatMap((group) => group.items)
const failures = results.filter((result) => result.error)

if (asJson) {
  console.log(
    JSON.stringify(
      { groups, failures: failures.map((f) => ({ name: f.source.name, error: f.error })) },
      null,
      2,
    ),
  )
} else if (!fresh.length) {
  console.log('Inget nytt sedan förra körningen.')
} else {
  console.log(`${fresh.length} ${fresh.length === 1 ? 'ny notis' : 'nya notiser'}.`)
  console.log(renderText(groups))
}

for (const failure of failures) {
  console.error(`\n[omvarld] ${failure.source.name} misslyckades: ${failure.error}`)
}

if (wantEmail && fresh.length) await sendDigest(groups, fresh.length)

// Only commit state on a normal run — --all is a preview and must not
// silently mark hundreds of historical items as already seen.
if (!showAll) {
  const allIds = results.flatMap((result) => result.items.map((item) => item.id))
  await writeFile(
    STATE_FILE,
    JSON.stringify(
      {
        seen: [...new Set([...state.seen, ...allIds])].slice(-1000),
        lastRun: new Date().toISOString(),
      },
      null,
      2,
    ),
  )
}
