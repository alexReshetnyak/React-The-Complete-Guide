
import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';

// import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationDate * 1000);

  yield put(actions.logout());
}

export function* authUserSaga({email, password, isSignUp}) {
  const signInUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqBwQ8V76F2RFbidiWHkYvc7As6dJbWkI';
  const signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBwQ8V76F2RFbidiWHkYvc7As6dJbWkI';
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  const url = isSignUp ? signUpUrl : signInUrl;

  yield put (actions.authStart());

  // * yield will wait until promise will resolve
  try {
    const response = yield axios.post(url,authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
  
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
  
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

    if (!token) {
     yield put(actions.logout());
    } else {
      if (expirationDate > new Date()) {
        yield put(actions.authSuccess(token, userId));
        yield put(
          actions.checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        yield put(actions.logout());
      }
    }
}
