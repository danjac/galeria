const initialState = {
  isLoading: false,
  image: null,
  editTitle: false,
};

export default function (state = initialState, action) {
  let image;
  switch (action.type) {
    case 'EDIT_IMAGE_TITLE':
      return Object.assign({}, state, { editTitle: true });
    case 'UPDATE_IMAGE_TITLE':
      image = Object.assign({}, state.image, { title: action.payload });
      return Object.assign({}, state, { image, editTitle: false });
    case 'FETCH_IMAGE_REQUEST':
      return Object.assign({}, state, { isLoading: true });
    case 'FETCH_IMAGE_SUCCESS':
      return Object.assign({}, state, { isLoading: false, image: action.payload });
    default:
      return state;
  }
}
