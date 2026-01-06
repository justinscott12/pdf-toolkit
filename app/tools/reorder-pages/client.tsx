"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, ArrowUpDown, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { reorderPages } from "@/lib/pdf-reorder-pages"
import { toast } from "sonner"
import * as pdfjsLib from "pdfjs-dist"

export function ReorderPagesClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [pageOrder, setPageOrder] = useState<number[]>([])

  // Get total pages when file is uploaded
  useEffect(() => {
    const getPageCount = async () => {
      if (!file) {
        setTotalPages(0)
        setPageOrder([])
        return
      }

      try {
        const pdfjs = await import("pdfjs-dist")
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
        const arrayBuffer = await file.arrayBuffer()
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
        const pdf = await loadingTask.promise
        const pages = pdf.numPages
        setTotalPages(pages)
        // Initialize with default order
        setPageOrder(Array.from({ length: pages }, (_, i) => i + 1))
      } catch (error) {
        console.error("Error getting page count:", error)
        setTotalPages(0)
      }
    }

    getPageCount()
  }, [file])

  useEffect(() => {
    const processPDF = async () => {
      if (!file || pageOrder.length === 0 || pageOrder.length !== totalPages) {
        setResult(null)
        return
      }

      // Check if order has changed
      const defaultOrder = Array.from({ length: totalPages }, (_, i) => i + 1)
      const hasChanged = JSON.stringify(pageOrder) !== JSON.stringify(defaultOrder)
      
      if (!hasChanged) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const reordered = await reorderPages(file, { pageOrder })
        setResult(reordered)
        toast.success("Pages reordered successfully!")
      } catch (error) {
        console.error("Reorder error:", error)
        toast.error("Failed to reorder pages. Please try again.")
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    const timeoutId = setTimeout(processPDF, 500)
    return () => clearTimeout(timeoutId)
  }, [file, pageOrder, totalPages])

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "reordered.pdf"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const movePage = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const newOrder = [...pageOrder]
      ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
      setPageOrder(newOrder)
    } else if (direction === "down" && index < pageOrder.length - 1) {
      const newOrder = [...pageOrder]
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
      setPageOrder(newOrder)
    }
  }

  const resetOrder = () => {
    setPageOrder(Array.from({ length: totalPages }, (_, i) => i + 1))
  }

  return (
    <PageLayout>
      <div className="py-8">
        <AdBanner 
          adFormat="horizontal" 
          className="mb-6"
          style={{ minHeight: "90px" }}
        />
        
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 blur-3xl -z-10 rounded-3xl" />
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-lg">
              <ArrowUpDown className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Reorder PDF Pages
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Rearrange and reorder pages in your PDF document. Drag or use arrows to change page order.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload PDF File</CardTitle>
            <CardDescription>
              Select a PDF file to reorder pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PDFUploader
              onFilesSelected={(files) => setFile(files[0] || null)}
              multiple={false}
              accept=".pdf"
            />
          </CardContent>
        </Card>

        {file && totalPages > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Page Order</CardTitle>
                  <CardDescription>
                    {totalPages} page(s) - Drag or use arrows to reorder
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={resetOrder}>
                  Reset Order
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {pageOrder.map((pageNum, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-medium w-8">#{index + 1}</span>
                  <div className="flex-1">
                    <span className="text-sm">Page {pageNum}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => movePage(index, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUpDown className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => movePage(index, "down")}
                      disabled={index === pageOrder.length - 1}
                    >
                      <ArrowUpDown className="h-4 w-4 -rotate-90" />
                    </Button>
                  </div>
                </div>
              ))}
              {processing && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Reordering pages...</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {result && (
          <PDFPreview
            blob={result}
            filename="reordered.pdf"
            onDownload={handleDownload}
          />
        )}
      </div>
    </PageLayout>
  )
}

