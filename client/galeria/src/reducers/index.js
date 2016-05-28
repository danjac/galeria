import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import images from './images';

export default combineReducers({
  auth,
  images,
  form: formReducer,
  routing: routerReducer,
});
