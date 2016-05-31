import * as api from '../api';

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
