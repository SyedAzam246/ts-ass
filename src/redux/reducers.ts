// // redux/reducers.js
// import { combineReducers } from 'redux';
// import { FETCH_POSTS_SUCCESS, FETCH_USER_POSTS_SUCCESS, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS } from './actions';


// const initialState = {
//   posts: [],
// };

// const postsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_POSTS_SUCCESS:
//     case FETCH_USER_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: action.payload,
//       };
//     case CREATE_POST_SUCCESS:
//       return {
//         ...state,
//         posts: [...state.posts, action.payload],
//       };
//     case DELETE_POST_SUCCESS:
//       return {
//         ...state,
//         posts: state.posts.filter(post => post.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   posts: postsReducer,
// });

// export default rootReducer;

// redux/reducers.ts
import { combineReducers } from 'redux';
import {  FETCH_POSTS_SUCCESS, FETCH_USER_POSTS_SUCCESS, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS } from './actions';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsReducer = (state = initialState, action: PostActionTypes): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
    case FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
