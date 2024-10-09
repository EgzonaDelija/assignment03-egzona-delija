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
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]', "Egzona Delija");
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=email]', "Egzona@gmail.se");
    await page.fill('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]', "070200000");
    await page.getByText('Save').click()
    await expect(page.getByRole('heading', { name: 'Egzona Delija'})).toBeVisible();
  });

  test('Log in and log out', async ({ page }) => {
    await page.goto('http://localhost:3000/login/');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview'})).toBeVisible();

    //Logga ut
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });



});

  test('Backend - Get all Clients', async ({ request }) => {
  const response = await request.post('http://localhost:3000/api/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    }
  });

  const jsonResponse = await response.json();
  const accessToken = jsonResponse.token;
  const username = process.env.TEST_USERNAME;
  const getPostsResponse = await request.get('http://localhost:3000/api/clients', {
    headers: {
      'x-user-auth': JSON.stringify({ 
        username: username,
        token: accessToken
      }),
      'Content-Type': 'application/json'
    }
  });
  expect(getPostsResponse.ok()).toBeTruthy();
  expect(getPostsResponse.status()).toBe(200);

  const getAllClients = await getPostsResponse.json();
  console.log(getAllClients);
});


test(' Backend - Get all Rooms', async ({ request }) => {

  const response = await request.post('http://localhost:3000/api/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    }
  });

  const jsonResponse = await response.json();
  const accessToken = jsonResponse.token;
  const username = process.env.TEST_USERNAME;


  const getPostsResponse = await request.get('http://localhost:3000/api/Rooms', {
    headers: {
      'x-user-auth': JSON.stringify({
        username: username,
        token: accessToken
      }),
      'Content-Type': 'application/json'
    }
  });
  expect(getPostsResponse.ok()).toBeTruthy();
  expect(getPostsResponse.status()).toBe(200);
  const getAllRooms = await getPostsResponse.json();
  console.log(getAllRooms);

});

test('Delete a client', async ({ request }) => {
  // Logga in för att få en token
  const response = await request.post('http://localhost:3000/api/login', {
      headers: {
          'Content-Type': 'application/json',
      },
      data: {
          username: process.env.TEST_USERNAME,
          password: process.env.TEST_PASSWORD
      }
  });

  const jsonResponse = await response.json();
  const accessToken = jsonResponse.token;
  const username = process.env.TEST_USERNAME;

  // Skicka DELETE-förfrågan för att ta bort en klient
  const deleteResponse = await request.delete('http://localhost:3000/api/client/3', { // '123' är ID:t på klienten du vill ta bort
      headers: {
          'x-user-auth': JSON.stringify({
              username: username,
              token: accessToken
          }),
          'Content-Type': 'application/json'
      }
  });

  // Kontrollera att svaret är korrekt
  expect(deleteResponse.ok()).toBeTruthy(); // Kontrollera att begäran var lyckad
  expect(deleteResponse.status()).toBe(200); // Kontrollera att statuskoden är 200 eller 204

  const deleteResult = await deleteResponse.json();
  console.log(deleteResult); // Detta kan hjälpa dig att se om något specifikt returneras efter borttagningen
});