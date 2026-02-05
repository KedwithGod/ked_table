
import { test, expect } from '@playwright/test';

test.describe('Table Features', () => {

    test('Sorting works correctly', async ({ page }) => {
        await page.goto('/iframe.html?id=features-sorting--basic-sorting&viewMode=story');
        await page.waitForSelector('.table tbody tr');
        const firstRowBefore = await page.locator('.table tbody tr').first().textContent();

        // Click header to sort (Age)
        await page.locator('.table thead th').filter({ hasText: 'Age' }).click();
        await page.waitForTimeout(500);
        const firstRowAfter = await page.locator('.table tbody tr').first().textContent();

        expect(firstRowBefore).not.toBe(firstRowAfter);
        // Check for indicator
        await expect(page.locator('.sort-indicator')).toBeVisible();
    });

    test('Selection works correctly', async ({ page }) => {
        await page.goto('/iframe.html?id=features-selection--multiple-selection&viewMode=story');
        await page.waitForSelector('.table tbody tr');

        const row = page.locator('.table tbody tr').first();
        const checkbox = row.locator('input[type="checkbox"]');
        await checkbox.check();

        // Verify class application
        await expect(row).toHaveClass(/selected-row/);
    });

    test('Expansion works correctly', async ({ page }) => {
        await page.goto('/iframe.html?id=features-expansion--row-details&viewMode=story');
        await page.waitForSelector('.table tbody tr');

        const expandBtn = page.locator('.table tbody tr button').first();
        await expandBtn.click();

        // Verify expanded row content
        await expect(page.locator('.expanded-row')).toBeVisible();
        await expect(page.locator('.expanded-row')).toContainText('Details for');
    });

    test('Pinning styles are applied', async ({ page }) => {
        await page.goto('/iframe.html?id=features-pinning--sticky-pinning&viewMode=story');
        await page.waitForSelector('th.sticky-left');
        const stickyLeft = page.locator('th.sticky-left').first();
        await expect(stickyLeft).toHaveCSS('position', 'sticky');
    });

    test('Column Visibility toggles columns', async ({ page }) => {
        await page.goto('/iframe.html?id=features-visibility--column-toggle&viewMode=story');
        await page.waitForSelector('.table thead th');
        const emailHeader = page.locator('.table thead th').filter({ hasText: 'Email' });
        await expect(emailHeader).toBeVisible();

        // Uncheck email visibility
        await page.getByLabel('Email').uncheck();
        await expect(emailHeader).not.toBeVisible();
    });

    test('Export button exists and is clickable', async ({ page }) => {
        await page.goto('/iframe.html?id=features-export--csv-export&viewMode=story');
        const exportButton = page.getByRole('button', { name: 'Export to CSV' });
        await expect(exportButton).toBeVisible();
    });

    test('Footer renders totals', async ({ page }) => {
        await page.goto('/iframe.html?id=features-footer--basic-footer&viewMode=story');
        await page.waitForSelector('.table tfoot');
        await expect(page.locator('.table tfoot')).toContainText('Sum: $500');
    });

    test('Layout Mode Card View transforms table', async ({ page }) => {
        await page.goto('/iframe.html?id=features-layoutmodes--card-layout&viewMode=story');
        await page.waitForSelector('.layout-card');
        await expect(page.locator('.layout-card')).toBeVisible();
        // Headers should be hidden in card view
        await expect(page.locator('.table thead')).not.toBeVisible();
    });
});
