import { describe, it, expect } from "vitest";
import { flattenPDF } from "../pdf-flatten";
import { createPdfWithPages, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("flattenPDF", () => {
  it("returns a valid PDF with same page count", async () => {
    const bytes = await createPdfWithPages(3);
    const fileLike = fileLikeFromBytes(bytes);

    const result = await flattenPDF(fileLike as File);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(3);
  });

  it("works on single-page PDF", async () => {
    const bytes = await createPdfWithPages(1);
    const fileLike = fileLikeFromBytes(bytes);
    const result = await flattenPDF(fileLike as File);
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });
});
