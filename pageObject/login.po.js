// login test cse using model

const {expect} = require("@playwright/test");  // we have to import expect from playwright test

exports.Loginpage = class Loginpage{    //we create a class of login page and export loginpage beacuse we have to use this later in test case
    constructor(page){   // then we create a constructor where we define locator
        this.page = page;
        this.usernameInput = '#email';
        this.password = '//input[@placeholder="Password"]';
        this.loginButton ='//button[@id="submit"]';
        this.logOut='//button[@id="logout"]';
        this.loginValidation ='//p[contains(text(),"Click on any contact to view the Contact Details")]';
        this.alertMessage = '//span[@id="error"]'; 

    }

    async login(username, password){  // we perform action 
      
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.loginButton).click();

    }

    async verifyValidLogin(){  // we perform action 
        const loginValidation = this.page.locator(this.loginValidation);
        const logoutButton = this.page.locator(this.logOut);
        //await this.page.waitForTimeout(2000);
        await expect(logoutButton).toBeVisible();  // we check if the logout button is visible or not'
        await expect(loginValidation).toHaveText("Click on any contact to view the Contact Details");  // we check if the login validation is visible or not
    }

    async verifyInvalidLogin() {  
      const InvalidLogin = await this.page.locator(this.alertMessage);
      await expect(InvalidLogin).toHaveText("Incorrect username or password", { timeout: 10000 });
    }
}

