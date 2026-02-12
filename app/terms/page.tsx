import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BASE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for PDF Toolkit. Read our acceptable use policy and disclaimers for using our free online PDF tools.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
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
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: February 2025
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using PDF Toolkit (&quot;the Service&quot;) on this website, you accept
          and agree to be bound by these Terms of Service. If you do not agree to these terms,
          please do not use our Service.
        </p>

        <h2>Description of Service</h2>
        <p>
          PDF Toolkit provides free online tools for working with PDF documents, including merging,
          splitting, compressing, rotating, and converting PDFs. All processing is performed in
          your web browser; we do not upload or store your files on our servers.
        </p>

        <h2>Acceptable Use</h2>
        <p>You agree to use the Service only for lawful purposes. You must not:</p>
        <ul>
          <li>Use the Service to process documents that infringe copyright, trademark, or other intellectual property rights</li>
          <li>Use the Service for any illegal or fraudulent purpose</li>
          <li>Attempt to reverse engineer, disrupt, or compromise the Service or its infrastructure</li>
          <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
          <li>Use the Service in any way that could harm, disable, or overburden our systems</li>
        </ul>

        <h2>Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
          EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE,
          OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, PDF TOOLKIT AND ITS OPERATORS SHALL NOT BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT
          NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING FROM YOUR
          USE OF THE SERVICE.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          PDF Toolkit is a general-purpose utility. It is not intended to provide legal, financial,
          or professional advice. You are responsible for ensuring that your use of the Service
          complies with applicable laws and the rights of third parties.
        </p>

        <h2>Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time without
          notice. We may also update these Terms of Service. Continued use of the Service after
          changes constitutes acceptance of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these Terms of Service, please contact us through our{" "}
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
