import { RichText } from '@payloadcms/richtext-lexical/react'

type RichTextData = React.ComponentProps<typeof RichText>['data']

/**
 * Lexical → JSX. `disableContainer` drops Payload's own wrapper so the
 * spacing rules in underlag-prose.css apply directly to the blocks.
 */
export default function ArticleProse({ content }: { content: unknown }) {
  if (!content) return null

  return (
    <div className="underlag-prose">
      <RichText data={content as RichTextData} disableContainer />
    </div>
  )
}
