import { test, expect } from "@playwright/test";

test("gallery uses a bento grid with explicit image dimensions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/gallery");

  const featuredCard = page.locator('[data-testid="gallery-card"]').nth(0);
  await expect(featuredCard).toHaveAttribute("data-featured", "true");
  await expect(featuredCard).toHaveCSS("grid-column-end", "span 2");
  await expect(featuredCard).toHaveCSS("grid-row-end", "span 2");

  const aspectRatios = await page
    .locator(".gallery-image")
    .evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).aspectRatio),
    );

  expect(aspectRatios.length).toBeGreaterThan(0);
  expect(aspectRatios.every((ratio) => ratio !== "auto")).toBe(true);
});
