import { Page } from '@playwright/test';
import BasePage from "../../core/basePage";

export default class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async goToPage(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/');
    }

    public async filterByCategory(category: string): Promise<void> {
        await this.page.click(`#itemc.list-group-item:has-text("${category}")`, { timeout: 2000 });
    }

    public async getElements(): Promise<ReturnType<Page['locator']>> {
        await this.page.waitForSelector('.card-title a.hrefch');
        return this.page.locator('.card-title a.hrefch');
    }

    public async clickOnProduct(item: string): Promise<void> {
        await this.page.click(`a:has-text("${item}")`);
    }

    public async selectRandomProduct(): Promise<string> {
        const products = await this.getElements();
        const productNames = await products.allTextContents();
        const selectedProduct = productNames[Math.floor(Math.random() * productNames.length)].trim();
        await this.clickOnProduct(selectedProduct);
        return selectedProduct;
    }
}
