
import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientSaga(action) {
    try {
      yield put(actions.initIngredientsStart());
      const { data: ingredients } = yield axios.get("/ingredients.json");

      yield put(actions.setIngredients(ingredients));
    } catch (error) {
      yield put(actions.fetchIngredientsFailed());
    }
}
