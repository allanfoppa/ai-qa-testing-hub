import prompts from "prompts";
import { AIExplorer } from "../src/engines/ai/explorer/explore.js";
import { createProvider } from "../src/engines/ai/explorer/factories/provider.factory.js";

(async () => {
  const { exploreName, siteUrl, providers } = await generatePrompt();
  await factoryProvider(exploreName, siteUrl, providers);

  console.log("\n🚀 Suite generated successfully!");
})();

async function generatePrompt() {
  const response = await prompts([
    {
      type: "text",
      name: "exploreName",
      message: "Enter a name for the explore:",
      validate: (value) => (value ? true : "Explore name is required"),
    },
    {
      type: "text",
      name: "siteUrl",
      message: "Enter URL:",
      validate: (value) => (value ? true : "URL is required"),
    },
    {
      type: "select",
      name: "providers",
      message: "Select provider:",
      choices: [
        { title: "Ollama", description: "Using llama3.2", value: "ollama" },
        { title: "OpenAI", description: "Using GPT-4", value: "openai" },
      ],
      max: 1,
    },
  ]);

  const { exploreName, siteUrl, providers } = response;

  if (!exploreName || !siteUrl || !providers) {
    console.log("❌ Operation cancelled");
    process.exit(1);
  }

  return { exploreName, siteUrl, providers };
}

async function factoryProvider(
  exploreName: string,
  siteUrl: string,
  providers: string,
) {
  const provider = createProvider(providers);
  const explorer = new AIExplorer(provider, exploreName, 2);

  await explorer.run(siteUrl).catch((err) => {
    console.error("❌ Explorer failed:", err);
    process.exit(1);
  });
}
