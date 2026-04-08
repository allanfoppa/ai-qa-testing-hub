import { Page } from "@playwright/test";
import { AIAction } from "../interfaces/interfaces.js";

export async function executeAction(
  page: Page,
  action: AIAction,
): Promise<void> {
  try {
    if (action.type === "click" && action.target) {
      const locator = page.locator(`text=${action.target}`);

      if ((await locator.count()) > 0) {
        await locator.first().click();
      } else {
        console.warn(`Element not found: ${action.target}`);
      }
    }

    if (action.type === "type") {
      const textarea = page.locator("textarea");

      if ((await textarea.count()) > 0) {
        await textarea.first().fill(action.value || "Test input");
      }
    }

    // must have a small delay to stabilize UI
    await page.waitForTimeout(500);
  } catch (error) {
    console.error("Action execution failed:", action, error);
  }
}
