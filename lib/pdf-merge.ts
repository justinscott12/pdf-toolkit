import { PDFDocument } from "pdf-lib"

export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create()

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    
    pages.forEach((page) => {
      mergedPdf.addPage(page)
    })
  }

  const pdfBytes = await mergedPdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

