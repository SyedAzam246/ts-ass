

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/actions'; // Assuming fetchPosts is typed
import PostList from './PostList';

const PublicPostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Assuming AppDispatch type is defined
  const { posts } = useSelector((state) => state.posts as Post[]); // Cast state.posts to Post[]

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h2>Public Posts</h2>
      <PostList posts={posts} />
    </div>
  );
};

export default PublicPostList;
