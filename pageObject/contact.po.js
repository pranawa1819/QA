const {expect} = require("@playwright/test");  
exports.Contactpage = class Contactpage{ 
   constructor(page){   // then we create a constructor where we define locator
        this.page = page;
        this.firstName = '#firstName';

        this.lastName = '#lastname';
        this.DOB ="#birthdate";
        this.email='#email';
        this.phonenumber ='xpath=//input[@id="phone"]';
        this.streetAddress1 = 'xpath=//input[@placeholder="Address 1"]';
        this.streetAddress2 = 'xpath=//input[@placeholder="Address 2"]';
        this.city ='xpath=//input[@placeholder="City"]';
        this.state = "#stateProvince"; 
        this.postalCode='#postalCode';
        this.Country='#country';
        this.Submit='xpath=//button[@id="submit"]';
        this.cancle='xpath=//button[@id="cancle"]';
        this.addContactButton = '//button[contains(text(), "Add a new contact")]';

        this.editContactBtn='#edit-contact';

    }

     async Contact(firstname,lastname,dob,email,phonenumber,streetaddress1,streetaddress2,city,state,postalcode,country){  // we perform action 
        await this.page.waitForSelector(this.addContactButton, { state: 'visible', timeout: 10000 }); 

        await this.page.locator(this.addContactButton).click();
        await this.page.locator(this.firstName).fill(firstname);
        await this.page.locator(this.lastName).fill(lastname);
        await this.page.locator(this.DOB).fill(dob);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phonenumber).fill(phonenumber);
        await this.page.locator(this.streetAddress1).fill(streetaddress1);
        await this.page.locator(this.streetAddress2).fill(streetaddress2);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.state).fill(state);
        await this.page.locator(this.postalCode).fill(postalcode);
        await this.page.locator(this.Country).fill(country);
        
        await this.page.locator(this.Submit).click();
        await this.page.locator(this.cancle).click();

    }

    async validateContactCreated(firstname,lastname,dob,email,phonenumber,streetaddress1,streetaddress2,city,state,postalcode,country){
        const firstnameValidation = await this.page.locator(this.firstName);
        const lastnameValidation = await this.page.locator(this.lastName);
        const dobValidation = await this.page.locator(this.birthdate);
        const emailValidation =await this.page.locator(this.email);
        const phonenumberValidation = await this.page.locator(this.phone);
        const streetaddress1Validation = await this.page.locator(this.street1);
        const streetaddress2Validation = await this.page.locator(this.street2);
        const cityValidation= await this.page.locator(this.city);
        const stateValidation = await this.page.locator(this.state);
        const postalcodeValidation = await this.page.locator(this.postalcode);
        const countryValidation = await this.page.locator(this.country);

        await expect(firstnameValidation).toHaveText(firstname);
        await expect(lastnameValidation).toHaveText(lastname);
        await expect(dobValidation).toHaveText(dob);
        await expect(emailValidation).toHaveText(email);
        await expect(phonenumberValidation).toHaveText(phonenumber);
        await expect(streetaddress1Validation).toHaveText(streetaddress1);
        await expect(streetaddress2Validation).toHaveText(streetaddress2);
        await expect(cityValidation).toHaveText(city);
        await expect(stateValidation).toHaveText(state);
        await expect(postalcodeValidation).toHaveText(postalcode);
        await expect(countryValidation).toHaveText(country);
    }
    

    async contactEdit(firstname, lastname, dob){
        await this.page.locator(this.editContactBtn).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstName).clear(); // Clear the existing first name
        await this.page.locator(this.firstName).fill(firstname);
        await this.page.locator(this.lastName).clear();
        await this.page.locator(this.lastName).fill(lastname);
        await this.page.locator(this.birthdate).fill(dob);
        await this.page.locator(this.Submit).click();
        await this.page.waitForTimeout(5000);

    }
    async openContactByEmail(email) {
        await this.page.locator('text=${email}').first().click();
    }

    async contactDelete(){
        
    }
}
