import { test, expect, Page } from "@playwright/test";
import HomePage from "../src/pages/home/homePage";
import TestData from "../utilities/testData";
import HelperFunctions from "../utilities/helperFunctions";
import { MenuItem } from "../utilities/interfaces";

test("Checking the top menu buttons", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToPage();

    for (const item of TestData.menuItems as MenuItem[]) {
        await homePage.navigateToPage(item.selector);
        await validateMenuAction(page, item);
    }

    await page.close();
});

async function validateMenuAction(page: Page, item: MenuItem): Promise<void> {
    if (item.expectedUrl) {
        await HelperFunctions.validatePageUrl(page, item.expectedUrl);
    } else if (item.modalSelector) {
        await expect(page.locator(item.modalSelector)).toBeVisible();

        if (item.closeModalSelector) {
            await closeModal(page, item.modalSelector, item.closeModalSelector);
        }
    }
}

async function closeModal(page: Page, modalSelector: string, closeModalSelector: string): Promise<void> {
    await page.click(closeModalSelector);
    await expect(page.locator(modalSelector)).toBeHidden();
}
