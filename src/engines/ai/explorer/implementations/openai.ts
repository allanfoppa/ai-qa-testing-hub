import axios from "axios";
import fs from "fs";
import { AIProvider } from "../interfaces/ai-provider.js";
import { AIResponse, PageState } from "../interfaces/interfaces.js";

export class OpenAIProvider implements AIProvider {
  async ask(state: PageState): Promise<AIResponse> {
    const apiKey = this.getApiKey();
    const openai_url = this.getApiUrl();

    const response = await this.getApiResponse(apiKey, openai_url, state);
    const content = this.extractContent(response);

    try {
      this.createReport(content);
      return JSON.parse(content) as AIResponse;
    } catch {
      console.error("Invalid JSON from AI:", content);
      return {
        action: { type: "noop" },
        tests: [],
      };
    }
  }

  private getApiKey(): string {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not defined");
    }
    return apiKey;
  }

  private getApiUrl(): string {
    return "https://api.openai.com/v1/responses";
  }

  private async getApiResponse(apiKey: string, url: string, state: PageState) {
    return await axios.post(
      url,
      {
        model: "gpt-oss",
        input: [
          {
            role: "system",
            content: `
You are a QA engineer exploring a UI.
Avoid repeating actions.
Return only JSON.
`,
          },
          {
            role: "user",
            content: `
Page state:
${JSON.stringify(state, null, 2)}

Return ONLY JSON:
{
  "action": {
    "type": "click | type | noop",
    "target": "string"
  },
  "tests": ["string"]
}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );
  }

  private extractContent(response: any): string {
    return response.data.output[0].content[0].text;
  }

  private createReport(content: string): void {
    fs.writeFileSync("ai-report.md", content);
  }
}
