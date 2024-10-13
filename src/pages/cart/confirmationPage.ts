import { Page, expect } from '@playwright/test';

interface UserData {
    userName: string;
    creditCard: string;
}

export default class ConfirmationPage {
    constructor(private page: Page) {}

    public async verifyConfirmation(userData: UserData, productPrice: number): Promise<void> {
        await this.page.waitForSelector('.sweet-alert.visible');
        await expect(this.page.locator('.sweet-alert.visible h2')).toHaveText('Thank you for your purchase!');
        
        const confirmationText = await this.page.locator('.sweet-alert.visible p').textContent();
        if (confirmationText) {
            expect(confirmationText).toContain(userData.userName);
            expect(confirmationText).toContain(userData.creditCard);
            expect(confirmationText).toContain(productPrice.toString());
        }
    }
}
