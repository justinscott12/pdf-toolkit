"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { mergePDFs } from "@/lib/pdf-merge"
import { toast } from "sonner"

export function MergePDFClient() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)

  useEffect(() => {
    const processPDFs = async () => {
      if (files.length < 2) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const merged = await mergePDFs(files)
        setResult(merged)
      } catch (error) {
        console.error("Merge error:", error)
        toast.error("Failed to merge PDFs. Please try again.")
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    processPDFs()
  }, [files])

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "merged.pdf"
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Merge PDF Files
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Combine multiple PDF files into one document. Upload 2 or more PDFs and merge them in order.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF Files</CardTitle>
          <CardDescription>
            Select 2 or more PDF files to merge. Files will be merged in the order you select them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PDFUploader
            onFilesSelected={setFiles}
            multiple={true}
            accept=".pdf"
          />
        </CardContent>
      </Card>

      {files.length >= 2 && processing && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Merging PDFs...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <>
          <PDFPreview
            blob={result}
            filename="merged.pdf"
            onDownload={handleDownload}
          />
        </>
      )}

      </div>
    </PageLayout>
  )
}

