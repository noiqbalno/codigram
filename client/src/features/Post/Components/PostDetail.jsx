import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../helpers/formatDate';
import {
  deletePost,
  fetchPostById,
  fetchPosts,
  fetchPostsByUser,
  getPostIdError,
  getPostIdStatus,
  selectPostId,
} from '../postSlice';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

const PostDetail = ({ isOpen, closeModal, postId }) => {
  const token = Cookies.get('accessToken');
  const decode = jwtDecode(token);
  const navigate = useNavigate();
  const location = useLocation();
  const post = useSelector((state) => selectPostId(state));
  // const post = '';
  const dispatch = useDispatch();
  const postStatus = useSelector(getPostIdStatus);
  const postError = useSelector(getPostIdError);

  useEffect(() => {
    if (postStatus === 'idle' && postId) {
      dispatch(fetchPostById(postId));
    }
  }, [postStatus, dispatch, postId]);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I want to delete this post!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(postId)).unwrap();

        Swal.fire('Berhasil menghapus data');

        dispatch(fetchPosts());
        dispatch(fetchPostsByUser(decode.id));
        dispatch(fetchPostById(postId));
        navigate('/profile');
        closeModal();
      } else if (result.isDenied) {
        Swal.fire('Cancel logout', '', 'info');
      }
    });
  };

  if (!post) {
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  style={{ padding: '0!important' }}
                  className="inline-block w-full max-w-md p-0 my-8 mb-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                >
                  <div className=" mb-[12px]">
                    <h4 className="text-2xl p-3">
                      {postStatus === 'loading' ? 'Loading ...' : 'Not found'}
                    </h4>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                style={{ padding: '0!important' }}
                className="inline-block w-full max-w-md p-0 my-8 mb-20 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <div className=" mb-[12px]">
                  <div className="c-head flex justify-between items-center p-2">
                    <div className="c-head-profile flex items-center">
                      <img
                        src={`http://localhost:3500/${post.user.image.replace(
                          /\\/g,
                          '/'
                        )}`}
                        alt="profile-img"
                        className="w-9 h-9 object-cover rounded-full mr-2"
                      />
                      <h5 className="text-sm m-0 text-gray-800">
                        {post.user.username}
                      </h5>
                    </div>
                    <div className="c-head-date text-sm">
                      {formatDate(post.createdat)}
                    </div>
                  </div>
                  <div className="c-body relative">
                    <img
                      src={`http://localhost:3500/${post.image.replace(
                        /\\/g,
                        '/'
                      )}`}
                      alt="post-img"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="c-foot pl-4 pr-4 mt-2 pb-[20px]">
                    {location.pathname === '/profile' && (
                      <div className="mb-2">
                        <Link
                          to={`/post/update/${post.id}`}
                          className="py-1 px-2 mr-2 rounded-md text-sm no-underline outline-none text-white bg-blue-500"
                          type="button"
                        >
                          Ubah
                        </Link>
                        <button
                          className="py-1 px-2 mr-1 rounded-md text-sm no-underline outline-none text-white bg-red-500"
                          type="button"
                          onClick={() => handleDelete()}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                    <div>
                      <Link
                        to={`/profile/${post.user.username}`}
                        className="mr-1 no-underline text-sm font-bold text-gray-900 outline-none"
                      >
                        {post.user.username}
                      </Link>
                      <span className="text-sm text-gray-800">
                        {post.caption}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostDetail;
