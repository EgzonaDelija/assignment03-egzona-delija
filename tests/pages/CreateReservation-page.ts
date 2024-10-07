import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateReservationPage {

    readonly page: Page;  
    readonly createReservationButton: Locator;
    readonly reservationStartTextfield: Locator; 
    readonly reservationEndTextfield: Locator;
    readonly reservationClientButton: Locator;
    readonly reservationRoomButton: Locator;
    readonly reservationBillButton: Locator;
    readonly reservationSaveButton: Locator;
    readonly lastelement: Locator;
    
constructor(page: Page) {

    this.page = page;
    this.createReservationButton = page.locator('#app > div > h2 > a'); 
    this.reservationStartTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
    this.reservationEndTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=text]');
    this.reservationClientButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select');
    this.reservationRoomButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select');
    this.reservationBillButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select');
    this.reservationSaveButton = page.locator('#app > div > div.actions > a.btn.blue');
    this.lastelement = page.locator('#app > div > div.reservations > div:nth-last-child(1)');
    }

async createReservation(reservationStart: string, reservationEnd: string) {
    await this.createReservationButton.click();
    await this.reservationStartTextfield.fill(reservationStart);
    await this.reservationEndTextfield.fill(reservationEnd);
    await this.reservationClientButton.selectOption({ index: 1 });
    await this.reservationRoomButton.selectOption({ index: 1 });
    await this.reservationBillButton.selectOption({ index: 1 });
    await this.reservationSaveButton.click(); 
    }

async veryifrylastreservation(reservationStart: string, reservationEnd: string) {
    await expect(this.lastelement).toContainText(reservationStart);
    await expect(this.lastelement).toContainText(reservationEnd);
    }

async veryifryManuellyREservation() {
    await expect(this.lastelement).toContainText('2024-09-20');
    await expect(this.lastelement).toContainText('2024-09-25');
}
}