import { describe, it, expect } from "vitest";
import { pdfToImages } from "../pdf-to-images";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";

describe("pdfToImages (browser-only)", () => {
  it("throws in Node (browser required)", async () => {
    const fileLike = fileLikeFromBytes(await createMinimalPdf());
    await expect(
      pdfToImages(fileLike as File, { format: "png" })
    ).rejects.toThrow(/browser/);
  });
});
