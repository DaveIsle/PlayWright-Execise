import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
  /**
   * Intercepts requests to known ad domains and aborts them before they load.
   * Called automatically from the BasePage constructor, so any page object
   * that extends BasePage will have ad blocking applied without any additional setup.
   *
   * Uses a regex pattern to match only ad domains, meaning legitimate requests
   * are never intercepted - more performant than checking every outgoing request.
   */
    await page.route(
      /(googlesyndication|doubleclick|googletagmanager)\.com/,
      (route) => route.abort()
    );
    await page.goto('/');
    await use(page);
  }
});

export { expect } from '@playwright/test';