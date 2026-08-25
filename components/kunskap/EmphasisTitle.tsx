import { Fragment } from 'react'

/**
 * Renders `*ett*` in a CMS title as the Fraunces italic accent word.
 *
 * DESIGN.md wants one italic word per heading, but frontmatter holds plain
 * text. This keeps the brand signature available to editors
 * without opening the title up to arbitrary markup — the `<em>` picks up
 * the red heading-accent rule from globals.css on its own.
 */
export default function EmphasisTitle({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)

  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** The same string with the markers stripped — for <title>, OG and JSON-LD. */
export function plainTitle(text: string): string {
  return text.replace(/\*([^*]+)\*/g, '$1')
}
