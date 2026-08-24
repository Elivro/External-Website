import { RichText } from '@payloadcms/richtext-lexical/react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type RichTextData = React.ComponentProps<typeof RichText>['data']

type TableNode = {
  children: unknown[]
  headerState?: number
  colSpan?: number
  rowSpan?: number
}

/**
 * Table converters, overriding Payload's defaults.
 *
 * The built-in table converter hardcodes `border: 1px solid #ccc` and
 * `padding: 8px` as inline styles on every cell. Inline styles beat the
 * stylesheet, so the v4 hairlines in underlag-prose.css would never apply and
 * every table would carry a cold grey grid that belongs to no palette here.
 * These converters emit the same structure with no inline styles, and let the
 * CSS own the appearance.
 *
 * The wrapper div is the horizontal scroll container: a wide table scrolls
 * inside its own box rather than making the page scroll sideways.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  table: ({ node, nodesToJSX }) => (
    <div className="underlag-table-scroll">
      <table>
        <tbody>{nodesToJSX({ nodes: (node as TableNode).children as never })}</tbody>
      </table>
    </div>
  ),

  tablerow: ({ node, nodesToJSX }) => (
    <tr>{nodesToJSX({ nodes: (node as TableNode).children as never })}</tr>
  ),

  tablecell: ({ node, nodesToJSX }) => {
    const cell = node as TableNode
    const Tag = cell.headerState && cell.headerState > 0 ? 'th' : 'td'
    return (
      <Tag
        colSpan={cell.colSpan && cell.colSpan > 1 ? cell.colSpan : undefined}
        rowSpan={cell.rowSpan && cell.rowSpan > 1 ? cell.rowSpan : undefined}
        scope={Tag === 'th' ? 'col' : undefined}
      >
        {nodesToJSX({ nodes: cell.children as never })}
      </Tag>
    )
  },
})

/**
 * Lexical → JSX. `disableContainer` drops Payload's own wrapper so the
 * spacing rules in underlag-prose.css apply directly to the blocks.
 */
export default function ArticleProse({ content }: { content: unknown }) {
  if (!content) return null

  return (
    <div className="underlag-prose">
      <RichText data={content as RichTextData} converters={converters} disableContainer />
    </div>
  )
}
