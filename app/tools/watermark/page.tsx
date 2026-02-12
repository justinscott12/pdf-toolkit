import { Metadata } from "next"
import { WatermarkClient } from "./client"
import { StructuredData } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Add Watermark to PDF - Text Watermark Tool | Free Online",
  description: "Add text watermark to all pages of your PDF document. Free online PDF watermark tool. No sign-up required. All processing in your browser.",
  keywords: "pdf watermark, add watermark to pdf, pdf watermark tool, watermark pdf online, text watermark pdf",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/watermark",
  },
  openGraph: {
    title: "Add Watermark to PDF - Text Watermark Tool",
    description: "Free online tool to add text watermarks to all pages of your PDF document. No sign-up required.",
    url: "https://pdftoolkit.com/tools/watermark",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Add Watermark to PDF",
  "description": "Free online tool to add text watermarks to all pages of your PDF document",
  "url": "https://pdftoolkit.com/tools/watermark",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function WatermarkPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <WatermarkClient />
    </>
  )
}
