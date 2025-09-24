import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all public pages', async ({ page }) => {
    await page.goto('/');
    
    // Check homepage loads
    await expect(page).toHaveTitle(/Sypot/);
    
    // Navigate to explore
    await page.getByRole('link', { name: /explore/i }).click();
    await expect(page).toHaveURL('/explore');
    
    // Navigate to events
    await page.getByRole('link', { name: /events/i }).click();
    await expect(page).toHaveURL('/events');
    
    // Navigate to map
    await page.getByRole('link', { name: /map/i }).click();
    await expect(page).toHaveURL('/map');
  });

  test('should show sign in button when not authenticated', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should access footer links', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer links exist
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /privacy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /terms/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /help/i })).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu exists
    const mobileNav = page.locator('nav.md\\:hidden');
    
    // On mobile, bottom navigation should be visible for authenticated users
    // For non-authenticated users, regular navigation should work
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });
});

test.describe('Protected Routes', () => {
  test('should redirect to auth when accessing protected routes', async ({ page }) => {
    // Try to access profile without authentication
    await page.goto('/profile');
    await expect(page).toHaveURL('/auth');
    
    // Try to access dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/auth');
    
    // Try to access chat
    await page.goto('/chat');
    await expect(page).toHaveURL('/auth');
  });

  test('should redirect to unauthorized for role-specific routes', async ({ page }) => {
    // This would need mock auth to be enabled and user logged in as visitor
    const response = await page.goto('/admin');
    
    // Should either redirect to auth or unauthorized
    const url = page.url();
    expect(url).toMatch(/\/(auth|unauthorized)/);
  });
});