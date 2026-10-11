import { test, expect } from "@playwright/test";

const mockExercises = [
  { name: "Pushups", type: "strength" },
  { name: "Pullups", type: "strength" },
  { name: "Squats", type: "strength" },
  { name: "Running", type: "cardio" },
  { name: "Stretching", type: "stretching" },
];

test.beforeEach(async ({ page }) => {
  await page.route("https://api.api-ninjas.com/v1/exercises*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockExercises),
    });
  });

  await page.goto("http://localhost:5173/compose-workout");
});

test("Render workout form", async ({ page }) => {
  await expect(page.getByText("Choose warmup")).toBeVisible();

  await expect(
    page.getByText("Choose at least two exercises")
  ).toBeVisible();

  await expect(page.getByText("Choose cooldown")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Next" })
  ).toBeVisible();
});

test("Show validation errors when submitting empty form", async ({ page }) => {
  await page.getByRole("button", { name: "Next" }).click();

  await expect(
    page.getByText("Choose at least two exercises.")
  ).toBeVisible();

  await expect(page.getByText("Gör ett val.")).toHaveCount(2);

  await expect(page).toHaveURL(/\/compose-workout$/);
});

test("Select and deselect exercises", async ({ page }) => {
  const pushups = page.getByRole("checkbox", { name: "Pushups" });

  await expect(pushups).not.toBeChecked();

  await pushups.click();

  await expect(pushups).toBeChecked();

  await pushups.click();

  await expect(pushups).not.toBeChecked();
});