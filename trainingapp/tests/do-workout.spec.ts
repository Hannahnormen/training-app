import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/view-workouts");

  await page.getByRole("button", { name: "Do workout" }).click();
});

test("Render active workout", async ({ page }) => {
  await expect(page.getByText("Active Workout")).toBeVisible();

  await expect(page.getByText("Exercises to complete")).toBeVisible();

  await expect(page.getByRole("checkbox")).toHaveCount(5);

  await expect(
    page.getByRole("button", { name: "Finish Workout" })
  ).toBeDisabled();
});

test("Complete a workout", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");

  for (let i = 0; i < 5; i++) {
    await checkboxes.nth(i).check();
  }

  await expect(
    page.getByRole("button", { name: "Finish Workout" })
  ).toBeEnabled();

  await page.getByRole("button", { name: "Finish Workout" }).click();

  await expect(
    page.getByText("Workout completed!")
  ).toBeVisible();

  await expect(
    page.getByText("Completed workouts: 1")
  ).toBeVisible();
});

test("Keep completed workout", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");

  for (let i = 0; i < 5; i++) {
    await checkboxes.nth(i).check();
  }

  await page.getByRole("button", { name: "Finish Workout" }).click();

  await page.getByRole("button", { name: "Keep Workout" }).click();

  await expect(page).toHaveURL(/\/view-workouts$/);

  await expect(page.getByText("Workout #1")).toBeVisible();
});

test("Delete completed workout", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");

  for (let i = 0; i < 5; i++) {
    await checkboxes.nth(i).check();
  }

  await page.getByRole("button", { name: "Finish Workout" }).click();

  await page.getByRole("button", { name: "Delete Workout" }).click();

  await expect(page).toHaveURL(/\/view-workouts$/);

  await expect(
    page.getByText("You have no saved workouts yet.")
  ).toBeVisible();
});