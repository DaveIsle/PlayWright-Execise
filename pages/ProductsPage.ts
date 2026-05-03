import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  private readonly productSearch: Locator;
  private readonly submitSearch: Locator;
  private readonly productWrapper: Locator;
  private readonly productName: Locator;
  private readonly addToCartButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productSearch = page.locator("#search_product");
    this.submitSearch = page.locator("#submit_search");
    this.productWrapper = page.locator(".product-image-wrapper");
    this.productName = page.locator(".productinfo p");
    this.addToCartButton = page.locator(".product-overlay a[data-product-id]"); // Scoped to .product-overlay as it contains the interactive hover button - targeting the add to cart button within .productinfo was flaky as it sits behind the overlay animation
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async searchForProduct(productName: string) {
    await this.productSearch.fill(productName);
    await this.submitSearch.click();
  }

  async addProductToCart(index: number = 0) {
    // Hover over the product card to trigger the overlay animation
    await this.productWrapper.nth(index).hover();

    await this.addToCartButton.nth(index).click();

    await this.continueShoppingButton.click();
  }

  get allProducts() {
    return this.productWrapper;
  }

  get allProductNames() {
    return this.productName;
  }
}
