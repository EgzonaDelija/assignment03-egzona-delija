import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RoomEdit {
  readonly page: Page;
  readonly createRoomButton:Locator;
  readonly roomAltButton: Locator;
  readonly rooomEditButton: Locator;
  readonly roomDeleteButton: Locator;
  readonly roomNumberTextfield: Locator;
  readonly roomFloorTextfield: Locator;
  readonly roomAvailableButton: Locator;
  readonly roomPriceTextfield: Locator;
  readonly roomFeaturesButton: Locator;
  readonly roomSaveButton: Locator;
  readonly roomBackButton: Locator;
  readonly firstelement: Locator;
  readonly room2AltButton: Locator;
  readonly secondelement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('link', { name: 'Create Room' });
    this.roomAltButton = page.locator('#app > div > div.rooms > div:nth-child(1) > div.action > img');
    this.rooomEditButton = page.getByText('Edit');
    this.roomDeleteButton = page.getByText('Delete');
    this.roomNumberTextfield = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton')
    this.roomFloorTextfield = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton')
    this.roomAvailableButton = page.locator('.checkbox');
    this.roomPriceTextfield = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton')
    this.roomFeaturesButton = page.getByRole('listbox')
    this.roomSaveButton = page.locator('#app > div > div.actions > a.btn.blue');
    this.roomBackButton = page.locator('#app > div > div:nth-child(3) > a')
    this.firstelement = page.locator('#app > div > div.rooms > div:nth-child(1)');
    this.room2AltButton = page.locator('#app > div > div.rooms > div:nth-child(2) > div.action > img');
    this.secondelement = page.locator('#app > div > div.rooms > div:nth-child(2) > div:nth-child(2) > h3');
  }

  async EditRoom() {
    await this.roomAltButton.click();
    await this.rooomEditButton.click();
    await this.roomNumberTextfield.fill("1");
    await this.roomFloorTextfield.fill(" 6");
    await this.roomAvailableButton.click();
    await this.roomPriceTextfield.fill('3545');
    await this.roomFeaturesButton.click();
    await this.roomSaveButton.click();
  }

  async DeleteRoom() {
    await this.room2AltButton.click();
    await this.roomDeleteButton.click();
}

async veryifryEditroom() {
  await expect(this.firstelement).toContainText("1");
  await expect(this.firstelement).toContainText("6");
  await expect(this.firstelement).toContainText("3545");
}

async verifyDeleteroom() {
  await expect(this.secondelement).not.toContainText("Floor 1, Room 102");
}
}