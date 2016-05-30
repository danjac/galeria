import * as api from './api';
import {
  push,
} from 'react-router-redux';

export function deleteImage(id) {
  return dispatch => {
    dispatch({
      type: 'DELETE_IMAGE_REQUEST',
      payload: id,
    });
    api.del(`api/images/${id}/`);
  };
}

export function fetchImage(id) {
  return dispatch => {
    dispatch({
      type: 'FETCH_IMAGE_REQUEST',
    });
    api.get(`api/images/${id}/`)
      .then(payload => {
        dispatch({
          type: 'FETCH_IMAGE_SUCCESS',
          payload,
        });
      })
      .catch(error => dispatch({
        type: 'FETCH_IMAGE_FAILURE',
        error,
      }));
  };
}

export function editImageTitle() {
  return { type: 'EDIT_IMAGE_TITLE' };
}

export function changeImageTitle(id, newTitle) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_IMAGE_TITLE',
      payload: newTitle,
    });
    api.patch(`api/images/${id}/`, { title: newTitle });
  };
}

export function fetchImagesPage(pageNumber) {
  return dispatch => {
    dispatch({
      type: 'FETCH_IMAGES_REQUEST',
    });
    api.get(`api/images/?page=${pageNumber}`)
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


export function getPopularImages() {
  return fetchImagesPage('api/images/');
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
