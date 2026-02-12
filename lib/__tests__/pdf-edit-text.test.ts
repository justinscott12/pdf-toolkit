import { describe, it, expect } from "vitest";
import { extractPDFText, replacePDFText } from "../pdf-edit-text";
import { createMinimalPdf, fileLikeFromBytes } from "./test-utils";

describe("pdf-edit-text (browser-only)", () => {
  it("extractPDFText throws in Node (browser required)", async () => {
    const fileLike = fileLikeFromBytes(await createMinimalPdf());
    await expect(
      extractPDFText(fileLike as File)
    ).rejects.toThrow(/browser/);
  });

  it("replacePDFText throws in Node (browser required)", async () => {
    const fileLike = fileLikeFromBytes(await createMinimalPdf());
    await expect(
      replacePDFText(fileLike as File, [])
    ).rejects.toThrow(/browser/);
  });
});
