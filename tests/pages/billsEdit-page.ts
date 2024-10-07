import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class BillsEdit {

readonly page: Page;
readonly billsViewButton: Locator;
readonly createBillsButton: Locator; 
readonly billsValueTextfield: Locator;
readonly billsPaidCheckbox: Locator;
readonly billsSaveButton: Locator;
readonly billsBackButton: Locator;
readonly lastelement: Locator;
readonly bills1AltButton: Locator;
readonly billsEditButton: Locator;
readonly billsDeleteButton: Locator;
readonly bills3AltButton: Locator;
readonly bills3DeleteButton: Locator;
readonly firstelement: Locator;
readonly thirdelement: Locator;

constructor(page: Page) {

    this.page = page;
    this.billsViewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.createBillsButton = page.getByRole('link', { name: 'Create Bill' });
    this.billsValueTextfield = page.getByRole('spinbutton');
    this.billsPaidCheckbox = page.locator('.checkbox');
    this.billsSaveButton = page.getByText('Save');
    this.billsBackButton = page.getByRole('link', { name: 'Back' });
    this.bills1AltButton = page.locator('div').filter({ hasText: /^ID: 1Value: 4500krPaid: No$/ }).locator('div').nth(2);
    this.billsEditButton = page.locator('#app > div > div.bills > div:nth-child(1) > div.menu > a:nth-child(1)');
    this.billsDeleteButton = page.locator('#app > div > div.bills > div:nth-child(1) > div.menu > a:nth-child(2)');
    this.bills3DeleteButton = page.locator('#app > div > div.bills > div:nth-child(3) > div.menu > a:nth-child(2)');
    this.lastelement = page.locator('#app > div > div.bills > div:nth-last-child(1)');
    this.bills3AltButton = page.locator('#app > div > div.bills > div:nth-child(3) > div.action > img');
    this.firstelement = page.locator('#app > div > div.bills > div:nth-child(1)');
    this.thirdelement = page.locator('#app > div > div.bills > div:nth-child(3)');
}

async EditBills() {
    await this.bills1AltButton.click();
    await this.billsEditButton.click();
    await this.billsValueTextfield.fill("5999");
    await this.billsPaidCheckbox.click();
    await this.billsSaveButton.click();
    await this.page.waitForTimeout(500);
}

async DeleteBills() {
    await this.bills3AltButton.click();
    await this.bills3DeleteButton.click();
}

async verifyEditBills() {
    await expect(this.firstelement).toContainText("5999");
}

async verifyDeleteBills() {
    await expect(this.thirdelement).not.toBeVisible();
}
}