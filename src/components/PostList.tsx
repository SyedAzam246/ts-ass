

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions'; // Assuming deletePost is typed
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC<{ posts: Post[]; showActions?: boolean }> = ({ posts, showActions }) => {
  const dispatch = useDispatch<AppDispatch>(); // Assuming AppDispatch type is defined
  const navigate = useNavigate();

  const handleDelete = async (postId: number) => {
    try {
      await dispatch(deletePost(postId));
    } catch (error) {
      console.error('Error deleting post:', error); // Handle error appropriately
    }
  };

  const handleEdit = (postId: number) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div>
      {posts.map((post) => (
        <div className="card-wrapper" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {showActions && (
            <div>
              <button onClick={() => handleEdit(post.id)}>Edit</button>
              <button onClick={() => handleDelete(postId)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
