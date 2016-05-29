const initialState = {
  isLoading: false,
  image: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_IMAGE_REQUEST':
      return Object.assign({}, state, { isLoading: true });
    case 'FETCH_IMAGE_SUCCESS':
      return Object.assign({}, state, { isLoading: false, image: action.payload });
    default:
      return state;
  }
}
