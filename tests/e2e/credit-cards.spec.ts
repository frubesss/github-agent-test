import { test, expect } from '@playwright/test';

test.describe('Credit Cards Application', () => {
  test('should load the application homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('h1')).toHaveText('Credit Cards Application');
    
    // Check subtitle
    await expect(page.locator('header p')).toHaveText('Find the perfect credit card for your financial needs');
    
    // Check user form is visible
    await expect(page.locator('h2')).toHaveText('Enter Your Details');
    
    // Check submit button is present
    await expect(page.locator('button[type="submit"]')).toHaveText('Find My Credit Cards');
  });

  test('should display form validation errors', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check validation errors appear
    await expect(page.locator('.error-message')).toHaveCount(6); // firstName, lastName, dateOfBirth, annualIncome, houseNumber, postcode
    await expect(page.locator('text=First name is required')).toBeVisible();
    await expect(page.locator('text=Last name is required')).toBeVisible();
    await expect(page.locator('text=Date of birth is required')).toBeVisible();
    await expect(page.locator('text=Annual income must be greater than 0')).toBeVisible();
    await expect(page.locator('text=House number is required')).toBeVisible();
    await expect(page.locator('text=Postcode is required')).toBeVisible();
  });

  test('should load test customer data using quick test buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check test customer buttons are present
    await expect(page.locator('h3')).toHaveText('Quick Test');
    await expect(page.locator('.test-customer-btn')).toHaveCount(3);
    
    // Click on Ollie Murphree test customer
    await page.click('text=Ollie Murphree');
    
    // Verify form is filled with test data
    await expect(page.locator('#firstName')).toHaveValue('Ollie');
    await expect(page.locator('#lastName')).toHaveValue('Murphree');
    await expect(page.locator('#dateOfBirth')).toHaveValue('1970-07-01');
    await expect(page.locator('#employmentStatus')).toHaveValue('Full time');
    await expect(page.locator('#annualIncome')).toHaveValue('34000');
    await expect(page.locator('#houseNumber')).toHaveValue('700');
    await expect(page.locator('#postcode')).toHaveValue('BS14 9PR');
  });

  test('should submit form with valid data and show results', async ({ page }) => {
    await page.goto('/');
    
    // Load test customer data
    await page.click('text=Ollie Murphree');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for results page to load
    await expect(page.locator('h2')).toHaveText('Your Eligible Credit Cards');
    
    // Check user greeting
    await expect(page.locator('text=Hello Ollie Murphree!')).toBeVisible();
    
    // Check that credit cards are displayed
    await expect(page.locator('.cards-grid')).toBeVisible();
    
    // Check start over button is present
    await expect(page.locator('text=Start Over')).toBeVisible();
  });

  test('should handle different test customers', async ({ page }) => {
    await page.goto('/');
    
    // Test Elizabeth Edmundson (Student)
    await page.click('text=Elizabeth Edmundson');
    
    // Verify form is filled
    await expect(page.locator('#firstName')).toHaveValue('Elizabeth');
    await expect(page.locator('#employmentStatus')).toHaveValue('Student');
    await expect(page.locator('#annualIncome')).toHaveValue('17000');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for results
    await expect(page.locator('text=Hello Elizabeth Edmundson!')).toBeVisible();
  });

  test('should handle no eligible cards scenario', async ({ page }) => {
    await page.goto('/');
    
    // Fill form with data that might not qualify for cards
    await page.fill('#firstName', 'Test');
    await page.fill('#lastName', 'User');
    await page.fill('#dateOfBirth', '2005-01-01'); // Very young
    await page.selectOption('#employmentStatus', 'Student');
    await page.fill('#annualIncome', '1000'); // Very low income
    await page.fill('#houseNumber', '123');
    await page.fill('#postcode', 'AB12 3CD');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check if no results message appears or if there are results
    await page.waitForSelector('h2');
    const heading = await page.locator('h2').textContent();
    
    if (heading === 'No Eligible Cards Found') {
      // Check no results scenario
      await expect(page.locator('text=Unfortunately, Test User, you don\'t meet the eligibility criteria')).toBeVisible();
      await expect(page.locator('text=Try Different Details')).toBeVisible();
    } else {
      // If there are results, that's also valid
      await expect(page.locator('text=Hello Test User!')).toBeVisible();
    }
  });

  test('should navigate back to form using start over button', async ({ page }) => {
    await page.goto('/');
    
    // Load test data and submit
    await page.click('text=Ollie Murphree');
    await page.click('button[type="submit"]');
    
    // Wait for results page
    await expect(page.locator('h2')).toHaveText('Your Eligible Credit Cards');
    
    // Click start over
    await page.click('text=Start Over');
    
    // Should be back to the form
    await expect(page.locator('h2')).toHaveText('Enter Your Details');
    
    // Form should be cleared
    await expect(page.locator('#firstName')).toHaveValue('');
    await expect(page.locator('#lastName')).toHaveValue('');
  });

  test('should select and deselect cards in results', async ({ page }) => {
    await page.goto('/');
    
    // Load test data and submit
    await page.click('text=Ollie Murphree');
    await page.click('button[type="submit"]');
    
    // Wait for results
    await expect(page.locator('h2')).toHaveText('Your Eligible Credit Cards');
    
    // Check if there are cards to select
    const cardCount = await page.locator('.cards-grid .credit-card').count();
    if (cardCount > 0) {
      // Check for select all button
      await expect(page.locator('text=Select All')).toBeVisible();
      
      // Click select all
      await page.click('text=Select All');
      
      // Should show total credit
      await expect(page.locator('.total-credit')).toBeVisible();
      await expect(page.locator('text=Total Credit Available:')).toBeVisible();
      
      // Button should change to Deselect All
      await expect(page.locator('text=Deselect All')).toBeVisible();
      
      // Click deselect all
      await page.click('text=Deselect All');
      
      // Total credit should disappear
      await expect(page.locator('.total-credit')).not.toBeVisible();
    }
  });

  test('should display footer information', async ({ page }) => {
    await page.goto('/');
    
    // Check footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer p')).toHaveText('© 2024 Credit Cards Application. All rights reserved.');
  });
});