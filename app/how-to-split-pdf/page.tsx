import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { StructuredData } from "@/components/StructuredData"
import { AdBanner } from "@/components/AdBanner"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "How to Split PDF - Extract Pages or Split by Ranges",
  description: "Learn how to split PDF files online. Step-by-step guide to extract specific pages or split PDFs by page ranges. Free, no sign-up required.",
  keywords: "how to split pdf, extract pdf pages, split pdf online, split pdf by pages, extract pages from pdf",
  alternates: {
    canonical: `${BASE_URL}/how-to-split-pdf`,
  },
  openGraph: {
    title: "How to Split PDF - Extract Pages or Split by Ranges",
    description: "Step-by-step guide to split PDF files and extract specific pages. Free online tool, no sign-up required.",
    url: `${BASE_URL}/how-to-split-pdf`,
  },
}

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Split PDF Files",
  "description": "Step-by-step guide to split PDF files and extract specific pages using our free online tool.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Open the split tool",
      "text": "Go to our free PDF splitter and upload your PDF file."
    },
    {
      "@type": "HowToStep",
      "name": "Select pages to extract",
      "text": "Choose individual pages or enter page ranges (e.g., 1-5, 10, 15-20) to split."
    },
    {
      "@type": "HowToStep",
      "name": "Download split PDFs",
      "text": "Click Split PDF to create your new documents. Download each split PDF separately."
    }
  ]
}

export default function HowToSplitPDFPage() {
  return (
    <>
      <StructuredData data={howToStructuredData} />
      <div className="min-h-screen">
        <div className="border-b bg-muted/30 py-4">
          <div className="max-w-3xl mx-auto px-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
              <Image src="/logo.png" alt="" width={28} height={28} className="rounded-md" />
              PDF Toolkit
            </Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <AdBanner adFormat="horizontal" className="w-full" style={{ minHeight: "90px" }} />
        </div>
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg dark:prose-invert">
          <h1>How to Split PDF Files (Free)</h1>
          <p>
            Need to extract specific pages from a PDF or split a large document into smaller
            files? Our free PDF splitter handles both. No sign-up, no software—just upload,
            select pages, and download.
          </p>

          <h2>Step 1: Open the Split PDF Tool</h2>
          <p>
            Navigate to our <Link href="/tools/split">Split PDF tool</Link>. Upload your PDF
            file—processing happens entirely in your browser, so your document never leaves
            your device.
          </p>

          <h2>Step 2: Choose How to Split</h2>
          <p>
            You have two options: <strong>Extract specific pages</strong> (e.g., pages 1, 3, 5)
            or <strong>Split by ranges</strong> (e.g., 1-10, 11-20). Enter page numbers or
            ranges in the format shown. You can create multiple output PDFs in one go.
          </p>

          <h2>Step 3: Split and Download</h2>
          <p>
            Click &quot;Split PDF&quot; to generate your new documents. Each split section
            becomes a separate PDF you can download. Perfect for separating chapters, forms,
            or specific sections from a larger document.
          </p>

          <h2>Common Use Cases</h2>
          <ul>
            <li>Extract a single page to share</li>
            <li>Separate scanned documents that were combined</li>
            <li>Split a long report into chapters</li>
            <li>Remove and save specific pages before merging</li>
          </ul>

          <div className="not-prose mt-8 p-6 bg-primary/10 rounded-lg">
            <Link
              href="/tools/split"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Split PDF Now - Free
            </Link>
          </div>

          <p className="mt-12">
            <Link href="/" className="text-primary hover:underline">
              ← Back to PDF Toolkit
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
