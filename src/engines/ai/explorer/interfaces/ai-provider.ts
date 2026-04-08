import { AIResponse, PageState } from "./interfaces.js";

export interface AIProvider {
  ask(state: PageState): Promise<AIResponse>;
}
