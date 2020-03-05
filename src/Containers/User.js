import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginChecker from './HOC/LoginChecker';
import './User.css';

import * as userActions from '../Actions/userActions';

class User extends React.Component {
  componentDidMount() {
    const { match, fetchUser } = this.props;
    fetchUser(match.params.id);
  }

  render() {
    const {
      singleuser,
    } = this.props;

    if (!singleuser) {
      return <div />;
    }

    return (
      <div className="profile">
        <p>{singleuser.first_name} {singleuser.last_name}</p>
        <p>{singleuser.email}</p>
        <hr />
        <img src={singleuser.avatar} alt="loading" height="150" width="150" />
        <hr />
        <Link to="/users">Back to all employees.</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleuser: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(userActions.fetchUser(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(User));
