import { test, expect } from '@playwright/test';


test.describe('Front-end tests', () => {

  test('Create a client', async ({ page }) => {

    await page.goto('http://localhost:3000/login/');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview'})).toBeVisible();
    await page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
    await page.getByRole('link', { name: 'Create Client' }).click();
    await expect(page.getByRole('heading', { name: 'New Client'})).toBeVisible();
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]', "Anna Johansson");
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=email]', "Anna@HJohansson.se");
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]', "28473268");
    await page.getByText('Save').click()
    await expect(page.getByRole('heading', { name: 'Anna Johansson'})).toBeVisible();
  });

 /* test('Create Room', async ({ page }) => {
    
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('#app > div > div > div:nth-child(1) > a').click();
    await expect(page.getByRole('heading', { name: 'Rooms'})).toBeVisible();
    await page.getByRole('link', { name: 'Create Room' }).click();
    await page.getByRole('combobox').click();
    await page.selectOption('#app > div > div:nth-child(2) > div:nth-child(1) > select', { label: 'Single' });
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=number]', '3');
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=number]', '3');
    await page.locator('.checkbox').click();
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(5) > input[type=number]', '999');
    await page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select > option:nth-child(3)').click();
    await page.locator('#app > div > div.actions > a.btn.blue').click();
    await expect(page.getByRole('heading', { name: 'Floor 3, Room' })).toBeVisible();
    await expect(page.getByText('Category: single')).toBeVisible();
    await expect(page.getByText('Price: 999kr')).toBeVisible();
    await expect(page.getByText('Features: sea view')).toBeVisible();
    await page.getByRole('button', { name: 'save' }).click()
    
  });*/
  
});
  