import {test, expect} from '@playwright/test';
import { Loginpage } from '../pageObject/login.po.js';
const testData2= require('../fixtures/loginFixture.json');

test.beforeEach(async({page})=>{    //we have multiple test so to group the common code we use beforeEach
    await page.goto('/');  //it take the base url
})

test.describe('Valid login tests',()=>{         // if we have to give description of the test we use test.describe
    test('Login using valid username and password', async({page})=>{   //we call async function
        const login =new Loginpage(page); // we create an object of class Loginpage
        await login.login("pranawakc96@gmail.com", "hellopanda"); // we pass the valid username and password to the async function
        await login.verifyValidLogin();
    });
})

test.describe('Invalid login tests',()=>{         // if we have to give description of the test we use test.describe
    test('Login using invalid username and valid password', async({page})=>{   //we call async function
        const login =new Loginpage(page); // we create an object of class Loginpage
       // await login.login("panda@gmail.com","hellopanda"); // we pass the invalid username and password to the async function
    
       await login.login(testData2.invalidUser.username, testData2.validUser.password); // we pass the invalid username and password to the async function from the fixture file
       await login.verifyInvalidLogin(); // we call the verifyInvalidLogin function to check if the alert message is visible or not
    });

    test('Login using valid username and invalid password',async({page})=>{
      const login = new Loginpage(page);
      //await login.login("pranawakc96@gmail.com", "hellopanda123");
      await login.login(testData2.validUser.username, testData2.invalidUser.password);
      await login.verifyInvalidLogin();
    });

    test('Login using invalid username and invalid password',async({page})=>{
     const login = new Loginpage(page);
     //await login.login("panda@gmail.com", "hellopanda123");
     await login.login(testData2.invalidUser.username, testData2.invalidUser.password);
     await login.verifyInvalidLogin(); 
    });
})

/*
test.afterEach(async({page})=>{    //we have multiple test so to group the common code we use afterEach
    await page.close();  //it close the page after each test
}) // we use afterEach to close the page after each test

*/
