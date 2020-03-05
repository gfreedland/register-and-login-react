import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  token: null,
  id: null
};
// LOGIN WINDOW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tryLogin = (state) => {
  // console.log(action.payload.values);
  return {
    ...state
  };
};

const loginSuccess = (state, action) => {
  // console.log(action.payload.token);
  return {
    ...state,
    token: action.payload.token
  };
};

const loginFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state,
    token: false
  };
};
// REGISTER WINDOW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tryRegister = (state) => {
  // console.log(action.payload.values);
  return {
    ...state
  };
};

const registerSuccess = (state, action) => {
  console.log(action.payload);
  return {
    ...state
  };
};

const registerFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state
  };
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const logout = (state, action) => {
  // console.log(action.payload.history);
  action.payload.history.push('/login');
  return {
    ...state,
    token: null,
    id: null
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRY_LOGIN: return tryLogin(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);

    case actionTypes.TRY_REGISTER: return tryRegister(state, action);
    case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL: return registerFail(state, action);

    case actionTypes.LOGOUT: return logout(state, action);

    default: return state;
  }
};

export default loginReducer;
