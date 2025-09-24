import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
  });

  test('should display login and signup forms', async ({ page }) => {
    // Check for sign in tab
    await expect(page.getByRole('tab', { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /sign up/i })).toBeVisible();
    
    // Check for login form elements
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should switch between login and signup tabs', async ({ page }) => {
    // Click sign up tab
    await page.getByRole('tab', { name: /sign up/i }).click();
    
    // Check signup form is visible
    await expect(page.getByPlaceholder('John Doe')).toBeVisible();
    await expect(page.getByText('I want to')).toBeVisible();
    
    // Switch back to sign in
    await page.getByRole('tab', { name: /sign in/i }).click();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
  });

  test('should validate required fields on login', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should show error message
    await expect(page.getByText(/missing fields/i)).toBeVisible();
  });

  test('should validate required fields on signup', async ({ page }) => {
    // Switch to signup tab
    await page.getByRole('tab', { name: /sign up/i }).click();
    
    // Try to submit empty form
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Should show error message
    await expect(page.getByText(/missing fields/i)).toBeVisible();
  });

  test('should validate password match on signup', async ({ page }) => {
    await page.getByRole('tab', { name: /sign up/i }).click();
    
    // Fill form with mismatched passwords
    await page.getByPlaceholder('John Doe').fill('Test User');
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('Create a strong password').fill('Password123!');
    await page.getByPlaceholder('Confirm your password').fill('DifferentPassword123!');
    
    // Select user type
    await page.getByRole('combobox').click();
    await page.getByText('Discover & attend events').click();
    
    // Check terms
    await page.getByLabel(/i agree to the/i).check();
    
    // Try to submit
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Should show error
    await expect(page.getByText(/passwords don't match/i)).toBeVisible();
  });

  test('should show quick login buttons in development', async ({ page }) => {
    // Check if mock auth buttons are visible (only in dev mode)
    const quickLoginSection = page.getByText('Quick Test Logins');
    
    if (await quickLoginSection.isVisible()) {
      await expect(page.getByRole('button', { name: /john visitor/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /sarah organizer/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /mike business/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /admin user/i })).toBeVisible();
    }
  });

  test('should redirect based on user role after login', async ({ page }) => {
    // Check if mock auth is enabled
    const quickLoginSection = page.getByText('Quick Test Logins');
    
    if (await quickLoginSection.isVisible()) {
      // Test visitor login
      await page.getByRole('button', { name: /john visitor/i }).click();
      await page.waitForURL('/explore');
      await expect(page).toHaveURL('/explore');
    }
  });
});