import { PDFDocument, degrees } from "pdf-lib"

export type RotationAngle = 90 | 180 | 270

export interface RotateOptions {
  angle: RotationAngle
  pages?: number[] // If not provided, rotate all pages
}

export async function rotatePDF(file: File, options: RotateOptions): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const totalPages = pdf.getPageCount()
  
  const pagesToRotate = options.pages || Array.from({ length: totalPages }, (_, i) => i + 1)

  pagesToRotate.forEach((pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      const page = pdf.getPage(pageNum - 1)
      // Get current rotation
      const currentRotation = page.getRotation()
      // Extract current angle - handle both object and number types
      let currentAngle = 0
      if (currentRotation) {
        // Rotation is an object with angle property, or might be a number
        if (typeof currentRotation === 'object' && 'angle' in currentRotation) {
          currentAngle = Number((currentRotation as any).angle) || 0
        } else if (typeof currentRotation === 'number') {
          currentAngle = currentRotation
        }
      }
      // Calculate new angle by adding rotation (normalize to 0-360 range)
      const newAngle = (currentAngle + options.angle) % 360
      // Ensure angle is one of valid PDF rotation values (0, 90, 180, 270)
      const normalizedAngle = Math.round(newAngle / 90) * 90 % 360
      // Set rotation using degrees helper
      page.setRotation(degrees(normalizedAngle))
    }
  })

  const pdfBytes = await pdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

