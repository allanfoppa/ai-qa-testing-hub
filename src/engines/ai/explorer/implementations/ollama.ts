import axios from "axios";
import { AIProvider } from "../interfaces/ai-provider";
import { AIResponse, PageState } from "../interfaces/interfaces";

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

      return this.parseResponse(content);
    } catch (error: any) {
      console.error("Ollama error:", error.message);
      return {
        action: { type: "noop" },
        tests: [],
      };
    }
  }

  private buildPrompt(state: PageState): string {
    return `
You are a QA engineer exploring a UI.

Your job:
- Analyze the page
- Suggest the next action
- Suggest test cases

Rules:
- Avoid repeating actions
- Prefer meaningful user flows
- Return ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations

---

### Example 1

Page state:
{
  "buttons": ["Login"],
  "inputs": [
    { "placeholder": "Email", "value": "" },
    { "placeholder": "Password", "value": "" }
  ]
}

Response:
{
  "action": {
    "type": "type",
    "target": "Email",
    "value": "test@example.com"
  },
  "tests": [
    "should allow typing email",
    "should validate email format"
  ]
}

---

### Example 2

Page state:
{
  "buttons": ["Submit"],
  "inputs": []
}

Response:
{
  "action": {
    "type": "click",
    "target": "Submit"
  },
  "tests": [
    "should trigger submit action",
    "should handle empty submission"
  ]
}

---

### Now your turn

Page state:
${JSON.stringify(state, null, 2)}

Response:
`;
  }

  private parseResponse(content: string): AIResponse {
    try {
      const cleaned = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      if (!parsed.action || !parsed.tests) {
        throw new Error("Invalid structure");
      }

      return parsed;
    } catch {
      console.error("❌ Invalid JSON from Ollama:", content);

      return {
        action: { type: "noop", target: "" },
        tests: [],
      };
    }
  }
}
