import { describe, it, expect } from "vitest";
import { imagesToPDF } from "../images-to-pdf";

// Minimal 1x1 PNG (smallest valid PNG)
const MINIMAL_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function createImageFile(): File {
  const bytes = Uint8Array.from(atob(MINIMAL_PNG_BASE64), (c) => c.charCodeAt(0));
  return new File([bytes], "test.png", { type: "image/png" });
}

describe("imagesToPDF", () => {
  it("rejects in Node (no DOM Image/FileReader)", async () => {
    const file = createImageFile();
    await expect(imagesToPDF([file])).rejects.toThrow();
  });
});
