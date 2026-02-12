import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads and shows PDF Toolkit", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("PDF Toolkit").first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Free PDF Editor/i).first()).toBeVisible();
  });

  test("homepage lists tool links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: /Merge PDF/i })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("link", { name: /Split PDF/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Compress PDF/i })).toBeVisible();
  });

  test("merge tool page loads", async ({ page }) => {
    await page.goto("/tools/merge", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Merge PDF Files").first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Combine multiple PDF/i).first()).toBeVisible();
  });

  test("split tool page loads", async ({ page }) => {
    await page.goto("/tools/split", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Split PDF").first()).toBeVisible({ timeout: 15000 });
  });

  test("compress tool page loads", async ({ page }) => {
    await page.goto("/tools/compress", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Compress PDF").first()).toBeVisible({ timeout: 15000 });
  });

  test("how-to-merge guide loads", async ({ page }) => {
    await page.goto("/how-to-merge-pdf", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/How to Merge PDF Files/i).first()).toBeVisible({ timeout: 15000 });
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
  });

  test("sitemap is reachable", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBe(true);
    expect(await res.text()).toMatch(/pdftoolkit\.(com|live)/);
  });

  test("robots.txt is reachable", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain("Sitemap:");
  });
});
