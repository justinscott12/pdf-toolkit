import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { StructuredData } from "@/components/StructuredData"
import { AdBanner } from "@/components/AdBanner"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "How to Merge PDF Files - Combine Multiple PDFs Into One",
  description: "Learn how to merge PDF files online for free. Step-by-step guide to combine multiple PDF documents into one. No sign-up, no software download required.",
  keywords: "how to merge pdf, combine pdf files, merge pdf online, combine multiple pdfs, merge pdf documents",
  alternates: {
    canonical: `${BASE_URL}/how-to-merge-pdf`,
  },
  openGraph: {
    title: "How to Merge PDF Files - Combine Multiple PDFs Into One",
    description: "Step-by-step guide to merge PDF files online for free. Combine multiple PDFs into one document.",
    url: `${BASE_URL}/how-to-merge-pdf`,
  },
}

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Merge PDF Files",
  "description": "Step-by-step guide to merge multiple PDF files into one document using our free online tool.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Open the merge tool",
      "text": "Go to our free PDF merge tool and click to add your PDF files or drag and drop them."
    },
    {
      "@type": "HowToStep",
      "name": "Add your PDF files",
      "text": "Upload all the PDF files you want to combine. You can reorder them by dragging."
    },
    {
      "@type": "HowToStep",
      "name": "Merge and download",
      "text": "Click Merge PDF to combine all files. Your merged PDF will be ready to download instantly."
    }
  ]
}

export default function HowToMergePDFPage() {
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
          <h1>How to Merge PDF Files Online (Free)</h1>
          <p>
            Need to combine multiple PDF documents into one? Our free online PDF merger makes it easy.
            No sign-up, no software download, and all processing happens in your browser for maximum privacy.
          </p>

          <h2>Step 1: Open the Merge PDF Tool</h2>
          <p>
            Navigate to our <Link href="/tools/merge">Merge PDF tool</Link>. The tool loads instantly
            with no registration required. Your files never leave your device—everything processes
            locally in your browser.
          </p>

          <h2>Step 2: Add Your PDF Files</h2>
          <p>
            Click &quot;Add PDF files&quot; or drag and drop your PDF documents onto the page.
            You can add as many files as you need. Use the drag handles to reorder them if
            the sequence matters for your final document.
          </p>

          <h2>Step 3: Merge and Download</h2>
          <p>
            Click &quot;Merge PDF&quot; and your combined document will be ready in seconds.
            Download the merged PDF to your device. That&apos;s it—no watermarks, no file size
            limits for normal use, and completely free.
          </p>

          <h2>Why Use Our Free PDF Merger?</h2>
          <ul>
            <li><strong>100% Free</strong> - No subscriptions, no hidden fees</li>
            <li><strong>Privacy First</strong> - Files stay in your browser, never uploaded to servers</li>
            <li><strong>No Sign-Up</strong> - Start merging immediately</li>
            <li><strong>Works on Any Device</strong> - Desktop, tablet, or mobile</li>
          </ul>

          <div className="not-prose mt-8 p-6 bg-primary/10 rounded-lg">
            <Link
              href="/tools/merge"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Merge PDF Files Now - Free
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
