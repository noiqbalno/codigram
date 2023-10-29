import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  Cookies.remove('accessToken');

  return <Navigate to="/login" replace={true} />;
};

export default Logout;
