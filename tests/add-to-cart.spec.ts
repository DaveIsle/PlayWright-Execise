import { test } from "../fixtures";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";

test.describe("Cart", () => {
  test("adding 2 products results in correct cart item count", async ({
    page,
  }) => {
    const Home = new HomePage(page);
    const Products = new ProductsPage(page);
    const Cart = new CartPage(page);

    await Home.navigateToProductsPage();

    // Add any two products to the cart
    await Products.addProductToCart(0);
    await Products.addProductToCart(1);

    await Home.navigateToCart();

    await Cart.assertCartItemCount(2);
  });
});
