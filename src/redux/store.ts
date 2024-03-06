// // redux/store.js
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; // If you're using Redux Thunk middleware
// import rootReducer from './reducers';

// // Create Redux store with middleware
// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

// redux/store.ts
import { createStore, applyMiddleware, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk'; // If you're using Redux Thunk middleware
import { rootReducer, RootState } from './reducers';
import { Action } from '@reduxjs/toolkit';

// Define the type for the thunk middleware
type ThunkActionType = ThunkMiddleware<RootState, Action>;

// Create Redux store with middleware
const store: Store<RootState, Action> = createStore(rootReducer, applyMiddleware(thunk as ThunkActionType));

export default store;
