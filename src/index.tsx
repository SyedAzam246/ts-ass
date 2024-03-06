
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store'; // Assuming store is exported from redux/store.ts
import './index.css';

// Interface for Redux store type (assuming you have a typed store)
interface RootState {
  // Define the structure of your application state here
}

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store as Redux.Store<RootState>}>
    <App />
  </Provider>
);
