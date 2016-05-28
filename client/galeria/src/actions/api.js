import fetch from 'isomorphic-fetch';
import { partial } from 'lodash';

const BASE_URL = 'http://localhost:8000/';
const AUTH_TOKEN = 'auth-token';

export function getAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN);
}

export function setAuthToken(token) {
  window.localStorage.setItem(AUTH_TOKEN, token);
}

export function deleteAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN);
}


function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function doRequest(method, url, data) {
  const body = data && !(data instanceof window.FormData) ? JSON.stringify(data) : data;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();

  if (token) {
    headers.Authorization = 'Token ' + token;
  }

  return fetch(BASE_URL + url, {
    mode: 'cors',
    method,
    body,
    headers,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export const get = partial(doRequest, 'GET');
export const post = partial(doRequest, 'POST');
export const del = partial(doRequest, 'DELETE');
export const put = partial(doRequest, 'PUT');
export const patch = partial(doRequest, 'PATCH');
