import * as api from '../api';

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
