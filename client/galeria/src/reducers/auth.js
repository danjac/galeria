const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT':
    case 'LOGIN_FAILURE':
      return initialState;
    case 'CURRENT_USER_SUCCESS':
      return Object.assign({}, state, { currentUser: action.payload, isAuthenticated: true });
    default:
      return state;
  }
}
