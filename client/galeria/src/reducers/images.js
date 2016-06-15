const initialState = {
  results: [],
  deleted: [],
  isLoading: false,
  count: 0,
  pages: 0,
  current: 1,
  next: null,
  previous: null,
  searchQuery: '',
};


export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_QUERY':
      return Object.assign({}, state, { searchQuery: action.payload });
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
