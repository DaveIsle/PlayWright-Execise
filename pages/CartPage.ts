import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator("#cart_info_table tbody tr");
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async assertCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }
}
