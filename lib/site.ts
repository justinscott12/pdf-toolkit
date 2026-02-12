/**
 * Canonical base URL for the site. Set NEXT_PUBLIC_BASE_URL in production.
 * Used for sitemap, canonical tags, structured data, and Open Graph URLs.
 */
export const BASE_URL =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")
    : "https://pdftoolkit.live";
