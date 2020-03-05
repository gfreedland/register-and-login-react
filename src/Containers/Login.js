import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import ExistingUserForm from '../Forms/ExistingUserForm';
import * as formActions from '../Actions/formActions';


class Login extends React.Component {
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
  }

  onSubmit = () => {
    const { handleSubmit, formValues } = this.props;
    handleSubmit({
      ...formValues
    });
  };

  render() {
    const { isAuth } = this.props;

    let failed = null;
    if (isAuth === false) {
      failed = <p>Login failed, try again</p>;
    }

    // const failed = !isAuth ? <p>Login failed, try again</p> : <p />;

    return (
      <div className="App-login-box">
        <p><u>Login</u></p>
        <ExistingUserForm handleSubmit={this.onSubmit} />
        <br />
        {failed}
        <a href="register">New User? Click here to register.</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('existingUserForm');
  return {
    formValues: {
      email: formSelector(state, 'email'),
      password: formSelector(state, 'password'),
    },
    isAuth: state.loginReducer.token
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { history } = props;
  return {
    handleSubmit: (values) => dispatch(formActions.tryLogin(values, (isSuccess, token) => {
      if (isSuccess) {
        // const cookie = new Cookies();
        // cookie.set('token', token);
        history.push('/users');
      }
    }))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
