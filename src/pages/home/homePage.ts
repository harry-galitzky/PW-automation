import { Page } from '@playwright/test';

import BasePage from "../../core/basePage";


export default class HomePage extends BasePage{

    constructor(page: Page) {
        super(page);
    };

    public async goToPage(): Promise<void> {
            await this.page.goto('https://www.demoblaze.com/');
    };

    public async filterByCategory(category: string) {
        await this.page.click(`#itemc.list-group-item:has-text("${category}")`, { timeout: 2000});
    };

    public async getElements() {
        return this.page.locator('h4.card-title a');
    };

    public async clickOnProduct(item: string) {
    await this.page.click(`a:has-text("${item}")`);
    };
}
