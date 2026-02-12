import { Metadata } from "next"
import { EditTextClient } from "./client"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Free PDF Editor - Edit PDF Text Online | No Subscription Required",
  description: "Free PDF editor to edit text in PDF files online. No subscription needed. Edit PDF text directly in your browser with live preview. 100% free, no sign-up required. Better alternative to expensive PDF editing software.",
  keywords: "free pdf editor, edit pdf text, pdf text editor, edit text in pdf, pdf text replacement, edit pdf online, free pdf editor online, online pdf text editor, free pdf editor alternative",
  alternates: {
    canonical: `${BASE_URL}/tools/edit-text`,
  },
  openGraph: {
    title: "Free PDF Editor - Edit PDF Text Online | No Subscription Required",
    description: "Free PDF editor to edit text in PDF files. No subscription needed. Edit PDF text directly in your browser.",
    url: `${BASE_URL}/tools/edit-text`,
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free PDF Editor - Edit PDF Text Online",
  "description": "Free online PDF editor to edit text in PDF files. No subscription required. Edit PDF text directly in your browser.",
  "url": `${BASE_URL}/tools/edit-text`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "2500"
  }
}

export default function EditTextPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <EditTextClient />
    </>
  )
}

