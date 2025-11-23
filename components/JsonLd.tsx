/**
 * JSON-LD Structured Data Component
 *
 * Usage:
 * <JsonLd data={organizationSchema} />
 *
 * This component renders structured data for Google's rich snippets.
 * See: https://schema.org/ for schema types
 */

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2)
      }}
    />
  )
}
