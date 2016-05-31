import * as api from '../api';
import * as storage from '../storage';
import { push } from 'react-router-redux';

export function getCurrentUser() {
  if (storage.getAuthToken()) {
    return dispatch => {
      dispatch({
        type: 'CURRENT_USER_REQUEST',
      });
      api.get('api/auth-user/')
        .then(payload => {
          dispatch({
            type: 'CURRENT_USER_SUCCESS',
            payload,
          });
        })
        .catch(error => {
          storage.deleteAuthToken();
          dispatch({
            type: 'CURRENT_USER_FAILURE',
            error,
          });
        });
    };
  }
  return {
    type: 'CURRENT_USER_FAILURE',
  };
}

export function logout() {
  storage.deleteAuthToken();
  return {
    type: 'LOGOUT',
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST',
    });
    api.post('api-token-auth/', {
      username,
      password,
    })
    .then(data => {
      if (data.token) {
        storage.saveAuthToken(data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
        });
        dispatch(getCurrentUser());
        dispatch(push('/'));
      }
    })
    .catch(error => dispatch({
      type: 'LOGIN_FAILURE',
      error,
    }));
  };
}
