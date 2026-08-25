/**
 * Renders an article body.
 *
 * The HTML comes from `lib/kunskap.ts`, which runs repo-committed markdown
 * through remark/rehype at build time. It is never user input and never
 * reaches this component from a request — it is source code that went through
 * review like any other file — so injecting it as HTML carries no more risk
 * than the JSX around it. Should articles ever come from somewhere a reader
 * can write to, this is the line that has to change first.
 *
 * The scroll wrapper for tables is applied here rather than in markdown: a
 * wide table has to scroll inside its own box so the page never scrolls
 * sideways, and authors should not have to remember that.
 */
export default function ArticleProse({ html }: { html: string }) {
  if (!html) return null

  return (
    <div
      className="kunskap-prose"
      dangerouslySetInnerHTML={{ __html: wrapTables(html) }}
    />
  )
}

function wrapTables(html: string): string {
  return html.replace(
    /<table>([\s\S]*?)<\/table>/g,
    '<div class="kunskap-table-scroll"><table>$1</table></div>',
  )
}
