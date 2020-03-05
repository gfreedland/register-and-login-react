import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import NewUserForm from '../Forms/NewUserForm';
import * as formActions from '../Actions/formActions';


class Register extends React.Component {
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
  }

  onSubmit = () => {
    const { handleSubmit, formValues } = this.props;
    // console.log(formValues);
    handleSubmit({
      ...formValues
    });
  };

  render() {
    return (
      <div className="App-login-box">
        <p><u>Register</u></p>
        <NewUserForm handleSubmit={this.onSubmit} />
        <br />
        <a href="login">Already have an account? Click here to log in.</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('newUserForm');
  return {
    formValues: {
      email: formSelector(state, 'email'),
      password: formSelector(state, 'password'),
    }
    // initialValues: state.auth.initialValues
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (values) => dispatch(formActions.tryRegister(values))
    // handleSubmit: (values) => dispatch(console.log(values))
    // loadAlbums: () => dispatch(homeActions.loadAlbums()),
    // setAlbumTitle: (albumTitle) => dispatch(homeActions.setAlbumTitle(albumTitle))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
