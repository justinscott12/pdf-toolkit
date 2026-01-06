import { Metadata } from "next"
import { ReorderPagesClient } from "./client"

export const metadata: Metadata = {
  title: "Reorder PDF Pages - Rearrange PDF Pages Online | Free Tool",
  description: "Reorder and rearrange pages in your PDF document. Free online tool to change page order in PDF. No sign-up required.",
  keywords: "reorder pdf pages, rearrange pdf pages, change pdf page order, reorder pages in pdf",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/reorder-pages",
  },
}

export default function ReorderPagesPage() {
  return <ReorderPagesClient />
}

