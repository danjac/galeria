const initialState = {
  results: [],
  deleted: [],
  isLoading: false,
  count: 0,
  next: null,
  previous: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_IMAGES_REQUEST':
      return Object.assign({}, state, { isLoading: true });
    case 'FETCH_IMAGES_SUCCESS':
      return Object.assign({}, state, action.payload, { isLoading: false });
    case 'DELETE_IMAGE_REQUEST':
      return Object.assign({}, state, { deleted: state.deleted.concat(action.payload) });
    default:
      return state;
  }
}
