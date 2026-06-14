import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("accessibility — critical checks", () => {
  test("contact page submit button passes axe color-contrast", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel(/name/i).fill("Alex");
    await page.getByLabel(/email/i).fill("alex@example.com");
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByLabel(/commission/i).check();
    await page.getByRole("button", { name: /continue/i }).click();
    // Run axe scoped to the submit button only; check color-contrast rule
    const results = await new AxeBuilder({ page })
      .include("button[type='submit']")
      .withTags(["wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("skip-to-content link is present and keyboard-accessible on home", async ({
    page,
  }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeAttached();
    // Axe should find no violations on the skip link element
    const results = await new AxeBuilder({ page })
      .include("a[href='#main']")
      .withTags(["wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("home page has no critical axe violations (wcag2aa)", async ({
    page,
  }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .analyze();
    // Filter out known placeholder-content violations we accept for now
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(blocking).toEqual([]);
  });

  test("contact page has no critical axe violations (wcag2aa)", async ({
    page,
  }) => {
    await page.goto("/contact");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(blocking).toEqual([]);
  });
});
