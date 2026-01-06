import { Metadata } from "next"
import { WatermarkClient } from "./client"

export const metadata: Metadata = {
  title: "Add Watermark to PDF - Text Watermark Tool",
  description: "Add text watermark to all pages of your PDF document. Free online PDF watermark tool. No sign-up required.",
  keywords: "pdf watermark, add watermark to pdf, pdf watermark tool, watermark pdf online",
}

export default function WatermarkPage() {
  return <WatermarkClient />
}
