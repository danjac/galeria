import * as api from './api';
import { push } from 'react-router-redux';

export function getCurrentUser() {
  if (window.localStorage.getItem('JWT-TOKEN')) {
    return dispatch => {
      dispatch({ type: 'CURRENT_USER_REQUEST' });
      api.get('api/auth-user/')
      .then(data => {
        dispatch({ type: 'CURRENT_USER_SUCCESS', payload: data });
      })
      .catch(error => dispatch({ type: 'CURRENT_USER_FAILURE', error }));
    };
  }
}

export function logout() {
  window.localStorage.removeItem('JWT-TOKEN');
  return { type: 'LOGOUT' };
}

export function login(username, password) {
  return dispatch => {
    dispatch({ type: 'LOGIN_REQUEST' });
    api.post('api-token-auth/', { username, password })
    .then(data => {
      if (data.token) {
        window.localStorage.setItem('JWT-TOKEN', data.token);
        dispatch({ type: 'LOGIN_SUCCESS' });
        dispatch(getCurrentUser());
        dispatch(push('/'));
      }
    })
    .catch(error => dispatch({ type: 'LOGIN_FAILURE', error }));
  };
}
