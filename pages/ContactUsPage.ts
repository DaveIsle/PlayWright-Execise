import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContactUsPage extends BasePage {
  private readonly nameField: Locator;
  private readonly emailField: Locator;
  private readonly subjectField: Locator;
  private readonly messageField: Locator;
  private readonly submitButton: Locator;
  private readonly allertSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameField = this.getByDataQa("name");
    this.emailField = this.getByDataQa("email");
    this.subjectField = this.getByDataQa("subject");
    this.messageField = this.getByDataQa("message");
    this.submitButton = this.getByDataQa("submit-button");
    this.allertSuccessMessage = page.locator("#contact-page .alert-success");
  }

  async SubmitContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ) {
    await this.page.waitForLoadState("domcontentloaded"); // wait for the DOM to be loaded before interacting with the form otherwise the fields get cleared
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.subjectField.fill(subject);
    await this.messageField.fill(message);

    // Listen for the native browser dialog and accept it
    this.page.once("dialog", (dialog) => dialog.accept());
    await this.submitButton.click();
  }

  async assertFormSubmittedSuccessfully() {
    await expect(this.allertSuccessMessage).toBeVisible();
  }
}
