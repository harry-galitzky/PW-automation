import { test, expect } from "@playwright/test";

import TestData from "../utilities/testData";
import HomePage from "../src/pages/home/homePage";


const contact = 'a.nav-link[data-target="#exampleModal"]'

test('Send a message to Contact', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goToPage();
    await homePage.navigateToPage(contact);
    await expect(page.locator(contact)).toBeVisible();

    await page.locator('#recipient-email').fill(TestData.fakeUser.email);
    
    await page.getByLabel('Contact Email:').fill(TestData.fakeUser.userName);
    await page.getByLabel('Message:').fill(TestData.fakeUser.message);

    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Thanks for the message!!');
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Send message' }).click();
    await page.close();
});
