import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import  serviceWorker from './serviceWorker';


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.register();


/*Failed to compile
./src/index.js
Attempted import error: './serviceWorker' does not contain a default export (imported as 'serviceWorker').*/
