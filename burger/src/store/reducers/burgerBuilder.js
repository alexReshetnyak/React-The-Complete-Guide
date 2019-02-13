
import * as actionTypes  from '../actions/actionTypes';
import { updateObject } from '../utility';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const addIngredient = (state, ingredientName) => {
  const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, ingredientName) => {
  const updatedIng = { [ingredientName]: state.ingredients[ingredientName] - 1 };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
  };

  return updateObject(state, updatedSt);
};


const reducer = (state = initialState, action) => {
  const { ingredientName, ingredients } = action;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, ingredientName);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, ingredientName);

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, { ingredients, totalPrice: 4, error: false });
    
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
  
    default:
      return state;
  }
};

export default reducer;

