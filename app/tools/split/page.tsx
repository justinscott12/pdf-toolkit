import { Metadata } from "next"
import { SplitPDFClient } from "./client"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Split PDF File - Extract Pages or Split by Ranges | Free Online Tool",
  description: "Split PDF files by extracting specific pages or page ranges. Free online PDF splitter tool. No sign-up required. All processing in your browser.",
  keywords: "split pdf, pdf splitter, extract pdf pages, split pdf by pages, pdf page extractor, split pdf online",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/split",
  },
  openGraph: {
    title: "Split PDF File - Extract Pages or Split by Ranges",
    description: "Free online tool to split PDF files by extracting specific pages or page ranges. No sign-up required.",
    url: "https://pdftoolkit.com/tools/split",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Split PDF File",
  "description": "Free online tool to split PDF files by extracting specific pages or page ranges",
  "url": "https://pdftoolkit.com/tools/split",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function SplitPDFPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <SplitPDFClient />
    </>
  )
}
