import axios from 'axios';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';

import { Cookies } from 'react-cookie';

import * as actionTypes from '../Actions/actionTypes';
import {
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail
} from '../Actions/formActions';


// LOGIN SAGA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function postLoginInfo(values) {
  return axios.post('https://reqres.in/api/login', values)
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function* login(action) {
  try {
    const { response, error } = yield call(postLoginInfo, action.payload.values);
    if (response) {
      yield put(loginSuccess({ token: response.data.token }));
      // yield put(storeCookie({ token: response.data.token}));
      const cookie = new Cookies();
      cookie.set('token', response.data.token);
      action.payload.callback(true, response.data.token);
    } else {
      // console.log('fail');
      // console.log(error);
      yield put(loginFail({ message: error.message }));
      action.payload.callback(false);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* loginSaga() {
  yield takeLatest(actionTypes.TRY_LOGIN, login);
}

// REGISTER SAGA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function postRegisterInfo(values) {
  return axios.post('https://reqres.in/api/register', values)
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function* register(action) {
  try {
    const { response, error } = yield call(postRegisterInfo, action.payload.values);
    if (response) {
      // console.log('success');
      yield put(registerSuccess({ token: response.data }));
    } else {
      // console.log('fail');
      // console.log(error);
      yield put(registerFail({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* registerSaga() {
  yield takeLatest(actionTypes.TRY_REGISTER, register);
}
