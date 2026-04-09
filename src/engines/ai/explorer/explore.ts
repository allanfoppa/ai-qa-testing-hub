import fs from "fs";
import path from "path";
import { chromium, Browser, Page } from "@playwright/test";
import { extractState } from "./helpers/extract-state.js";
import { executeAction } from "./helpers/execute-action.js";
import { AIResponse, PageState } from "./interfaces/interfaces.js";
import { AIProvider } from "./interfaces/ai-provider.js";

export class AIExplorer {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private discoveredTests = new Set<string>();
  private visitedActions = new Set<string>();
  private maxSteps: number;

  constructor(
    private provider: AIProvider,
    private exploreName: string,
    maxSteps: number = 5,
  ) {
    this.maxSteps = maxSteps;
  }

  /**
   * Main entry point to start the exploration loop
   */
  public async run(url: string): Promise<void> {
    await this.init(url);

    try {
      for (let step = 0; step < this.maxSteps; step++) {
        await this.exploreStep(step);
      }
    } catch (error) {
      console.error("❌ Exploration failed during loop:", error);
    } finally {
      await this.cleanup();
      this.printResults();
      this.saveResults(this.exploreName);
    }
  }

  private async init(url: string): Promise<void> {
    console.log(`🚀 Starting exploration at: ${url}`);
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
    await this.page.goto(url);
  }

  private async exploreStep(step: number): Promise<void> {
    if (!this.page) return;

    console.log(`\n🔁 Step ${step + 1}`);

    const state: PageState = await extractState(this.page);
    console.log("Extracted Page State:", state);

    const aiResponse: AIResponse = await this.provider.ask(state);

    // Store suggested tests
    aiResponse.tests.forEach((t) => this.discoveredTests.add(t));

    // Prevent repeated actions
    const actionKey = JSON.stringify(aiResponse.action);
    if (this.visitedActions.has(actionKey)) {
      console.warn("⚠️ Repeated action detected, skipping...");
      return;
    }

    this.visitedActions.add(actionKey);

    // Perform the action
    await executeAction(this.page, aiResponse.action);
  }

  private async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log("\nBrowser closed.");
    }
  }

  private printResults(): void {
    console.log("\nSuggested Tests:");
    Array.from(this.discoveredTests).forEach((test, i) => {
      console.log(`${i + 1}. ${test}`);
    });
  }

  private saveResults(exploreName: string): void {
    const dir = "reports/ai";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const date = new Date().toISOString().split("T")[0];

    const filePath = path.join(
      dir,
      `exploration-results-${exploreName}-${date}.md`,
    );

    fs.writeFileSync(
      filePath,
      `# Discovered Tests\n\n${Array.from(this.discoveredTests)
        .map((t, i) => `${i + 1}. ${t}`)
        .join("\n")}`,
    );

    console.log(`\nResults saved to ${filePath}`);
  }
}
