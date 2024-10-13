import { test } from '@playwright/test';
import ProductPage from '../src/pages/home/productPage';
import CartPage from '../src/pages/cart/cartPage';
import OrderPage from '../src/pages/cart/orderPage';
import ConfirmationPage from '../src/pages/cart/confirmationPage';
import HelperFunctions from '../utilities/helperFunctions';
import TestData from '../utilities/testData';
import HomePage from '../src/pages/home/homePage';

test('Adding a random product to the cart and adjusting the order', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const orderPage = new OrderPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const homePage = new HomePage(page);

    await homePage.goToPage();

    const selectedProduct: string = await productPage.selectRandomProduct();
    const productPrice: number = await productPage.getProductPrice();
    await productPage.addToCart();
    await HelperFunctions.acceptDialog(page);

    await cartPage.goToPage();
    await cartPage.verifyProductInCart(selectedProduct, productPrice);

    await cartPage.placeOrder();
    await orderPage.fillOrderForm(TestData.fakeUser);
    await orderPage.purchase();

    await confirmationPage.verifyConfirmation(TestData.fakeUser, productPrice);
});
