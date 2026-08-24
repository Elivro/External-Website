# Underlag — drafts in staging

Markdown drafts live here between writing and publishing. Payload is the
system of record; these files are a review surface, not a second source of
truth.

Flow: draft here → review + resolve every `[VERIFIERA]` → run the gate
(`.claude/skills/underlag/references/gate.md`) → paste into Payload →
publish. After that the Payload document is canonical and the file is history.

Nothing in this directory is rendered or deployed. Frontmatter mirrors the
fields in `collections/Articles.ts` so transferring is mechanical.

A draft is not publishable while any `[VERIFIERA]` marker remains.
