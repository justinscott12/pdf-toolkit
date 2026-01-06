"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Download, Loader2, Edit3, ArrowLeft, Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PDFUploader } from "@/components/PDFUploader"
import { AdBanner } from "@/components/AdBanner"
import { PDFPreview } from "@/components/PDFPreview"
import { PageLayout } from "@/components/PageLayout"
import { PDFVisualEditor } from "@/components/PDFVisualEditor"
import { extractPDFText, replacePDFText, TextItem } from "@/lib/pdf-edit-text"
import { toast } from "sonner"

export function EditTextClient() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [result, setResult] = useState<Blob | null>(null)
  const [textItems, setTextItems] = useState<TextItem[]>([])
  const [editedItems, setEditedItems] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPage, setSelectedPage] = useState<number | null>(null)

  // Extract text when file is uploaded
  useEffect(() => {
    const extractText = async () => {
      if (!file) {
        setTextItems([])
        setEditedItems({})
        setResult(null)
        return
      }

      setExtracting(true)
      try {
        const extracted = await extractPDFText(file)
        setTextItems(extracted.items)
        setSelectedPage(extracted.items.length > 0 ? extracted.items[0].page : null)
        setEditedItems({})
        setResult(null)
        toast.success(`Extracted ${extracted.items.length} text items from ${extracted.pages} page(s)`)
      } catch (error) {
        console.error("Extract error:", error)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        toast.error(
          errorMessage.includes("No text content") 
            ? errorMessage 
            : `Failed to extract text: ${errorMessage}. Please ensure the PDF contains selectable text.`
        )
        setTextItems([])
      } finally {
        setExtracting(false)
      }
    }

    extractText()
  }, [file])

  // Process PDF when text is edited
  useEffect(() => {
    const processPDF = async () => {
      if (!file || textItems.length === 0) {
        setResult(null)
        return
      }

      // Check if there are any edits
      const hasEdits = Object.keys(editedItems).length > 0
      if (!hasEdits) {
        setResult(null)
        return
      }

      setProcessing(true)
      try {
        const replacements = Object.entries(editedItems)
          .filter(([_, newText]) => newText.trim() !== "")
          .map(([id, newText]) => ({ id, newText }))

        if (replacements.length === 0) {
          setResult(null)
          return
        }

        const edited = await replacePDFText(file, replacements)
        setResult(edited)
      } catch (error) {
        console.error("Edit error:", error)
        toast.error("Failed to update PDF. Please try again.")
        setResult(null)
      } finally {
        setProcessing(false)
      }
    }

    // Debounce for 500ms
    const timeoutId = setTimeout(processPDF, 500)
    return () => clearTimeout(timeoutId)
  }, [file, textItems, editedItems])

  const handleTextChange = (id: string, newText: string) => {
    setEditedItems((prev) => ({
      ...prev,
      [id]: newText,
    }))
  }

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result)
      const a = document.createElement("a")
      a.href = url
      a.download = "edited.pdf"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  // Filter text items
  const filteredItems = useMemo(() => {
    let items = textItems

    // Filter by page
    if (selectedPage !== null) {
      items = items.filter((item) => item.page === selectedPage)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter((item) =>
        item.text.toLowerCase().includes(query) ||
        (editedItems[item.id] && editedItems[item.id].toLowerCase().includes(query))
      )
    }

    return items
  }, [textItems, selectedPage, searchQuery, editedItems])

  // Get unique pages
  const pages = useMemo(() => {
    return Array.from(new Set(textItems.map((item) => item.page))).sort((a, b) => a - b)
  }, [textItems])

  return (
    <PageLayout>
      <div className="py-8">
        <AdBanner 
          adFormat="horizontal" 
          className="mb-6"
          style={{ minHeight: "90px" }}
        />
        
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 blur-3xl -z-10 rounded-3xl" />
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 shadow-lg">
              <Edit3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Free PDF Editor - Edit PDF Text Online
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            The best free PDF editor online. Edit PDF text directly in your browser - no subscription needed. Click and edit text in the PDF preview, just like professional PDF editing software, but 100% free.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload PDF File</CardTitle>
            <CardDescription>
              Select a PDF file to extract and edit text
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

        {extracting && (
          <Card className="mb-6">
            <CardContent className="py-8">
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                <span className="text-muted-foreground">Extracting text from PDF...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {textItems.length > 0 && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Visual PDF Editor</CardTitle>
                <CardDescription>
                  Click on any text in the PDF preview to edit it. {textItems.length} text items found across {pages.length} page(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Page Navigation */}
                {pages.length > 1 && (
                  <div className="flex gap-2 flex-wrap">
                    {pages.map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={selectedPage === pageNum ? "default" : "outline"}
                        onClick={() => setSelectedPage(pageNum)}
                        size="sm"
                      >
                        Page {pageNum}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Visual PDF Editor */}
                {selectedPage && file && (
                  <PDFVisualEditor
                    file={file}
                    textItems={textItems}
                    editedItems={editedItems}
                    onTextChange={handleTextChange}
                    selectedPage={selectedPage}
                    onPageChange={setSelectedPage}
                  />
                )}

                {/* Search and Text List (Collapsible) */}
                <details className="mt-6">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    Show Text List View
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search text..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredItems.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          {searchQuery ? "No text items match your search" : "No text items found"}
                        </p>
                      ) : (
                        filteredItems.map((item) => {
                          const editedText = editedItems[item.id] ?? item.text
                          const isEdited = editedItems[item.id] !== undefined && editedItems[item.id] !== item.text

                          return (
                            <div
                              key={item.id}
                              className={`p-4 border rounded-lg ${isEdited ? "border-primary bg-primary/5" : "border-border"}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      Page {item.page}
                                    </span>
                                    {isEdited && (
                                      <span className="text-xs text-primary font-medium">(Edited)</span>
                                    )}
                                  </div>
                                  <Input
                                    value={editedText}
                                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                                    className="font-mono text-sm"
                                  />
                                  {isEdited && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Original: {item.text}
                                    </p>
                                  )}
                                </div>
                                {isEdited && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newEdited = { ...editedItems }
                                      delete newEdited[item.id]
                                      setEditedItems(newEdited)
                                    }}
                                  >
                                    Reset
                                  </Button>
                                )}
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </details>
              </CardContent>
            </Card>

            {processing && (
              <Card className="mb-6">
                <CardContent className="py-4">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                    <span className="text-sm text-muted-foreground">Updating PDF preview...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <PDFPreview
                blob={result}
                filename="edited.pdf"
                onDownload={handleDownload}
              />
            )}
          </>
        )}

        {!extracting && textItems.length === 0 && file && (
          <Card className="mb-6">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No text content found in this PDF. The PDF may be image-based or encrypted.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}

