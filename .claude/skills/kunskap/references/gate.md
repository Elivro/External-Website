# Gate — run in full before publishing

Two sections. **Hard** checks block publication; there is no "ship it and fix
it after". **Soft** checks are judgment calls you have to actually make rather
than skip.

Then a post-deploy section, which is the one people skip and the one that
catches the real failures.

---

## Hard — a failure here blocks the publish

### Intent and ownership

- [ ] The page has **one** primary intent, expressible in a single sentence.
- [ ] No existing `/kunskap` page owns that intent. If one does, this is an
      IMPROVE on that page, not a new URL.
- [ ] It is decision support, not news. A reader can *do* something differently
      after reading it.

### Truth

- [ ] **Zero `[VERIFIERA]` markers remain.** Every one was resolved against a
      tier-1 source, or the claim was cut.
- [ ] Every figure, deadline, paragraph reference and procedural step traces to
      a tier-1 source (see `kallor.md`), read this session.
- [ ] Sources are listed with the date read, and **every one is a working
      link** — `[Namn](url)`. A citation a reader cannot open is not a
      citation, and an unlinked source is invisible to the AI-search channel
      these pages are largely written for.
- [ ] Nothing rests on recall. If you cannot open the source right now, the
      claim does not ship.

### Claims about Elivro

- [ ] Every product claim matches what the system actually does today, not the
      roadmap.
- [ ] No testimonials, no case studies, no "X% mindre tid", no competitor
      comparison table. Hard repo constraints from `CLAUDE.md`.
- [ ] 2u Assistans is the only customer named.

### Voice

- [ ] Swedish, "du" form, never "Ni".
- [ ] No emoji. No exclamation marks.
- [ ] Emphasis is italic. **No bold-for-emphasis anywhere**, headings or body.
- [ ] None of: synergier, disrupta, revolutionera, transformera, empowerment,
      journey, solution, best-in-class, cutting-edge, next-gen, 10x, unlock,
      seamless.
- [ ] Headings are sentence case. No ALL CAPS outside the 12px kicker.

### Technical

- [ ] `title` unique across the site, roughly under 60 chars.
- [ ] `dek` works as a meta description, roughly 140–160 chars.
- [ ] Exactly one `<h1>`, and it is the article title.
- [ ] `slug` is lowercase kebab. If this page was already published, the slug is
      **unchanged** — changing it without a redirect discards the URL's history.
- [ ] `category` set. `kind` is `kunskap`.
- [ ] `publishedAt` is the real date; `updatedAt` added if this is a revision.
- [ ] `draft: true` is removed — that line is what keeps it off production.
- [ ] At least one internal link **in** (from another article or a hub) and one
      **out**. An orphan page is the anti-pattern this surface exists to avoid.

Local verification before deploying:

```bash
npm run build
grep -oiE '<title>[^<]*|rel="canonical"[^>]*|<meta name="robots"[^>]*' \
  ".next/server/app/kunskap/<slug>.html"
```

Expect: unique title, `canonical → https://elivro.se/kunskap/<slug>`,
`robots → index, follow`.

---

## Soft — decide, don't skip

- [ ] Would a verksamhetschef bookmark this, or forward it to a colleague? If
      not, it is not finished.
- [ ] Is it the best Swedish answer to this question that currently exists? If
      something better exists, either beat it or link it.
- [ ] Does it read like Elivro, or could it sit on any SaaS blog?
- [ ] Length earned, not padded.
- [ ] Any image carries information that the text cannot. Otherwise cut it.
- [ ] Anything with an annual cycle (belopp, avtal, tillsynsplan) has a
      calendar note for its refresh.

---

## Post-deploy — verify production HTML, not the source

Non-negotiable. Source that looks correct while the served HTML is wrong is a
real failure mode in this repo — it is what shipped the canonical bug that had
`/quiz` declaring itself a duplicate of the homepage, and it survived review
precisely because the source read fine.

```bash
u="https://elivro.se/kunskap/<slug>"
echo "HTTP: $(curl -s -o /dev/null -w '%{http_code}' "$u")"
curl -s "$u" | grep -oiE '<title>[^<]*|rel="canonical" href="[^"]*"|<meta name="robots" content="[^"]*"|<h1[^>]*>.{0,80}'
curl -s https://elivro.se/sitemap.xml | grep "<slug>"
```

- [ ] HTTP 200.
- [ ] Rendered title and meta description are the intended ones.
- [ ] Canonical is self-referential — **not** `https://elivro.se`.
- [ ] Robots is `index, follow`.
- [ ] `<h1>` is the article title.
- [ ] The URL appears in `sitemap.xml`.
- [ ] `/kunskap` links to it, and it links back out.

Then request indexing in Search Console. Do not wait for organic discovery on
the first few pages — there is not enough crawl budget flowing through this site
yet for that to be quick.

---

## Later — measure, then decide

Give it a full quarter. Traffic at this volume is not readable sooner, and
reacting to two weeks of noise is how you end up rewriting a page that was
working.

Then classify: **KEEP** · **ITERATE** · **REVERT**. Investigate in order —
site, page, query, indexing/canonical, recent code changes — before touching a
word of the content. A drop is more often a technical regression than a writing
problem.
