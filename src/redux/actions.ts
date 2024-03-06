

// redux/actions.ts
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'; // Import for asynchronous actions
import { RootState } from './reducers';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const fetchPostsSuccess = (posts: Post[]) => ({
  type: FETCH_POSTS_SUCCESS as typeof FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchUserPostsSuccess = (posts: Post[]) => ({
  type: FETCH_USER_POSTS_SUCCESS as typeof FETCH_USER_POSTS_SUCCESS,
  payload: posts,
});

export const createPostSuccess = (post: Post) => ({
  type: CREATE_POST_SUCCESS as typeof CREATE_POST_SUCCESS,
  payload: post,
});

export const deletePostSuccess = (postId: number) => ({
  type: DELETE_POST_SUCCESS as typeof DELETE_POST_SUCCESS,
  payload: postId,
});

export const updatePostSuccess = (post: Post) => ({
  type: UPDATE_POST_SUCCESS as typeof UPDATE_POST_SUCCESS,
  payload: post,
});

export const deletePosts = createAsyncThunk(
  'posts/deletePost',
  async (postId: number, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove post from local state (optional, assuming successful API call)
      const posts = (getState() as RootState).posts.allPosts;
      return { postId, posts: posts.filter((post: Post) => post.id !== postId) };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPosts = () => {
  return (dispatch: any) => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        dispatch(fetchPostsSuccess(response.data));
      })
      .catch((error) => {
        console.error('Error fetching posts: ', error);
      });
  };
};

export const fetchUserPosts = (postId: number) => {
  return (dispatch: any) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        dispatch(fetchUserPostsSuccess(response.data));
      })
      .catch((error) => {
        console.error('Error fetching user posts: ', error);
      });
  };
};

export const createPost = (postData: Partial<Post>) => {
  return (dispatch: any) => {
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then((response) => {
        dispatch(createPostSuccess(response.data));
      })
      .catch((error) => {
        console.error('Error creating post: ', error);
      });
  };
};

export const updatePosts = (postData: Partial<Post>, postId: number) => {
  return (dispatch: any) =>  {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, postData)
      .then((response) => {
        dispatch(updatePostSuccess(response.data));
      })
      .catch((error) => {
        console.error('Error updating post: ', error);
      });
  };
};

export const deletePost = (postId: number) => {
  return (dispatch: any) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        dispatch(deletePostSuccess(postId));
      })
      .catch((error) => {
        console.error('Error deleting post: ', error);
      });
  };
};
