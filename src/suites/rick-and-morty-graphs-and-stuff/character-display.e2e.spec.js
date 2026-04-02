import { test } from "@playwright/test";

/**
 * E2E Suite: Rick and Morty Graphs and Stuff
 * Goal: Verify character data loading and graph visibility
 */

test("should display characters", async ({ page }) => {
  await page.goto("/");
  // ... your test logic
});
