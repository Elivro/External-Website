---
name: underlag
description: |
  Write, review and publish articles for the /underlag editorial surface —
  the evergreen decision-support pages for Swedish assistansanordnare
  (regelverk, ersättning, schemaläggning, dokumentation, systembyte).

  Use when: drafting or revising an underlag article, deciding whether a
  topic deserves a new page at all, running omvärldsbevakning to find topic
  candidates, or running the pre-publish gate before something ships.

  Covers the whole loop: bevaka (watch) → äga (ownership check) → utkast
  (draft) → granska (gate) → publicera (publish).
---

# Underlag — the editorial loop

The surface lives at `/underlag`. **An article is a markdown file in
`content/underlag/`** — there is no CMS and no database. `lib/underlag.ts`
reads the directory and renders the body through remark/rehype at build time;
`app/(app)/underlag/[slug]/page.tsx` is the template.

The file is the article. Editing it and committing is publishing.

## The one rule that outranks everything here

**You draft. A human with domain knowledge verifies every fact. Then it ships.**

The buyer for these pages is a VD or verksamhetschef who administers LSS for a
living. They are the single person best equipped to notice an error about
IVO-tillsyn or FK-räkning — and noticing one destroys the credibility the page
existed to build. In a sector of roughly a thousand companies where everyone
knows everyone, that travels.

So: **never state a regulatory figure, deadline, paragraph reference or
procedural detail you have not read in a primary source in this session.**
Write a marker instead:

```
Schablonbeloppet för 2026 är [VERIFIERA: belopp + källa, forsakringskassan.se].
```

A draft full of honest `[VERIFIERA]` markers is a good draft. A draft with a
confidently wrong number is a liability. Never guess to make a draft look
finished, and never remove a marker you did not personally resolve against a
primary source.

---

## Mode 1 — `bevaka`: find topics

```bash
npm run omvarld          # new since last run
npm run omvarld:all      # everything, preview, does not write state
npm run omvarld:email    # also mail a digest to daniel@elivro.se
```

Four live RSS sources (verified 2026-08-25) — Assistanskoll, HejaOlika,
Vårdföretagarna, Regeringen. See `references/kallor.md` for what each is worth
and for the four important sources that publish **no** feed and must be checked
by hand.

Reading the output: most items are news, and **news is not an underlag topic**.
An item earns a topic candidate only when it changes something a verksamhetschef
must now *do* differently — a changed belopp, a new föreskrift, a shifted
tillsynsfokus, a kollektivavtal outcome. "Debate about LSS" is not a topic.
"Schablonbeloppet ändras" is.

Recurring items are the strongest signal: anything that changes on a calendar
(schablonbelopp, avtalsrörelse, IVO's yearly tillsynsplan) makes an evergreen
page that pays out every year on refresh.

---

## Mode 2 — `äga`: the ownership check

Run before writing a single sentence. Classify the topic:

- **CREATE** — no existing page owns this intent, and it is a question a
  verksamhetschef would actually type or ask.
- **IMPROVE** — an existing `/underlag` page already covers this intent. Revise
  that page in place and update `dateModified`. Do **not** create a sibling.
- **REJECT** — it is news, not decision support; or it duplicates the landing
  page's job; or we cannot source it honestly.

To check what exists: read the titles and deks of every published article
(`npm run dev` then `/underlag`, or query Payload). With fewer than ~15 pages
this is a read, not a search problem.

Two pages competing for the same intent is the failure mode this whole surface
was designed to avoid. When in doubt, IMPROVE.

---

## Mode 3 — `utkast`: draft

### Shape

```
Rubrik            One line, sentence case. Mark ONE word *så här* for the
                  Fraunces italic accent. Not a keyword string.
Ingress (dek)     2–3 sentences. What the reader will be able to decide
                  after reading. Doubles as meta description.
H2 sections       3–6. Each answers one real question.
Avslutning        What to do now — concrete, not a pitch.
Källor            Every primary source, named and LINKED — [Namn](url) —
                  with the date you read it.
```

Target 900–1600 words. Shorter is fine if the question is small. Padding to hit
a length is how these pages start reading like everyone else's.

### Rules that come from this repo, not from general practice

- **Swedish. "du", never "Ni."**
- **Italic emphasizes, bold never.** In body text as well as headings.
- **No emoji. No exclamation marks.** Anywhere.
- **Forbidden vocabulary:** synergier, disrupta, revolutionera, transformera,
  empowerment, journey, solution, best-in-class, cutting-edge, next-gen, 10x,
  unlock, seamless.
- **Quantify in time, money, names** — "14 timmar per vecka per koordinator",
  "30 dagars test". Never "betydande effektivisering".
- **No testimonials, no case studies, no "X% mindre tid" claims, no
  competitor comparison tables.** These are hard repo constraints from
  `CLAUDE.md`, and they apply here exactly as they do on the landing page.
  Elivro has one named customer (2u Assistans); write like it.
- **Mention Elivro at most once, at the end, and only where it is genuinely
  relevant.** The page earns trust by being useful about the regulation. A
  page that pivots to product mid-argument fails at its only job.

### On images

**Default to none.** `DESIGN.md` rejects decorative imagery — "icons earn their
place by carrying differentiating information". A generated illustration on a
regulatory page is decoration by definition and reads as exactly the
AI-aesthetic surface the design system exists to avoid.

What earns a place: a real artifact. An actual IVO-blankett, a real schema view,
a screenshot of the product doing the thing being described. If you cannot name
what information the image carries, it does not go in.

A well-built table beats every illustration on these pages, and LLMs cite it.
The importer supports markdown pipe tables and `[text](url)` links; those plus
`*kursiv*` are the whole inline vocabulary. Bold is deliberately unsupported.

---

## Mode 4 — `granska`: the gate

Run `references/gate.md` in full before anything is published. A page that
fails any hard check does not ship. No exceptions, no "we'll fix it after."

---

## Mode 5 — `publicera`

Frontmatter drives everything:

| Field | Notes |
|---|---|
| `title` | `*ett*` marks the italic accent word |
| `dek` | 2–3 sentences, doubles as meta description |
| `slug` | lowercase kebab, **never change after publish** without a redirect |
| `category` | regelverk · ersattning · schemalaggning · dokumentation · systembyte |
| `kind` | `underlag` (evergreen). `omvarld` is reserved, no public surface |
| `publishedAt` | `"YYYY-MM-DD"` |
| `updatedAt` | add on revision; omit and no "Uppdaterad" line shows |
| `draft` | `true` hides it from production only — see below |
| `author` | falls back to "Elivro" |
| `seo.metaTitle` | only if the rubrik runs past ~60 chars |
| `seo.metaDescription` | only if the dek does not work as one |
| `seo.noindex` | published but deliberately unfindable |

Body syntax is deliberately narrow: `*kursiv*`, `[text](url)`, GFM pipe tables,
headings, lists, `---`. **Bold is not supported** — `DESIGN.md` forbids it for
emphasis, so the pipeline cannot produce it. An `<!-- -->` comment block is
stripped before rendering, which is where open questions to the author live.

### draft: true is the review mechanism

A draft renders on **preview deployments and locally**, and is absent from the
**production deployment**. That is the point: push the branch, open the Vercel
preview URL, and send that link to whoever has to check the facts. They read
the real page, not a CMS approximation, and nothing is public.

Drafts are also `noindex` and out of `sitemap.xml` even on preview, and they do
not count toward `/underlag` being non-empty.

Publishing is deleting the `draft: true` line and merging.

### Three things happen automatically

- `/underlag` is `noindex` while it has no non-draft articles, and becomes
  indexable when the first one publishes.
- `sitemap.ts` picks up published articles and skips drafts and `noindex`.
- Every article prerenders at build. There is no runtime data fetch to fail.

**After publishing, verify production HTML — not the source.** Source that looks
right and HTML that is wrong is a real failure mode in this repo; it is exactly
what shipped the canonical bug that had `/quiz` reporting itself as a duplicate
of the homepage.

```bash
curl -s https://elivro.se/underlag/<slug> | grep -oiE   '<title>[^<]*|rel="canonical" href="[^"]*"|<meta name="robots" content="[^"]*"'
```

At three published articles, three manual steps come due: add the article index
to `public/llms.txt` and `llms-full.txt`, and add a homepage section linking the
three most recent. The hub does not work while it is near-orphaned.

---

## References

- `references/kallor.md` — source hierarchy, what each feed is worth, the
  no-feed sources, and the sourcing bar
- `references/gate.md` — the pre-publish checklist

## Related

- `DESIGN.md` (repo root) — v4 "Vaken pondus". Canonical on visual questions.
- `../elivro-business/positionering.md` — canonical on voice.
- ⚠️ The `elivro-design` skill is **stale** — it teaches the retired Obsidian
  system (dark surfaces, ember `#d25844`, Liv sage, mono eyebrows). Do not
  follow it. `DESIGN.md` wins.
