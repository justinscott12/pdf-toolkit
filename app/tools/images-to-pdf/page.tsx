import { Metadata } from "next"
import { ImagesToPDFClient } from "./client"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Images to PDF - Convert JPG, PNG to PDF | Free Online Tool",
  description: "Combine multiple images (JPG, PNG) into a single PDF document. Free online image to PDF converter. No sign-up required. All processing in your browser.",
  keywords: "jpg to pdf, png to pdf, images to pdf, convert images to pdf, image pdf converter, images to pdf online",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/images-to-pdf",
  },
  openGraph: {
    title: "Images to PDF - Convert JPG, PNG to PDF",
    description: "Free online tool to combine multiple images into a single PDF document. No sign-up required.",
    url: "https://pdftoolkit.com/tools/images-to-pdf",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Images to PDF",
  "description": "Free online tool to combine multiple images into a single PDF document",
  "url": "https://pdftoolkit.com/tools/images-to-pdf",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function ImagesToPDFPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <ImagesToPDFClient />
    </>
  )
}
