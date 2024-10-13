import { Page, expect } from '@playwright/test';

export default class HelperFunctions {

    public static async acceptDialog(page: Page): Promise<string> {
        const dialog = await page.waitForEvent('dialog');
        const message = dialog.message();
        await dialog.accept();
        return message;
    }

    public static async handleHtmlModal(page: Page, modalSelector: string, actionButtonSelector?: string): Promise<string> {
        await page.waitForSelector(modalSelector, { state: 'visible' });
        const modalMessage = await page.locator(modalSelector).textContent();
        
        if (actionButtonSelector) {
            await page.click(actionButtonSelector);
        }

        return modalMessage?.trim() ?? '';
    }

    public static getRandomIndex(length: number): number {
        return Math.floor(Math.random() * length);
    }

    public static async validatePageUrl(page: Page, expectedUrl: string): Promise<void> {
        await expect(page).toHaveURL(expectedUrl);
    }

    public static async validateTitle(page: Page, expectedTitle: string): Promise<void> {
        await expect(page).toHaveTitle(expectedTitle);
    }
}
