import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  users: [],
  eid: null,
  isEdit: false,
  entry: null,
  initialValues: {
    email: null,
    first_name: null,
    last_name: null,
    salary: null,
    role: '',
    isBonus: null,
    bonus: null
  },
  isShowing: false
};

// ALL USERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fetchUsers = (state) => {
  // console.log(action.payload.values);
  return {
    ...state
  };
};

const fetchUsersSuccess = (state, action) => {
  // console.log(action.payload.users.data);
  return {
    ...state,
    users: action.payload.users.data
  };
};

const fetchUsersFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state
  };
};

// SINGLE USER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fetchUser = (state) => {
  // console.log(action.payload.values);
  return {
    ...state
  };
};

const fetchUserSuccess = (state, action) => {
  // console.log(action.payload);
  // const fetchedUsers = action.payload.user.data;
  return {
    ...state,
    user: action.payload.user.data
  };
};

const fetchUserFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state
  };
};

// DELETE USER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const deleteUser = (state) => {
  // console.log(action.payload.id);
  return {
    ...state
  };
};

const deleteUserSuccess = (state, action) => {
  console.log(action.payload);
  // const fetchedUsers = action.payload.user.data;
  return {
    ...state
    // user: fetchedUsers
  };
};

const deleteUserFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state
  };
};

// ADD USER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tryAdd = (state, action) => {
  console.log(action.payload.values);
  const newItem = {
    ...action.payload.values,
    id: state.users.length + 1
  };
  const newusers = [...state.users, newItem];
  return {
    ...state,
    users: newusers
  };
};

const selectUser = (state, action) => {
  const newent = {
    email: action.payload.entry.email,
    first_name: action.payload.entry.first_name,
    last_name: action.payload.entry.last_name,
    avatar: action.payload.entry.avatar,
    salary: action.payload.entry.salary ? action.payload.entry.salary : 1000,
    role: action.payload.entry.role ? action.payload.entry.role : '',
    isBonus: action.payload.entry.isBonus ? action.payload.entry.isBonus : null,
    bonus: action.payload.entry.bonus && action.payload.entry.isBonus ? action.payload.entry.bonus : null
  };
  // console.log(state.initialValues);
  // console.log(newent);
  return {
    ...state,
    eid: action.payload.id,
    isEdit: true,
    entry: newent,
    initialValues: { ...newent }
  };
};

const resetEdit = (state) => {
  return {
    ...state,
    eid: null,
    isEdit: false,
    entry: null,
    initialValues: {
      email: null,
      first_name: null,
      last_name: null,
      salary: null,
      role: '',
      isBonus: null,
      bonus: null
    }
  };
};

const resetAdd = (state) => {
  return {
    ...state,
    eid: null,
    isEdit: false,
    entry: null,
    initialValues: {
      email: null,
      first_name: null,
      last_name: null,
      salary: null,
      role: '',
      isBonus: null,
      bonus: null
    }
  };
};

const tryEdit = (state, action) => {
  // console.log(action.payload.id);
  return {
    ...state,
    eid: action.payload.id,
    entry: action.payload.values
  };
};

const editSuccess = (state) => {
  // console.log(action.payload);
  // console.log(state.entry);
  const {
    email,
    first_name,
    last_name,
    salary,
    role,
    isBonus,
    bonus
  } = state.entry;
  // const fetchedUsers = action.payload.user.data;
  const newusers = [...state.users];

  newusers[state.eid - 1].email = email;
  newusers[state.eid - 1].first_name = first_name;
  newusers[state.eid - 1].last_name = last_name;
  newusers[state.eid - 1].id = state.eid;
  newusers[state.eid - 1].salary = salary;
  newusers[state.eid - 1].role = role;
  newusers[state.eid - 1].isBonus = isBonus;
  if (newusers[state.eid - 1].isBonus) {
    newusers[state.eid - 1].bonus = bonus;
  } else {
    newusers[state.eid - 1].bonus = null;
  }

  return {
    ...state,
    eid: null,
    isEdit: false,
    entry: null,
    initialValues: {
      email: null,
      first_name: null,
      last_name: null,
      salary: null
    },
    users: newusers
  };
};

const editFail = (state) => {
  // console.log(action.payload.message);
  return {
    ...state
  };
};

const hideModal = (state) => {
  return {
    ...state,
    isShowing: false
  };
};

const showModal = (state) => {
  return {
    ...state,
    isShowing: true
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS: return fetchUsers(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);

    case actionTypes.FETCH_USER: return fetchUser(state, action);
    case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);

    case actionTypes.DELETE_USER: return deleteUser(state, action);
    case actionTypes.DELETE_USER_SUCCESS: return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL: return deleteUserFail(state, action);

    case actionTypes.TRY_EDIT: return tryEdit(state, action);
    case actionTypes.EDIT_SUCCESS: return editSuccess(state, action);
    case actionTypes.EDIT_FAIL: return editFail(state, action);

    case actionTypes.TRY_ADD: return tryAdd(state, action);
    case actionTypes.SELECT_USER: return selectUser(state, action);
    case actionTypes.RESET_EDIT: return resetEdit(state);
    case actionTypes.RESET_ADD: return resetAdd(state);

    case actionTypes.HIDE_MODAL: return hideModal(state);
    case actionTypes.SHOW_MODAL: return showModal(state);
    default: return state;
  }
};

export default userReducer;
