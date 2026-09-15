# Källor — sourcing bar and the watch list

## The sourcing bar

Three tiers. What tier a claim comes from decides whether it can be stated
flatly, must be attributed, or cannot be published at all.

**Tier 1 — primary. State flatly, cite with date.**
Försäkringskassan, IVO, Socialstyrelsen, riksdagen.se (lagtext, SFS),
regeringen.se (SOU, proposition, direktiv), a kollektivavtal PDF from Fremia
or Vårdföretagarna. These are the only sources a number, deadline, paragraph
reference or procedural step may come from.

**Tier 2 — informed secondary. Attribute in the sentence.**
Assistanskoll, HejaOlika, branschorganisationers own analysis. Good for
"what changed and why it matters", never for the figure itself. Write
"enligt Assistanskoll…", not the claim bare.

**Tier 3 — everything else.** Competitor blogs, LLM recall, general web
writing, and anything you cannot open right now. **Not publishable.** If a
claim only exists at tier 3, it becomes a `[VERIFIERA]` marker or it is cut.

A claim that survives only because it "sounds right" is the exact failure this
bar exists to catch. Your own training data is tier 3.

## Feeds (verified live 2026-08-25)

| Source | Feed | Mode | Worth |
|---|---|---|---|
| **Assistanskoll** | `/artiklar.rss` | all | Independent Living Institute. The sector-defining independent voice, ~80 items deep. The single most useful feed here — and the outlet most worth being interviewed by. |
| **HejaOlika** | `/feed/` | all | LSS/funktionsrätt news, high volume, fast. Good early signal, more advocacy than operations. |
| **Vårdföretagarna** | `/feed` | all | Employer org, Bransch Personlig Assistans. Kollektivavtal and employer-side positions. |
| **Regeringen** | `Filter/RssFeed?...` | filter | All-department firehose, ~100 items. The keyword filter cuts it to ~7. Where SOU, proposition and direktiv land. |

`scripts/omvarld.mjs` holds the URLs. `mode: 'filter'` means only items matching
`KEYWORDS` survive — required for Regeringen, wrong for the other three.

## No feed — check by hand

These publish nothing subscribable. They are also the tier-1 sources, so the
gap matters. Check them when a topic touches their area, and on a monthly pass.

| Source | Where | Why it matters |
|---|---|---|
| **IVO** | ivo.se/om-ivo/nyheter/ | Tillsynsfokus, beslut, yearly tillsynsplan. Directly drives what a verksamhetschef must prepare for. |
| **Försäkringskassan** | forsakringskassan.se/nyheter | Schablonbelopp, räkningsrutiner, blanketter. Every ersättning figure originates here. |
| **Socialstyrelsen** | socialstyrelsen.se pressrum | Föreskrifter och allmänna råd — the documentation requirements. |
| **Fremia** | fremia.se | Kollektivavtal for a large share of anordnare, kooperativ included. |

If a page ever justifies it, these four are the candidates for a scheduled
`WebFetch` check rather than RSS.

## Distribution targets

Not sources — placements. All three are organised around *assistansanordnare*,
not their suppliers, so Elivro does not get listed. It gets adjacent, through
2u Assistans or by contributing expertise.

- **Assistanskoll** — interviews and sector reporting. 2u is the plausible
  subject; Elivro gets named as what they run on.
- **Vårdföretagarna / Fremia** — branch days and member content. Sponsorship and
  contributed expertise, not a listing.

An `/kunskap` page and a contributed article for one of these are the same
work done once. Write the page first, then offer it.
