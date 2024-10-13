import { Page } from '@playwright/test';
import TestData from '../../utilities/testData';
import { MenuItem } from '../../utilities/interfaces';

export default class BasePage {

    constructor(protected page: Page) {}

    public async goToPage(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async navigateToPage(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    public getMenuItemById(id: string): MenuItem | undefined {
        return TestData.menuItems.find((item: MenuItem) => item.id === id);
    }
}

