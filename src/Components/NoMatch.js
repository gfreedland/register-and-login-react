import React from 'react';
import { Link } from 'react-router-dom';

const noMatch = () => (
  <div>
    <br />
    <h1>Page not found.</h1>
    <Link to="/login">Click to go to the login page.</Link>
  </div>
);

export default noMatch;
