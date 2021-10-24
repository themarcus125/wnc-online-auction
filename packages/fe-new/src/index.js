import React from 'react';
import ReactDOM from 'react-dom';
import 'uikit/dist/css/uikit.min.css';
import UIKit from 'uikit/dist/js/uikit.min.js';
import icons from 'uikit/dist/js/uikit-icons.min.js';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

if (typeof window !== 'undefined') {
  UIKit.use(icons);
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
