import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { store } from '@src/store';
import { Provider } from 'react-redux';
import { App } from '@src/app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
);
