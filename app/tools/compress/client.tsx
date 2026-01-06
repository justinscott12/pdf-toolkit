"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, Minimize2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { compressPDF } from "@/lib/pdf-compress"
import { toast } from "sonner"

export function CompressPDFClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)

  useEffect(() => {
    const processPDF = async () => {
      if (!file) {
        setResult(null)
        return
      }

      setProcessing(true)
      setOriginalSize(file.size)
      try {
        const compressed = await compressPDF(file)
        setResult(compressed)
      } catch (error) {
        console.error("Compress error:", error)
        toast.error("Failed to compress PDF. Please try again.")
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    processPDF()
  }, [file])

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "compressed.pdf"
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
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-rose-500/5 to-orange-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg">
            <Minimize2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
            Compress PDF File
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Reduce the file size of your PDF while maintaining reasonable quality. Perfect for sharing and storage.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF File</CardTitle>
          <CardDescription>
            Select a PDF file to compress
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
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Original Size</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {processing && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Compressing PDF...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Compressed Size</p>
                  <p className="text-sm text-muted-foreground">
                    {(result.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600 dark:text-green-400">
                    {((1 - result.size / originalSize) * 100).toFixed(1)}% smaller
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <PDFPreview
            blob={result}
            filename="compressed.pdf"
            onDownload={handleDownload}
          />
        </>
      )}

      </div>
    </PageLayout>
  )
}

