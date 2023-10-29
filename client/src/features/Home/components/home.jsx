import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  getPostError,
  getPostStatus,
  selectAllPost,
} from '../../Post/postSlice';
import PostExcerpt from './PostExcerpt';

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
    // }, [dispatch, postStatus]);
  }, [dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <p>Loading ...</p>;
  } else if (postStatus === 'succeeded') {
    content =
      posts &&
      posts.map((item, index) => <PostExcerpt key={item.id} post={item} />);
  } else if (postStatus === 'failed') {
    content = <p>{postError}</p>;
  }

  return <div className="flex flex-col">{content}</div>;
};

export default Home;
