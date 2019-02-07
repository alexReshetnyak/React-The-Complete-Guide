import * as actionTypes from '../actions/actionTypes';


const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
 const { type, result, deleteElId } = action;

  switch (type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat([
          { 
            id: new Date(),
            value: result
          }
        ])
      };

    case actionTypes.DELETE_RESULT:
      const newArray = state.results.filter(result => result.id !== deleteElId)
      return {
        ...state,
        results: newArray
      };

    default: return state;
  }
}

export default reducer;
