import { Metadata } from "next"
import { PDFToImagesClient } from "./client"

export const metadata: Metadata = {
  title: "PDF to Images - Convert PDF Pages to PNG or JPG",
  description: "Convert PDF pages to high-quality images (PNG or JPG format). Free online PDF to image converter. No sign-up required.",
  keywords: "pdf to jpg, pdf to png, pdf to images, convert pdf to image, pdf image converter",
}

export default function PDFToImagesPage() {
  return <PDFToImagesClient />
}
