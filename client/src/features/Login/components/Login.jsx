import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginApi } from '../authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    dispatch(loginApi(data))
      .unwrap()
      .then((result) => {
        Swal.fire('Login Berhasil!');
        navigate('/');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="h-full max-w-xl mx-auto font-medium bg-white min-h-screen flex items-center justify-center">
      <form
        className="py-8 px-3 md:py-8 md:px-3 w-10/12 md:w-full border border-gray-300 rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="pb-3 text-red-500 text-center">{errorMsg}</div>
        <h3 className="text-xl mb-3 text-center">Login</h3>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
