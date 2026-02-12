import { Metadata } from "next"
import { RemovePagesClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Remove Pages from PDF - Delete PDF Pages Online | Free Tool",
  description: "Remove specific pages from your PDF document. Free online tool to delete pages from PDF. No sign-up required. All processing in your browser.",
  keywords: "remove pdf pages, delete pdf pages, remove pages from pdf, delete pages from pdf online",
  alternates: {
    canonical: `${BASE_URL}/tools/remove-pages`,
  },
  openGraph: {
    title: "Remove Pages from PDF - Delete PDF Pages Online",
    description: "Free online tool to remove specific pages from your PDF document. No sign-up required.",
    url: `${BASE_URL}/tools/remove-pages`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Remove Pages from PDF",
  "description": "Free online tool to remove specific pages from your PDF document",
  "url": `${BASE_URL}/tools/remove-pages`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function RemovePagesPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <RemovePagesClient />
    </>
  )
}
