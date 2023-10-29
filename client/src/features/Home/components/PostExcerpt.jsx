import React from 'react';
import { formatDate } from '../../../helpers/formatDate';
import { Link } from 'react-router-dom';

const PostExcerpt = ({ post }) => {
  return (
    <div className="border-b border-b-gray-300 mb-[12px]" key={post.id}>
      <div className="c-head flex justify-between items-center py-2">
        <Link
          to={`/profile/${post.user.username}`}
          className="c-head-profile flex items-center no-underline"
        >
          <img
            src={`http://localhost:3500/${post.user.image.replace(/\\/g, '/')}`}
            alt="profile-img"
            className="w-9 h-9 object-cover rounded-full mr-2"
          />
          <h5 className="text-sm m-0 text-gray-800">{post.user.username}</h5>
        </Link>
        <div className="c-head-date text-sm">{formatDate(post.createdat)}</div>
      </div>
      <div className="c-body relative">
        <img
          src={`http://localhost:3500/${post.image.replace(/\\/g, '/')}`}
          alt="post-img"
          className="w-full h-auto"
        />
      </div>
      <div className="c-foot pl-4 pr-4 mt-2 pb-[20px]">
        <div>
          <Link
            to={`/profile/${post.user.username}`}
            className="mr-1 no-underline text-sm font-bold text-gray-900"
          >
            {post.user.username}
          </Link>
          <span className="text-sm text-gray-800">{post.caption}</span>
        </div>
      </div>
    </div>
  );
};

export default PostExcerpt;
