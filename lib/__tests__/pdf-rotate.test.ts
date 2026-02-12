import { describe, it, expect } from "vitest";
import { rotatePDF } from "../pdf-rotate";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("rotatePDF", () => {
  it("rotates all pages by 90 degrees", async () => {
    const bytes = await createMinimalPdf();
    const fileLike = fileLikeFromBytes(bytes);

    const result = await rotatePDF(fileLike as File, { angle: 90 });

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });

  it("returns valid PDF for 180 rotation", async () => {
    const bytes = await createMinimalPdf();
    const fileLike = fileLikeFromBytes(bytes);
    const result = await rotatePDF(fileLike as File, { angle: 180 });
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });
});
