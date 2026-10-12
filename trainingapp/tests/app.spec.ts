import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/Our Training App/);
  await expect(
    page.getByRole("heading", { name: "Our workout app" })
  ).toBeVisible();
});
