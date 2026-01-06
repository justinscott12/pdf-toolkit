import { Metadata } from "next"
import { FlattenPDFClient } from "./client"

export const metadata: Metadata = {
  title: "Flatten PDF - Make PDF Forms Non-Editable | Free Tool",
  description: "Flatten PDF forms and make them non-editable. Free online tool to flatten PDF documents. No sign-up required.",
  keywords: "flatten pdf, flatten pdf forms, make pdf non-editable, flatten pdf online",
  alternates: {
    canonical: "https://pdftoolkit.com/tools/flatten-pdf",
  },
}

export default function FlattenPDFPage() {
  return <FlattenPDFClient />
}

