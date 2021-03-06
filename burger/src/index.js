import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import createSagaMiddleware from 'redux-saga';

import "./index.css";
import App from "./App";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import * as sagas from './store/sagas';
// import { watchAuth, watchBurgerBuilder } from "./store/sagas";
// import axios from 'axios';

// * For redux dev-tools
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware) // * thunk for async actions , saga for side effects
  )
);

// console.log('SAGAS:', sagas);

// * Register all sagas
Object.values(sagas).forEach(saga => { 
  sagaMiddleware.run(saga);
});


// sagaMiddleware.run(watchAuth);
// sagaMiddleware.run(watchBurgerBuilder);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>
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
serviceWorker.register();
