import { describe, it, expect } from "vitest";
import { splitPDF } from "../pdf-split";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("splitPDF", () => {
  it("splits by individual pages", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 400]);
    doc.addPage([300, 400]);
    const bytes = await doc.save();
    const fileLike = fileLikeFromBytes(bytes);

    const results = await splitPDF(fileLike as File, {
      splitBy: "pages",
      pages: [1, 2],
    });

    expect(results).toHaveLength(2);
    expect(results[0].size).toBeGreaterThan(0);
    expect(results[1].size).toBeGreaterThan(0);
    const p1 = await PDFDocument.load(await results[0].arrayBuffer());
    const p2 = await PDFDocument.load(await results[1].arrayBuffer());
    expect(p1.getPageCount()).toBe(1);
    expect(p2.getPageCount()).toBe(1);
  });

  it("splits by range", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([300, 400]);
    doc.addPage([300, 400]);
    doc.addPage([300, 400]);
    const bytes = await doc.save();
    const fileLike = fileLikeFromBytes(bytes);

    const results = await splitPDF(fileLike as File, {
      splitBy: "ranges",
      ranges: [{ start: 1, end: 2 }, { start: 3, end: 3 }],
    });

    expect(results).toHaveLength(2);
    const first = await PDFDocument.load(await results[0].arrayBuffer());
    const second = await PDFDocument.load(await results[1].arrayBuffer());
    expect(first.getPageCount()).toBe(2);
    expect(second.getPageCount()).toBe(1);
  });
});
