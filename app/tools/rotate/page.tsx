import { Metadata } from "next"
import { RotatePDFClient } from "./client"

export const metadata: Metadata = {
  title: "Rotate PDF Pages - Rotate PDF 90, 180, or 270 Degrees",
  description: "Rotate all pages in your PDF document by 90°, 180°, or 270°. Free online PDF rotator. No sign-up required.",
  keywords: "rotate pdf, pdf rotator, rotate pdf pages, pdf page rotation",
}

export default function RotatePDFPage() {
  return <RotatePDFClient />
}
