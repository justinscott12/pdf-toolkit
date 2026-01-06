"use client"

import { ReactNode } from "react"
import { AdBanner } from "@/components/AdBanner"

interface PageLayoutProps {
  children: ReactNode
  fullWidthHeader?: boolean
}

export function PageLayout({ children, fullWidthHeader = false }: PageLayoutProps) {
  if (fullWidthHeader) {
    return (
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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
        <main className="flex-1 min-w-0 max-w-5xl mx-auto">
          {children}
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
  )
}

