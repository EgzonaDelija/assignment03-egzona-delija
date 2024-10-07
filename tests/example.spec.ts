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
    
   
    
  });*/
  
});

test.describe('Backend tests', () => {

  test('Create a client', async ({ request }) => {

    const response = await request.post('http://localhost:3000/api/login', {

      data:{

        "username": `${process.env.TEST_USERNAME}`,

        "password": `${process.env.TEST_PASSWORD}`

      }      

    });

    expect (response.ok()).toBeTruthy();    

    const createClientResponse = await request.post('http://localhost:3000/api/clients', {
      data: {
        "name": "Anna Johansson",
        "email": "Anna@HJohansson.se",
        "telephone": "28473268"
      }
    });


  });  
  test('Create a bill', async ({ request }) => {

    const response = await request.post('http://localhost:3000/api/login', {

      data:{

        "username": `${process.env.TEST_USERNAME}`,

        "password": `${process.env.TEST_PASSWORD}`

      }      

    });

    expect (response.ok()).toBeTruthy();    


    const createBillResponse = await request.post('http://localhost:3000/api/bills', {

      data: {
        "value": 500,  
        "paid": true   
      }

});

expect(createBillResponse.ok()).toBeTruthy();
 

}); 
}); 