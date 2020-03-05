import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './Containers/Login';
import Register from './Containers/Register';
import User from './Containers/User';
import Users from './Containers/Users';
import noMatch from './Components/NoMatch';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Employee Manager</header>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/users" exact component={Users} />
          <Route path='/users/:id' exact component={User} />
          {/* <Route path=`/users/${/^[A-Z0-9._%+-]+@[0-999.-]+\.[A-Z]{2,4}$/i}` exact component={User} /> */}
          {/* <Route path="/employees" exact component={Employees} /> */}
          <Route component={noMatch} />
        </Switch>

      </div>
    );
  }
}


export default App;
