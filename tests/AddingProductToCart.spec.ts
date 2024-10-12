import { test, expect } from '@playwright/test';

import ProductPage from '../src/pages/home/productPage';
import HelperFunctions from '../utilities/helperFunctions';
import TestData from '../utilities/testData';


test('Adding a random product to the cart and checking the order', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goToPage();

    await page.waitForSelector('.card-title a.hrefch');

    const visibleProducts = (await (await productPage.getElements()).allTextContents()).map(product => product.trim());
    const addedProduct = visibleProducts[HelperFunctions.getRandomIndex(visibleProducts.length)]
    await productPage.clickOnProduct(addedProduct);

    const price = await productPage.getProductPrice();

    await productPage.addToCart();

    const text = await HelperFunctions.acceptDialog(page);
    expect(text).toContain('Product added');

    const menuItem = productPage.getMenuItemById('cart');
    if (menuItem && menuItem.selector) {
        await productPage.navigateToPage(menuItem.selector);
    } else {
        throw new Error('Menu item with id "cart" not found.');
    }

    await page.waitForSelector('#tbodyid tr td:nth-child(2)');

    const cartProductNames = await page.locator('#tbodyid tr td:nth-child(2)').allTextContents();
    const totalPrice = await page.locator('#totalp').textContent();

    cartProductNames.forEach(product => {
        expect(cartProductNames.map(name => name.trim())).toContain(product.trim());
    });
    
    expect(totalPrice).toBe(price.toString());

    await page.getByRole('button', { name: 'Place Order' }).click();

    await page.getByLabel('Total:').fill(TestData.fakeUser.userName);
    await page.getByLabel('Country:').fill(TestData.fakeUser.country);
    await page.getByLabel('City:').fill(TestData.fakeUser.city);
    await page.getByLabel('Credit card:').fill(TestData.fakeUser.creditCard);
    await page.getByLabel('Month:').fill(TestData.fakeUser.month);
    await page.getByLabel('Year:').fill(TestData.fakeUser.year);
    await page.getByRole('button', { name: 'Purchase' }).click();

    await page.waitForSelector('.sweet-alert.visible');
    
    const alertHeader = await page.locator('.sweet-alert.visible h2').textContent();
    const alertDetails = await page.locator('.sweet-alert.visible p.lead').textContent();
    
    expect(alertHeader).toContain('Thank you for your purchase!');

    expect(alertDetails).toContain(TestData.fakeUser.userName);
    expect(alertDetails).toContain(TestData.fakeUser.creditCard);
    expect(alertDetails).toContain(price.toString());

    await page.close();
});
