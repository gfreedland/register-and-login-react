import * as actionTypes from './actionTypes';

// FETCH ALL USERS ACTIonS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const fetchUsers = () => {
  return {
    type: actionTypes.FETCH_USERS
    // payload: { values }
  };
};

export const fetchUsersSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload
  };
};

export const fetchUsersFail = (payload) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    payload
  };
};

// FETCH SINGLE USER ACTIonS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const fetchUser = (id) => {
  return {
    type: actionTypes.FETCH_USER,
    payload: { id }
  };
};

export const fetchUserSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload
  };
};

export const fetchUserFail = (payload) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    payload
  };
};

// LOGOUT ACTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const logout = (history) => {
  return {
    type: actionTypes.LOGOUT,
    payload: { history }
  };
};

// DELETE ACTIonS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const deleteUser = (id) => {
  return {
    type: actionTypes.DELETE_USER,
    payload: { id }
  };
};

export const deleteUserSuccess = (payload) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    payload
  };
};

export const deleteUserFail = (payload) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    payload
  };
};

// ADD ACTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryAdd = (values) => {
  return {
    type: actionTypes.TRY_ADD,
    payload: { values }
  };
};

export const selectUser = (entry, id) => {
  return {
    type: actionTypes.SELECT_USER,
    payload: { entry, id }
  };
};

export const resetEdit = () => {
  return {
    type: actionTypes.RESET_EDIT
  };
};

// EDIT ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryEdit = (id, values) => {
  return {
    type: actionTypes.TRY_EDIT,
    payload: { id, values }
  };
};

export const editSuccess = (payload) => {
  return {
    type: actionTypes.EDIT_SUCCESS,
    payload
  };
};

export const editFail = (payload) => {
  return {
    type: actionTypes.EDIT_FAIL,
    payload
  };
};
