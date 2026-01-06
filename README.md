# PDF Toolkit

A free, ad-supported PDF toolkit web application built with Next.js. All PDF processing happens client-side in the browser, ensuring privacy and zero server costs.

## Features

- **Merge PDFs** - Combine multiple PDF files into one document
- **Split PDF** - Extract pages or split PDF by page ranges
- **Compress PDF** - Reduce PDF file size while maintaining quality
- **Rotate PDF** - Rotate all pages by 90°, 180°, or 270°
- **PDF to Images** - Convert PDF pages to PNG or JPG images
- **Images to PDF** - Combine multiple images into a single PDF
- **Extract Pages** - Extract specific pages from a PDF document
- **Add Watermark** - Add text watermark to all pages
- **Edit Text** - Edit text content in PDFs
- **Flatten PDF** - Flatten form fields and annotations
- **Reorder Pages** - Rearrange PDF page order

## Tech Stack

### Core Technologies
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components

### PDF Processing Libraries
- **pdf-lib** - PDF manipulation library
- **pdfjs-dist** - PDF.js for rendering and text extraction
- **jspdf** - PDF creation from images
- **browser-image-compression** - Image optimization

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pdftoolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file (optional, for AdSense):**
   ```env
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxx
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Privacy & Security

- ✅ All PDF processing happens **client-side** in the user's browser
- ✅ Files never leave the user's device
- ✅ No server-side processing or storage
- ✅ No user accounts or authentication required
- ✅ No data collection or tracking
- ✅ Open source PDF libraries (pdf-lib, pdfjs-dist, jspdf)

### Copyright & Legal Notice

All PDF processing libraries used are open source:
- **pdfjs-dist** (Mozilla) - Apache License 2.0
- **pdf-lib** (Hopding, LLC) - Apache License 2.0
- **jspdf** (James Hall) - MIT License

This project is 100% legal and copyright-compliant. No proprietary software or code is used.

## SEO & Marketing

### SEO Features
- All pages include SEO-optimized metadata
- Dynamic sitemap generation at `/api/sitemap.xml`
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for better search engine understanding
- Robots.txt configuration
- Canonical URLs

### Ad Integration

The app supports Google AdSense integration. Set the `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` environment variable to enable ads. Ad placements include:

- Header banner (horizontal)
- Sidebar (rectangle)
- In-content ads
- Footer banner

### Target Keywords

High-volume keywords targeted:
- merge pdf (49,500/mo)
- compress pdf (40,500/mo)
- split pdf (22,200/mo)
- pdf to jpg (18,100/mo)
- jpg to pdf (14,800/mo)

## Project Structure

```
pdftoolkit/
├── app/
│   ├── tools/              # Individual tool pages
│   │   ├── merge-pdf/
│   │   ├── split-pdf/
│   │   ├── compress-pdf/
│   │   ├── rotate-pdf/
│   │   ├── pdf-to-images/
│   │   ├── images-to-pdf/
│   │   ├── extract-pages/
│   │   ├── watermark/
│   │   ├── edit-text/
│   │   ├── flatten-pdf/
│   │   └── reorder-pages/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── PDFUploader.tsx     # File upload component
│   ├── PDFPreview.tsx      # PDF preview component
│   ├── AdBanner.tsx         # AdSense integration
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── pdf-merge.ts        # PDF merging logic
│   ├── pdf-split.ts        # PDF splitting logic
│   ├── pdf-compress.ts     # PDF compression logic
│   └── ...                  # Other PDF operation libraries
└── public/                  # Static assets
```

## Available Tools

### Merge PDFs
Combine multiple PDF files into a single document. Supports drag-and-drop file selection.

### Split PDF
Extract specific pages or split PDF by page ranges. Useful for extracting specific sections.

### Compress PDF
Reduce PDF file size while maintaining quality. Optimizes images and removes unnecessary data.

### Rotate PDF
Rotate all pages by 90°, 180°, or 270°. Useful for correcting document orientation.

### PDF to Images
Convert PDF pages to PNG or JPG images. Selectable image format and quality.

### Images to PDF
Combine multiple images into a single PDF document. Supports various image formats.

### Extract Pages
Extract specific pages from a PDF document. Select individual pages or ranges.

### Add Watermark
Add text watermark to all pages. Customizable text, position, and opacity.

### Edit Text
Edit text content in PDFs. Visual editor with text extraction and replacement.

### Flatten PDF
Flatten form fields and annotations. Makes PDFs read-only and reduces file size.

### Reorder Pages
Rearrange PDF page order. Drag-and-drop interface for easy reordering.

## Customization

### Adding New Tools

1. Create a new tool page in `app/tools/[tool-name]/`
2. Create corresponding library function in `lib/`
3. Add tool card to homepage
4. Update sitemap and navigation

### Styling

The project uses Tailwind CSS with shadcn/ui components. Customize colors and spacing in `tailwind.config.js`.

## Deployment

The application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

### Environment Variables

For production, set:
- `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` - Google AdSense publisher ID
- `NEXT_PUBLIC_BASE_URL` - Your production URL

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
