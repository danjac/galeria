import * as api from './api';
import {
  push,
} from 'react-router-redux';

export function getPopularImages() {
  return dispatch => {
    dispatch({
      type: 'FETCH_IMAGES_REQUEST',
    });
    api.get('api/images/')
      .then(payload => {
        dispatch({
          type: 'FETCH_IMAGES_SUCCESS',
          payload,
        });
      })
      .catch(error => dispatch({
        type: 'FETCH_IMAGES_FAILURE',
        error,
      }));
  };
}

export function getCurrentUser() {
  if (api.getAuthToken()) {
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
        .catch(error => dispatch({
          type: 'CURRENT_USER_FAILURE',
          error,
        }));
    };
  }
  return {
    type: 'CURRENT_USER_FAILURE',
  };
}

export function logout() {
  api.deleteAuthToken();
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
        api.setAuthToken(data.token);
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
