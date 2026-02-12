import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { StructuredData } from "@/components/StructuredData"
import { AdBanner } from "@/components/AdBanner"

export const metadata: Metadata = {
  title: "How to Compress PDF - Reduce PDF File Size Online",
  description: "Learn how to compress PDF files and reduce file size. Free step-by-step guide to shrink PDF documents while maintaining quality. No sign-up required.",
  keywords: "how to compress pdf, reduce pdf size, compress pdf online, shrink pdf, reduce pdf file size",
  alternates: {
    canonical: "https://pdftoolkit.com/how-to-compress-pdf",
  },
  openGraph: {
    title: "How to Compress PDF - Reduce PDF File Size Online",
    description: "Step-by-step guide to compress PDF files and reduce file size for free. Maintain quality while shrinking your PDF.",
    url: "https://pdftoolkit.com/how-to-compress-pdf",
  },
}

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Compress PDF Files",
  "description": "Step-by-step guide to compress PDF files and reduce file size using our free online tool.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Open the compress tool",
      "text": "Go to our free PDF compressor and upload your PDF file."
    },
    {
      "@type": "HowToStep",
      "name": "Choose compression level",
      "text": "Select your desired compression level. Higher compression reduces file size more but may slightly affect quality."
    },
    {
      "@type": "HowToStep",
      "name": "Download compressed PDF",
      "text": "Click Compress and download your reduced PDF. All processing happens in your browser."
    }
  ]
}

export default function HowToCompressPDFPage() {
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
          <h1>How to Compress PDF Files (Free)</h1>
          <p>
            Large PDF files can be difficult to email or upload. Our free PDF compressor reduces
            file size while maintaining readable quality. No sign-up, no server uploads—everything
            processes in your browser.
          </p>

          <h2>Step 1: Open the Compress PDF Tool</h2>
          <p>
            Go to our <Link href="/tools/compress">Compress PDF tool</Link>. The tool loads instantly
            with no registration. Your PDF never leaves your device.
          </p>

          <h2>Step 2: Upload Your PDF</h2>
          <p>
            Click to select your PDF file or drag and drop it onto the page. The tool will
            analyze your document and show you the current file size.
          </p>

          <h2>Step 3: Compress and Download</h2>
          <p>
            Click &quot;Compress PDF&quot; to reduce the file size. You can often achieve 30-50%
            reduction with minimal quality loss for text documents. Download your compressed
            PDF when ready.
          </p>

          <h2>When to Compress a PDF</h2>
          <ul>
            <li>Email attachments exceed size limits</li>
            <li>Uploading to forms or job applications</li>
            <li>Reducing storage space</li>
            <li>Speeding up web page loads for embedded PDFs</li>
          </ul>

          <div className="not-prose mt-8 p-6 bg-primary/10 rounded-lg">
            <Link
              href="/tools/compress"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Compress PDF Now - Free
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
