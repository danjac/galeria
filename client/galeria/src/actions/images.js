import { push } from 'react-router-redux';
import * as api from '../api';

export function updateSearchQuery(query) {
  return { type: 'UPDATE_SEARCH_QUERY', payload: query };
}

export function search(query) {
  return dispatch => {
    dispatch({
      type: 'FETCH_IMAGES_REQUEST',
    });
    api.get(`api/images/search/?q=${query}&page=1`)
      .then(payload => {
        dispatch({
          type: 'FETCH_IMAGES_SUCCESS',
          payload,
        });
        dispatch(push('/'));
      })
      .catch(error => dispatch({
        type: 'FETCH_IMAGES_FAILURE',
        error,
      }));
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
