import { test, expect } from "@playwright/test";
import { projects } from "../../../../config/apps-registry.json";

/**
 * E2E Suite: Rick and Morty Graphs and Stuff
 * Goal: Verify character data loading and graph visibility
 */

// Find the config for this project in our central registry
const projectConfig = projects.find(
  (p) => p.metadata.id === "rick-and-morty-graphs-and-stuff",
);

test.describe("Rick and Morty Dashboard E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate using the URL from our Hub's registry
    await page.goto(projectConfig?.app.baseUrl || "http://localhost:3000");
  });

  test("should load the dashboard and display character cards", async ({
    page,
  }) => {
    // Check if the main title or a character card is visible
    const card = page.locator(".character-card").first();
    await expect(card).toBeVisible({ timeout: 10000 });

    // Verify that "Rick Sanchez" is present in the initial load
    await expect(page.getByText("Rick Sanchez")).toBeVisible();
  });

  test("should display species distribution graphs", async ({ page }) => {
    // Check for the presence of the graph container (Recharts/D3)
    const graph = page.locator("svg.recharts-surface");
    await expect(graph).toBeVisible();
  });

  test("should filter characters when using the search bar", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(/search/i);

    await searchInput.fill("Morty");
    await page.keyboard.press("Enter");

    // Verify the UI updated to show Morty related results
    await expect(page.getByText("Morty Smith")).toBeVisible();
    // Ensure "Rick" is no longer visible if the filter is working
    await expect(page.getByText("Rick Sanchez")).not.toBeVisible();
  });
});
