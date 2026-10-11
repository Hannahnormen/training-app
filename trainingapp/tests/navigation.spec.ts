import { test, expect } from "@playwright/test";

test("Render navigation menu", async ({ page }) => {
  await page.goto("http://localhost:5173/");

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

test("Navigate to Create Workout", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page
    .getByRole("link", { name: "Create Workout", exact: true })
    .click();

  await expect(page).toHaveURL(/\/compose-workout$/);
  await expect(page.getByText("Choose warmup")).toBeVisible();
});

test("Navigate to My Workouts", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page
    .getByRole("link", { name: "My Workout", exact: true })
    .click();

  await expect(page).toHaveURL(/\/view-workouts$/);
  await expect(
    page.getByRole("heading", { name: "My Workouts" })
  ).toBeVisible();
});

test("Show page not found", async ({ page }) => {
  await page.goto("http://localhost:5173/bad-url");

  await expect(
    page.getByRole("heading", { name: "Page not found" })
  ).toBeVisible();
});