# Playwright Automation Exercise
A Playwright TypeScript test automation framework built against automationexercise.com, using a Page Object Model structure. It covers three test scenarios: product search, add to cart, and contact form submission.

## How to Install and Run the Tests Locally

### Prerequisites

Ensure the following are installed before proceeding:

- **Git** — [git-scm.com](https://git-scm.com)
- **Node.js (v18+) and npm** — install from [https://nodejs.org](https://nodejs.org) or via `nvm`:

```bash
nvm install --lts
nvm use --lts
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/DaveIsle/PlayWright-Exercise
npm install
npx playwright install
```

### Running the Tests
Run all tests:
```bash
npx playwright test
```

Run a specific test by name:

```bash
npx playwright test --grep "test name here"
```

## Decisions and Trade-offs

### Page Object Model (POM)
A Page Object Model structure keeps test logic separate from page interactions, avoiding raw selectors in tests. All page objects extend a BasePage class that stores the Playwright Page instance and provides shared functionality such as navigation methods and a getByDataQa helper.

### BasePage Navigation
Navigation links (Products, Cart, Contact Us) were placed in `BasePage` rather than `HomePage` as they are available on every page of the site. Each navigation method asserts the expected URL after clicking to make navigation self-verifying.

### Selector Strategy
Where possible, `data-qa` attributes and IDs were used as they are stable and added explicitly for testing. Structural CSS selectors were used only as a fallback.

The `.product-overlay` add to cart button is used instead of `.productinfo`, as the overlay appearing on hover made the latter flaky. The action now hovers over the product first for stability. Scoping to the overlay is also required to prevent targeting add to cart button matches in `.product-info`.

### Ad Blocking
The site displays Google ads and consent modals that can intercept test interactions. A `page.route` interceptor using a regex pattern is registered in the test fixture to block known ad domains at the network level, preventing ads from rendering at any point during the test rather than trying to dismiss them after the fact.

### Fixtures
A custom fixture file was created to extend Playwright's built-in `test` object. This registers the ad blocker and navigates to the base URL automatically before every test, removing the need for repetitive setup in each test file. All test files import `test` and `expect` from the fixture instead of `@playwright/test`.

---

## AI Usage

AI (Claude by Anthropic) was used throughout this exercise as a pair programming aid, specifically for:

- Generating POM and test skeletons to reduce repetitive boilerplate coding, they were then amended as needed
- Code review and comment streamlining
- Finding a clean, stable approach to blocking ads and consent modals to keep tests reliable
- Generating the template for the README.md

All AI-assisted output was reviewed, understood, and validated before being included. AI was used as a productivity tool to accelerate problem-solving, not as a substitute for engineering judgement.

---

## What I Would Improve or Add Given More Time

- **Fixtures for page objects** — rather than instantiating page objects inside each test, they could be injected via fixtures to further reduce boilerplate
- **Test data management** — form data such as names and emails are currently hardcoded in tests; a test data file or factory would make this more maintainable
- **Reporting** — enable screenshots, video, and trace on failure via Playwright config for better debugging and CI visibility
- **Coverage** — add negative test cases such as invalid form input and empty search results to improve robustness
- **CI pipeline** — a GitHub Actions workflow to run tests on push; the Playwright setup wizard offered this but was skipped for this exercise
- **Parallel execution** — enable `fullyParallel: true` in Playwright config to run every individual test in parallel, reducing run time as the suite grows
- **Tagging** - Further Smoke and Regression test tagging
