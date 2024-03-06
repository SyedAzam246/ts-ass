

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store'; // Assuming AppDispatch type is defined
import { createPost, updatePost, updatePosts, fetchUserPosts } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

interface Post {
  title: string;
  body: string;
  userID: number;
  id?: number; // Optional for existing posts
}

const PostForm: React.FC<{ editPost?: Post }> = ({ editPost }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>(editPost?.title ?? '');
  const [body, setBody] = useState<string>(editPost?.body ?? '');
  const userID = 1; // Assuming userID is available
  const { postID } = useParams<{ postID?: string }>();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => posts);
  const fetchedPost = posts?.find((post) => post.id === parseInt(postID ?? ''));

  useEffect(() => {
    if (postID) {
      dispatch(fetchUserPosts(postID));
    }
  }, [dispatch, postID]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: Post = {
      title,
      body,
      userID,
      id: parseInt(postID ?? ''), // Assign id for existing posts
    };
    if (postID) {
      dispatch(updatePosts(postData));
    } else {
      dispatch(createPost(postData));
    }
    setTitle('');
    setBody('');
    navigate(`/user/`);
  };

  return (
    <div className="Update-container">
      <h3>{editPost ? 'Edit Post' : 'Create Post'}</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">{editPost ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PostForm;
