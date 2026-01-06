import { PDFDocument, PDFPage, rgb, StandardFonts } from "pdf-lib"
import * as pdfjsLib from "pdfjs-dist"

// Dynamic import to avoid SSR issues
let pdfjsLibLoaded: typeof import("pdfjs-dist") | null = null

async function getPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("pdf-edit-text can only be used in the browser")
  }
  
  if (!pdfjsLibLoaded) {
    pdfjsLibLoaded = await import("pdfjs-dist")
    // Use local worker file for better reliability
    pdfjsLibLoaded.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
  }
  
  return pdfjsLibLoaded
}

export interface TextItem {
  id: string
  page: number
  text: string
  x: number
  y: number
  width: number
  height: number
  fontSize?: number
  fontName?: string
}

export interface ExtractedText {
  items: TextItem[]
  pages: number
}

/**
 * Extract all text from a PDF with position information
 */
export async function extractPDFText(file: File): Promise<ExtractedText> {
  const pdfjs = await getPdfJs()
  const arrayBuffer = await file.arrayBuffer()
  const loadingTask = pdfjs.getDocument({ 
    data: arrayBuffer,
    verbosity: 0, // Reduce console output
  })
  const pdf = await loadingTask.promise
  
  const items: TextItem[] = []
  const pages = pdf.numPages

  for (let pageNum = 1; pageNum <= pages; pageNum++) {
    try {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const viewport = page.getViewport({ scale: 1 })

      // Handle different text content structures
      const textItems = textContent.items || []
      let itemIndex = 0

      for (const item of textItems) {
        // Extract text from various possible structures
        let text = ""
        const itemAny = item as any
        
        if (typeof item === "string") {
          text = item
        } else if (itemAny.str !== undefined) {
          text = String(itemAny.str || "")
        } else if (itemAny.text !== undefined) {
          text = String(itemAny.text || "")
        } else if (itemAny.hasEOL) {
          // Handle end-of-line markers
          continue
        }

        // Skip empty or whitespace-only items
        if (!text || !text.trim()) {
          continue
        }

        // Calculate position from transform matrix
        const transform = itemAny.transform || [1, 0, 0, 1, 0, 0]
        const x = transform[4] || 0
        const y = viewport.height - (transform[5] || 0) // Flip Y coordinate
        
        // Estimate dimensions from font size
        const fontSize = itemAny.height || itemAny.fontSize || itemAny.size || 12
        const itemWidth = itemAny.width || (text.length * fontSize * 0.6)
        const itemHeight = fontSize

        items.push({
          id: `page-${pageNum}-item-${itemIndex}`,
          page: pageNum,
          text: text.trim(),
          x,
          y,
          width: itemWidth,
          height: itemHeight,
          fontSize: fontSize,
          fontName: itemAny.fontName || undefined,
        })
        
        itemIndex++
      }

      // If no items found with getTextContent, try alternative method
      if (items.length === 0 && pageNum === 1) {
        // Try getting text as a string and parsing it
        try {
          const textContentStr = await page.getTextContent()
          const fullText = textContentStr.items
            .map((item: any) => item.str || item.text || "")
            .filter((text: string) => text.trim())
            .join(" ")
          
          if (fullText.trim()) {
            // If we got text but no items, create a single item
            items.push({
              id: `page-${pageNum}-item-0`,
              page: pageNum,
              text: fullText,
              x: 0,
              y: viewport.height / 2,
              width: fullText.length * 12 * 0.6,
              height: 12,
              fontSize: 12,
            })
          }
        } catch (altError) {
          console.warn("Alternative text extraction failed:", altError)
        }
      }
    } catch (pageError) {
      console.error(`Error extracting text from page ${pageNum}:`, pageError)
      // Continue with other pages
    }
  }

  if (items.length === 0) {
    throw new Error("No text content could be extracted from this PDF. The PDF may use a format that is not fully supported.")
  }

  return { items, pages }
}

/**
 * Replace text in a PDF
 */
export async function replacePDFText(
  file: File,
  replacements: Array<{ id: string; newText: string }>
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const pages = pdf.getPages()
  
  // Group replacements by page
  const replacementsByPage: Record<number, Array<{ id: string; newText: string }>> = {}
  replacements.forEach((replacement) => {
    const pageNum = parseInt(replacement.id.split("-")[1])
    if (!replacementsByPage[pageNum]) {
      replacementsByPage[pageNum] = []
    }
    replacementsByPage[pageNum].push(replacement)
  })

  // Extract text positions using PDF.js
  const pdfjs = await getPdfJs()
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
  const pdfDoc = await loadingTask.promise
  
  const font = await pdf.embedFont(StandardFonts.Helvetica)

  // Process each page
  for (let pageNum = 1; pageNum <= pages.length; pageNum++) {
    const page = pages[pageNum - 1]
    const pageReplacements = replacementsByPage[pageNum] || []
    
    if (pageReplacements.length === 0) continue

    // Get text positions from PDF.js
    const pdfjsPage = await pdfDoc.getPage(pageNum)
    const textContent = await pdfjsPage.getTextContent()
    const viewport = pdfjsPage.getViewport({ scale: 1 })
    
    // Find items to replace
    let itemIndex = 0
    textContent.items.forEach((item: any) => {
      if (item.str && item.str.trim()) {
        const replacement = pageReplacements.find(
          (r) => r.id === `page-${pageNum}-item-${itemIndex}`
        )
        
        if (replacement) {
          // Calculate position
          const transform = item.transform || [1, 0, 0, 1, 0, 0]
          const x = transform[4]
          const y = viewport.height - transform[5]
          
          // Draw white rectangle to cover old text
          const fontSize = item.height || item.fontSize || 12
          const width = item.width || (item.str.length * fontSize * 0.6)
          const height = fontSize
          
          page.drawRectangle({
            x,
            y: y - height,
            width: width + 2,
            height: height + 2,
            color: rgb(1, 1, 1),
          })
          
          // Draw new text
          page.drawText(replacement.newText, {
            x,
            y: y - height,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          })
        }
        itemIndex++
      }
    })
  }

  const pdfBytes = await pdf.save()
  return new Blob([pdfBytes as any], { type: "application/pdf" })
}

