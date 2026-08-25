# Underlag — the articles

Each `.md` file here **is** an article. `lib/kunskap.ts` reads this directory
and renders the body through remark/rehype at build time; there is no CMS and
no database. Editing a file and merging is publishing.

Frontmatter fields are documented in `.claude/skills/kunskap/SKILL.md`.

`draft: true` keeps a piece off the production deployment while still rendering
it locally and on Vercel preview deployments — so a reviewer can read the real
page at a shareable URL before anything is public. Drafts are also `noindex`,
stay out of `sitemap.xml`, and do not count toward `/kunskap` having content.

Body syntax is narrow on purpose: `*kursiv*`, `[text](url)`, GFM tables,
headings, lists, `---`. Bold is not supported — `DESIGN.md` forbids it for
emphasis, so the pipeline cannot produce it. An `<!-- -->` block is stripped
before rendering; that is where open questions to the author belong.

A file without a `slug` is ignored, which is why this README does not become a
page.

No article should be published while a `[VERIFIERA:` marker remains in it.
