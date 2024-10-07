import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateRoomsPage {
  //Attributes
  readonly page: Page;
  readonly roomViewButton: Locator;
  readonly createRoomButton: Locator;
  readonly roomCategoryButton: Locator; 
  readonly roomNumberTextfield: Locator;
  readonly roomFloorTextfield: Locator;
  readonly roomAvailableButton: Locator;
  readonly roomPriceTextfield: Locator;
  readonly roomFeaturesButton: Locator;
  readonly roomSaveButton: Locator;

  constructor(page: Page) {
    //Constructor
    this.page = page;
    this.roomViewButton = page.locator('#app > div > div > div:nth-child(1) > a');
    this.createRoomButton = page.getByRole('link', { name: 'Create Room' });
    this.roomCategoryButton = page.getByRole('combobox');
    this.roomNumberTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=number]');
    this.roomFloorTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=number]');
    this.roomAvailableButton = page.locator('.checkbox');
    this.roomPriceTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > input[type=number]');
    this.roomFeaturesButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select');
    this.roomSaveButton = page.locator('#app > div > div.actions > a.btn.blue');
  }

  async CreateRoom(roomNumber: string, roomFloor: string, roomPrice: string) {
    // Navigate to the room creation view and fill out the form
    await this.createRoomButton.click();
    await this.roomCategoryButton.selectOption({ index: 1 });
    await this.roomNumberTextfield.fill(roomNumber);
    await this.roomFloorTextfield.fill(roomFloor);
    await this.roomAvailableButton.click();
    await this.roomPriceTextfield.fill(roomPrice);
    await this.roomFeaturesButton.selectOption({ index: 2 }); 
    await this.roomSaveButton.click();
  }

  async filloutRoomInformationForm() {
    // Generate random data using faker
    const roomNumber = faker.number.float({ min: 20, max: 30 }).toFixed(0);
    const roomFloor = faker.number.int({ min: 1, max: 10 }).toString();
    const roomPrice = faker.commerce.price({ min: 999, max: 5000, dec: 0 });

    // Fill out the room information with the generated data
    await this.roomNumberTextfield.fill(roomNumber);
    await this.roomFloorTextfield.fill(roomFloor);
    await this.roomPriceTextfield.fill(roomPrice);
  }
}
