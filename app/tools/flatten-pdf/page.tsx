import { Metadata } from "next"
import { FlattenPDFClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Flatten PDF - Make PDF Forms Non-Editable | Free Online Tool",
  description: "Flatten PDF forms and make them non-editable. Free online tool to flatten PDF documents. No sign-up required. All processing in your browser.",
  keywords: "flatten pdf, flatten pdf forms, make pdf non-editable, flatten pdf online, pdf flatten",
  alternates: {
    canonical: `${BASE_URL}/tools/flatten-pdf`,
  },
  openGraph: {
    title: "Flatten PDF - Make PDF Forms Non-Editable",
    description: "Free online tool to flatten PDF forms and make them non-editable. No sign-up required.",
    url: `${BASE_URL}/tools/flatten-pdf`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Flatten PDF",
  "description": "Free online tool to flatten PDF forms and make them non-editable",
  "url": `${BASE_URL}/tools/flatten-pdf`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}

export default function FlattenPDFPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <FlattenPDFClient />
    </>
  )
}
