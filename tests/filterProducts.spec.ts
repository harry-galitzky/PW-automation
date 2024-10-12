import { test, expect } from '@playwright/test';

import HomePage from '../src/pages/home/homePage';
import TestData from '../utilities/testData';
 

test('Filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToPage();

    for (const [category, productList] of Object.entries(TestData.categories)) {
        await homePage.filterByCategory(category);
        await page.waitForTimeout(2000);
    
        const visibleProducts = (await page.locator('.card-title a.hrefch').allTextContents()).map(product => product.trim());
    
        for (const visibleProduct of visibleProducts) {
            expect(productList.includes(visibleProduct)).toBeTruthy();
        }
    
        for (const product of productList) {
            expect(visibleProducts.includes(product)).toBeTruthy();
        }
    }
    await page.close();

});
