import { PDFDocument } from "pdf-lib"

export async function flattenPDF(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  
  // Flatten by copying all pages to a new document
  // This removes form fields and annotations, making the PDF non-editable
  const flattenedPdf = await PDFDocument.create()
  const pages = await flattenedPdf.copyPages(pdf, pdf.getPageIndices())
  
  pages.forEach((page) => {
    flattenedPdf.addPage(page)
  })

  // Copy metadata
  const title = pdf.getTitle()
  const author = pdf.getAuthor()
  const subject = pdf.getSubject()
  const creator = pdf.getCreator()
  const producer = pdf.getProducer()
  
  if (title) flattenedPdf.setTitle(title)
  if (author) flattenedPdf.setAuthor(author)
  if (subject) flattenedPdf.setSubject(subject)
  if (creator) flattenedPdf.setCreator(creator)
  if (producer) flattenedPdf.setProducer(producer)

  const pdfBytes = await flattenedPdf.save({
    useObjectStreams: false,
  })

  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

