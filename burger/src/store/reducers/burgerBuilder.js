import * as actionTypes from '../actions/actionTypes';
import {
  updateObject
} from '../../shared/utility';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
  loading: false
};

const addIngredient = (state, ingredientName) => {
  const updatedIngredient = {
    [ingredientName]: state.ingredients[ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
    building: true
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, ingredientName) => {
  const updatedIng = {
    [ingredientName]: state.ingredients[ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
    building: true
  };

  return updateObject(state, updatedSt);
};

const setIngredients = (state, ingredients) => {
  const updatedOrder = {
    ingredients,
    totalPrice: 4,
    error: false,
    building: false,
    loading: false
  };
  return updateObject(state, updatedOrder);
};



const reducer = (state = initialState, action) => {
  const {
    ingredientName,
    ingredients
  } = action;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, ingredientName);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, ingredientName);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, ingredients);

    case actionTypes.INIT_INGREDIENTS_START:
      return updateObject(state, {
        error: false,
        loading: true
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true,
        loading: false
      });

    default:
      return state;
  }
};

export default reducer;