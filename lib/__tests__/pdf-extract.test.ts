import { describe, it, expect } from "vitest";
import { extractPages } from "../pdf-extract";
import { createPdfWithPages, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("extractPages", () => {
  it("extracts specified pages into a new PDF", async () => {
    const bytes = await createPdfWithPages(5);
    const fileLike = fileLikeFromBytes(bytes);

    const result = await extractPages(fileLike as File, { pages: [1, 3, 5] });

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(3);
  });

  it("extracts a single page", async () => {
    const bytes = await createPdfWithPages(3);
    const fileLike = fileLikeFromBytes(bytes);
    const result = await extractPages(fileLike as File, { pages: [2] });
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });

  it("throws when no valid pages", async () => {
    const bytes = await createPdfWithPages(2);
    const fileLike = fileLikeFromBytes(bytes);
    await expect(
      extractPages(fileLike as File, { pages: [10, 11] })
    ).rejects.toThrow("No valid pages to extract");
  });
});
