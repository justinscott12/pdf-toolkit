import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for PDF Toolkit. Learn how we handle your data. All PDF processing happens in your browser - your files never leave your device.",
  alternates: {
    canonical: "https://pdftoolkit.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-muted/30 py-4">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <Image src="/logo.png" alt="" width={28} height={28} className="rounded-md" />
            PDF Toolkit
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: February 2025
        </p>

        <h2>Overview</h2>
        <p>
          PDF Toolkit (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and disclose information when you use
          our free online PDF tools at pdftoolkit.com.
        </p>

        <h2>Your Data and PDF Processing</h2>
        <p>
          <strong>All PDF processing happens entirely in your browser.</strong> Your files are never
          uploaded to our servers. When you use our tools to merge, split, compress, or edit PDFs,
          the processing occurs locally on your device. We do not have access to, store, or transmit
          your documents.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>
            <strong>Usage Data:</strong> We may use analytics services (such as Google Analytics) to
            understand how visitors use our website. This includes information like pages visited,
            time spent on the site, and general geographic location. This data is aggregated and
            anonymized.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies and similar technologies for analytics and to
            improve your experience. Our advertising partners (such as Google AdSense) may also use
            cookies to serve relevant ads.
          </li>
        </ul>

        <h2>Advertising</h2>
        <p>
          We use Google AdSense to display advertisements on our website. Google may use cookies
          and other technologies to serve ads based on your prior visits to our website or other
          sites. You can opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google&apos;s Ad Settings
          </a>
          .
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices of these external sites. We encourage you to read their privacy policies.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to children under 13. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us through our{" "}
          <Link href="/">homepage</Link>.
        </p>

        <p className="mt-12">
          <Link href="/" className="text-primary hover:underline">
            ← Back to PDF Toolkit
          </Link>
        </p>
      </div>
    </div>
  )
}
