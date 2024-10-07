import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ReservationViewPage {

    readonly page: Page;
    readonly reservationViewButton: Locator;
    readonly firstelement: Locator;
    readonly lastelement: Locator;

constructor(page: Page) {

    this.page = page;
    this.reservationViewButton = page.locator('#app > div > div > div:nth-child(4) > a');
    this.firstelement = page.locator('#app > div > div.reservations > div:nth-child(1)');
    this.lastelement = page.locator('#app > div > div.reservations > div:nth-last-child(1)');
}

async ReservationView() {
    await this.reservationViewButton.click();
}

async verifyReservationHeading() {
    await expect(this.page.getByRole('heading', { name: 'Reservations' })).toBeVisible();
}

async verifyfirstelement() {
    await expect(this.firstelement).toContainText("2024-10-10");
}

async verifylastelement(reservationStart: string, reservationEnd: string, ){
    await expect(this.lastelement).toContainText(reservationStart);
    await expect(this.lastelement).toContainText(reservationEnd);
}

async verifyfirstelementGone() {
    await expect(this.firstelement).not.toContainText("2024-10-10");
}
}