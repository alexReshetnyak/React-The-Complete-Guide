import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
// import axios from 'axios';

const app = (
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

// axios.interceptors.response.use(res => {
//   // console.log('Intercepted Request:', request);
//   return res;
// }, error => {

//   /// * Itercept Response Errors
//   console.log('Request Failed!');
//   return Promise.reject(error);
// });

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
