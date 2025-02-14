import { Page } from '@playwright/test';
import HomePage from './homePage';

export default class ProductPage extends HomePage {

    constructor(protected page: Page) {
        super(page);
    }
    
    public async addToCart(): Promise<void> {
        await this.page.getByRole('link', { name: 'Add to cart' }).click({ timeout: 2000 });
    }

    public async getProductPrice(): Promise<number> {
        const priceText = await this.page.innerText('.price-container');
        const productPrice = parseFloat(priceText.replace('$', '').trim());
        return productPrice;
    }
}
