"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { extractPDFText, TextItem } from "@/lib/pdf-edit-text"

interface PDFVisualEditorProps {
  file: File
  textItems: TextItem[]
  editedItems: Record<string, string>
  onTextChange: (id: string, newText: string) => void
  selectedPage: number
  onPageChange: (page: number) => void
}

export function PDFVisualEditor({
  file,
  textItems,
  editedItems,
  onTextChange,
  selectedPage,
  onPageChange,
}: PDFVisualEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const renderTaskRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [scale, setScale] = useState(1.5)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [editPosition, setEditPosition] = useState<{ x: number; y: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const renderPDF = async () => {
      if (!canvasRef.current || !file) return

      // Cancel previous render task if it exists
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch (e) {
          // Ignore cancellation errors
        }
        renderTaskRef.current = null
      }

      setLoading(true)
      try {
        const pdfjs = await import("pdfjs-dist")
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

        const arrayBuffer = await file.arrayBuffer()
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
        const pdf = await loadingTask.promise

        const page = await pdf.getPage(selectedPage)
        const viewport = page.getViewport({ scale })

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) {
          setLoading(false)
          return
        }

        // Clear the canvas before rendering
        context.clearRect(0, 0, canvas.width, canvas.height)

        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        const renderTask = page.render(renderContext as any)
        renderTaskRef.current = renderTask

        await renderTask.promise

        renderTaskRef.current = null
        setLoading(false)
      } catch (error: any) {
        // Ignore cancellation errors
        if (error?.name !== "RenderingCancelledException") {
          console.error("PDF render error:", error)
        }
        renderTaskRef.current = null
        setLoading(false)
      }
    }

    renderPDF()

    // Cleanup function to cancel render on unmount or dependency change
    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch (e) {
          // Ignore cancellation errors
        }
        renderTaskRef.current = null
      }
    }
  }, [file, selectedPage, scale])

  // Handle text item clicks
  const handleTextClick = (item: TextItem, event: React.MouseEvent) => {
    if (item.page !== selectedPage) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) / (rect.width / canvas.width)
    const y = (event.clientY - rect.top) / (rect.height / canvas.height)

    // Check if click is within text bounds (with some padding for easier clicking)
    const padding = 5
    const itemX = item.x * scale
    const itemY = item.y * scale
    const itemWidth = item.width * scale
    const itemHeight = item.height * scale

    if (
      x >= itemX - padding &&
      x <= itemX + itemWidth + padding &&
      y >= itemY - itemHeight - padding &&
      y <= itemY + padding
    ) {
      setEditingId(item.id)
      setEditValue(editedItems[item.id] ?? item.text)
      setEditPosition({ x: itemX, y: itemY - itemHeight })
    }
  }

  // Handle input blur to save
  const handleInputBlur = () => {
    if (editingId) {
      onTextChange(editingId, editValue)
      setEditingId(null)
      setEditPosition(null)
    }
  }

  // Handle input key press
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleInputBlur()
    } else if (e.key === "Escape") {
      setEditingId(null)
      setEditPosition(null)
    }
  }

  // Focus input when editing starts
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingId])

  // Filter items for current page
  const pageItems = textItems.filter((item) => item.page === selectedPage)

  return (
    <div className="relative w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.25))}
            className="px-3 py-1 border rounded hover:bg-muted"
            disabled={scale <= 0.5}
          >
            -
          </button>
          <span className="text-sm font-medium w-20 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(Math.min(3, scale + 0.25))}
            className="px-3 py-1 border rounded hover:bg-muted"
            disabled={scale >= 3}
          >
            +
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Click on any text to edit it
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative border rounded-lg overflow-auto bg-gray-100 dark:bg-gray-900"
        style={{ maxHeight: "800px" }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <div className="relative inline-block">
          <canvas
            ref={canvasRef}
            className="block shadow-lg cursor-pointer"
            onClick={(e) => {
              // Check if click is on any text item (reverse order to get topmost item)
              for (let i = pageItems.length - 1; i >= 0; i--) {
                handleTextClick(pageItems[i], e)
              }
            }}
          />

          {/* Render text overlays for editing */}
          {pageItems.map((item) => {
            const editedText = editedItems[item.id] ?? item.text
            const isEditing = editingId === item.id
            const x = item.x * scale
            const y = item.y * scale
            const width = item.width * scale
            const height = item.height * scale
            const isEdited = editedItems[item.id] !== undefined && editedItems[item.id] !== item.text

            if (isEditing && editPosition) {
              return (
                <input
                  key={`input-${item.id}`}
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  className="absolute border-2 border-primary bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg z-20"
                  style={{
                    left: `${editPosition.x}px`,
                    top: `${editPosition.y}px`,
                    minWidth: `${Math.max(width, 100)}px`,
                    fontSize: `${(item.fontSize || 12) * scale}px`,
                  }}
                />
              )
            }

            return (
              <div
                key={item.id}
                className={`absolute cursor-pointer transition-all rounded ${
                  isEdited
                    ? "bg-yellow-200/50 dark:bg-yellow-900/30 border-2 border-yellow-400"
                    : "hover:bg-blue-200/30 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-400"
                }`}
                style={{
                  left: `${x}px`,
                  top: `${y - height}px`,
                  width: `${Math.max(width, 20)}px`,
                  height: `${Math.max(height, 12)}px`,
                  minWidth: "20px",
                  minHeight: "12px",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleTextClick(item, e)
                }}
                title={isEdited ? `Edited: ${editedText}` : `Click to edit: ${item.text}`}
              >
                <span className="sr-only">{editedText}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

