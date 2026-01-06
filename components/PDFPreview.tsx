"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PDFPreviewProps {
  blob: Blob | null
  filename?: string
  onDownload?: () => void
  onClose?: () => void
}

export function PDFPreview({ blob, filename = "preview.pdf", onDownload, onClose }: PDFPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (blob) {
      const objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
      setLoading(true)

      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    } else {
      setUrl(null)
    }
  }, [blob])

  const handleIframeLoad = () => {
    setLoading(false)
  }

  if (!blob || !url) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="border-b bg-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">Preview</h3>
            <span className="text-xs text-muted-foreground">
              {(blob.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onDownload && (
              <Button onClick={onDownload} size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
            {onClose && (
              <Button onClick={onClose} size="sm" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="relative bg-muted/30" style={{ minHeight: "600px" }}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading preview...</p>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full"
            style={{ height: "600px", border: "none" }}
            onLoad={handleIframeLoad}
            title="PDF Preview"
          />
        </div>
      </CardContent>
    </Card>
  )
}

