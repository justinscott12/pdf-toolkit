import { Metadata } from "next"
import { SplitPDFClient } from "./client"

export const metadata: Metadata = {
  title: "Split PDF File - Extract Pages or Split by Ranges",
  description: "Split PDF files by extracting specific pages or page ranges. Free online PDF splitter tool. No sign-up required.",
  keywords: "split pdf, pdf splitter, extract pdf pages, split pdf by pages, pdf page extractor",
}

export default function SplitPDFPage() {
  return <SplitPDFClient />
}
