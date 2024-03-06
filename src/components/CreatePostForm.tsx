


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/actions'; 

interface Post {
  title: string;
  body: string;
  userID: number;
}

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const userID = 1;
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPost({ title, body, userID }));
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
