import { test, expect, Page } from "@playwright/test";

const mockExercises = [
  { name: "Pushups" },
  { name: "Pullups" },
  { name: "Squats" },
  { name: "Running" },
  { name: "Stretching" },
];

async function goToConfigureWorkout(page: Page) {
  await page.route("https://api.api-ninjas.com/v1/exercises*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockExercises),
    });
  });

  await page.goto("http://localhost:5173/compose-workout");

  // Choose warmup
  await page.getByRole("combobox").first().click();

  await page.getByRole("option", { name: "Running" }).click();

  // Choose exercises
  await page.getByRole("checkbox", { name: "Pushups" }).click();
  await page.getByRole("checkbox", { name: "Pullups" }).click();

  // Choose cooldown
  await page.getByRole("combobox").last().click();

  await page.getByRole("option", { name: "Stretching" }).click();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page).toHaveURL(/\/configure-workout$/);
}

test("Navigate to Configure Workout", async ({ page }) => {
  await goToConfigureWorkout(page);

  await expect(
    page.getByRole("heading", { name: "Configure Workout" })
  ).toBeVisible();

  await expect(page.getByText("Pushups")).toBeVisible();
  await expect(page.getByText("Pullups")).toBeVisible();
});

test("Show errors when exercise settings are missing", async ({ page }) => {
  await goToConfigureWorkout(page);

  await page.getByRole("button", { name: "Save Workout" }).click();

  await expect(
    page.getByText("Please enter valid sets, reps and rest values.")
  ).toHaveCount(2);

  await expect(page).toHaveURL(/\/configure-workout$/);
});

test("Save a configured workout", async ({ page }) => {
  await goToConfigureWorkout(page);

  const sets = page.getByPlaceholder("Sets");
  const reps = page.getByPlaceholder("Reps");
  const rest = page.getByPlaceholder("Rest (seconds)");

  await sets.nth(0).fill("3");
  await reps.nth(0).fill("12");
  await rest.nth(0).fill("60");

  await sets.nth(1).fill("4");
  await reps.nth(1).fill("10");
  await rest.nth(1).fill("90");

  await page.getByRole("button", { name: "Save Workout" }).click();

  await expect(page).toHaveURL(/\/view-workouts\/new\/.+/);

  await expect(page.getByText("3 sets · 12 reps · 60 sec rest")).toBeVisible();

  await expect(page.getByText("4 sets · 10 reps · 90 sec rest")).toBeVisible();

  await expect(page.getByText("New", { exact: true })).toBeVisible();
});