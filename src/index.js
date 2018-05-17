import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import _ from "lodash";
if (_.isNil(localStorage.getItem('token'))) {
  if (!window.location.href.match(/\login/)) {
    window.location.href = '/#/login';
  }
}
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
