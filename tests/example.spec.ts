import { test, expect } from '@playwright/test';

test('page title is accessible', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Example Domain/);
});

test('main heading is visible', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});
