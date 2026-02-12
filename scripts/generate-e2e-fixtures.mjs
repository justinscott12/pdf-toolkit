#!/usr/bin/env node
/**
 * Generates e2e/fixtures/sample.pdf (2 pages) and sample.png (1x1 PNG) for Playwright E2E.
 * Run: node scripts/generate-e2e-fixtures.mjs
 */
import { PDFDocument } from "pdf-lib";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "e2e", "fixtures");

if (!existsSync(fixturesDir)) {
  mkdirSync(fixturesDir, { recursive: true });
}

// 2-page PDF for merge (use twice), split, extract, remove, reorder, etc.
const doc = await PDFDocument.create();
doc.addPage([300, 400]);
doc.addPage([300, 400]);
const pdfBytes = await doc.save();
writeFileSync(join(fixturesDir, "sample.pdf"), pdfBytes);
console.log("Wrote e2e/fixtures/sample.pdf");

// Minimal 1x1 PNG (smallest valid PNG)
const minimalPngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
writeFileSync(
  join(fixturesDir, "sample.png"),
  Buffer.from(minimalPngBase64, "base64")
);
console.log("Wrote e2e/fixtures/sample.png");
