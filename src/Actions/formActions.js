import * as actionTypes from './actionTypes';

// LOGIN ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryLogin = (values, callback) => {
  return {
    type: actionTypes.TRY_LOGIN,
    payload: { values, callback }
  };
};

export const loginSuccess = (payload) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload
  };
};

export const loginFail = (payload) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload
  };
};

// REGISTER ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryRegister = (values) => {
  return {
    type: actionTypes.TRY_REGISTER,
    payload: { values }
  };
};

export const registerSuccess = (payload) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload
  };
};

export const registerFail = (payload) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    payload
  };
};

// ADD ACTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryAdd = (values) => {
  return {
    type: actionTypes.TRY_ADD,
    payload: { values }
  };
};

export const resetAdd = () => {
  return {
    type: actionTypes.RESET_ADD
  };
};
