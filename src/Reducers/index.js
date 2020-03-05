import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './loginReducer';
import userReducer from './userReducer';

export default combineReducers({
  loginReducer,
  userReducer,
  form: formReducer
});
