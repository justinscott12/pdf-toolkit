import { Metadata } from "next"
import { ReorderPagesClient } from "./client"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Reorder PDF Pages - Rearrange PDF Pages Online | Free Tool",
  description: "Reorder and rearrange pages in your PDF document. Free online tool to change page order in PDF. No sign-up required. All processing in your browser.",
  keywords: "reorder pdf pages, rearrange pdf pages, change pdf page order, reorder pages in pdf, reorder pdf online",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/reorder-pages",
  },
  openGraph: {
    title: "Reorder PDF Pages - Rearrange PDF Pages Online",
    description: "Free online tool to reorder and rearrange pages in your PDF document. No sign-up required.",
    url: "https://pdftoolkit.com/tools/reorder-pages",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reorder PDF Pages",
  "description": "Free online tool to reorder and rearrange pages in your PDF document",
  "url": "https://pdftoolkit.com/tools/reorder-pages",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function ReorderPagesPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <ReorderPagesClient />
    </>
  )
}
