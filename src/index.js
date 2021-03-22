import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';
import AppStore from './context/appstore';

ReactDOM.render(
  <BrowserRouter>
    <AppStore>
      <App />
    </AppStore>
  </BrowserRouter>,
  document.getElementById('root'),
);
