import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { StructuredData } from "@/components/StructuredData"
import { AdBanner } from "@/components/AdBanner"

export const metadata: Metadata = {
  title: "How to Edit PDF Online - Edit PDF Text Free",
  description: "Learn how to edit PDF text online for free. Step-by-step guide to edit PDF documents directly in your browser. No subscription, no software download required.",
  keywords: "how to edit pdf, edit pdf online, edit pdf text, free pdf editor, edit pdf text online",
  alternates: {
    canonical: "https://pdftoolkit.com/how-to-edit-pdf",
  },
  openGraph: {
    title: "How to Edit PDF Online - Edit PDF Text Free",
    description: "Step-by-step guide to edit PDF text online for free. No subscription or software required.",
    url: "https://pdftoolkit.com/how-to-edit-pdf",
  },
}

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Edit PDF Online",
  "description": "Step-by-step guide to edit PDF text online using our free PDF editor.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Open the PDF editor",
      "text": "Go to our free PDF editor and upload your PDF file."
    },
    {
      "@type": "HowToStep",
      "name": "Click and edit text",
      "text": "Click on any text in the PDF preview to select and edit it. Type your changes directly."
    },
    {
      "@type": "HowToStep",
      "name": "Save your edited PDF",
      "text": "Click Download to save your edited PDF. All changes are applied locally in your browser."
    }
  ]
}

export default function HowToEditPDFPage() {
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
          <h1>How to Edit PDF Online (Free)</h1>
          <p>
            Need to fix a typo, update a date, or change text in a PDF? Our free PDF editor
            lets you edit text directly in your browser. No Acrobat subscription, no software
            installation—just upload and click to edit.
          </p>

          <h2>Step 1: Open the Free PDF Editor</h2>
          <p>
            Go to our <Link href="/tools/edit-text">Edit PDF Text tool</Link>. Upload your PDF
            file. The tool renders your document so you can see exactly what you&apos;re editing.
            Everything processes in your browser; your file never gets uploaded to a server.
          </p>

          <h2>Step 2: Click to Edit Text</h2>
          <p>
            Click on any text block in the PDF preview. A text box will appear—edit the content
            as needed. You can fix typos, update names, change dates, or replace entire paragraphs.
            The layout adjusts automatically to fit your changes.
          </p>

          <h2>Step 3: Download Your Edited PDF</h2>
          <p>
            When you&apos;re done editing, click &quot;Download PDF&quot; to save your changes.
            Your edited document is generated locally and ready to share or print.
          </p>

          <h2>Why Use Our Free PDF Editor?</h2>
          <ul>
            <li><strong>No Subscription</strong> - Unlike Adobe Acrobat, we&apos;re 100% free</li>
            <li><strong>No Download</strong> - Works entirely in your browser</li>
            <li><strong>Privacy</strong> - Your PDFs never leave your device</li>
            <li><strong>Simple</strong> - Just click and type to edit</li>
          </ul>

          <div className="not-prose mt-8 p-6 bg-primary/10 rounded-lg">
            <Link
              href="/tools/edit-text"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Edit PDF Now - Free
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
