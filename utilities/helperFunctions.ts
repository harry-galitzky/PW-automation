import { Page, expect } from '@playwright/test';


export default class HelperFunctions {

    public static async acceptDialog(page: Page): Promise<string> {
        const dialog = await page.waitForEvent('dialog');
        const message = dialog.message();
        await dialog.accept();
        return message;
    };

    public static async handleHtmlModal(page: Page, modalSelector: string, actionButtonSelector?: string): Promise<string> {
    // המתן להופעת המודל
    await page.waitForSelector(modalSelector, { state: 'visible' });

    // שלוף את תוכן הטקסט של המודל
    const modalMessage = await page.locator(modalSelector).textContent();
    
    // אם יש כפתור אישור במודל, לחץ עליו
    if (actionButtonSelector) {
        await page.click(actionButtonSelector);
    }

    // החזר את תוכן ההודעה
    return modalMessage?.trim() ?? '';
}

    

    public static getRandomIndex(length: number): number {
        return Math.floor(Math.random() * length);
    };    

    public static async validatePageUrl(page: Page, expectedUrl: string) {
        await expect(page).toHaveURL(expectedUrl);
    };

    public static async validateTitle(page: Page, expectedTitle: string) {
        await expect(page).toHaveTitle(expectedTitle);
    };
    
};
