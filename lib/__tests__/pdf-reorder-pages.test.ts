import { describe, it, expect } from "vitest";
import { reorderPages } from "../pdf-reorder-pages";
import { createPdfWithPages, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("reorderPages", () => {
  it("reorders pages correctly", async () => {
    const bytes = await createPdfWithPages(3);
    const fileLike = fileLikeFromBytes(bytes);

    const result = await reorderPages(fileLike as File, {
      pageOrder: [3, 1, 2],
    });

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(3);
  });

  it("returns valid PDF for identity order", async () => {
    const bytes = await createPdfWithPages(2);
    const fileLike = fileLikeFromBytes(bytes);
    const result = await reorderPages(fileLike as File, { pageOrder: [1, 2] });
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(2);
  });

  it("throws when page order is invalid", async () => {
    const bytes = await createPdfWithPages(2);
    const fileLike = fileLikeFromBytes(bytes);
    await expect(
      reorderPages(fileLike as File, { pageOrder: [10, 20] })
    ).rejects.toThrow("Invalid page order");
  });
});
