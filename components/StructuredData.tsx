interface StructuredDataProps {
  data: object
  id?: string
}

/**
 * Server-rendered JSON-LD structured data for SEO.
 * Renders script tag directly so search engines index it.
 */
export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id={id ?? "structured-data"}
    />
  )
}

