import { describe, it, expect } from "vitest";
import { mergePDFs } from "../pdf-merge";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("mergePDFs", () => {
  it("merges two PDFs into one blob", async () => {
    const bytes = await createMinimalPdf();
    const fileLike = fileLikeFromBytes(bytes);

    const result = await mergePDFs([fileLike as File, fileLike as File]);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    expect(result.size).toBeGreaterThan(0);

    const loaded = await PDFDocument.load(await result.arrayBuffer());
    expect(loaded.getPageCount()).toBe(2);
  });

  it("single file returns one-page PDF", async () => {
    const fileLike = fileLikeFromBytes(await createMinimalPdf());
    const result = await mergePDFs([fileLike as File]);
    const loaded = await PDFDocument.load(await result.arrayBuffer());
    expect(loaded.getPageCount()).toBe(1);
  });
});
