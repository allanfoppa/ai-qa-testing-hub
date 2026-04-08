import { AIExplorer } from "../src/engines/ai/explorer/explore";
import { OllamaProvider } from "../src/engines/ai/explorer/implementations/ollama";

// For now, we will hardcode this provider and test URL, but in the future we can make it dynamic based on CLI args
const provider = new OllamaProvider();
const testUrl = "https://www.scrapethissite.com/login";

const explorer = new AIExplorer(provider);

// Run the exploration
explorer.run(testUrl).catch((err) => {
  console.error("❌ Explorer failed:", err);
  process.exit(1);
});
