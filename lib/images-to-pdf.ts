import jsPDF from "jspdf"
import imageCompression from "browser-image-compression"

export interface ImagesToPDFOptions {
  orientation?: "portrait" | "landscape"
  format?: "a4" | "letter"
  margin?: number
  compressImages?: boolean
}

export async function imagesToPDF(
  files: File[],
  options: ImagesToPDFOptions = {}
): Promise<Blob> {
  const {
    orientation = "portrait",
    format = "a4",
    margin = 10,
    compressImages = true,
  } = options

  const pdf = new jsPDF({
    orientation,
    unit: "mm",
    format,
  })

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Compress image if needed
    let processedFile = file
    if (compressImages && file.type.startsWith("image/")) {
      try {
        processedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
      } catch (err) {
        console.warn("Image compression failed, using original:", err)
      }
    }

    const imgData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(processedFile)
    })

    // Add new page for each image (except the first)
    if (i > 0) {
      pdf.addPage()
    }

    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = img.width
        const imgHeight = img.height
        const ratio = Math.min(
          (pdfWidth - margin * 2) / imgWidth,
          (pdfHeight - margin * 2) / imgHeight
        )
        const width = imgWidth * ratio
        const height = imgHeight * ratio
        const x = (pdfWidth - width) / 2
        const y = (pdfHeight - height) / 2

        pdf.addImage(imgData, "JPEG", x, y, width, height)
        resolve()
      }
      img.onerror = reject
      img.src = imgData
    })
  }

  const pdfBlob = pdf.output("blob")
  return pdfBlob
}

