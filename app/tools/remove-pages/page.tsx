import { Metadata } from "next"
import { RemovePagesClient } from "./client"

export const metadata: Metadata = {
  title: "Remove Pages from PDF - Delete PDF Pages Online | Free Tool",
  description: "Remove specific pages from your PDF document. Free online tool to delete pages from PDF. No sign-up required.",
  keywords: "remove pdf pages, delete pdf pages, remove pages from pdf, delete pages from pdf online",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/remove-pages",
  },
}

export default function RemovePagesPage() {
  return <RemovePagesClient />
}

