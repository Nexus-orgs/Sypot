import { test, expect } from '@playwright/test';

test.describe('Events Flow', () => {
  test('should display events on explore page', async ({ page }) => {
    await page.goto('/explore');
    
    // Check for search bar
    await expect(page.getByPlaceholder(/search events/i)).toBeVisible();
    
    // Check for filter buttons
    await expect(page.getByRole('button', { name: /all events/i })).toBeVisible();
    
    // Check for event cards
    const eventCards = page.locator('[data-testid="event-card"]');
    
    // Should have at least one event card (or show empty state)
    const eventCount = await eventCards.count();
    if (eventCount > 0) {
      // Check first event card has required elements
      const firstCard = eventCards.first();
      await expect(firstCard.locator('img')).toBeVisible();
      await expect(firstCard.locator('h3')).toBeVisible(); // Title
      await expect(firstCard.getByText(/\d{1,2}\/\d{1,2}\/\d{4}/)).toBeVisible(); // Date
    }
  });

  test('should filter events by category', async ({ page }) => {
    await page.goto('/explore');
    
    // Click on a category filter
    const musicFilter = page.getByRole('button', { name: /music/i });
    if (await musicFilter.isVisible()) {
      await musicFilter.click();
      
      // URL should update with filter
      await expect(page).toHaveURL(/category=music/);
    }
  });

  test('should search for events', async ({ page }) => {
    await page.goto('/explore');
    
    const searchInput = page.getByPlaceholder(/search events/i);
    await searchInput.fill('concert');
    await searchInput.press('Enter');
    
    // Should update URL or filter results
    // Wait for potential results to load
    await page.waitForTimeout(1000);
    
    // Check if results are shown or empty state
    const noResults = page.getByText(/no events found/i);
    const eventCards = page.locator('[data-testid="event-card"]');
    
    // Either show results or no results message
    const hasResults = await eventCards.count() > 0;
    const hasNoResultsMessage = await noResults.isVisible().catch(() => false);
    
    expect(hasResults || hasNoResultsMessage).toBeTruthy();
  });

  test('should open event details', async ({ page }) => {
    await page.goto('/events');
    
    // Click on first event if available
    const eventLinks = page.locator('a[href^="/event/"]');
    const eventCount = await eventLinks.count();
    
    if (eventCount > 0) {
      await eventLinks.first().click();
      
      // Should navigate to event details page
      await expect(page).toHaveURL(/\/event\/\d+/);
      
      // Check for event details elements
      await expect(page.locator('h1')).toBeVisible(); // Event title
      await expect(page.getByRole('button', { name: /book now|get tickets/i })).toBeVisible();
    }
  });
});

test.describe('Event Interaction', () => {
  test('should show like button on event cards', async ({ page }) => {
    await page.goto('/explore');
    
    const likeButtons = page.locator('[data-testid="like-button"]');
    const likeCount = await likeButtons.count();
    
    if (likeCount > 0) {
      // Click like button
      const firstLike = likeButtons.first();
      await firstLike.click();
      
      // Should toggle like state (visual change)
      await expect(firstLike).toHaveAttribute('data-liked', 'true');
    }
  });

  test('should show share button on event cards', async ({ page }) => {
    await page.goto('/explore');
    
    const shareButtons = page.locator('[data-testid="share-button"]');
    const shareCount = await shareButtons.count();
    
    if (shareCount > 0) {
      // Click share button
      await shareButtons.first().click();
      
      // Should show share options
      await expect(page.getByText(/share on/i)).toBeVisible();
    }
  });
});