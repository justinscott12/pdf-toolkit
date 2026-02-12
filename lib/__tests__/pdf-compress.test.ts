import { describe, it, expect } from "vitest";
import { compressPDF } from "../pdf-compress";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";
import { PDFDocument } from "pdf-lib";

describe("compressPDF", () => {
  it("returns a valid PDF blob", async () => {
    const bytes = await createMinimalPdf();
    const fileLike = fileLikeFromBytes(bytes);

    const result = await compressPDF(fileLike as File);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
    const pdf = await PDFDocument.load(await result.arrayBuffer());
    expect(pdf.getPageCount()).toBe(1);
  });

  it("accepts quality option", async () => {
    const fileLike = fileLikeFromBytes(await createMinimalPdf());
    const result = await compressPDF(fileLike as File, { quality: "high" });
    expect(result.size).toBeGreaterThan(0);
  });
});
