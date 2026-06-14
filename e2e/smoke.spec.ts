import { test, expect } from "@playwright/test";
import { profile } from "../src/content/profile";

test("home → projects → contact", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: profile.name }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: profile.bookingCtaLabel }).first(),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: /^primary$/i })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Projects" }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: /^primary$/i })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Contact" }),
  ).toBeVisible();
});
