/**
 * Import a markdown draft from content/underlag/ into Payload.
 *
 *   npx payload run scripts/import-underlag.ts <fil.md>
 *   PUBLISH=1 npx payload run scripts/import-underlag.ts <fil.md>
 *
 * Without PUBLISH the document lands as a draft, which is the normal path:
 * import, read it rendered in the admin, then publish by hand.
 *
 * The flag is an env var rather than an argument because `payload run` strips
 * everything after the first non-flag argument before the script sees argv.
 *
 * This is the "paste into Payload" step from the underlag skill, minus the
 * pasting. Idempotent — re-importing the same slug updates in place, so you
 * can iterate on the markdown and re-run.
 *
 * Frontmatter maps onto collections/Articles.ts. The YAML reader below is
 * deliberately small: it understands `key: value`, folded `key: >-` blocks and
 * one level of nesting, which is all the draft format uses. It is not a YAML
 * parser and should not be pointed at arbitrary YAML.
 */

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config.js'

// ---------------------------------------------------------------- frontmatter

type Front = Record<string, string | Record<string, string>>

function parseFrontmatter(raw: string): { front: Front; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error('Ingen frontmatter hittades.')

  const [, head, body] = match
  const front: Front = {}
  const lines = head.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim() || line.trim().startsWith('#')) continue

    const folded = line.match(/^(\w+):\s*>-\s*$/)
    if (folded) {
      const parts: string[] = []
      while (i + 1 < lines.length && /^\s{2,}\S/.test(lines[i + 1])) parts.push(lines[++i].trim())
      front[folded[1]] = parts.join(' ')
      continue
    }

    const nested = line.match(/^(\w+):\s*$/)
    if (nested) {
      const group: Record<string, string> = {}
      while (i + 1 < lines.length && /^\s{2,}\w+:/.test(lines[i + 1])) {
        const [, k, v] = lines[++i].match(/^\s+(\w+):\s*(.*)$/)!
        group[k] = unquote(v)
      }
      front[nested[1]] = group
      continue
    }

    const plain = line.match(/^(\w+):\s*(.*)$/)
    if (plain) front[plain[1]] = unquote(plain[2])
  }

  return { front, body }
}

const unquote = (v: string) => v.trim().replace(/^["']|["']$/g, '')

// ---------------------------------------------------------------- lexical

const textNode = (text: string, italic = false) => ({
  type: 'text',
  detail: 0,
  format: italic ? 2 : 0, // lexical format bitmask: 1 bold, 2 italic
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

/** Splits `*så här*` into italic runs. Deliberately the only inline syntax. */
function inline(text: string) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.length > 2 && part.startsWith('*') && part.endsWith('*')
        ? textNode(part.slice(1, -1), true)
        : textNode(part),
    )
}

const block = (type: string, children: unknown[], extra: Record<string, unknown> = {}) => ({
  type,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children,
  ...extra,
})

function markdownToLexical(markdown: string) {
  // Drop the editorial HTML comment — it is a note to the author, not content.
  const clean = markdown.replace(/<!--[\s\S]*?-->/g, '').trim()
  const lines = clean.split(/\r?\n/)
  const children: unknown[] = []

  let paragraph: string[] = []
  let list: { type: 'bullet' | 'number'; items: string[] } | null = null

  const flushParagraph = () => {
    if (!paragraph.length) return
    children.push(block('paragraph', inline(paragraph.join(' ')), { textFormat: 0 }))
    paragraph = []
  }

  const flushList = () => {
    if (!list) return
    children.push(
      block(
        'list',
        list.items.map((item, index) =>
          block('listitem', inline(item), { value: index + 1 }),
        ),
        { listType: list.type, tag: list.type === 'bullet' ? 'ul' : 'ol', start: 1 },
      ),
    )
    list = null
  }

  const flushAll = () => {
    flushParagraph()
    flushList()
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushAll()
      continue
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.*)$/)
    if (heading) {
      flushAll()
      children.push(block('heading', inline(heading[2]), { tag: `h${heading[1].length}` }))
      continue
    }

    if (/^---+$/.test(trimmed)) {
      flushAll()
      children.push({ type: 'horizontalrule', version: 1 })
      continue
    }

    const bullet = trimmed.match(/^[-*]\s+(.*)$/)
    const numbered = trimmed.match(/^\d+\.\s+(.*)$/)

    if (bullet || numbered) {
      flushParagraph()
      const type = bullet ? 'bullet' : 'number'
      const text = (bullet ?? numbered)![1]
      if (list && list.type !== type) flushList()
      if (!list) list = { type, items: [] }
      list.items.push(text)
      continue
    }

    // A wrapped continuation of the current list item or paragraph.
    if (list) {
      list.items[list.items.length - 1] += ` ${trimmed}`
      continue
    }
    paragraph.push(trimmed)
  }

  flushAll()

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

// ---------------------------------------------------------------- main

const file = process.argv.slice(2).find((arg) => !arg.startsWith('--'))
const publish = process.env.PUBLISH === '1'

if (!file) {
  console.error('Ange en fil: npx payload run scripts/import-underlag.ts content/underlag/<fil>.md')
  process.exit(1)
}

const raw = await readFile(resolve(process.cwd(), file), 'utf8')
const { front, body } = parseFrontmatter(raw)
const seo = (front.seo ?? {}) as Record<string, string>

const payload = await getPayload({ config })

const data = {
  title: String(front.title),
  dek: String(front.dek),
  slug: String(front.slug),
  kind: String(front.kind ?? 'underlag'),
  category: String(front.category),
  content: markdownToLexical(body),
  publishedAt: new Date().toISOString(),
  seo: {
    metaTitle: seo.metaTitle || undefined,
    metaDescription: seo.metaDescription || undefined,
    noindex: seo.noindex === 'true',
  },
  _status: publish ? 'published' : 'draft',
}

const existing = await payload.find({
  collection: 'articles',
  where: { slug: { equals: data.slug } },
  limit: 1,
  draft: true,
})

if (existing.docs.length) {
  await payload.update({
    collection: 'articles',
    id: existing.docs[0].id,
    data: data as never,
    draft: !publish,
  })
  console.log(`Uppdaterade /underlag/${data.slug} (${data._status})`)
} else {
  await payload.create({ collection: 'articles', data: data as never, draft: !publish })
  console.log(`Skapade /underlag/${data.slug} (${data._status})`)
}

console.log(`${data.content.root.children.length} block importerade.`)

process.exit(0)
