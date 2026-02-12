import { NextResponse } from "next/server";

/**
 * Serves ads.txt at /ads.txt for AdSense authorization.
 * Set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID (e.g. ca-pub-xxxxxxxxxxxxx) in your environment.
 * See: https://support.google.com/adsense/answer/12171612
 */
export function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();

  if (!publisherId) {
    return new NextResponse(
      "# ads.txt – Add NEXT_PUBLIC_ADSENSE_PUBLISHER_ID in Netlify/Vercel to enable AdSense authorization\n",
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }

  const line = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;
  return new NextResponse(line, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
