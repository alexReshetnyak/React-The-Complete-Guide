import * as actionTypes from './actionTypes';

export const saveResult = (result) => {
  return {
    type: actionTypes.STORE_RESULT,
    result
  };
}

export const storeResult = (result) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(saveResult(result));
    }, 2000);   
  }
};

export const deleteResult = (deleteElId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    deleteElId
  };
};
