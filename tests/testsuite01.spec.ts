
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';
import { CreateBillsPage } from './pages/Createbills-page';
import { CreateClientsPage } from './pages/createclients-page';
import { ClientsView } from './pages/clientsview-page';
import { ClientsEdit } from './pages/clientsedit-page';
import { BillsEdit } from './pages/billsEdit-page';
import { BillsView } from './pages/billsView-page';
import { RoomsViewPage } from './pages/roomsViewPage';
import { CreateRoomsPage } from './pages/createrooms-page';
import { RoomEdit } from './pages/Roomedit';
import { CreateReservationPage } from './pages/CreateReservation-page';
import { ReservationViewPage } from './pages/ReservationView-page';
import { ReservationEdit } from './pages/ReservationEdit-page';
import { test, expect, APIResponse } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { stringify } from 'querystring';
import * as testData from './testData';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  await page.waitForTimeout(5000);   
});

test.afterEach(async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.performLogout();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

  test('Login', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });

test.describe('Client Dashboard', () => {
  test('Create Client With Faker', async ({ page }) => {
    const clientsView = new ClientsView(page);
    const createclientsPage = new CreateClientsPage(page);

    await clientsView.ClientsView();
    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();
  
    await createclientsPage.CreateClients(fullName, userEmail, userPhoneNo);
    await clientsView.verifylastelement(fullName, userEmail, userPhoneNo);
  });
  test('Edit Client', async ({ page }) => {
    const clientsView = new ClientsView(page);
    const clientsEdit = new ClientsEdit(page);

    await clientsView.ClientsView();
    await clientsEdit.EditClients();
    await clientsEdit.veryifryEditclient();
});
test('Delete Client', async ({ page }) => {
  const clientsView = new ClientsView(page);
  const clientsEdit = new ClientsEdit(page);

    await clientsView.ClientsView();
    await clientsEdit.DeliteClients();
    await clientsEdit.verifyDeleteClient();
});
});

test.describe('Bills Dashboard', () => {
  test('Create Bill', async ({ page }) => {
    const createBillsPage = new CreateBillsPage(page);
    const billView = new BillsView(page);

    await billView.ViewBills();
    await billView.verifyfirstelement();

    const price = faker.commerce.price({ min: 999, max: 5000, dec: 0 });
    await createBillsPage.CreateBills(price);
    await billView.verifylastelement(price);
    await page.waitForTimeout(500);
    await createBillsPage.CreateBills(price);
    await billView.verifylastelement(price);
  });

  test('Edit Bill', async ({ page }) => {
    const billsEdit = new BillsEdit(page);
    const billView = new BillsView(page);

    await billView.ViewBills();
    await billsEdit.EditBills();
    await billsEdit.verifyEditBills();
  });

  test('Delete Bill', async ({ page }) => {
    const billsEdit = new BillsEdit(page);
    const billView = new BillsView(page);

    await billView.ViewBills();
    await billsEdit.DeleteBills();
    await billsEdit.verifyDeleteBills();
  });
});

test.describe('Room Dashboard', () => {
  test('Create Room', async ({ page }) => {
    const roomsViewPage = new RoomsViewPage(page); 
    const createRoomsPage = new CreateRoomsPage(page);

    await roomsViewPage.RoomsView(); 
    await roomsViewPage.VerifyrommsDashboard(); 

    const roomNumber = faker.number.float({ min: 20, max: 30 }).toFixed(0);
    const roomFloor = faker.number.int({ min: 1, max: 10 }).toString();
    const roomPrice = faker.commerce.price({ min: 999, max: 5000, dec: 0 });
  
    await createRoomsPage.CreateRoom(roomNumber, roomFloor, roomPrice);
    await roomsViewPage.verifylastelement(roomNumber, roomFloor, roomPrice);
  });

  test('Edit Room', async ({ page }) => {
    const roomsViewPage = new RoomsViewPage(page); 
    const roomEdit = new RoomEdit(page);

    await roomsViewPage.RoomsView(); 
    await roomEdit.EditRoom();
    await roomEdit.veryifryEditroom();
  });

  test('Delete Room', async ({ page }) => {
    const roomsViewPage = new RoomsViewPage(page); 
    const roomEdit = new RoomEdit(page);

    await roomsViewPage.RoomsView(); 
    await roomEdit.DeleteRoom();
    await roomEdit.verifyDeleteroom();
  });
});

test.describe('Reservation Dashboard', () => {
  test('Create Reservation', async ({ page }) => {
    const createReservationPage = new CreateReservationPage(page);
    const reservationViewPage = new ReservationViewPage(page);

    await reservationViewPage.ReservationView();
    await reservationViewPage.verifyReservationHeading(); 
    
    const reservationStart = faker.date.future();
    const reservationEnd = faker.date.future();
    const reservationStartString = reservationStart.toISOString().split('T')[0];
    const reservationEndString = reservationEnd.toISOString().split('T')[0];
  
    await createReservationPage.createReservation(reservationStartString, reservationEndString);
    await reservationViewPage.verifylastelement(reservationStartString, reservationEndString);
  });

  test('Edit Reservation', async ({ page }) => {
    const reservationViewPage = new ReservationViewPage(page);
    const reservationEdit = new ReservationEdit(page);

    await reservationViewPage.ReservationView();
    await reservationEdit.EditReservation();
    await reservationViewPage.verifyfirstelement();
  });

  test('Delete Reservation', async ({ page }) => {
    const reservationViewPage = new ReservationViewPage(page);
    const reservationEdit = new ReservationEdit(page);

    await reservationViewPage.ReservationView();
    await reservationEdit.DeleteReservation();
    await reservationEdit.VerifyDeleteReservation();
  });
});

const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Hotel', () => {
    let apiHelper: APIHelper;
    
    test.beforeAll(async ({ request }) => {
        apiHelper = new APIHelper(BASE_URL);
            const login = await apiHelper.login(request);
            expect(login.ok()).toBeTruthy();
            expect (login.status()).toBe(200);
    });
    
    test('Get all Rooms', async ({ request }) => {
        const getAllRooms = await apiHelper.getAllRooms(request);
        expect(getAllRooms.ok()).toBeTruthy();
        expect (getAllRooms.status()).toBe(200);
      });

      test('Get Room By ID', async ({ request }) => {
        const getRoomByID = await apiHelper.getRoomByID(request);
        expect(getRoomByID.ok()).toBeTruthy();
        expect (getRoomByID.status()).toBe(200);
      });

      test('Delete Room By ID', async ({ request }) => {
        const deleteRoomById = await apiHelper.deleteRoomById(request);
        expect(deleteRoomById.ok()).toBeTruthy();
        expect (deleteRoomById.status()).toBe(200);
      });

      test('Update Room Information', async ({ request }) => {
        const payload = testData.generateRoomsData();
        const updateRoom = await apiHelper.updateRoom(request, payload);
        expect(updateRoom.ok()).toBeTruthy();
        expect (updateRoom.status()).toBe(200);
        expect.objectContaining({
            number: payload.number,
            floor: payload.floor,
            price: payload.price,
            id: payload.id
        });
      });

    test('Create Room', async ({ request }) => {
        const payload = testData.generateRoomsData();
        const createRoom = await apiHelper.createRoom(request, payload);
        expect(createRoom.ok()).toBeTruthy();
            expect.objectContaining({
            number: payload.number,
            floor: payload.floor,
            price: payload.price,
            available: payload.available,
            features: expect.arrayContaining(payload.features),
            category: payload.category
        });
    });
    
    test('Get all Bills', async ({ request }) => {
      const getAllBills = await apiHelper.getAllBills(request);
      expect(getAllBills.ok()).toBeTruthy();
      expect (getAllBills.status()).toBe(200);
    });

    test('Create Bill', async ({ request }) => {
        const payload = testData.generateBillData();
        const createBill = await apiHelper.createBill(request, payload);
        expect(createBill.ok()).toBeTruthy();
        expect (createBill.status()).toBe(200);
        expect.objectContaining({
            value: payload.value,
            paid: payload.paid
        });
      });

      test('Create Client', async ({ request }) => {
        const payload = testData.generateClientData();
        const createClient = await apiHelper.createClient(request, payload);
        expect(createClient.ok()).toBeTruthy();
            expect.objectContaining({
            name: payload.name,
            email: payload.email,
            telephone: payload.telephone
    });
    }); 

    test('Get all Clients', async ({ request }) => {
        const getAllClients = await apiHelper.getAllClients(request);
        expect(getAllClients.ok()).toBeTruthy();
        expect (getAllClients.status()).toBe(200);
      });

      test('Delete Client By ID2', async ({ request }) => {
        const allClients = await (await apiHelper.getAllClients(request)).json();
        const lastButOneID = allClients[allClients.length - 2].id;
        expect((await apiHelper.deleteClientById(request, lastButOneID)).ok()).toBeTruthy();
        expect((await apiHelper.getByID(request, lastButOneID)).status()).toBe(404);
    });

    test('Create Reservation', async ({ request }) => {
        const payload = testData.generateReservationData();
        const createReservation = await apiHelper.createReservation(request, payload);
        expect(createReservation.ok()).toBeTruthy();
         expect.objectContaining({
            start: payload.start,
            end: payload.end,
            client: payload.client,
            room: payload.room,
            bill: payload.bill
        });
    });
      
    test('Get All Reservations', async ({ request }) => {
        const getAllReservation = await apiHelper.getAllReservation(request);
        expect(getAllReservation.ok()).toBeTruthy();
        expect (getAllReservation.status()).toBe(200);
      });

    test('Delete Reservation By ID', async ({ request }) => {
        const allReservation = await (await apiHelper.getAllReservation(request)).json();
        const lastButOneID = allReservation[allReservation.length - 1].id;
        expect((await apiHelper.deleteReservationById(request, lastButOneID)).ok()).toBeTruthy();
        expect((await apiHelper.getreservationByID(request, lastButOneID)).status()).toBe(404);
      });
});