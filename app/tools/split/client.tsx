"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Loader2, Scissors, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PageLayout } from "@/components/PageLayout"
import { splitPDF, SplitOptions } from "@/lib/pdf-split"
import { toast } from "sonner"

export function SplitPDFClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<Blob[]>([])
  const [splitMode, setSplitMode] = useState<"pages" | "ranges">("pages")
  const [pageNumbers, setPageNumbers] = useState("")
  const [ranges, setRanges] = useState("")

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please select a PDF file")
      return
    }

    setProcessing(true)
    try {
      let options: SplitOptions

      if (splitMode === "pages") {
        const pages = pageNumbers
          .split(",")
          .map((p) => parseInt(p.trim()))
          .filter((p) => !isNaN(p) && p > 0)
        
        if (pages.length === 0) {
          toast.error("Please enter valid page numbers")
          setProcessing(false)
          return
        }
        options = { splitBy: "pages", pages }
      } else {
        const rangeList = ranges
          .split(",")
          .map((r) => {
            const [start, end] = r.split("-").map((n) => parseInt(n.trim()))
            return { start: start || 1, end: end || start || 1 }
          })
          .filter((r) => !isNaN(r.start) && !isNaN(r.end))
        
        if (rangeList.length === 0) {
          toast.error("Please enter valid page ranges (e.g., 1-5, 6-10)")
          setProcessing(false)
          return
        }
        options = { splitBy: "ranges", ranges: rangeList }
      }

      const splitResults = await splitPDF(file, options)
      setResults(splitResults)
      toast.success(`PDF split into ${splitResults.length} file(s)!`)
    } catch (error) {
      console.error("Split error:", error)
      toast.error("Failed to split PDF. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = (blob: Blob, index: number) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `split-${index + 1}.pdf`
    a.click()
    URL.revokeObjectURL(url)
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg">
            <Scissors className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Split PDF File
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Extract specific pages or split your PDF into multiple files by page ranges.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF File</CardTitle>
          <CardDescription>
            Select a PDF file to split
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
            <CardTitle>Split Options</CardTitle>
            <CardDescription>
              Choose how you want to split the PDF
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={splitMode === "pages" ? "default" : "outline"}
                onClick={() => setSplitMode("pages")}
              >
                By Page Numbers
              </Button>
              <Button
                variant={splitMode === "ranges" ? "default" : "outline"}
                onClick={() => setSplitMode("ranges")}
              >
                By Page Ranges
              </Button>
            </div>

            {splitMode === "pages" ? (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Page Numbers (comma-separated, e.g., 1,3,5)
                </label>
                <Input
                  value={pageNumbers}
                  onChange={(e) => setPageNumbers(e.target.value)}
                  placeholder="1,3,5,7"
                />
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Page Ranges (comma-separated, e.g., 1-5,6-10)
                </label>
                <Input
                  value={ranges}
                  onChange={(e) => setRanges(e.target.value)}
                  placeholder="1-5,6-10,11-15"
                />
              </div>
            )}

            <Button
              onClick={handleProcess}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Splitting PDF...
                </>
              ) : (
                <>
                  <Scissors className="mr-2 h-4 w-4" />
                  Split PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Split Results</CardTitle>
            <CardDescription>
              Download individual split files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {results.map((blob, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">split-{index + 1}.pdf</p>
                  <p className="text-sm text-muted-foreground">
                    {(blob.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button onClick={() => handleDownload(blob, index)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      </div>
    </PageLayout>
  )
}
