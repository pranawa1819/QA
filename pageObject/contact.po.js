const { expect } = require("@playwright/test");
exports.ContactValidation = class ContactValidation {
  constructor(page) {   // then we create a constructor where we define locator
    this.page = page;
    this.addButton = "#add-contact";
    this.firstName = "//input[@id='firstName']";
    this.lastName = "//input[@id='lastName']";
    this.birthDate = "//input[@id='birthdate']";
    this.email = "//input[@id='email']";
    this.phoneNumber = "//input[@id='phone']";
    this.streetone = "//input[@id='street1']";
    this.streettwo = "//input[@id='street2']";
    this.stateProvince = "//input[@id='stateProvince']";
    this.city = "//input[@id='city']";
    this.postalCode = "//input[@id='postalCode']";
    this.country = "//input[@id='country']";
    this.submitButton = "//button[@id='submit']";
    this.afterText = "//p[text()='Click on any contact to view the Contact Details']";
    this.tableClick = "//td[text()=`${fname}`]";
    this.errormsg = "//span[@id='error']";
    this.editbutton = "//button[@id='edit-contact']";

  }

  async fillContact(
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    streetone,
    streettwo,
    stateProvince,
    city,
    postalCode,
    country
  ) {
    await this.page.locator(this.addButton).click();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.birthDate).fill(birthDate);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phoneNumber).fill(phoneNumber);
    await this.page.locator(this.streetone).fill(streetone);
    await this.page.locator(this.streettwo).fill(streettwo);
    await this.page.locator(this.stateProvince).fill(stateProvince);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.postalCode).fill(postalCode);
    await this.page.locator(this.country).fill(country);
    await this.page.locator(this.submitButton).click();
  }

  async validFill( 
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    streetone,
    streettwo,
    stateProvince,
    city,
    postalCode,
    country
  ) {
    const firstnameValidation = await this.page.locator(this.firstName);
    const lastnameValidation = await this.page.locator(this.lastName);
    const dobValidation = await this.page.locator(this.birthDate);
    const emailValidation = await this.page.locator(this.email);
    const phonenumberValidation = await this.page.locator(this.phoneNumber);
    const streetaddress1Validation = await this.page.locator(this.streetone);
    const streetaddress2Validation = await this.page.locator(this.streettwo);
    const cityValidation = await this.page.locator(this.city);
    const stateValidation = await this.page.locator(this.stateProvince);
    const postalcodeValidation = await this.page.locator(this.postalCode);
    const countryValidation = await this.page.locator(this.country);

    await expect(firstnameValidation).toHaveText(firstName);
    await expect(lastnameValidation).toHaveText(lastName);
    await expect(dobValidation).toHaveText(birthDate);
    await expect(emailValidation).toHaveText(email);
    await expect(phonenumberValidation).toHaveText(phoneNumber);
    await expect(streetaddress1Validation).toHaveText(streetone);
    await expect(streetaddress2Validation).toHaveText(streettwo);
    await expect(cityValidation).toHaveText(city);
    await expect(stateValidation).toHaveText(stateProvince);
    await expect(postalcodeValidation).toHaveText(postalCode);
    await expect(countryValidation).toHaveText(country);
  }


  async viewContact(fname, lname) {
    await this.page.locator(`//td[text()='${fname} ${lname}']`).click();
    const expfname = this.page.locator('//span[@id="firstName"]');
    const explname = this.page.locator('//span[@id="lastName"]');
    await expect(expfname).toHaveText(fname);
    await expect(explname).toHaveText(lname);
  }

  async contactEdit(fname, lname,birthDate,email, phoneNumber, streetone, streettwo, stateProvince, city, postalCode, country) {
    await this.page.locator(this.editbutton).click();
    await this.page.waitForTimeout(2000); // Wait for the edit form to load
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(fname);

    await this.page.locator(this.lastName).clear();
    await this.page.locator(this.lastName).fill(lname);

    await this.page.locator(this.birthDate).clear();
    await this.page.locator(this.birthDate).fill(birthDate);

    await this.page.locator(this.email).clear();
    await this.page.locator(this.email).fill(email);

    await this.page.locator(this.phoneNumber).clear();
    await this.page.locator(this.phoneNumber).fill(phoneNumber);

    await this.page.locator(this.streetone).clear();
    await this.page.locator(this.streetone).fill(streetone);

    await this.page.locator(this.streettwo).clear();
    await this.page.locator(this.streettwo).fill(streettwo);

    await this.page.locator(this.stateProvince).clear();
    await this.page.locator(this.stateProvince).fill(stateProvince);

    await this.page.locator(this.city).clear();
    await this.page.locator(this.city).fill(city);

    await this.page.locator(this.postalCode).clear();
    await this.page.locator(this.postalCode).fill(postalCode);

    await this.page.locator(this.country).clear();
    await this.page.waitForTimeout(2000); // Wait for any potential UI updates
    await this.page.locator(this.country).fill(country);

    await this.page.locator(this.submitButton).click();
    await expect(this.page.locator('//span[@id="firstName"]')).toHaveText(fname);
    await expect(this.page.locator('//span[@id="lastName"]')).toHaveText(lname);
  }

   async contactDelete(){
    await this.page.waitForTimeout(2000);
    this.page.once('dialog', async dialog => {
      console.log('Dialog message: ${dialog.message()}');
      await dialog.accept();
   });
   await this.page.locator(this.deleteContact).click();
}
}