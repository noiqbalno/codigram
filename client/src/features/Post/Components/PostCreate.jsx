import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addNewPost, fetchPosts } from '../postSlice';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { fetchPostsByUser } from '../../Profile/profileSlice';

const PostCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const token = Cookies.get('accessToken');
  const decode = jwtDecode(token);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);
    try {
      dispatch(addNewPost(formData)).unwrap();
      Swal.fire('Berhasil menambah data');
      dispatch(fetchPosts());
      dispatch(fetchPostsByUser(decode.id));
      navigate('/profile');
      setImage('');
      setCaption('');
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <>
      <form className="p-3" onSubmit={(e) => handleSubmit(e)}>
        <h3 className="text-xl mb-3">Tambah Data</h3>
        <div className="mb-6">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gambar
          </label>
          <input
            type="file"
            id="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="caption"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Caption
          </label>
          <textarea
            id="caption"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Simpan
        </button>
      </form>
    </>
  );
};

export default PostCreate;
