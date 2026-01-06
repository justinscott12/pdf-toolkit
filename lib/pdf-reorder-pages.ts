import { PDFDocument } from "pdf-lib"

export interface ReorderPagesOptions {
  pageOrder: number[] // New page order (1-indexed, e.g., [3, 1, 2] means page 3 first, then 1, then 2)
}

export async function reorderPages(file: File, options: ReorderPagesOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const totalPages = pdf.getPageCount()
  
  // Validate page order
  const pageOrder = options.pageOrder
    .filter((pageNum) => pageNum >= 1 && pageNum <= totalPages)
  
  if (pageOrder.length === 0) {
    throw new Error("Invalid page order")
  }

  // Create new PDF with reordered pages
  const newPdf = await PDFDocument.create()
  
  // Copy pages in the new order
  for (const pageNum of pageOrder) {
    const [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1])
    newPdf.addPage(copiedPage)
  }

  const pdfBytes = await newPdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

