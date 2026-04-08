import { AIProvider } from "../interfaces/ai-provider.js";
import { OpenAIProvider } from "../implementations/openai.js";
import { OllamaProvider } from "../implementations/ollama.js";

export function createProvider(type: string): AIProvider {
  const providers: Record<string, () => AIProvider> = {
    openai: () => new OpenAIProvider(),
    ollama: () => new OllamaProvider(),
  };

  const factory = providers[type];

  if (!factory) {
    throw new Error(`Invalid provider: ${type}`);
  }

  return factory();
}
