const AUTH_TOKEN = 'auth-token';

export function getAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN);
}

export function saveAuthToken(token) {
  window.localStorage.setItem(AUTH_TOKEN, token);
}

export function deleteAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN);
}
