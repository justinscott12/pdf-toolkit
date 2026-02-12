import { Metadata } from "next"
import { RotatePDFClient } from "./client"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Rotate PDF Pages - Rotate PDF 90, 180, or 270 Degrees | Free Online Tool",
  description: "Rotate all pages in your PDF document by 90°, 180°, or 270°. Free online PDF rotator. No sign-up required. All processing in your browser.",
  keywords: "rotate pdf, pdf rotator, rotate pdf pages, pdf page rotation, rotate pdf online",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/rotate",
  },
  openGraph: {
    title: "Rotate PDF Pages - Rotate PDF 90, 180, or 270 Degrees",
    description: "Free online tool to rotate PDF pages by 90°, 180°, or 270°. No sign-up required.",
    url: "https://pdftoolkit.com/tools/rotate",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rotate PDF Pages",
  "description": "Free online tool to rotate PDF pages by 90°, 180°, or 270°",
  "url": "https://pdftoolkit.com/tools/rotate",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function RotatePDFPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <RotatePDFClient />
    </>
  )
}
