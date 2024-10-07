import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ReservationEdit {
readonly page: Page;
readonly reservationAltButton: Locator;
readonly reservationEditButton: Locator;
readonly reservationDeleteButton: Locator;
readonly reservationEditStartTextfield: Locator;
readonly reservationEditEndTextfield: Locator;
readonly reservationClientButton: Locator;
readonly reservationRoomButton: Locator;
readonly reservationBillButton: Locator;
readonly reservationSaveButton: Locator;
readonly lastelement: Locator;
readonly secondlement: Locator;

constructor(page: Page) {
    this.page = page;
    this.reservationAltButton = page.locator('#app > div > div.reservations > div:nth-child(1) > div.action > img');
    this.reservationEditButton = page.locator('#app > div > div.reservations > div > div.menu > a:nth-child(1)');
    this.reservationDeleteButton = page.locator('#app > div > div.reservations > div:nth-child(1) > div.menu > a:nth-child(2)');
    this.reservationEditStartTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
    this.reservationEditEndTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > input[type=text]');
    this.reservationClientButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select');
    this.reservationRoomButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select');
    this.reservationBillButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(7) > select');
    this.reservationSaveButton = page.locator('#app > div > div.actions > a.btn.blue');
    this.lastelement = page.locator('#app > div > div.reservations > div:nth-last-child(1)');
    this.reservationEditStartTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]')
    this.secondlement = page.locator('#app > div > div.reservations > div:nth-child(2)')
}

async EditReservation() {
    await this.reservationAltButton.click();
    await this.reservationEditButton.click();
    await this.reservationEditStartTextfield.fill("2024-10-10");
    await this.reservationEditEndTextfield.fill("2024-10-15");
    await this.reservationClientButton.selectOption({ index: 2 });
    await this.reservationRoomButton.selectOption({ index: 2 }); 
    await this.reservationBillButton.selectOption({ index: 1 });
    await this.reservationSaveButton.click();
    await this.page.waitForTimeout(500);
}

async DeleteReservation() {
    await this.reservationAltButton.click();
    await this.reservationDeleteButton.click();
}

async VerifyDeleteReservation(){   
    await expect(this.secondlement).not.toBeVisible();
}
}
