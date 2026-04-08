export type ActionType = "click" | "type" | "noop";

export interface AIAction {
  type: ActionType;
  target?: string;
  value?: string;
}

export interface AIResponse {
  action: AIAction;
  tests: string[];
}

export interface PageState {
  buttons: {
    text: string;
    disabled?: boolean;
  }[];
  inputs: {
    placeholder: string;
    value?: string;
  }[];
}
