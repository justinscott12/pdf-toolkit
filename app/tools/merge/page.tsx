import { Metadata } from "next"
import { MergePDFClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Merge PDF Files - Combine Multiple PDFs into One | Free Online Tool",
  description: "Merge multiple PDF files into one document instantly. Free online PDF merger tool. No sign-up required. Combine PDFs securely in your browser. 100% free and private.",
  keywords: "merge pdf, combine pdf, pdf merger, merge pdf files, combine pdf files online, merge pdf free, pdf combiner, join pdf files",
  alternates: {
    canonical: `${BASE_URL}/tools/merge`,
  },
  openGraph: {
    title: "Merge PDF Files - Combine Multiple PDFs into One",
    description: "Free online tool to merge multiple PDF files into one document. No sign-up required.",
    url: `${BASE_URL}/tools/merge`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Merge PDF Files",
  "description": "Free online tool to merge multiple PDF files into one document",
  "url": `${BASE_URL}/tools/merge`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function MergePDFPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <MergePDFClient />
    </>
  )
}
