import { test, expect } from "@playwright/test";

test("Render initial workout", async ({ page }) => {
  await page.goto("http://localhost:5173/view-workouts");

  await expect(
    page.getByRole("heading", { name: "My Workouts" })
  ).toBeVisible();

  await expect(page.getByText("Workout #1")).toBeVisible();

  await expect(page.getByText("Power walk")).toBeVisible();
  await expect(page.getByText("Pushups")).toBeVisible();
  await expect(page.getByText("Pullups")).toBeVisible();
  await expect(page.getByText("Jumping Jacks")).toBeVisible();
  await expect(page.getByText("Stretching")).toBeVisible();

  await expect(page.getByText("Total 5 exercises")).toBeVisible();

  await expect(page.getByText("75 min")).toBeVisible();
});

test("Navigate to Do Workout", async ({ page }) => {
  await page.goto("http://localhost:5173/view-workouts");

  await page.getByRole("button", { name: "Do workout" }).click();

  await expect(page).toHaveURL(/\/do-workout\/.+/);

  await expect(
    page.getByText("Active Workout")
  ).toBeVisible();
});