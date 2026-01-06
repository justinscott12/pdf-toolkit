import { Metadata } from "next"
import { ImagesToPDFClient } from "./client"

export const metadata: Metadata = {
  title: "Images to PDF - Convert JPG, PNG to PDF",
  description: "Combine multiple images (JPG, PNG) into a single PDF document. Free online image to PDF converter. No sign-up required.",
  keywords: "jpg to pdf, png to pdf, images to pdf, convert images to pdf, image pdf converter",
}

export default function ImagesToPDFPage() {
  return <ImagesToPDFClient />
}
