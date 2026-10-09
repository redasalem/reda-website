import { test, expect } from "@playwright/test";
test("server content, SEO, and mobile layout remain usable without 3D", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Thoughtful interfaces.");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /reda-website/);
  await expect(page.getByTestId("static-sculpture")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('a[href*="secret-admin"]')).toHaveCount(0);
});
test("real WebGL mounts and context loss restores the static fallback", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error: Error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible({ timeout: 20000 });
  await page.mouse.move(950, 350);
  await page.getByRole("button", { name: /Pause 3D/ }).click();
  await expect(page.getByRole("button", { name: /Resume 3D/ })).toBeVisible();
  await page.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true })));
  await expect(page.getByTestId("static-sculpture")).toBeVisible();
  if (errors.length > 0) throw new Error("Page errors: " + errors.join("; "));
});
test("studio is noindex and does not expose CRUD to visitors", async ({ page }) => {
  await page.goto("/secret-admin-studio");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("button", { name: "Create project" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Welcome back|Studio setup required/ })).toBeVisible();
});
test("resume and generated Open Graph image resolve", async ({ page, request }) => {
  await page.goto("/download");
  await expect(page.locator("h1")).toHaveText("Reda Salem");
  const response = await request.get("/opengraph-image");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/png");
});
