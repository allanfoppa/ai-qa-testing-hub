import { Page } from "@playwright/test";
import { PageState } from "../interfaces/interfaces.js";

export async function extractState(page: Page): Promise<PageState> {
  return await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button")).map(
      (b) => ({
        text: (b as HTMLButtonElement).innerText,
        disabled: (b as HTMLButtonElement).disabled,
      }),
    );

    const inputs = Array.from(document.querySelectorAll("input, textarea")).map(
      (i) => ({
        placeholder: (i as HTMLInputElement).placeholder,
        value: (i as HTMLInputElement).value,
      }),
    );

    return { buttons, inputs };
  });
}
