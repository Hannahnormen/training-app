import { test, expect, Locator } from "@playwright/test";

test("Render the navigation menu", async ({ page }) => {
  await page.goto("http://localhost:5173/page-not-found");
  await expect(
    page.getByRole("link", { name: "Home", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Create Workout", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "My Workout", exact: true })
  ).toBeVisible();
});

test("Navigate to Home", async ({ page }) => {
  await page.goto("http://localhost:5173/page-not-found");
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.waitForURL("**/");
  await expect(page.getByText("Our workout app")).toBeVisible();
});

test("Navigate to Create Workout", async ({ page }) => {
  await page.goto("http://localhost:5173/page-not-found");
  await page.getByRole("link", { name: "Create Workout", exact: true }).click();
  await page.waitForURL("**/compose-workout");
  await expect(
    page.getByRole("heading", {name: "Our workout app"})
  ).toBeVisible();
});

test("Navigate to My Workout", async ({ page }) => {
  await page.goto("http://localhost:5173/page-not-found");
  await page.getByRole("link", { name: "My Workout", exact: true }).click();
  await page.waitForURL("**/view-workouts");
  await expect(
    page.getByRole("heading", {name: "Our workout app"})
  ).toBeVisible();
});

test("Navigate to Page Not Found", async ({ page }) => {
  await page.goto("http://localhost:5173/bad-url");
  await expect(
    page.getByRole("heading", {name: "Our workout app"})
  ).toBeVisible();
});
