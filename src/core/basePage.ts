import { Page } from '@playwright/test';

import TestData from '../../utilities/testData';


export default class BasePage {
    
    constructor(protected page: Page) {}

    public async goToPage() {
        await this.page.goto('');
    };

    public async navigateToPage(selector: string) {
        await this.page.click(selector);
    };

    public getMenuItemById(id: string) {
        return TestData.menuItems.find(item => item.id === id);
    };
};
