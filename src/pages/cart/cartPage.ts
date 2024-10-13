import { Page, expect } from '@playwright/test';
import BasePage from '../../core/basePage';

export default class CartPage extends BasePage {
    constructor(protected page: Page) {
        super(page);
    }

    public async goToPage(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/cart.html');  
    }

    public async verifyProductInCart(productName: string, productPrice: number): Promise<void> {
        await expect(this.page.locator('#tbodyid tr td:nth-child(2)')).toContainText(productName);
        await expect(this.page.locator('#totalp')).toHaveText(productPrice.toString());
    }

    public async placeOrder(): Promise<void> {
        await this.page.click('button:has-text("Place Order")');
    }
}
