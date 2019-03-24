import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  results: []
}

const storeResult = (state, result) => {
  const results = state.results.concat([
    { id: new Date(), value: result * 2 }
  ]);
  return updateObject(state, { results });
};


const deleteResult = (state, deleteElId) => {
  const newArray = state.results.filter(result => result.id !== deleteElId);
  return updateObject(state, { results: newArray });
};


const reducer = (state = initialState, action) => {
 const { type, result, deleteElId } = action;

  switch (type) {
    case actionTypes.STORE_RESULT:
      return storeResult(state, result);

    case actionTypes.DELETE_RESULT:
      return deleteResult(state, deleteElId);

    default: return state;
  }
}

export default reducer;
