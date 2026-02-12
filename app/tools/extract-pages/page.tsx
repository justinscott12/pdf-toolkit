import { Metadata } from "next"
import { ExtractPagesClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Extract PDF Pages - Extract Specific Pages from PDF | Free Online Tool",
  description: "Extract specific pages from your PDF document. Select individual pages or page ranges to create a new PDF with only the pages you need. No sign-up required.",
  keywords: "extract pdf pages, pdf page extractor, split pdf pages, extract pages from pdf, extract pdf online",
  alternates: {
    canonical: `${BASE_URL}/tools/extract-pages`,
  },
  openGraph: {
    title: "Extract PDF Pages - Extract Specific Pages from PDF",
    description: "Free online tool to extract specific pages from your PDF document. No sign-up required.",
    url: `${BASE_URL}/tools/extract-pages`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Extract PDF Pages",
  "description": "Free online tool to extract specific pages from your PDF document",
  "url": `${BASE_URL}/tools/extract-pages`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function ExtractPagesPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <ExtractPagesClient />
    </>
  )
}
