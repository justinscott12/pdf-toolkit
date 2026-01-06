"use client"

import { useCallback, useState } from "react"
import { Upload, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PDFUploaderProps {
  onFilesSelected: (files: File[]) => void
  multiple?: boolean
  accept?: string
  maxFiles?: number
  className?: string
}

export function PDFUploader({ 
  onFilesSelected, 
  multiple = false, 
  accept = ".pdf",
  maxFiles,
  className 
}: PDFUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    
    const newFiles = Array.from(fileList).filter(file => {
      if (accept.includes(".pdf") && !file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
        return false
      }
      if (accept.includes("image") && !file.type.startsWith("image/")) {
        return false
      }
      return true
    })

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
    const finalFiles = maxFiles ? updatedFiles.slice(0, maxFiles) : updatedFiles
    
    setFiles(finalFiles)
    onFilesSelected(finalFiles)
  }, [files, multiple, maxFiles, accept, onFilesSelected])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }, [handleFiles])

  const removeFile = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }, [files, onFilesSelected])

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-300",
          isDragging 
            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20 scale-[1.01]" 
            : "border-muted-foreground/25 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent",
          "p-8"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">
              Drag and drop your {accept.includes(".pdf") ? "PDF" : "file"}(s) here
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
          <Button asChild variant="outline">
            <label htmlFor="file-upload" className="cursor-pointer">
              Select Files
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple={multiple}
                accept={accept}
                onChange={handleFileInput}
              />
            </label>
          </Button>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files:</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

