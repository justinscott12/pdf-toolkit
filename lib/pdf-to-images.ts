// Dynamic import to avoid SSR issues
let pdfjsLib: typeof import("pdfjs-dist") | null = null

async function getPdfJs() {
  if (typeof window === "undefined") {
    throw new Error("pdfToImages can only be used in the browser")
  }
  
  if (!pdfjsLib) {
    pdfjsLib = await import("pdfjs-dist")
    // Use local worker file for better reliability
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
  }
  
  return pdfjsLib
}

export interface ImageOptions {
  format: "png" | "jpg"
  quality?: number // 0-1 for jpg
  scale?: number // Scale factor (default: 2 for better quality)
}

export async function pdfToImages(
  file: File,
  options: ImageOptions = { format: "png", scale: 2 }
): Promise<Blob[]> {
  // Ensure this only runs in the browser
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("pdfToImages can only be used in the browser")
  }

  const pdfjs = await getPdfJs()
  const arrayBuffer = await file.arrayBuffer()
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
  const pdf = await loadingTask.promise
  const images: Blob[] = []

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: options.scale || 2 })
    
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) throw new Error("Could not get canvas context")

    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    }
    await (page.render(renderContext as any)).promise

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else throw new Error("Failed to create blob")
        },
        options.format === "jpg" ? "image/jpeg" : "image/png",
        options.quality || 0.92
      )
    })

    images.push(blob)
  }

  return images
}

