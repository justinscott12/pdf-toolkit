import { PDFDocument } from "pdf-lib"

export interface CompressOptions {
  quality?: "low" | "medium" | "high"
}

export async function compressPDF(file: File, options: CompressOptions = {}): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  
  // pdf-lib doesn't have built-in compression, but we can optimize by:
  // 1. Removing unnecessary metadata
  // 2. Flattening forms and annotations
  // 3. Using lower quality settings for embedded images
  
  const pdf = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: false,
    updateMetadata: false,
  })

  // Create a new PDF with optimized settings
  const compressedPdf = await PDFDocument.create()
  const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices())
  
  pages.forEach((page) => {
    compressedPdf.addPage(page)
  })

  // Set minimal metadata
  compressedPdf.setTitle("Compressed PDF")
  compressedPdf.setProducer("PDF Toolkit")

  const pdfBytes = await compressedPdf.save({
    useObjectStreams: true, // Enable object streams for better compression
  })

  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

