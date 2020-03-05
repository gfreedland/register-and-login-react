import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { isEqual } from 'underscore';
import { initialize, reset } from 'redux-form';

import * as userActions from '../Actions/userActions';
import * as modalActions from '../Actions/modalActions';

class Employee extends Component {
  onSelectEdit = () => {
    const {
      onSelectUser,
      entry,
      index,
      // initialValues,
      showModal
    } = this.props;

    showModal();
    onSelectUser(entry, index + 1);
    // if (isEqual(initialValues.email, entry.email)) {
    //   showModal();
    //   onSelectUser(entry, index + 1);
    // } else {
    //   onSelectUser(entry, index + 1);
    // }
  }

  onSelectDelete = () => {
    const {
      index,
      deleteUser
    } = this.props;
    deleteUser(index + 1);
  }

  onSelectView = () => {
    const {
      index,
      history
    } = this.props;

    history.push(`/users/${index + 1}`);
  }

  render() {
    const {
      entry: {
        id,
        email,
        first_name,
        last_name,
        avatar
      }
    } = this.props;

    return (
      <tr>
        <td>{ id }</td>
        <td>{ email }</td>
        <td>{ first_name }</td>
        <td>{ last_name }</td>
        <td><img src={avatar} alt="?" width="42" height="42" /></td>
        <td>
          <button onClick={this.onSelectView} type="button">View</button>
          <button onClick={this.onSelectEdit} type="button">Edit</button>
          <button onClick={this.onSelectDelete} type="button">Delete</button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.userReducer.initialValues
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(userActions.deleteUser(id)),
    onSelectUser: (entry, index) => dispatch(userActions.selectUser(entry, index)),
    initForm: () => dispatch(initialize('employeeForm')),
    resetForm: () => dispatch(reset('employeeForm')),
    showModal: () => dispatch(modalActions.showModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
