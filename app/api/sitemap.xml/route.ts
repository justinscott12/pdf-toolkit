import { NextResponse } from "next/server"

const tools = [
  "/tools/edit-text",
  "/tools/merge",
  "/tools/split",
  "/tools/compress",
  "/tools/rotate",
  "/tools/pdf-to-images",
  "/tools/images-to-pdf",
  "/tools/extract-pages",
  "/tools/watermark",
  "/tools/remove-pages",
  "/tools/reorder-pages",
  "/tools/flatten-pdf",
]

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pdftoolkit.com"
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${tools
    .map(
      (tool) => `  <url>
    <loc>${baseUrl}${tool}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

