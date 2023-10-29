import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExploreItem from '../../Explore/components/ExploreItem';
import PostDetail from '../../Post/Components/PostDetail';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

import {
  fetchPostsByUser,
  getPostUserError,
  getPostUserStatus,
  selectAllUserPost,
} from '../profileSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  let [postId, setPostId] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();
  const posts = useSelector(selectAllUserPost);
  const postStatus = useSelector(getPostUserStatus);
  const postError = useSelector(getPostUserError);

  const token = Cookies.get('accessToken');
  const decode = jwtDecode(token);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPostsByUser(decode.id));
    }
  }, [postStatus, dispatch, decode]);

  const onLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I want to logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/logout');
      } else if (result.isDenied) {
        Swal.fire('Cancel logout', '', 'info');
      }
    });
  };

  let content;

  if (postStatus === 'loading') {
    content = <p>Loading ...</p>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((item, index) => (
      <ExploreItem
        key={item.id}
        item={item}
        openModal={openModal}
        setPostId={setPostId}
      />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{postError}</p>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 p-3">
          <div className="col-span-3">
            <img
              src="/sample/sample-profile.jpg"
              alt="img-profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="col-span-9 flex flex-col items-start">
            <h4 className="mb-2 text-xl text-gray-800 font-bold">
              {decode.username}
            </h4>
            <button
              type="button"
              className="px-3 py-2 bg-gray-800 rounded-lg text-white text-xs"
              onClick={() => onLogout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="p-3 pt-0 pb-2 border-b border-b-gray-300">
          <h5 className="text-sm text-gray-800 mb-0 font-bold">
            {decode.nama}
          </h5>
          {/* <p className="text-xs text-gray-800 w-3/4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p> */}
        </div>
        <div className="grid grid-cols-3 gap-1">{content}</div>
      </div>
      <PostDetail isOpen={isOpen} closeModal={closeModal} postId={postId} />
    </>
  );
};

export default Profile;
