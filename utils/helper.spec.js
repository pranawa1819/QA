import axios from "axios";
import { expect } from "@playwright/test";
import cookie from "cookie";
let apiUrl;

export async function authenticateUser(username, password, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = {
    email: username,
    password: password,
  };
  const response = await request.post(`${apiUrl}/users/login`, {
    data: requestBody,
    headers,
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  const token = responseBody.token;
  return token;
}

export async function getApiBaseUrl() {
  apiUrl = process.env.API_BASE_URL;
  if (!apiUrl) {
    apiUrl = "https://thinking-tester-contact-list.herokuapp.com";
  }
  return apiUrl;
}

export async function createEntity(Data, token, path, { request }) {
  const apiUrl = await getApiBaseUrl();
  // const headers = {
  //   "Content-Type": "application/json",

  const response = await request.post(`${apiUrl}${path}`, {
    data: Data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  const statusCode = response.status();
  expect(statusCode).toBe(201);
  if (responseBody && responseBody.id) {
    return responseBody.id;
  } else {
    return null;
  }
  // expect(addResponse.status()).toBe(201);
}

export async function getEntity(accessToken, module, status, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
     Authorization: `Bearer ${accessToken}`,
  };
  const response = await request.get(apiUrl + module, {
    headers,
  });


  const statusCode = response.status();
  expect(statusCode).toBe(200);
  const responseBody = await response.json();
  if (responseBody && responseBody[0]._id) {
    return responseBody[0]._id;
  } else {
    return null;
  }
}
async function deleteEntity(accessToken,module,{request}){
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await request.delete(apiUrl + module, {
    headers,
  });
  const statusCode = response.status();
  expect([200, 204]).toContain(statusCode);
}


async function getCurrentDateTimeStamp(params) {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
async function validateEntity(accessToken, module,status, {request}){
  const apiUrl = await getApiBaseUrl();
  const headers ={
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await request.get(apiUrl + module, {
    headers,
  });
  const statusCode = response.status();
  expect(statusCode).toBe(parseInt(status));
}

module.exports = { authenticateUser, createEntity, getEntity, deleteEntity, getCurrentDateTimeStamp, validateEntity };