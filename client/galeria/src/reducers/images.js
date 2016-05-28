const initialState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_IMAGES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
