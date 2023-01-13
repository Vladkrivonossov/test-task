import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/App/App';
import { setupStore } from './store/store';
import './styles/globals.css'

export const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
