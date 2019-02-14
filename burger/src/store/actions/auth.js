
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime*1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return async dispatch => {
    try {
      const signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqBwQ8V76F2RFbidiWHkYvc7As6dJbWkI';
      const signInUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqBwQ8V76F2RFbidiWHkYvc7As6dJbWkI';

      dispatch(authStart());
      const authData = {
        email,
        password,
        returnSecureToken: true
      };
      
      const response = await axios.post(
        isSignUp ? signUpUrl : signInUrl,
        authData
      );

      console.log('Auth response: ', response);

      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      console.log(error);

      dispatch(authFail(error.response.data.error));
    }
  };
};
