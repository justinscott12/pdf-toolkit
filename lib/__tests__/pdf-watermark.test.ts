import { describe, it, expect } from "vitest";
import { addWatermark } from "../pdf-watermark";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("addWatermark", () => {
  it("adds text watermark and returns valid PDF", async () => {
    const bytes = await createMinimalPdf();
    const fileLike = fileLikeFromBytes(bytes);

    const result = await addWatermark(fileLike as File, {
      text: "CONFIDENTIAL",
      position: "center",
    });

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    expect(result.size).toBeGreaterThan(0);
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });

  it("accepts default options", async () => {
    const fileLike = fileLikeFromBytes(await createMinimalPdf());
    const result = await addWatermark(fileLike as File);
    expect(result.size).toBeGreaterThan(0);
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });
});
