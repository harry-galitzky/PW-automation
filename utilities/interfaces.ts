export interface MenuItem {
    id: string;
    selector: string;
    expectedUrl?: string;
    title: string;
    modalSelector?: string;
    closeModalSelector?: string;
};

export interface FakeUser {
    userName: string;
    password: string;
    email: string;
    message: string;
    city: string;
    country: string;
    creditCard: string;
    month: string;
    year: string;
};
