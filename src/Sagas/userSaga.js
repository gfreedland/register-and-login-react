import axios from 'axios';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import {
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUserSuccess,
  fetchUserFail,
  deleteUserSuccess,
  deleteUserFail,
  editSuccess,
  editFail
} from '../Actions/userActions';

// GET ALL USERS SAGA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getUsers() {
  return axios.get('https://reqres.in/api/users')
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function* callGetUsers() {
  try {
    const { response, error } = yield call(getUsers);
    if (response) {
      // console.log('success');
      yield put(fetchUsersSuccess({ users: response.data }));
    } else {
      // console.log('fail');
      // console.log(error);
      yield put(fetchUsersFail({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(actionTypes.FETCH_USERS, callGetUsers);
}

// GET SINGLE USER SAGA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getUser(id) {
  return axios.get(`https://reqres.in/api/users/${id}`)
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function* callGetUser(action) {
  try {
    const { response, error } = yield call(getUser, action.payload.id);
    if (response) {
      // console.log('success');
      yield put(fetchUserSuccess({ user: response.data }));
    } else {
      // console.log('fail');
      // console.log(error);
      yield put(fetchUserFail({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* singleUserSaga() {
  yield takeLatest(actionTypes.FETCH_USER, callGetUser);
}

// DELETE SINGLE USER SAGA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function deleteUser(id) {
  return axios.delete(`https://reqres.in/api/users/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      host: '104.236.174.88',
      port: 3128
    }
  })
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function* callDeleteUser(action) {
  try {
    const { response, error } = yield call(deleteUser, action.payload.id);
    if (response) {
      // console.log('success');
      yield put(deleteUserSuccess({ response: response.data }));
    } else {
      // console.log('fail');
      // console.log(error);
      yield put(deleteUserFail({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* deleteUserSaga() {
  yield takeLatest(actionTypes.DELETE_USER, callDeleteUser);
}

// EDIT USER SAGA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function editUser(payload) {
  return axios.put(`https://reqres.in/api/users/${payload.id}`, payload.values)
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function* callEditUser(action) {
  try {
    const { response, error } = yield call(editUser, action.payload);
    if (response) {
      // console.log('success');
      yield put(editSuccess({ response: response.data }));
    } else {
      // console.log('fail');
      // console.log(error);
      yield put(editFail({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* editUserSaga() {
  yield takeLatest(actionTypes.TRY_EDIT, callEditUser);
}
