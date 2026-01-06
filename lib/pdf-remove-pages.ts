import { PDFDocument } from "pdf-lib"

export interface RemovePagesOptions {
  pages: number[] // Page numbers to remove (1-indexed)
}

export async function removePages(file: File, options: RemovePagesOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const totalPages = pdf.getPageCount()
  
  // Convert to 0-indexed and filter valid pages
  const pagesToRemove = options.pages
    .filter((pageNum) => pageNum >= 1 && pageNum <= totalPages)
    .map((p) => p - 1)
    .sort((a, b) => b - a) // Sort descending to remove from end first

  if (pagesToRemove.length === 0) {
    throw new Error("No valid pages to remove")
  }

  // Remove pages (in reverse order to maintain indices)
  pagesToRemove.forEach((pageIndex) => {
    pdf.removePage(pageIndex)
  })

  const pdfBytes = await pdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

