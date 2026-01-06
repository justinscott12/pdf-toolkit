"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Loader2, Image as ImageIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PageLayout } from "@/components/PageLayout"
import { pdfToImages, ImageOptions } from "@/lib/pdf-to-images"
import { toast } from "sonner"

export function PDFToImagesClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<Blob[]>([])
  const [format, setFormat] = useState<"png" | "jpg">("png")

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please select a PDF file")
      return
    }

    setProcessing(true)
    try {
      const options: ImageOptions = {
        format,
        scale: 2,
        quality: format === "jpg" ? 0.92 : undefined,
      }
      const images = await pdfToImages(file, options)
      setResults(images)
      toast.success(`Converted ${images.length} page(s) to images!`)
    } catch (error) {
      console.error("Conversion error:", error)
      toast.error("Failed to convert PDF to images. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = (blob: Blob, index: number) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `page-${index + 1}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadAll = () => {
    results.forEach((blob, index) => {
      setTimeout(() => {
        handleDownload(blob, index)
      }, index * 100)
    })
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
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 shadow-lg">
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-400 dark:to-red-400 bg-clip-text text-transparent">
            PDF to Images
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Convert each page of your PDF into high-quality images (PNG or JPG format).
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF File</CardTitle>
          <CardDescription>
            Select a PDF file to convert to images
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
            <CardTitle>Image Format</CardTitle>
            <CardDescription>
              Choose the output image format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={format === "png" ? "default" : "outline"}
                onClick={() => setFormat("png")}
              >
                PNG (Higher Quality)
              </Button>
              <Button
                variant={format === "jpg" ? "default" : "outline"}
                onClick={() => setFormat("jpg")}
              >
                JPG (Smaller Size)
              </Button>
            </div>
            <Button
              onClick={handleProcess}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting PDF...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Convert to Images
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Converted Images</CardTitle>
            <CardDescription>
              {results.length} image(s) ready for download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleDownloadAll} className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download All Images
            </Button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((blob, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(blob)}
                      alt={`Page ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Page {index + 1}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(blob, index)}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      </div>
    </PageLayout>
  )
}

