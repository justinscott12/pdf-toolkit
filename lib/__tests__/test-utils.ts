import { PDFDocument } from "pdf-lib";

/**
 * Creates a minimal valid PDF as Uint8Array (for use in Node tests).
 */
export async function createMinimalPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.addPage([300, 400]);
  return doc.save();
}

/** File-like: only arrayBuffer() is required by our lib functions. */
export type FileLike = { arrayBuffer: () => Promise<ArrayBuffer> };

/**
 * File-like object for lib functions that take File. Works in Node 18+ (no global File needed).
 */
export function fileLikeFromBytes(bytes: Uint8Array): FileLike {
  return {
    arrayBuffer: async () =>
      bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  };
}

/**
 * Create a File-like suitable for mergePDFs, splitPDF, etc. Cast to File when calling lib.
 */
export async function createTestPdfFileLike(): Promise<FileLike> {
  const bytes = await createMinimalPdf();
  return fileLikeFromBytes(bytes);
}
