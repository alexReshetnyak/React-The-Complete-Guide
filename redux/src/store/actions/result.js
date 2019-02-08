import * as actionTypes from './actionTypes';

export const saveResult = result => {
  return {
    type: actionTypes.STORE_RESULT,
    result
  };
}

export const storeResult = result => {
  return async (dispatch, getState) => {
    setTimeout(() => {
      // const oldCounter = getState().ctr.counter;
      // console.log('storeResult Action:', oldCounter);
      
      dispatch(saveResult(result));
    }, 2000);
  }
};

export const deleteResult = deleteElId => {
  return {
    type: actionTypes.DELETE_RESULT,
    deleteElId
  };
};
