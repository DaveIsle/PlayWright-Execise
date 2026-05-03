import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  private readonly productsLink: Locator;
  private readonly cartLink: Locator;
  private readonly contactLink: Locator;
  private readonly urls = {
    cart: "/view_cart",
    products: "/products",
    contact: "/contact_us",
  };

  constructor(protected readonly page: Page) {
    this.productsLink = page.locator('a[href="/products"]');
    this.contactLink = page.locator('a[href="/contact_us"]');
    this.cartLink = page.getByRole("link", { name: "Cart" });
  }

  async navigateToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(this.urls.cart);
  }

  async navigateToProductsPage() {
    await this.productsLink.click();
    await expect(this.page).toHaveURL(this.urls.products);
  }

  async navigateToContactPage() {
    await this.contactLink.click();
    await expect(this.page).toHaveURL(this.urls.contact);
  }

  protected getByDataQa(value: string) {
    return this.page.locator(`[data-qa="${value}"]`);
  }
}
