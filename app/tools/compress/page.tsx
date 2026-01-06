import { Metadata } from "next"
import { CompressPDFClient } from "./client"

export const metadata: Metadata = {
  title: "Compress PDF File - Reduce PDF File Size",
  description: "Compress PDF files to reduce file size while maintaining quality. Free online PDF compressor. No sign-up required.",
  keywords: "compress pdf, pdf compressor, reduce pdf size, pdf file size reducer, shrink pdf",
}

export default function CompressPDFPage() {
  return <CompressPDFClient />
}
