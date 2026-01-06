"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, RotateCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { rotatePDF, RotationAngle } from "@/lib/pdf-rotate"
import { toast } from "sonner"

export function RotatePDFClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [angle, setAngle] = useState<RotationAngle>(90)

  useEffect(() => {
    const processPDF = async () => {
      if (!file) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const rotated = await rotatePDF(file, { angle })
        setResult(rotated)
      } catch (error) {
        console.error("Rotate error:", error)
        toast.error("Failed to rotate PDF. Please try again.")
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    processPDF()
  }, [file, angle])

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "rotated.pdf"
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-lg">
            <RotateCw className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Rotate PDF Pages
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Rotate all pages in your PDF document by 90°, 180°, or 270°.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF File</CardTitle>
          <CardDescription>
            Select a PDF file to rotate
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
            <CardTitle>Rotation Angle</CardTitle>
            <CardDescription>
              Select the rotation angle for all pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={angle === 90 ? "default" : "outline"}
                onClick={() => setAngle(90)}
                className="h-20"
              >
                <div className="text-center">
                  <RotateCw className="h-6 w-6 mx-auto mb-2" />
                  <div>90°</div>
                </div>
              </Button>
              <Button
                variant={angle === 180 ? "default" : "outline"}
                onClick={() => setAngle(180)}
                className="h-20"
              >
                <div className="text-center">
                  <RotateCw className="h-6 w-6 mx-auto mb-2" />
                  <div>180°</div>
                </div>
              </Button>
              <Button
                variant={angle === 270 ? "default" : "outline"}
                onClick={() => setAngle(270)}
                className="h-20"
              >
                <div className="text-center">
                  <RotateCw className="h-6 w-6 mx-auto mb-2" />
                  <div>270°</div>
                </div>
              </Button>
            </div>
            {processing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Processing PDF...</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {result && (
        <PDFPreview
          blob={result}
          filename="rotated.pdf"
          onDownload={handleDownload}
        />
      )}

      </div>
    </PageLayout>
  )
}

