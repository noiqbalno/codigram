import React, { useEffect, useState } from 'react';
import PostDetail from '../../Post/Components/PostDetail';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  getPostError,
  getPostStatus,
  selectAllPost,
} from '../../Post/postSlice';
import ExploreItem from './ExploreItem';

const Explore = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [postId, setPostId] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

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
      <PostDetail isOpen={isOpen} closeModal={closeModal} postId={postId} />
      <div className="grid grid-cols-3 gap-1">
        {content}
        {/* <div onClick={openModal}>
          <img
            src="/sample/sample-post.jpg"
            alt="post-img"
            className="w-full aspect-square object-cover"
          />
        </div> */}
        {/* <div onClick={openModal}>
          <img
            src="/sample/sample-post.jpg"
            alt="post-img"
            className="w-full aspect-square"
          />
        </div>
        <div onClick={openModal}>
          <img
            src="/sample/sample-post.jpg"
            alt="post-img"
            className="w-full aspect-square"
          />
        </div>
        <div onClick={openModal}>
          <img
            src="/sample/sample-post.jpg"
            alt="post-img"
            className="w-full aspect-square"
          />
        </div>
        <div onClick={openModal}>
          <img
            src="/sample/sample-post.jpg"
            alt="post-img"
            className="w-full aspect-square"
          />
        </div> */}
      </div>
    </>
  );
};

export default Explore;
