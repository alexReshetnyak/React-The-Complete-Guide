
import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const { data: createdOrder } = yield axios.post(
      `/orders.json?auth=${action.token}`, 
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(createdOrder.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  const queryParams = yield {
    auth    : action.token,
    orderBy : '"userId"',
    equalTo : `"${action.userId}"`
  };

  yield put(actions.fetchOrderStart());
  
  try {
    const { data: orders } = yield axios.get(
      `/orders.json`,
      { params: queryParams }
    );
    
    const fetchedOrders = yield Object.keys(orders).map(key => 
      Object.assign({}, { id: key }, {...orders[key]})
    );

    yield put(actions.fetchOrderSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
}
