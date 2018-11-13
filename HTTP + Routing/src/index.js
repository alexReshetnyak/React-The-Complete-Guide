import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// *  axios requests Interceptor
axios.interceptors.request.use(request => {
  console.log('Intercepted Request:', request);
  return request;
}, error => {

  /// * Itercept Request Errors
  console.log('Request Failed!');
  return Promise.reject(error);
});

axios.interceptors.response.use(res => {
  // console.log('Intercepted Request:', request);
  return res;
}, error => {

  /// * Itercept Response Errors
  console.log('Request Failed!');
  return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
