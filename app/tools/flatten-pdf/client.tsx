"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, Layers, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { flattenPDF } from "@/lib/pdf-flatten"
import { toast } from "sonner"

export function FlattenPDFClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)

  useEffect(() => {
    const processPDF = async () => {
      if (!file) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const flattened = await flattenPDF(file)
        setResult(flattened)
        toast.success("PDF flattened successfully!")
      } catch (error) {
        console.error("Flatten error:", error)
        toast.error("Failed to flatten PDF. Please try again.")
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
      a.download = "flattened.pdf"
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
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-3xl -z-10 rounded-3xl" />
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-lg">
              <Layers className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Flatten PDF
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Flatten PDF forms and make them non-editable. Perfect for finalizing documents and preventing further modifications.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload PDF File</CardTitle>
            <CardDescription>
              Select a PDF file to flatten
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
              <CardTitle>Flatten PDF</CardTitle>
              <CardDescription>
                Flattening will make form fields and annotations non-editable
              </CardDescription>
            </CardHeader>
            <CardContent>
              {processing && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span className="text-muted-foreground">Flattening PDF...</span>
                </div>
              )}
              {!processing && !result && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Processing will start automatically...
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {result && (
          <PDFPreview
            blob={result}
            filename="flattened.pdf"
            onDownload={handleDownload}
          />
        )}
      </div>
    </PageLayout>
  )
}

