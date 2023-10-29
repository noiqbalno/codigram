import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ code }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="my-5">ERROR {code}</h1>
      <Link to={'/login'}>
        <button className="btn btn-primary btn-lg">Login</button>
      </Link>
    </div>
  );
};

export default Error;
