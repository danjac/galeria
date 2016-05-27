import fetch from 'isomorphic-fetch';
import { partial } from 'lodash';

const BASE_URL = 'http://localhost:8000/';


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

  const token = window.localStorage.getItem('JWT-TOKEN');

  if (token) {
    headers.Authorization = 'JWT ' + token;
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
