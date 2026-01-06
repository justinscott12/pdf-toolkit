import { PDFDocument } from "pdf-lib"

export interface SplitOptions {
  splitBy: "pages" | "ranges"
  pages?: number[]
  ranges?: Array<{ start: number; end: number }>
}

export async function splitPDF(file: File, options: SplitOptions): Promise<Blob[]> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const totalPages = pdf.getPageCount()
  const results: Blob[] = []

  if (options.splitBy === "pages") {
    // Split by individual pages
    if (options.pages) {
      for (const pageNum of options.pages) {
        if (pageNum >= 1 && pageNum <= totalPages) {
          const newPdf = await PDFDocument.create()
          const [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1])
          newPdf.addPage(copiedPage)
          const pdfBytes = await newPdf.save()
          results.push(new Blob([pdfBytes as any], { type: "application/pdf" }))
        }
      }
    }
  } else if (options.splitBy === "ranges") {
    // Split by page ranges
    if (options.ranges) {
      for (const range of options.ranges) {
        const newPdf = await PDFDocument.create()
        const pageIndices: number[] = []
        
        for (let i = range.start; i <= range.end && i <= totalPages; i++) {
          if (i >= 1) {
            pageIndices.push(i - 1)
          }
        }
        
        if (pageIndices.length > 0) {
          const copiedPages = await newPdf.copyPages(pdf, pageIndices)
          copiedPages.forEach((page) => newPdf.addPage(page))
          const pdfBytes = await newPdf.save()
          results.push(new Blob([pdfBytes as any], { type: "application/pdf" }))
        }
      }
    }
  }

  return results
}

