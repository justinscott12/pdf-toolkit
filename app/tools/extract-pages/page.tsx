import { Metadata } from "next"
import { ExtractPagesClient } from "./client"

export const metadata: Metadata = {
  title: "Extract PDF Pages - Extract Specific Pages from PDF",
  description: "Extract specific pages from your PDF document. Select individual pages or page ranges to create a new PDF with only the pages you need.",
  keywords: "extract pdf pages, pdf page extractor, split pdf pages, extract pages from pdf",
}

export default function ExtractPagesPage() {
  return <ExtractPagesClient />
}
