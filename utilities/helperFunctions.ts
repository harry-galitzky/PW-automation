import { Page, expect } from '@playwright/test';

export default class HelperFunctions {

    public static async acceptDialog(page: Page): Promise<string> {
        const dialog = await page.waitForEvent('dialog');
        const message = dialog.message();
        await dialog.accept();
        return message;
    }

    public static async validatePageUrl(page: Page, expectedUrl: string): Promise<void> {
        await expect(page).toHaveURL(expectedUrl);
    }
}
