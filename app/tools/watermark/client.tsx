"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Loader2, Droplets, ArrowLeft, Image as ImageIcon, Type, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { addWatermark, WatermarkOptions, WatermarkPosition, WatermarkType } from "@/lib/pdf-watermark"
import { toast } from "sonner"

export function WatermarkClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text")
  const [watermarkText, setWatermarkText] = useState("WATERMARK")
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [opacity, setOpacity] = useState(0.3)
  const [textScale, setTextScale] = useState(1.0)
  const [imageScale, setImageScale] = useState(0.3)
  const [position, setPosition] = useState<WatermarkPosition>("diagonal")
  const [angle, setAngle] = useState(-45)

  // Handle image preview
  useEffect(() => {
    if (watermarkImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(watermarkImage)
    } else {
      setImagePreview(null)
    }
  }, [watermarkImage])

  useEffect(() => {
    const processPDF = async () => {
      if (!file) {
        setResult(null)
        return
      }

      // Validate watermark input based on type
      if (watermarkType === "text" && !watermarkText.trim()) {
        setResult(null)
        return
      }
      if (watermarkType === "image" && !watermarkImage) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const options: WatermarkOptions = {
          type: watermarkType,
          text: watermarkType === "text" ? watermarkText : undefined,
          image: watermarkType === "image" && watermarkImage ? watermarkImage : undefined,
          opacity,
          angle,
          position,
          imageScale: watermarkType === "image" ? imageScale : undefined,
        }
        const watermarked = await addWatermark(file, options)
        setResult(watermarked)
      } catch (error) {
        console.error("Watermark error:", error)
        const errorMessage = error instanceof Error ? error.message : "Failed to add watermark. Please try again."
        toast.error(errorMessage)
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    // Debounce for 500ms to avoid processing on every keystroke (text) or immediate processing (image)
    const timeoutId = setTimeout(processPDF, watermarkType === "text" ? 500 : 100)
    return () => clearTimeout(timeoutId)
  }, [file, watermarkType, watermarkText, watermarkImage, opacity, position, angle, textScale, imageScale])

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "watermarked.pdf"
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
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 blur-3xl -z-10 rounded-3xl" />
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 shadow-lg">
            <Droplets className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            Add Watermark to PDF
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Add a text or image watermark to all pages of your PDF document. Perfect for marking documents as drafts or confidential.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF File</CardTitle>
          <CardDescription>
            Select a PDF file to add watermark to
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
            <CardTitle>Watermark Settings</CardTitle>
            <CardDescription>
              Configure your watermark and appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Watermark Type Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Watermark Type</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={watermarkType === "text" ? "default" : "outline"}
                  onClick={() => setWatermarkType("text")}
                  className="h-16 flex flex-col items-center justify-center gap-2"
                >
                  <Type className="h-5 w-5" />
                  <span>Text</span>
                </Button>
                <Button
                  type="button"
                  variant={watermarkType === "image" ? "default" : "outline"}
                  onClick={() => setWatermarkType("image")}
                  className="h-16 flex flex-col items-center justify-center gap-2"
                >
                  <ImageIcon className="h-5 w-5" />
                  <span>Image</span>
                </Button>
              </div>
            </div>

            {/* Text Watermark Input */}
            {watermarkType === "text" && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Watermark Text</label>
                  <Input
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="WATERMARK"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Text Scale: {Math.round(textScale * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={textScale}
                    onInput={(e) => setTextScale(parseFloat((e.target as HTMLInputElement).value))}
                    onChange={(e) => setTextScale(parseFloat(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10%</span>
                    <span>100%</span>
                    <span>200%</span>
                  </div>
                </div>
              </>
            )}

            {/* Image Watermark Upload */}
            {watermarkType === "image" && (
              <div>
                <label className="text-sm font-medium mb-2 block">Watermark Image</label>
                {!watermarkImage ? (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0]
                        if (selectedFile) {
                          if (selectedFile.size > 5 * 1024 * 1024) {
                            toast.error("Image size must be less than 5MB")
                            return
                          }
                          setWatermarkImage(selectedFile)
                        }
                      }}
                      className="hidden"
                      id="watermark-image-upload"
                    />
                    <label
                      htmlFor="watermark-image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG or JPG (max 5MB)
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Watermark preview"
                          className="h-20 w-20 object-contain border rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{watermarkImage.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(watermarkImage.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setWatermarkImage(null)
                          setImagePreview(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {watermarkImage && (
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">
                      Image Scale: {Math.round(imageScale * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={imageScale}
                      onInput={(e) => setImageScale(parseFloat((e.target as HTMLInputElement).value))}
                      onChange={(e) => setImageScale(parseFloat(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium mb-3 block">Position</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={position === "top-left" ? "default" : "outline"}
                  onClick={() => setPosition("top-left")}
                  className="h-16"
                >
                  Top Left
                </Button>
                <Button
                  type="button"
                  variant={position === "center" ? "default" : "outline"}
                  onClick={() => setPosition("center")}
                  className="h-16"
                >
                  Center
                </Button>
                <Button
                  type="button"
                  variant={position === "top-right" ? "default" : "outline"}
                  onClick={() => setPosition("top-right")}
                  className="h-16"
                >
                  Top Right
                </Button>
                <Button
                  type="button"
                  variant={position === "bottom-left" ? "default" : "outline"}
                  onClick={() => setPosition("bottom-left")}
                  className="h-16"
                >
                  Bottom Left
                </Button>
                <Button
                  type="button"
                  variant={position === "diagonal" ? "default" : "outline"}
                  onClick={() => setPosition("diagonal")}
                  className="h-16"
                >
                  Diagonal
                </Button>
                <Button
                  type="button"
                  variant={position === "bottom-right" ? "default" : "outline"}
                  onClick={() => setPosition("bottom-right")}
                  className="h-16"
                >
                  Bottom Right
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Rotation Angle: {angle}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                step="15"
                value={angle}
                onInput={(e) => setAngle(parseInt((e.target as HTMLInputElement).value))}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-180°</span>
                <span>0°</span>
                <span>180°</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.01"
                value={opacity}
                onInput={(e) => setOpacity(parseFloat((e.target as HTMLInputElement).value))}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {processing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Adding watermark...</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {result && (
        <PDFPreview
          blob={result}
          filename="watermarked.pdf"
          onDownload={handleDownload}
        />
      )}

      </div>
    </PageLayout>
  )
}

