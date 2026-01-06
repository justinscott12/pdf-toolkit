import { PDFDocument, rgb, StandardFonts, degrees, PDFImage } from "pdf-lib"

export type WatermarkPosition = 
  | "top-left" 
  | "top-right" 
  | "bottom-left" 
  | "bottom-right" 
  | "center" 
  | "diagonal"

export type WatermarkType = "text" | "image"

export interface WatermarkOptions {
  type?: WatermarkType
  text?: string
  image?: File | Uint8Array
  fontSize?: number
  textScale?: number // Scale factor for text (0.1-2.0, default: 1.0)
  opacity?: number
  angle?: number
  color?: { r: number; g: number; b: number }
  position?: WatermarkPosition
  imageScale?: number // Scale factor for image (0-1, default: 0.3)
}

export async function addWatermark(
  file: File,
  options: WatermarkOptions = {}
): Promise<Blob> {
  const {
    type = "text",
    text = "WATERMARK",
    image,
    fontSize = 50,
    textScale = 1.0,
    opacity = 0.3,
    angle = -45,
    color = { r: 0, g: 0, b: 0 },
    position = "diagonal",
    imageScale = 0.3,
  } = options

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const pages = pdf.getPages()

  let embeddedImage: PDFImage | null = null
  let font = null

  // Prepare watermark resource based on type
  if (type === "image" && image) {
    try {
      let imageBytes: Uint8Array
      if (image instanceof File) {
        const imageArrayBuffer = await image.arrayBuffer()
        imageBytes = new Uint8Array(imageArrayBuffer)
      } else {
        imageBytes = image
      }
      
      // Try to embed as PNG first, then JPG
      try {
        embeddedImage = await pdf.embedPng(imageBytes)
      } catch {
        embeddedImage = await pdf.embedJpg(imageBytes)
      }
    } catch (error) {
      throw new Error("Failed to load image. Please use PNG or JPG format.")
    }
  } else {
    font = await pdf.embedFont(StandardFonts.HelveticaBold)
  }

  pages.forEach((page) => {
    const { width, height } = page.getSize()

    if (type === "image" && embeddedImage) {
      // Image watermark
      const imageDims = embeddedImage.scale(imageScale)
      let x = 0
      let y = 0

      // Calculate position for image
      switch (position) {
        case "top-left":
          x = 50
          y = height - imageDims.height - 50
          break
        case "top-right":
          x = width - imageDims.width - 50
          y = height - imageDims.height - 50
          break
        case "bottom-left":
          x = 50
          y = 50
          break
        case "bottom-right":
          x = width - imageDims.width - 50
          y = 50
          break
        case "center":
          x = (width - imageDims.width) / 2
          y = (height - imageDims.height) / 2
          break
        case "diagonal":
        default:
          // Diagonal position (centered with rotation)
          x = width / 2 - imageDims.width / 2
          y = height / 2 - imageDims.height / 2
          break
      }

      page.drawImage(embeddedImage, {
        x,
        y,
        width: imageDims.width,
        height: imageDims.height,
        opacity: opacity,
        rotate: degrees(angle),
      })
    } else if (type === "text" && font && text) {
      // Text watermark
      const scaledFontSize = fontSize * textScale
      const textWidth = font.widthOfTextAtSize(text, scaledFontSize)
      const textHeight = scaledFontSize

      let x = 0
      let y = 0

      // Calculate position based on selected option
      switch (position) {
        case "top-left":
          x = 50
          y = height - textHeight - 50
          break
        case "top-right":
          x = width - textWidth - 50
          y = height - textHeight - 50
          break
        case "bottom-left":
          x = 50
          y = 50
          break
        case "bottom-right":
          x = width - textWidth - 50
          y = 50
          break
        case "center":
          x = (width - textWidth) / 2
          y = (height - textHeight) / 2
          break
        case "diagonal":
        default:
          // Diagonal position (centered with rotation)
          x = width / 2 - textWidth / 2
          y = height / 2 - textHeight / 2
          break
      }

      page.drawText(text, {
        x,
        y,
        size: scaledFontSize,
        font: font,
        color: rgb(color.r, color.g, color.b),
        opacity: opacity,
        rotate: degrees(angle),
      })
    }
  })

  const pdfBytes = await pdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

