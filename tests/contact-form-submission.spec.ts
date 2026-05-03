import { test } from "../fixtures";
import { HomePage } from "../pages/HomePage";
import { ContactUsPage } from "../pages/ContactUsPage";

test.describe("Contact Form", () => {
  test("Complete the contact form and submit successfully", async ({
    page,
  }) => {
    const Home = new HomePage(page);
    const ContactUs = new ContactUsPage(page);

    await Home.navigateToContactPage();

    await ContactUs.SubmitContactForm(
      "John Doe",
      "john.doe@example.com",
      "Test Subject",
      "Test Message",
    );

    // assert the success message is visible after form submission
    await ContactUs.assertFormSubmittedSuccessfully();
  });
});
