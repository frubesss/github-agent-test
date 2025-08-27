# End-to-End Tests

This directory contains Playwright end-to-end tests for the Credit Cards Application.

## Test Coverage

The tests cover the following functionality:

1. **Application Loading** - Verifies the app loads correctly with proper header and content
2. **Form Validation** - Tests validation error messages for required fields
3. **Test Customer Data** - Tests loading predefined customer data using quick test buttons
4. **Form Submission** - Tests successful form submission and navigation to results
5. **Different Customers** - Tests handling of different customer profiles (Student, Part-time, etc.)
6. **No Eligible Cards** - Tests scenarios where no credit cards are eligible
7. **Navigation** - Tests the "Start Over" functionality to return to the form
8. **Card Selection** - Tests selecting and deselecting credit cards in results
9. **Footer Display** - Verifies footer information is displayed correctly

## Running Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# View test report
npm run test:e2e:report

# Run specific test
npx playwright test --grep "should load the application homepage"
```

## Test Structure

- All tests are located in `tests/e2e/`
- Tests use the Playwright testing framework
- Tests run against a built version of the application served on localhost:3000
- Chrome browser is used for testing (can be configured in `playwright.config.ts`)

## Configuration

Tests are configured in `playwright.config.ts` in the project root. The configuration:

- Builds the application before running tests
- Serves the built application on localhost:3000
- Uses Chrome browser
- Generates HTML reports
- Includes trace collection for debugging failed tests