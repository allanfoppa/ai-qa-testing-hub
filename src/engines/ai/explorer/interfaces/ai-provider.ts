import { AIResponse, PageState } from "./interfaces";

export interface AIProvider {
  ask(state: PageState): Promise<AIResponse>;
}
