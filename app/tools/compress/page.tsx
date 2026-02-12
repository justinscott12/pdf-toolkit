import { Metadata } from "next"
import { CompressPDFClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Compress PDF File - Reduce PDF File Size | Free Online Tool",
  description: "Compress PDF files to reduce file size while maintaining quality. Free online PDF compressor. No sign-up required. All processing in your browser.",
  keywords: "compress pdf, pdf compressor, reduce pdf size, pdf file size reducer, shrink pdf, compress pdf online",
  alternates: {
    canonical: `${BASE_URL}/tools/compress`,
  },
  openGraph: {
    title: "Compress PDF File - Reduce PDF File Size",
    description: "Free online tool to compress PDF files and reduce file size while maintaining quality. No sign-up required.",
    url: `${BASE_URL}/tools/compress`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Compress PDF File",
  "description": "Free online tool to compress PDF files and reduce file size while maintaining quality",
  "url": `${BASE_URL}/tools/compress`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function CompressPDFPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <CompressPDFClient />
    </>
  )
}
