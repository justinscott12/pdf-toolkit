import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { BASE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Free PDF Editor - Edit PDF Text Online | 100% Free | No Subscription Required",
    template: "%s | Free PDF Editor - No Subscription Required",
  },
  description: "Free PDF editor to edit PDF text online. No subscription needed. Edit, merge, split, compress PDFs - all free, no sign-up required. Better alternative to paid PDF editors. All processing happens in your browser.",
  keywords: [
    "free pdf editor",
    "edit pdf online",
    "edit pdf text",
    "pdf editor free",
    "free pdf editor online",
    "pdf text editor",
    "online pdf editor",
    "free pdf editing software",
    "edit pdf files online",
    "pdf editor no download",
    "free pdf editor alternative",
    "pdf merge",
    "split pdf",
    "compress pdf",
    "pdf to jpg",
    "jpg to pdf",
    "rotate pdf",
    "pdf tools",
    "free pdf tools",
    "pdf converter",
    "merge pdf online",
    "split pdf online",
    "compress pdf online",
    "pdf to image converter",
    "image to pdf converter",
    "pdf watermark",
    "extract pdf pages",
    "online pdf tools",
    "pdf utilities",
  ],
  authors: [{ name: "PDF Toolkit" }],
  creator: "PDF Toolkit",
  publisher: "PDF Toolkit",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Free PDF Toolkit - Merge, Split, Compress PDFs Online",
    description: "Free online PDF tools to merge, split, compress, rotate, and convert PDFs. No sign-up required. All processing happens in your browser.",
    siteName: "PDF Toolkit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDF Toolkit - Free Online PDF Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Toolkit - Online PDF Tools",
    description: "Free online PDF tools to merge, split, compress, and convert PDFs. No sign-up required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  other: {
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION,
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
