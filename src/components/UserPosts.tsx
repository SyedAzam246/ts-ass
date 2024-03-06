

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../redux/actions'; // Assuming fetchPosts is typed
import PostList from './PostList';
import PostForm from './PostForm';
import { deletePost } from '../redux/actions'; // Assuming deletePost is typed

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const UserPosts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Assuming AppDispatch type is defined
  const { posts } = useSelector((state) => state.posts as Post[]); // Cast state.posts to Post[]

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => post.userId === 1);

  return (
    <div>
      <h2>User Posts</h2>
      <PostList posts={filteredPosts} showActions={true} />
    </div>
  );
};

export default UserPosts;
