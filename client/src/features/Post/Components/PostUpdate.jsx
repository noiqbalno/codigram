import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  addNewPost,
  fetchPostById,
  fetchPosts,
  getPostIdStatus,
  selectPostId,
  updatePost,
} from '../postSlice';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { fetchPostsByUser } from '../../Profile/profileSlice';

const PostUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const token = Cookies.get('accessToken');
  const decode = jwtDecode(token);

  const post = useSelector((state) => selectPostId(state));
  const postStatus = useSelector(getPostIdStatus);

  useEffect(() => {
    dispatch(fetchPostById(id));
    if (postStatus === 'succeeded') {
      setCaption(post.caption);
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('id', id);
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      dispatch(updatePost(formData)).unwrap();

      Swal.fire('Berhasil mengubah data');

      dispatch(fetchPosts());
      dispatch(fetchPostsByUser(decode.id));
      dispatch(fetchPostById(id));
      navigate('/profile');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
      });
      setErrorMessage(error);
    }
  };
  console.log(image);

  if (postStatus === 'loading') return <div>Loading ...</div>;

  return (
    <>
      <form className="p-3" onSubmit={(e) => handleSubmit(e)}>
        <h3 className="text-xl mb-3">Ubah Data</h3>
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
          />
          <small className="text-xs text-gray-700">
            *Kosongkan apabila tidak ingin mengubah gambar
          </small>
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
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
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

export default PostUpdate;
