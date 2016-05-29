import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import images from './images';
import image from './image';

export default combineReducers({
  auth,
  images,
  image,
  form: formReducer,
  routing: routerReducer,
});
