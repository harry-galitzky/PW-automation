import { Page } from '@playwright/test';
import { FakeUser } from '../../../utilities/interfaces';


export default class OrderPage {
    constructor(private page: Page) {}

    public async fillOrderForm(userData: FakeUser): Promise<void> {
        await this.page.waitForSelector('#orderModal');
        await this.page.fill('#name', userData.userName);
        await this.page.fill('#country', userData.country);
        await this.page.fill('#city', userData.city);
        await this.page.fill('#card', userData.creditCard);
        await this.page.fill('#month', userData.month);
        await this.page.fill('#year', userData.year);
    }

    public async purchase(): Promise<void> {
        await this.page.click('button:has-text("Purchase")');
    }
}
