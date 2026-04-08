import axios from "axios";
import { AIProvider } from "../interfaces/ai-provider.js";
import { AIResponse, PageState } from "../interfaces/interfaces.js";

export class OllamaProvider implements AIProvider {
  async ask(state: PageState): Promise<AIResponse> {
    const prompt = this.buildPrompt(state);
    const ollama_url = "http://localhost:11434/api/generate";

    try {
      const response = await axios.post(ollama_url, {
        model: "llama3.2",
        prompt,
        stream: false,
      });

      const content = response.data.response;

      const parsed = this.extractJSON(content) as AIResponse;
      return parsed;
    } catch (error: any) {
      console.error("Ollama error:", error.message);
      return { action: { type: "noop", target: "" }, tests: [] };
    }
  }

  private buildPrompt(state: PageState): string {
    return `
    You are an AI QA agent.

    Return ONLY valid JSON. No explanation, no text before or after.

    Format:
    {
      "action": { "type": "click" | "type" | "noop", "target": "string" },
      "tests": ["string"]
    }

    Page state:
    ${JSON.stringify(state, null, 2)}
    `;
  }

  private extractJSON(text: string) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");
    return JSON.parse(match[0]);
  }
}
