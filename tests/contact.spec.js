import {test, expect} from '@playwright/test';
import { ContactValidation } from '../pageObject/contact.po.js';
import { Loginpage } from '../pageObject/login.po.js';
import {createEntity,authenticateUser,getEntity,deleteEntity,validateEntity} from "../utils/helper.spec.js";


const contacttest= require('../fixtures/contactFixture.json');
const testData2 = require('../fixtures/loginFixture.json');


test.beforeEach(async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  const login = new Loginpage(page);
  await login.login("pranawakc96@gmail.com", "hellopanda");
  await login.verifyValidLogin();
});

test.describe("ValidContact", () => {
  test("Valid Contact Credentials", async ({ page }) => {
    const contact = new ContactValidation(page);
    await contact.fillContact(
      contacttest.validcontact.firstName,
      contacttest.validcontact.lastName,
      contacttest.validcontact.birthDate,
      contacttest.validcontact.email,
      contacttest.validcontact.phoneNumber,
      contacttest.validcontact.streetone,
      contacttest.validcontact.streettwo,
      contacttest.validcontact.stateProvince,
      contacttest.validcontact.city,
      contacttest.validcontact.postalCode,
      contacttest.validcontact.country
    );
    await contact.validFill(
      contacttest.validcontact.firstName,
      contacttest.validcontact.lastName,
      contacttest.validcontact.birthDate,
      contacttest.validcontact.email,
      contacttest.validcontact.phoneNumber,
      contacttest.validcontact.streetone,
      contacttest.validcontact.streettwo,
      contacttest.validcontact.stateProvince,
      contacttest.validcontact.city,
      contacttest.validcontact.postalCode,
      contacttest.validcontact.country
    );
  });
});
test.describe("Edit Contact", () => {
  test("Edit Contact", ({ page }) => {
    const contact = new ContactValidation(page);
    contact.editContact(
      contacttest.editcontact.firstName,
      contacttest.editcontact.lastName,
      contacttest.editcontact.birthDate,
      contacttest.editcontact.email,
      contacttest.editcontact.phoneNumber,
      contacttest.editcontact.streetone,
      contacttest.editcontact.streettwo,
      contacttest.editcontact.stateProvince,
      contacttest.editcontact.city,
      contacttest.editcontact.postalCode,
      contacttest.editcontact.country
    );
  });
});

test.only("Contact Edit Test", async ({ page, request }) => {
  const Data = {
    firstName: contacttest.validcontact.firstName,
    lastName: contacttest.validcontact.lastName,
    birthDate: contacttest.validcontact.birthDate,
    email: contacttest.validcontact.email,
    phoneNumber: contacttest.validcontact.phoneNumber,
    streetone: contacttest.validcontact.streetone,
    streettwo: contacttest.validcontact.streettwo,
    stateProvince: contacttest.validcontact.stateProvince,
    city: contacttest.validcontact.city,
    postalCode: contacttest.validcontact.postalCode,
    country: contacttest.validcontact.country
  };
  const contact = new ContactValidation(page);
  const accessToken = await authenticateUser(
    "pranawakc96@gmail.com",
    "hellopanda",
    { request }
  );
  await createEntity(Data, accessToken, "/contacts", { request });
  page.reload();
  await contact.viewContact(Data.firstName, Data.lastName);
  await contact.contactEdit(
    contacttest.editcontact.firstName,  
    contacttest.editcontact.lastName,
    contacttest.editcontact.birthDate, 
    contacttest.editcontact.email,
    contacttest.editcontact.phoneNumber,
    contacttest.editcontact.streetone,
    contacttest.editcontact.streettwo,
    contacttest.editcontact.stateProvince,
    contacttest.editcontact.city,
    contacttest.editcontact.postalCode,
    contacttest.editcontact.country

  );
  console.log(accessToken);
 // await contact.validateContactCreated(contacttest.editcontact.firstName, contacttest.editcontact.lastName);
   const id = await getEntity(accessToken, "/contacts", "200", { request });
   //await deleteEntity(accessToken, `/contact/${id}`, { request });
    console.log(id);
    await deleteEntity(accessToken, `/contacts/${id}`, { request });
   await validateEntity(accessToken, `/contacts/${id}`,'404', { request });

});
test.describe('Contact testcases',() => { 
  test('Contact Add test', async ({ page, request })  => {
  
  });
});
test.afterEach(async ({ page }) => {
  await page.close();
});