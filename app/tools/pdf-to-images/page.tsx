import { Metadata } from "next"
import { PDFToImagesClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "PDF to Images - Convert PDF Pages to PNG or JPG | Free Online Tool",
  description: "Convert PDF pages to high-quality images (PNG or JPG format). Free online PDF to image converter. No sign-up required. All processing in your browser.",
  keywords: "pdf to jpg, pdf to png, pdf to images, convert pdf to image, pdf image converter, pdf to image online",
  alternates: {
    canonical: `${BASE_URL}/tools/pdf-to-images`,
  },
  openGraph: {
    title: "PDF to Images - Convert PDF Pages to PNG or JPG",
    description: "Free online tool to convert PDF pages to PNG or JPG images. No sign-up required.",
    url: `${BASE_URL}/tools/pdf-to-images`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PDF to Images",
  "description": "Free online tool to convert PDF pages to PNG or JPG images",
  "url": `${BASE_URL}/tools/pdf-to-images`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function PDFToImagesPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <PDFToImagesClient />
    </>
  )
}
