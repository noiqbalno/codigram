import React from 'react';

const ExploreItem = ({ item, openModal, setPostId }) => {
  return (
    <div
      onClick={() => {
        openModal();
        setPostId(item.id);
      }}
    >
      <img
        src={`http://localhost:3500/${item.image.replace(/\\/g, '/')}`}
        alt="post-img"
        className="w-full aspect-square object-cover cursor-pointer"
      />
    </div>
  );
};

export default ExploreItem;
