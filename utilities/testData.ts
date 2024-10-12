import { MenuItem } from "../utilities/types";

export default class TestData {

  public static readonly categories = {
      Phones: ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6', 'Samsung galaxy s7', 'Iphone 6 32gb', 'Sony xperia z5', 'HTC One M9'],
      Laptops: ['Sony vaio i5', 'Sony vaio i7', 'MacBook air', 'Dell i7 8gb', '2017 Dell 15.6 Inch', 'MacBook Pro'],
      Monitors: ['Apple monitor 24', 'ASUS Full HD']
  };

    public static readonly menuItems: MenuItem[] = [
      { id: 'home', selector: 'a.nav-link[href="index.html"]', expectedUrl: 'https://www.demoblaze.com/index.html', title: 'PRODUCT STORE' },
      { id: 'cart', selector: 'a.nav-link#cartur', expectedUrl: 'https://www.demoblaze.com/cart.html', title: 'Products'},
      { id: 'login', selector: 'a.nav-link#login2', modalSelector: '#logInModal', closeModalSelector: '#logInModal .close', title: 'Log in' },
      { id: 'signUp', selector: 'a.nav-link#signin2', modalSelector: '#signInModal', closeModalSelector: '#signInModal .close', title: 'Sign up'},
      { id: 'contact', selector: 'a.nav-link[data-target="#exampleModal"]', modalSelector: '#exampleModal', closeModalSelector: '#exampleModal .close', title: 'New message'},
      { id: 'aboutUs', selector: 'a.nav-link[data-target="#videoModal"]', modalSelector: '#videoModal', closeModalSelector: '#videoModal .close', title: 'About us' }
  ];
  

  public static readonly fakeUser = {
    userName: 'John Smith',
    password: 'Password123!',
    email: 'testemail@gmail.com',
    message: "I'm not lazy, I'm in energy saving mode!",
    city: 'ashdod',
    country: 'israel',
    creditCard: '123456789',
    month: '12',
    year: '25'
  };
};
