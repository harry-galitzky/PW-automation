import { Page } from '@playwright/test';

import BasePage from '../../core/basePage';


export default class CartPage extends BasePage {
    constructor(protected page: Page) {
        super(page);
    };

    public async goToPage(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/cart.html');  
    };
};
