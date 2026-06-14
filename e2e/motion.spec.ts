import { test, expect } from "@playwright/test";

test.describe("editorial motion", () => {
  test("uses native view transitions across primary route links", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const win = window as Window & { __viewTransitionCalls?: number };
      const doc = document as Document & {
        startViewTransition?: (
          callback?: () => void | Promise<void>,
        ) => ViewTransition;
      };
      const nativeStartViewTransition = doc.startViewTransition?.bind(document);

      win.__viewTransitionCalls = 0;
      doc.startViewTransition = (callback?: () => void | Promise<void>) => {
        win.__viewTransitionCalls = (win.__viewTransitionCalls ?? 0) + 1;

        if (nativeStartViewTransition) {
          return nativeStartViewTransition(callback);
        }

        const updateCallbackDone = Promise.resolve()
          .then(() => callback?.())
          .then(() => undefined);

        return {
          finished: updateCallbackDone,
          ready: Promise.resolve(),
          updateCallbackDone,
          skipTransition: () => undefined,
        };
      };
    });

    for (const target of [
      { label: "Process", path: "/process" },
      { label: "Gallery", path: "/gallery" },
      { label: "Contact", path: "/contact" },
    ]) {
      await page.goto("/");
      const callsBefore = await page.evaluate(
        () =>
          (window as Window & { __viewTransitionCalls?: number })
            .__viewTransitionCalls ?? 0,
      );

      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: target.label })
        .click();

      await expect(page).toHaveURL(target.path);
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              (window as Window & { __viewTransitionCalls?: number })
                .__viewTransitionCalls ?? 0,
          ),
        )
        .toBeGreaterThan(callsBefore);
    }
  });

  test("mobile menu toggle opens and closes the nav", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const toggle = page.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    await expect(
      page.getByRole("navigation", { name: /primary mobile/i }),
    ).toHaveCount(0);

    await toggle.click();
    await expect(
      page.getByRole("navigation", { name: /primary mobile/i }),
    ).toBeVisible();

    await toggle.click();
    await expect(
      page.getByRole("navigation", { name: /primary mobile/i }),
    ).toHaveCount(0);
  });

  test("floating booking CTA appears after scrolling and is suppressed on contact", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const floatingCta = page.getByTestId("floating-cta");
    await expect(floatingCta).toHaveAttribute("aria-hidden", "true");
    await expect(floatingCta).toHaveAttribute("tabindex", "-1");

    await page.evaluate(() => window.scrollTo(0, 360));

    await expect(floatingCta).toHaveAttribute("aria-hidden", "false");
    await expect(floatingCta).toHaveAttribute("tabindex", "0");
    await expect
      .poll(() => floatingCta.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");

    await page
      .getByRole("navigation", { name: /^primary$/i })
      .getByRole("link", { name: "Contact" })
      .click();

    await expect(page).toHaveURL("/contact");
    await expect(page.getByTestId("floating-cta")).toHaveCount(0);
  });

  test("hero content remains static during initial load", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    const animationName = await heading.evaluate(
      (el) => getComputedStyle(el).animationName,
    );
    expect(animationName).toBe("none");
  });
});
