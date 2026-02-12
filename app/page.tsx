"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FileText, Scissors, Minimize2, RotateCw, Image as ImageIcon, FileImage, FileX, Droplets, Edit3, Trash2, ArrowUpDown, Layers, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/ToolCard"
import { AdBanner } from "@/components/AdBanner"
import { PageLayout } from "@/components/PageLayout"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/StructuredData"
import { BASE_URL } from "@/lib/site"

const tools = [
  {
    title: "Edit Text",
    description: "Free PDF editor - Edit text directly in your PDF documents",
    icon: Edit3,
    href: "/tools/edit-text",
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: FileText,
    href: "/tools/merge",
  },
  {
    title: "Split PDF",
    description: "Extract pages or split PDF by page ranges",
    icon: Scissors,
    href: "/tools/split",
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    icon: Minimize2,
    href: "/tools/compress",
  },
  {
    title: "Rotate PDF",
    description: "Rotate PDF pages by 90°, 180°, or 270°",
    icon: RotateCw,
    href: "/tools/rotate",
  },
  {
    title: "PDF to Images",
    description: "Convert PDF pages to PNG or JPG images",
    icon: ImageIcon,
    href: "/tools/pdf-to-images",
  },
  {
    title: "Images to PDF",
    description: "Combine multiple images into a single PDF",
    icon: FileImage,
    href: "/tools/images-to-pdf",
  },
  {
    title: "Extract Pages",
    description: "Extract specific pages from a PDF document",
    icon: FileX,
    href: "/tools/extract-pages",
  },
  {
    title: "Add Watermark",
    description: "Add text watermark to all pages of your PDF",
    icon: Droplets,
    href: "/tools/watermark",
  },
  {
    title: "Remove Pages",
    description: "Delete specific pages from your PDF document",
    icon: Trash2,
    href: "/tools/remove-pages",
  },
  {
    title: "Reorder Pages",
    description: "Rearrange and reorder pages in your PDF",
    icon: ArrowUpDown,
    href: "/tools/reorder-pages",
  },
  {
    title: "Flatten PDF",
    description: "Flatten PDF forms and make them non-editable",
    icon: Layers,
    href: "/tools/flatten-pdf",
  },
]

// Metadata is now in layout.tsx

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF Toolkit",
    "description": "Free online PDF tools to merge, split, compress, rotate, convert PDFs to images, and more. No sign-up required.",
    "url": BASE_URL,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "featureList": [
      "Merge PDF files",
      "Split PDF documents",
      "Compress PDF files",
      "Rotate PDF pages",
      "Convert PDF to images",
      "Convert images to PDF",
      "Extract PDF pages",
      "Add watermarks",
      "Edit PDF text"
    ]
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "PDF Toolkit",
    "url": BASE_URL,
    "logo": `${BASE_URL}/icon-512.png`,
    "description": "Free online PDF tools: merge, split, compress, edit, and convert PDFs. No sign-up. All processing in your browser."
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PDF Toolkit",
    "url": BASE_URL,
    "description": "Free PDF editor and PDF tools online. Merge, split, compress, rotate, convert PDFs—no subscription required.",
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/tools/merge` },
      "query-input": "required name=search_term_string"
    }
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is PDF Toolkit free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PDF Toolkit is completely free to use. All tools are available without any sign-up or payment required. All processing happens in your browser for maximum privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you don't need to create an account. All PDF tools work immediately without any registration or sign-up process."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your data is completely secure. All PDF processing happens entirely in your browser. Your files never leave your device and are never uploaded to any server."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a free PDF editor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PDF Toolkit is a completely free PDF editor. You can edit PDF text, merge, split, compress, and convert PDFs - all for free. No subscription or paid software required."
        }
      },
      {
        "@type": "Question",
        "name": "Can I edit PDF text online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our free PDF editor lets you edit PDF text directly in your browser. Click on any text in the PDF preview to edit it. No downloads or installations needed."
        }
      },
      {
        "@type": "Question",
        "name": "What PDF tools are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PDF Toolkit offers 9 free tools: Edit PDF Text (free PDF editor), Merge PDF, Split PDF, Compress PDF, Rotate PDF, PDF to Images, Images to PDF, Extract Pages, and Add Watermark."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use PDF Toolkit on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PDF Toolkit is fully responsive and works on all devices including smartphones and tablets. All tools are optimized for mobile use."
        }
      }
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} id="webapp-schema" />
      <StructuredData data={organizationData} id="organization-schema" />
      <StructuredData data={websiteData} id="website-schema" />
      <StructuredData data={faqStructuredData} id="faq-schema" />
      <PageLayout fullWidthHeader>
      {/* Header Ad */}
      <div className="border-b bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-12">
          <div className="max-w-5xl mx-auto py-2">
            <div className="flex items-center justify-between mb-2">
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <Image
                  src="/logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-md"
                  priority
                />
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                  PDF Toolkit
                </h1>
              </Link>
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            <AdBanner 
              adFormat="horizontal" 
              className="w-full"
              style={{ minHeight: "70px" }}
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1">
        <div className="flex gap-12 max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-12">
          {/* Left Sidebar Ad - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0 pt-8">
            <div className="sticky top-4">
              <AdBanner 
                adFormat="rectangle" 
                className="w-full"
                style={{ minHeight: "600px", maxWidth: "250px" }}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-5xl mx-auto py-12">
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl -z-10" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                Free PDF Editor - No Subscription Required
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The best free PDF editor online. Edit PDF text, merge, split, compress, and convert PDFs - all free, no subscription needed. No sign-up required. All processing happens in your browser.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {tools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>

            {/* SEO Content Section */}
            <div className="mb-12 prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-muted/30 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Free PDF Editor - The Best Alternative to Paid PDF Software</h2>
                <p className="text-muted-foreground mb-4">
                  Tired of expensive PDF editing software subscriptions? PDF Toolkit is the <strong>best free PDF editor online</strong> that lets you 
                  <strong> edit PDF text</strong>, <strong>merge PDF files</strong>, <strong>split PDF documents</strong>, 
                  <strong>compress PDF files</strong>, and <strong>convert PDF to images</strong> - all completely free, no subscription required.
                </p>
                <p className="text-muted-foreground mb-4">
                  Unlike expensive PDF editing software that charges monthly fees, our <strong>free PDF editor</strong> works entirely in your browser. 
                  No downloads, no installations, no credit card required. Edit PDF text online with our powerful <strong>PDF text editor</strong> that 
                  lets you see and edit text directly in the PDF preview - just like professional PDF editing software, but 100% free.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-3">Why Use Our Free PDF Editor Instead of Paid Software?</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>100% Free Forever</strong> - No subscriptions, no hidden fees, no premium tiers. Everything is free.</li>
                  <li><strong>No Subscription Required</strong> - Edit PDFs without expensive monthly fees or annual contracts</li>
                  <li><strong>Edit PDF Text Online</strong> - Our PDF text editor lets you click and edit text directly in the PDF preview</li>
                  <li><strong>No Registration Required</strong> - Start editing PDFs immediately without creating an account</li>
                  <li><strong>100% Private & Secure</strong> - All processing happens in your browser, files never uploaded to servers</li>
                  <li><strong>Works on All Devices</strong> - Edit PDFs on desktop, tablet, or mobile - no software installation needed</li>
                  <li><strong>No File Size Limits</strong> - Process PDFs of any size (limited only by your browser's memory)</li>
                  <li><strong>Fast & Reliable</strong> - Process PDFs instantly without waiting for server uploads or processing queues</li>
                </ul>
                <h3 className="text-xl font-bold mt-6 mb-3">Complete Free PDF Editor Features</h3>
                <p className="text-muted-foreground mb-4">
                  Our <strong>free PDF editor</strong> includes everything you need to work with PDFs:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Edit PDF Text</strong> - Click and edit text directly in PDF documents with visual preview</li>
                  <li><strong>Merge PDF Files</strong> - Combine multiple PDFs into one document</li>
                  <li><strong>Split PDF Documents</strong> - Extract pages or split PDFs by page ranges</li>
                  <li><strong>Compress PDF Files</strong> - Reduce PDF file size while maintaining quality</li>
                  <li><strong>Rotate PDF Pages</strong> - Rotate pages by 90°, 180°, or 270°</li>
                  <li><strong>Convert PDF to Images</strong> - Convert PDF pages to PNG or JPG images</li>
                  <li><strong>Convert Images to PDF</strong> - Combine multiple images into a single PDF</li>
                  <li><strong>Extract PDF Pages</strong> - Extract specific pages from PDF documents</li>
                  <li><strong>Add Watermarks</strong> - Add text or image watermarks to PDFs</li>
                </ul>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-12">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      ✓
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">100% Free</h3>
                    <p className="text-sm text-muted-foreground">
                      All tools are completely free to use. No hidden fees or subscriptions.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      🔒
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      All processing happens in your browser. Your files never leave your device.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      ⚡
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">No Sign-Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Start using our tools immediately. No account creation required.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          {/* Right Sidebar Ad - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0 pt-8">
            <div className="sticky top-4">
              <AdBanner 
                adFormat="rectangle" 
                className="w-full"
                style={{ minHeight: "600px", maxWidth: "250px" }}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-12 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
                <a href="/terms" className="hover:underline">Terms of Service</a>
              </div>
              <p className="mb-2">
                © 2026 Sunshine Tech Solutions. All rights reserved.
              </p>
              <p>
                Free PDF tools for everyone. Process your documents securely in your browser.
              </p>
            </div>
        </div>
      </footer>
      </PageLayout>
    </>
  )
}
