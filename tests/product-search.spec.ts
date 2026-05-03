import { test, expect } from "../fixtures";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";

/*
“I implemented the test as specified. The test has been marked with @expectedFailure.
It fails because the system returns products that do not contain the search term "Dress".
Further details on this are found in the README.md file under the product search section.
*/
test.describe("Product Search", () => {
  test("search results only contain matching products @expectedFailure", async ({
    page,
  }) => {
    const Home = new HomePage(page);
    const Products = new ProductsPage(page);

    await Home.navigateToProductsPage();

    await Products.searchForProduct("Dress");

    // Asserts that at least one product is displayed
    await expect(Products.allProducts.first()).toBeVisible();

    // Asserts that all displayed products contain the search term "Dress" case-insensitively
    const allNames = await Products.allProductNames.allTextContents();

    allNames.forEach((name) => {
      expect(name).toMatch(/Dress/i);
    });
  });
});
