"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, FileImage, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { imagesToPDF, ImagesToPDFOptions } from "@/lib/images-to-pdf"
import { toast } from "sonner"

export function ImagesToPDFClient() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  useEffect(() => {
    const processImages = async () => {
      if (files.length === 0) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const options: ImagesToPDFOptions = {
          orientation,
          format: "a4",
          margin: 10,
          compressImages: true,
        }
        const pdf = await imagesToPDF(files, options)
        setResult(pdf)
      } catch (error) {
        console.error("Conversion error:", error)
        toast.error("Failed to create PDF. Please try again.")
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    processImages()
  }, [files, orientation])

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "images-to-pdf.pdf"
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
            <FileImage className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 bg-clip-text text-transparent">
            Images to PDF
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Combine multiple images into a single PDF document. Supports JPG, PNG, and other image formats.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Image Files</CardTitle>
          <CardDescription>
            Select one or more image files to combine into a PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PDFUploader
            onFilesSelected={setFiles}
            multiple={true}
            accept="image/*"
          />
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>PDF Options</CardTitle>
            <CardDescription>
              Configure the output PDF settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Orientation</label>
              <div className="flex gap-4">
                <Button
                  variant={orientation === "portrait" ? "default" : "outline"}
                  onClick={() => setOrientation("portrait")}
                >
                  Portrait
                </Button>
                <Button
                  variant={orientation === "landscape" ? "default" : "outline"}
                  onClick={() => setOrientation("landscape")}
                >
                  Landscape
                </Button>
              </div>
            </div>
            {processing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Creating PDF...</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {result && (
        <PDFPreview
          blob={result}
          filename="images-to-pdf.pdf"
          onDownload={handleDownload}
        />
      )}

      </div>
    </PageLayout>
  )
}

