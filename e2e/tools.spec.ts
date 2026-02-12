import { test, expect } from "@playwright/test";
import path from "path";

const FIXTURES = {
  pdf: path.join(__dirname, "fixtures", "sample.pdf"),
  png: path.join(__dirname, "fixtures", "sample.png"),
};

test.describe("All 12 PDF tools", () => {
  test("1. Edit Text – upload and editor or message appears", async ({ page }) => {
    await page.goto("/tools/edit-text", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await expect(
      page.getByText(/extracted|no text|edit text|click.*text|selectable text/i).first()
    ).toBeVisible({ timeout: 15000 });
  });

  test("2. Merge PDF – two files produce download", async ({ page }) => {
    await page.goto("/tools/merge", { waitUntil: "domcontentloaded" });
    const input = page.locator('input[type="file"]');
    await input.setInputFiles([FIXTURES.pdf, FIXTURES.pdf]);
    await page.getByText("Merging PDFs...").waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("3. Split PDF – split by page produces results", async ({ page }) => {
    await page.goto("/tools/split", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await page.getByPlaceholder("1,3,5,7").fill("1");
    await page.getByRole("button", { name: /^Split PDF$/ }).click();
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("4. Compress PDF – file produces download", async ({ page }) => {
    await page.goto("/tools/compress", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await page.getByText("Compressing PDF...").waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("5. Rotate PDF – file produces download", async ({ page }) => {
    await page.goto("/tools/rotate", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("6. PDF to Images – file produces images", async ({ page }) => {
    await page.goto("/tools/pdf-to-images", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await page.getByRole("button", { name: /convert to images/i }).click();
    await expect(
      page.getByRole("button", { name: /download all images/i })
    ).toBeVisible({ timeout: 15000 });
  });

  test("7. Images to PDF – image produces download", async ({ page }) => {
    await page.goto("/tools/images-to-pdf", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.png);
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("8. Extract Pages – extract page 1 produces download", async ({ page }) => {
    await page.goto("/tools/extract-pages", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await page.getByPlaceholder("1,3,5 or 1-5,7-10").fill("1");
    await page.getByRole("button", { name: /extract pages/i }).click();
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("9. Add Watermark – file produces download", async ({ page }) => {
    await page.goto("/tools/watermark", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await page.getByText("Adding watermark...").waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("10. Remove Pages – remove page 2 produces download", async ({ page }) => {
    await page.goto("/tools/remove-pages", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await page.getByPlaceholder("1,3,5 or 1-5,7-10").fill("2");
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("11. Reorder Pages – reorder then download", async ({ page }) => {
    await page.goto("/tools/reorder-pages", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await expect(page.getByText(/page order|2 page/i).first()).toBeVisible({ timeout: 10000 });
    await page.locator('div.rounded-lg').filter({ has: page.getByText("Page 1") }).locator("button").nth(1).click();
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test("12. Flatten PDF – file produces download", async ({ page }) => {
    await page.goto("/tools/flatten-pdf", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.pdf);
    await expect(page.getByRole("button", { name: /download/i }).first()).toBeVisible({
      timeout: 15000,
    });
  });
});
