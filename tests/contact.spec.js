import {test, expect} from '@playwright/test';
import { Contactpage } from '../pageObject/contact.po.js';
import { Loginpage } from '../pageObject/login.po.js';
const{ authenticateUser, createEntity } = require('../utils/helper.spec.js');
let accessToken; // we create a variable to store the access token


const testData= require('../fixtures/contactFixture.json');
const testData2 = require('../fixtures/loginFixture.json');


test.beforeEach(async({page})=>{    //we have multiple test so to group the common code we use beforeEach
    const Login = new Loginpage(page);
    await page.goto('/');  //it take the base url
    await Login.login("pranawakc96@gmail.com", "hellopanda")
    await Login.verifyValidLogin();
})


test.describe('Valid contact form tests',()=>{         // if we have to give description of the test we use test.describe
    test('Submit Valid Contact form', async({page})=>{   //we call async function
        const contact =new Contactpage(page); // we create an object of class Loginpage
        await contact.Contact(
            testData.validcontact.firstname,
            testData.validcontact.lastname,
            testData.validcontact.dob,
            testData.validcontact.email,
            testData.validcontact.phonenumber,
            testData.validcontact.streetaddress1,
            testData.validcontact.streetaddress2,
            testData.validcontact.city,
            testData.validcontact.state,
            testData.validcontact.postalcode,
            testData.validcontact.country
        ); // we pass the valid username and password to the async function
        await contact.viewContact();
        await contact.verifyValidSubmit(testData.validform.firstname,
            testData.validcontact.lastname,
            testData.validcontact.dob,
            testData.validcontact.email,
            testData.validcontact.phonenumber,
            testData.validcontact.streetaddress1,
            testData.validcontact.streetaddress2,
            testData.validcontact.city,
            testData.validcontact.state,
            testData.validcontact.postalcode,
            testData.validcontact.country
        );
    });

    test('Contact Edit Test', async({page, request})=>{ 

        const Data ={
            "firstName": "Pranav",
            "lastName": "K.C",
            "dob": "1996-01-01",
            "email": "pranavkc7@gmail.com",
            "phone": "9850687312",
            "streetAddress1": "Bansbari",
            "streetAddress2": "Street 2",
            "city": "Kathmandu",    
            "state": "Bagmati",
            "postalCode": "44500",
            "country": "Nepal"
        }

        const contact = new Contactpage(page);
        accessToken = await authenticateUser(testData2.validUser.username, testData2.validUser.password, {request}); // we call the authenticateUser function to get the access token
        await createEntity(Data, accessToken,'/contact',{request}); // we call the createEntity function to create a new contact
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(testData.contactEdit.firstName);
        await contact.validateContactCreated(testData.contactEdit.firstName, testData.contactEdit.lastName, testData.contactEdit.dob, testData.contactEdit.email, testData.contactEdit.phone, testData.contactEdit.streetAddress1, testData.contactEdit.streetAddress2, testData.contactEdit.city, testData.contactEdit.state, testData.contactEdit.postalCode, testData.contactEdit.country);
        const id = await getEntity(accessToken,'/contacts','200',{request});
        await deleteEntity(accessToken, '/contact/${id}',{request});
        await validateEntity(accessToken,'/contact/${id}','404',{request});
    });  
})

test.afterEach(async({page})=>{ // we use afterEach to close the browser after each test
    await page.close();
}) // we close the page after each test

