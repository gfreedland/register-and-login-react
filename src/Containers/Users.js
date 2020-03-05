import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';

import LoginChecker from './HOC/LoginChecker';
import Employee from '../Components/Employee';
import EmployeeForm from '../Forms/EmployeeForm';

import Modal from '../Components/Modal';

import './Users.css';

import * as userActions from '../Actions/userActions';
import * as formActions from '../Actions/formActions';
import * as modalActions from '../Actions/modalActions';


class Users extends React.Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  renderUser = (entry, index) => {
    const { history } = this.props;

    return (
      <Employee
        entry={entry}
        key={index}
        index={index}
        history={history}
      />
    );
  };

  logOutClicked = () => {
    const { history, logout } = this.props;
    logout(history);
    // console.log('Remove Cookie');
    const cookie = new Cookies();
    cookie.remove('token');
    // history.push('/login');
  };

  resetEditVals = () => {
    const { resetEdit } = this.props;
    resetEdit();
  };

  onSubmit = () => {
    const { handleAdd, resetAdd, formValues } = this.props;
    handleAdd({
      ...formValues
    });
    resetAdd();
  };

  onUpdate = () => {
    const { handleUpdate, formValues, eid } = this.props;
    handleUpdate(eid, {
      ...formValues
    });
  };

  render() {
    const {
      users,
      eid,
      isEdit,
      initialValues,
      hideModal,
      showModal,
      isShowing
    } = this.props;

    return (
      <div>
        <h1>All Employees</h1>
        <Modal show={isShowing} modalClosed={hideModal}>
          <div className="employeeform">
            <EmployeeForm
              id={eid}
              isEdit={isEdit}
              handleSubmit={this.onSubmit}
              handleUpdate={this.onUpdate}
              resetEdit={this.resetEditVals}
              initialValues={initialValues}
              hideModal={hideModal}
            />
          </div>
        </Modal>
        <br />
        <button type="button" onClick={showModal}>Add Employee</button>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Avatar</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? users.map((entry, index) => this.renderUser(entry, index)) : <tr />}
            </tbody>
          </Table>
        </div>
        <hr />
        <button type="button" onClick={this.logOutClicked}>Log Out</button>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('employeeForm');
  return {
    users: state.userReducer.users,
    formValues: {
      email: formSelector(state, 'email'),
      first_name: formSelector(state, 'first_name'),
      last_name: formSelector(state, 'last_name'),
      salary: formSelector(state, 'salary'),
      role: formSelector(state, 'role'),
      isBonus: formSelector(state, 'isBonus'),
      bonus: formSelector(state, 'bonus')
    },
    eid: state.userReducer.eid,
    isEdit: state.userReducer.isEdit,
    initialValues: state.userReducer.initialValues,
    isShowing: state.userReducer.isShowing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(userActions.fetchUsers()),
    logout: (history) => dispatch(userActions.logout(history)),
    handleAdd: (values) => dispatch(userActions.tryAdd(values)),
    handleUpdate: (id, values) => dispatch(userActions.tryEdit(id, values)),
    resetEdit: () => dispatch(userActions.resetEdit()),
    resetAdd: () => dispatch(formActions.resetAdd()),
    hideModal: () => dispatch(modalActions.hideModal()),
    showModal: () => dispatch(modalActions.showModal())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(Users));
