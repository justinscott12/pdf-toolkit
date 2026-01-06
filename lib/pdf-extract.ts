import { PDFDocument } from "pdf-lib"

export interface ExtractOptions {
  pages: number[] // Page numbers (1-indexed)
}

export async function extractPages(file: File, options: ExtractOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const totalPages = pdf.getPageCount()
  
  const newPdf = await PDFDocument.create()
  const validPages = options.pages.filter(
    (pageNum) => pageNum >= 1 && pageNum <= totalPages
  )

  if (validPages.length === 0) {
    throw new Error("No valid pages to extract")
  }

  // Convert to 0-indexed and sort
  const pageIndices = validPages
    .map((p) => p - 1)
    .sort((a, b) => a - b)

  const copiedPages = await newPdf.copyPages(pdf, pageIndices)
  copiedPages.forEach((page) => {
    newPdf.addPage(page)
  })

  const pdfBytes = await newPdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

