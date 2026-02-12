import { StructuredData } from "./StructuredData";
import { BASE_URL } from "@/lib/site";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Renders BreadcrumbList JSON-LD for SEO. Pass path segments or full breadcrumb items.
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const list = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.href.startsWith("http") ? item.href : `${BASE_URL}${item.href}`,
    })),
  };
  return <StructuredData data={list} id="breadcrumb-schema" />;
}
