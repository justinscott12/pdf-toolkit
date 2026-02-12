import { describe, it, expect } from "vitest";
import { removePages } from "../pdf-remove-pages";
import { createPdfWithPages, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("removePages", () => {
  it("removes specified pages", async () => {
    const bytes = await createPdfWithPages(4);
    const fileLike = fileLikeFromBytes(bytes);

    const result = await removePages(fileLike as File, { pages: [2, 4] });

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(2);
  });

  it("removes one page", async () => {
    const bytes = await createPdfWithPages(3);
    const fileLike = fileLikeFromBytes(bytes);
    const result = await removePages(fileLike as File, { pages: [1] });
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(2);
  });

  it("throws when no valid pages to remove", async () => {
    const bytes = await createPdfWithPages(2);
    const fileLike = fileLikeFromBytes(bytes);
    await expect(
      removePages(fileLike as File, { pages: [5, 6] })
    ).rejects.toThrow("No valid pages to remove");
  });
});
