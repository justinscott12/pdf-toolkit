"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Download, Loader2, FileX, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { extractPages } from "@/lib/pdf-extract"
import { toast } from "sonner"

export function ExtractPagesClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [pageNumbers, setPageNumbers] = useState("")

  // Parse page numbers for validation
  const parsedPages = useMemo(() => {
    if (!pageNumbers.trim()) return []
    const pages: number[] = []
    const parts = pageNumbers.split(",")
    
    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim()))
        if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
          for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i)
          }
        }
      } else {
        const page = parseInt(trimmed)
        if (!isNaN(page) && page > 0 && !pages.includes(page)) {
          pages.push(page)
        }
      }
    }
    return pages
  }, [pageNumbers])

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please select a PDF file")
      return
    }

    // Parse page numbers, supporting both comma-separated and ranges
    const pages: number[] = []
    const parts = pageNumbers.split(",")
    
    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.includes("-")) {
        // Handle ranges like "1-5"
        const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim()))
        if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
          for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i)
          }
        }
      } else {
        // Handle single page numbers
        const page = parseInt(trimmed)
        if (!isNaN(page) && page > 0 && !pages.includes(page)) {
          pages.push(page)
        }
      }
    }

    if (pages.length === 0) {
      toast.error("Please enter valid page numbers (e.g., 1,3,5 or 1-5,7-10)")
      return
    }

    setProcessing(true)
    try {
      const extracted = await extractPages(file, { pages })
      setResult(extracted)
      toast.success(`Extracted ${pages.length} page(s) successfully!`)
    } catch (error) {
      console.error("Extract error:", error)
      toast.error("Failed to extract pages. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "extracted-pages.pdf"
      a.click()
      URL.revokeObjectURL(url)
    }
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
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg">
            <FileX className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Extract PDF Pages
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Extract specific pages from your PDF document and save them as a new PDF file.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF File</CardTitle>
          <CardDescription>
            Select a PDF file to extract pages from
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

      {file && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Page Numbers</CardTitle>
            <CardDescription>
              Enter page numbers to extract (e.g., 1,3,5 or 1-5,7-10)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={pageNumbers}
              onChange={(e) => setPageNumbers(e.target.value)}
              placeholder="1,3,5 or 1-5,7-10"
            />
            <Button
              onClick={handleProcess}
              disabled={processing || parsedPages.length === 0}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <FileX className="mr-2 h-4 w-4" />
                  Extract Pages
                </>
              )}
            </Button>
            {processing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Extracting pages...</span>
              </div>
            )}
            {!processing && parsedPages.length === 0 && pageNumbers.trim() && (
              <p className="text-sm text-muted-foreground text-center py-2">
                Enter valid page numbers to extract
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {result && (
        <PDFPreview
          blob={result}
          filename="extracted-pages.pdf"
          onDownload={handleDownload}
        />
      )}

      </div>
    </PageLayout>
  )
}

