import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class BillsView {

    readonly page: Page;
    readonly billsViewButton: Locator;
    readonly lastelement: Locator;
    readonly firstelement: Locator;

constructor(page: Page) {

    this.page = page;
    this.billsViewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.lastelement = page.locator('#app > div > div.bills > div:nth-last-child(1)');
    this.firstelement = page.locator('#app > div > div.bills > div:nth-child(1)');
}

async ViewBills() {
    await this.billsViewButton.click();
}

async verifyfirstelement() {
    await expect(this.firstelement).toContainText('Value: 4500kr');
}

async verifylastelement(price: string) {
    await expect(this.lastelement).toContainText(price);
}
}
